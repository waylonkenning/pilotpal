<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-4">📋 Regulatory Requirements</h1>
        <p class="text-lg text-gray-600 mb-6">
          Track your progress through New Zealand CAA Part 61 requirements
        </p>
      </div>

      <!-- Medical Certificate Section -->
      <div class="card mb-6" data-testid="upcoming-requirements">
        <h2 class="text-xl font-semibold mb-4 text-blue-600">🏥 Medical Certificate</h2>
        
        <div v-if="!progress.medicalCertificate" class="space-y-4">
          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div class="font-semibold text-yellow-800 mb-2">Medical Certificate Required</div>
            <div class="text-yellow-700 mb-3">Required before solo flight - choose Class 2 or DL9 option</div>
            <button 
              @click="showMedicalInfo = true"
              class="btn btn-secondary btn-sm" 
              data-testid="medical-cert-info"
            >
              Learn More
            </button>
          </div>
          
          <button 
            @click="showMedicalForm = true"
            class="btn btn-primary w-full"
            data-testid="medical-cert-requirement"
          >
            📄 Complete Medical Certificate
          </button>
        </div>

        <div v-else class="space-y-4">
          <div class="bg-green-50 p-4 rounded-lg border border-green-200 completed" data-testid="medical-cert-status">
            <div class="flex items-center gap-3">
              <div class="text-2xl">✅</div>
              <div>
                <div class="font-semibold text-green-800">{{ progress.medicalCertificate.type === 'class2' ? 'Class 2 Medical Certificate' : 'DL9 Driver License Medical' }}</div>
                <div class="text-green-700" data-testid="medical-expiry">
                  Valid until {{ formatDate(progress.medicalCertificate.expiryDate) }}
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="progress.medicalCertificate" class="bg-blue-50 p-4 rounded-lg" data-testid="solo-flight-unlocked">
            <div class="font-semibold text-blue-800 mb-2">🦅 Solo Flight Unlocked!</div>
            <div class="text-blue-700">You can now progress to solo flight lessons with instructor endorsement.</div>
          </div>
        </div>
      </div>

      <!-- Fit and Proper Person Section -->
      <div class="card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-green-600">📋 Fit and Proper Person Assessment</h2>
        
        <div data-testid="fpp-requirement">
          <div v-if="!progress.fppAssessment" class="space-y-4">
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div class="font-semibold text-yellow-800 mb-2">FPP Assessment Required</div>
              <div class="text-yellow-700 mb-3">Required for license application under Civil Aviation Act</div>
              <button 
                @click="showFppInfo = true"
                class="btn btn-secondary btn-sm" 
                data-testid="fpp-info"
              >
                Learn More
              </button>
            </div>
            
            <button 
              @click="showFppForm = true"
              class="btn btn-primary w-full"
            >
              📝 Complete FPP Assessment
            </button>
          </div>

          <div v-else class="bg-green-50 p-4 rounded-lg border border-green-200">
            <div class="flex items-center gap-3">
              <div class="text-2xl">✅</div>
              <div>
                <div class="font-semibold text-green-800">FPP Assessment Complete</div>
                <div class="text-green-700" data-testid="fpp-validity">
                  Valid for 1 year (expires {{ formatDate(progress.fppAssessment.expiryDate) }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Theory Exams Section -->
      <div class="card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-purple-600">📚 Theory Examinations</h2>
        
        <div class="mb-4">
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200" data-testid="pass-requirement">
            <div class="font-semibold text-blue-800 mb-2">📊 Pass Requirements</div>
            <div class="text-blue-700">70% minimum to pass each subject. All 6 subjects must be completed.</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="(exam, subject) in progress.theoryExams" 
            :key="subject"
            class="p-4 rounded-lg border"
            :class="exam.passed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'"
            :data-testid="subject.replace(/([A-Z])/g, '-$1').toLowerCase() + '-exam'"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="font-semibold">{{ getExamName(subject) }}</div>
              <div v-if="exam.passed" class="text-green-600">✅</div>
              <div v-else class="text-gray-400">⏳</div>
            </div>
            
            <div class="text-sm text-gray-600 mb-3">
              {{ getExamDescription(subject) }}
            </div>
            
            <div v-if="exam.attempts.length > 0" class="text-xs text-gray-500 mb-2">
              Attempts: {{ exam.attempts.length }}
            </div>
            
            <button 
              v-if="!exam.passed"
              @click="scheduleExam(subject)"
              class="btn btn-secondary btn-sm w-full"
            >
              📅 Schedule Exam
            </button>
            
            <div v-else class="text-xs text-green-600">
              Passed ✓
            </div>
          </div>
        </div>
      </div>

      <!-- Night Flying Section (Optional) -->
      <div class="card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-orange-600">🌙 Night Flying (Optional)</h2>
        
        <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div class="font-semibold text-orange-800 mb-2">Optional Qualification</div>
          <div class="text-orange-700 mb-3">
            Night flying is optional in New Zealand. Requires 5 hours including 2h dual, 2h solo, and 1h additional.
          </div>
          <div class="text-sm text-orange-600">
            Current night hours: {{ progress.flightHours.night || 0 }}h / 5h required
          </div>
        </div>
      </div>

      <!-- Terrain Awareness Section (NZ Specific) -->
      <div class="card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-red-600">🏔️ Terrain Awareness Training</h2>
        
        <div class="bg-red-50 p-4 rounded-lg border border-red-200">
          <div class="font-semibold text-red-800 mb-2">NZ Specific Requirement</div>
          <div class="text-red-700 mb-3">
            5 hours of terrain awareness training required for New Zealand mountainous conditions.
          </div>
          <div class="text-sm text-red-600">
            Current terrain hours: {{ progress.flightHours.terrainAwareness }}h / 5h required
          </div>
        </div>
      </div>

      <!-- Back to Dashboard -->
      <div class="text-center">
        <router-link to="/dashboard" class="btn btn-primary">
          ← Back to Dashboard
        </router-link>
      </div>
    </div>

    <!-- Medical Certificate Information Modal -->
    <div v-if="showMedicalInfo" class="modal-overlay" @click="showMedicalInfo = false">
      <div class="modal-content" @click.stop data-testid="requirement-explanation">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Medical Certificate Options</h3>
          
          <div class="space-y-4" data-testid="medical-options">
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-blue-600 mb-2">Class 2 Medical Certificate</h4>
              <p class="text-gray-700 mb-2">
                Full aviation medical examination by CAA-approved doctor. Required before solo flight.
              </p>
              <div class="text-sm text-orange-600" data-testid="class-2-cost">
                Cost: $420-$1070 depending on location and tests required
              </div>
            </div>
            
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-green-600 mb-2">DL9 Driver License Medical</h4>
              <p class="text-gray-700 mb-2">
                Use your existing NZ driver license medical if valid. Simpler and more cost-effective option.
              </p>
              <div class="text-sm text-green-600" data-testid="dl9-cost">
                Save $300-$800 compared to Class 2 medical
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showMedicalInfo = false" class="btn btn-primary flex-1">
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Medical Certificate Form Modal -->
    <div v-if="showMedicalForm" class="modal-overlay" @click="showMedicalForm = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Add Medical Certificate</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Certificate Type</label>
              <select v-model="medicalForm.type" class="form-input">
                <option value="class2">Class 2 Medical Certificate</option>
                <option value="dl9" data-testid="select-dl9-option">DL9 Driver License Medical</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Issue Date</label>
              <input 
                v-model="medicalForm.issueDate" 
                type="date" 
                class="form-input"
                data-testid="medical-issue-date"
              >
            </div>
            
            <div>
              <label class="form-label">Expiry Date</label>
              <input 
                v-model="medicalForm.expiryDate" 
                type="date" 
                class="form-input"
                data-testid="medical-expiry-date"
              >
            </div>
            
            <div>
              <label class="form-label">Cost (optional)</label>
              <input 
                v-model="medicalForm.cost" 
                type="number" 
                class="form-input"
                placeholder="420"
              >
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="saveMedicalCert" class="btn btn-primary flex-1" data-testid="save-medical-cert">
              Save Medical Certificate
            </button>
            <button @click="showMedicalForm = false" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FPP Information Modal -->
    <div v-if="showFppInfo" class="modal-overlay" @click="showFppInfo = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Fit and Proper Person Assessment</h3>
          
          <div class="space-y-4" data-testid="fpp-explanation">
            <p class="text-gray-700">
              The FPP assessment involves disclosure of criminal history, alcohol/drug use, and general character 
              to determine if you're suitable to hold a pilot license.
            </p>
            
            <div class="bg-blue-50 p-4 rounded-lg" data-testid="fpp-legal-basis">
              <div class="font-semibold text-blue-800 mb-2">Legal Requirement</div>
              <div class="text-blue-700">
                Required under Section 80 of the Civil Aviation Act 2023
              </div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg" data-testid="fpp-validity">
              <div class="font-semibold text-yellow-800 mb-2">Important Notes</div>
              <div class="text-yellow-700">
                • Declaration must be truthful and complete<br>
                • Updates required if circumstances change<br>
                • Valid for 1 year from submission
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showFppInfo = false" class="btn btn-primary flex-1">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FPP Form Modal -->
    <div v-if="showFppForm" class="modal-overlay" @click="showFppForm = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Complete FPP Assessment</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Declaration Type</label>
              <select v-model="fppForm.declarationType" class="form-input">
                <option value="24FPP">24FPP - Standard Declaration</option>
                <option value="24FPPDEC">24FPPDEC - Detailed Declaration</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Submission Date</label>
              <input 
                v-model="fppForm.submissionDate" 
                type="date" 
                class="form-input"
              >
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-sm text-blue-700">
                This will be valid for 1 year from submission date. You'll need to update if circumstances change.
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="saveFppAssessment" class="btn btn-primary flex-1">
              Save FPP Assessment
            </button>
            <button @click="showFppForm = false" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// State
const progress = ref({
  medicalCertificate: null as any,
  fppAssessment: null as any,
  flightHours: {
    night: 0,
    terrainAwareness: 0
  },
  theoryExams: {
    airLaw: { attempts: [], passed: false },
    navigation: { attempts: [], passed: false },
    technicalKnowledge: { attempts: [], passed: false },
    humanFactors: { attempts: [], passed: false },
    meteorology: { attempts: [], passed: false },
    radioTelephony: { attempts: [], passed: false }
  }
})

// Modal states
const showMedicalInfo = ref(false)
const showMedicalForm = ref(false)
const showFppInfo = ref(false)
const showFppForm = ref(false)

// Form data
const medicalForm = ref({
  type: 'class2',
  issueDate: '',
  expiryDate: '',
  cost: ''
})

const fppForm = ref({
  declarationType: '24FPP',
  submissionDate: new Date().toISOString().split('T')[0]
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NZ', { 
    year: 'numeric', 
    month: 'short' 
  })
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
    airLaw: 'Aviation regulations and legal requirements',
    navigation: 'Flight planning and navigation techniques',
    technicalKnowledge: 'Aircraft systems and performance',
    humanFactors: 'Human performance and limitations',
    meteorology: 'Weather theory and interpretation',
    radioTelephony: 'Radio procedures and phraseology'
  }
  return descriptions[subject] || ''
}

