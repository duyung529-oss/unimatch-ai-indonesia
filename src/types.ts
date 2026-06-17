export interface ContactInfo {
  website: string;
  email: string;
  phone: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface LocationInfo {
  address: string;
  province: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
}

export interface UniversityStats {
  totalStudents: number;
  lecturers: number;
  graduateEmploymentRate: number; // percentage
  avgStartingSalaryMin: number; // in IDR (Juta per bulan)
  avgStartingSalaryMax: number; // in IDR
}

export interface CampusFacility {
  name: string;
  category: "akademik" | "olahraga" | "sosial" | "penunjang";
  description: string;
}

export interface TuitionCost {
  semesterFeeMin: number; // in IDR (Juta per semester)
  semesterFeeMax: number;
  admissionFeeMin: number; // UKT/UP (Juta)
  admissionFeeMax: number;
}

export interface StudentReview {
  id: string;
  userName: string;
  userRole: "mahasiswa" | "alumni";
  major: string;
  graduationYear?: number;
  ratingEngagement: number; // 1-5
  ratingFacility: number; // 1-5
  ratingCareer: number; // 1-5
  content: string;
  careerOutcome?: string;
  currentCompany?: string;
  salaryInsight?: number; // Juta IDR/bulan
  createdAt: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  type: "PTN" | "PTS" | "PTN-BH";
  description: string;
  history: string;
  accreditation: "A" | "B" | "C" | "Unggul" | "Baik Sekali";
  contact: ContactInfo;
  location: LocationInfo;
  stats: UniversityStats;
  facilities: string[];
  tuition: TuitionCost;
  imageUrl: string;
  virtualTourUrl?: string;
}

export interface StudyProgram {
  id: string;
  universityId: string;
  universityName: string; // denormalized for search speed
  name: string;
  degree: "S1" | "D4" | "D3" | "S2";
  faculty: string;
  accreditation: "A" | "B" | "C" | "Unggul" | "Baik Sekali";
  description: string;
  tuitionGroupMin: number; // Juta IDR
  tuitionGroupMax: number; // Juta IDR
  curriculum: string[]; // key subjects/semester list
  careerOpportunities: string[];
  averageSalaryRange: {
    min: number; // IDR Juta / month
    max: number;
  };
  requiredSkills: string[];
  futureDemand: "Sangat Tinggi" | "Tinggi" | "Sedang" | "Sangat Spesifik";
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: "Pemerintah" | "Swasta" | "BUMN" | "Yayasan" | "Kampus";
  coverage: "Fully Funded" | "Partial Funded" | "Tuition Only";
  benefitsDescription: string;
  requirements: string[];
  targetMajorCategories?: string[];
  targetUniversities?: string[]; // Empty means all
  deadline: string;
  applicationLink: string;
  description: string;
}

export interface CareerPath {
  title: string;
  description: string;
  averageSalaryMin: number; // Juta IDR/bln
  averageSalaryMax: number;
  skillsRequired: string[];
  industryTrend: string;
  recommendedCertifications: string[];
}

export interface AssessmentProfile {
  fullName: string;
  gender: string;
  academicStrengths: string[];
  interests: string[];
  hobbies: string[];
  personalityType: string;
  preferredWorkStyle: string;
  locationPreference: string[];
  budgetLimit: number; // Max ukt Juta IDR
}

export interface DNAAssessmentResult {
  personalityArchetype: string;
  skillsDiagnosis: {
    creativity: number; // 0-100
    analytical: number;
    communication: number;
    leadership: number;
    adaptability: number;
  };
  compatibleCareers: {
    title: string;
    compatibilityRate: number; // Percentage
    explanation: string;
    roadmap: string[]; // Step list e.g. ["Kuliah S1", "Magang", "Junior Developer"]
  }[];
  compatibleMajors: {
    majorName: string;
    compatibilityRate: number;
    reasons: string;
    suggestedUniversities: string[]; // shortNames
  }[];
  scholarshipSuggestions: {
    scholarshipId: string;
    scholarshipName: string;
    matchScore: number;
    reason: string;
  }[];
  developmentRoadmap: string[]; // Custom coaching items
}

export interface AdmissionPredictionInput {
  targetUniversityId: string;
  targetProgramName: string; // e.g. Teknik Informatika
  admissionType: "SNBP" | "SNBT" | "Mandiri";
  averageReportScore: number; // 0-100
  utbkScore?: number; // 300-1000
  achievementsCount: number;
  financialCondition: "Menengah" | "Mampu" | "Membutuhkan Beasiswa";
}

export interface AdmissionPredictionResult {
  percentProbability: number;
  riskAssessment: string;
  improvementTips: string[];
  recommendedAlternatives: {
    universityName: string;
    programName: string;
    chance: number;
  }[];
}
