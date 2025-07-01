// PPL Quest NZ - TypeScript Type Definitions
// Based on New Zealand CAA Part 61 regulations

// ========================
// User Profile & Medical
// ========================

export interface UserProfile {
  id: string
  name: string
  email: string
  dateOfBirth: Date
  caaParticipantId?: string
  createdAt: Date
  updatedAt: Date
}

export type MedicalCertificateType = 'class2' | 'dl9'

export interface MedicalCertificate {
  id: string
  type: MedicalCertificateType
  issueDate: Date
  expiryDate: Date
  examinerName?: string
  examinerLocation?: string
  cost: number
  restrictions?: string[]
  isActive: boolean
}

export interface FitAndProperPerson {
  id: string
  submissionDate: Date
  expiryDate: Date // Valid for 1 year
  status: 'pending' | 'approved' | 'requires_update'
  hasChanges: boolean
  declarationUsed: '24FPP' | '24FPPDEC'
}

// ========================
// Flight Training System
// ========================

export interface FlightHours {
  dual: number          // 15 hours minimum
  solo: number          // 15 hours minimum  
  crossCountry: number  // 10 hours minimum
  instrument: number    // 5 hours minimum
  terrainAwareness: number // 5 hours minimum (NZ specific)
  night?: number        // 5 hours optional (2h dual, 2h solo, 1h additional)
  total: number
}

export interface TrainingPhase {
  id: string
  name: string
  description: string
  hourRange: { min: number; max: number }
  lessons: Lesson[]
  requiredSkills: string[]
  color: string
}

export interface Lesson {
  id: string
  number: number
  name: string
  description: string
  phaseId: string
  objectives: string[]
  dualHours: number
  soloHours?: number
  prerequisites: string[]
  isCompleted: boolean
  completedDate?: Date
  instructorName?: string
  instructorSignature?: string
  notes?: string
}

export interface FlightEntry {
  id: string
  date: Date
  lessonId?: string
  aircraft: string
  route: string
  dualTime: number
  soloTime: number
  crossCountryTime: number
  instrumentTime: number
  nightTime: number
  dayLandings: number
  nightLandings: number
  instructorName?: string
  description: string
  endorsements?: string[]
  cost?: number
}

// ========================
// Theory Examinations
// ========================

export type TheorySubject = 
  | 'airLaw'
  | 'navigation' 
  | 'technicalKnowledge'
  | 'humanFactors'
  | 'meteorology'
  | 'radioTelephony'

export interface TheoryExam {
  id: string
  subject: TheorySubject
  attemptNumber: number
  examDate: Date
  score: number
  passed: boolean // 70% minimum
  examCenter: string
  cost: number
  expiryDate: Date // Passes expire after certain period
}

export interface TheoryProgress {
  [K in TheorySubject]: {
    attempts: TheoryExam[]
    isPassed: boolean
    studyHours: number
    nextAttemptEarliestDate?: Date
  }
}

// ========================
// Achievement System
// ========================

export type AchievementCategory = 
  | 'foundation' 
  | 'circuit' 
  | 'navigation' 
  | 'advanced' 
  | 'certification'
  | 'currency'

export interface Achievement {
  id: string
  title: string
  description: string
  category: AchievementCategory
  icon: string
  requirements: AchievementRequirement[]
  xpReward: number
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum'
  unlockedAt?: Date
  isSecret?: boolean
}

export interface AchievementRequirement {
  type: 'flightHours' | 'lesson' | 'solo' | 'exam' | 'endorsement' | 'special'
  value: number | string | boolean
  description: string
}

export interface UserAchievement {
  achievementId: string
  unlockedAt: Date
  progress: number // 0-100
}

// ========================
// Financial Tracking
// ========================

export type ExpenseCategory = 
  | 'dualInstruction'
  | 'soloFlight'
  | 'aircraft'
  | 'medical'
  | 'theory'
  | 'testing'
  | 'equipment'
  | 'fees'
  | 'fuel'
  | 'insurance'

export interface Expense {
  id: string
  date: Date
  category: ExpenseCategory
  amount: number
  description: string
  flightEntryId?: string
  theoryExamId?: string
  medicalId?: string
  receipt?: string
}

export interface Budget {
  totalBudget: number
  spentAmount: number
  remainingAmount: number
  categoryBreakdown: Record<ExpenseCategory, number>
  projectedCompletion: Date
  averageHourlyCost: number
}

// ========================
// Solo Flight Management
// ========================

export interface SoloEndorsement {
  id: string
  type: 'initial' | 'crossCountry' | 'specific'
  grantedDate: Date
  expiryDate: Date
  restrictions: string[]
  routes?: string[]
  instructorName: string
  instructorNumber: string
  isActive: boolean
}

// ========================
// Weather & Conditions
// ========================

export interface WeatherDecision {
  id: string
  flightDate: Date
  decision: 'go' | 'no-go' | 'delay'
  factors: string[]
  reasoning: string
  actualConditions?: string
  lessonLearned?: string
}

// ========================
// Currency & Compliance
// ========================

export interface Currency {
  type: 'passenger' | 'night' | 'bfr'
  lastCompleted: Date
  expiryDate: Date
  isExpired: boolean
  requirements: string[]
}

