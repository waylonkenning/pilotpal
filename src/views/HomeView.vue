<template>
  <div class="min-h-screen gradient-sky">
    <!-- First-time user welcome experience -->
    <div v-if="!hasStartedJourney" class="flex items-center justify-center min-h-screen">
      <div class="container">
        <div class="text-center" data-testid="welcome-hero">
          <h1 class="text-4xl font-bold mb-6 text-gradient-sky">
            ✈️ PPL Quest NZ
          </h1>
          <p class="text-xl mb-8">
            Your complete guide from zero to Private Pilot License
          </p>
          
          <div class="card max-w-lg mx-auto" data-testid="journey-overview">
            <h2 class="text-2xl font-semibold mb-4">Couch to PPL</h2>
            <p class="mb-6">
              Just like Couch to 5K, we'll guide you step-by-step through your pilot training:
            </p>
            
            <div class="grid grid-cols-2 mb-6 text-sm">
              <div class="p-3">
                <div class="font-bold text-blue-600">27 lessons</div>
                <div>Progressive training</div>
              </div>
              <div class="p-3">
                <div class="font-bold text-green-600">50 hours</div>
                <div>Minimum flight time</div>
              </div>
              <div class="p-3">
                <div class="font-bold text-orange-600">6 exams</div>
                <div>Theory subjects</div>
              </div>
              <div class="p-3">
                <div class="font-bold text-purple-600">12 badges</div>
                <div>Achievement system</div>
              </div>
            </div>
            
            <p class="text-sm mb-6">
              Complete lessons in order, earn badges for milestones, track your progress to becoming a licensed pilot in New Zealand.
            </p>
            
            <button 
              @click="startJourney" 
              class="btn btn-primary w-full"
              data-testid="start-journey-button"
            >
              🚀 Start Your PPL Journey
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Onboarding flow -->
    <div v-else-if="showOnboarding" class="container p-6">
      <div class="max-w-2xl mx-auto">
        <div class="card" data-testid="onboarding-step-1">
          <div class="text-center mb-6">
            <h2 class="text-3xl font-bold mb-4">Welcome to Your PPL Journey! 🎯</h2>
            <div class="text-6xl mb-4">✈️</div>
          </div>
          
          <div data-testid="onboarding-explanation">
            <h3 class="text-xl font-semibold mb-4">How PPL Quest Works</h3>
            
            <div class="space-y-4 mb-6">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <div class="font-semibold">Complete lessons in order</div>
                  <div class="text-sm text-gray-600">Just like Couch to 5K - no skipping ahead! Each lesson builds on the previous one.</div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-green-500 text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <div class="font-semibold">Earn badges for achievements</div>
                  <div class="text-sm text-gray-600">First Flight, Solo Wings, Theory Master - celebrate every milestone!</div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-orange-500 text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <div class="font-semibold">Track regulatory requirements</div>
                  <div class="text-sm text-gray-600">Medical certificates, theory exams, solo endorsements - we'll guide you through it all.</div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-purple-500 text-white flex items-center justify-center font-bold">4</div>
                <div>
                  <div class="font-semibold">See what's next</div>
                  <div class="text-sm text-gray-600">Always know your next step - no confusion, just clear progress.</div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 p-4 metro-card mb-6">
              <div class="font-semibold text-blue-800 mb-2">🇳🇿 Built for New Zealand</div>
              <div class="text-sm text-blue-700">
                Includes NZ-specific requirements like optional night flying, DL9 medical certificates, 
                terrain awareness training, and CAA Part 61 compliance.
              </div>
            </div>
          </div>
          
          <button 
            @click="completeOnboarding" 
            class="btn btn-primary w-full"
            data-testid="continue-to-app"
          >
            Let's Start Flying! 🛫
          </button>
        </div>
      </div>
    </div>

    <!-- Redirect to dashboard once onboarding complete -->
    <div v-else class="container p-6">
      <div class="text-center">
        <div class="text-4xl mb-4">🚀</div>
        <div class="text-xl font-semibold mb-4">Taking you to your flight dashboard...</div>
        <div class="text-sm text-gray-600">Loading your PPL progress...</div>
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