import { TrainingPhase, Badge } from '@/types'

export const TRAINING_PHASES: TrainingPhase[] = [
  {
    id: 'foundation',
    name: 'Foundation Phase',
    description: 'Basic aircraft control and first solo preparation',
    hourRange: { min: 0, max: 15 },
    milestones: ['First Flight', 'Controls Master', 'Radio Operator', 'Pattern Pilot'],
    color: '#3B82F6'
  },
  {
    id: 'circuit',
    name: 'Circuit Phase',
    description: 'Pattern work mastery and emergency procedures',
    hourRange: { min: 15, max: 25 },
    milestones: ['Solo Wings', 'Emergency Ace', 'Precision Pilot'],
    color: '#10B981'
  },
  {
    id: 'navigation',
    name: 'Navigation Phase',
    description: 'Cross-country skills and weather decision making',
    hourRange: { min: 25, max: 40 },
    milestones: ['Navigator Bronze', 'Navigator Silver', 'Weather Wise'],
    color: '#F59E0B'
  },
  {
    id: 'advanced',
    name: 'Advanced Phase',
    description: 'Instrument basics and test preparation',
    hourRange: { min: 40, max: 50 },
    milestones: ['Navigator Gold', 'Mountain Flyer', 'Test Ready'],
    color: '#EF4444'
  },
  {
    id: 'certification',
    name: 'Certification Phase',
    description: 'Theory exams and flight test readiness',
    hourRange: { min: 50, max: 60 },
    milestones: ['Licensed Pilot'],
    color: '#8B5CF6'
  }
]

export const CORE_BADGES: Badge[] = [
  {
    id: 'first-flight',
    title: 'First Flight',
    description: 'Complete your introductory flight',
    icon: '🛫',
    category: 'flight',
    requirements: [
      { type: 'hours', value: 0.5, description: 'Log at least 0.5 hours dual' }
    ],
    rarity: 'bronze'
  },
  {
    id: 'controls-master',
    title: 'Controls Master',
    description: 'Demonstrate basic aircraft control',
    icon: '🎮',
    category: 'flight',
    requirements: [
      { type: 'hours', value: 5, description: 'Complete 5 hours dual instruction' }
    ],
    rarity: 'bronze'
  },
  {
    id: 'solo-wings',
    title: 'Solo Wings',
    description: 'Your first solo flight - a major milestone!',
    icon: '⭐',
    category: 'flight',
    requirements: [
      { type: 'hours', value: 0.1, description: 'Log first solo flight' }
    ],
    rarity: 'gold'
  },
  {
    id: 'licensed-pilot',
    title: 'Licensed Pilot',
    description: 'Congratulations! You\'ve earned your PPL(A)',
    icon: '🎖️',
    category: 'flight',
    requirements: [
      { type: 'hours', value: 50, description: 'Complete minimum 50 hours' },
      { type: 'exam', value: true, description: 'Pass all theory exams' }
    ],
    rarity: 'platinum'
  }
]

export const EXAM_SUBJECTS = [
  'airLaw',
  'navigation', 
  'technical',
  'humanFactors',
  'meteorology',
  'radioTelephony'
] as const

export const EXPENSE_CATEGORIES = [
  'flight',
  'theory',
  'medical',
  'equipment',
  'fees'
] as const