export interface BiennialFlightReview {
  id: string
  dueDate: Date
  completedDate?: Date
  instructorName?: string
  groundTime: number
  flightTime: number
  cost?: number
  isCompleted: boolean
}

// ========================
// Main User Progress
// ========================

export interface UserProgress {
  profile: UserProfile
  medical: MedicalCertificate
  fpp: FitAndProperPerson
  flightHours: FlightHours
  lessons: Lesson[]
  flightEntries: FlightEntry[]
  theoryProgress: TheoryProgress
  achievements: UserAchievement[]
  expenses: Expense[]
  budget: Budget
  soloEndorsements: SoloEndorsement[]
  weatherDecisions: WeatherDecision[]
  currency: Currency[]
  bfr?: BiennialFlightReview
  
  // Progress calculations
  currentPhase: TrainingPhase
  totalXP: number
  completionPercentage: number
  estimatedCompletionDate: Date
  
  // NZ Specific
  nightFlyingElected: boolean
  mountainFlyingHours: number
  lowLevelHours: number // Below 500ft AGL
}

// ========================
// Training Organization
// ========================

export interface TrainingOrganization {
  id: string
  name: string
  location: string
  caaApprovalNumber: string
  fleetAircraft: Aircraft[]
  instructors: Instructor[]
  hourlyRates: Record<string, number>
  packageDeals?: TrainingPackage[]
}

export interface Aircraft {
  id: string
  registration: string
  type: string
  category: 'training' | 'complex' | 'tailwheel'
  hourlyRate: number
  isAvailable: boolean
  lastMaintenance: Date
}

export interface Instructor {
  id: string
  name: string
  caaNumber: string
  ratings: string[]
  hourlyRate: number
  specialties: string[]
  isAvailable: boolean
}

export interface TrainingPackage {
  id: string
  name: string
  description: string
  totalHours: number
  price: number
  inclusions: string[]
  validity: number // months
}

// ========================
// Integration Types
// ========================

export interface CAMMyAviationIntegration {
  isLinked: boolean
  participantId?: string
  lastSync?: Date
  availableServices: string[]
}

export interface ASPEQIntegration {
  isLinked: boolean
  userId?: string
  availableExams: TheorySubject[]
  practiceTestsCompleted: number
}

// ========================
// Constants & Enums
// ========================

export const NZ_PPL_MINIMUMS = {
  TOTAL_HOURS: 50,
  DUAL_HOURS: 15,
  SOLO_HOURS: 15,
  CROSS_COUNTRY_HOURS: 10,
  INSTRUMENT_HOURS: 5,
  TERRAIN_AWARENESS_HOURS: 5,
  NIGHT_HOURS: 5, // Optional
  LOW_LEVEL_HOURS: 2, // Below 500ft AGL minimum
  
  THEORY_PASS_MARK: 70,
  THEORY_SUBJECTS: 6,
  THEORY_RETEST_LIMIT: 3,
  
  MEDICAL_VALIDITY_UNDER_40: 5, // years
  MEDICAL_VALIDITY_40_50: 2,    // years  
  MEDICAL_VALIDITY_OVER_50: 1,  // year
  
  BFR_INTERVAL: 24, // months
  CURRENCY_LANDINGS: 3, // within 90 days
  
  ESTIMATED_COST_MIN: 25000, // NZD
  ESTIMATED_COST_MAX: 35000, // NZD
  STUDENT_LOAN_MAX: 35000,   // NZD
} as const

export const TRAINING_PHASES: TrainingPhase[] = [
  {
    id: 'foundation',
    name: 'Foundation Phase',
    description: 'Basic aircraft control and first solo preparation',
    hourRange: { min: 0, max: 15 },
    lessons: [], // Will be populated separately
    requiredSkills: ['basic_controls', 'radio_comms', 'circuit_pattern'],
    color: '#3B82F6'
  },
  {
    id: 'circuit',
    name: 'Circuit Phase',
    description: 'Pattern work mastery and emergency procedures',
    hourRange: { min: 15, max: 25 },
    lessons: [],
    requiredSkills: ['solo_circuits', 'emergency_procedures', 'precision_landings'],
    color: '#10B981'
  },
  {
    id: 'navigation',
    name: 'Navigation Phase', 
    description: 'Cross-country skills and weather decision making',
    hourRange: { min: 25, max: 40 },
    lessons: [],
    requiredSkills: ['nav_planning', 'dead_reckoning', 'weather_decisions'],
    color: '#F59E0B'
  },
  {
    id: 'advanced',
    name: 'Advanced Phase',
    description: 'Instrument basics and test preparation',
    hourRange: { min: 40, max: 50 },
    lessons: [],
    requiredSkills: ['instrument_flying', 'mountain_flying', 'test_prep'],
    color: '#EF4444'
  },
  {
    id: 'certification',
    name: 'Certification Phase',
    description: 'Theory exams and flight test readiness',
    hourRange: { min: 50, max: 60 },
    lessons: [],
    requiredSkills: ['all_exams_passed', 'flight_test_ready'],
    color: '#8B5CF6'
  }
] as const