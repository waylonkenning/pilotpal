<template>
  <div>
    <!-- First-time user welcome experience -->
    <div v-if="!hasStartedJourney">
      <div>
        <div data-testid="welcome-hero">
          <h1>
            ✈️ PPL Quest NZ
          </h1>
          <p>
            Your complete guide from zero to Private Pilot License
          </p>
          
          <div data-testid="journey-overview">
            <h2>Couch to PPL</h2>
            <p>
              Just like Couch to 5K, we'll guide you step-by-step through your pilot training:
            </p>
            
            <div>
              <div>
                <div>27 lessons</div>
                <div>Progressive training</div>
              </div>
              <div>
                <div>50 hours</div>
                <div>Minimum flight time</div>
              </div>
              <div>
                <div>6 exams</div>
                <div>Theory subjects</div>
              </div>
              <div>
                <div>12 badges</div>
                <div>Achievement system</div>
              </div>
            </div>
            
            <p>
              Complete lessons in order, earn badges for milestones, track your progress to becoming a licensed pilot in New Zealand.
            </p>
            
            <button 
              @click="startJourney" 
              data-testid="start-journey-button"
            >
              🚀 Start Your PPL Journey
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Onboarding flow -->
    <div v-else-if="showOnboarding">
      <div>
        <div data-testid="onboarding-step-1">
          <div>
            <h2>Welcome to Your PPL Journey! 🎯</h2>
            <div>✈️</div>
          </div>
          
          <div data-testid="onboarding-explanation">
            <h3>How PPL Quest Works</h3>
            
            <div>
              <div>
                <div>1</div>
                <div>
                  <div>Complete lessons in order</div>
                  <div>Just like Couch to 5K - no skipping ahead! Each lesson builds on the previous one.</div>
                </div>
              </div>
              
              <div>
                <div>2</div>
                <div>
                  <div>Earn badges for achievements</div>
                  <div>First Flight, Solo Wings, Theory Master - celebrate every milestone!</div>
                </div>
              </div>
              
              <div>
                <div>3</div>
                <div>
                  <div>Track regulatory requirements</div>
                  <div>Medical certificates, theory exams, solo endorsements - we'll guide you through it all.</div>
                </div>
              </div>
              
              <div>
                <div>4</div>
                <div>
                  <div>See what's next</div>
                  <div>Always know your next step - no confusion, just clear progress.</div>
                </div>
              </div>
            </div>

            <div>
              <div>🇳🇿 Built for New Zealand</div>
              <div>
                Includes NZ-specific requirements like optional night flying, DL9 medical certificates, 
                terrain awareness training, and CAA Part 61 compliance.
              </div>
            </div>
          </div>
          
          <button 
            @click="completeOnboarding" 
            data-testid="continue-to-app"
          >
            Let's Start Flying! 🛫
          </button>
        </div>
      </div>
    </div>

    <!-- Redirect to dashboard once onboarding complete -->
    <div v-else>
      <div>
        <div>🚀</div>
        <div>Taking you to your flight dashboard...</div>
        <div>Loading your PPL progress...</div>
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