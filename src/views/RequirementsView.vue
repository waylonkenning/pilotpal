<template>
  <div class="app-layout" data-testid="requirements-view">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">📋 Regulatory Requirements</h1>
            <p class="text-sm opacity-60">
              Track your progress through New Zealand CAA Part 61 requirements
            </p>
          </div>
          <div class="status-dot"></div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">

        <!-- Medical Certificate Section -->
        <div class="card card-elevated mb-xl" data-testid="medical-certificate-section">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">🏥</div>
            <div>
              <h2 class="font-bold">Medical Certificate</h2>
              <p class="text-sm opacity-80">Required before solo flight - Class 2 or DL9 option</p>
            </div>
          </div>
          
          <div v-if="!progress.medicalCertificate" class="space-y-4">
            <div class="card card-compact" style="background: var(--bg-tertiary); border: var(--glass-border);">
              <div class="font-medium mb-sm">Medical Certificate Required</div>
              <div class="text-sm opacity-80 mb-md">Required before solo flight - choose Class 2 or DL9 option</div>
              <button 
                @click="showMedicalInfo = true"
                class="btn btn-secondary btn-sm"
                data-testid="medical-certificate-learn-more">
                Learn More
              </button>
            </div>
            
            <button 
              @click="showMedicalForm = true"
              class="btn btn-primary w-full"
              data-testid="medical-cert-requirement">
              📄 Complete Medical Certificate
            </button>
          </div>

          <div v-else class="space-y-4">
            <!-- Medical Certificate Status -->
            <div class="card card-compact" data-testid="medical-cert-status">
              <div class="flex items-center gap-md mb-md">
                <div class="text-2xl">{{ getMedicalStatusIcon() }}</div>
                <div>
                  <div class="font-medium">
                    {{ progress.medicalCertificate.type === 'class2' ? 'Class 2 Medical Certificate' : 'DL9 Driver License Medical' }}
                  </div>
                  <div class="text-sm opacity-80" data-testid="medical-expiry">
                    Valid until {{ formatDate(progress.medicalCertificate.expiryDate) }}
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">Status:</span>
                <span class="badge" :class="getMedicalStatusClass()" data-testid="medical-expiry-status">
                  {{ getMedicalExpiryStatus() }}
                </span>
              </div>
            </div>

            <!-- Medical Expiry Warnings -->
            <div v-if="getMedicalExpiryStatus() === 'Expiring Soon'" 
                 class="card card-compact" 
                 style="background: var(--gradient-warning); color: var(--text-inverse);"
                 data-testid="medical-expiry-warning">
              <div class="font-medium mb-sm">⚠️ Medical Certificate Expiring Soon</div>
              <div class="text-sm opacity-90 mb-md">Your medical certificate expires soon. Schedule a renewal to maintain flying privileges.</div>
              <div class="flex gap-md">
                <button @click="showMedicalRenewalInfo = true" class="btn btn-secondary flex-1" data-testid="medical-renewal-guidance">
                  📋 Renewal Guide
                </button>
                <button @click="showFindExaminer = true" class="btn btn-secondary flex-1" data-testid="find-medical-examiner">
                  🔍 Find CAME
                </button>
              </div>
            </div>

            <div v-if="getMedicalExpiryStatus() === 'Valid'" 
                 class="card card-compact" 
                 style="background: var(--gradient-success); color: var(--text-inverse);"
                 data-testid="solo-flight-unlocked">
              <div class="font-medium mb-sm">🦅 Solo Flight Unlocked!</div>
              <div class="text-sm opacity-90">You can now progress to solo flight lessons with instructor endorsement.</div>
            </div>

            <!-- Medical Certificate Management -->
            <div class="flex gap-md">
              <button 
                @click="editMedicalCert"
                class="btn btn-secondary flex-1"
                data-testid="edit-medical-cert">
                📝 Update Medical
              </button>
              <button 
                @click="showMedicalRenewalInfo = true"
                class="btn btn-secondary flex-1"
                data-testid="view-renewal-info">
                ℹ️ Renewal Info
              </button>
            </div>
          </div>
        </div>

        <!-- Theory Exams Section -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📚</div>
            <div>
              <h2 class="font-bold">Theory Examinations</h2>
              <p class="text-sm opacity-80">70% minimum to pass each subject. All 6 subjects must be completed.</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div 
              v-for="(exam, subject) in progress.theoryExams" 
              :key="subject"
              class="card card-compact"
              :class="exam.passed ? 'bg-success' : ''"
              :data-testid="subject.replace(/([A-Z])/g, '-$1').toLowerCase() + '-exam'">
              <div class="flex items-center justify-between mb-sm">
                <div class="font-medium">{{ getExamName(subject) }}</div>
                <div v-if="exam.passed" class="text-green-400">✅</div>
                <div v-else class="opacity-60">⏳</div>
              </div>
              
              <div class="text-sm opacity-80 mb-md">
                {{ getExamDescription(subject) }}
              </div>
              
              <div v-if="exam.attempts.length > 0" class="text-sm opacity-60 mb-sm">
                Attempts: {{ exam.attempts.length }}
              </div>
              
              <button 
                v-if="!exam.passed"
                @click="scheduleExam(subject)"
                class="btn btn-primary btn-sm w-full">
                📅 Schedule Exam
              </button>
              
              <div v-else class="badge badge-success">
                Passed ✓
              </div>
            </div>
          </div>
        </div>

        <!-- Flight Training Progress -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">✈️</div>
            <div>
              <h2 class="font-bold">Flight Training Progress</h2>
              <p class="text-sm opacity-80">Minimum 50 hours total flight time required</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ progress.flightHours.dual }}</div>
              <div class="text-sm opacity-80 mb-sm">Dual Hours</div>
              <div class="progress">
                <div class="progress-bar" :style="{ width: Math.min((progress.flightHours.dual / 35) * 100, 100) + '%' }"></div>
              </div>
              <div class="text-sm opacity-60 mt-sm">35 required</div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ progress.flightHours.solo }}</div>
              <div class="text-sm opacity-80 mb-sm">Solo Hours</div>
              <div class="progress">
                <div class="progress-bar" :style="{ width: Math.min((progress.flightHours.solo / 15) * 100, 100) + '%' }"></div>
              </div>
              <div class="text-sm opacity-60 mt-sm">15 required</div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ progress.flightHours.total }}</div>
              <div class="text-sm opacity-80 mb-sm">Total Hours</div>
              <div class="progress">
                <div class="progress-bar" :style="{ width: Math.min((progress.flightHours.total / 50) * 100, 100) + '%' }"></div>
              </div>
              <div class="text-sm opacity-60 mt-sm">50 required</div>
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

    <!-- Medical Information Modal -->
    <div v-if="showMedicalInfo" class="modal-overlay" @click="showMedicalInfo = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">🏥 Medical Certificate Information</h3>
          <button @click="showMedicalInfo = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">Medical Certificate Options</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div>
              <strong>Class 2 Medical:</strong> $420-$1,070
              <br><em class="text-sm opacity-80">Comprehensive medical examination</em>
            </div>
            <div>
              <strong>DL9 Option:</strong> $0-$200
              <br><em class="text-sm opacity-80">Use existing driver license medical</em>
            </div>
          </div>
        </div>

        <div class="flex gap-md">
          <button @click="showMedicalInfo = false" class="btn btn-primary flex-1">
            Got it!
          </button>
          <a href="https://www.caa.govt.nz/safety/aviation-medicine/" target="_blank" class="btn btn-secondary flex-1">
            CAA Medical Info
          </a>
        </div>
      </div>
    </div>

    <!-- Medical Form Modal -->
    <div v-if="showMedicalForm" class="modal-overlay" @click="showMedicalForm = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">📄 Complete Medical Certificate</h3>
          <button @click="showMedicalForm = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <form @submit.prevent="submitMedicalCert" class="space-y-4">
          <div class="form-group">
            <label class="form-label">Medical Certificate Type</label>
            <select v-model="medicalForm.type" class="form-input" required>
              <option value="">Select type...</option>
              <option value="class2">Class 2 Medical Certificate</option>
              <option value="dl9">DL9 Driver License Medical</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Issue Date</label>
            <input v-model="medicalForm.issueDate" type="date" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Expiry Date</label>
            <input v-model="medicalForm.expiryDate" type="date" class="form-input" required>
          </div>

          <div class="flex gap-md">
            <button type="button" @click="showMedicalForm = false" class="btn btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Save Medical Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// State
