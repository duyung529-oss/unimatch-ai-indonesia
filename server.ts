import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { UNIVERSITIES, STUDY_PROGRAMS, SCHOLARSHIPS, REVIEWS } from "./src/data";
import { StudentReview } from "./src/types";

// Setup DNS caching/avoiding lookups if needed
dns.setDefaultResultOrder("ipv4first");

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return ai;
}

// -------------------------------------------------------------
// Core Directories / Universities REST APIs
// -------------------------------------------------------------

// Get Universities (with filters)
app.get("/api/universities", (req, res) => {
  try {
    const { search, province, city, type, accreditation } = req.query;
    let list = [...UNIVERSITIES];

    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.shortName.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q)
      );
    }

    if (province) {
      list = list.filter((u) => u.location.province === String(province));
    }

    if (city) {
      list = list.filter((u) => u.location.city === String(city));
    }

    if (type) {
      list = list.filter((u) => u.type === String(type));
    }

    if (accreditation) {
      list = list.filter((u) => u.accreditation === String(accreditation));
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Study Programs (with filters)
app.get("/api/programs", (req, res) => {
  try {
    const { search, degree, faculty, accreditation, futureDemand } = req.query;
    let list = [...STUDY_PROGRAMS];

    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.universityName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (degree) {
      list = list.filter((p) => p.degree === String(degree));
    }

    if (faculty) {
      list = list.filter((p) => p.faculty.toLowerCase().includes(String(faculty).toLowerCase()));
    }

    if (accreditation) {
      list = list.filter((p) => p.accreditation === String(accreditation));
    }

    if (futureDemand) {
      list = list.filter((p) => p.futureDemand === String(futureDemand));
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Scholarships (with filters)
app.get("/api/scholarships", (req, res) => {
  try {
    const { search, category, coverage } = req.query;
    let list = [...SCHOLARSHIPS];

    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.provider.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((s) => s.category === String(category));
    }

    if (coverage) {
      list = list.filter((s) => s.coverage === String(coverage));
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// In-memory array for extending reviews
let inMemoryReviews: StudentReview[] = [...REVIEWS];

// Get Reviews
app.get("/api/reviews", (req, res) => {
  res.json({ success: true, count: inMemoryReviews.length, data: inMemoryReviews });
});

// Post a Review
app.post("/api/reviews", (req, res) => {
  try {
    const { userName, userRole, major, graduationYear, ratingEngagement, ratingFacility, ratingCareer, content, careerOutcome, currentCompany, salaryInsight } = req.body;
    if (!userName || !major || !content) {
      return res.status(400).json({ success: false, message: "Nama, Jurusan, dan Isi Review wajib diisi." });
    }

    const newRev: StudentReview = {
      id: "rev-" + Date.now(),
      userName,
      userRole: userRole || "mahasiswa",
      major,
      graduationYear: graduationYear ? Number(graduationYear) : undefined,
      ratingEngagement: Number(ratingEngagement) || 4,
      ratingFacility: Number(ratingFacility) || 4,
      ratingCareer: Number(ratingCareer) || 4,
      content,
      careerOutcome,
      currentCompany,
      salaryInsight: salaryInsight ? Number(salaryInsight) : undefined,
      createdAt: new Date().toISOString().split("T")[0]
    };

    inMemoryReviews.unshift(newRev);
    res.json({ success: true, data: newRev });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// -------------------------------------------------------------
// AI Career DNA Assessment API (Uses Gemini)
// -------------------------------------------------------------
app.post("/api/career-dna", async (req, res) => {
  try {
    const profile = req.body;
    const client = getGeminiClient();

    // Human-readable labels strings for prompt construction
    const strengthStr = profile.academicStrengths?.join(", ") || "Kimia, Matematika";
    const interestStr = profile.interests?.join(", ") || "Coding, Desain Otomotif";
    const hobbiesStr = profile.hobbies?.join(", ") || "Gaming, Menulis Blog";
    const personality = profile.personalityType || "Introvert Intuitive (MBTI: INFJ)";
    const workStyle = profile.preferredWorkStyle || "Fleksibel dan Kolaboratif";
    const budget = profile.budgetLimit || 12; // Juta IDR

    const sysInstruct = "Anda adalah konsultan pendidikan tinggi, penasihat karier tepercaya, dan psikolog industri terkemuka di Indonesia. Analisis profil siswa dan rancang Career DNA modern serta peta jalan karier lengkap dalam format JSON terstruktur murni berbahasa Indonesia.";

    const promptUser = `
Siswa Indonesia dengan profil berikut:
- Nama Lengkap: ${profile.fullName || "Siswa Cerdas"}
- Kelebihan Akademis: ${strengthStr}
- Minat Minat: ${interestStr}
- Hobi Kegemaran: ${hobbiesStr}
- Tipe Kepribadian: ${personality}
- Gaya Bekerja/Belajar: ${workStyle}
- Batas Anggaran UKT per Semester: ${budget} Juta Rupiah

Harap hasilkan JSON terperinci yang berisi analisis kecocokan studi, kampus, dan prospek karier di Indonesia. Ketentuan struktur JSON harus memiliki fields berikut:
{
  "personalityArchetype": "Nama Arketipe Kepribadian unik dalam bahasa Indonesia yang berwibawa (maks 4 kata)",
  "skillsDiagnosis": {
    "creativity": <angka 0-100>,
    "analytical": <angka 0-100>,
    "communication": <angka 0-100>,
    "leadership": <angka 0-100>,
    "adaptability": <angka 0-100>
  },
  "compatibleCareers": [
    {
      "title": "Nama peran atau posisi karier spesifik di Indonesia",
      "compatibilityRate": <angka persen 50-100>,
      "explanation": "Alasan adaptabilitas karier ini dengan profil siswa (2-3 kalimat)",
      "roadmap": ["Langkah 1 (S1/D4)", "Langkah 2 (Magang/Sertifikasi)", "Langkah 3 (Pekerjaan Awal)", "Langkah 4 (Posisi Senior)", "Langkah 5 (Puncak Karier)"]
    }
  ],
  "compatibleMajors": [
    {
      "majorName": "Nama Program Studi/Jurusan kuliah standar Indonesia",
      "compatibilityRate": <angka persen 50-100>,
      "reasons": "Mengapa jurusan ini sangat pas dengan strengths & interests siswa",
      "suggestedUniversities": ["Daftar shortName universitas rekomendasi dari UI, ITB, UGM, ITS, BINUS, UNHAS"]
    }
  ],
  "scholarshipSuggestions": [
    {
      "scholarshipId": "Gunakan salah satu dari ('sch-kip', 'sch-djarum', 'sch-bu') atau buat nama ID beasiswa baru",
      "scholarshipName": "Nama beasiswa",
      "matchScore": <angka 0-100>,
      "reason": "Bagaimana beasiswa ini cocok dengan budget dan keunggulan akademis mereka"
    }
  ],
  "developmentRoadmap": [
    "Daftar rekomendasi coaching spesifik (minimal 3 item perkataan tindakan)",
    "Contoh: 'Tingkatkan penguasaan bahasa Inggris teknis atau sertifikasi keahlian'",
    "Contoh: 'Buat portofolio project sederhana yang dipublikasikan di platform publik'"
  ]
}
`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: promptUser,
          config: {
            systemInstruction: sysInstruct,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                personalityArchetype: { type: Type.STRING },
                skillsDiagnosis: {
                  type: Type.OBJECT,
                  properties: {
                    creativity: { type: Type.INTEGER },
                    analytical: { type: Type.INTEGER },
                    communication: { type: Type.INTEGER },
                    leadership: { type: Type.INTEGER },
                    adaptability: { type: Type.INTEGER },
                  }
                },
                compatibleCareers: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      compatibilityRate: { type: Type.INTEGER },
                      explanation: { type: Type.STRING },
                      roadmap: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      }
                    }
                  }
                },
                compatibleMajors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      majorName: { type: Type.STRING },
                      compatibilityRate: { type: Type.INTEGER },
                      reasons: { type: Type.STRING },
                      suggestedUniversities: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      }
                    }
                  }
                },
                scholarshipSuggestions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      scholarshipId: { type: Type.STRING },
                      scholarshipName: { type: Type.STRING },
                      matchScore: { type: Type.INTEGER },
                      reason: { type: Type.STRING }
                    }
                  }
                },
                developmentRoadmap: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["personalityArchetype", "skillsDiagnosis", "compatibleCareers", "compatibleMajors", "scholarshipSuggestions", "developmentRoadmap"]
            }
          }
        });

        const textOutput = response.text || "";
        const data = JSON.parse(textOutput.trim());
        return res.json({ success: true, source: "gemini", data });
      } catch (gem_err: any) {
        console.error("Gemini request failed. Injecting high-quality heuristic response.", gem_err);
      }
    }

    // Heuristic Heuristic Fallback (Allows 100% stable performance even if API key is blank/missing)
    const mockCareersMap: Record<string, any> = {
      "Sains & Matematika": {
        archetype: "Peneliti & Analis Kuantitatif",
        skills: { creativity: 65, analytical: 92, communication: 70, leadership: 60, adaptability: 78 },
        careers: [
          { title: "Data Scientist / Quantitative Analyst", compatibilityRate: 94, explanation: "Kelebihan matematika dan sains yang kuat sangat menunjang pemodelan Machine Learning.", roadmap: ["Kuliah S1 Ilmu Komputer UI/ITB", "Sertifikasi Data Science Google", "Magang Data Analyst", "Junior Data Scientist", "Lead AI Consultant"] },
          { title: "Statistisi Peneliti Klinis", compatibilityRate: 88, explanation: "Menganalisis data empiris kesehatan untuk mendukung formulasi obat medis terbaru.", roadmap: ["Kuliah S1 Kedokteran/Farmasi", "Riset Asisten Lab", "Peneliti Muda BRIN", "Kepala Divisi Biostatistik"] }
        ],
        majors: [
          { majorName: "Teknik Informatika / Ilmu Komputer", compatibilityRate: 95, reasons: "Jurusan yang menggabungkan sains logika tingkat tinggi dengan teknologi masa kini.", suggestedUniversities: ["UI", "ITB", "ITS"] },
          { majorName: "Pendidikan Dokter (Kedokteran)", compatibilityRate: 85, reasons: "Berguna untuk riset kesehatan preventif berbasis data numerik.", suggestedUniversities: ["UI", "UGM"] }
        ]
      },
      "Seni, Desain & Sastra": {
        archetype: "Sutradara Kreatif & Teknopreneur Seni",
        skills: { creativity: 95, analytical: 60, communication: 85, leadership: 75, adaptability: 90 },
        careers: [
          { title: "Industrial Product Designer", compatibilityRate: 96, explanation: "Menggabungkan talenta estetika murni dengan kebutuhan fungsional industri komersial.", roadmap: ["Kuliah S1 FSRD ITB", "Portofolio Desain Figma", "Magang Studio Kriya Kreatif", "Lead Product Designer", "Creative Director"] },
          { title: "UX Visual Architect", compatibilityRate: 90, explanation: "Memastikan kecantikan visual aplikasi digital selaras dengan user experience prima.", roadmap: ["Kuliah S1 Desain ITB / BINUS", "Sertifikasi UI/UX Internasional", "Magang Tech Unicorn", "VP of Design"] }
        ],
        majors: [
          { majorName: "Kriya & Desain Produk", compatibilityRate: 97, reasons: "Tempat mengasah kreativitas seni diaplikasikan dalam wujud industri modern berkualitas tinggi.", suggestedUniversities: ["ITB", "BINUS"] },
          { majorName: "Teknik Informatika / Ilmu Komputer", compatibilityRate: 80, reasons: "Cocok untuk berfokus di sisi frontend engineering dan kreatif visual interaktif.", suggestedUniversities: ["BINUS", "ITS"] }
        ]
      }
    };

    // Standard fallback selection logic
    const categoryKey = profile.academicStrengths?.includes("Seni") || profile.interests?.includes("Desain") 
      ? "Seni, Desain & Sastra" 
      : "Sains & Matematika";

    const selectionObj = mockCareersMap[categoryKey];

    const fallbackJSON = {
      personalityArchetype: `Inovator Strategis: ${selectionObj.archetype}`,
      skillsDiagnosis: selectionObj.skills,
      compatibleCareers: selectionObj.careers,
      compatibleMajors: selectionObj.majors,
      scholarshipSuggestions: [
        { scholarshipId: "sch-bu", scholarshipName: "Beasiswa Unggulan Kemendikbud", matchScore: 92, reason: "Sangat sesuai dengan bakat kepemimpinan dan portofolio prestasi nasional Anda." },
        { scholarshipId: "sch-djarum", scholarshipName: "Djarum Beasiswa Plus", matchScore: 85, reason: "Bantuan penunjang bulanan dan pelatihan softskill kepemimpinan luar biasa." }
      ],
      developmentRoadmap: [
        "Ikuti kursus online bersertifikat Microsoft/Google untuk memperdalam skill teknis penunjang studi.",
        "Mengasah kepemimpinan dengan mendaftar di kepengurusan OSIS atau komite kepanitiaan pemuda lokal.",
        "Mulailah merancang karya portofolio mandiri (website, jurnal, atau kriya seni) dan publikasikan di LinkedIn."
      ]
    };

    res.json({ success: true, source: "heuristic_fallback", data: fallbackJSON });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// -------------------------------------------------------------
