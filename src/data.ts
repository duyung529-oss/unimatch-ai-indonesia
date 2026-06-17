import { University, StudyProgram, Scholarship, StudentReview } from "./types";

export const UNIVERSITIES: University[] = [
  {
    id: "univ-ui",
    name: "Universitas Indonesia",
    shortName: "UI",
    logoUrl: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Logo_Universitas_Indonesia.svg/1200px-Logo_Universitas_Indonesia.svg.png",
    type: "PTN-BH",
    description: "Universitas Indonesia (UI) adalah perguruan tinggi tertua di Indonesia yang menyelenggarakan pendidikan multi-disiplin ilmu kelas dunia. Memiliki kampus modern yang asri di Depok, Jawa Barat, dan Jakarta Pusat.",
    history: "Berdiri sejak masa kolonial sebagai STOVIA pada 1849 dan bertransformasi menjadi University of Indonesia pada tahun 1950. UI melambangkan pencarian ilmu pengetahuan tanpa batas yang dilambangkan oleh lambang Makara.",
    accreditation: "Unggul",
    contact: {
      website: "https://www.ui.ac.id",
      email: "humas-ui@ui.ac.id",
      phone: "021-1500002",
      socialMedia: {
        instagram: "@univ_indonesia",
        twitter: "@univ_indonesia",
        linkedin: "universitas-indonesia"
      }
    },
    location: {
      address: "Jl. Margonda Raya, Pondok Cina, Kec. Beji",
      province: "Jawa Barat",
      city: "Depok",
      postalCode: "16424",
      lat: -6.360634,
      lng: 106.827254
    },
    stats: {
      totalStudents: 47500,
      lecturers: 2300,
      graduateEmploymentRate: 88.5,
      avgStartingSalaryMin: 8, // Juta per bulan
      avgStartingSalaryMax: 18
    },
    facilities: [
      "Perpustakaan 'The Crystal of Knowledge'",
      "Bikun (Bis Kuning) Shuttle Bus",
      "Klinik Satelit Layanan Kesehatan",
      "Pusat Kegiatan Mahasiswa (Pusgiwa)",
      "Stadium Olahraga & Kolam Renang Standar Olympic",
      "Asrama Mahasiswa Kampus Depok"
    ],
    tuition: {
      semesterFeeMin: 0, // KIP / UKT Gol 1
      semesterFeeMax: 20, // UKT regular tertinggi
      admissionFeeMin: 0,
      admissionFeeMax: 15
    },
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd996e5b09?q=80&w=1000&auto=format&fit=crop",
    virtualTourUrl: "https://www.ui.ac.id/virtual-tour/"
  },
  {
    id: "univ-itb",
    name: "Institut Teknologi Bandung",
    shortName: "ITB",
    logoUrl: "https://upload.wikimedia.org/wikipedia/id/thumb/b/b5/Logo_Institut_Teknologi_Bandung.svg/1200px-Logo_Institut_Teknologi_Bandung.svg.png",
    type: "PTN-BH",
    description: "Institut Teknologi Bandung (ITB) merupakan sekolah tinggi teknik pertama di Indonesia, terkenal melahirkan inovator sains, teknologi, seni, dan kepemimpinan di Indonesia.",
    history: "Didirikan pada 3 Juli 1920 sebagai Technische Hoogeschool te Bandoeng (THB), ITB diresmikan dengan nama sekarang pada tahun 1959. Ir. Soekarno, proklamator Indonesia, adalah salah satu alumninya.",
    accreditation: "Unggul",
    contact: {
      website: "https://www.itb.ac.id",
      email: "humas@itb.ac.id",
      phone: "022-2500935",
      socialMedia: {
        instagram: "@itb1920",
        twitter: "@itbofficial",
        linkedin: "institut-teknologi-bandung"
      }
    },
    location: {
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kec. Coblong",
      province: "Jawa Barat",
      city: "Bandung",
      postalCode: "40132",
      lat: -6.891501,
      lng: 107.610659
    },
    stats: {
      totalStudents: 26000,
      lecturers: 1450,
      graduateEmploymentRate: 92.4,
      avgStartingSalaryMin: 10,
      avgStartingSalaryMax: 25
    },
    facilities: [
      "Perpustakaan Pusat ITB",
      "Gedung Aula Barat & Aula Timur (Arsitektur Art Deco)",
      "Sabuga (Sasana Budaya Ganesha)",
      "Observatorium Bosscha (Lembang)",
      "Laboratorium Desain & Fabrikasi Mikroelektronik",
      "Koneksi Internet Super-Cepat Kampus Ganesa"
    ],
    tuition: {
      semesterFeeMin: 0,
      semesterFeeMax: 25,
      admissionFeeMin: 0,
      admissionFeeMax: 20
    },
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
    virtualTourUrl: "https://virtualtour.itb.ac.id/"
  },
  {
    id: "univ-ugm",
    name: "Universitas Gadjah Mada",
    shortName: "UGM",
    logoUrl: "https://upload.wikimedia.org/wikipedia/id/thumb/f/f1/Logo_Universitas_Gadjah_Mada.svg/1200px-Logo_Universitas_Gadjah_Mada.svg.png",
    type: "PTN-BH",
    description: "Universitas Gadjah Mada (UGM) adalah universitas nasional tertua dan terbesar yang berkomitmen menyajikan pendidikan berkualitas tinggi yang berciri kebudayaan dan kerakyatan di Yogyakarta.",
    history: "Didirikan tanggal 19 Desember 1949 dengan nama Perguruan Tinggi Gadjah Mada yang berpusat di lingkungan Keraton Yogyakarta, menjadikannya tonggak perjuangan intelektual republik.",
    accreditation: "Unggul",
    contact: {
      website: "https://www.ugm.ac.id",
      email: "info@ugm.ac.id",
      phone: "0274-6492599",
      socialMedia: {
        instagram: "@ugm.yogyakarta",
        twitter: "@UGMYogyakarta",
        linkedin: "universitas-gadjah-mada"
      }
    },
    location: {
      address: "Bulaksumur, Caturtunggal, Kec. Depok, Sleman",
      province: "DI Yogyakarta",
      city: "Sleman",
      postalCode: "55281",
      lat: -7.771217,
      lng: 110.377484
    },
    stats: {
      totalStudents: 55000,
      lecturers: 2900,
      graduateEmploymentRate: 86.2,
      avgStartingSalaryMin: 7,
      avgStartingSalaryMax: 16
    },
    facilities: [
      "Perpustakaan Pusat & Pusat Dokumentasi Jendela Dunia",
      "Gedung Grha Sabha Pramana (GSP)",
      "UGM Residence (Asrama Mahasiswa)",
      "Klinik Medika Gadjah Mada",
      "Sistem Sepeda Kampus Jogja Mandiri",
      "Pusat Studi Sosial Tenggara (PSST)"
    ],
    tuition: {
      semesterFeeMin: 0,
      semesterFeeMax: 22,
      admissionFeeMin: 0,
      admissionFeeMax: 15
    },
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1000&auto=format&fit=crop",
    virtualTourUrl: "https://360.ugm.ac.id"
  },
  {
    id: "univ-its",
    name: "Institut Teknologi Sepuluh Nopember",
    shortName: "ITS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_ITS_biru_transparan.png",
    type: "PTN-BH",
    description: "ITS Surabaya berfokus kuat pada pengembangan bidang kemaritiman, teknik sains, desain industri modern, kecerdasan buatan, dan teknologi ramah lingkungan di Indonesia Timur.",
    history: "Didirikan sebagai Yayasan Perguruan Tinggi Teknik pada tahun 1957 oleh KH. Achmad Basyari. Nama Sepuluh Nopember disematkan sebagai penghormatan pahlawan kemerdekaan di Surabaya.",
    accreditation: "Unggul",
    contact: {
      website: "https://www.its.ac.id",
      email: "humas@its.ac.id",
      phone: "031-5994251",
      socialMedia: {
        instagram: "@its_campus",
        twitter: "@ITS_campus",
        linkedin: "institut-teknologi-sepuluh-nopember"
      }
    },
    location: {
      address: "Jl. Raya ITS, Sukolilo",
      province: "Jawa Timur",
      city: "Surabaya",
      postalCode: "60111",
      lat: -7.279612,
      lng: 112.797262
    },
    stats: {
      totalStudents: 22500,
      lecturers: 1100,
      graduateEmploymentRate: 91.0,
      avgStartingSalaryMin: 8.5,
      avgStartingSalaryMax: 22
    },
    facilities: [
      "Robotika Development Center ITS",
      "Perpustakaan Pusat Modern 6 Lantai",
      "Plaza Laboratorium Riset Bersama",
      "Medical Center ITS",
      "Fasilitas Galangan Kapal Uji Coba Hidrodinamika",
      "Fasilitas Olahraga & Smart Classroom"
    ],
    tuition: {
      semesterFeeMin: 500,
      semesterFeeMax: 15000,
      admissionFeeMin: 0,
      admissionFeeMax: 10000
    },
    imageUrl: "https://images.unsplash.com/photo-1562774053-401386df887f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "univ-binus",
    name: "Universitas Bina Nusantara",
    shortName: "BINUS",
    logoUrl: "https://binus.ac.id/wp-content/uploads/2021/11/logo-binus-university.png",
    type: "PTS",
    description: "Bina Nusantara (BINUS) merupakan perguruan tinggi swasta terkemuka di bidang Teknologi Informasi dan Komputer, Bisnis Digital, dan Rekayasa Perangkat Lunak berkualitas global.",
    history: "Memulai kiprah sebagai Modern Computer Course pada 1974, BINUS berkembang pesat menjadi Universitas berkelas dunia dengan program khusus '3+1 enrichment' untuk magang industri industri multinasional.",
    accreditation: "Unggul",
    contact: {
      website: "https://binus.ac.id",
      email: "gabung@binus.edu",
      phone: "021-53696969",
      socialMedia: {
        instagram: "@binusuniversityofficial",
        twitter: "@BINUS_Univ",
        linkedin: "bina-nusantara-university"
      }
    },
    location: {
      address: "Jl. K. H. Syahdan No. 9, Palmerah",
      province: "DKI Jakarta",
      city: "Jakarta Barat",
      postalCode: "11480",
      lat: -6.200127,
      lng: 106.785348
    },
    stats: {
      totalStudents: 42000,
      lecturers: 1800,
      graduateEmploymentRate: 94.1,
      avgStartingSalaryMin: 9,
      avgStartingSalaryMax: 24
    },
    facilities: [
      "BINUS Square Student Residence (Asrama Premium)",
      "Laboratorium Mac & Cisco Modern",
      "Apple Developer Academy (Kampus BSD)",
      "Integrated Creative Design Lab",
      "Smart Interactive Auditorium",
      "Inkubator Bisnis Digital 'BINUS Start'"
    ],
    tuition: {
      semesterFeeMin: 15,
      semesterFeeMax: 30,
      admissionFeeMin: 20,
      admissionFeeMax: 45
    },
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "univ-unhas",
    name: "Universitas Hasanuddin",
    shortName: "UNHAS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Logo_Unhas.png",
    type: "PTN-BH",
    description: "Universitas Hasanuddin merupakan pusat unggulan riset maritim, pertanian tropis, kedokteran, dan sosial humaniora terbesar di wilayah Indonesia Timur, berbasis di kota Makassar.",
    history: "Didirikan resmi pada tahun 1956 sebagai kepanjangan dari cabang Fakultas Ekonomi Universitas Indonesia Jakarta. Nama diambil dari pahlawan nasional Sultan Hasanuddin Ayam Jantan dari Timur.",
    accreditation: "Unggul",
    contact: {
      website: "https://unhas.ac.id",
      email: "info@unhas.ac.id",
      phone: "0411-586200",
      socialMedia: {
        instagram: "@hasanuddin_univ",
        twitter: "@hasanuddin_univ",
        linkedin: "universitas-hasanuddin"
      }
    },
    location: {
      address: "Jl. Perintis Kemerdekaan Km.10, Tamalanrea",
      province: "Sulawesi Selatan",
      city: "Makassar",
      postalCode: "90245",
      lat: -5.132431,
      lng: 119.489112
    },
    stats: {
      totalStudents: 31000,
      lecturers: 1600,
      graduateEmploymentRate: 82.5,
      avgStartingSalaryMin: 6,
      avgStartingSalaryMax: 13
    },
    facilities: [
      "Kampus II Gowa (Fakultas Teknik Super-Modern)",
      "Rumah Sakit Pendidikan UNHAS",
      "Pusat Pengembangan Riset Kemaritiman Wallacea",
      "Gedung Olahraga & Lapangan Sepak Bola Standar FIFA",
      "Gedung Rektorat UNHAS 8 lantai",
      "Danau Kampus Unhas Tamalanrea"
    ],
    tuition: {
      semesterFeeMin: 0,
      semesterFeeMax: 16,
      admissionFeeMin: 0,
      admissionFeeMax: 12
    },
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
  }
];

