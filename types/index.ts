export type RIASECType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RIASECScores {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface TestQuestion {
  id: number;
  question: string;
  type: RIASECType;
}

export interface TestResult {
  id: string;
  user_id: string;
  riasec_scores: RIASECScores;
  dominant_types: RIASECType[];
  created_at: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  primary_riasec: RIASECType;
  secondary_riasec?: RIASECType;
  required_skills: string[];
  education_level: string;
  salary_range: {
    min: number;
    max: number;
  };
  growth_outlook: string;
  work_environment: string;
  typical_tasks: string[];
  created_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  last_test_date?: string;
}