// Admission Prediction API (Uses Gemini)
// -------------------------------------------------------------
app.post("/api/admission-predict", async (req, res) => {
  try {
    const input = req.body;
    const client = getGeminiClient();

    const univName = UNIVERSITIES.find((u) => u.id === input.targetUniversityId)?.name || "Universitas Terpilih";
    const majorStr = input.targetProgramName || "Teknik Informatika";
    const adType = input.admissionType || "SNBP";
    const score = input.averageReportScore || 85;
    const utbk = input.utbkScore || 650;
    const achievement = input.achievementsCount || 0;
    const financial = input.financialCondition || "Menengah";

    const promptUser = `
Siswa menargetkan masuk jurusan "${majorStr}" di "${univName}" lewat jalur seleksi "${adType}".
Prasyarat nilai dan kompetensi siswa:
- Rerata Nilai Rapor (SMA/SMK): ${score}
- Skor UTBK-SNBT (bila mengikuti jalur tulis): ${utbk}
- Jumlah Sertifikat Prestasi (OSN/Lomba): ${achievement}
- Status Keuangan Keluarga: ${financial}

Rancang evaluasi probabilitas penerimaan (kelulusan) di kampus ini secara realistis, lengkap dengan analisis risiko masuk dalam format JSON berbahasa Indonesia murni dengan fields:
{
  "percentProbability": <angka persentase kelulusan 10-95>,
  "riskAssessment": "Analisis risiko terperinci (3-4 kalimat). Sebutkan tingkat persaingan jurusan dan kesetaraan skor/prestasi saat ini.",
  "improvementTips": [
    "Daftar rekomendasi peningkatan minimal 3 item tindakan konkret.",
    "Contoh: 'Tingkatkan skor UTBK simulasi di subtes penalaran matematika sampai di atas 700'",
    "Contoh: 'Lampirkan prestasi kejuaraan setingkat provinsi agar bobot prestasi SNBP optimal'"
  ],
  "recommendedAlternatives": [
    {
      "universityName": "Nama universitas alternatif yang passing grade-nya sedikit di bawah pilihan utama",
      "programName": "Nama program studi yang sejenis",
      "chance": <angka persentase kelulusan alternatif 60-99>
    }
  ]
}
`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: promptUser,
          config: {
            systemInstruction: "Anda adalah koordinator bimbingan belajar masuk perguruan tinggi terbaik nasional di Indonesia. Analisis nilai murid dengan jujur dan buat penilaian probabilitas yang akurat serta andal berformat JSON murni.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                percentProbability: { type: Type.INTEGER },
                riskAssessment: { type: Type.STRING },
                improvementTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                recommendedAlternatives: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      universityName: { type: Type.STRING },
                      programName: { type: Type.STRING },
                      chance: { type: Type.INTEGER }
                    }
                  }
                }
              },
              required: ["percentProbability", "riskAssessment", "improvementTips", "recommendedAlternatives"]
            }
          }
        });

        const textOutput = response.text || "";
        const data = JSON.parse(textOutput.trim());
        return res.json({ success: true, source: "gemini", data });
      } catch (gem_err: any) {
        console.error("Gemini admission query failed. Using heuristic fallback.", gem_err);
      }
    }

    // Heuristics calculations
    let calculatedChance = 45;
    if (adType === "SNBP") {
      calculatedChance = Math.min(95, Math.max(15, Math.round((Number(score) - 75) * 2.5 + achievement * 8)));
    } else {
      calculatedChance = Math.min(95, Math.max(15, Math.round((Number(utbk) - 450) * 0.15 + achievement * 5)));
    }

    let riskStr = `Hasil evaluasi menunjukkan probabilitas kelulusan sebesar ${calculatedChance}% untuk masuk prodi ${majorStr} di ${univName}. `;
    if (calculatedChance > 75) {
      riskStr += "Profil Anda tergolong kuat. Persaingan di prodi ini ketat, namun rerata akademik dan prestasi Anda menempatkan Anda di kuartil atas pendaftar potensial.";
    } else if (calculatedChance > 50) {
      riskStr += "Kondisi Anda berada di area kompetisi sedang. Sedikit peningkatan pada poin portofolio prestasi atau skor tryout UTBK di subtes penalaran kuantitatif akan sangat memperkokoh kelulusan.";
    } else {
      riskStr += "Tingkat persaingan sangat tinggi dengan passing grade ketat. Diperlukan strategi khusus seperti melampirkan piagam perlombaan OSN/provinsi atau mempertimbangkan jalur mandiri beraliansi kemitraan.";
    }

    const fallbackJSON = {
      percentProbability: calculatedChance,
      riskAssessment: riskStr,
      improvementTips: [
        "Maksimalkan latihan soal UTBK terutamanya di subtes Literasi Bahasa Inggris dan Penalaran Matematika.",
        "Pelajari rasio keketatan daya tampung tahun lalu untuk menentukan prioritas urutan pilihan program studi.",
        "Konsultasikan piagam prestasi terbaik Anda ke sekolah agar divalidasi dengan bobot poin tertinggi di portal SNBP."
      ],
      recommendedAlternatives: [
        {
          universityName: "Telkom University",
          programName: "S1 Teknologi Informasi",
          chance: 88
        },
        {
          universityName: "Universitas Hasanuddin",
          programName: "S1 Teknik Informatika",
          chance: calculatedChance + 20 > 95 ? 92 : calculatedChance + 20
        }
      ]
    };

    res.json({ success: true, source: "heuristic_fallback", data: fallbackJSON });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// -------------------------------------------------------------
// Vite Dev Server / Static Files Setup
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UniMatch AI Indonesia server booted on http://localhost:${PORT}`);
  });
}

startServer();
