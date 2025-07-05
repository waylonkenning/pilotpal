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
      <div class="modal-content" @click.stop style="max-width: 600px;">
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">✅ Complete Lesson {{ currentLessonInfo.id }}</h3>
          <button @click="showCompleteLesson = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <div class="font-medium mb-sm">{{ currentLessonInfo.name }}</div>
          <div class="text-sm opacity-80">{{ currentLessonInfo.description }}</div>
        </div>

        <form @submit.prevent="completeLesson" class="space-y-4">
          <!-- Flight Hours Section -->
          <div class="card card-compact">
            <div class="font-medium mb-md">✈️ Flight Hours</div>
            <div class="grid grid-cols-2 gap-md">
              <div class="form-group">
                <label class="form-label">Flight Time (hours)</label>
                <input v-model.number="lessonForm.flightHours" type="number" step="0.1" min="0" max="10" class="form-input" placeholder="1.5" required>
              </div>
              <div class="form-group">
                <label class="form-label">Flight Type</label>
                <select v-model="lessonForm.flightType" class="form-input" required>
                  <option value="">Select type...</option>
                  <option value="dual">Dual (with instructor)</option>
                  <option value="solo">Solo</option>
                  <option value="crossCountry">Cross Country</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Special Skills Section -->
          <div class="card card-compact">
            <div class="font-medium mb-md">🎯 Special Skills & Conditions</div>
            <div class="grid grid-cols-2 gap-md">
              <div class="form-group">
                <label class="form-label">Night Flying (hours)</label>
                <input v-model.number="lessonForm.nightHours" type="number" step="0.1" min="0" max="10" class="form-input" placeholder="0.0">
              </div>
              <div class="form-group">
                <label class="form-label">Instrument Time (hours)</label>
                <input v-model.number="lessonForm.instrumentHours" type="number" step="0.1" min="0" max="10" class="form-input" placeholder="0.0">
              </div>
              <div class="form-group">
                <label class="form-label">Terrain Awareness (hours)</label>
                <input v-model.number="lessonForm.terrainHours" type="number" step="0.1" min="0" max="10" class="form-input" placeholder="0.0">
              </div>
              <div class="form-group">
                <label class="form-label">Cross Country Distance (nm)</label>
                <input v-model.number="lessonForm.crossCountryDistance" type="number" min="0" max="1000" class="form-input" placeholder="0">
              </div>
            </div>
          </div>

          <!-- Cost Section -->
          <div class="card card-compact">
            <div class="font-medium mb-md">💰 Lesson Costs</div>
            <div class="grid grid-cols-2 gap-md">
              <div class="form-group">
                <label class="form-label">Aircraft Rental ($)</label>
                <input v-model.number="lessonForm.aircraftCost" type="number" step="0.01" min="0" class="form-input" placeholder="280.00">
              </div>
              <div class="form-group">
                <label class="form-label">Instructor Fee ($)</label>
                <input v-model.number="lessonForm.instructorCost" type="number" step="0.01" min="0" class="form-input" placeholder="120.00">
              </div>
              <div class="form-group">
                <label class="form-label">Fuel Cost ($)</label>
                <input v-model.number="lessonForm.fuelCost" type="number" step="0.01" min="0" class="form-input" placeholder="45.00">
              </div>
              <div class="form-group">
                <label class="form-label">Other Costs ($)</label>
                <input v-model.number="lessonForm.otherCosts" type="number" step="0.01" min="0" class="form-input" placeholder="0.00">
              </div>
            </div>
            <div class="mt-md">
              <div class="flex justify-between items-center">
                <span class="font-medium">Total Cost:</span>
                <span class="text-lg font-bold">${{ totalLessonCost.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Notes Section -->
          <div class="card card-compact">
            <div class="font-medium mb-md">📝 Lesson Notes</div>
            <div class="form-group">
              <label class="form-label">Notes & Achievements</label>
              <textarea v-model="lessonForm.notes" class="form-input" rows="3" placeholder="What did you learn? Any challenges or achievements?"></textarea>
            </div>
          </div>

          <div class="flex gap-md">
            <button type="button" @click="showCompleteLesson = false" class="btn btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" class="btn btn-success flex-1">
              Complete Lesson ({{ totalLessonCost > 0 ? '$' + totalLessonCost.toFixed(2) : 'Free' }})
            </button>
          </div>
        </form>
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
  expenses: [] as Array<{
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    lessonDetails?: any;
  }>
})

