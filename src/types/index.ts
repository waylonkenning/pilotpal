export interface UserProgress {
  id: string
  startDate: Date
  lastUpdated: Date
  profile: UserProfile
  flightHours: FlightHours
  theoryExams: TheoryExams
  achievements: Achievement[]
  expenses: Expense[]
  flightEntries: FlightEntry[]
}

export interface FlightEntry {
  id: string
  date: Date
  description: string
  hours: FlightHours
}

export interface UserProfile {
  name: string
  targetCompletionDate?: Date
  medicalType: 'class2' | 'dl9' | null
  medicalExpiry?: Date
}

export interface FlightHours {
  dual: number
  solo: number
  crossCountry: number
  instrument: number
  night: number
  total: number
}

export interface TheoryExams {
  airLaw: ExamStatus
  navigation: ExamStatus
  technical: ExamStatus
  humanFactors: ExamStatus
  meteorology: ExamStatus
  radioTelephony: ExamStatus
}

export interface ExamStatus {
  attempted: boolean
  passed: boolean
  score?: number
  date?: Date
}

export interface Achievement {
  id: string
  unlockedAt: Date
  category: 'flight' | 'theory' | 'hours' | 'special'
  title: string
  description: string
  badgeIcon: string
  metadata?: Record<string, any>
}

export interface Expense {
  id: string
  date: Date
  category: 'flight' | 'theory' | 'medical' | 'equipment' | 'fees'
  amount: number
  description: string
}

export interface TrainingPhase {
  id: string
  name: string
  description: string
  hourRange: {
    min: number
    max: number
  }
  milestones: string[]
  color: string
}

export interface Badge {
  id: string
  title: string
  description: string
  icon: string
  category: 'flight' | 'theory' | 'hours' | 'special'
  requirements: BadgeRequirement[]
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum'
}

export interface BadgeRequirement {
  type: 'hours' | 'exam' | 'milestone' | 'custom'
  value: number | string | boolean
  description: string
}