<template>
  <div class="min-h-screen gradient-sky">
    <div class="container">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold mb-2 text-gradient-sky">Your PPL Journey</h1>
            <p class="text-lg">Track your progress through the five training phases</p>
          </div>
          <router-link to="/dashboard" class="btn btn-secondary">
            ← Back to Dashboard
          </router-link>
        </div>
        
        <!-- Overall Progress -->
        <div class="card mb-6">
          <h2 class="text-2xl font-bold mb-4 text-center text-gradient-sky">
            Overall Journey Progress
          </h2>
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">Progress to PPL(A)</span>
              <span class="font-bold text-xl text-gradient-sky">{{ overallProgress }}% complete</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-blue-600 h-3 rounded-full transition-all duration-500"
                :style="{ width: overallProgress + '%' }"
              ></div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="card text-center">
              <div class="text-2xl font-bold text-blue-600 mb-1">{{ totalHours.toFixed(1) }}</div>
              <div class="text-sm font-semibold">Hours Flown</div>
            </div>
            <div class="card text-center">
              <div class="text-2xl font-bold text-green-600 mb-1">{{ achievements }}</div>
              <div class="text-sm font-semibold">Badges Earned</div>
            </div>
            <div class="card text-center">
              <div class="text-2xl font-bold text-orange-600 mb-1">{{ examsPassed }}</div>
              <div class="text-sm font-semibold">Exams Passed</div>
            </div>
            <div class="card text-center">
              <div class="text-2xl font-bold text-blue-600 mb-1">50</div>
              <div class="text-sm font-semibold">Hours Required</div>
            </div>
          </div>
        </div>
        
        <!-- Training Phases -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-4">Training Phases</h2>
          <div class="grid gap-4">
            <div 
              v-for="(phase, index) in trainingPhases" 
              :key="phase.id"
              class="card cursor-pointer transition-all hover:shadow-lg"
              :class="getPhaseClass(phase)"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div 
                      class="w-4 h-4 rounded-full mr-3"
                      :class="getPhaseStatusColor(phase)"
                    ></div>
                    <h3 class="font-bold text-lg">{{ phase.name }}</h3>
                    <span class="ml-auto text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                      {{ phase.hourRange.min }}-{{ phase.hourRange.max }} hours
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">{{ phase.description }}</p>
                  
                  <!-- Progress bar for current phase -->
                  <div v-if="isCurrentPhase(phase)" class="mb-3">
                    <div class="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{{ getPhaseProgress(phase) }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-blue-600 h-2 rounded-full"
                        :style="{ width: getPhaseProgress(phase) + '%' }"
                      ></div>
                    </div>
                  </div>
                  
                  <!-- Milestones -->
                  <div class="space-y-2">
                    <h4 class="text-xs font-bold uppercase tracking-wide text-gray-500">Key Milestones</h4>
                    <div 
                      v-for="milestone in phase.milestones.slice(0, 2)" 
                      :key="milestone"
                      class="text-xs p-2 border rounded flex items-center"
                      :class="getMilestoneClass(milestone)"
                    >
                      <div 
                        class="w-2 h-2 rounded-full mr-2"
                        :class="isMilestoneCompleted(milestone) ? 'bg-green-500' : 'bg-gray-300'"
                      ></div>
                      <span class="font-medium">{{ milestone }}</span>
                      <span v-if="isMilestoneCompleted(milestone)" class="ml-auto text-green-600">✓</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Phase status -->
              <div class="mt-4 text-center">
                <div 
                  class="text-xs font-bold py-2 px-4 rounded-full text-white"
                  :class="getPhaseStatusBadge(phase)"
                >
                  {{ getPhaseStatusText(phase) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <router-link to="/" class="btn btn-secondary">
            ← Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Sample data
const totalHours = ref(0)
const achievements = ref(0)
const examsPassed = ref(0)

const trainingPhases = [
  {
    id: 'foundation',
    name: 'Foundation Phase',
    description: 'Basic aircraft control and first solo preparation',
    hourRange: { min: 0, max: 15 },
    milestones: ['First Flight', 'Controls Master', 'Radio Operator', 'Pattern Pilot']
  },
  {
    id: 'circuit',
    name: 'Circuit Phase', 
    description: 'Pattern work mastery and emergency procedures',
    hourRange: { min: 15, max: 25 },
    milestones: ['Solo Wings', 'Emergency Ace', 'Precision Pilot']
  },
  {
    id: 'navigation',
    name: 'Navigation Phase',
    description: 'Cross-country skills and weather decision making',
    hourRange: { min: 25, max: 40 },
    milestones: ['Navigator Bronze', 'Navigator Silver', 'Weather Wise']
  },
  {
    id: 'advanced',
    name: 'Advanced Phase',
    description: 'Instrument basics and test preparation',
    hourRange: { min: 40, max: 50 },
    milestones: ['Navigator Gold', 'Mountain Flyer', 'Test Ready']
  },
  {
    id: 'certification',
    name: 'Certification Phase',
    description: 'Theory exams and flight test readiness',
    hourRange: { min: 50, max: 60 },
    milestones: ['Licensed Pilot']
  }
]

// Computed properties
const overallProgress = computed(() => {
  return Math.min((totalHours.value / 50) * 100, 100).toFixed(0)
})

// Helper functions
const isCurrentPhase = (phase: any) => {
  return totalHours.value >= phase.hourRange.min && totalHours.value < phase.hourRange.max
}

const isPhaseCompleted = (phase: any) => {
  return totalHours.value >= phase.hourRange.max
}

const getPhaseClass = (phase: any) => {
  if (isPhaseCompleted(phase)) return 'bg-green-50 border-green-200'
  if (isCurrentPhase(phase)) return 'bg-blue-50 border-blue-200'
  return 'bg-gray-50 border-gray-200'
}

const getPhaseStatusColor = (phase: any) => {
  if (isPhaseCompleted(phase)) return 'bg-green-500'
  if (isCurrentPhase(phase)) return 'bg-blue-500'
  return 'bg-gray-300'
}

const getPhaseStatusBadge = (phase: any) => {
  if (isPhaseCompleted(phase)) return 'bg-green-500'
  if (isCurrentPhase(phase)) return 'bg-blue-500'
  return 'bg-gray-400'
}

const getPhaseStatusText = (phase: any) => {
  if (isPhaseCompleted(phase)) return '✓ COMPLETED'
  if (isCurrentPhase(phase)) return '🎯 CURRENT PHASE'
  return '🔒 UPCOMING'
}

const getPhaseProgress = (phase: any) => {
  if (!isCurrentPhase(phase)) return 0
  const progress = ((totalHours.value - phase.hourRange.min) / (phase.hourRange.max - phase.hourRange.min)) * 100
  return Math.min(progress, 100).toFixed(0)
}

const isMilestoneCompleted = (milestone: string) => {
  // Simple logic - in real app this would check against completed achievements
  return totalHours.value > 0 && milestone === 'First Flight'
}

const getMilestoneClass = (milestone: string) => {
  return isMilestoneCompleted(milestone) 
    ? 'bg-green-50 border-green-200 text-green-800'
    : 'bg-white border-gray-200 text-gray-700'
}
</script>