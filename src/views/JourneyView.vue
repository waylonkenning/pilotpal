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
  totalSpent: 0
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

// Load progress data
onMounted(() => {
  const savedProgress = localStorage.getItem('ppl-quest-progress')
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress)
    progress.value = parsed
  }
})
</script>