const progress = ref({
  medicalCertificate: null as any,
  theoryExams: {
    airLaw: { attempts: [], passed: false },
    navigation: { attempts: [], passed: false },
    technicalKnowledge: { attempts: [], passed: false },
    humanFactors: { attempts: [], passed: false },
    meteorology: { attempts: [], passed: false },
    radioTelephony: { attempts: [], passed: false }
  },
  flightHours: {
    dual: 0,
    solo: 0,
    total: 0
  }
})

// Modal states
const showMedicalInfo = ref(false)
const showMedicalForm = ref(false)
const showMedicalRenewalInfo = ref(false)
const showFindExaminer = ref(false)

// Form data
const medicalForm = ref({
  type: '',
  issueDate: '',
  expiryDate: ''
})

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

const getMedicalStatusIcon = () => {
  if (!progress.value.medicalCertificate) return '❌'
  const status = getMedicalExpiryStatus()
  switch (status) {
    case 'Valid': return '✅'
    case 'Expiring Soon': return '⚠️'
    case 'Expired': return '❌'
    default: return '⏳'
  }
}

const getMedicalExpiryStatus = () => {
  if (!progress.value.medicalCertificate?.expiryDate) return 'Unknown'
  
  const now = new Date()
  const expiry = new Date(progress.value.medicalCertificate.expiryDate)
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysUntilExpiry < 0) return 'Expired'
  if (daysUntilExpiry <= 30) return 'Expiring Soon'
  return 'Valid'
}

