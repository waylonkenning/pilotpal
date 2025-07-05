<template>
  <div class="app-layout" data-testid="theory-exams-view">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">📚 Theory Examinations</h1>
            <p class="text-sm opacity-60">
              Track your progress through all 6 required theory subjects
            </p>
          </div>
          <button 
            @click="showTheoryEducation = true"
            class="btn btn-secondary btn-sm"
            data-testid="theory-exam-help-button">
            ❓ Help
          </button>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">

        <!-- Overall Progress -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📊</div>
            <div>
              <h2 class="font-bold">Theory Exam Progress</h2>
              <p class="text-sm opacity-80">70% minimum to pass each subject</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-md">
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ passedExams }}</div>
              <div class="text-sm opacity-80 mb-sm">Passed</div>
              <div class="progress">
                <div class="progress-bar" :style="{ width: (passedExams / 6) * 100 + '%' }"></div>
              </div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">6</div>
              <div class="text-sm opacity-80 mb-sm">Required</div>
              <div class="badge badge-primary">Total</div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm">{{ Math.round((passedExams / 6) * 100) }}%</div>
              <div class="text-sm opacity-80 mb-sm">Complete</div>
              <div class="badge badge-success">Progress</div>
            </div>
          </div>
        </div>

        <!-- Exam Requirements Info -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📋</div>
            <h2 class="font-bold">Exam Information</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div class="card card-compact" data-testid="pass-requirement">
              <div class="font-medium mb-sm">Pass Requirements</div>
              <div class="text-sm opacity-80">70% minimum score required for each subject</div>
            </div>
            <div class="card card-compact" data-testid="cost-info">
              <div class="font-medium mb-sm">Cost Information</div>
              <div class="text-sm opacity-80">$65 per exam attempt</div>
            </div>
            <div class="card card-compact" data-testid="validity-info">
              <div class="font-medium mb-sm">Validity Period</div>
              <div class="text-sm opacity-80">2 years from pass date</div>
            </div>
          </div>
        </div>

        <!-- Theory Subjects -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
          <!-- Air Law -->
          <div class="card card-elevated" data-testid="air-law-exam">
            <div class="flex items-center gap-md mb-md">
              <div class="text-xl">📜</div>
              <div>
                <h3 class="font-bold">Air Law</h3>
                <p class="text-sm opacity-80">Aviation regulations and airspace</p>
              </div>
              <div v-if="progress.theoryExams.airLaw.passed" class="text-green-400">✅</div>
            </div>
            
            <div class="space-y-2 mb-md">
              <div class="text-sm opacity-80">• CAA Part 91 General Operating Rules</div>
              <div class="text-sm opacity-80">• Airspace classifications and requirements</div>
              <div class="text-sm opacity-80">• Aircraft documents and markings</div>
              <div class="text-sm opacity-80">• Pilot privileges and limitations</div>
            </div>

            <div v-if="progress.theoryExams.airLaw.attempts.length > 0" class="card card-compact mb-md">
              <div class="font-medium mb-sm">Exam History</div>
              <div class="space-y-1">
                <div v-for="(attempt, index) in progress.theoryExams.airLaw.attempts" :key="index" 
                     class="flex justify-between items-center text-sm">
                  <span>Attempt {{ index + 1 }}</span>
                  <span class="badge" :class="attempt.score >= 70 ? 'badge-success' : 'badge-error'">
                    {{ attempt.score }}%
                  </span>
                </div>
              </div>
            </div>

            <button 
              v-if="!progress.theoryExams.airLaw.passed"
              @click="scheduleExam('airLaw')"
              class="btn btn-primary w-full">
              📅 Schedule Air Law Exam
            </button>
            <div v-else class="badge badge-success w-full text-center">
              Passed ✓
            </div>
          </div>

          <!-- Navigation -->
          <div class="card card-elevated" data-testid="navigation-exam">
            <div class="flex items-center gap-md mb-md">
              <div class="text-xl">🧭</div>
              <div>
                <h3 class="font-bold">Navigation</h3>
                <p class="text-sm opacity-80">Chart reading and flight planning</p>
              </div>
              <div v-if="progress.theoryExams.navigation.passed" class="text-green-400">✅</div>
            </div>
            
            <div class="space-y-2 mb-md">
              <div class="text-sm opacity-80">• Map reading and chart symbols</div>
              <div class="text-sm opacity-80">• Dead reckoning and pilotage</div>
              <div class="text-sm opacity-80">• GPS and electronic navigation</div>
              <div class="text-sm opacity-80">• Flight planning and fuel calculations</div>
            </div>

            <div v-if="progress.theoryExams.navigation.attempts.length > 0" class="card card-compact mb-md">
              <div class="font-medium mb-sm">Exam History</div>
              <div class="space-y-1">
                <div v-for="(attempt, index) in progress.theoryExams.navigation.attempts" :key="index" 
                     class="flex justify-between items-center text-sm">
                  <span>Attempt {{ index + 1 }}</span>
                  <span class="badge" :class="attempt.score >= 70 ? 'badge-success' : 'badge-error'">
                    {{ attempt.score }}%
                  </span>
                </div>
              </div>
            </div>

            <button 
              v-if="!progress.theoryExams.navigation.passed"
              @click="scheduleExam('navigation')"
              class="btn btn-primary w-full">
              📅 Schedule Navigation Exam
            </button>
            <div v-else class="badge badge-success w-full text-center">
              Passed ✓
            </div>
          </div>

          <!-- Technical Knowledge -->
          <div class="card card-elevated" data-testid="technical-knowledge-exam">
            <div class="flex items-center gap-md mb-md">
              <div class="text-xl">🔧</div>
              <div>
                <h3 class="font-bold">Technical Knowledge</h3>
                <p class="text-sm opacity-80">Aircraft systems and performance</p>
              </div>
              <div v-if="progress.theoryExams.technicalKnowledge.passed" class="text-green-400">✅</div>
            </div>
            
            <div class="space-y-2 mb-md">
              <div class="text-sm opacity-80">• Aircraft systems and components</div>
              <div class="text-sm opacity-80">• Engine operation and maintenance</div>
              <div class="text-sm opacity-80">• Weight and balance calculations</div>
              <div class="text-sm opacity-80">• Performance charts and limitations</div>
            </div>

            <div v-if="progress.theoryExams.technicalKnowledge.attempts.length > 0" class="card card-compact mb-md">
              <div class="font-medium mb-sm">Exam History</div>
              <div class="space-y-1">
                <div v-for="(attempt, index) in progress.theoryExams.technicalKnowledge.attempts" :key="index" 
                     class="flex justify-between items-center text-sm">
                  <span>Attempt {{ index + 1 }}</span>
                  <span class="badge" :class="attempt.score >= 70 ? 'badge-success' : 'badge-error'">
                    {{ attempt.score }}%
                  </span>
                </div>
              </div>
            </div>

            <button 
              v-if="!progress.theoryExams.technicalKnowledge.passed"
              @click="scheduleExam('technicalKnowledge')"
              class="btn btn-primary w-full">
              📅 Schedule Technical Exam
            </button>
            <div v-else class="badge badge-success w-full text-center">
              Passed ✓
            </div>
          </div>

          <!-- Human Factors -->
          <div class="card card-elevated" data-testid="human-factors-exam">
            <div class="flex items-center gap-md mb-md">
              <div class="text-xl">🧠</div>
              <div>
                <h3 class="font-bold">Human Factors</h3>
                <p class="text-sm opacity-80">Aviation psychology and safety</p>
              </div>
              <div v-if="progress.theoryExams.humanFactors.passed" class="text-green-400">✅</div>
            </div>
            
            <div class="space-y-2 mb-md">
              <div class="text-sm opacity-80">• Threat and error management</div>
              <div class="text-sm opacity-80">• Situational awareness</div>
              <div class="text-sm opacity-80">• Fatigue and stress management</div>
              <div class="text-sm opacity-80">• Risk assessment and decision making</div>
            </div>

            <div v-if="progress.theoryExams.humanFactors.attempts.length > 0" class="card card-compact mb-md">
              <div class="font-medium mb-sm">Exam History</div>
              <div class="space-y-1">
                <div v-for="(attempt, index) in progress.theoryExams.humanFactors.attempts" :key="index" 
                     class="flex justify-between items-center text-sm">
                  <span>Attempt {{ index + 1 }}</span>
                  <span class="badge" :class="attempt.score >= 70 ? 'badge-success' : 'badge-error'">
                    {{ attempt.score }}%
                  </span>
                </div>
              </div>
            </div>

            <button 
              v-if="!progress.theoryExams.humanFactors.passed"
              @click="scheduleExam('humanFactors')"
              class="btn btn-primary w-full">
              📅 Schedule Human Factors Exam
            </button>
            <div v-else class="badge badge-success w-full text-center">
              Passed ✓
            </div>
          </div>

          <!-- Meteorology -->
          <div class="card card-elevated" data-testid="meteorology-exam">
            <div class="flex items-center gap-md mb-md">
              <div class="text-xl">🌤️</div>
              <div>
                <h3 class="font-bold">Meteorology</h3>
                <p class="text-sm opacity-80">Weather theory and interpretation</p>
              </div>
              <div v-if="progress.theoryExams.meteorology.passed" class="text-green-400">✅</div>
            </div>
            
            <div class="space-y-2 mb-md">
              <div class="text-sm opacity-80">• Weather systems and patterns</div>
              <div class="text-sm opacity-80">• Cloud types and formation</div>
              <div class="text-sm opacity-80">• Weather reports and forecasts</div>
              <div class="text-sm opacity-80">• Hazardous weather conditions</div>
            </div>

            <div v-if="progress.theoryExams.meteorology.attempts.length > 0" class="card card-compact mb-md">
              <div class="font-medium mb-sm">Exam History</div>
              <div class="space-y-1">
                <div v-for="(attempt, index) in progress.theoryExams.meteorology.attempts" :key="index" 
                     class="flex justify-between items-center text-sm">
                  <span>Attempt {{ index + 1 }}</span>
                  <span class="badge" :class="attempt.score >= 70 ? 'badge-success' : 'badge-error'">
                    {{ attempt.score }}%
                  </span>
                </div>
              </div>
            </div>

            <button 
              v-if="!progress.theoryExams.meteorology.passed"
              @click="scheduleExam('meteorology')"
              class="btn btn-primary w-full">
              📅 Schedule Meteorology Exam
            </button>
            <div v-else class="badge badge-success w-full text-center">
              Passed ✓
            </div>
          </div>

          <!-- Radio Telephony -->
          <div class="card card-elevated" data-testid="radio-telephony-exam">
            <div class="flex items-center gap-md mb-md">
              <div class="text-xl">📻</div>
              <div>
                <h3 class="font-bold">Radio Telephony</h3>
                <p class="text-sm opacity-80">Communication procedures</p>
              </div>
              <div v-if="progress.theoryExams.radioTelephony.passed" class="text-green-400">✅</div>
            </div>
            
            <div class="space-y-2 mb-md">
              <div class="text-sm opacity-80">• Standard radio procedures</div>
              <div class="text-sm opacity-80">• Controlled and uncontrolled airspace comms</div>
              <div class="text-sm opacity-80">• Emergency communication procedures</div>
              <div class="text-sm opacity-80">• Phonetic alphabet and numbers</div>
            </div>

            <div v-if="progress.theoryExams.radioTelephony.attempts.length > 0" class="card card-compact mb-md">
              <div class="font-medium mb-sm">Exam History</div>
              <div class="space-y-1">
                <div v-for="(attempt, index) in progress.theoryExams.radioTelephony.attempts" :key="index" 
                     class="flex justify-between items-center text-sm">
                  <span>Attempt {{ index + 1 }}</span>
                  <span class="badge" :class="attempt.score >= 70 ? 'badge-success' : 'badge-error'">
                    {{ attempt.score }}%
                  </span>
                </div>
              </div>
            </div>

            <button 
              v-if="!progress.theoryExams.radioTelephony.passed"
              @click="scheduleExam('radioTelephony')"
              class="btn btn-primary w-full">
              📅 Schedule Radio Telephony Exam
            </button>
            <div v-else class="badge badge-success w-full text-center">
              Passed ✓
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

    <!-- Theory Education Modal -->
    <div v-if="showTheoryEducation" class="modal-overlay" @click="showTheoryEducation = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">📚 Theory Exam Help</h3>
          <button @click="showTheoryEducation = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">Exam Format</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
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

        <div class="flex gap-md">
          <button @click="showTheoryEducation = false" class="btn btn-primary flex-1">
            Got it!
          </button>
          <router-link to="/education" class="btn btn-secondary flex-1">
            Study Resources
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// State
const progress = ref({
  theoryExams: {
    airLaw: { attempts: [] as Array<{score: number, date: string}>, passed: false },
    navigation: { attempts: [] as Array<{score: number, date: string}>, passed: false },
    technicalKnowledge: { attempts: [] as Array<{score: number, date: string}>, passed: false },
    humanFactors: { attempts: [] as Array<{score: number, date: string}>, passed: false },
    meteorology: { attempts: [] as Array<{score: number, date: string}>, passed: false },
    radioTelephony: { attempts: [] as Array<{score: number, date: string}>, passed: false }
  }
})

// Modal state
const showTheoryEducation = ref(false)

// Computed properties
const passedExams = computed(() => {
  return Object.values(progress.value.theoryExams).filter(exam => exam.passed).length
})

// Methods
const scheduleExam = (subject: string) => {
  // Placeholder for exam scheduling
  alert(`Scheduling ${subject} exam...`)
}

const loadProgress = () => {
  const saved = localStorage.getItem('ppl-quest-progress')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed.theoryExams) {
        progress.value.theoryExams = { ...progress.value.theoryExams, ...parsed.theoryExams }
      }
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
</style>