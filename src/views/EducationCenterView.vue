<template>
  <div class="app-layout" data-testid="education-center">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">📚 Education Center</h1>
            <p class="text-sm opacity-60">
              Learn about New Zealand PPL requirements and aviation regulations
            </p>
          </div>
          <div class="status-dot"></div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">

        <!-- PPL Pathway Overview -->
        <div class="card card-elevated mb-xl" data-testid="ppl-pathway-overview">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">🎯</div>
            <div>
              <h2 class="font-bold">Complete PPL Pathway</h2>
              <p class="text-sm opacity-80">Your journey to becoming a licensed pilot</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div class="card card-compact">
              <div class="text-2xl mb-sm">📋</div>
              <div class="font-medium mb-sm">Medical Certificate</div>
              <div class="text-sm opacity-80">Class 2 or DL9</div>
            </div>
            <div class="card card-compact">
              <div class="text-2xl mb-sm">✈️</div>
              <div class="font-medium mb-sm">Flight Training</div>
              <div class="text-sm opacity-80">50+ hours</div>
            </div>
            <div class="card card-compact">
              <div class="text-2xl mb-sm">📚</div>
              <div class="font-medium mb-sm">Theory Exams</div>
              <div class="text-sm opacity-80">6 subjects</div>
            </div>
            <div class="card card-compact">
              <div class="text-2xl mb-sm">🎯</div>
              <div class="font-medium mb-sm">Flight Test</div>
              <div class="text-sm opacity-80">FPP Practical</div>
            </div>
          </div>
          
          <!-- CAA Part 61 Explanation -->
          <div class="card-compact mt-lg" style="background: var(--bg-tertiary); border: var(--glass-border);" data-testid="part-61-explanation">
            <div class="flex items-center gap-sm mb-sm">
              <div class="text-lg">📜</div>
              <h3 class="font-medium">CAA Part 61 Requirements</h3>
            </div>
            <p class="text-sm opacity-80">
              New Zealand Private Pilot Licence requirements are governed by CAA Part 61. 
              This comprehensive regulation outlines all training, experience, and examination 
              requirements for obtaining your PPL(A) in New Zealand airspace.
            </p>
          </div>
        </div>

        <!-- Educational Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
          <!-- Medical Certificate Education -->
          <div class="card">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-xl">🏥</div>
              <h3 class="font-medium">Medical Certificate Guide</h3>
            </div>
            <p class="text-sm opacity-80 mb-md">
              Understand the medical requirements for PPL training and choose between Class 2 and DL9 options.
            </p>
            <button 
              @click="showMedicalEducation = true"
              class="btn btn-primary w-full"
              data-testid="medical-education-link">
              Learn About Medical Requirements
            </button>
          </div>

          <!-- Theory Exam Education -->
          <div class="card">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-xl">📖</div>
              <h3 class="font-medium">Theory Exam Guide</h3>
            </div>
            <p class="text-sm opacity-80 mb-md">
              Master all 6 theory exam subjects with detailed explanations and study resources.
            </p>
            <button 
              @click="showTheoryEducation = true"
              class="btn btn-primary w-full"
              data-testid="theory-education-link">
              Study Theory Requirements
            </button>
          </div>

          <!-- Flight Hours Education -->
          <div class="card">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-xl">⏱️</div>
              <h3 class="font-medium">Flight Hours Guide</h3>
            </div>
            <p class="text-sm opacity-80 mb-md">
              Understand NZ-specific hour requirements including terrain awareness and controlled airspace.
            </p>
            <button 
              @click="showHoursEducation = true"
              class="btn btn-primary w-full"
              data-testid="hours-education-link">
              Learn About Hour Requirements
            </button>
          </div>

          <!-- Flight Test Education -->
          <div class="card">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-xl">🎯</div>
              <h3 class="font-medium">Flight Test Guide</h3>
            </div>
            <p class="text-sm opacity-80 mb-md">
              Prepare for your Flight Proficiency Program (FPP) with comprehensive guidance.
            </p>
            <button 
              @click="showFPPEducation = true"
              class="btn btn-primary w-full"
              data-testid="fpp-education-link">
              Prepare for Flight Test
            </button>
          </div>
        </div>

        <!-- Timeline and Cost Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
          <!-- Typical Timeline -->
          <div class="card" data-testid="typical-timeline-info">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-xl">⏳</div>
              <h3 class="font-medium">Typical Training Timeline</h3>
            </div>
            <div class="space-y-2 mb-md">
              <div class="flex justify-between items-center">
                <span class="text-sm">Accelerated (3-4 lessons/week):</span>
                <span class="badge badge-success">3-4 months</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">Standard (1-2 lessons/week):</span>
                <span class="badge badge-primary">6-8 months</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">Part-time (1 lesson/week):</span>
                <span class="badge badge-warning">8-12 months</span>
              </div>
            </div>
            <div class="card-compact" style="background: var(--bg-tertiary); border: var(--glass-border);">
              <p class="text-sm opacity-80">
                <strong>Note:</strong> Timeline varies based on weather, aircraft availability, 
                and individual progress. NZ weather can impact training consistency.
              </p>
            </div>
          </div>

          <!-- Cost Breakdown Education -->
          <div class="card" data-testid="cost-breakdown-education">
            <div class="flex items-center gap-sm mb-md">
              <div class="text-xl">💰</div>
              <h3 class="font-medium">Comprehensive Cost Guide</h3>
            </div>
            <div class="space-y-2 mb-md">
              <div class="flex justify-between items-center">
                <span class="text-sm">Flight Training (40-50hrs):</span>
                <span class="text-sm font-medium">$18,000-$25,000</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">Theory Exams (6 subjects):</span>
                <span class="text-sm font-medium">$390</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">Medical Certificate:</span>
                <span class="text-sm font-medium">$420-$1,070</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">Equipment & Materials:</span>
                <span class="text-sm font-medium">$2,000-$4,000</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">Flight Test (FPP):</span>
                <span class="text-sm font-medium">$800-$1,200</span>
              </div>
            </div>
            <div class="card-compact" style="background: var(--gradient-primary); color: var(--text-inverse);">
              <div class="flex justify-between items-center">
                <span class="font-medium">Total Estimated Cost:</span>
                <span class="font-bold text-lg">$25,000-$35,000</span>
              </div>
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

    <!-- Medical Education Modal -->
    <div v-if="showMedicalEducation" class="modal-overlay" @click="showMedicalEducation = false">
      <div class="modal-content" @click.stop data-testid="medical-education-modal">
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">🏥 Medical Certificate Requirements</h3>
          <button @click="showMedicalEducation = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">💰 Cost Comparison</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div>
              <strong>Class 2 Medical:</strong> $420-$1,070
              <br><em class="text-sm opacity-80">One-time comprehensive examination</em>
            </div>
            <div>
              <strong>DL9 Option:</strong> $0-$200
              <br><em class="text-sm opacity-80">Use existing driver license medical</em>
            </div>
          </div>
        </div>

        <div class="flex gap-md">
          <button @click="showMedicalEducation = false" class="btn btn-primary flex-1">
            Got it!
          </button>
          <a href="https://www.caa.govt.nz/safety/aviation-medicine/" target="_blank" class="btn btn-secondary flex-1">
            CAA Medical Info
          </a>
        </div>
      </div>
    </div>

    <!-- Theory Education Modal -->
    <div v-if="showTheoryEducation" class="modal-overlay" @click="showTheoryEducation = false">
      <div class="modal-content" @click.stop data-testid="theory-education-modal">
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">📚 Theory Exam Requirements</h3>
          <button @click="showTheoryEducation = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">📋 Exam Format</h4>
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
            Start Studying!
          </button>
          <router-link to="/theory" class="btn btn-secondary flex-1">
            Track My Progress
          </router-link>
        </div>
      </div>
    </div>

    <!-- Hours Education Modal -->
    <div v-if="showHoursEducation" class="modal-overlay" @click="showHoursEducation = false">
      <div class="modal-content" @click.stop data-testid="hours-education-modal">
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">⏱️ Flight Hours Requirements</h3>
          <button @click="showHoursEducation = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">NZ PPL Hour Requirements</h4>
          <p class="text-sm mb-md">To obtain your PPL(A) in New Zealand, you need <strong>minimum 50 hours</strong> total flight time.</p>
        </div>

        <div class="flex gap-md">
          <button @click="showHoursEducation = false" class="btn btn-primary flex-1">
            Start Logging Hours
          </button>
          <router-link to="/journey" class="btn btn-secondary flex-1">
            Track My Progress
          </router-link>
        </div>
      </div>
    </div>

    <!-- FPP Education Modal -->
    <div v-if="showFPPEducation" class="modal-overlay" @click="showFPPEducation = false">
      <div class="modal-content" @click.stop data-testid="fpp-education-modal">
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">🎯 Flight Proficiency Program (FPP)</h3>
          <button @click="showFPPEducation = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">💰 Cost Information</h4>
          <p class="text-sm">Typical FPP costs range from $800-$1,200 including examiner fees and aircraft rental.</p>
        </div>

        <div class="flex gap-md">
          <button @click="showFPPEducation = false" class="btn btn-primary flex-1">
            Ready to Test!
          </button>
          <router-link to="/requirements" class="btn btn-secondary flex-1">
            Check Requirements
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Modal state
const showMedicalEducation = ref(false)
const showTheoryEducation = ref(false)
const showHoursEducation = ref(false)
const showFPPEducation = ref(false)
</script>

<style scoped>
</style>