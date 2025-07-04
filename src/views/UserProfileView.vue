<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="text-center flex-1">
          <h1 class="text-3xl font-bold mb-4">👤 User Profile</h1>
          <p class="text-lg text-gray-600">
            Manage your pilot profile and training preferences
          </p>
        </div>
        <button 
          @click="showProfileHelp = true"
          class="btn btn-secondary text-sm"
          data-testid="profile-help-button"
        >
          ❓ Help
        </button>
      </div>

      <!-- Profile Form -->
      <div class="card mb-8" data-testid="user-profile-form">
        <h2 class="text-xl font-semibold mb-6">Personal Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-1">
            <label class="form-label">Full Name</label>
            <input 
              v-model="userProfile.name" 
              type="text" 
              class="form-input"
              placeholder="John Smith"
              data-testid="pilot-name-input"
            >
          </div>
          
          <div class="space-y-1">
            <label class="form-label">Email Address</label>
            <input 
              v-model="userProfile.email" 
              type="email" 
              class="form-input"
              placeholder="john@example.com"
              data-testid="pilot-email-input"
            >
          </div>
          
          <div class="space-y-1">
            <label class="form-label">Phone Number</label>
            <input 
              v-model="userProfile.phone" 
              type="tel" 
              class="form-input"
              placeholder="021-123-4567"
              data-testid="pilot-phone-input"
            >
          </div>
          
          <div class="space-y-1">
            <label class="form-label">Training Start Date</label>
            <input 
              v-model="userProfile.trainingStartDate" 
              type="date" 
              class="form-input"
              data-testid="training-start-date"
            >
          </div>
          
          <div class="space-y-1">
            <label class="form-label">Date of Birth</label>
            <input 
              v-model="userProfile.dateOfBirth" 
              type="date" 
              class="form-input"
              data-testid="date-of-birth-input"
            >
          </div>
          
          <div class="space-y-1">
            <label class="form-label">Preferred Flight School</label>
            <select 
              v-model="userProfile.flightSchool" 
              class="form-input"
              data-testid="flight-school-select"
            >
              <option value="">Select a school</option>
              <option value="auckland-aero-club">Auckland Aero Club</option>
              <option value="christchurch-flying-club">Christchurch Flying Club</option>
              <option value="wellington-aero-club">Wellington Aero Club</option>
              <option value="hamilton-flying-club">Hamilton Flying Club</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <!-- Training Preferences -->
        <div class="mt-8">
          <h3 class="text-lg font-semibold mb-4">Training Preferences</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="form-label">Preferred Training Days</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" v-model="userProfile.preferredDays" value="monday" class="mr-2">
                  Monday
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="userProfile.preferredDays" value="tuesday" class="mr-2">
                  Tuesday
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="userProfile.preferredDays" value="wednesday" class="mr-2">
                  Wednesday
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="userProfile.preferredDays" value="thursday" class="mr-2">
                  Thursday
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="userProfile.preferredDays" value="friday" class="mr-2">
                  Friday
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="userProfile.preferredDays" value="saturday" class="mr-2">
                  Saturday
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="userProfile.preferredDays" value="sunday" class="mr-2">
                  Sunday
                </label>
              </div>
            </div>
            
            <div class="space-y-1">
              <label class="form-label">Training Pace</label>
              <select 
                v-model="userProfile.trainingPace" 
                class="form-input"
                data-testid="training-pace-select"
              >
                <option value="intensive">Intensive (3+ lessons/week)</option>
                <option value="regular">Regular (2 lessons/week)</option>
                <option value="relaxed">Relaxed (1 lesson/week)</option>
                <option value="flexible">Flexible (as available)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-8 flex gap-4">
          <button 
            @click="saveProfile" 
            class="btn btn-primary flex-1"
            data-testid="save-profile-button"
          >
            💾 Save Profile
          </button>
          <router-link to="/dashboard" class="btn btn-secondary">
            ← Back to Dashboard
          </router-link>
        </div>
      </div>


      <!-- Reset Profile Section -->
      <div class="card mb-8 border-red-200 bg-red-50" data-testid="reset-profile-section">
        <h2 class="text-xl font-semibold mb-6 text-red-800">🔄 Reset Training Progress</h2>
        
        <div class="bg-white p-4 rounded-lg border border-red-200 mb-4">
          <div class="flex items-start gap-3 mb-4">
            <div class="text-2xl">⚠️</div>
            <div>
              <h3 class="font-semibold text-red-800 mb-2">Warning: This Action Cannot Be Undone</h3>
              <p class="text-red-700 text-sm mb-2">
                Resetting your profile will permanently delete:
              </p>
              <ul class="text-red-700 text-sm space-y-1 ml-4">
                <li>• All lesson progress and completed lessons</li>
                <li>• Flight hours (dual, solo, cross-country)</li>
                <li>• Achievement badges and milestones</li>
                <li>• Theory exam history and results</li>
                <li>• Financial expense tracking</li>
                <li>• Demonstrated skills records</li>
              </ul>
              <p class="text-red-700 text-sm mt-2">
                Your profile information (name, email, etc.) will be kept.
              </p>
            </div>
          </div>
          
          <button 
            @click="showResetConfirmation = true" 
            class="btn bg-red-600 hover:bg-red-700 text-white border-red-600"
            data-testid="reset-profile-button"
          >
            🔄 Reset All Training Progress
          </button>
        </div>
      </div>

      <!-- Emergency Contacts -->
      <div class="card">
        <h2 class="text-xl font-semibold mb-6">🚨 Emergency Contacts</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Primary Emergency Contact</label>
            <input 
              v-model="userProfile.emergencyContact1.name" 
              type="text" 
              class="form-input mb-2"
              placeholder="Contact Name"
              data-testid="emergency-contact-1-name"
            >
            <input 
              v-model="userProfile.emergencyContact1.phone" 
              type="tel" 
              class="form-input mb-2"
              placeholder="Phone Number"
              data-testid="emergency-contact-1-phone"
            >
            <input 
              v-model="userProfile.emergencyContact1.relationship" 
              type="text" 
              class="form-input"
              placeholder="Relationship"
              data-testid="emergency-contact-1-relationship"
            >
          </div>
          
          <div>
            <label class="form-label">Secondary Emergency Contact</label>
            <input 
              v-model="userProfile.emergencyContact2.name" 
              type="text" 
              class="form-input mb-2"
              placeholder="Contact Name"
              data-testid="emergency-contact-2-name"
            >
            <input 
              v-model="userProfile.emergencyContact2.phone" 
              type="tel" 
              class="form-input mb-2"
              placeholder="Phone Number"
              data-testid="emergency-contact-2-phone"
            >
            <input 
              v-model="userProfile.emergencyContact2.relationship" 
              type="text" 
              class="form-input"
              placeholder="Relationship"
              data-testid="emergency-contact-2-relationship"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Save Success Modal -->
    <div v-if="showSaveSuccess" class="modal-overlay" @click="showSaveSuccess = false">
      <div class="modal-content" @click.stop data-testid="profile-save-success">
        <div class="p-6 text-center">
          <div class="text-6xl mb-4">✅</div>
          <h3 class="text-xl font-bold mb-4">Profile Saved!</h3>
          <p class="text-gray-600 mb-6">
            Your profile has been successfully updated and saved.
          </p>
          <button @click="showSaveSuccess = false" class="btn btn-primary">
            Continue
          </button>
        </div>
      </div>
    </div>


    <!-- Reset Confirmation Modal -->
    <div v-if="showResetConfirmation" class="modal-overlay" @click="showResetConfirmation = false">
      <div class="modal-content" @click.stop data-testid="reset-confirmation-modal">
        <div class="p-6">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">⚠️</div>
            <h3 class="text-2xl font-bold mb-4 text-red-800">Confirm Training Reset</h3>
          </div>
          
          <div class="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
            <p class="text-red-800 font-semibold mb-2">
              Are you absolutely sure you want to reset all training progress?
            </p>
            <p class="text-red-700 text-sm">
              This will permanently delete all your lesson progress, flight hours, achievements, 
              theory exam history, and financial tracking. Your profile information will be kept.
            </p>
          </div>

          <div class="mb-6">
            <label class="form-label text-red-800">Type "RESET" to confirm:</label>
            <input 
              v-model="resetConfirmText" 
              type="text" 
              class="form-input border-red-300 focus:border-red-500"
              placeholder="Type RESET here"
              data-testid="reset-confirmation-input"
            >
          </div>
          
          <div class="flex gap-4">
            <button 
              @click="showResetConfirmation = false" 
              class="btn btn-secondary flex-1"
              data-testid="cancel-reset-button"
            >
              Cancel
            </button>
            <button 
              @click="confirmReset" 
              :disabled="resetConfirmText !== 'RESET'"
              :class="resetConfirmText === 'RESET' ? 
                'btn bg-red-600 hover:bg-red-700 text-white border-red-600 flex-1' : 
                'btn bg-gray-300 text-gray-500 border-gray-300 flex-1 cursor-not-allowed'"
              data-testid="confirm-reset-button"
            >
              🔄 Reset Everything
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reset Success Modal -->
    <div v-if="showResetSuccess" class="modal-overlay" @click="showResetSuccess = false">
      <div class="modal-content" @click.stop data-testid="reset-success-modal">
        <div class="p-6 text-center">
          <div class="text-6xl mb-4">🔄</div>
          <h3 class="text-xl font-bold mb-4">Training Progress Reset!</h3>
          <p class="text-gray-600 mb-6">
            Your training progress has been successfully reset. You can now start your PPL journey fresh.
          </p>
          <button @click="navigateToHome" class="btn btn-primary">
            Start Fresh Journey
          </button>
        </div>
      </div>
    </div>

    <!-- Profile Help Modal -->
    <div v-if="showProfileHelp" class="modal-overlay" @click="showProfileHelp = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">User Profile Help</h3>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-blue-600 mb-2">📋 Personal Information</h4>
              <p class="text-gray-700">
                Keep your contact information up to date for emergency situations and 
                communication with your flight school.
              </p>
            </div>
            
            
            <div>
              <h4 class="font-semibold text-blue-600 mb-2">🚨 Emergency Contacts</h4>
              <p class="text-gray-700">
                Required for flight training. Your flight school needs these contacts 
                in case of emergency during training flights.
              </p>
            </div>
          </div>
          
          <div class="mt-6">
            <button @click="showProfileHelp = false" class="btn btn-primary w-full">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { handleLocalStorageError, handleFormValidationError } from '../utils/errorHandler'

