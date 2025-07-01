<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="text-center flex-1">
          <h1 class="text-3xl font-bold mb-4">📚 Theory Examinations</h1>
          <p class="text-lg text-gray-600">
            Track your progress through all 6 required theory subjects
          </p>
        </div>
        <button 
          @click="showTheoryEducation = true"
          class="btn btn-secondary text-sm"
          data-testid="theory-exam-help-button"
        >
          ❓ Help
        </button>
      </div>
        
        <!-- Overall Progress -->
        <div class="card max-w-lg mx-auto mb-8">
          <div class="grid grid-cols-3 text-center">
            <div>
              <div class="text-2xl font-bold text-green-600">
                {{ passedExams }}
              </div>
              <div class="text-sm text-gray-600">Passed</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-600">
                6
              </div>
              <div class="text-sm text-gray-600">Required</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-orange-600">
                {{ Math.round((passedExams / 6) * 100) }}%
              </div>
              <div class="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Exam Requirements -->
      <div class="card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-blue-600">📊 Exam Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg" data-testid="pass-requirement">
            <div class="font-semibold text-blue-800 mb-2">Pass Mark</div>
            <div class="text-blue-700">70% minimum to pass each subject</div>
          </div>
          
          <div class="bg-green-50 p-4 rounded-lg">
            <div class="font-semibold text-green-800 mb-2">Exam Format</div>
            <div class="text-green-700">Multiple choice questions, computer-based</div>
          </div>
          
          <div class="bg-orange-50 p-4 rounded-lg">
            <div class="font-semibold text-orange-800 mb-2">Validity</div>
            <div class="text-orange-700">Theory passes are valid for license application</div>
          </div>
          
          <div class="bg-purple-50 p-4 rounded-lg">
            <div class="font-semibold text-purple-800 mb-2">Cost</div>
            <div class="text-purple-700">Approximately $65 per exam</div>
          </div>
          
          <div class="bg-red-50 p-4 rounded-lg" data-testid="retest-policy">
            <div class="font-semibold text-red-800 mb-2">Retest Policy</div>
            <div class="text-red-700">Up to 3 attempts within 3 months between first and last attempt</div>
          </div>
        </div>
      </div>

      <!-- Theory Subjects -->
      <div class="space-y-6">
        <div 
          v-for="(exam, subject) in progress.theoryExams" 
          :key="subject"
          class="card"
          :data-testid="subject.replace(/([A-Z])/g, '-$1').toLowerCase() + '-exam'"
        >
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold">{{ getExamName(subject) }}</h3>
              <div class="text-sm text-gray-600">{{ getExamDescription(subject) }}</div>
            </div>
            <div class="text-right">
              <div v-if="exam.passed" class="text-2xl text-green-600">✅</div>
              <div v-else class="text-2xl text-gray-400">⏳</div>
              <div class="text-xs text-gray-500 mt-1">
                {{ exam.attempts.length }} attempt{{ exam.attempts.length !== 1 ? 's' : '' }}
              </div>
            </div>
          </div>

          <!-- Exam Status -->
          <div v-if="exam.passed" class="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
            <div class="font-semibold text-green-800 mb-1">✅ Passed</div>
            <div class="text-green-700 text-sm">
              Last attempt: {{ exam.attempts.length > 0 ? formatScore(exam.attempts[exam.attempts.length - 1]) : 'N/A' }}
            </div>
          </div>

          <div v-else-if="exam.attempts.length > 0" class="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
            <div class="font-semibold text-orange-800 mb-1">📋 Previous Attempts</div>
            <div class="space-y-1">
              <div v-for="(attempt, index) in exam.attempts" :key="index" class="text-orange-700 text-sm">
                Attempt {{ index + 1 }}: {{ formatScore(attempt) }}
              </div>
            </div>
          </div>

          <div v-else class="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
            <div class="font-semibold text-blue-800 mb-1">📚 Ready to Study</div>
            <div class="text-blue-700 text-sm">No attempts yet - schedule your first exam</div>
          </div>

          <!-- Study Materials -->
          <div class="mb-4">
            <h4 class="font-semibold mb-2">📖 Study Resources</h4>
            <div class="text-sm text-gray-600 space-y-1">
              <div>• {{ getStudyMaterials(subject) }}</div>
              <div>• Practice tests and question banks</div>
              <div>• CAA advisory circulars and publications</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button 
              v-if="!exam.passed"
              @click="scheduleExam(subject)"
              class="btn btn-primary flex-1"
            >
              📅 Schedule Exam
            </button>
            
            <button 
              @click="recordAttempt(subject)"
              class="btn btn-secondary flex-1"
            >
              📝 Record Attempt
            </button>
            
            <button 
              @click="viewDetails(subject)"
              class="btn btn-secondary"
            >
              ℹ️ Details
            </button>
          </div>
        </div>
      </div>

      <!-- Back to Dashboard -->
      <div class="text-center mt-8">
        <router-link to="/dashboard" class="btn btn-primary">
          ← Back to Dashboard
        </router-link>
      </div>
    </div>

    <!-- Record Attempt Modal -->
    <div v-if="showAttemptForm" class="modal-overlay" @click="showAttemptForm = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Record Exam Attempt - {{ getExamName(selectedSubject) }}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Exam Date</label>
              <input 
                v-model="attemptForm.examDate" 
                type="date" 
                class="form-input"
              >
            </div>
            
            <div>
              <label class="form-label">Score (%)</label>
              <input 
                v-model="attemptForm.score" 
                type="number" 
                min="0" 
                max="100"
                class="form-input"
                placeholder="75"
              >
            </div>
            
            <div>
              <label class="form-label">Exam Center</label>
              <input 
                v-model="attemptForm.examCenter" 
                type="text" 
                class="form-input"
                placeholder="Auckland"
              >
            </div>
            
            <div>
              <label class="form-label">Cost</label>
              <input 
                v-model="attemptForm.cost" 
                type="number" 
                class="form-input"
                placeholder="65"
              >
            </div>

            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="font-semibold text-blue-800 mb-2">Pass Status</div>
              <div class="text-blue-700">
                {{ parseFloat(attemptForm.score) >= 70 ? '✅ Pass (70%+)' : '❌ Fail (below 70%)' }}
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="saveAttempt" class="btn btn-primary flex-1">
              Save Attempt
            </button>
            <button @click="showAttemptForm = false" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Exam Details Modal -->
    <div v-if="showExamDetails" class="modal-overlay" @click="showExamDetails = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">{{ getExamName(selectedSubject) }} - Exam Details</h3>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-blue-600 mb-2">📚 Subject Coverage</h4>
              <div class="text-gray-700">{{ getDetailedDescription(selectedSubject) }}</div>
            </div>
            
            <div>
              <h4 class="font-semibold text-green-600 mb-2">📝 Exam Format</h4>
              <div class="text-gray-700">{{ getExamFormat(selectedSubject) }}</div>
            </div>
            
            <div>
              <h4 class="font-semibold text-purple-600 mb-2">📖 Recommended Study</h4>
              <div class="text-gray-700">{{ getStudyRecommendations(selectedSubject) }}</div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showExamDetails = false" class="btn btn-primary flex-1">
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Theory Education Modal -->
    <div v-if="showTheoryEducation" class="modal-overlay" @click="showTheoryEducation = false">
      <div class="modal-content max-w-5xl" @click.stop data-testid="theory-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">📚 Theory Exam Requirements</h3>
          
          <!-- Exam Format Info -->
          <div class="bg-blue-50 p-4 rounded-lg mb-6" data-testid="exam-format-info">
            <h4 class="font-semibold text-blue-800 mb-2">📋 Exam Format</h4>
            <div class="text-blue-700 text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <strong>Format:</strong> Multiple choice
                <br><strong>Duration:</strong> 90 minutes each
              </div>
              <div>
                <strong>Pass Mark:</strong> 70% minimum
                <br><strong>Cost:</strong> $65 per exam
              </div>
              <div>
                <strong>Attempts:</strong> Unlimited
                <br><strong>Validity:</strong> 2 years
              </div>
            </div>
          </div>

          <!-- 6 Exam Subjects -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="border rounded-lg p-4" data-testid="air-law-explanation">
              <h4 class="font-semibold text-purple-600 mb-2">📜 Air Law</h4>
              <p class="text-sm text-gray-600">Aviation regulations, airspace, and legal requirements</p>
            </div>

            <div class="border rounded-lg p-4" data-testid="navigation-explanation">
              <h4 class="font-semibold text-blue-600 mb-2">🧭 Navigation</h4>
              <p class="text-sm text-gray-600">Chart reading, flight planning, and navigation techniques</p>
            </div>

            <div class="border rounded-lg p-4" data-testid="technical-knowledge-explanation">
              <h4 class="font-semibold text-green-600 mb-2">🔧 Technical Knowledge</h4>
              <p class="text-sm text-gray-600">Aircraft systems, engines, and performance</p>
            </div>

            <div class="border rounded-lg p-4" data-testid="human-factors-explanation">
              <h4 class="font-semibold text-orange-600 mb-2">🧠 Human Factors</h4>
              <p class="text-sm text-gray-600">Aviation psychology, decision making, and safety</p>
            </div>

            <div class="border rounded-lg p-4" data-testid="meteorology-explanation">
              <h4 class="font-semibold text-indigo-600 mb-2">🌤️ Meteorology</h4>
              <p class="text-sm text-gray-600">Weather theory, forecasting, and interpretation</p>
            </div>

            <div class="border rounded-lg p-4" data-testid="radio-telephony-explanation">
              <h4 class="font-semibold text-red-600 mb-2">📻 Radio Telephony</h4>
              <p class="text-sm text-gray-600">Communication procedures and phraseology</p>
            </div>
          </div>

          <!-- Study Resources -->
          <div class="bg-green-50 p-4 rounded-lg mb-6" data-testid="theory-study-resources">
            <h4 class="font-semibold text-green-800 mb-3">📖 Study Resources</h4>
            <div class="text-green-700 text-sm">
              <p>Official CAA resources, online practice exams, and aviation textbooks are recommended for preparation.</p>
            </div>
          </div>

          <!-- Booking Information -->
          <div class="bg-yellow-50 p-4 rounded-lg mb-6" data-testid="exam-booking-info">
            <h4 class="font-semibold text-yellow-800 mb-2">📅 Booking Your Exams</h4>
            <div class="text-yellow-700 text-sm">
              <p>Theory exams are conducted at approved testing centres. Contact your local testing centre to schedule exams.</p>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showTheoryEducation = false" class="btn btn-primary flex-1">
              Start Studying!
            </button>
            <router-link to="/education" class="btn btn-secondary">
              Education Center
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface TheoryAttempt {
  id: string
  subject: string
  attemptNumber: number
  examDate: string
  score: number
  passed: boolean
  examCenter: string
  cost: number
  expiryDate: string
}

