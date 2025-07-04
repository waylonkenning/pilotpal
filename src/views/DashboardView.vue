<template>
  <div class="min-h-screen gradient-sky" data-testid="main-dashboard">
    <div class="container">
      <div class="p-6">
        
        <!-- Header with Help and Education -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold">Dashboard</h1>
            <p class="text-gray-600">Track your PPL training progress</p>
          </div>
          <div class="flex gap-3">
            <button 
              @click="showContextualHelp = true"
              class="btn btn-secondary text-sm"
              data-testid="contextual-help-trigger"
            >
              ❓ Help
            </button>
            <button 
              @click="showEducationCenter = true"
              class="btn btn-primary text-sm"
              data-testid="education-center-button"
            >
              📚 Education Center
            </button>
          </div>
        </div>
        
        <!-- Today's Focus - Primary lesson display -->
        <div class="card mb-6" data-testid="todays-focus">
          <div class="text-center mb-4">
            <h1 class="text-2xl font-bold mb-2">Today's Focus</h1>
            <div class="text-sm text-gray-600">Your next step in the PPL journey</div>
          </div>
          
          <div class="bg-blue-50 rounded-lg p-6" data-testid="current-lesson">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-3xl font-bold" data-testid="current-lesson-title">
                  Lesson {{ progress.currentLesson }}
                </h2>
                <div class="text-lg text-gray-600" data-testid="current-lesson-description">
                  {{ currentLessonInfo.name }}
                </div>
              </div>
              <div class="text-6xl">{{ currentLessonInfo.icon }}</div>
            </div>
            
            <p class="text-gray-700 mb-4">{{ currentLessonInfo.description }}</p>
            
            <div class="bg-blue-100 p-4 rounded-lg mb-4" data-testid="preparation-needed">
              <div class="font-semibold text-blue-800 mb-2">📋 What you need to do:</div>
              <div class="text-blue-700">{{ currentLessonInfo.preparation }}</div>
            </div>
            
            <div class="flex gap-3">
              <button 
                @click="showCompleteLesson = true" 
                class="btn btn-primary flex-1"
                data-testid="complete-lesson-button"
              >
                ✅ Complete This Lesson
              </button>
              <button 
                @click="showLessonInfo = true"
                class="btn btn-secondary" 
                data-testid="lesson-info-button"
              >
                ℹ️ More Info
              </button>
            </div>
          </div>
        </div>

        <!-- Progress Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- Flight Hours -->
          <div class="card">
            <h3 class="text-lg font-semibold mb-2">Flight Hours</h3>
            <div class="text-3xl font-bold text-blue-600 mb-2 cursor-pointer" 
                 data-testid="total-hours"
                 @mouseenter="showProgressTooltip($event)"
                 @mouseleave="hideProgressTooltip">
              {{ progress.flightHours.total.toFixed(1) }}
            </div>
            <div class="text-sm text-gray-600">
              <div data-testid="dual-hours">Dual: {{ progress.flightHours.dual.toFixed(1) }}h</div>
              <div>Solo: {{ progress.flightHours.solo.toFixed(1) }}h</div>
              <div>Cross Country: {{ progress.flightHours.crossCountry.toFixed(1) }}h</div>
            </div>
          </div>
          
          <!-- Lesson Progress -->
          <div class="card">
            <h3 class="text-lg font-semibold mb-2">Lesson Progress</h3>
            <div class="text-xl font-bold mb-2" data-testid="lesson-progress">
              {{ progress.completedLessons.length }} of 27
            </div>
            <div class="text-sm text-gray-600 mb-3">lessons completed</div>
            <div class="w-full bg-gray-200 rounded-full h-3" data-testid="progress-bar">
              <div 
                class="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                :style="{ width: lessonProgress + '%' }"
                data-testid="progress-bar-fill"
              ></div>
            </div>
          </div>
          
          <!-- Achievements -->
          <div class="card">
            <h3 class="text-lg font-semibold mb-2">Achievements</h3>
            <div class="text-3xl font-bold text-green-600 mb-2" data-testid="badges-earned">
              {{ progress.achievements.length }} of 12
            </div>
            <div class="text-sm text-gray-600 mb-3">
              {{ progress.achievements.length === 0 ? 'Start flying to unlock badges!' : 'Great progress!' }}
            </div>
            
            <!-- Recent badges -->
            <div v-if="progress.achievements.length > 0" class="space-y-2">
              <div v-for="achievement in progress.achievements.slice(-3)" 
                   :key="achievement" 
                   class="flex items-center gap-2 p-2 bg-green-50 rounded unlocked"
                   :data-testid="achievement + '-badge'">
                <div class="text-2xl">{{ getBadgeIcon(achievement) }}</div>
                <div>
                  <div class="font-semibold text-sm">{{ getBadgeName(achievement) }}</div>
                  <div class="text-xs text-gray-600" :data-testid="achievement + '-badge-description'">
                    {{ getBadgeDescription(achievement) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Tracking -->
        <div class="grid grid-cols-1 md:grid-cols-2 mb-6">
          <div class="card">
            <h3 class="text-lg font-semibold mb-4">Training Costs</h3>
            <div class="text-2xl font-bold text-orange-600 mb-2" data-testid="total-spent">
              ${{ progress.totalSpent.toFixed(0) }}
            </div>
            <div class="text-sm text-gray-600 mb-3">total spent</div>
            <div v-if="progress.flightHours.total > 0" class="text-sm text-gray-600" data-testid="cost-per-hour">
              ${{ (progress.totalSpent / progress.flightHours.total).toFixed(0) }}/hour average
            </div>
          </div>
          
          <!-- Next Major Milestone -->
          <div class="card">
            <h3 class="text-lg font-semibold mb-4">Next Major Milestone</h3>
            <div class="text-xl font-bold mb-2" data-testid="next-major-milestone">{{ nextMajorMilestone }}</div>
            <p class="text-gray-600 mb-4">{{ milestoneDescription }}</p>
            <button 
              @click="showMilestoneRequirements = true"
              class="btn btn-success w-full"
              data-testid="view-milestone-requirements"
            >
              🎯 View Requirements
            </button>
          </div>
        </div>

        <!-- Upcoming Requirements -->
        <div class="card mb-6" data-testid="upcoming-requirements">
          <h3 class="text-lg font-semibold mb-4">📋 Upcoming Requirements</h3>
          <div class="space-y-3">
            <div v-for="requirement in upcomingRequirements" :key="requirement.id" 
                 class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <div class="font-semibold">{{ requirement.title }}</div>
                <div class="text-sm text-gray-600">{{ requirement.description }}</div>
              </div>
              <button 
                @click="openRequirementInfoModal(requirement.id)"
                class="btn btn-secondary btn-sm" 
                :data-testid="requirement.id + '-info'"
              >
                Info
              </button>
            </div>
          </div>
        </div>

        <!-- Medical Certificate Warnings -->
        <div v-if="hasMedicalWarnings" class="card mb-6" data-testid="medical-dashboard-warning">
          <h3 class="text-lg font-semibold mb-4">🏥 Medical Certificate Alerts</h3>
          <div class="space-y-3">
            <div v-if="getMedicalExpiryStatus() === 'Expired'" 
                 class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <div class="font-semibold text-red-800">Medical Certificate Expired</div>
                <div class="text-sm text-red-600">Cannot exercise pilot privileges until renewed</div>
              </div>
              <router-link to="/requirements" class="btn btn-primary btn-sm">
                Renew Now
              </router-link>
            </div>
            
            <div v-if="getMedicalExpiryStatus() === 'Expiring Soon'" 
                 class="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <div class="font-semibold text-orange-800">Medical Certificate Expiring Soon</div>
                <div class="text-sm text-orange-600">{{ getMedicalTimeRemaining() }}</div>
              </div>
              <router-link to="/requirements" class="btn btn-secondary btn-sm">
                View Details
              </router-link>
            </div>
          </div>
        </div>

        <!-- BFR Currency Warnings -->
        <div v-if="hasBfrWarnings" class="card mb-6" data-testid="bfr-dashboard-warning">
          <h3 class="text-lg font-semibold mb-4">🛩️ BFR Currency Alerts</h3>
          <div class="space-y-3">
            <div v-if="getBfrStatus() === 'Overdue'" 
                 class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <div class="font-semibold text-red-800">BFR Overdue</div>
                <div class="text-sm text-red-600">Cannot exercise pilot privileges until BFR completed</div>
              </div>
              <router-link to="/requirements" class="btn btn-primary btn-sm">
                Schedule BFR
              </router-link>
            </div>
            
            <div v-if="getBfrStatus() === 'Expiring Soon'" 
                 class="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <div class="font-semibold text-orange-800">BFR Expiring Soon</div>
                <div class="text-sm text-orange-600">{{ getBfrTimeRemaining() }}</div>
              </div>
              <router-link to="/requirements" class="btn btn-secondary btn-sm">
                View Details
              </router-link>
            </div>
          </div>
        </div>


        <!-- Quick Navigation -->
        <div class="grid grid-auto-fit gap-4">
          <router-link to="/journey" class="btn btn-secondary text-center" data-testid="journey-tab">
            🗺️ View Journey
          </router-link>
          <router-link to="/achievements" class="btn btn-secondary" data-testid="achievements-tab">
            🏆 Achievements
          </router-link>
          <router-link to="/theory" class="btn btn-secondary" data-testid="theory-tab">
            📚 Theory Exams
          </router-link>
          <router-link to="/requirements" class="btn btn-secondary" data-testid="requirements-tab">
            📋 Requirements
          </router-link>
          <router-link to="/finances" class="btn btn-secondary" data-testid="finances-tab">
            💰 Finances
          </router-link>
          <router-link to="/profile" class="btn btn-secondary" data-testid="user-profile-tab">
            👤 Profile
          </router-link>
        </div>
      </div>
    </div>

    <!-- Complete Lesson Modal -->
    <div v-if="showCompleteLesson" class="modal-overlay" @click="showCompleteLesson = false; demonstratedSkills = {}">
      <div class="modal-content" @click.stop data-testid="complete-lesson-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Complete {{ currentLessonInfo.name }}</h3>
          
          <div class="space-y-4 mb-6">
            <div>
              <label class="form-label">Flight Hours</label>
              <input 
                v-model="lessonHours" 
                type="number" 
                step="0.1" 
                min="0" 
                max="10"
                class="form-input" 
                placeholder="1.5"
                data-testid="lesson-hours-input"
              >
            </div>
            
            <div>
              <label class="form-label">Cost (optional)</label>
              <input 
                v-model="lessonCost" 
                type="number" 
                step="1" 
                min="0"
                class="form-input" 
                placeholder="180"
                data-testid="lesson-cost-input"
              >
            </div>
            
            <!-- Skill Demonstrations for Current Lesson -->
            <div v-if="getLessonSkills(progress.currentLesson).length > 0" class="bg-blue-50 p-4 rounded-lg" data-testid="skill-demonstrations">
              <h4 class="font-semibold text-blue-800 mb-3">🎯 Skills Demonstrated This Lesson</h4>
              <div class="space-y-2">
                <label 
                  v-for="skill in getLessonSkills(progress.currentLesson)" 
                  :key="skill.id"
                  class="flex items-center gap-3 cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    v-model="demonstratedSkills[skill.id]"
                    class="w-4 h-4 text-blue-600 rounded"
                    :data-testid="`skill-${skill.id}`"
                  >
                  <div>
                    <div class="font-medium text-blue-900">{{ skill.name }}</div>
                    <div class="text-sm text-blue-700">{{ skill.description }}</div>
                  </div>
                </label>
              </div>
            </div>
            
            <div>
              <label class="form-label">Notes (optional)</label>
              <textarea 
                v-model="lessonNotes" 
                class="form-input" 
                rows="3"
                placeholder="How did the lesson go?"
              ></textarea>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button @click="completeLesson" class="btn btn-primary flex-1" data-testid="save-hours-button">
              ✅ Complete Lesson
            </button>
            <button @click="showCompleteLesson = false; demonstratedSkills = {}" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievement Celebration Modal -->
    <div v-if="showAchievementCelebration" class="modal-overlay">
      <div class="modal-content" @click.stop data-testid="lesson-complete-celebration">
        <div class="p-6 text-center">
          <!-- Milestone Celebration Animation -->
          <div class="animate-bounce text-6xl mb-4" data-testid="milestone-celebration-animation">🎉</div>
          
          <!-- Celebration Particles -->
          <div class="absolute inset-0 pointer-events-none z-10" data-testid="celebration-particles">
            <div class="animate-ping absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-100"></div>
            <div class="animate-ping absolute top-8 right-6 w-3 h-3 bg-blue-400 rounded-full opacity-100" style="animation-delay: 0.5s;"></div>
            <div class="animate-ping absolute bottom-12 left-8 w-2 h-2 bg-green-400 rounded-full opacity-100" style="animation-delay: 1s;"></div>
            <div class="animate-ping absolute bottom-6 right-4 w-3 h-3 bg-red-400 rounded-full opacity-100" style="animation-delay: 1.5s;"></div>
          </div>
          
          <h3 class="text-2xl font-bold mb-4">Lesson Complete!</h3>
          
          <div v-if="newAchievements.length > 0" data-testid="badge-celebration">
            <!-- Milestone Badge with Glow -->
            <div class="text-4xl mb-4 animate-pulse" data-testid="milestone-badge-glow" style="filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.8));">🏆</div>
            <div class="font-bold text-green-600 mb-2" data-testid="badge-celebration-title">{{ getBadgeName(newAchievements[0]) }} Achievement Unlocked!</div>
            <div class="text-lg font-semibold mb-4" data-testid="badge-celebration-name">{{ getBadgeName(newAchievements[0]) }} badge unlocked!</div>
          </div>
          
          <div class="space-y-2 mb-6">
            <div>Hours logged: {{ lastLessonHours }}h</div>
            <div v-if="lastLessonCost > 0">Cost: ${{ lastLessonCost }}</div>
            <div>Total progress: {{ progress.completedLessons.length }}/27 lessons</div>
            
            <!-- Progress Bar Animation -->
            <div class="mt-4" data-testid="progress-bar-animation">
              <div class="text-sm mb-1">Overall Progress</div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-blue-600 h-3 rounded-full transition-all duration-1000 animate-pulse"
                     :style="{ width: ((progress.completedLessons.length / 27) * 100) + '%' }"></div>
              </div>
            </div>
          </div>
          
          <button @click="closeCelebration" class="btn btn-primary" data-testid="continue-to-next-lesson">
            {{ progress.currentLesson <= 27 ? 'Continue to Next Lesson' : 'View Progress' }} 🚀
          </button>
        </div>
      </div>
    </div>

    <!-- Medical Certificate Information Modal -->
    <div v-if="showRequirementModal" class="modal-overlay" @click="showRequirementModal = false">
      <div class="modal-content" @click.stop data-testid="requirement-explanation">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Medical Certificate Requirement</h3>
          
          <p class="text-gray-700 mb-4">
            A medical certificate is required before solo flight to ensure you meet the health standards for safe aviation.
          </p>
          
          <div class="space-y-4" data-testid="medical-options">
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-blue-600 mb-2">Class 2 Medical Certificate</h4>
              <p class="text-gray-700 mb-2">
                Full aviation medical examination by CAA-approved doctor.
              </p>
              <div class="text-sm text-orange-600" data-testid="class-2-cost">
                Cost: $420-$1070 depending on location and tests required
              </div>
            </div>
            
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-green-600 mb-2">DL9 Driver License Medical</h4>
              <p class="text-gray-700 mb-2">
                Use your existing NZ driver license medical if valid. More cost-effective option.
              </p>
              <div class="text-sm text-green-600" data-testid="dl9-cost">
                Save $300-$800 compared to Class 2 medical
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showRequirementModal = false" class="btn btn-primary flex-1">
              Got it
            </button>
            <router-link to="/requirements" class="btn btn-secondary">
              View All Requirements
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Contextual Help Modal -->
    <div v-if="showContextualHelp" class="modal-overlay" @click="showContextualHelp = false">
      <div class="modal-content max-w-2xl" @click.stop data-testid="contextual-help-panel">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">📖 Dashboard Help</h3>
          
          <div class="space-y-4" data-testid="dashboard-help-content">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">🎯 Today's Focus</h4>
              <p class="text-blue-700 text-sm">
                Your dashboard shows your current lesson and what you need to prepare. Complete lessons to progress through your PPL training.
              </p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">📊 Progress Tracking</h4>
              <p class="text-green-700 text-sm">
                Monitor your flight hours, achievements, and upcoming requirements. The app tracks your progress automatically as you complete lessons.
              </p>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-2">🏆 Achievements</h4>
              <p class="text-purple-700 text-sm">
                Earn badges for completing milestones like your first solo flight, navigation flights, and theory exams.
              </p>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold text-orange-800 mb-2">⚠️ Requirements</h4>
              <p class="text-orange-700 text-sm">
                Keep track of upcoming requirements like medical certificates, theory exams, and minimum flight hours.
              </p>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showContextualHelp = false" class="btn btn-primary flex-1">
              Got it!
            </button>
            <router-link to="/education" class="btn btn-secondary">
              Education Center
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Center Modal -->
    <div v-if="showEducationCenter" class="modal-overlay" @click="showEducationCenter = false">
      <div class="modal-content max-w-4xl" @click.stop data-testid="education-center-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">📚 Education Center</h3>
          
          <!-- PPL Pathway Overview -->
          <div class="card mb-8" data-testid="ppl-pathway-overview">
            <h2 class="text-xl font-semibold mb-4">🎯 Complete PPL Pathway</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-3xl mb-2">📋</div>
                <div class="font-semibold">Medical Certificate</div>
                <div class="text-sm text-gray-600">Class 2 or DL9</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-3xl mb-2">✈️</div>
                <div class="font-semibold">Flight Training</div>
                <div class="text-sm text-gray-600">50+ hours</div>
              </div>
              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <div class="text-3xl mb-2">📚</div>
                <div class="font-semibold">Theory Exams</div>
                <div class="text-sm text-gray-600">6 subjects</div>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="text-3xl mb-2">🎯</div>
                <div class="font-semibold">Flight Test</div>
                <div class="text-sm text-gray-600">FPP Practical</div>
              </div>
            </div>
            
            <!-- CAA Part 61 Explanation -->
            <div class="bg-blue-50 p-4 rounded-lg" data-testid="part-61-explanation">
              <h3 class="font-semibold text-blue-800 mb-2">📜 CAA Part 61 Requirements</h3>
              <p class="text-blue-700 text-sm">
                New Zealand Private Pilot Licence requirements are governed by CAA Part 61. 
                This comprehensive regulation outlines all training, experience, and examination 
                requirements for obtaining your PPL(A) in New Zealand airspace.
              </p>
            </div>
          </div>

          <!-- Timeline and Cost Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Typical Timeline -->
            <div class="card" data-testid="typical-timeline-info">
              <h3 class="text-lg font-semibold mb-4">⏳ Typical Training Timeline</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span>Accelerated (3-4 lessons/week):</span>
                  <span class="font-semibold">3-4 months</span>
                </div>
                <div class="flex justify-between">
                  <span>Standard (1-2 lessons/week):</span>
                  <span class="font-semibold">6-8 months</span>
                </div>
                <div class="flex justify-between">
                  <span>Part-time (1 lesson/week):</span>
                  <span class="font-semibold">8-12 months</span>
                </div>
              </div>
            </div>

            <!-- Cost Breakdown Education -->
            <div class="card" data-testid="cost-breakdown-education">
              <h3 class="text-lg font-semibold mb-4">💰 Comprehensive Cost Guide</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Flight Training (40-50hrs):</span>
                  <span>$18,000-$25,000</span>
                </div>
                <div class="flex justify-between">
                  <span>Theory Exams (6 subjects):</span>
                  <span>$390</span>
                </div>
                <div class="flex justify-between">
                  <span>Medical Certificate:</span>
                  <span>$420-$1,070</span>
                </div>
                <div class="flex justify-between">
                  <span>Equipment & Materials:</span>
                  <span>$2,000-$4,000</span>
                </div>
                <div class="flex justify-between">
                  <span>Flight Test (FPP):</span>
                  <span>$800-$1,200</span>
                </div>
                <div class="border-t pt-2 mt-2 font-semibold">
                  <div class="flex justify-between">
                    <span>Total Estimated Cost:</span>
                    <span>$25,000-$35,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Study Resources -->
          <div class="card mb-8" data-testid="study-resources-section">
            <h3 class="text-lg font-semibold mb-4">📖 Study Resources & Links</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- CAA Resources -->
              <div data-testid="caa-links">
                <h4 class="font-semibold mb-3">🏛️ Official CAA Resources</h4>
                <div class="space-y-2 text-sm">
                  <a href="https://www.caa.govt.nz" target="_blank" class="block text-blue-600 hover:underline">
                    CAA New Zealand Website
                  </a>
                  <a href="https://www.caa.govt.nz/rules/rule-part-61/" target="_blank" class="block text-blue-600 hover:underline">
                    Part 61 - Pilot Licences and Ratings
                  </a>
                </div>
              </div>

              <!-- Regulatory Documents -->
              <div data-testid="regulatory-documents">
                <h4 class="font-semibold mb-3">📋 Regulatory Documents</h4>
                <div class="space-y-2 text-sm">
                  <div class="text-gray-600">• CAA Part 61 Regulations</div>
                  <div class="text-gray-600">• Visual Flight Rules Guide</div>
                  <div class="text-gray-600">• AIP New Zealand</div>
                </div>
              </div>

              <!-- Recommended Reading -->
              <div data-testid="recommended-reading">
                <h4 class="font-semibold mb-3">📚 Recommended Reading</h4>
                <div class="space-y-2 text-sm">
                  <div class="text-gray-600">• Flight training manuals</div>
                  <div class="text-gray-600">• Aviation safety publications</div>
                  <div class="text-gray-600">• Weather interpretation guides</div>
                </div>
              </div>
            </div>
          </div>

          <!-- School Selection Tips -->
          <div class="card mb-8" data-testid="school-selection-tips">
            <h3 class="text-lg font-semibold mb-4">🏫 Choosing a Flight School</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold mb-3">✅ What to Look For</h4>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li>• CAA Part 141 or Part 61 authorization</li>
                  <li>• Experienced, qualified instructors</li>
                  <li>• Well-maintained aircraft fleet</li>
                  <li>• Good safety record</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-3">❓ Questions to Ask</h4>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li>• What is the average time to PPL completion?</li>
                  <li>• What are the total costs involved?</li>
                  <li>• How often can I schedule lessons?</li>
                  <li>• What is your first-time pass rate?</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button @click="showEducationCenter = false" class="btn btn-primary flex-1">
              Close
            </button>
            <router-link to="/education" class="btn btn-secondary">
              Full Education Center
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Lesson Info Modal -->
    <div v-if="showLessonInfo" class="modal-overlay" @click="showLessonInfo = false">
      <div class="modal-content max-w-2xl" @click.stop data-testid="lesson-info-modal">
        <div class="p-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="text-6xl">{{ currentLessonInfo.icon }}</div>
            <div>
              <h3 class="text-2xl font-bold">Lesson {{ progress.currentLesson }}</h3>
              <h4 class="text-xl text-gray-600">{{ currentLessonInfo.name }}</h4>
            </div>
          </div>
          
          <div class="space-y-6">
            <!-- Lesson Description -->
            <div class="bg-blue-50 p-4 rounded-lg" data-testid="lesson-description">
              <h5 class="font-semibold text-blue-800 mb-2">📖 What You'll Learn</h5>
              <p class="text-blue-700">{{ currentLessonInfo.description }}</p>
            </div>
            
            <!-- Preparation Required -->
            <div class="bg-green-50 p-4 rounded-lg" data-testid="lesson-preparation">
              <h5 class="font-semibold text-green-800 mb-2">📋 Preparation Required</h5>
              <p class="text-green-700">{{ currentLessonInfo.preparation }}</p>
            </div>
            
            <!-- Training Phase Info -->
            <div class="bg-purple-50 p-4 rounded-lg" data-testid="training-phase-info">
              <h5 class="font-semibold text-purple-800 mb-2">🎯 Training Phase</h5>
              <div class="text-purple-700">
                <div v-if="progress.currentLesson <= 5">
                  <strong>Foundation Phase (Lessons 1-5)</strong>
                  <p class="text-sm mt-1">Basic controls and aircraft familiarization</p>
                </div>
                <div v-else-if="progress.currentLesson <= 12">
                  <strong>Circuit Phase (Lessons 6-12)</strong>
                  <p class="text-sm mt-1">Pattern work and landing practice leading to solo</p>
                </div>
                <div v-else-if="progress.currentLesson <= 20">
                  <strong>Navigation Phase (Lessons 13-20)</strong>
                  <p class="text-sm mt-1">Cross-country flying and navigation skills</p>
                </div>
                <div v-else-if="progress.currentLesson <= 25">
                  <strong>Advanced Phase (Lessons 21-25)</strong>
                  <p class="text-sm mt-1">Advanced maneuvers and specialized training</p>
                </div>
                <div v-else>
                  <strong>Certification Phase (Lessons 26-27)</strong>
                  <p class="text-sm mt-1">Final test preparation and checkride</p>
                </div>
              </div>
            </div>
            
            <!-- Prerequisites -->
            <div v-if="getPrerequisites(progress.currentLesson).length > 0" class="bg-orange-50 p-4 rounded-lg" data-testid="lesson-prerequisites">
              <h5 class="font-semibold text-orange-800 mb-2">⚠️ Prerequisites</h5>
              <ul class="text-orange-700 text-sm space-y-1">
                <li v-for="prereq in getPrerequisites(progress.currentLesson)" :key="prereq">
                  • {{ prereq }}
                </li>
              </ul>
            </div>
            
            <!-- Estimated Duration & Cost -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg" data-testid="lesson-duration">
                <h5 class="font-semibold text-gray-800 mb-2">⏱️ Typical Duration</h5>
                <p class="text-gray-700 text-sm">
                  {{ getLessonDuration(progress.currentLesson) }}
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg" data-testid="lesson-cost">
                <h5 class="font-semibold text-gray-800 mb-2">💰 Estimated Cost</h5>
                <p class="text-gray-700 text-sm">
                  {{ getLessonCost(progress.currentLesson) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showLessonInfo = false" class="btn btn-secondary">
              Close
            </button>
            <button 
              @click="showLessonInfo = false; showCompleteLesson = true" 
              class="btn btn-primary flex-1"
              data-testid="start-lesson-button"
            >
              🚀 Start This Lesson
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Milestone Requirements Modal -->
    <div v-if="showMilestoneRequirements" class="modal-overlay" @click="showMilestoneRequirements = false">
      <div class="modal-content max-w-2xl" @click.stop data-testid="milestone-requirements-modal">
        <div class="p-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="text-6xl">{{ getMilestoneRequirements().icon }}</div>
            <div>
              <h3 class="text-2xl font-bold">{{ getMilestoneRequirements().title }}</h3>
              <p class="text-lg text-gray-600">{{ getMilestoneRequirements().description }}</p>
            </div>
          </div>
          
          <div class="space-y-6">
            <!-- Requirements -->
            <div class="bg-blue-50 p-4 rounded-lg" data-testid="milestone-requirements-list">
              <h4 class="font-semibold text-blue-800 mb-3">📋 Requirements to Complete</h4>
              <ul class="space-y-2">
                <li v-for="req in getMilestoneRequirements().requirements" :key="req" class="text-blue-700">
                  {{ req }}
                </li>
              </ul>
            </div>
            
            <!-- Next Steps -->
            <div class="bg-green-50 p-4 rounded-lg" data-testid="milestone-next-steps">
              <h4 class="font-semibold text-green-800 mb-3">🚀 Next Steps</h4>
              <ul class="space-y-2">
                <li v-for="step in getMilestoneRequirements().nextSteps" :key="step" class="text-green-700">
                  • {{ step }}
                </li>
              </ul>
            </div>
            
            <!-- Cost & Timeline -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-orange-50 p-4 rounded-lg" data-testid="milestone-cost">
                <h4 class="font-semibold text-orange-800 mb-2">💰 Estimated Cost</h4>
                <p class="text-orange-700">{{ getMilestoneRequirements().cost }}</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg" data-testid="milestone-timeframe">
                <h4 class="font-semibold text-purple-800 mb-2">⏱️ Timeframe</h4>
                <p class="text-purple-700">{{ getMilestoneRequirements().timeframe }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showMilestoneRequirements = false" class="btn btn-secondary">
              Close
            </button>
            <router-link to="/requirements" class="btn btn-primary flex-1">
              📋 View All Requirements
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Requirement Information Modal -->
    <div v-if="showRequirementInfoModal && selectedRequirement" class="modal-overlay" @click="showRequirementInfoModal = false">
      <div class="modal-content max-w-2xl" @click.stop data-testid="requirement-info-modal">
        <div class="p-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="text-6xl">{{ selectedRequirement.icon }}</div>
            <div>
              <h3 class="text-2xl font-bold">{{ selectedRequirement.title }}</h3>
              <p class="text-lg text-gray-600">{{ selectedRequirement.fullDescription }}</p>
            </div>
          </div>
          
          <div class="space-y-6">
            <!-- Requirements -->
            <div class="bg-blue-50 p-4 rounded-lg" data-testid="requirement-details-list">
              <h4 class="font-semibold text-blue-800 mb-3">📋 What You Need to Do</h4>
              <ul class="space-y-2">
                <li v-for="req in selectedRequirement.requirements" :key="req" class="text-blue-700">
                  {{ req }}
                </li>
              </ul>
            </div>
            
            <!-- Next Steps -->
            <div class="bg-green-50 p-4 rounded-lg" data-testid="requirement-next-steps">
              <h4 class="font-semibold text-green-800 mb-3">🚀 Next Steps</h4>
              <ul class="space-y-2">
                <li v-for="step in selectedRequirement.nextSteps" :key="step" class="text-green-700">
                  • {{ step }}
                </li>
              </ul>
            </div>
            
            <!-- Cost & Timeline -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-orange-50 p-4 rounded-lg" data-testid="requirement-cost">
                <h4 class="font-semibold text-orange-800 mb-2">💰 Estimated Cost</h4>
                <p class="text-orange-700">{{ selectedRequirement.cost }}</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg" data-testid="requirement-timeframe">
                <h4 class="font-semibold text-purple-800 mb-2">⏱️ Timeframe</h4>
                <p class="text-purple-700">{{ selectedRequirement.timeframe }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showRequirementInfoModal = false" class="btn btn-secondary">
              Close
            </button>
            <router-link to="/requirements" class="btn btn-primary flex-1">
              📋 View All Requirements
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Tooltip -->
    <div v-if="progressTooltipVisible" 
         class="fixed z-50 bg-blue-900 text-white p-4 rounded-lg shadow-lg pointer-events-none"
         :style="progressTooltipStyle"
         data-testid="progress-tooltip">
      <div class="font-semibold mb-2">Flight Hours Progress</div>
      <div class="space-y-1 text-sm" data-testid="progress-tooltip-details">
        <div class="flex justify-between">
          <span>Dual Hours:</span>
          <span class="text-blue-300">{{ progress.flightHours.dual.toFixed(1) }}h / 25h min</span>
        </div>
        <div class="flex justify-between">
          <span>Solo Hours:</span>
          <span class="text-green-300">{{ progress.flightHours.solo.toFixed(1) }}h / 15h min</span>
        </div>
        <div class="flex justify-between">
          <span>Cross Country:</span>
          <span class="text-yellow-300">{{ progress.flightHours.crossCountry.toFixed(1) }}h / 5h min</span>
        </div>
        <div class="flex justify-between font-semibold border-t border-blue-600 pt-1">
          <span>Total Hours:</span>
          <span class="text-white">{{ progress.flightHours.total.toFixed(1) }}h / 50h min</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// State
const progress = ref({
  currentLesson: 1,
  completedLessons: [] as number[],
  flightHours: {
    dual: 0,
    solo: 0,
    crossCountry: 0,
    instrument: 0,
    terrainAwareness: 0,
    night: 0,
    total: 0
  },
  achievements: [] as string[],
  totalSpent: 0,
  expenses: [] as any[],
  demonstratedSkills: {} as { [skillId: string]: { lessonNumber: number; dateCompleted: string } },
  medicalCertificate: null as { type: string; expiryDate: string } | null,
  theoryExams: {
    airLaw: { attempts: [], passed: false },
    navigation: { attempts: [], passed: false },
    technicalKnowledge: { attempts: [], passed: false },
    humanFactors: { attempts: [], passed: false },
    meteorology: { attempts: [], passed: false },
    radioTelephony: { attempts: [], passed: false }
  }
})

const showCompleteLesson = ref(false)
const showAchievementCelebration = ref(false)
const showContextualHelp = ref(false)
const showEducationCenter = ref(false)
const showRequirementModal = ref(false)
const showLessonInfo = ref(false)
const showMilestoneRequirements = ref(false)
const showRequirementInfoModal = ref(false)
const selectedRequirement = ref<any>(null)
const newAchievements = ref<string[]>([])

// Tooltip state
const progressTooltipVisible = ref(false)
const progressTooltipStyle = ref({})

// Form data
const lessonHours = ref('')
const lessonCost = ref('')
const lessonNotes = ref('')
const demonstratedSkills = ref<{[key: string]: boolean}>({})
const lastLessonHours = ref(0)
const lastLessonCost = ref(0)

// Lesson definitions
const lessons = [
  { id: 1, name: 'Introductory Flight', icon: '🛫', description: 'Get familiar with the aircraft and basic controls', preparation: 'Book your first lesson with a flight instructor and review basic aviation theory' },
  { id: 2, name: 'Aircraft Familiarization', icon: '✈️', description: 'Learn aircraft systems and pre-flight inspection', preparation: 'Review aircraft manual and practice pre-flight checklist items' },
  { id: 3, name: 'Taxi Operations', icon: '🛞', description: 'Master taxiing, radio communications, and ground procedures', preparation: 'Study airport diagrams and radio phraseology for your training airport' },
  { id: 4, name: 'Straight & Level', icon: '📏', description: 'Maintain altitude, heading, and speed in cruise flight', preparation: 'Practice attitude flying and instrument scanning techniques' },
  { id: 5, name: 'Climbing & Descending', icon: '📈', description: 'Control aircraft in climbs and descents', preparation: 'Understand power and attitude relationships for different flight phases' },
  { id: 6, name: 'Turns', icon: '🔄', description: 'Execute coordinated turns and maintain orientation', preparation: 'Study coordinated flight and practice rudder coordination exercises' },
  { id: 7, name: 'Slow Flight', icon: '🐌', description: 'Fly at minimum controllable airspeeds safely', preparation: 'Review stall warning signs and slow flight configuration procedures' },
  { id: 8, name: 'Stalls', icon: '⚠️', description: 'Recognize, enter, and recover from stalls', preparation: 'Study stall theory and practice stall recognition exercises' },
  { id: 9, name: 'Emergency Procedures', icon: '🚨', description: 'Handle in-flight emergencies and system failures', preparation: 'Memorize emergency checklists and practice forced landing procedures' },
  { id: 10, name: 'Circuit Pattern', icon: '🔄', description: 'Fly the airport traffic pattern safely and efficiently', preparation: 'Study circuit procedures and practice radio calls for pattern work' },
  { id: 11, name: 'Landing Practice', icon: '🛬', description: 'Master the approach and landing phase', preparation: 'Practice approach configuration and landing sight picture visualization' },
  { id: 12, name: 'Solo Preparation', icon: '🎯', description: 'Final preparation for first solo flight', preparation: 'Review all procedures and demonstrate consistent safe flying skills' },
  { id: 13, name: 'First Solo', icon: '🦅', description: 'Your first solo flight - a major milestone!', preparation: 'Get instructor endorsement and mentally prepare for solo flight' },
  { id: 14, name: 'Solo Practice', icon: '🔁', description: 'Build confidence with additional solo flights', preparation: 'Practice circuits independently and maintain proficiency standards' },
  { id: 15, name: 'Navigation Basics', icon: '🧭', description: 'Learn map reading and basic navigation principles', preparation: 'Study topographical charts and practice pilotage techniques' },
  { id: 16, name: 'Cross Country Planning', icon: '🗺️', description: 'Plan cross-country flights with weather and performance', preparation: 'Learn flight planning software and weather interpretation' },
  { id: 17, name: 'Radio Navigation', icon: '📻', description: 'Use VOR, NDB and GPS navigation systems', preparation: 'Study radio navigation principles and practice with navigation aids' },
  { id: 18, name: 'Cross Country Solo', icon: '🌄', description: 'Complete your first solo cross-country flight', preparation: 'Plan a solo cross-country flight and get instructor approval' },
  { id: 19, name: 'Advanced Navigation', icon: '🎯', description: 'Complex navigation scenarios and lost procedures', preparation: 'Practice diversion procedures and advanced pilotage techniques' },
  { id: 20, name: 'Night Flying', icon: '🌙', description: 'Experience flying in darkness with special procedures', preparation: 'Study night flying regulations and practice night vision techniques' },
  { id: 21, name: 'Instrument Flying', icon: '📊', description: 'Basic instrument flying skills and attitude reference', preparation: 'Study instrument flying principles and practice scan patterns' },
  { id: 22, name: 'Advanced Maneuvers', icon: '🎪', description: 'Steep turns, chandelles, and advanced flight maneuvers', preparation: 'Review commercial maneuver standards and practice precision flying' },
  { id: 23, name: 'Unusual Attitudes', icon: '🌪️', description: 'Recover from unusual flight attitudes safely', preparation: 'Study unusual attitude recovery procedures and spatial disorientation' },
  { id: 24, name: 'Flight Test Prep', icon: '📚', description: 'Intensive preparation for PPL flight test', preparation: 'Review all PPL standards and practice flight test scenarios' },
  { id: 25, name: 'Mock Flight Test', icon: '🎭', description: 'Practice flight test with instructor evaluation', preparation: 'Complete practice flight test and address any weak areas' },
  { id: 26, name: 'Final Flight Test', icon: '🏆', description: 'Official PPL flight test with CAA examiner', preparation: 'Schedule flight test appointment and ensure all requirements met' },
  { id: 27, name: 'License Issue', icon: '👨‍✈️', description: 'Congratulations! Receive your PPL license', preparation: 'Complete any remaining paperwork and celebrate your achievement!' }
]

// Computed properties
const currentLessonInfo = computed(() => {
  return lessons.find(l => l.id === progress.value.currentLesson) || lessons[0]
})

const lessonProgress = computed(() => {
  return (progress.value.completedLessons.length / 27) * 100
})

const nextMajorMilestone = computed(() => {
  if (progress.value.flightHours.total === 0) return 'First Flight'
  if (progress.value.flightHours.total < 5) return 'Controls Master' 
  if (progress.value.flightHours.solo === 0) return 'Solo Wings'
  if (progress.value.achievements.length < 6) return 'Navigation Phase'
  return 'Licensed Pilot'
})

const milestoneDescription = computed(() => {
  if (progress.value.flightHours.total === 0) return 'Complete your introductory flight and earn your first badge'
  if (progress.value.flightHours.total < 5) return 'Demonstrate basic aircraft control with 5 hours dual instruction'
  if (progress.value.flightHours.solo === 0) return 'Your first solo flight - a major milestone!'
  return 'Continue progressing through your training phases'
})

const upcomingRequirements = computed(() => {
  const requirements = []
  
  if (!progress.value.medicalCertificate) {
    requirements.push({
      id: 'medical-cert',
      title: 'Medical Certificate',
      description: 'Required before solo flight - choose Class 2 or DL9 option'
    })
  }
  
  if (progress.value.flightHours.total > 8 && progress.value.flightHours.solo === 0) {
    requirements.push({
      id: 'solo-endorsement',
      title: 'Solo Flight Endorsement',
      description: 'Get instructor endorsement for your first solo flight'
    })
  }
  
  const passedExams = Object.values(progress.value.theoryExams).filter(exam => exam.passed).length
  if (passedExams < 6) {
    requirements.push({
      id: 'theory-exams',
      title: 'Theory Examinations',
      description: `Complete ${6 - passedExams} remaining theory exam${passedExams === 5 ? '' : 's'}`
    })
  }
  
  return requirements
})

// Actions
const completeLesson = () => {
  const hours = parseFloat(lessonHours.value) || 0
  const cost = parseFloat(lessonCost.value) || 0
  
  if (hours <= 0) {
    alert('Please enter valid flight hours')
    return
  }
  
  lastLessonHours.value = hours
  lastLessonCost.value = cost
  
  // Save demonstrated skills
  const currentDate = new Date().toISOString().split('T')[0]
  Object.keys(demonstratedSkills.value).forEach(skillId => {
    if (demonstratedSkills.value[skillId]) {
      progress.value.demonstratedSkills[skillId] = {
        lessonNumber: progress.value.currentLesson,
        dateCompleted: currentDate
      }
    }
  })
  
  // Update progress
  progress.value.completedLessons.push(progress.value.currentLesson)
  progress.value.flightHours.dual += hours
  progress.value.flightHours.total += hours
  progress.value.totalSpent += cost
  
  // Check for achievements
  const beforeAchievements = progress.value.achievements.length
  checkAchievements()
  const afterAchievements = progress.value.achievements.length
  
  if (afterAchievements > beforeAchievements) {
    newAchievements.value = progress.value.achievements.slice(beforeAchievements)
  } else {
    newAchievements.value = []
  }
  
  // Move to next lesson
  if (progress.value.currentLesson < 27) {
    progress.value.currentLesson++
  }
  
  // Save progress
  saveProgress()
  
  // Clear form
  lessonHours.value = ''
  lessonCost.value = ''
  lessonNotes.value = ''
  demonstratedSkills.value = {}
  
  // Show celebration
  showCompleteLesson.value = false
  showAchievementCelebration.value = true
}

const checkAchievements = () => {
  const achievements = progress.value.achievements
  
  // First Flight badge - complete any lesson with flight hours
  if (progress.value.flightHours.total >= 0.5 && !achievements.includes('first-flight')) {
    achievements.push('first-flight')
  }
  
  // Controls Master badge - 5 hours dual instruction
  if (progress.value.flightHours.dual >= 5 && !achievements.includes('controls-master')) {
    achievements.push('controls-master')
  }
  
  // Circuit Master badge - complete 3 lessons
  if (progress.value.completedLessons.length >= 3 && !achievements.includes('circuit-master')) {
    achievements.push('circuit-master')
  }
  
  // Solo Wings badge - first solo flight
  if (progress.value.flightHours.solo >= 0.5 && !achievements.includes('solo-wings')) {
    achievements.push('solo-wings')
  }
  
  // Navigation Pioneer badge - 5 hours cross country
  if (progress.value.flightHours.crossCountry >= 5 && !achievements.includes('navigation-pioneer')) {
    achievements.push('navigation-pioneer')
  }
  
  // Theory Scholar badge - pass first theory exam
  const passedExams = Object.values(progress.value.theoryExams).filter(exam => exam.passed).length
  if (passedExams >= 1 && !achievements.includes('theory-scholar')) {
    achievements.push('theory-scholar')
  }
  
  // Theory Master badge - pass all 6 theory exams
  if (passedExams >= 6 && !achievements.includes('theory-master')) {
    achievements.push('theory-master')
  }
  
  // Night Flyer badge - 5 hours night flying (optional)
  if ((progress.value.flightHours.night || 0) >= 5 && !achievements.includes('night-flyer')) {
    achievements.push('night-flyer')
  }
  
  // Instrument Rated badge - 5 hours instrument time
  if (progress.value.flightHours.instrument >= 5 && !achievements.includes('instrument-rated')) {
    achievements.push('instrument-rated')
  }
  
  // Terrain Master badge - 5 hours terrain awareness (NZ specific)
  if (progress.value.flightHours.terrainAwareness >= 5 && !achievements.includes('terrain-master')) {
    achievements.push('terrain-master')
  }
  
  // Big Spender badge - spend over $10,000
  if (progress.value.totalSpent >= 10000 && !achievements.includes('big-spender')) {
    achievements.push('big-spender')
  }
  
  // Licensed Pilot badge - complete all requirements (final badge)
  if (progress.value.completedLessons.length >= 27 && 
      progress.value.flightHours.total >= 50 && 
      passedExams >= 6 && 
      !achievements.includes('licensed-pilot')) {
    achievements.push('licensed-pilot')
  }
}

const getBadgeName = (badgeId: string) => {
  const badgeNames: Record<string, string> = {
    'first-flight': 'First Flight',
    'controls-master': 'Controls Master',
    'circuit-master': 'Circuit Master',
    'solo-wings': 'Solo Wings',
    'navigation-pioneer': 'Navigation Pioneer',
    'theory-scholar': 'Theory Scholar',
    'theory-master': 'Theory Master',
    'night-flyer': 'Night Flyer',
    'instrument-rated': 'Instrument Rated',
    'terrain-master': 'Terrain Master',
    'big-spender': 'Big Spender',
    'licensed-pilot': 'Licensed Pilot'
  }
  return badgeNames[badgeId] || badgeId
}

const getBadgeIcon = (badgeId: string) => {
  const badgeIcons: Record<string, string> = {
    'first-flight': '🛫',
    'controls-master': '🎮',
    'circuit-master': '🔄',
    'solo-wings': '🦅',
    'navigation-pioneer': '🧭',
    'theory-scholar': '📖',
    'theory-master': '🎓',
    'night-flyer': '🌙',
    'instrument-rated': '📊',
    'terrain-master': '🏔️',
    'big-spender': '💰',
    'licensed-pilot': '👨‍✈️'
  }
  return badgeIcons[badgeId] || '🏆'
}

const getBadgeDescription = (badgeId: string) => {
  const badgeDescriptions: Record<string, string> = {
    'first-flight': 'Complete your introductory flight',
    'controls-master': 'Master basic aircraft controls',
    'circuit-master': 'Complete multiple circuit lessons',
    'solo-wings': 'Your first solo flight milestone',
    'navigation-pioneer': 'Navigate cross-country flights',
    'theory-scholar': 'Pass your first theory exam',
    'theory-master': 'Pass all required theory exams',
    'night-flyer': 'Optional night flying qualification',
    'instrument-rated': 'Master instrument flying',
    'terrain-master': 'NZ terrain awareness training',
    'big-spender': 'Invest significantly in training',
    'licensed-pilot': 'Complete your PPL requirements'
  }
  return badgeDescriptions[badgeId] || 'Achievement unlocked'
}


const closeCelebration = () => {
  showAchievementCelebration.value = false
  newAchievements.value = []
}

// Medical Certificate Warning Methods
const getMedicalExpiryStatus = () => {
  if (!progress.value.medicalCertificate) return 'No Medical'
  
  const expiryDate = new Date(progress.value.medicalCertificate!.expiryDate)
  const now = new Date()
  const timeDiff = expiryDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) return 'Expired'
  if (daysDiff <= 30) return 'Expiring Soon'
  if (daysDiff <= 90) return 'Renewal Due'
  return 'Current'
}

const getMedicalTimeRemaining = () => {
  if (!progress.value.medicalCertificate) return ''
  
  const expiryDate = new Date(progress.value.medicalCertificate!.expiryDate)
  const now = new Date()
  const timeDiff = expiryDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) {
    return `Expired ${Math.abs(daysDiff)} days ago`
  } else if (daysDiff === 0) {
    return 'Expires today'
  } else if (daysDiff === 1) {
    return '1 day remaining'
  } else if (daysDiff <= 30) {
    return `${daysDiff} days remaining`
  } else {
    const monthsRemaining = Math.floor(daysDiff / 30)
    return `${monthsRemaining} months remaining`
  }
}

// BFR Warning Methods
const getBfrStatus = () => {
  const bfrRecords = JSON.parse(localStorage.getItem('ppl-quest-bfr-records') || '[]')
  if (!bfrRecords.length) return 'No BFR Recorded'
  
  const latestBfr = bfrRecords.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  const bfrDate = new Date(latestBfr.date)
  const now = new Date()
  const monthsDiff = (now.getFullYear() - bfrDate.getFullYear()) * 12 + (now.getMonth() - bfrDate.getMonth())
  
  if (monthsDiff >= 24) return 'Overdue'
  if (monthsDiff >= 22) return 'Expiring Soon'
  return 'Current'
}

const getBfrTimeRemaining = () => {
  const bfrRecords = JSON.parse(localStorage.getItem('ppl-quest-bfr-records') || '[]')
  if (!bfrRecords.length) return ''
  
  const latestBfr = bfrRecords.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  const bfrDate = new Date(latestBfr.date)
  const dueDate = new Date(bfrDate)
  dueDate.setMonth(dueDate.getMonth() + 24)
  
  const now = new Date()
  const timeDiff = dueDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) {
    return `${Math.abs(daysDiff)} days overdue`
  } else if (daysDiff === 0) {
    return 'Due today'
  } else {
    return `${daysDiff} days remaining`
  }
}

const hasMedicalWarnings = computed(() => {
  const status = getMedicalExpiryStatus()
  return status === 'Expired' || status === 'Expiring Soon'
})

const hasBfrWarnings = computed(() => {
  const status = getBfrStatus()
  return status === 'Overdue' || status === 'Expiring Soon'
})


const saveProgress = () => {
  localStorage.setItem('ppl-quest-progress', JSON.stringify(progress.value))
}

// Tooltip methods
const showProgressTooltip = (event: MouseEvent) => {
  progressTooltipVisible.value = true
  progressTooltipStyle.value = {
    left: event.clientX + 10 + 'px',
    top: event.clientY - 80 + 'px'
  }
}

const hideProgressTooltip = () => {
  progressTooltipVisible.value = false
}

// Lesson info helper functions
const getPrerequisites = (lessonNum: number): string[] => {
  const prerequisites: { [key: number]: string[] } = {
    12: ['Complete lessons 1-11', 'Pass all required theory exams'],
    13: ['Medical certificate', 'Student pilot permit', 'Solo endorsement from instructor'],
    15: ['Complete first solo flight'],
    18: ['Complete navigation lessons 15-17', 'Pass navigation theory exam'],
    20: ['Complete 15+ hours solo time', 'Night flying endorsement'],
    21: ['Complete cross-country solo requirements'],
    24: ['Complete all training lessons 1-23', 'Meet all PPL hour requirements'],
    25: ['Pass final theory exam', 'Instructor recommendation'],
    26: ['Complete mock flight test', 'CAA flight test booking'],
    27: ['Pass PPL flight test']
  }
  return prerequisites[lessonNum] || []
}

const getLessonDuration = (lessonNum: number): string => {
  if (lessonNum <= 12) return '1.0-1.5 hours dual instruction'
  if (lessonNum === 13) return '0.5-1.0 hours solo flight'
  if (lessonNum <= 17) return '1.5-2.0 hours dual instruction'
  if (lessonNum === 18) return '1.5-2.5 hours solo cross-country'
  if (lessonNum <= 23) return '1.0-2.0 hours dual instruction'
  if (lessonNum <= 25) return '2.0-3.0 hours intensive preparation'
  if (lessonNum === 26) return '2.0-3.0 hours flight test'
  return '30 minutes administrative'
}

const getLessonCost = (lessonNum: number): string => {
  if (lessonNum <= 12) return '$280-$420 (aircraft + instructor)'
  if (lessonNum === 13) return '$140-$200 (aircraft only)'
  if (lessonNum <= 17) return '$350-$500 (longer dual lessons)'
  if (lessonNum === 18) return '$200-$350 (solo cross-country)'
  if (lessonNum <= 23) return '$280-$450 (specialized training)'
  if (lessonNum <= 25) return '$400-$600 (intensive preparation)'
  if (lessonNum === 26) return '$500-$800 (examiner + aircraft)'
  return '$0 (license issue only)'
}

const getMilestoneRequirements = () => {
  const milestone = nextMajorMilestone.value
  const currentHours = progress.value.flightHours.total
  const currentSolo = progress.value.flightHours.solo
  
  const requirements = {
    'First Flight': {
      title: 'Complete Your First Flight',
      icon: '🛫',
      description: 'Take your introductory flight and begin your PPL journey',
      requirements: [
        '📞 Contact a flight school and schedule your first lesson',
        '📄 Bring valid photo ID and be prepared for paperwork',
        '👨‍✈️ Meet your flight instructor and discuss your goals',
        '✈️ Complete 0.5-1.0 hours of dual instruction',
        '📝 Ask questions and get familiar with the aircraft'
      ],
      nextSteps: [
        'Book your next lesson within 1-2 weeks',
        'Start studying basic aviation theory',
        'Consider purchasing basic flight training materials'
      ],
      cost: '$280-$420 for introductory flight',
      timeframe: 'Can be completed today!'
    },
    'Controls Master': {
      title: 'Master Basic Aircraft Controls',
      icon: '🎮',
      description: 'Demonstrate proficiency in basic aircraft control and earn your Controls Master badge',
      requirements: [
        `✈️ Complete 5+ hours dual instruction (currently: ${currentHours.toFixed(1)}h)`,
        '📏 Master straight and level flight within standards',
        '📈 Demonstrate proper climbing and descending techniques',
        '🔄 Execute coordinated turns with proper rudder usage',
        '✅ Show consistent aircraft control without instructor assistance'
      ],
      nextSteps: [
        'Continue with circuit pattern training',
        'Focus on consistency and precision',
        'Build confidence with aircraft handling'
      ],
      cost: `$${Math.round((5 - currentHours) * 350)} remaining (assuming $350/hour average)`,
      timeframe: `${Math.max(0, 5 - currentHours).toFixed(1)} more hours needed`
    },
    'Solo Wings': {
      title: 'Achieve Your First Solo Flight',
      icon: '🦅',
      description: 'The biggest milestone in flight training - flying solo for the first time!',
      requirements: [
        '🏥 Valid medical certificate (Class 2 or DL9)',
        '📄 Student pilot permit from CAA',
        '✈️ Demonstrate consistent safe flying (typically 10-15 hours dual)',
        '🛬 Master circuit pattern and landing procedures',
        '👨‍✈️ Receive solo endorsement from your instructor',
        '📝 Pass required knowledge tests for solo flight'
      ],
      nextSteps: [
        'Complete medical certificate if not done',
        'Apply for student pilot permit',
        'Focus on circuit consistency and landings',
        'Study emergency procedures thoroughly'
      ],
      cost: '$280-$420 per lesson until solo ready',
      timeframe: 'Typically achieved at 10-15 hours total time'
    },
    'Navigation Phase': {
      title: 'Begin Cross-Country Navigation',
      icon: '🧭',
      description: 'Learn navigation skills and plan your first cross-country flights',
      requirements: [
        `🦅 Complete solo requirements (solo hours: ${currentSolo.toFixed(1)}h)`,
        '📚 Pass navigation theory exam',
        '🗺️ Demonstrate map reading and pilotage skills',
        '📻 Master VOR and GPS navigation systems',
        '✈️ Complete dual cross-country instruction',
        '📋 Plan and execute solo cross-country flight'
      ],
      nextSteps: [
        'Study navigation theory intensively',
        'Practice flight planning procedures',
        'Learn radio navigation equipment',
        'Plan your first cross-country route'
      ],
      cost: '$350-$500 per navigation lesson',
      timeframe: 'Typically starts around 15-20 hours total time'
    },
    'Licensed Pilot': {
      title: 'Complete Your PPL License',
      icon: '👨‍✈️',
      description: 'Final push to become a licensed private pilot!',
      requirements: [
        '✈️ Complete minimum 50 hours total flight time',
        '🦅 Complete minimum 15 hours solo time',
        '🗺️ Complete 5+ hours cross-country time',
        '📚 Pass all 6 theory exams with 70%+ each',
        '🏥 Valid medical certificate',
        '🎯 Pass PPL flight test with CAA examiner'
      ],
      nextSteps: [
        'Complete any remaining flight hours',
        'Finish outstanding theory exams',
        'Schedule mock flight test',
        'Book official PPL flight test'
      ],
      cost: '$500-$800 for flight test + examiner fees',
      timeframe: 'Complete when all requirements met'
    }
  }
  
  return requirements[milestone] || requirements['Licensed Pilot']
}

const getLessonSkills = (lessonNum: number) => {
  const lessonSkills: { [key: number]: Array<{id: string, name: string, description: string}> } = {
    1: [
      { id: 'cockpit-familiarization', name: 'Cockpit Familiarization', description: 'Student can identify and operate basic flight controls' },
      { id: 'basic-controls', name: 'Basic Control Understanding', description: 'Understands primary flight controls (elevator, aileron, rudder)' }
    ],
    2: [
      { id: 'preflight-inspection', name: 'Pre-flight Inspection', description: 'Completed thorough aircraft inspection using checklist' },
      { id: 'aircraft-systems', name: 'Aircraft Systems Knowledge', description: 'Demonstrates understanding of basic aircraft systems' }
    ],
    3: [
      { id: 'taxi-procedures', name: 'Taxi Procedures', description: 'Safely taxi aircraft using proper techniques' },
      { id: 'radio-communication', name: 'Radio Communication', description: 'Demonstrates proper radio phraseology for ground operations' }
    ],
    4: [
      { id: 'attitude-control', name: 'Attitude Control', description: 'Maintains straight and level flight within standards' },
      { id: 'trim-usage', name: 'Trim Usage', description: 'Properly uses elevator trim to maintain attitude' }
    ],
    5: [
      { id: 'climbing-technique', name: 'Climbing Technique', description: 'Maintains proper climb attitude and airspeed' },
      { id: 'descending-technique', name: 'Descending Technique', description: 'Controls descent rate and maintains airspeed' }
    ],
    6: [
      { id: 'coordinated-turns', name: 'Coordinated Turns', description: 'Executes turns using proper rudder coordination' },
      { id: 'bank-angle-control', name: 'Bank Angle Control', description: 'Maintains desired bank angles and roll-out timing' }
    ],
    7: [
      { id: 'slow-flight-control', name: 'Slow Flight Control', description: 'Maintains control at minimum controllable airspeed' },
      { id: 'configuration-changes', name: 'Configuration Changes', description: 'Properly configures aircraft for slow flight' }
    ],
    8: [
      { id: 'stall-recognition', name: 'Stall Recognition', description: 'Recognizes approaching stall conditions and warning signs' },
      { id: 'stall-recovery', name: 'Stall Recovery', description: 'Executes proper stall recovery technique promptly' },
      { id: 'power-on-stall', name: 'Power-On Stall', description: 'Demonstrates departure stall and recovery' },
      { id: 'power-off-stall', name: 'Power-Off Stall', description: 'Demonstrates approach-to-landing stall and recovery' }
    ],
    9: [
      { id: 'emergency-descent', name: 'Emergency Descent', description: 'Executes emergency descent procedures' },
      { id: 'engine-failure', name: 'Engine Failure Response', description: 'Responds appropriately to simulated engine failure' },
      { id: 'forced-landing', name: 'Forced Landing Approach', description: 'Selects field and plans forced landing approach' }
    ],
    10: [
      { id: 'circuit-pattern', name: 'Circuit Pattern', description: 'Flies standard circuit pattern with proper spacing' },
      { id: 'traffic-awareness', name: 'Traffic Awareness', description: 'Maintains awareness of other aircraft in circuit' }
    ],
    11: [
      { id: 'approach-control', name: 'Approach Control', description: 'Maintains stable approach airspeed and descent path' },
      { id: 'landing-technique', name: 'Landing Technique', description: 'Executes safe landings with minimal instructor input' },
      { id: 'go-around', name: 'Go-Around Procedure', description: 'Executes go-around when approach is unstable' }
    ],
    12: [
      { id: 'solo-readiness', name: 'Solo Readiness Assessment', description: 'Demonstrates consistent safe flying without instructor assistance' },
      { id: 'decision-making', name: 'Pilot Decision Making', description: 'Shows good judgment in flight planning and execution' }
    ],
    13: [
      { id: 'solo-flight', name: 'First Solo Flight', description: 'Successfully completes first solo flight' },
      { id: 'independent-operation', name: 'Independent Aircraft Operation', description: 'Operates aircraft safely without instructor present' }
    ],
    15: [
      { id: 'map-reading', name: 'Map Reading', description: 'Navigates using topographical charts and landmarks' },
      { id: 'pilotage', name: 'Pilotage Navigation', description: 'Uses visual landmarks for navigation' }
    ],
    16: [
      { id: 'flight-planning', name: 'Flight Planning', description: 'Creates comprehensive cross-country flight plan' },
      { id: 'weather-analysis', name: 'Weather Analysis', description: 'Interprets weather reports and makes go/no-go decisions' }
    ],
    17: [
      { id: 'vor-navigation', name: 'VOR Navigation', description: 'Uses VOR stations for navigation and position fixing' },
      { id: 'gps-navigation', name: 'GPS Navigation', description: 'Operates GPS equipment for navigation' }
    ],
    18: [
      { id: 'cross-country-solo', name: 'Cross Country Solo', description: 'Completes solo cross-country flight successfully' },
      { id: 'navigation-accuracy', name: 'Navigation Accuracy', description: 'Maintains course and arrives at checkpoints on time' }
    ],
    21: [
      { id: 'instrument-scan', name: 'Instrument Scan', description: 'Develops proper instrument scan pattern' },
      { id: 'attitude-instrument', name: 'Attitude Instrument Flying', description: 'Controls aircraft using attitude indicator' }
    ],
    22: [
      { id: 'steep-turns', name: 'Steep Turns', description: 'Executes 45-degree banked turns within standards' },
      { id: 'chandelles', name: 'Chandelles', description: 'Performs chandelle maneuvers with proper technique' }
    ],
    23: [
      { id: 'unusual-attitude-recovery', name: 'Unusual Attitude Recovery', description: 'Recovers from unusual flight attitudes using instruments' },
      { id: 'spatial-disorientation', name: 'Spatial Disorientation Recovery', description: 'Recognizes and recovers from spatial disorientation' }
    ],
    24: [
      { id: 'flight-test-standards', name: 'Flight Test Standards', description: 'Performs all maneuvers to PPL test standards' },
      { id: 'airmanship', name: 'Airmanship', description: 'Demonstrates professional airmanship throughout flight' }
    ]
  }
  return lessonSkills[lessonNum] || []
}

// Function to show requirement information
const openRequirementInfoModal = (requirementId: string) => {
  const requirement = upcomingRequirements.value.find(req => req.id === requirementId)
  if (requirement) {
    selectedRequirement.value = getRequirementDetails(requirement)
    showRequirementInfoModal.value = true
  }
}

// Function to get detailed requirement information
const getRequirementDetails = (requirement: any) => {
  const details = {
    'medical-cert': {
      ...requirement,
      icon: '🏥',
      fullDescription: 'A medical certificate is required before you can fly solo. You have two options in New Zealand.',
      requirements: [
        '📋 Choose between Class 2 Medical or DL9 Self-Declaration',
        '🏥 Class 2: Full medical examination by CAA-approved doctor ($420-$1,070)',
        '📄 DL9: Self-declaration if you hold valid NZ driver license (free)',
        '⏱️ Class 2 valid for 5 years (under 40) or 2 years (over 40)',
        '🔄 DL9 must be renewed annually'
      ],
      nextSteps: [
        'Decide which medical option suits your budget and situation',
        'If Class 2: Find CAA-approved Aviation Medical Examiner',
        'If DL9: Download form from CAA website and complete',
        'Submit application and wait for approval'
      ],
      cost: 'Class 2: $420-$1,070 | DL9: Free',
      timeframe: 'Class 2: 2-4 weeks processing | DL9: 1-2 weeks'
    },
    'solo-endorsement': {
      ...requirement,
      icon: '🦅',
      fullDescription: 'Your instructor must provide a solo endorsement before your first solo flight.',
      requirements: [
        '✈️ Demonstrate consistent safe flying in training area',
        '🛬 Master circuit pattern and landing procedures',
        '📋 Pass pre-solo knowledge test with instructor',
        '🎯 Show proficiency in emergency procedures',
        '📄 Complete required paperwork and endorsements'
      ],
      nextSteps: [
        'Focus on consistency during dual instruction',
        'Study emergency procedures thoroughly',
        'Ask instructor about solo readiness requirements',
        'Complete any additional practice as recommended'
      ],
      cost: 'No additional cost - part of regular instruction',
      timeframe: 'Typically at 10-15 hours dual instruction'
    },
    'theory-exams': {
      ...requirement,
      icon: '📚',
      fullDescription: 'Complete all six CAA theory examinations required for PPL.',
      requirements: [
        '📖 Air Law: Aviation regulations and procedures (70% required)',
        '🧭 Navigation: Chart reading, flight planning, radio aids (70% required)',
        '⚙️ Technical Knowledge: Aircraft systems and performance (70% required)',
        '🧠 Human Factors: Decision making and physiology (70% required)',
        '🌤️ Meteorology: Weather theory and interpretation (70% required)',
        '📻 Radio Telephony: Communication procedures and phraseology (70% required)'
      ],
      nextSteps: [
        'Purchase official CAA study materials',
        'Schedule theory training with flight school',
        'Book exams through CAA when ready',
        'Study consistently - each exam requires 20-40 hours preparation'
      ],
      cost: '$65 per exam × 6 exams = $390 total',
      timeframe: '6-12 months depending on study pace'
    }
  }

  return details[requirement.id as keyof typeof details] || {
    ...requirement,
    icon: 'ℹ️',
    fullDescription: requirement.description,
    requirements: ['Contact your flight instructor for more information'],
    nextSteps: ['Discuss this requirement with your instructor'],
    cost: 'Varies',
    timeframe: 'Consult with instructor'
  }
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