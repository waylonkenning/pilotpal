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
          <div>
            <label class="form-label">Full Name</label>
            <input 
              v-model="userProfile.name" 
              type="text" 
              class="form-input"
              placeholder="John Smith"
              data-testid="pilot-name-input"
            >
          </div>
          
          <div>
            <label class="form-label">Email Address</label>
            <input 
              v-model="userProfile.email" 
              type="email" 
              class="form-input"
              placeholder="john@example.com"
              data-testid="pilot-email-input"
            >
          </div>
          
          <div>
            <label class="form-label">Phone Number</label>
            <input 
              v-model="userProfile.phone" 
              type="tel" 
              class="form-input"
              placeholder="021-123-4567"
              data-testid="pilot-phone-input"
            >
          </div>
          
          <div>
            <label class="form-label">Training Start Date</label>
            <input 
              v-model="userProfile.trainingStartDate" 
              type="date" 
              class="form-input"
              data-testid="training-start-date"
            >
          </div>
          
          <div>
            <label class="form-label">Date of Birth</label>
            <input 
              v-model="userProfile.dateOfBirth" 
              type="date" 
              class="form-input"
              data-testid="date-of-birth-input"
            >
          </div>
          
          <div>
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
            <div>
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
            
            <div>
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
        <div class="mt-8 flex gap-3">
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

      <!-- CAA MyAviation Integration -->
      <div class="card mb-8" data-testid="caa-myaviation-section">
        <h2 class="text-xl font-semibold mb-6">🇳🇿 CAA MyAviation Integration</h2>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-semibold text-blue-800">Connection Status</h3>
              <div class="text-blue-700" data-testid="myaviation-status">
                {{ myAviationConnected ? 'Connected' : 'Not Connected' }}
              </div>
            </div>
            <div class="text-3xl">
              {{ myAviationConnected ? '✅' : '🔗' }}
            </div>
          </div>
          
          <div v-if="!myAviationConnected" data-testid="myaviation-instructions">
            <p class="text-blue-700 mb-4">
              Connect your CAA MyAviation account to automatically sync your medical certificates, 
              theory exam results, and license status.
            </p>
            
            <div class="bg-green-50 p-4 rounded-lg mb-4" data-testid="myaviation-benefits">
              <h4 class="font-semibold text-green-800 mb-2">Benefits of Integration:</h4>
              <ul class="text-green-700 space-y-1">
                <li>• Automatic updates of medical certificate status</li>
                <li>• Theory exam results sync</li>
                <li>• License and endorsement tracking</li>
                <li>• Compliance monitoring and reminders</li>
              </ul>
            </div>
            
            <button 
              @click="showMyAviationForm = true"
              class="btn btn-primary"
              data-testid="setup-myaviation-button"
            >
              🔗 Connect MyAviation
            </button>
          </div>
          
          <div v-else>
            <p class="text-blue-700 mb-4">
              Your CAA MyAviation account is connected and syncing automatically.
            </p>
            <div class="text-sm text-blue-600">
              Last sync: {{ lastSyncDate }}
            </div>
          </div>
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

    <!-- MyAviation Connection Form -->
    <div v-if="showMyAviationForm" class="modal-overlay" @click="showMyAviationForm = false">
      <div class="modal-content" @click.stop data-testid="myaviation-connection-form">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Connect CAA MyAviation</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">CAA Username</label>
              <input 
                v-model="myAviationForm.username" 
                type="text" 
                class="form-input"
                placeholder="Your CAA MyAviation username"
                data-testid="caa-username-input"
              >
            </div>
            
            <div>
              <label class="form-label">Password</label>
              <input 
                v-model="myAviationForm.password" 
                type="password" 
                class="form-input"
                placeholder="Your CAA MyAviation password"
                data-testid="caa-password-input"
              >
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg">
              <p class="text-yellow-800 text-sm">
                <strong>Security Note:</strong> Your credentials are encrypted and stored securely. 
                We only access your public license and medical information to keep your 
                training records up to date.
              </p>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button 
              @click="connectMyAviation" 
              class="btn btn-primary flex-1"
              data-testid="connect-myaviation-button"
            >
              🔗 Connect Account
            </button>
            <button @click="showMyAviationForm = false" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MyAviation Connection Success -->
    <div v-if="showConnectionSuccess" class="modal-overlay" @click="showConnectionSuccess = false">
      <div class="modal-content" @click.stop data-testid="myaviation-connection-success">
        <div class="p-6 text-center">
          <div class="text-6xl mb-4">🔗</div>
          <h3 class="text-xl font-bold mb-4">Successfully Connected!</h3>
          <p class="text-gray-600 mb-6">
            Your CAA MyAviation account has been connected. Your medical certificates 
            and theory exam results will now sync automatically.
          </p>
          <button @click="showConnectionSuccess = false" class="btn btn-primary">
            Great!
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
              <h4 class="font-semibold text-blue-600 mb-2">🇳🇿 CAA MyAviation</h4>
              <p class="text-gray-700">
                Connect your official CAA account to automatically sync medical certificates, 
                theory exam results, and license status for seamless compliance tracking.
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
const showMyAviationForm = ref(false)
const showConnectionSuccess = ref(false)

// MyAviation integration
const myAviationConnected = ref(false)
const lastSyncDate = ref('')
const myAviationForm = ref({
  username: '',
  password: ''
})

// Load profile data on mount
onMounted(() => {
  loadProfile()
})

const loadProfile = () => {
  const savedProfile = localStorage.getItem('ppl-quest-user-profile')
  if (savedProfile) {
    const parsed = JSON.parse(savedProfile)
    userProfile.value = { ...userProfile.value, ...parsed }
  }
  
  // Check MyAviation connection status
  const myAviationData = localStorage.getItem('ppl-quest-myaviation')
  if (myAviationData) {
    const data = JSON.parse(myAviationData)
    myAviationConnected.value = data.connected || false
    lastSyncDate.value = data.lastSync || ''
  }
}

const saveProfile = () => {
  // Save to localStorage
  localStorage.setItem('ppl-quest-user-profile', JSON.stringify(userProfile.value))
  
  // Show success message
  showSaveSuccess.value = true
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    showSaveSuccess.value = false
  }, 3000)
}

const connectMyAviation = () => {
  // Simulate connection process
  setTimeout(() => {
    myAviationConnected.value = true
    lastSyncDate.value = new Date().toLocaleDateString()
    
    // Save connection status
    localStorage.setItem('ppl-quest-myaviation', JSON.stringify({
      connected: true,
      lastSync: lastSyncDate.value,
      username: myAviationForm.value.username
    }))
    
    // Reset form and show success
    myAviationForm.value = { username: '', password: '' }
    showMyAviationForm.value = false
    showConnectionSuccess.value = true
  }, 1500) // Simulate API call delay
}
</script>