// State
const progress = ref({
  theoryExams: {
    airLaw: { attempts: [] as TheoryAttempt[], passed: false },
    navigation: { attempts: [] as TheoryAttempt[], passed: false },
    technicalKnowledge: { attempts: [] as TheoryAttempt[], passed: false },
    humanFactors: { attempts: [] as TheoryAttempt[], passed: false },
    meteorology: { attempts: [] as TheoryAttempt[], passed: false },
    radioTelephony: { attempts: [] as TheoryAttempt[], passed: false }
  }
})

// Modal states
const showAttemptForm = ref(false)
const showExamDetails = ref(false)
const showTheoryEducation = ref(false)
const selectedSubject = ref('')

// Form data
const attemptForm = ref({
  examDate: new Date().toISOString().split('T')[0],
  score: '',
  examCenter: '',
  cost: '65'
})

// Computed
const passedExams = computed(() => {
  return Object.values(progress.value.theoryExams).filter(exam => exam.passed).length
})

// Methods
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
    airLaw: 'Aviation regulations, legal requirements, and CAA rules',
    navigation: 'Flight planning, charts, and navigation techniques',
    technicalKnowledge: 'Aircraft systems, performance, and maintenance',
    humanFactors: 'Human performance, limitations, and decision making',
    meteorology: 'Weather theory, interpretation, and flight safety',
    radioTelephony: 'Radio procedures, phraseology, and communication'
  }
  return descriptions[subject] || ''
}