const scheduleExam = (subject: string) => {
  // Navigate to theory exam scheduling - placeholder
  alert(`Scheduling ${getExamName(subject)} exam - feature coming soon!`)
}

const saveMedicalCert = () => {
  const expiryDate = new Date(medicalForm.value.expiryDate)
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
  
  progress.value.medicalCertificate = {
    id: 'med-' + Date.now(),
    type: medicalForm.value.type,
    issueDate: medicalForm.value.issueDate,
    expiryDate: medicalForm.value.expiryDate,
    cost: parseFloat(medicalForm.value.cost) || 0,
    isActive: expiryDate > new Date()
  }
  
  saveProgress()
  showMedicalForm.value = false
  
  // Reset form
  medicalForm.value = {
    type: 'class2',
    issueDate: '',
    expiryDate: '',
    cost: ''
  }
}

const saveFppAssessment = () => {
  const submissionDate = new Date(fppForm.value.submissionDate)
  const expiryDate = new Date(submissionDate)
  expiryDate.setFullYear(expiryDate.getFullYear() + 1)
  
  progress.value.fppAssessment = {
    id: 'fpp-' + Date.now(),
    submissionDate: fppForm.value.submissionDate,
    expiryDate: expiryDate.toISOString().split('T')[0],
    status: 'approved',
    hasChanges: false,
    declarationUsed: fppForm.value.declarationType
  }
  
  saveProgress()
  showFppForm.value = false
}

const saveProgress = () => {
  localStorage.setItem('ppl-quest-progress', JSON.stringify(progress.value))
}

const loadProgress = () => {
  const saved = localStorage.getItem('ppl-quest-progress')
  if (saved) {
    try {
      progress.value = { ...progress.value, ...JSON.parse(saved) }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }
}

onMounted(() => {
  loadProgress()
})
</script>