const router = useRouter()

// Profile data
const userProfile = ref({
  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  trainingStartDate: '',
  flightSchool: '',
  preferredDays: [] as string[],
  trainingPace: 'regular',
  emergencyContact1: {
    name: '',
    phone: '',
    relationship: ''
  },
  emergencyContact2: {
    name: '',
    phone: '',
    relationship: ''
  }
})

// Modal states
const showSaveSuccess = ref(false)
const showProfileHelp = ref(false)
const showResetConfirmation = ref(false)
const showResetSuccess = ref(false)
const resetConfirmText = ref('')

// Load profile data on mount
onMounted(() => {
  loadProfile()
})

const loadProfile = () => {
  try {
    const savedProfile = localStorage.getItem('ppl-quest-user-profile')
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      userProfile.value = { ...userProfile.value, ...parsed }
    }
  } catch (error) {
    console.error('Error loading profile:', error)
    handleLocalStorageError('load', error as Error)
  }
}

const saveProfile = () => {
  try {
    // Validate required fields
    if (!userProfile.value.name?.trim()) {
      handleFormValidationError('Full Name', 'This field is required')
      return
    }
    
    if (!userProfile.value.email?.trim()) {
      handleFormValidationError('Email Address', 'This field is required')
      return
    }
    
    // Save to localStorage
    localStorage.setItem('ppl-quest-user-profile', JSON.stringify(userProfile.value))
    
    // Show success message
    showSaveSuccess.value = true
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      showSaveSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Error saving profile:', error)
    handleLocalStorageError('save', error as Error)
  }
}

const confirmReset = () => {
  if (resetConfirmText.value !== 'RESET') {
    return
  }
  
  try {
    // Remove all training progress data but keep profile information
    localStorage.removeItem('ppl-quest-progress')
    
    // Reset confirmation text
    resetConfirmText.value = ''
    
    // Close confirmation modal and show success
    showResetConfirmation.value = false
    showResetSuccess.value = true
  } catch (error) {
    console.error('Error resetting profile:', error)
    handleLocalStorageError('reset', error as Error)
  }
}

const navigateToHome = () => {
  showResetSuccess.value = false
  router.push('/')
}

</script>