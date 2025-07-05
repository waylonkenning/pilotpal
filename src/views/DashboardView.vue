<template>
  <div class="app-layout" data-testid="main-dashboard">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">✈️ PPL Quest</h1>
            <p class="text-sm opacity-60">Track your pilot training progress</p>
          </div>
          <div class="status-dot"></div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">
        
        <!-- Today's Focus Card -->
        <div class="card card-elevated mb-xl" data-testid="todays-focus">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">🎯</div>
            <div>
              <h2 class="font-bold">Today's Focus</h2>
              <p class="text-sm opacity-80">Your next step in the PPL journey</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between mb-md">
            <div>
              <h3 class="font-bold text-lg" data-testid="current-lesson-title">
                Lesson {{ progress.currentLesson }}
              </h3>
              <div class="text-sm opacity-80" data-testid="current-lesson-description">
                {{ currentLessonInfo.name }}
              </div>
            </div>
            <div class="text-3xl">{{ currentLessonInfo.icon }}</div>
          </div>
          
          <p class="mb-md">{{ currentLessonInfo.description }}</p>
          
          <div class="card-compact mb-md" style="background: var(--bg-tertiary); border: var(--glass-border);" data-testid="preparation-needed">
            <div class="font-medium mb-sm">📋 What you need to do:</div>
            <div class="text-sm opacity-80">{{ currentLessonInfo.preparation }}</div>
          </div>
          
          <div class="flex gap-md">
            <button 
              @click="showCompleteLesson = true" 
              class="btn btn-success flex-1"
              data-testid="complete-lesson-button"
            >
              ✅ Complete This Lesson
            </button>
            <button 
              @click="showLessonInfo = true"
              class="btn btn-secondary" 
              data-testid="lesson-info-button"
            >
              ℹ️ More Info
            </button>
          </div>
        </div>
        
        <!-- Progress Overview -->
        <div class="grid grid-cols-2 gap-md mb-xl" data-testid="metro-grid-container">
          <!-- Flight Hours -->
          <div class="card" data-testid="metro-tile metro-tile-progress">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-lg">✈️</div>
              <h3 class="font-medium" data-testid="metro-tile-title">Flight Hours</h3>
            </div>
            <div class="text-2xl font-bold mb-sm" data-testid="total-hours"
                 @mouseenter="showProgressTooltip($event)"
                 @mouseleave="hideProgressTooltip">
              {{ progress.flightHours.total.toFixed(1) }}
            </div>
            <div class="text-sm opacity-60 mb-md">Total Hours</div>
            <div class="space-y-1">
              <div class="text-xs" data-testid="dual-hours">
                <span class="badge badge-primary mr-1">Dual</span>
                {{ progress.flightHours.dual.toFixed(1) }}h
              </div>
              <div class="text-xs">
                <span class="badge badge-success mr-1">Solo</span>
                {{ progress.flightHours.solo.toFixed(1) }}h
              </div>
              <div class="text-xs">
                <span class="badge badge-warning mr-1">XC</span>
                {{ progress.flightHours.crossCountry.toFixed(1) }}h
              </div>
            </div>
          </div>
          
          <!-- Lesson Progress -->
          <div class="card" data-testid="metro-tile metro-tile-progress">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-lg">📚</div>
              <h3 class="font-medium" data-testid="metro-tile-title">Lessons</h3>
            </div>
            <div class="text-2xl font-bold mb-sm" data-testid="lesson-progress">
              {{ progress.completedLessons.length }}<span class="text-sm opacity-60">/27</span>
            </div>
            <div class="text-sm opacity-60 mb-md">Completed</div>
            <div class="progress" data-testid="progress-bar">
              <div class="progress-bar" 
                :style="{ width: lessonProgress + '%' }"
                data-testid="progress-bar-fill"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Training Phase Indicator -->
        <div class="card card-elevated mb-xl" data-testid="training-phase-indicator">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">{{ currentPhase.icon }}</div>
            <div>
              <h3 class="font-bold">{{ currentPhase.name }}</h3>
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
          </div>
        </div>
        
        <!-- Navigation Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-md">
          <router-link to="/journey" class="nav-tab" data-testid="journey-tab">
            <div class="nav-tab-icon">🗺️</div>
            <div class="flex-col">
              <div class="font-medium">Journey</div>
              <div class="text-xs opacity-60">Track Progress</div>
            </div>
          </router-link>
          <router-link to="/achievements" class="nav-tab" data-testid="achievements-tab">
            <div class="nav-tab-icon">🏆</div>
            <div class="flex-col">
              <div class="font-medium">Achievements</div>
              <div class="text-xs opacity-60">View Badges</div>
            </div>
          </router-link>
          <router-link to="/theory" class="nav-tab" data-testid="theory-tab">
            <div class="nav-tab-icon">📚</div>
            <div class="flex-col">
              <div class="font-medium">Theory</div>
              <div class="text-xs opacity-60">Exam Progress</div>
            </div>
          </router-link>
          <router-link to="/requirements" class="nav-tab" data-testid="requirements-tab">
            <div class="nav-tab-icon">📋</div>
            <div class="flex-col">
              <div class="font-medium">Requirements</div>
              <div class="text-xs opacity-60">Check Status</div>
            </div>
          </router-link>
          <router-link to="/finances" class="nav-tab" data-testid="finances-tab">
            <div class="nav-tab-icon">💰</div>
            <div class="flex-col">
              <div class="font-medium">Finances</div>
              <div class="text-xs opacity-60">Track Costs</div>
            </div>
          </router-link>
          <router-link to="/profile" class="nav-tab" data-testid="user-profile-tab">
            <div class="nav-tab-icon">👤</div>
            <div class="flex-col">
              <div class="font-medium">Profile</div>
              <div class="text-xs opacity-60">Settings</div>
            </div>
          </router-link>
        </div>
        
      </div>
    </div>

    <!-- Complete Lesson Modal -->
    <div v-if="showCompleteLesson" class="modal-overlay" @click="showCompleteLesson = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">✅ Complete Lesson {{ currentLessonInfo.id }}</h3>
          <button @click="showCompleteLesson = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <div class="font-medium mb-sm">{{ currentLessonInfo.name }}</div>
          <div class="text-sm opacity-80 mb-md">{{ currentLessonInfo.description }}</div>
          <div class="text-sm opacity-60">Mark this lesson as completed in your progress tracking.</div>
        </div>

        <div class="flex gap-md">
          <button @click="showCompleteLesson = false" class="btn btn-secondary flex-1">
            Cancel
          </button>
          <button @click="completeLesson" class="btn btn-success flex-1">
            Mark Complete
          </button>
        </div>
      </div>
    </div>

    <!-- Lesson Info Modal -->
    <div v-if="showLessonInfo" class="modal-overlay" @click="showLessonInfo = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">ℹ️ Lesson {{ currentLessonInfo.id }} Details</h3>
          <button @click="showLessonInfo = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <div class="font-medium mb-sm">{{ currentLessonInfo.name }}</div>
          <div class="text-sm opacity-80 mb-md">{{ currentLessonInfo.description }}</div>
          
          <div class="font-medium mb-sm mt-lg">📋 Preparation Required:</div>
          <div class="text-sm opacity-80">{{ currentLessonInfo.preparation }}</div>
        </div>

        <button @click="showLessonInfo = false" class="btn btn-primary w-full">
          Got it!
        </button>
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
const showCompleteLesson = ref(false)
const showLessonInfo = ref(false)

