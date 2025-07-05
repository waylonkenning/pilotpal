<template>
  <div class="app-layout" data-testid="user-profile-view">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">👤 User Profile</h1>
            <p class="text-sm opacity-60">
              Manage your pilot profile and training preferences
            </p>
          </div>
          <button 
            @click="showProfileHelp = true"
            class="btn btn-secondary btn-sm"
            data-testid="profile-help-button">
            ❓ Help
          </button>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">

        <!-- Personal Information -->
        <div class="card card-elevated mb-xl" data-testid="user-profile-form">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">👤</div>
            <h2 class="font-bold">Personal Information</h2>
          </div>
          
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input 
                  v-model="userProfile.name" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter your full name"
                  required>
              </div>
              
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input 
                  v-model="userProfile.email" 
                  type="email" 
                  class="form-input"
                  placeholder="your.email@example.com"
                  required>
              </div>
              
              <div class="form-group">
                <label class="form-label">Date of Birth</label>
                <input 
                  v-model="userProfile.dateOfBirth" 
                  type="date" 
                  class="form-input"
                  required>
              </div>
              
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input 
                  v-model="userProfile.phone" 
                  type="tel" 
                  class="form-input"
                  placeholder="+64 21 123 4567">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Address</label>
              <textarea 
                v-model="userProfile.address" 
                class="form-input"
                rows="3"
                placeholder="Your residential address"></textarea>
            </div>

            <div class="flex gap-md">
              <button type="submit" class="btn btn-primary flex-1">
                💾 Save Profile
              </button>
              <button type="button" @click="resetProfile" class="btn btn-secondary">
                🔄 Reset
              </button>
            </div>
          </form>
        </div>

        <!-- Training Preferences -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">⚙️</div>
            <h2 class="font-bold">Training Preferences</h2>
          </div>
          
          <div class="space-y-4">
            <div class="form-group">
              <label class="form-label">Preferred Flight School</label>
              <select v-model="userProfile.preferredSchool" class="form-input">
                <option value="">Select a flight school...</option>
                <option value="auckland-flying-club">Auckland Flying Club</option>
                <option value="christchurch-aviation">Christchurch Aviation</option>
                <option value="wellington-aero-club">Wellington Aero Club</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Training Frequency</label>
              <select v-model="userProfile.trainingFrequency" class="form-input">
                <option value="">Select frequency...</option>
                <option value="intensive">Intensive (3-4 lessons/week)</option>
                <option value="standard">Standard (1-2 lessons/week)</option>
                <option value="casual">Casual (1 lesson/week or less)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Training Goals</label>
              <textarea 
                v-model="userProfile.goals" 
                class="form-input"
                rows="3"
                placeholder="What do you want to achieve with your PPL?"></textarea>
            </div>

            <button @click="savePreferences" class="btn btn-primary w-full">
              💾 Save Preferences
            </button>
          </div>
        </div>

        <!-- Progress Summary -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📊</div>
            <h2 class="font-bold">Your Progress Summary</h2>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ progress.flightHours.total }}</div>
              <div class="text-sm opacity-80">Flight Hours</div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ passedTheoryExams }}/6</div>
              <div class="text-sm opacity-80">Theory Exams</div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ progress.achievements.length }}</div>
              <div class="text-sm opacity-80">Achievements</div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">${{ (progress.totalSpent || 0).toLocaleString() }}</div>
              <div class="text-sm opacity-80">Total Spent</div>
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

    <!-- Profile Help Modal -->
    <div v-if="showProfileHelp" class="modal-overlay" @click="showProfileHelp = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">❓ Profile Help</h3>
          <button @click="showProfileHelp = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">Managing Your Profile</h4>
          <div class="text-sm opacity-80 space-y-2">
            <p>• Keep your personal information up to date</p>
            <p>• Set training preferences to get personalized recommendations</p>
            <p>• Track your overall progress and achievements</p>
            <p>• Your data is stored locally and remains private</p>
          </div>
        </div>

        <button @click="showProfileHelp = false" class="btn btn-primary w-full">
          Got it!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// State
const userProfile = ref({
  name: '',
  email: '',
  dateOfBirth: '',
  phone: '',
  address: '',
  preferredSchool: '',
  trainingFrequency: '',
  goals: ''
})

const progress = ref({
  flightHours: { total: 0 },
  theoryExams: {
    airLaw: { passed: false },
    navigation: { passed: false },
    technicalKnowledge: { passed: false },
    humanFactors: { passed: false },
    meteorology: { passed: false },
    radioTelephony: { passed: false }
  },
  achievements: [] as string[],
  totalSpent: 0
})

// Modal state
const showProfileHelp = ref(false)

// Computed properties
const passedTheoryExams = computed(() => {
  return Object.values(progress.value.theoryExams).filter(exam => exam.passed).length
})

// Methods
const saveProfile = () => {
  localStorage.setItem('ppl-quest-profile', JSON.stringify(userProfile.value))
  alert('Profile saved successfully!')
}

const savePreferences = () => {
  localStorage.setItem('ppl-quest-profile', JSON.stringify(userProfile.value))
  alert('Preferences saved successfully!')
}

const resetProfile = () => {
  if (confirm('Are you sure you want to reset your profile? This action cannot be undone.')) {
    userProfile.value = {
      name: '',
      email: '',
      dateOfBirth: '',
      phone: '',
      address: '',
      preferredSchool: '',
      trainingFrequency: '',
      goals: ''
    }
  }
}

const loadData = () => {
  // Load profile data
  const savedProfile = localStorage.getItem('ppl-quest-profile')
  if (savedProfile) {
    try {
      userProfile.value = { ...userProfile.value, ...JSON.parse(savedProfile) }
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }
  
  // Load progress data
  const savedProgress = localStorage.getItem('ppl-quest-progress')
  if (savedProgress) {
    try {
      progress.value = { ...progress.value, ...JSON.parse(savedProgress) }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
</style>