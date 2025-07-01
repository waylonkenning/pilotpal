<template>
  <div class="min-h-screen gradient-sky">
    <div class="container">
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-6">Flight Dashboard</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 mb-8">
          <div class="card">
            <h3 class="text-lg font-semibold mb-2">Total Flight Hours</h3>
            <div class="text-3xl font-bold text-blue-600 mb-2">
              {{ totalHours.toFixed(1) }}
            </div>
            <div class="text-sm text-gray-600">
              <div>Dual: {{ flightHours.dual }}h</div>
              <div>Solo: {{ flightHours.solo }}h</div>
              <div>Cross Country: {{ flightHours.crossCountry }}h</div>
            </div>
          </div>
          
          <div class="card">
            <h3 class="text-lg font-semibold mb-2">Current Phase</h3>
            <div class="text-xl font-bold mb-2">{{ currentPhase }}</div>
            <div class="text-sm text-gray-600 mb-3">
              Building fundamental flying skills
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" :style="{ width: progress + '%' }"></div>
            </div>
          </div>
          
          <div class="card">
            <h3 class="text-lg font-semibold mb-2">Achievements</h3>
            <div class="text-3xl font-bold text-green-600 mb-2">
              {{ achievements }} of {{ totalAchievements }}
            </div>
            <div class="text-sm text-gray-600">
              {{ achievements === 0 ? 'Start flying to unlock badges!' : 'Great progress!' }}
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 mb-6">
          <div class="card">
            <h3 class="text-lg font-semibold mb-4">Next Milestone</h3>
            <div class="text-2xl font-bold mb-2">{{ nextMilestone }}</div>
            <p class="text-gray-600 mb-4">{{ milestoneDescription }}</p>
            <div class="btn btn-success w-full">
              🎯 View Requirements
            </div>
          </div>
          
          <div class="card">
            <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
            <div class="flex flex-col gap-3">
              <button class="btn btn-primary">
                📝 Log Flight Hours
              </button>
              <button class="btn btn-secondary">
                📚 Update Theory Progress
              </button>
              <button class="btn btn-secondary">
                💰 Track Expenses
              </button>
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

// Reactive data
const flightHours = ref({
  dual: 0,
  solo: 0,
  crossCountry: 0,
  instrument: 0,
  night: 0
})

const achievements = ref(0)
const totalAchievements = ref(4)

// Computed properties
const totalHours = computed(() => {
  return Object.values(flightHours.value).reduce((sum, hours) => sum + hours, 0)
})

const currentPhase = computed(() => {
  if (totalHours.value < 15) return 'Foundation Phase'
  if (totalHours.value < 25) return 'Circuit Phase'
  if (totalHours.value < 40) return 'Navigation Phase'
  if (totalHours.value < 50) return 'Advanced Phase'
  return 'Certification Phase'
})

const progress = computed(() => {
  // Simple progress calculation for current phase
  const hours = totalHours.value
  if (hours < 15) return (hours / 15) * 100
  if (hours < 25) return ((hours - 15) / 10) * 100
  if (hours < 40) return ((hours - 25) / 15) * 100
  if (hours < 50) return ((hours - 40) / 10) * 100
  return 100
})

const nextMilestone = computed(() => {
  if (totalHours.value === 0) return 'First Flight'
  if (totalHours.value < 5) return 'Controls Master'
  if (achievements.value < 2) return 'Solo Wings'
  return 'Licensed Pilot'
})

const milestoneDescription = computed(() => {
  if (totalHours.value === 0) return 'Complete your introductory flight'
  if (totalHours.value < 5) return 'Demonstrate basic aircraft control'
  if (achievements.value < 2) return 'Your first solo flight - a major milestone!'
  return 'Complete your PPL requirements and pass the test'
})
</script>