// Lesson definitions
const lessons = [
  { id: 1, name: 'Introductory Flight', icon: '🛫', description: 'Get familiar with the aircraft and basic controls', preparation: 'Book your first lesson with a flight instructor and review basic aviation theory' },
  { id: 2, name: 'Aircraft Familiarization', icon: '✈️', description: 'Learn aircraft systems and pre-flight inspection', preparation: 'Review aircraft manual and practice pre-flight checklist items' },
  { id: 3, name: 'Taxi Operations', icon: '🛞', description: 'Master taxiing, radio communications, and ground procedures', preparation: 'Study airport diagrams and radio phraseology for your training airport' },
  { id: 4, name: 'Straight & Level', icon: '📏', description: 'Maintain altitude, heading, and speed in cruise flight', preparation: 'Practice attitude flying and instrument scanning techniques' },
  { id: 5, name: 'Climbing & Descending', icon: '📈', description: 'Control aircraft in climbs and descents', preparation: 'Understand power and attitude relationships for different flight phases' }
]

// Computed properties
const currentLessonInfo = computed(() => {
  return lessons.find(lesson => lesson.id === progress.value.currentLesson) || lessons[0]
})

const lessonProgress = computed(() => {
  return Math.round((progress.value.completedLessons.length / 27) * 100)
})

// Training phase detection
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

// Tooltip functions
const showProgressTooltip = (_event: MouseEvent) => {
  // Tooltip logic here
}

const hideProgressTooltip = () => {
  // Hide tooltip logic here
}

// Lesson completion function
const completeLesson = () => {
  if (!progress.value.completedLessons.includes(progress.value.currentLesson)) {
    progress.value.completedLessons.push(progress.value.currentLesson)
    progress.value.currentLesson += 1
    
    // Save to localStorage
    localStorage.setItem('ppl-quest-progress', JSON.stringify(progress.value))
  }
  
  showCompleteLesson.value = false
}

// Load progress data
onMounted(() => {
  const savedProgress = localStorage.getItem('ppl-quest-progress')
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress)
    progress.value = { ...progress.value, ...parsed }
  }
})
</script>