const getMedicalStatusClass = () => {
  const status = getMedicalExpiryStatus()
  switch (status) {
    case 'Valid': return 'badge-success'
    case 'Expiring Soon': return 'badge-warning'
    case 'Expired': return 'badge-error'
    default: return 'badge-secondary'
  }
}

const getExamName = (subject: string) => {
  const names: Record<string, string> = {
    airLaw: 'Air Law',
    navigation: 'Navigation',
    technicalKnowledge: 'Technical Knowledge',
    humanFactors: 'Human Factors',
    meteorology: 'Meteorology',
    radioTelephony: 'Radio Telephony'
  }
  return names[subject] || subject
}

const getExamDescription = (subject: string) => {
  const descriptions: Record<string, string> = {
    airLaw: 'Aviation regulations and airspace',
    navigation: 'Chart reading and flight planning',
    technicalKnowledge: 'Aircraft systems and performance',
    humanFactors: 'Aviation psychology and safety',
    meteorology: 'Weather theory and interpretation',
    radioTelephony: 'Communication procedures'
  }
  return descriptions[subject] || ''
}

const scheduleExam = (subject: string) => {
  // Placeholder for exam scheduling
  alert(`Scheduling ${getExamName(subject)} exam...`)
}

const editMedicalCert = () => {
  medicalForm.value = {
    type: progress.value.medicalCertificate?.type || '',
    issueDate: progress.value.medicalCertificate?.issueDate || '',
    expiryDate: progress.value.medicalCertificate?.expiryDate || ''
  }
  showMedicalForm.value = true
}

const submitMedicalCert = () => {
  progress.value.medicalCertificate = {
    ...medicalForm.value,
    id: Date.now().toString()
  }
  
  // Save to localStorage
  localStorage.setItem('ppl-quest-progress', JSON.stringify(progress.value))
  
  showMedicalForm.value = false
  
  // Reset form
  medicalForm.value = {
    type: '',
    issueDate: '',
    expiryDate: ''
  }
}

const loadProgress = () => {
  const saved = localStorage.getItem('ppl-quest-progress')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      progress.value = { ...progress.value, ...parsed }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }
}

onMounted(() => {
  loadProgress()
})
</script>

<style scoped>
.bg-success {
  background: var(--gradient-success) !important;
  color: var(--text-inverse) !important;
}
</style>