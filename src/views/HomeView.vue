<template>
  <div class="app-layout" data-testid="home-view">
    <!-- First-time user welcome experience -->
    <div v-if="!hasStartedJourney">
      <!-- Modern Header -->
      <div class="app-header">
        <div class="container">
          <div class="text-center">
            <h1 class="text-2xl font-bold">✈️ PPL Quest NZ</h1>
            <p class="text-sm opacity-60">Your complete guide from zero to Private Pilot License</p>
          </div>
        </div>
      </div>

      <div class="app-content">
        <div class="container">
          <div class="card card-elevated" style="background: var(--gradient-primary); color: var(--text-inverse);" data-testid="welcome-hero">
            <div class="text-center">
              <div class="text-4xl mb-md">🛫</div>
              <h2 class="text-2xl font-bold mb-md">Couch to PPL</h2>
              <p class="text-lg opacity-90 mb-lg">
                Just like Couch to 5K, we'll guide you step-by-step through your pilot training
              </p>
            </div>
            
            <div data-testid="journey-overview">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-md mb-lg">
                <div class="text-center">
                  <div class="text-2xl font-bold mb-sm">27</div>
                  <div class="text-sm opacity-90">Progressive lessons</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold mb-sm">50</div>
                  <div class="text-sm opacity-90">Minimum flight hours</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold mb-sm">6</div>
                  <div class="text-sm opacity-90">Theory exams</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold mb-sm">12</div>
                  <div class="text-sm opacity-90">Achievement badges</div>
                </div>
              </div>
              
              <p class="text-center opacity-90 mb-lg">
                Complete lessons in order, earn badges for milestones, track your progress to becoming a licensed pilot in New Zealand.
              </p>
              
              <div class="text-center">
                <button 
                  @click="startJourney" 
                  class="btn btn-secondary btn-lg"
                  data-testid="start-journey-button">
                  🚀 Start Your PPL Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Onboarding flow -->
    <div v-else-if="showOnboarding">
      <!-- Modern Header -->
      <div class="app-header">
        <div class="container">
          <div class="text-center">
            <h1 class="text-xl font-bold">Welcome to Your PPL Journey! 🎯</h1>
            <p class="text-sm opacity-60">Let's get you started</p>
          </div>
        </div>
      </div>

      <div class="app-content">
        <div class="container">
          <div class="card card-elevated mb-xl" data-testid="onboarding-step-1">
            <div class="text-center mb-lg">
              <div class="text-4xl mb-md">✈️</div>
              <h2 class="text-xl font-bold">How PPL Quest Works</h2>
            </div>
            
            <div data-testid="onboarding-explanation">
              <div class="space-y-4 mb-lg">
                <div class="card card-compact">
                  <div class="flex items-center gap-md">
                    <div class="text-2xl">1️⃣</div>
                    <div>
                      <div class="font-medium">Complete lessons in order</div>
                      <div class="text-sm opacity-80">Just like Couch to 5K - no skipping ahead! Each lesson builds on the previous one.</div>
                    </div>
                  </div>
                </div>
                
                <div class="card card-compact">
                  <div class="flex items-center gap-md">
                    <div class="text-2xl">2️⃣</div>
                    <div>
                      <div class="font-medium">Earn badges for achievements</div>
                      <div class="text-sm opacity-80">First Flight, Solo Wings, Theory Master - celebrate every milestone!</div>
                    </div>
                  </div>
                </div>
                
                <div class="card card-compact">
                  <div class="flex items-center gap-md">
                    <div class="text-2xl">3️⃣</div>
                    <div>
                      <div class="font-medium">Track regulatory requirements</div>
                      <div class="text-sm opacity-80">Medical certificates, theory exams, solo endorsements - we'll guide you through it all.</div>
                    </div>
                  </div>
                </div>
                
                <div class="card card-compact">
                  <div class="flex items-center gap-md">
                    <div class="text-2xl">4️⃣</div>
                    <div>
                      <div class="font-medium">See what's next</div>
                      <div class="text-sm opacity-80">Always know your next step - no confusion, just clear progress.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card card-compact" style="background: var(--gradient-success); color: var(--text-inverse);">
                <div class="font-medium mb-sm">🇳🇿 Built for New Zealand</div>
                <div class="text-sm opacity-90">
                  Includes NZ-specific requirements like optional night flying, DL9 medical certificates, 
                  terrain awareness training, and CAA Part 61 compliance.
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <button 
                @click="completeOnboarding" 
                class="btn btn-primary btn-lg"
                data-testid="continue-to-app">
                Let's Start Flying! 🛫
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Redirect to dashboard once onboarding complete -->
    <div v-else class="app-layout">
      <div class="app-content">
        <div class="container">
          <div class="card card-elevated text-center">
            <div class="text-4xl mb-md">🚀</div>
            <div class="text-xl font-bold mb-sm">Taking you to your flight dashboard...</div>
            <div class="text-sm opacity-80">Loading your PPL progress...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const hasStartedJourney = ref(false)
const showOnboarding = ref(false)

// Check if user has already started their journey
onMounted(() => {
  const progress = localStorage.getItem('ppl-quest-progress')
  if (progress) {
    // User has existing progress, go straight to dashboard
    router.push('/dashboard')
  } else {
    // New user, show welcome screen
    hasStartedJourney.value = false
  }
})

// Actions
const startJourney = () => {
  hasStartedJourney.value = true
  showOnboarding.value = true
}

const completeOnboarding = () => {
  // Initialize user progress
  const initialProgress = {
    hasCompletedOnboarding: true,
    currentLesson: 1,
    completedLessons: [],
    flightHours: {
      dual: 0,
      solo: 0,
      crossCountry: 0,
      instrument: 0,
      terrainAwareness: 0,
      night: 0,
      total: 0
    },
    achievements: [],
    totalSpent: 0,
    expenses: [],
    medicalCertificate: null,
    fppAssessment: null,
    theoryExams: {
      airLaw: { attempts: [], passed: false },
      navigation: { attempts: [], passed: false },
      technicalKnowledge: { attempts: [], passed: false },
      humanFactors: { attempts: [], passed: false },
      meteorology: { attempts: [], passed: false },
      radioTelephony: { attempts: [], passed: false }
    },
    soloEndorsements: [],
    isLicensed: false,
    createdAt: new Date().toISOString()
  }
  
  localStorage.setItem('ppl-quest-progress', JSON.stringify(initialProgress))
  
  // Navigate to dashboard
  router.push('/dashboard')
}
</script>

<style scoped>
</style>