export const STUDY_PROGRAMS: StudyProgram[] = [
  // UI Programs
  {
    id: "prog-ui-cs",
    universityId: "univ-ui",
    universityName: "Universitas Indonesia",
    name: "Teknik Informatika / Ilmu Komputer",
    degree: "S1",
    faculty: "Fakultas Ilmu Komputer (Fasilkom)",
    accreditation: "Unggul",
    description: "Program studi Ilmu Komputer UI membekali mahasiswa dengan fondasi algoritma teori yang kuat, machine learning, rekayasa perangkat lunak, dan kecerdasan buatan tingkat lanjut.",
    tuitionGroupMin: 0,
    tuitionGroupMax: 18,
    curriculum: [
      "Algoritma & Struktur Data",
      "Basis Data & SQL",
      "Sistem Operasi & Jaringan",
      "Metodologi Rekayasa Perangkat Lunak",
      "Machine Learning & Data Mining",
      "Proyek Pengembangan Sistem Informasi"
    ],
    careerOpportunities: [
      "Software Engineer di Decacorn/Unicorn",
      "AI & Machine Learning Engineer",
      "Product Manager Teknologi",
      "Security Specialist / Penetration Tester",
      "Data Scientist / Analyst"
    ],
    averageSalaryRange: {
      min: 10,
      max: 28
    },
    requiredSkills: [
      "Analytical Thinking",
      "Problem Solving",
      "Mathematics & Logic",
      "Programming (Java, Python, JS, C++)"
    ],
    futureDemand: "Sangat Tinggi"
  },
  {
    id: "prog-ui-med",
    universityId: "univ-ui",
    universityName: "Universitas Indonesia",
    name: "Pendidikan Dokter (Kedokteran)",
    degree: "S1",
    faculty: "Fakultas Kedokteran (FK)",
    accreditation: "Unggul",
    description: "FKUI adalah fakultas kedokteran tertua dan terbaik di Indonesia, menghasilkan lulusan dokter umum dan dokter spesialis yang siap mengabdi di ranah kesehatan global dan riset medis.",
    tuitionGroupMin: 0,
    tuitionGroupMax: 20,
    curriculum: [
      "Anatomi & Histologi Manusia",
      "Fisiologi & Biokimia Medis",
      "Patologi & Farmakologi",
      "Sistem Kardiovaskular & Saraf",
      "Metodologi Penelitian Kesehatan",
      "Internship & Stase Klinik (Koas) di RSCM"
    ],
    careerOpportunities: [
      "Dokter Umum di Klinik & Rumah Sakit",
      "Dokter Spesialis (Bedah, Anak, Kandungan, dll)",
      "Akademisi & Peneliti Medis Terkemuka",
      "Konsultan Manajemen Layanan Kesehatan",
      "Healthpreneur / Owner Klinik Kesehatan"
    ],
    averageSalaryRange: {
      min: 8,
      max: 40
    },
    requiredSkills: [
      "Empathy & Active Listening",
      "Critical & Diagnostical Thinking",
      "Resilience & High Endurance",
      "Medical Pharmacology"
    ],
    futureDemand: "Sangat Tinggi"
  },

  // ITB Programs
  {
    id: "prog-itb-stei",
    universityId: "univ-itb",
    universityName: "Institut Teknologi Bandung",
    name: "Teknik Informatika",
    degree: "S1",
    faculty: "Sekolah Teknik Elektro & Informatika (STEI)",
    accreditation: "Unggul",
    description: "Pendidikan Informatika terdepan di Indonesia dengan ekosistem riset canggih, melatih mahasiswanya memecahkan komputasi kompleks, blockchain, augmented reality, dan cybersecurity.",
    tuitionGroupMin: 0,
    tuitionGroupMax: 25,
    curriculum: [
      "Struktur Diskrit & Logika Komputasi",
      "Algoritma Strategis & Struktur Data Lanjut",
      "Arsitektur Sistem Komputer",
      "Rekayasa Perangkat Lunak Terdistribusi",
      "Kombinatorika & Graf",
      "Tugas Akhir Inovasi Teknologi Industri"
    ],
    careerOpportunities: [
      "Lead Software Engineer",
      "Blockchain Architect",
      "Kombinatoris / Cryptographer",
      "Founder Startup FinTech",
      "Embedded Systems Developer"
    ],
    averageSalaryRange: {
      min: 12,
      max: 35
    },
    requiredSkills: [
      "Sains Algoritma",
      "Advanced Math",
      "System Architecture Design",
      "Programming (C++, Rust, Go, Python)"
    ],
    futureDemand: "Sangat Tinggi"
  },
  {
    id: "prog-itb-crypto",
    universityId: "univ-itb",
    universityName: "Institut Teknologi Bandung",
    name: "Kriya & Desain Produk",
    degree: "S1",
    faculty: "Fakultas Seni Rupa & Desain (FSRD)",
    accreditation: "Unggul",
    description: "Menggabungkan seni murni, warisan budaya nusantara, ergonomi modern, dan digital engineering untuk menciptakan desain produk fungsional bernilai jual tinggi.",
    tuitionGroupMin: 0,
    tuitionGroupMax: 20,
    curriculum: [
      "Menggambar Bentuk & Konstruksi",
      "Estetika Rupa & Komposisi",
      "Teknologi Material kayu & Logam",
      "3D Digital Product Prototyping",
      "Ergonomi Ergodesain",
      "Pemasaran Karya Kreatif & HAKI"
    ],
    careerOpportunities: [
      "Industrial Product Designer",
      "Creative Director",
      "UI/UX Visual Designer",
      "Konsultan Seni & Kriya Ekspor",
      "Jewelry & Fashion Craftsman"
    ],
    averageSalaryRange: {
      min: 6,
      max: 18
    },
    requiredSkills: [
      "Aesthetic Sense & Artistry",
      "CAD software (Blender, SolidWorks)",
      "Material Engineering Knowledge",
      "Creative Visioning"
    ],
    futureDemand: "Tinggi"
  },

  // UGM Programs
  {
    id: "prog-ugm-law",
    universityId: "univ-ugm",
    universityName: "Universitas Gadjah Mada",
    name: "Ilmu Hukum",
    degree: "S1",
    faculty: "Fakultas Hukum (FH)",
    accreditation: "Unggul",
    description: "FH UGM adalah pionir pendidikan hukum modern yang menaruh perhatian penting pada etika profesi, hukum korporat internasional, serta keadilan sosial bagi masyarakat marginal.",
    tuitionGroupMin: 0,
    tuitionGroupMax: 22,
    curriculum: [
      "Pengantar Hukum Indonesia",
      "Hukum Perdata & Pidana Indonesia",
      "Hukum Internasional & Hukum Perjanjian",
      "Filsafat Hukum & Teori Negara",
      "Teknik Konstruksi Kontrak Hukum",
      "Praktik Peradilan Semu (Moot Court)"
    ],
    careerOpportunities: [
      "Advokat Korporat / Corporate Lawyer",
      "Hakim / Jaksa Agung",
      "Legal Compliance Manager di Perusahaan",
      "Diplomat Luar Negeri di Kemenlu",
      "Notaris / PPAT Spesialis"
    ],
    averageSalaryRange: {
      min: 7,
      max: 25
    },
    requiredSkills: [
      "Excellent Verbal Oratry",
      "Critical Legal Analysis",
      "Document Integration & Drafting",
      "Negotiation & Mediation"
    ],
    futureDemand: "Tinggi"
  },
  {
    id: "prog-ugm-psych",
    universityId: "univ-ugm",
    universityName: "Universitas Gadjah Mada",
    name: "Psikologi",
    degree: "S1",
    faculty: "Fakultas Psikologi",
    accreditation: "Unggul",
    description: "Fakultas Psikologi UGM mengeksplorasi spektrum luas perilaku manusia, neuropsikologi, dinamika sosial perkotaan, kesehatan mental, pengembangan organisasi, dan kesejahteraan komunitas.",
    tuitionGroupMin: 0,
    tuitionGroupMax: 18,
    curriculum: [
      "Sejarah & Teori Psikologi",
      "Biopsikologi & Fungsi Saraf",
      "Metode Penelitian Kualitatif & Kuantitatif",
      "Psikometri & Pengukuran Bakat",
      "Psikopatologi & Konseling Dasar",
      "Psikologi Industri & Organisasi (PIO)"
    ],
    careerOpportunities: [
      "Human Resource Manager / Recruiter",
      "Staf Ahli Bimbingan Kesehatan Mental",
      "Asisten Peneliti & Konsultan Perilaku",
      "Market Research & Consumer Analyst",
      "Pendidik Anak Berkebutuhan Khusus"
    ],
    averageSalaryRange: {
      min: 6,
      max: 15
    },
    requiredSkills: [
      "Analytical Psychology",
      "Empathy & Active Listening",
      "Observation & Assessment",
      "Excellent Interpersonal Skills"
    ],
    futureDemand: "Tinggi"
  }
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "sch-kip",
    name: "KIP Kuliah Merdeka",
    provider: "Kemendikbudristek RI",
    category: "Pemerintah",
    coverage: "Fully Funded",
    benefitsDescription: "Pembebasan biaya kuliah penuh (UKT 100% ditanggung negara) dan bantuan biaya hidup bulanan berkisar Rp 800.000 - Rp 1.400.000 disesuaikan dengan indeks kemahalan wilayah kota/kabupaten kampus.",
    requirements: [
      "Siswa SMA/SMK/MA lulusan tahun berjalan atau maksimal 2 tahun sebelumnya.",
      "Memiliki potensi akademik baik tetapi mengalami kendala ekonomi (terdaftar DTKS/KKS/desil kemiskinan).",
      "Lolos seleksi masuk PTN (SNBP, SNBT) atau PTS terakreditasi minimal prodi B."
    ],
    targetMajorCategories: ["Masing-masing bidang studi PTN/PTS"],
    deadline: "31 Agustus 2026",
    applicationLink: "https://kip-kuliah.kemendikbud.go.id/",
    description: "Beasiswa prioritas program pemutus rantai kemiskinan nasional bagi siswa berprestasi dari latar belakang finansial terbatas."
  },
  {
    id: "sch-djarum",
    name: "Djarum Beasiswa Plus",
    provider: "Djarum Foundation",
    category: "Yayasan",
    coverage: "Partial Funded",
    benefitsDescription: "Dana beasiswa bernominal Rp 1.000.000 per bulan selama satu tahun penuh, disertai pembekalan soft skills eksklusif berupa Character Building, Leadership Training, Nation Building, dan kompetisi debat.",
    requirements: [
      "Sedang menempuh kuliah S1/D4 semester 4 di PTN/PTS mitra pilihan.",
      "Indeks Prestasi Kumulatif (IPK) minimum 3.00 pada semester 3.",
      "Aktif berorganisasi baik di dalam maupun di luar kampus."
    ],
    targetMajorCategories: ["Semua Jurusan"],
    deadline: "15 Mei 2026",
    applicationLink: "https://djarumbeasiswaplus.org/",
    description: "Beasiswa swasta paling bergengsi dalam pembentukan pemimpin masa depan (leadership development) di Indonesia."
  },
  {
    id: "sch-bu",
    name: "Beasiswa Unggulan Kemendikbud",
    provider: "Kementerian Pendidikan dan Kebudayaan RI",
    category: "Pemerintah",
    coverage: "Fully Funded",
    benefitsDescription: "Bantuan penuh biaya kuliah tunggal per semester hingga lulus (Maksimal 8 Semester), bantuan buku penunjang riset mandiri akademik, serta uang saku bulanan terjamin bagi siswa jenjang berprestasi unggul nasional/internasional.",
    requirements: [
      "Memiliki prestasi tingkat provinsi, nasional, atau internasional baik akademik maupun non-akademik.",
      "Mendapat LoA (Letter of Acceptance) unconditional dari perguruan tinggi terakreditasi Unggul/A.",
      "IPK minimal bagi mahasiswa semester aktif berjalan harus di atas 3.25."
    ],
    targetMajorCategories: ["Semua Jurusan Terkait Pembangunan"],
    deadline: "30 Juli 2026",
    applicationLink: "https://beasiswaunggulan.kemendikbud.go.id/",
    description: "Penghargaan bergengsi pemerintah bagi putra-putri unggul bangsa Indonesia untuk melanjutkan studi sarjana, master, dan doktor."
  }
];