const getStudyMaterials = (subject: string) => {
  const materials: Record<string, string> = {
    airLaw: 'CAA Rules Part 61, 91, and advisory circulars',
    navigation: 'Navigation textbooks and VNC charts',
    technicalKnowledge: 'Aircraft technical manuals and systems guides',
    humanFactors: 'Human factors in aviation textbooks',
    meteorology: 'Aviation weather theory and MetService resources',
    radioTelephony: 'Radio telephony handbook and phraseology guide'
  }
  return materials[subject] || 'Standard aviation textbooks'
}

const getDetailedDescription = (subject: string) => {
  const descriptions: Record<string, string> = {
    airLaw: 'Covers New Zealand aviation law, CAA rules and regulations, licensing requirements, airspace classification, and legal responsibilities of pilots.',
    navigation: 'Flight planning principles, chart reading, dead reckoning, radio navigation aids, GPS systems, and cross-country flight procedures.',
    technicalKnowledge: 'Aircraft systems including engines, electrical, hydraulic, and control systems. Performance calculations, weight and balance, and aircraft limitations.',
    humanFactors: 'Human performance and limitations, decision making, stress management, situational awareness, and crew resource management principles.',
    meteorology: 'Weather phenomena, cloud formation, pressure systems, visibility, turbulence, icing conditions, and weather interpretation for flight safety.',
    radioTelephony: 'Standard radio procedures, phraseology, emergency communications, airspace communications, and interaction with air traffic control.'
  }
  return descriptions[subject] || ''
}

