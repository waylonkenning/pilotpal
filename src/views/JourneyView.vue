<template>
  <div class="app-layout" data-testid="journey-view">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">🗺️ Your PPL Journey</h1>
            <p class="text-sm opacity-60">
              Track your progress through the Private Pilot License training program
            </p>
          </div>
          <button 
            @click="showHoursEducation = true"
            class="btn btn-secondary btn-sm"
            data-testid="flight-hours-education-button"
          >
            ⏱️ Hours Guide
          </button>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">

        <!-- Training Progress Summary -->
        <div class="card card-elevated mb-xl" data-testid="training-summary">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📊</div>
            <div>
              <h2 class="font-bold">Training Progress Summary</h2>
              <p class="text-sm opacity-80">Your current status in the PPL program</p>
            </div>
          </div>
          
          <!-- Current Status -->
          <div class="card card-compact mb-md" data-testid="current-status">
            <h3 class="font-medium mb-md">Current Status</h3>
            <div class="grid grid-cols-2 gap-md">
              <div class="flex justify-between">
                <span class="text-sm">Current Lesson:</span>
                <span class="badge badge-primary">{{ progress.currentLesson }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Completed Lessons:</span>
                <span class="badge badge-success">{{ progress.completedLessons.length }}/27</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Total Flight Hours:</span>
                <span class="badge badge-warning">{{ progress.flightHours.total }}/50</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Achievements Earned:</span>
                <span class="badge badge-purple">{{ progress.achievements.length }}/12</span>
              </div>
            </div>
          </div>

          <!-- Training Phases Overview -->
          <div class="card card-compact" data-testid="phases-overview">
            <h3 class="font-medium mb-md">Training Phases</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div v-for="phase in trainingPhases" :key="phase.id" class="card card-compact">
                <div class="flex items-center gap-sm mb-sm">
                  <span class="text-lg">{{ phase.icon }}</span>
                  <strong class="font-medium">{{ phase.name }}</strong>
                  <span class="badge badge-secondary">{{ phase.lessons }}</span>
                </div>
                <div class="text-sm opacity-80">{{ phase.description }}</div>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="card card-compact mt-lg" style="background: var(--gradient-primary); color: var(--text-inverse);" data-testid="next-steps">
            <h3 class="font-medium mb-md">🎯 Next Steps</h3>
            <div class="text-sm">{{ nextStepsMessage }}</div>
          </div>
        </div>

        <!-- Training Phase Indicator -->
        <div class="card card-elevated mb-xl" data-testid="training-phase-indicator">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">{{ currentPhase.icon }}</div>
            <div>
              <h2 class="font-bold">{{ currentPhase.name }}</h2>
              <p class="text-sm opacity-80">{{ currentPhase.description }}</p>
            </div>
          </div>
          
          <div class="card card-compact" :style="{ background: currentPhase.gradient, color: 'var(--text-inverse)' }">
            <div class="font-medium mb-sm">🎯 Current Focus</div>
            <div class="text-sm opacity-90 mb-md">{{ currentPhase.focus }}</div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div class="text-center">
                <div class="text-lg font-bold">{{ currentPhase.progress.completed }}</div>
                <div class="text-sm opacity-90">{{ currentPhase.progress.label }}</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold">{{ currentPhase.requirements.total - currentPhase.requirements.completed }}</div>
                <div class="text-sm opacity-90">Remaining</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold">{{ Math.round((currentPhase.requirements.completed / currentPhase.requirements.total) * 100) }}%</div>
                <div class="text-sm opacity-90">Complete</div>
              </div>
            </div>

            <!-- Phase Progress Bar -->
            <div class="mt-md">
              <div class="progress">
                <div class="progress-bar" 
                     :style="{ width: Math.round((currentPhase.requirements.completed / currentPhase.requirements.total) * 100) + '%' }">
                </div>
              </div>
            </div>
          </div>

          <!-- Phase Navigation -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-sm mt-md">
            <div v-for="(phase, index) in allPhases" :key="index" 
                 class="text-center p-sm rounded"
                 :class="phase.name === currentPhase.name ? 'bg-primary text-white' : 'bg-secondary'"
                 data-testid="phase-indicator">
              <div class="text-lg">{{ phase.icon }}</div>
              <div class="text-xs font-medium">{{ phase.shortName }}</div>
            </div>
          </div>
        </div>
        
        <!-- Back to Dashboard -->
        <div class="text-center">
          <router-link to="/dashboard" class="btn btn-secondary">
            ← Back to Dashboard
          </router-link>
        </div>
        
      </div>
    </div>

    <!-- Flight Hours Education Modal -->
    <div v-if="showHoursEducation" class="modal-overlay" data-testid="hours-education-modal" @click="showHoursEducation = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">✈️ Understanding Flight Hours</h3>
          <button @click="showHoursEducation = false" class="btn-ghost text-2xl">×</button>
        </div>
        
        <div>
        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">NZ PPL Hour Requirements</h4>
          <p class="text-sm mb-md">To obtain your PPL(A) in New Zealand, you need <strong>minimum 50 hours</strong> total flight time:</p>
          
          <ul class="space-y-1 mb-lg">
            <li class="text-sm"><strong>35 hours dual instruction</strong> - Flying with an instructor</li>
            <li class="text-sm"><strong>10 hours solo flight</strong> - Flying alone (after solo endorsement)</li>
            <li class="text-sm"><strong>5 hours cross-country solo</strong> - Navigation flights over 150nm</li>
            <li class="text-sm"><strong>5 hours terrain awareness</strong> - NZ mountain flying requirement</li>
            <li class="text-sm"><strong>5 hours night flying</strong> - Optional night rating (recommended)</li>
          </ul>
        </div>
        
        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">Hour Categories Explained</h4>
          <div class="space-y-2">
            <div>
              <strong>Dual Hours:</strong> <span class="text-sm">Flight time with a certified instructor. Required for learning new skills and regulatory compliance.</span>
            </div>
            <div>
              <strong>Solo Hours:</strong> <span class="text-sm">Flight time alone after receiving solo endorsement. Builds confidence and independence.</span>
            </div>
            <div>
              <strong>Cross-Country:</strong> <span class="text-sm">Navigation flights between different airports. Essential for developing pilotage skills.</span>
            </div>
            <div>
              <strong>Terrain Awareness:</strong> <span class="text-sm">Mandatory NZ training for mountain flying and hazardous terrain recognition.</span>
            </div>
          </div>
        </div>
        
        <button @click="showHoursEducation = false" class="btn btn-primary w-full">
          Got it!
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Progress tracking
const progress = ref({
  currentLesson: 1,
  completedLessons: [] as number[],
  flightHours: {
    dual: 0,
    solo: 0,
    crossCountry: 0,
    instrument: 0,
    terrainAwareness: 0,
    night: 0,
    total: 0
  },
  achievements: [] as string[],
  totalSpent: 0,
  medicalCertificate: null as any,
  theoryExams: {
    airLaw: { attempts: [], passed: false },
    navigation: { attempts: [], passed: false },
    technicalKnowledge: { attempts: [], passed: false },
    humanFactors: { attempts: [], passed: false },
    meteorology: { attempts: [], passed: false },
    radioTelephony: { attempts: [], passed: false }
  }
})

// Modals
const showHoursEducation = ref(false)

// Training phases data
const trainingPhases = [
  {
    id: 'foundation',
    name: 'Foundation',
    icon: '🏗️',
    lessons: 'Lessons 1-5',
    description: 'Basic aircraft handling, controls, and initial solo preparation'
  },
  {
    id: 'skills',
    name: 'Skills Development', 
    icon: '🎯',
    lessons: 'Lessons 6-15',
    description: 'Circuit training, emergency procedures, and advanced maneuvers'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: '🧭', 
    lessons: 'Lessons 16-22',
    description: 'Cross-country flying, navigation techniques, and radio procedures'
  },
  {
    id: 'advanced',
    name: 'Advanced Training',
    icon: '🚁',
    lessons: 'Lessons 23-27', 
    description: 'Night flying, terrain awareness, and flight test preparation'
  }
]

// Computed properties
const nextStepsMessage = computed(() => {
  if (progress.value.currentLesson <= 5) {
    return 'Focus on mastering basic aircraft control and safety procedures. Practice pre-flight checks and radio communications.'
  } else if (progress.value.currentLesson <= 15) {
    return 'Develop circuit proficiency and emergency procedures. Work toward your first solo flight milestone.'
  } else if (progress.value.currentLesson <= 22) {
    return 'Build cross-country navigation skills. Plan and execute solo navigation flights to build experience.'
  } else {
    return 'Prepare for your flight test. Review all maneuvers and ensure regulatory requirements are complete.'
  }
})

// Enhanced training phase detection
const currentPhase = computed(() => {
  const totalHours = progress.value.flightHours.total
  const soloHours = progress.value.flightHours.solo
  const lessonsCompleted = progress.value.completedLessons.length
  const hasFlownSolo = soloHours > 0
  const hasMedical = progress.value.medicalCertificate
  
  // Phase 1: Pre-Solo Training (0-10 hours, no solo)
  if (!hasFlownSolo && totalHours < 15) {
    return {
      name: 'Pre-Solo Training',
      shortName: 'Pre-Solo',
      icon: '🎓',
      description: 'Building fundamental flying skills',
      gradient: 'var(--gradient-primary)',
      focus: 'Master basic aircraft control, navigation, and emergency procedures before your first solo flight.',
      progress: {
        completed: lessonsCompleted,
        label: 'Lessons Done'
      },
      requirements: {
        completed: Math.min(lessonsCompleted, 12),
        total: 12
      }
    }
  }
  
  // Phase 2: Solo Training (First solo to cross-country)
  if (hasFlownSolo && progress.value.flightHours.crossCountry < 5) {
    return {
      name: 'Solo Training',
      shortName: 'Solo',
      icon: '🦅',
      description: 'Developing independent flight skills',
      gradient: 'var(--gradient-success)',
      focus: 'Build confidence with solo flights and prepare for cross-country navigation.',
      progress: {
        completed: soloHours.toFixed(1),
        label: 'Solo Hours'
      },
      requirements: {
        completed: Math.min(soloHours, 10),
        total: 10
      }
    }
  }
  
  // Phase 3: Cross-Country Training
  if (progress.value.flightHours.crossCountry >= 5 && totalHours < 35) {
    return {
      name: 'Cross-Country Training',
      shortName: 'Cross-Country',
      icon: '🗺️',
      description: 'Long-distance navigation and planning',
      gradient: 'var(--gradient-warning)',
      focus: 'Master navigation, flight planning, and extended cross-country flights.',
      progress: {
        completed: progress.value.flightHours.crossCountry.toFixed(1),
        label: 'XC Hours'
      },
      requirements: {
        completed: Math.min(progress.value.flightHours.crossCountry, 10),
        total: 10
      }
    }
  }
  
  // Phase 4: Test Preparation (35+ hours)
  if (totalHours >= 35) {
    const theoryPassed = Object.values(progress.value.theoryExams || {}).filter((exam: any) => exam.passed).length
    return {
      name: 'Test Preparation',
      shortName: 'Test Prep',
      icon: '📝',
      description: 'Final preparation for flight test',
      gradient: 'var(--gradient-info)',
      focus: 'Complete theory exams and intensive test preparation with your instructor.',
      progress: {
        completed: theoryPassed,
        label: 'Theory Exams'
      },
      requirements: {
        completed: theoryPassed,
        total: 6
      }
    }
  }
  
  // Default: Getting Started
  return {
    name: 'Getting Started',
    shortName: 'Starting',
    icon: '🚀',
    description: 'Beginning your pilot journey',
    gradient: 'var(--gradient-primary)',
    focus: 'Complete your medical certificate and start your first flying lessons.',
    progress: {
      completed: hasMedical ? 1 : 0,
      label: 'Medical Done'
    },
    requirements: {
      completed: hasMedical ? 1 : 0,
      total: 1
    }
  }
})

// All phases for navigation
const allPhases = computed(() => [
  { name: 'Getting Started', shortName: 'Starting', icon: '🚀' },
  { name: 'Pre-Solo Training', shortName: 'Pre-Solo', icon: '🎓' },
  { name: 'Solo Training', shortName: 'Solo', icon: '🦅' },
  { name: 'Cross-Country Training', shortName: 'Cross-Country', icon: '🗺️' },
  { name: 'Test Preparation', shortName: 'Test Prep', icon: '📝' }
])

// Load progress data
onMounted(() => {
  const savedProgress = localStorage.getItem('ppl-quest-progress')
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress)
    progress.value = parsed
  }
})
</script>