export const REVIEWS: StudentReview[] = [
  {
    id: "rev-1",
    userName: "Fikri Ramadhan",
    userRole: "alumni",
    major: "Ilmu Komputer (S1 UI)",
    graduationYear: 2024,
    ratingEngagement: 5,
    ratingFacility: 5,
    ratingCareer: 5,
    content: "Kuliah di Fasilkom UI sangat menantang tapi seru sekali. Jaringan alumni yang kuat membuat saya langsung diserap kerja di salah satu Tech Unicorn Jakarta bahkan 3 bulan sebelum wisuda resmi. Kurikulumnya up-to-date dengan tren global AI saat ini.",
    careerOutcome: "Software Engineer III",
    currentCompany: "Tokopedia-TikTok",
    salaryInsight: 18,
    createdAt: "2026-02-14"
  },
  {
    id: "rev-2",
    userName: "Nadilla Putri",
    userRole: "mahasiswa",
    major: "Teknik Informatika (S1 ITB)",
    ratingEngagement: 5,
    ratingFacility: 4,
    ratingCareer: 5,
    content: "Lingkungan kompetitif super tinggi. Siapkan mental kerja keras tim begadang di Lab STEI Ganesa. Tapi dosen-dosennya bereputasi tinggi internasional dan banyak proyek riset futuristik modern yang bisa diikuti mahasiswa sejak tingkat kedua.",
    createdAt: "2026-05-10"
  },
  {
    id: "rev-3",
    userName: "Bambang Waskito",
    userRole: "alumni",
    major: "Ilmu Hukum (S1 UGM)",
    graduationYear: 2023,
    ratingEngagement: 4,
    ratingFacility: 5,
    ratingCareer: 4,
    content: "Sangat bersyukur kuliah hukum di UGM Yogyakarta. Atmosfer studi sangat ideal, biaya hidup murah, perpustakaan lengkap dengan ratusan ribu dokumen kasus bersejarah, dan tim Moot Court kami sering menjuarai kompetisi nasional maupun dunia.",
    careerOutcome: "Associate Associate Lawyer",
    currentCompany: "Hadiputranto, Hadinoto & Partners",
    salaryInsight: 15,
    createdAt: "2025-11-20"
  }
];