const getExamFormat = (subject: string) => {
  const formats: Record<string, string> = {
    airLaw: '40 multiple choice questions, 75 minutes, computer-based exam',
    navigation: '40 multiple choice questions, 75 minutes, computer-based exam',
    technicalKnowledge: '40 multiple choice questions, 75 minutes, computer-based exam',
    humanFactors: '40 multiple choice questions, 75 minutes, computer-based exam',
    meteorology: '40 multiple choice questions, 75 minutes, computer-based exam',
    radioTelephony: '40 multiple choice questions, 75 minutes, computer-based exam'
  }
  return formats[subject] || '40 multiple choice questions, 75 minutes'
}

const getStudyRecommendations = (subject: string) => {
  const recommendations: Record<string, string> = {
    airLaw: '2-3 weeks of study. Focus on CAA rules, recent changes, and practical application scenarios.',
    navigation: '3-4 weeks of study. Practice chart reading, flight planning calculations, and navigation exercises.',
    technicalKnowledge: '4-5 weeks of study. Understand aircraft systems thoroughly and practice performance calculations.',
    humanFactors: '2-3 weeks of study. Focus on decision-making scenarios and human performance limitations.',
    meteorology: '3-4 weeks of study. Learn weather patterns, interpretation skills, and safety considerations.',
    radioTelephony: '1-2 weeks of study. Practice standard phraseology and emergency procedures.'
  }
  return recommendations[subject] || '2-3 weeks of dedicated study recommended'
}

const formatScore = (attempt: any) => {
  return `${attempt.score}% (${attempt.passed ? 'Pass' : 'Fail'})`
}

const scheduleExam = (subject: string) => {
  alert(`Scheduling ${getExamName(subject)} exam - feature coming soon!`)
}

const recordAttempt = (subject: string) => {
  selectedSubject.value = subject
  showAttemptForm.value = true
}

const viewDetails = (subject: string) => {
  selectedSubject.value = subject
  showExamDetails.value = true
}

const saveAttempt = () => {
  const score = parseFloat(attemptForm.value.score)
  const passed = score >= 70
  
  const attempt = {
    id: 'attempt-' + Date.now(),
    subject: selectedSubject.value,
    attemptNumber: progress.value.theoryExams[selectedSubject.value as keyof typeof progress.value.theoryExams].attempts.length + 1,
    examDate: attemptForm.value.examDate,
    score: score,
    passed: passed,
    examCenter: attemptForm.value.examCenter,
    cost: parseFloat(attemptForm.value.cost) || 0,
    expiryDate: '' // Calculate based on regulations
  }

  progress.value.theoryExams[selectedSubject.value as keyof typeof progress.value.theoryExams].attempts.push(attempt)
  
  if (passed) {
    progress.value.theoryExams[selectedSubject.value as keyof typeof progress.value.theoryExams].passed = true
  }
  
  saveProgress()
  showAttemptForm.value = false
  
  // Reset form
  attemptForm.value = {
    examDate: new Date().toISOString().split('T')[0],
    score: '',
    examCenter: '',
    cost: '65'
  }
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