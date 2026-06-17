import React, { useState, useEffect } from "react";
import { 
  Search, BookOpen, Compass, Award, BarChart3, Users, 
  MapPin, CheckCircle, AlertTriangle, Play, HelpCircle, 
  Star, Plus, Trash2, Heart, ExternalLink, RefreshCw, 
  User, Shield, DollarSign, Calendar
} from "lucide-react";
import { University, StudyProgram, Scholarship, StudentReview, DNAAssessmentResult, AdmissionPredictionResult, AssessmentProfile } from "./types";

export default function App() {
  // Navigation & System States
  const [activeTab, setActiveTab] = useState<"dashboard" | "universitas" | "counselor" | "predictor" | "scholarships" | "alumni" | "admin">("dashboard");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic Data States loaded from API/fallback
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<StudyProgram[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [reviews, setReviews] = useState<StudentReview[]>([]);

  // User Saved State (Local Storage persistent)
  const [savedUnivIds, setSavedUnivIds] = useState<string[]>([]);
  const [savedProgIds, setSavedProgIds] = useState<string[]>([]);

  // Selected State for Detailed Modals/Views
  const [selectedUniv, setSelectedUniv] = useState<University | null>(null);
  const [selectedProg, setSelectedProg] = useState<StudyProgram | null>(null);

  // Interactive Map State
  const [selectedRegion, setSelectedRegion] = useState<string>("JAWA");
  const [mapDistanceResult, setMapDistanceResult] = useState<{from: string, to: string, distance: number, route: string[]} | null>(null);

  // Search/Filter State
  const [univSearch, setUnivSearch] = useState<string>("");
  const [univTypeFilter, setUnivTypeFilter] = useState<string>("");
  const [univAccredFilter, setUnivAccredFilter] = useState<string>("");
  const [progSearch, setProgSearch] = useState<string>("");
  const [progDegreeFilter, setProgDegreeFilter] = useState<string>("");

  // AI DNA counseling Inputs
  const [dnaProfile, setDnaProfile] = useState<AssessmentProfile>({
    fullName: "Andi Pratama",
    gender: "Laki-laki",
    academicStrengths: ["Kimia", "Matematika", "Fisika"],
    interests: ["Coding", "Artificial Intelligence", "Sains Data"],
    hobbies: ["Gaming", "Membaca Buku", "Catur"],
    personalityType: "Introvert (INFJ)",
    preferredWorkStyle: "Fleksibel dan Mandiri",
    locationPreference: ["Jawa Barat", "DKI Jakarta"],
    budgetLimit: 15
  });
  const [dnaResult, setDnaResult] = useState<DNAAssessmentResult | null>(null);

  // Admission Predictor Inputs
  const [predictInputs, setPredictInputs] = useState({
    targetUniversityId: "univ-ui",
    targetProgramName: "Teknik Informatika / Ilmu Komputer",
    admissionType: "SNBP" as "SNBP" | "SNBT" | "Mandiri",
    averageReportScore: 88,
    utbkScore: 680,
    achievementsCount: 2,
    financialCondition: "Menengah" as "Menengah" | "Mampu" | "Membutuhkan Beasiswa"
  });
  const [predictResult, setPredictResult] = useState<AdmissionPredictionResult | null>(null);

  // Review Form state
  const [reviewForm, setReviewForm] = useState({
    userName: "",
    userRole: "mahasiswa" as "mahasiswa" | "alumni",
    major: "",
    content: "",
    ratingEngagement: 5,
    ratingFacility: 4,
    ratingCareer: 5,
    currentCompany: "",
    careerOutcome: "",
    salaryInsight: 8
  });

  // Admin New Entry state
  const [adminNewUniv, setAdminNewUniv] = useState({
    name: "",
    shortName: "",
    type: "PTN-BH" as "PTN" | "PTS" | "PTN-BH",
    accreditation: "Unggul" as any,
    province: "Jawa Barat",
    city: "Bandung",
    description: "",
    semesterFeeMax: 15,
    totalStudents: 15000,
    graduateEmploymentRate: 85
  });

  const [adminNewProg, setAdminNewProg] = useState({
    name: "",
    universityId: "univ-ui",
    degree: "S1" as any,
    faculty: "Fakultas Teknik",
    accreditation: "Unggul" as any,
    description: "",
    futureDemand: "Sangat Tinggi" as any,
    salaryMin: 8,
    salaryMax: 15
  });

  // -------------------------------------------------------------
  // Data Loaders
  // -------------------------------------------------------------
  const loadData = async () => {
    try {
      setLoading(true);
      const resUniv = await fetch("/api/universities");
      const dUniv = await resUniv.json();
      if (dUniv.success) setUniversities(dUniv.data);

      const resProg = await fetch("/api/programs");
      const dProg = await resProg.json();
      if (dProg.success) setPrograms(dProg.data);

      const resSch = await fetch("/api/scholarships");
      const dSch = await resSch.json();
      if (dSch.success) setScholarships(dSch.data);

      const resRev = await fetch("/api/reviews");
      const dRev = await resRev.json();
      if (dRev.success) setReviews(dRev.data);

      setErrorMessage(null);
    } catch (err: any) {
      console.error("Gagal koordinasi data dari API, menyetel fallback luring lokal.", err);
      setErrorMessage("Koneksi API bermasalah. Mengaktifkan sistem luring mandiri.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Load local storage saved lists
    const savedU = localStorage.getItem("unimatch_saved_univ");
    if (savedU) setSavedUnivIds(JSON.parse(savedU));
    const savedP = localStorage.getItem("unimatch_saved_prog");
    if (savedP) setSavedProgIds(JSON.parse(savedP));
  }, []);

  const saveToLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
  const toggleSaveUniv = (id: string) => {
    const next = savedUnivIds.includes(id) 
      ? savedUnivIds.filter(x => x !== id) 
      : [...savedUnivIds, id];
    setSavedUnivIds(next);
    saveToLocal("unimatch_saved_univ", next);
  };

  const toggleSaveProg = (id: string) => {
    const next = savedProgIds.includes(id) 
      ? savedProgIds.filter(x => x !== id) 
      : [...savedProgIds, id];
    setSavedProgIds(next);
    saveToLocal("unimatch_saved_prog", next);
  };

  const calculateDistance = (univ: University) => {
    // Elegant Distance Routing Mock
    const startPoint = "Pusat Jakarta (Monas)";
    let distance = 12; // default
    let route = ["Jakarta Pusat"];

    if (univ.location.province === "DI Yogyakarta") {
      distance = 562;
      route = ["Jakarta", "Cirebon", "Purwokerto", "Yogyakarta"];
    } else if (univ.location.province === "Jawa Timur") {
      distance = 782;
      route = ["Jakarta", "Semarang", "Solo", "Surabaya"];
    } else if (univ.location.province === "Sulawesi Selatan") {
      distance = 1420;
      route = ["Jakarta (Tanjung Priok)", "Laut Jawa (Kapal Laut)", "Makassar (Pelabuhan Soekarno Hatta)"];
    } else {
      distance = 28;
      route = ["Jakarta Selatan", "Margonda Depok"];
    }

    setMapDistanceResult({
      from: startPoint,
      to: `${univ.name} (${univ.location.city})`,
      distance,
      route
    });
  };

  // AI Assistant trigger calls
  const triggerDnaAssessment = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/career-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dnaProfile)
      });
      const resJson = await res.json();
      if (resJson.success) {
        setDnaResult(resJson.data);
      } else {
        throw new Error(resJson.message || "Gagal memproses penilaian DNA.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Gagal terhubung ke modul kecerdasan buatan.");
    } finally {
      setLoading(false);
    }
  };

  const triggerAdmissionPredictor = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/admission-predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(predictInputs)
      });
      const resJson = await res.json();
      if (resJson.success) {
        setPredictResult(resJson.data);
      } else {
        throw new Error(resJson.message || "Gagal memproses prediksi kelulusan.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Modul prediksi kecerdasan buatan terhambat jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.userName || !reviewForm.major || !reviewForm.content) {
      alert("Nama, Jurusan, dan isi ulasan wajib diisi!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm)
      });
      const resJson = await res.json();
      if (resJson.success) {
        setReviews([resJson.data, ...reviews]);
        setReviewForm({
          userName: "",
          userRole: "mahasiswa",
          major: "",
          content: "",
          ratingEngagement: 5,
          ratingFacility: 4,
          ratingCareer: 5,
          currentCompany: "",
          careerOutcome: "",
          salaryInsight: 8
        });
        alert("Terima kasih! Kontribusi ulasan Anda telah dipublikasikan.");
      }
    } catch (err: any) {
      alert("Gagal menambahkan review saat ini.");
    } finally {
      setLoading(false);
    }
  };

  // Management Additions
  const handleAddUnivAdmin = () => {
    if (!adminNewUniv.name || !adminNewUniv.shortName) {
      alert("Sebutkan Nama Kampus & Singkatannya!");
      return;
    }
    const created: University = {
      id: "univ-" + Date.now(),
      name: adminNewUniv.name,
      shortName: adminNewUniv.shortName,
      type: adminNewUniv.type,
      description: adminNewUniv.description || "Kampus unggulan berfasilitas internasional.",
      history: "Didirikan dengan visi melahirkan generasi unggul Indonesia yang siap memimpin kompetisi dunia.",
      accreditation: adminNewUniv.accreditation,
      contact: {
        website: `https://www.${adminNewUniv.shortName.toLowerCase()}.ac.id`,
        email: `humas@${adminNewUniv.shortName.toLowerCase()}.ac.id`,
        phone: "021-888999",
        socialMedia: { instagram: `@${adminNewUniv.shortName.toLowerCase()}` }
      },
      location: {
        address: "Jalan Utama Kampus No. 1",
        province: adminNewUniv.province,
        city: adminNewUniv.city,
        postalCode: "12345",
        lat: -6.20,
        lng: 106.81
      },
      stats: {
        totalStudents: adminNewUniv.totalStudents,
        lecturers: Math.round(adminNewUniv.totalStudents / 20),
        graduateEmploymentRate: adminNewUniv.graduateEmploymentRate,
        avgStartingSalaryMin: 6,
        avgStartingSalaryMax: 15
      },
      facilities: ["Perpustakaan Digital", "Laboratorium Pusat", "Klinik Kampus", "Fasilitas Olahraga"],
      tuition: {
        semesterFeeMin: 1,
        semesterFeeMax: adminNewUniv.semesterFeeMax,
        admissionFeeMin: 5,
        admissionFeeMax: 20
      },
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop"
    };

    setUniversities([...universities, created]);
    alert(`Sukses menambahkan Kampus: ${created.name}`);
    setAdminNewUniv({
      name: "",
      shortName: "",
      type: "PTN-BH",
      accreditation: "Unggul",
      province: "Jawa Barat",
      city: "Bandung",
      description: "",
      semesterFeeMax: 15,
      totalStudents: 15000,
      graduateEmploymentRate: 85
    });
  };

  const handleAddProgAdmin = () => {
    if (!adminNewProg.name) {
      alert("Masukkan nama program studi!");
      return;
    }
    const parentUnivName = universities.find(u => u.id === adminNewProg.universityId)?.name || "Universitas Indonesia";
    const created: StudyProgram = {
      id: "prog-" + Date.now(),
      universityId: adminNewProg.universityId,
      universityName: parentUnivName,
      name: adminNewProg.name,
      degree: adminNewProg.degree,
      faculty: adminNewProg.faculty,
      accreditation: adminNewProg.accreditation,
      description: adminNewProg.description || "Program studi terancang menghasilkan lulusan adaptif.",
      tuitionGroupMin: 1,
      tuitionGroupMax: 15,
      curriculum: ["Metodologi Penelitian", "Dasar Keahlian", "Penerapan Industri", "Kerja Praktek"],
      careerOpportunities: ["Praktisi Industri", "Konsultan Keahlian", "Akademisi Intelektual"],
      averageSalaryRange: {
        min: adminNewProg.salaryMin,
        max: adminNewProg.salaryMax
      },
      requiredSkills: ["Kemampuan Analitikal", "Problem Solving", "Komunikasi Berkelompok"],
      futureDemand: adminNewProg.futureDemand
    };

    setPrograms([...programs, created]);
    alert(`Sukses menambahkan Program: ${created.name} (${created.universityName})`);
    setAdminNewProg({
      name: "",
      universityId: "univ-ui",
      degree: "S1",
      faculty: "Fakultas Teknik",
      accreditation: "Unggul",
      description: "",
      futureDemand: "Sangat Tinggi",
      salaryMin: 8,
      salaryMax: 15
    });
  };

  // Helper arrays for input forms selection
  const ID_PROVINCES = [
    "DKI Jakarta", "Jawa Barat", "DI Yogyakarta", "Jawa Timur", "Jawa Tengah", "Banten", "Sulawesi Selatan", "Sumatera Utara"
  ];

  const AC_STRENGTHS_CHOICES = ["Matematika", "Kimia", "Fisika", "Biologi", "Bahasa Inggris", "Ekonomi", "Sejarah", "Seni Rupa"];
  const INTEREST_CHOICES = ["Coding", "Artificial Intelligence", "Sains Data", "Bisnis & Startup", "Desain Produk", "Kesehatan", "Hukum Korporasi", "Psikologi Klinis"];
  const HOBBY_CHOICES = ["Gaming", "Menulis Blog", "Catur", "Musik", "Menggambar", "Olahraga", "Fotografi", "Organisasi"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Nav (Matching Design instructions) */}
      <nav className="w-full md:w-24 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex md:flex-col items-center py-4 md:py-8 justify-between md:justify-start gap-4 md:gap-10 shrink-0 px-4 md:px-0 sticky top-0 z-20 shadow-sm md:shadow-none">
        
        {/* Logo App */}
        <div 
          onClick={() => setActiveTab("dashboard")}
          className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 text-white font-black text-2xl cursor-pointer hover:scale-105 transition-transform"
          id="app-logo-box"
        >
          U
        </div>

        {/* Tab Buttons Icons */}
        <div className="flex md:flex-col gap-2 md:gap-5 text-slate-400">
          <button 
            title="Dashboard Utama"
            onClick={() => setActiveTab("dashboard")}
            className={`p-2.5 rounded-lg transition-all ${activeTab === "dashboard" ? "text-indigo-600 bg-indigo-50" : "hover:text-slate-700"}`}
            id="tab-btn-dashboard"
          >
            <Compass className="w-5 h-5" />
          </button>

          <button 
            title="Eksplorasi Kampus & Peta"
            onClick={() => setActiveTab("universitas")}
            className={`p-2.5 rounded-lg transition-all ${activeTab === "universitas" ? "text-indigo-600 bg-indigo-50" : "hover:text-slate-700"}`}
            id="tab-btn-universitas"
          >
            <BookOpen className="w-5 h-5" />
          </button>

          <button 
            title="AI DNA Counselor"
            onClick={() => {
              setActiveTab("counselor");
              if(!dnaResult) triggerDnaAssessment();
            }}
            className={`p-2.5 rounded-lg transition-all ${activeTab === "counselor" ? "text-indigo-600 bg-indigo-50" : "hover:text-slate-700"}`}
            id="tab-btn-counselor"
          >
            <Award className="w-5 h-5" />
          </button>

          <button 
            title="Prediksi Seleksi"
            onClick={() => setActiveTab("predictor")}
            className={`p-2.5 rounded-lg transition-all ${activeTab === "predictor" ? "text-indigo-600 bg-indigo-50" : "hover:text-slate-700"}`}
            id="tab-btn-predictor"
          >
            <BarChart3 className="w-5 h-5" />
          </button>

          <button 
            title="Pencari Beasiswa"
            onClick={() => setActiveTab("scholarships")}
            className={`p-2.5 rounded-lg transition-all ${activeTab === "scholarships" ? "text-indigo-600 bg-indigo-50" : "hover:text-slate-700"}`}
            id="tab-btn-scholarships"
          >
            <DollarSign className="w-5 h-5" />
          </button>

          <button 
            title="Ulasan & Alumni"
            onClick={() => setActiveTab("alumni")}
            className={`p-2.5 rounded-lg transition-all ${activeTab === "alumni" ? "text-indigo-600 bg-indigo-50" : "hover:text-slate-700"}`}
            id="tab-btn-alumni"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>

        {/* User Status / Admin Button at bottom */}
        <div className="md:mt-auto flex md:flex-col gap-2 items-center">
          <button 
            title="Admin Suite"
            onClick={() => setActiveTab("admin")}
            className={`p-2 rounded-full transition-all ${activeTab === "admin" ? "bg-amber-100 text-amber-700 border-amber-300" : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"}`}
            id="admin-pill-btn"
          >
            <Shield className="w-4 h-4" />
          </button>
          
          <div title={dnaProfile.fullName} className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {dnaProfile.fullName.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </nav>

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col p-4 md:p-8 gap-6 overflow-x-hidden">
        
        {/* Main Header / Top Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100" id="main-app-header">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                Nasional V.2026
              </span>
              {errorMessage && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Luring Fallback
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              UNIMATCH AI <span className="text-indigo-600">INDONESIA</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-0.5">
              Platform AI Pemilihan Kampus, Jurusan, Beasiswa, dan Karier Terlengkap di Indonesia
            </p>
          </div>

          {/* Quick Stats/Actions */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden xl:block">
              <div className="text-xs text-slate-400 font-bold uppercase">PROFIL SISWA</div>
              <div className="text-sm font-bold text-slate-700">{dnaProfile.fullName} ({dnaProfile.personalityType})</div>
            </div>
            <button 
              onClick={loadData} 
              disabled={loading}
              className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm transition-all shadow-sm flex items-center gap-1"
              id="refresh_data_btn"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <span className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-indigo-100">
              AKSI AI AKTIF
            </span>
          </div>
        </header>

        {loading && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3 text-indigo-800 animate-pulse" id="loading-spinner-banner">
            <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
            <span className="text-sm font-semibold">Sedang merelasikan rancangan analisis kecerdasan buatan UniMatch...</span>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 1: BENTO REGULAR DASHBOARD */}
        {/* ============================================================= */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="bento-dashboard-grid">
            
            {/* Quick Profile Summary Bento */}
            <div className="lg:col-span-4 bg-indigo-950 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between" id="bento-card-identity">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-screen opacity-20 filter blur-xl"></div>
              <div>
                <span className="text-indigo-300 text-[10px] font-black uppercase tracking-widest">DNA TARGET</span>
                <h3 className="text-2xl font-extrabold mt-1">Siswa Indonesia</h3>
                
                <div className="mt-4 space-y-2 bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="text-xs text-indigo-200">Nama: <span className="font-bold text-white">{dnaProfile.fullName}</span></div>
                  <div className="text-xs text-indigo-200">Kekuatan: <span className="font-bold text-emerald-300">{dnaProfile.academicStrengths.slice(0, 3).join(", ")}</span></div>
                  <div className="text-xs text-indigo-200">Minat AI: <span className="font-bold text-cyan-300">{dnaProfile.interests.slice(0, 2).join(", ")}</span></div>
                  <div className="text-xs text-indigo-200">Budget UKT Maks: <span className="font-bold text-amber-300">Rp {dnaProfile.budgetLimit} Juta / smt</span></div>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => setActiveTab("counselor")}
                  className="w-full bg-white text-indigo-900 font-bold py-2 px-4 rounded-xl text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-indigo-600" /> Konsultasi DNA Karier AI
                </button>
              </div>
            </div>

            {/* Simulated Interactive Indonesia Map Bento */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id="bento-card-map">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600 animate-bounce" /> Peta Kampus & Wilayah Indonesia
                  </h3>
                  <p className="text-xs text-slate-400">Pilih regional utama untuk filter cepat</p>
                </div>
                <div className="flex gap-1.5 overflow-x-auto max-w-xs md:max-w-md pb-1">
                  {["SUMATRA", "JAWA", "KALIMANTAN", "SULAWESI", "BALI-NUSA", "PAPUA"].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all uppercase whitespace-nowrap ${selectedRegion === reg ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphic Mock of Map */}
              <div className="bg-slate-50 rounded-2xl h-44 border border-dashed border-slate-200 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                
                {/* Simulated Islands dots */}
                <div className="flex gap-4 items-center z-10 scale-90 md:scale-100 text-center">
                  <div className={`p-2 rounded-xl border transition-all ${selectedRegion === "SUMATRA" ? "bg-indigo-50 border-indigo-300 scale-105" : "bg-white border-slate-200 opacity-60"}`}>
                    <div className="text-xs font-bold text-indigo-600">Sumatra</div>
                    <div className="text-[10px] text-slate-400 font-bold">450 Kampus</div>
                  </div>
                  <div className={`p-2 rounded-xl border transition-all ${selectedRegion === "JAWA" ? "bg-indigo-100 border-indigo-400 scale-110 shadow-sm" : "bg-white border-slate-200"}`}>
                    <div className="text-xs font-bold text-indigo-700">Jawa (Hotspot)</div>
                    <div className="text-[10px] text-indigo-600 font-black">2,120 Kampus</div>
                  </div>
                  <div className={`p-2 rounded-xl border transition-all ${selectedRegion === "SULAWESI" ? "bg-indigo-50 border-indigo-300 scale-105" : "bg-white border-slate-200 opacity-60"}`}>
                    <div className="text-xs font-bold text-indigo-600">Sulawesi</div>
                    <div className="text-[10px] text-slate-400 font-bold">290 Kampus</div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 flex gap-2 text-[10px] text-slate-400 bg-white/80 p-2 rounded-lg border border-slate-200/50 backdrop-blur-sm">
                  <span>🟢 PTN: 122</span>
                  <span>🔵 PTS: 3,200+</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Universitas relevan di {selectedRegion}:</span>
                <button 
                  onClick={() => setActiveTab("universitas")}
                  className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
                >
                  Periksa Semua Registri Kampus →
                </button>
              </div>
            </div>

            {/* Admission Predictor Bento Widget */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id="bento-card-admission-predictor">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-rose-500" /> Rasio Masuk SNBP / UTBK
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                    AKURAT V2
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Uji peluang masuk berdasarkan rapot, sertifikat kompetensi, dan skor target UTBK siswa.
                </p>

                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                    <div>
                      <div className="text-xs font-bold">Teknik Informatika - UI</div>
                      <span className="text-[10px] text-slate-500">Estimasi Peluang SNBP</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-600 font-black text-base">82% Chance</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                    <div>
                      <div className="text-xs font-bold">Teknik Informatika - ITB</div>
                      <span className="text-[10px] text-slate-500">Estimasi Peluang UTBK</span>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-500 font-black text-base">64% Chance</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button 
                  onClick={() => setActiveTab("predictor")}
                  className="w-full bg-slate-900 border border-slate-900 text-white hover:bg-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                >
                  Buka Kalkulator Prediksi Kelulusan →
                </button>
              </div>
            </div>

            {/* Scholarship Spotter Bento Widget */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id="bento-card-scholarships-spot">
              <div>
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" /> Info Beasiswa Nasional Berjalan
                </h3>
                <p className="text-xs text-slate-400 mt-1">Daftar skema beasiswa penuh yang selaras untuk dipertimbangkan.</p>

                <div className="mt-4 space-y-3">
                  {scholarships.slice(0, 2).map((s) => (
                    <div key={s.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">{s.name}</span>
                        <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-1.5 rounded">{s.coverage}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                        <span>Oleh: {s.provider}</span>
                        <span className="text-amber-600 font-bold">Sisa {s.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <button 
                  onClick={() => setActiveTab("scholarships")}
                  className="w-full bg-white hover:bg-slate-50 text-indigo-600 border border-slate-200 font-bold py-2 px-4 rounded-xl text-xs transition-all"
                >
                  Lihat Selengkapnya
                </button>
              </div>
            </div>

            {/* Saved Items Quick Bento */}
            <div className="lg:col-span-3 bg-slate-100 text-slate-800 rounded-3xl p-6 border border-slate-200 relative overflow-hidden flex flex-col justify-between" id="bento-card-saved-stats">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Media Tersimpan</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Item kampus & jurusan favorit Anda.</p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/50">
                    <span className="text-2xl font-black text-indigo-600">{savedUnivIds.length}</span>
                    <span className="block text-[10px] text-slate-400 font-black uppercase mt-1">KAMPUS</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/50">
                    <span className="text-2xl font-black text-emerald-600">{savedProgIds.length}</span>
                    <span className="block text-[10px] text-slate-400 font-black uppercase mt-1">JURUSAN</span>
                  </div>
                </div>

                <div className="mt-4 text-[11px] text-slate-500 space-y-1">
                  {savedUnivIds.length === 0 && savedProgIds.length === 0 ? (
                    <li className="list-none text-center italic py-2 text-slate-400">Belum ada universitas/prodi disimpan.</li>
                  ) : (
                    <div className="bg-white/40 p-2 rounded text-[10px]">
                      Simpan item di tab universitas untuk menyusun target rencana studi.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button 
                  onClick={() => setActiveTab("universitas")}
                  className="w-full text-indigo-600 font-bold text-xs hover:underline text-center"
                >
                  Eksplorasi Sekarang →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 2: UNIVERSITAS, DETAILED MAP & EXPLORER */}
        {/* ============================================================= */}
        {activeTab === "universitas" && (
          <div className="space-y-6" id="view-universities-explorer">
            
            {/* Filtering bento box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-3 justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input 
                  type="text" 
                  value={univSearch}
                  onChange={(e) => setUnivSearch(e.target.value)}
                  placeholder="Cari Universitas, Akronim, atau Lokasi..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select 
                  value={univTypeFilter}
                  onChange={(e) => setUnivTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl focus:outline-none"
                >
                  <option value="">Semua Tipe Kampus</option>
                  <option value="PTN">PTN</option>
                  <option value="PTN-BH">PTN-BH</option>
                  <option value="PTS">PTS</option>
                </select>

                <select 
                  value={univAccredFilter} 
                  onChange={(e) => setUnivAccredFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl focus:outline-none"
                >
                  <option value="">Semua Akreditasi</option>
                  <option value="Unggul">Unggul</option>
                  <option value="Baik Sekali">Baik Sekali</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>

                {(univSearch || univTypeFilter || univAccredFilter) && (
                  <button 
                    onClick={() => {
                      setUnivSearch("");
                      setUnivTypeFilter("");
                      setUnivAccredFilter("");
                    }}
                    className="text-xs text-rose-500 hover:orange-500 font-bold px-2 py-1"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Split layout: Universities Directory VS Programs Directory */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Campus cards list */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center justify-between">
                  <span>Daftar Universitas ({universities.length} Kampus Master)</span>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Rujukan Terverifikasi</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {universities
                    .filter(u => {
                      if (univTypeFilter && u.type !== univTypeFilter) return false;
                      if (univAccredFilter && u.accreditation !== univAccredFilter) return false;
                      if (univSearch) {
                        const s = univSearch.toLowerCase();
                        return u.name.toLowerCase().includes(s) || u.shortName.toLowerCase().includes(s) || u.location.city.toLowerCase().includes(s);
                      }
                      return true;
                    })
                    .map((univ) => {
                      const isSaved = savedUnivIds.includes(univ.id);
                      return (
                        <div 
                          key={univ.id} 
                          className={`bg-white border rounded-2xl p-4 transition-all duration-200 hover:shadow-md flex flex-col justify-between ${selectedUniv?.id === univ.id ? "border-indigo-500 ring-2 ring-indigo-500/10" : "border-slate-200"}`}
                        >
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-black text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                                {univ.type}
                              </span>
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => toggleSaveUniv(univ.id)}
                                  className="p-1 hover:text-rose-500 text-slate-400"
                                >
                                  <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                                </button>
                              </div>
                            </div>

                            <h4 className="font-black text-slate-800 text-base leading-tight">{univ.name} ({univ.shortName})</h4>
                            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-300" /> {univ.location.city}, {univ.location.province}
                            </p>
                            
                            <p className="text-xs text-slate-500 mt-2 line-clamp-2">{univ.description}</p>
                            
                            <div className="mt-3 flex items-center gap-1.5 text-[10px] bg-slate-50 p-2 rounded-lg">
                              <span>Akreditasi: <strong>{univ.accreditation}</strong></span>
                              <span className="text-slate-300">|</span>
                              <span>Penyaluran: <strong>{univ.stats.graduateEmploymentRate}%</strong></span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                            <button 
                              onClick={() => {
                                setSelectedUniv(univ);
                                calculateDistance(univ);
                              }}
                              className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-xl text-xs transition-colors"
                            >
                              Profil Lengkap
                            </button>
                            <button 
                              onClick={() => calculateDistance(univ)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs transition-colors"
                              title="Hitung Jarak Monas"
                            >
                              Jalur Peta
                            </button>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>

                {/* Simulated distance calculator bento feedback */}
                {mapDistanceResult && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mt-4" id="map-routing-calculator-result">
                    <h4 className="font-black text-indigo-900 text-sm flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-indigo-600" /> Rencana Perjalanan Pendidikan (Mock Routing)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-xs">
                      <div>
                        <div className="text-slate-500">Dari Keberangkatan:</div>
                        <div className="font-bold text-slate-800">{mapDistanceResult.from}</div>
                        <div className="text-slate-500 mt-1">Ke Kampus:</div>
                        <div className="font-bold text-slate-800">{mapDistanceResult.to}</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Estimasi Jarak Tempuh Jalur Darat/Laut:</div>
                        <div className="font-extrabold text-indigo-700 text-base">{mapDistanceResult.distance} Kilometer</div>
                        <div className="text-[10px] text-slate-400 mt-1">Trans-Indonesia Route:</div>
                        <div className="font-semibold text-slate-600 text-[10px]">{mapDistanceResult.route.join(" ➔ ")}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Target Details Panel OR Fast Programs Finder */}
              <div className="lg:col-span-5 space-y-4">
                
                {selectedUniv ? (
                  <div className="bg-white border-2 border-indigo-600 rounded-2xl p-5 shadow-md space-y-4" id="campus-details-viewbox">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          Spesifikasi Penuh Kampus
                        </span>
                        <h4 className="text-xl font-extrabold text-slate-800 mt-1">{selectedUniv.name}</h4>
                      </div>
                      <button 
                        onClick={() => setSelectedUniv(null)}
                        className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        Tutup
                      </button>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600">
                      <p><strong>Sejarah:</strong> {selectedUniv.history}</p>
                      
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                        <h5 className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Statistik & Kualitas</h5>
                        <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                          <div className="bg-white p-2 rounded">
                            <span className="block text-slate-400">Total Mahasiswa</span>
                            <span className="font-bold text-slate-700">{selectedUniv.stats.totalStudents.toLocaleString()}</span>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <span className="block text-slate-400">Gaji Awal Rerata</span>
                            <span className="font-bold text-indigo-600">IDR {selectedUniv.stats.avgStartingSalaryMin}-{selectedUniv.stats.avgStartingSalaryMax} Jt/bln</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <strong>Fasilitas Unggulan:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedUniv.facilities.map((f, i) => (
                            <span key={i} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-medium">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <strong>Kontak & Informasi Pendaftaran:</strong>
                        <div className="bg-slate-100/60 p-2.5 rounded-lg text-[10px] space-y-1 mt-1">
                          <div>Situs Web: <a href={selectedUniv.contact.website} target="_blank" className="text-indigo-600 underline">{selectedUniv.contact.website}</a></div>
                          <div>Email: <span>{selectedUniv.contact.email}</span></div>
                          <div>Telepon Humas: <span>{selectedUniv.contact.phone}</span></div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Memulai Simulasi Virtual Tour 360° menuju: ${selectedUniv.name}.\n\nNikmati pemandangan asri kampus terbaik Indonesia!`)}
                      className="w-full bg-slate-900 text-white font-bold py-2 px-4 rounded-xl text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" /> Buka Virtual Tour Kampus 360
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-4">
                    <span className="text-indigo-300 text-[10px] font-black uppercase tracking-wider">REGISTRI JURUSAN</span>
                    <h3 className="text-lg font-bold">Pencari Cepat Program Studi</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Cari jurusan kuliah di Indonesia untuk menyelaraskan dengan kemampuan dan gaji karir impian Anda.
                    </p>

                    <div>
                      <input 
                        type="text"
                        value={progSearch}
                        onChange={(e) => setProgSearch(e.target.value)}
                        placeholder="Ketik nama jurusan (Teknik, Hukum...)"
                        className="w-full bg-white/10 text-white hover:bg-white/15 focus:bg-white/20 px-3.5 py-2.5 text-xs rounded-xl border border-white/20 focus:outline-none placeholder-slate-400"
                      />
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {programs
                        .filter(p => {
                          if (progSearch) {
                            return p.name.toLowerCase().includes(progSearch.toLowerCase()) || p.universityName.toLowerCase().includes(progSearch.toLowerCase());
                          }
                          return true;
                        })
                        .map((prog) => {
                          const isSaved = savedProgIds.includes(prog.id);
                          return (
                            <div key={prog.id} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs flex justify-between items-center transition-all">
                              <div>
                                <span className="font-bold text-[10px] text-amber-300">{prog.degree} {prog.name}</span>
                                <span className="block text-[10px] text-slate-300 mt-0.5">{prog.universityName}</span>
                                <span className="block text-[9px] text-emerald-300">Potensi Gaji: IDR {prog.averageSalaryRange.min}jt - {prog.averageSalaryRange.max}jt / bln</span>
                              </div>
                              <button 
                                onClick={() => toggleSaveProg(prog.id)}
                                className="p-1 hover:text-rose-500 text-slate-300 shrink-0 ml-2"
                                title="Masukkan Rencana Studi"
                              >
                                <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                              </button>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: AI CAREER DNA COUNSELOR */}
        {/* ============================================================= */}
        {activeTab === "counselor" && (
          <div className="space-y-6" id="view-ai-counselor">
            
            {/* Split Questionnaire VS Intelligent Graphical Output */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Questionnaire Form Side */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-1.5">
                    <Award className="w-5 h-5 text-indigo-600" /> Profil Minat & DNA Karir Siswa
                  </h3>
                  <p className="text-xs text-slate-400">Atur profil kepribadian Anda untuk memformulasikan rekomendasi studi AI paling akurat.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Nama Lengkap Siswa</label>
                    <input 
                      type="text" 
                      value={dnaProfile.fullName}
                      onChange={(e) => setDnaProfile({...dnaProfile, fullName: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Tipe Kepribadian (MBTI)</label>
                    <select 
                      value={dnaProfile.personalityType}
                      onChange={(e) => setDnaProfile({...dnaProfile, personalityType: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    >
                      <option value="Introvert (INFJ)">Introvert (INFJ) - Idealis Strategis</option>
                      <option value="Extrovert (ENTP)">Extrovert (ENTP) - Pemecah Masalah Kreatif</option>
                      <option value="Introvert (INTJ)">Introvert (INTJ) - Arsitek Rencana Lanjut</option>
                      <option value="Extrovert (ENFJ)">Extrovert (ENFJ) - Komunikator Sosial Pemimpin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Gaya Kerja yang Cocok</label>
                    <select 
                      value={dnaProfile.preferredWorkStyle}
                      onChange={(e) => setDnaProfile({...dnaProfile, preferredWorkStyle: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    >
                      <option value="Fleksibel dan Mandiri">Fleksibel dan Mandiri</option>
                      <option value="Kolaboratis Terstruktur">Kolaboratif Terstruktur (Perusahaan Multinasional)</option>
                      <option value="Penuh Riset Kualitatif">Laboratorium Riset & Akademis</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Pilih Kelebihan Akademis Utama (Centang)</label>
                    <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-50 rounded-xl max-h-32 overflow-y-auto">
                      {AC_STRENGTHS_CHOICES.map((st) => {
                        const checked = dnaProfile.academicStrengths.includes(st);
                        return (
                          <label key={st} className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={checked}
                              onChange={() => {
                                const next = checked 
                                  ? dnaProfile.academicStrengths.filter(x => x !== st) 
                                  : [...dnaProfile.academicStrengths, st];
                                setDnaProfile({...dnaProfile, academicStrengths: next});
                              }}
                              className="accent-indigo-600"
                            />
                            <span>{st}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Minat Utama Siswa</label>
                    <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-50 rounded-xl max-h-32 overflow-y-auto">
                      {INTEREST_CHOICES.map((inter) => {
                        const checked = dnaProfile.interests.includes(inter);
                        return (
                          <label key={inter} className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={checked}
                              onChange={() => {
                                const next = checked 
                                  ? dnaProfile.interests.filter(x => x !== inter) 
                                  : [...dnaProfile.interests, inter];
                                setDnaProfile({...dnaProfile, interests: next});
                              }}
                              className="accent-indigo-600"
                            />
                            <span>{inter}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 font-bold mb-1">
                      <span>Batas Anggaran Pendidikan</span>
                      <span className="text-indigo-600">IDR {dnaProfile.budgetLimit} Jt / Smt</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="40" 
                      value={dnaProfile.budgetLimit}
                      onChange={(e) => setDnaProfile({...dnaProfile, budgetLimit: Number(e.target.value)})}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                      <span>UKT Menengah (Rp 2 Jt)</span>
                      <span>UKT Kelas Atas (Rp 40 Jt)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={triggerDnaAssessment}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all tracking-wider uppercase shadow-md shadow-indigo-100"
                  >
                    Mulai Uji Kecocokan DNA AI →
                  </button>
                </div>
              </div>

              {/* Dynamic Intelligent Output Side */}
              <div className="lg:col-span-7 space-y-6">
                
                {dnaResult ? (
                  <div className="space-y-6" id="dna-assessment-results-panel">
                    
                    {/* Character Archetype */}
                    <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full mix-blend-screen opacity-15 filter blur-2xl"></div>
                      <span className="text-indigo-300 text-[10px] font-black uppercase tracking-widest block mb-1">
                        SAYAP INTELIJEN HASIL DIAGNOSIS
                      </span>
                      <h4 className="text-2xl font-black text-amber-300 leading-tight">
                        {dnaResult.personalityArchetype}
                      </h4>
                      <p className="text-xs text-indigo-100 mt-2 leading-relaxed opacity-90">
                        Berdasarkan perpaduan hobi {dnaProfile.hobbies.join(", ")}, kelebihan akademis {dnaProfile.academicStrengths.join(", ")}, dan MBTI {dnaProfile.personalityType}, sistem menilik Anda sangat cocok berkembang di skema karir berikut di Indonesia.
                      </p>

                      {/* Diagnostic Skills Bars */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-indigo-200">
                            <span>KREATIVITAS</span>
                            <span className="text-white font-heavy">{dnaResult.skillsDiagnosis.creativity}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${dnaResult.skillsDiagnosis.creativity}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-indigo-200">
                            <span>ANALITIKAL</span>
                            <span className="text-white font-heavy">{dnaResult.skillsDiagnosis.analytical}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${dnaResult.skillsDiagnosis.analytical}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-indigo-200">
                            <span>KOMUNIKASI</span>
                            <span className="text-white font-heavy">{dnaResult.skillsDiagnosis.communication}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-400 rounded-full" style={{ width: `${dnaResult.skillsDiagnosis.communication}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-indigo-200">
                            <span>KEPEMIMPINAN</span>
                            <span className="text-white font-heavy">{dnaResult.skillsDiagnosis.leadership}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-fuchsia-400 rounded-full" style={{ width: `${dnaResult.skillsDiagnosis.leadership}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Highly Compatible Career Roadmaps (SMA -> Univ -> Success) */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                        Rancangan Jalur Karir & Peta Jalan (Career Roadmap)
                      </h4>

                      <div className="space-y-6">
                        {dnaResult.compatibleCareers.map((c, idx) => (
                          <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-black text-slate-800 text-base">{c.title}</h5>
                                <span className="text-xs text-slate-500 font-semibold">{c.explanation}</span>
                              </div>
                              <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                                Keselarasan {c.compatibilityRate}%
                              </span>
                            </div>

                            {/* Roadmap Steps */}
                            <div className="mt-4">
                              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Pemberhentian Jenjang Karir:</div>
                              <div className="flex flex-wrap items-center gap-2">
                                {c.roadmap.map((step, sIdx) => (
                                  <React.Fragment key={sIdx}>
                                    <span className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg">
                                      {step}
                                    </span>
                                    {sIdx < c.roadmap.length - 1 && (
                                      <span className="text-slate-300 text-xs">➔</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compatible Study Programs & Target Campuses matches */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                        Rekomendasi Jurusan & Kampus Mitra Indonesia
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {dnaResult.compatibleMajors.map((mj, idx) => (
                          <div key={idx} className="bg-indigo-50 border border-indigo-100/50 p-4 rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold text-xs text-indigo-900">{mj.majorName}</span>
                              <span className="text-[10px] font-extrabold text-indigo-700 bg-white/75 px-1.5 py-0.5 rounded">
                                {mj.compatibilityRate}% Match
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{mj.reasons}</p>
                            
                            <div className="text-[10px]">
                              <span className="text-slate-400 font-bold block mb-1">UNIVERSITAS REKOMENDASI:</span>
                              <div className="flex flex-wrap gap-1">
                                {mj.suggestedUniversities.map((u, ui) => (
                                  <span key={ui} className="bg-indigo-600 text-white font-heavy text-[9px] px-2 py-0.5 rounded">
                                    {u}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Development Roadmap actions List */}
                      <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-4 mt-2">
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase font-black">
                          Rencana Pengembangan Mandiri Siswa
                        </span>
                        <ul className="text-xs text-amber-900 space-y-2 mt-2 list-disc pl-4 font-medium">
                          {dnaResult.developmentRoadmap.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-4 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Compass className="w-8 h-8 animate-spin" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg text-slate-800">Menunggu Uji Karir DNA</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                        Sistem sedang bersiaga membaca ketertarikan akademis dan profil psikologi siswa. Klik tombol luncur uji di samping kiri.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 4: ADMISSION PREDICTOR SYSTEM */}
        {/* ============================================================= */}
        {activeTab === "predictor" && (
          <div className="space-y-6" id="view-admission-predictor">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Inputs Control Box */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-1.5">
                    <BarChart3 className="w-5 h-5 text-rose-500" /> Penguji Probabilitas Masuk
                  </h3>
                  <p className="text-xs text-slate-400">
                    Masukkan nilai akademis rapot, prediksi nilai UTBK, dan rasio keuangan beasiswa untuk menghitung risiko.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Target Universitas</label>
                    <select 
                      value={predictInputs.targetUniversityId}
                      onChange={(e) => setPredictInputs({...predictInputs, targetUniversityId: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    >
                      {universities.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.shortName})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Program Studi Bidikan</label>
                    <input 
                      type="text" 
                      value={predictInputs.targetProgramName}
                      onChange={(e) => setPredictInputs({...predictInputs, targetProgramName: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      placeholder="Contoh: Teknik Informatika / Ilmu Komputer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Jalur Kelulusan Seleksi</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["SNBP", "SNBT", "Mandiri"].map((j) => (
                        <button
                          key={j}
                          onClick={() => setPredictInputs({...predictInputs, admissionType: j as any})}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${predictInputs.admissionType === j ? "bg-rose-500 text-white border-rose-500" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`}
                        >
                          {j}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-600 mb-1">
                      <span>Rerata Nilai Rapor Semester 1-5</span>
                      <span className="text-rose-500">{predictInputs.averageReportScore}/100</span>
                    </div>
                    <input 
                      type="range" 
                      min="70" 
                      max="100" 
                      value={predictInputs.averageReportScore}
                      onChange={(e) => setPredictInputs({...predictInputs, averageReportScore: Number(e.target.value)})}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  {predictInputs.admissionType !== "SNBP" && (
                    <div>
                      <div className="flex justify-between font-bold text-slate-600 mb-1">
                        <span>Prediksi Nilai UTBK (SNBT)</span>
                        <span className="text-rose-500">{predictInputs.utbkScore} Poin</span>
                      </div>
                      <input 
                        type="range" 
                        min="350" 
                        max="850" 
                        value={predictInputs.utbkScore}
                        onChange={(e) => setPredictInputs({...predictInputs, utbkScore: Number(e.target.value)})}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between font-bold text-slate-600 mb-1">
                      <span>Jumlah Sertifikat Prestasi (OSN/O2SN/Lomba)</span>
                      <span className="text-rose-500">{predictInputs.achievementsCount} Sertifikat</span>
                    </div>
                    <select 
                      value={predictInputs.achievementsCount}
                      onChange={(e) => setPredictInputs({...predictInputs, achievementsCount: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    >
                      <option value="0">Tidak Ada Sertifikat</option>
                      <option value="1">1 Sertifikat Tingkat Kabupaten</option>
                      <option value="2">2 Sertifikat Tingkat Provinsi</option>
                      <option value="3">3 Sertifikat Tingkat Nasional / Internasional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Status Perekonomian & KIP</label>
                    <select 
                      value={predictInputs.financialCondition}
                      onChange={(e) => setPredictInputs({...predictInputs, financialCondition: e.target.value as any})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    >
                      <option value="Menengah">Menengah / Mampu UKT Sedang</option>
                      <option value="Mampu">Sangat Mampu / Golongan Mandiri Atas</option>
                      <option value="Membutuhkan Beasiswa">Membutuhkan Beasiswa (KIP Kuliah Prioritas)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={triggerAdmissionPredictor}
                    disabled={loading}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-colors uppercase tracking-wider shadow-md shadow-rose-200"
                  >
                    Kalkulasi Peluang Kelulusan →
                  </button>
                </div>
              </div>

              {/* Outputs Analytical Results Side */}
              <div className="lg:col-span-7 space-y-6">
                
                {predictResult ? (
                  <div className="space-y-6" id="admission-prediction-results-showbox">
                    
                    {/* Big Gauge Card */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between">
                      <div className="text-center md:text-left">
                        <span className="text-[10px] font-black uppercase text-slate-400">STATUS PREDIKSI</span>
                        <h4 className="text-xl font-extrabold text-slate-800 mt-1">Peluang Kelulusan Anda</h4>
                        <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
                          Skor Anda divalidasi silang dengan data historis passing grade peminat nasional tahun sebelumnnya.
                        </p>
                      </div>

                      {/* Percentage Circle Gauge */}
                      <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="54" strokeWidth="10" stroke="#f1f5f9" fill="transparent" />
                          <circle cx="64" cy="64" r="54" strokeWidth="10" 
                                  stroke={predictResult.percentProbability > 75 ? "#10b981" : predictResult.percentProbability > 50 ? "#f59e0b" : "#f43f5e"} 
                                  fill="transparent" 
                                  strokeDasharray={2 * Math.PI * 54}
                                  strokeDashoffset={2 * Math.PI * 54 * (1 - predictResult.percentProbability / 100)} 
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-3xl font-black text-slate-800">{predictResult.percentProbability}%</span>
                          <span className="block text-[8px] text-slate-400 uppercase font-bold tracking-tighter">KEBERHASILAN</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed evaluation and risk analytics */}
                    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-rose-400">
                        Hasil Analisis Risiko & Daya Tampung
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {predictResult.riskAssessment}
                      </p>
                    </div>

                    {/* Formulir Peningkatan Tips */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                      <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Solusi & Saran Peningkatan Peluang
                      </h4>
                      
                      <div className="space-y-2">
                        {predictResult.improvementTips.map((tip, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-100 flex items-start gap-2">
                            <span className="font-black text-indigo-600 bg-indigo-50 px-1.5 rounded">{index + 1}</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Alternatives */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                      <h4 className="font-extrabold text-slate-800 text-sm">
                        Kampus Cadangan / Alternatif Pilihan Aman
                      </h4>
                      <p className="text-xs text-slate-400">Jika pilihan utama dinilai terlalu berisiko, pertimbangkan alternatif cadangan berikut:</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {predictResult.recommendedAlternatives.map((alt, i) => (
                          <div key={i} className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs space-y-1">
                            <div className="font-bold text-slate-800">{alt.universityName}</div>
                            <div className="text-[11px] text-slate-500">{alt.programName}</div>
                            <div className="text-emerald-700 font-extrabold text-[11px] mt-2 block">
                              Peluang Lolos Amalan: {alt.chance}% (Sangat Layak)
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-4 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                      <BarChart3 className="w-8 h-8 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg text-slate-800">Menunggu Amunisi Penilaian Rapor</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                        Sistem siap menganalisis daya tampung keketatan jalur SNBP/SNBT. Pilih parameter data dan tekan tombol kalkulasi.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 5: SCHOLARSHIP FINDER */}
        {/* ============================================================= */}
        {activeTab === "scholarships" && (
          <div className="space-y-6" id="view-scholarship-finder">
            
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
              <span className="text-amber-100 text-[10px] font-black uppercase tracking-widest">
                PERSATUAN KULIAH BEBAS BIAYA
              </span>
              <h3 className="text-2xl font-black mt-1">Portal Rekomendasi Beasiswa</h3>
              <p className="text-xs text-amber-50 opacity-90 max-w-xl mt-1 leading-relaxed">
                Menyortir beasiswa penuh baik dari pemerintah RI, korporasi swasta, BUMN, maupun yayasan untuk membantu pendanaan studi Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {scholarships.map((sch) => (
                <div key={sch.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2 py-0.5 rounded uppercase">
                        {sch.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{sch.coverage}</span>
                    </div>

                    <h4 className="font-black text-slate-800 text-base leading-tight">{sch.name}</h4>
                    <span className="text-xs text-slate-400 mt-1 block">Oleh: {sch.provider}</span>
                    
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-3">{sch.description}</p>
                    
                    <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">PERSYARATAN UTAMA:</div>
                      {sch.requirements.slice(0, 2).map((req, rid) => (
                        <div key={rid} className="text-slate-600 text-[11px] leading-tight">• {req}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-rose-500 font-bold">Batas Akhir: {sch.deadline}</span>
                    <a 
                      href={sch.applicationLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-600 hover:orange-500 font-bold flex items-center gap-1"
                    >
                      Daftar <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 6: ALUMNI PLATFORM (REVIEWS) */}
        {/* ============================================================= */}
        {activeTab === "alumni" && (
          <div className="space-y-6" id="view-alumni-forum">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Reviews List Column */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center justify-between">
                  <span>Ulasan Real & Gaji Alumni ({reviews.length} Kontribusi)</span>
                  <span className="text-xs bg-slate-100 text-indigo-700 font-bold px-2 py-0.5 rounded">Transparan</span>
                </h3>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-slate-800 text-sm">{rev.userName}</h5>
                            <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-black ${rev.userRole === "alumni" ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"}`}>
                              {rev.userRole}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 mt-0.5 block">Keluaran Jurusan: {rev.major}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.createdAt}</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{rev.content}"
                      </p>

                      {/* Ratings */}
                      <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="flex items-center gap-1">Kesesuaian: <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rev.ratingEngagement}/5</span>
                        <span className="flex items-center gap-1">Fasilitas: <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rev.ratingFacility}/5</span>
                        <span className="flex items-center gap-1">Pariwisata Karir: <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rev.ratingCareer}/5</span>
                      </div>

                      {/* Alumni Specific salary/company outcome */}
                      {rev.userRole === "alumni" && (rev.careerOutcome || rev.currentCompany) && (
                        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between text-xs text-slate-500">
                          <div>
                            Pekerjaan Sekarang: <span className="font-bold text-slate-700">{rev.careerOutcome || "Praktisi"}</span> di <span className="font-bold text-indigo-600">{rev.currentCompany || "Indonesia Corp"}</span>
                          </div>
                          {rev.salaryInsight && (
                            <div className="text-emerald-700 font-bold mt-1 sm:mt-0">
                              Estimasi Gaji Rerata: Rp {rev.salaryInsight} Juta / bulan
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contribute Review Form Column */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 h-fit">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Tulis Ulasan & Bagikan Kisah Kampus</h3>
                  <p className="text-xs text-slate-400">Bantu adik-adik tingkat sekolah menentukan nasib pendidikannya lewat transparansi Anda.</p>
                </div>

                <form onSubmit={submitReview} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Nama Kontributor (Boleh Anonim)</label>
                    <input 
                      type="text" 
                      required
                      value={reviewForm.userName}
                      onChange={(e) => setReviewForm({...reviewForm, userName: e.target.value})}
                      placeholder="Contoh: Farhan / Alumni Teknik UI"
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">Peran Anda</label>
                      <select 
                        value={reviewForm.userRole}
                        onChange={(e) => setReviewForm({...reviewForm, userRole: e.target.value as any})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      >
                        <option value="mahasiswa">Mahasiswa Aktif</option>
                        <option value="alumni">Alumni Terbaik</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">Nama Jurusan & Kampus</label>
                      <input 
                        type="text" 
                        required
                        value={reviewForm.major}
                        onChange={(e) => setReviewForm({...reviewForm, major: e.target.value})}
                        placeholder="Contoh: S1 Ilmu Komputer UI"
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Isi Masukan Ulasan (Harus Jujur & Konstruktif)</label>
                    <textarea 
                      required
                      value={reviewForm.content}
                      onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})}
                      placeholder="Bagikan atmosfer perkuliahan, sarana laboratorium, keramahan dosen serta kemudahan mencari pekerjaan..."
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Kesesuaian (1-5)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="5"
                        value={reviewForm.ratingEngagement}
                        onChange={(e) => setReviewForm({...reviewForm, ratingEngagement: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Fasilitas (1-5)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="5"
                        value={reviewForm.ratingFacility}
                        onChange={(e) => setReviewForm({...reviewForm, ratingFacility: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Karir (1-5)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="5"
                        value={reviewForm.ratingCareer}
                        onChange={(e) => setReviewForm({...reviewForm, ratingCareer: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  {reviewForm.userRole === "alumni" && (
                    <div className="p-3 bg-indigo-50/50 rounded-xl space-y-2">
                      <h5 className="font-bold text-slate-700 text-[10px] uppercase">Halaman Khusus Outcome Kerja Alumni</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-500">Jabatan Pekerjaan</label>
                          <input 
                            type="text" 
                            value={reviewForm.careerOutcome}
                            onChange={(e) => setReviewForm({...reviewForm, careerOutcome: e.target.value})}
                            placeholder="Contoh: Software Engineer"
                            className="w-full bg-white border border-slate-200 px-2 py-1 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500">Nama Instansi/Instansi</label>
                          <input 
                            type="text" 
                            value={reviewForm.currentCompany}
                            onChange={(e) => setReviewForm({...reviewForm, currentCompany: e.target.value})}
                            placeholder="Contoh: GoTo / Shopee / BI"
                            className="w-full bg-white border border-slate-200 px-2 py-1 rounded"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-500">Estimasi Gaji Bulanan (Juta Rupiah)</label>
                        <input 
                          type="number" 
                          value={reviewForm.salaryInsight}
                          onChange={(e) => setReviewForm({...reviewForm, salaryInsight: Number(e.target.value)})}
                          className="w-full bg-white border border-slate-200 px-2 py-1 rounded"
                        />
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-heavy py-2.5 px-4 rounded-xl text-xs uppercase"
                  >
                    Kirim Ulasan & Verifikasi Kelayakan Kampus
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 7: ADMIN SUITE / MANAGEMENT CONTROL PANEL */}
        {/* ============================================================= */}
        {activeTab === "admin" && (
          <div className="space-y-6" id="view-admin-management-suite">
            
            <div className="bg-amber-500 text-white rounded-3xl p-6 shadow bg-gradient-to-br from-amber-600 to-amber-700 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-amber-100 text-[10px] uppercase font-black tracking-wider block">
                  MANAJER MODERASI & ANALITIK DATA
                </span>
                <h3 className="text-2xl font-black mt-1">Konsol Kontrol Admin UniMatch</h3>
                <p className="text-xs text-amber-50 mt-1 max-w-lg">
                  Gunakan halaman ini untuk menambahkan data kampus baru, program studi, memantau rujukan beasiswa nasional, atau menyelaraskan respon Gemini AI.
                </p>
              </div>
              <span className="px-3.5 py-1.5 bg-black/20 text-xs font-black uppercase rounded-lg border border-white/15">
                Kredensial: Operator Utama
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Add Campus Form */}
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1">
                  <Plus className="w-4 h-4 text-amber-600" /> Tambah Universitas Baru
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">Nama Universitas</label>
                      <input 
                        type="text" 
                        placeholder="Universitas Terbuka Baru"
                        value={adminNewUniv.name}
                        onChange={(e) => setAdminNewUniv({...adminNewUniv, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Singkatan Akronim</label>
                      <input 
                        type="text" 
                        placeholder="UTB"
                        value={adminNewUniv.shortName}
                        onChange={(e) => setAdminNewUniv({...adminNewUniv, shortName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">Tipe</label>
                      <select 
                        value={adminNewUniv.type}
                        onChange={(e) => setAdminNewUniv({...adminNewUniv, type: e.target.value as any})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      >
                        <option value="PTN">PTN</option>
                        <option value="PTN-BH">PTN-BH</option>
                        <option value="PTS">PTS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Akreditasi</label>
                      <select 
                        value={adminNewUniv.accreditation}
                        onChange={(e) => setAdminNewUniv({...adminNewUniv, accreditation: e.target.value as any})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      >
                        <option value="Unggul">Unggul</option>
                        <option value="Baik Sekali">Baik Sekali</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">Provinsi</label>
                      <input 
                        type="text" 
                        value={adminNewUniv.province}
                        onChange={(e) => setAdminNewUniv({...adminNewUniv, province: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Kota</label>
                      <input 
                        type="text" 
                        value={adminNewUniv.city}
                        onChange={(e) => setAdminNewUniv({...adminNewUniv, city: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Deskripsi Singkat Kampus</label>
                    <textarea 
                      value={adminNewUniv.description}
                      onChange={(e) => setAdminNewUniv({...adminNewUniv, description: e.target.value})}
                      placeholder="Sebutkan keunikan universitas ini..."
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    />
                  </div>

                  <button 
                    onClick={handleAddUnivAdmin}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-heavy py-2.5 px-4 rounded-xl text-xs uppercase"
                  >
                    Simpan Kampus ke Database Sistem Registri
                  </button>
                </div>
              </div>

              {/* Add Study Program Form */}
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1">
                  <Plus className="w-4 h-4 text-emerald-600" /> Tambah Program Studi Baru
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1">Kaitkan ke Universitas</label>
                    <select 
                      value={adminNewProg.universityId}
                      onChange={(e) => setAdminNewProg({...adminNewProg, universityId: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    >
                      {universities.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.shortName})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Nama Program Studi</label>
                    <input 
                      type="text" 
                      placeholder="S1 Teknik Elektro Medik"
                      value={adminNewProg.name}
                      onChange={(e) => setAdminNewProg({...adminNewProg, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">Jenjang</label>
                      <select 
                        value={adminNewProg.degree}
                        onChange={(e) => setAdminNewProg({...adminNewProg, degree: e.target.value as any})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      >
                        <option value="S1">S1 (Sarjana)</option>
                        <option value="D4">D4 (Diploma IV)</option>
                        <option value="D3">D3 (Diploma III)</option>
                        <option value="S2">S2 (Magister)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Akreditasi</label>
                      <select 
                        value={adminNewProg.accreditation}
                        onChange={(e) => setAdminNewProg({...adminNewProg, accreditation: e.target.value as any})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      >
                        <option value="Unggul">Unggul</option>
                        <option value="Baik Sekali">Baik Sekali</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">Gaji Min (Juta Rupiah)</label>
                      <input 
                        type="number" 
                        value={adminNewProg.salaryMin}
                        onChange={(e) => setAdminNewProg({...adminNewProg, salaryMin: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Gaji Max (Juta Rupiah)</label>
                      <input 
                        type="number" 
                        value={adminNewProg.salaryMax}
                        onChange={(e) => setAdminNewProg({...adminNewProg, salaryMax: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleAddProgAdmin}
                    className="w-full bg-indigo-600 hover:bg-slate-800 text-white font-heavy py-2.5 px-4 rounded-xl text-xs uppercase"
                  >
                    Kaitkan Program Studi ke Kampus Terpilih
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Footer info brand */}
        <footer className="mt-auto pt-8 pb-4 text-center text-xs text-slate-400 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 UniMatch AI Indonesia. Semua Hak Dilindungi Undang-Undang RI.</span>
          <span>Sistem Informasi Riset Kemendikbudristek & BRIN</span>
        </footer>

      </div>
    </div>
  );
}