// Modals
const showCompleteLesson = ref(false)
const showLessonInfo = ref(false)

// Lesson completion form
const lessonForm = ref({
  flightHours: 0,
  flightType: '',
  nightHours: 0,
  instrumentHours: 0,
  terrainHours: 0,
  crossCountryDistance: 0,
  aircraftCost: 0,
  instructorCost: 0,
  fuelCost: 0,
  otherCosts: 0,
  notes: ''
})

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

// Total lesson cost computed
const totalLessonCost = computed(() => {
  return (lessonForm.value.aircraftCost || 0) + 
         (lessonForm.value.instructorCost || 0) + 
         (lessonForm.value.fuelCost || 0) + 
         (lessonForm.value.otherCosts || 0)
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
    // Mark lesson as completed
    progress.value.completedLessons.push(progress.value.currentLesson)
    
    // Update flight hours based on flight type
    const hours = lessonForm.value.flightHours || 0
    if (lessonForm.value.flightType === 'dual') {
      progress.value.flightHours.dual += hours
    } else if (lessonForm.value.flightType === 'solo') {
      progress.value.flightHours.solo += hours
    } else if (lessonForm.value.flightType === 'crossCountry') {
      progress.value.flightHours.crossCountry += hours
      progress.value.flightHours.solo += hours // Cross country also counts as solo
    }
    
    // Update special flight hours
    progress.value.flightHours.night += lessonForm.value.nightHours || 0
    progress.value.flightHours.instrument += lessonForm.value.instrumentHours || 0
    progress.value.flightHours.terrainAwareness += lessonForm.value.terrainHours || 0
    
    // Update total hours (avoid double counting)
    progress.value.flightHours.total = 
      progress.value.flightHours.dual + 
      progress.value.flightHours.solo
    
    // Add expense record
    const totalCost = totalLessonCost.value
    if (totalCost > 0) {
      const expense = {
        id: Date.now().toString(),
        description: `Lesson ${progress.value.currentLesson}: ${currentLessonInfo.value.name}`,
        amount: totalCost,
        category: 'flightTraining',
        date: new Date().toISOString().split('T')[0],
        lessonDetails: {
          lessonNumber: progress.value.currentLesson,
          flightHours: lessonForm.value.flightHours,
          flightType: lessonForm.value.flightType,
          nightHours: lessonForm.value.nightHours,
          instrumentHours: lessonForm.value.instrumentHours,
          terrainHours: lessonForm.value.terrainHours,
          crossCountryDistance: lessonForm.value.crossCountryDistance,
          breakdown: {
            aircraft: lessonForm.value.aircraftCost,
            instructor: lessonForm.value.instructorCost,
            fuel: lessonForm.value.fuelCost,
            other: lessonForm.value.otherCosts
          },
          notes: lessonForm.value.notes
        }
      }
      
      progress.value.expenses.push(expense)
      progress.value.totalSpent += totalCost
    }
    
    // Move to next lesson
    progress.value.currentLesson += 1
    
    // Save to localStorage
    localStorage.setItem('ppl-quest-progress', JSON.stringify(progress.value))
    
    // Also save to financial tracking
    const savedFinances = localStorage.getItem('ppl-quest-finances')
    let financialData: { expenses: Array<{id: string; description: string; amount: number; category: string; date: string}>; budget: number } = { expenses: [], budget: 30000 }
    if (savedFinances) {
      try {
        financialData = JSON.parse(savedFinances)
      } catch (error) {
        console.error('Failed to load financial data:', error)
      }
    }
    
    if (totalCost > 0) {
      financialData.expenses.push({
        id: Date.now().toString(),
        description: `Lesson ${progress.value.currentLesson - 1}: ${currentLessonInfo.value.name}`,
        amount: totalCost,
        category: 'flightTraining',
        date: new Date().toISOString().split('T')[0]
      })
      localStorage.setItem('ppl-quest-finances', JSON.stringify(financialData))
    }
  }
  
  // Reset form
  lessonForm.value = {
    flightHours: 0,
    flightType: '',
    nightHours: 0,
    instrumentHours: 0,
    terrainHours: 0,
    crossCountryDistance: 0,
    aircraftCost: 0,
    instructorCost: 0,
    fuelCost: 0,
    otherCosts: 0,
    notes: ''
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