<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="text-center flex-1">
          <h1 class="text-3xl font-bold mb-4">🗺️ Your PPL Journey</h1>
          <p class="text-lg text-gray-600">
            Visual progress tracking with interactive charts and timelines
          </p>
        </div>
        <button 
          @click="showHoursEducation = true"
          class="btn btn-secondary text-sm"
          data-testid="flight-hours-education-button"
        >
          ⏱️ Hours Guide
        </button>
      </div>

      <!-- Journey Timeline -->
      <div class="card mb-8" data-testid="journey-timeline">
        <h2 class="text-xl font-semibold mb-6">Training Phase Timeline</h2>
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute top-8 left-0 right-0 h-1 bg-gray-200"></div>
          <div class="absolute top-8 left-0 h-1 bg-blue-500 transition-all duration-500" 
               :style="{ width: phaseProgress + '%' }"></div>
          
          <!-- Phase Icons -->
          <div class="flex justify-between relative z-10">
            <div v-for="(phase, index) in trainingPhases" :key="phase.id" 
                 class="flex flex-col items-center">
              <div class="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 transition-all duration-300 cursor-pointer"
                   :class="getPhaseIconClass(index)"
                   :data-testid="phase.id + '-phase-icon'"
                   @mouseenter="showPhaseTooltip(phase, $event)"
                   @mouseleave="hidePhaseTooltip">
                {{ phase.icon }}
              </div>
              <div class="text-sm font-medium text-center max-w-20">{{ phase.name }}</div>
              <div class="text-xs text-gray-500 text-center">{{ phase.lessons }}</div>
            </div>
          </div>
        </div>
        
        <!-- Current Phase Indicator -->
        <div class="mt-6 p-4 bg-blue-50 rounded-lg" data-testid="current-phase-indicator">
          <div class="font-semibold text-blue-800">Current Phase: {{ currentPhase.name }}</div>
          <div class="text-blue-700">{{ currentPhase.description }}</div>
        </div>
        
        <!-- Lesson Progress Dots -->
        <div class="mt-6" data-testid="lesson-progress-dots">
          <div class="text-sm font-medium mb-3">Lesson Progress ({{ progress.completedLessons.length }}/27)</div>
          <div class="flex flex-wrap gap-2">
            <div v-for="lesson in 27" :key="lesson"
                 class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-125 flex items-center justify-center text-xs font-bold border-2"
                 :class="progress.completedLessons.includes(lesson) ? 'bg-green-500 text-white border-green-600' : 
                         lesson === progress.currentLesson ? 'bg-blue-500 text-white border-blue-600' : 'bg-gray-300 text-gray-600 border-gray-400'"
                 :data-testid="`lesson-${lesson}-node`"
                 :data-status="progress.completedLessons.includes(lesson) ? 'completed' : 
                              lesson === progress.currentLesson ? 'current' : 'locked'"
                 @mouseenter="showLessonTooltip(lesson, $event)"
                 @mouseleave="hideLessonTooltip"
                 @focus="showLessonTooltipOnFocus(lesson)"
                 @blur="hideLessonTooltip"
                 @keydown.enter="showLessonTooltipOnFocus(lesson)"
                 @keydown.space="showLessonTooltipOnFocus(lesson)"
                 tabindex="0"
                 style="min-width: 32px; min-height: 32px;">
              {{ lesson }}
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Wheels Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Flight Hours Progress Wheel -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">Flight Hours Progress</h3>
          <div class="flex flex-col items-center">
            <div class="relative w-48 h-48 mb-4 cursor-pointer" 
                 data-testid="flight-hours-wheel"
                 @mouseenter="showHoursTooltip($event)"
                 @mouseleave="hideHoursTooltip">
              <!-- SVG Circular Progress -->
              <svg class="w-48 h-48 transform -rotate-90" viewBox="0 0 144 144">
                <!-- Background Circle -->
                <circle cx="72" cy="72" r="64" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                <!-- Dual Hours Segment -->
                <circle cx="72" cy="72" r="64" stroke="#3b82f6" stroke-width="8" fill="none"
                        :stroke-dasharray="dualHoursCircumference"
                        :stroke-dashoffset="dualHoursOffset"
                        data-testid="dual-hours-segment"
                        class="transition-all duration-500"/>
                <!-- Solo Hours Segment -->
                <circle cx="72" cy="72" r="64" stroke="#10b981" stroke-width="8" fill="none"
                        :stroke-dasharray="soloHoursCircumference"
                        :stroke-dashoffset="soloHoursOffset"
                        data-testid="solo-hours-segment"
                        class="transition-all duration-500"/>
                <!-- Cross Country Segment -->
                <circle cx="72" cy="72" r="64" stroke="#f59e0b" stroke-width="8" fill="none"
                        :stroke-dasharray="crossCountryCircumference"
                        :stroke-dashoffset="crossCountryOffset"
                        data-testid="cross-country-segment"
                        class="transition-all duration-500"/>
              </svg>
              
              <!-- Center Text -->
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <div class="text-3xl font-bold" data-testid="hours-percentage">
                  {{ hoursPercentage }}%
                </div>
                <div class="text-sm text-gray-600">{{ progress.flightHours.total }}/50 hrs</div>
              </div>
            </div>
            
            <!-- Legend -->
            <div class="grid grid-cols-3 gap-2 text-sm">
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Dual: {{ progress.flightHours.dual }}h</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 bg-green-500 rounded"></div>
                <span>Solo: {{ progress.flightHours.solo }}h</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>XC: {{ progress.flightHours.crossCountry }}h</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievement Progress Wheel -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">Achievement Progress</h3>
          <div class="flex flex-col items-center">
            <div class="relative w-48 h-48 mb-4" data-testid="achievement-progress-wheel">
              <svg class="w-48 h-48 transform -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="64" stroke="#e5e7eb" stroke-width="12" fill="none"/>
                <circle cx="72" cy="72" r="64" stroke="#10b981" stroke-width="12" fill="none"
                        :stroke-dasharray="achievementCircumference"
                        :stroke-dashoffset="achievementOffset"
                        class="transition-all duration-500"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <div class="text-3xl font-bold text-green-600" data-testid="achievement-percentage">
                  {{ achievementPercentage }}%
                </div>
                <div class="text-sm text-gray-600">{{ progress.achievements.length }}/12 badges</div>
              </div>
            </div>
            
            <!-- Recent Achievements -->
            <div class="space-y-2 w-full">
              <div v-for="achievement in progress.achievements.slice(-3)" 
                   :key="achievement"
                   class="flex items-center gap-2 p-2 bg-green-50 rounded text-sm cursor-pointer"
                   data-testid="recent-achievement-item"
                   @mouseenter="showAchievementTooltip(allBadges.find(b => b.id === achievement) || {}, $event)"
                   @mouseleave="hideAchievementTooltip">
                <div class="text-lg">{{ getBadgeIcon(achievement) }}</div>
                <span class="font-medium">{{ getBadgeName(achievement) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lesson Progress Map -->
      <div class="card mb-8">
        <h3 class="text-lg font-semibold mb-4">Lesson Completion Map</h3>
        <div class="relative" data-testid="lesson-map">
          <!-- Connection Lines -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;" data-testid="lesson-connection-lines">
            <g v-for="i in 26" :key="'line-' + i">
              <line :x1="getLessonPosition(i).x + 20" 
                    :y1="getLessonPosition(i).y + 20"
                    :x2="getLessonPosition(i + 1).x + 20" 
                    :y2="getLessonPosition(i + 1).y + 20"
                    stroke="#d1d5db" 
                    stroke-width="2"
                    :data-testid="'lesson-connection-line-' + i"/>
            </g>
          </svg>
          
          <!-- Lesson Nodes -->
          <div class="relative" style="z-index: 2; height: 400px;">
            <div v-for="lessonNum in 27" :key="lessonNum"
                 class="absolute w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 cursor-pointer"
                 :class="getLessonNodeClass(lessonNum)"
                 :style="{ 
                   left: getLessonPosition(lessonNum).x + 'px',
                   top: getLessonPosition(lessonNum).y + 'px'
                 }"
                 :data-testid="`lesson-${lessonNum}-node`"
                 @mouseenter="showLessonTooltip(lessonNum, $event)"
                 @mouseleave="hideLessonTooltip">
              {{ lessonNum }}
            </div>
          </div>
        </div>
      </div>

      <!-- Budget vs Spending Comparison -->
      <div class="card mb-8">
        <h3 class="text-lg font-semibold mb-4">Budget vs Spending</h3>
        <div data-testid="budget-comparison-chart">
          <div class="space-y-4">
            <!-- Flight Training -->
            <div>
              <div class="flex justify-between mb-1">
                <span>Flight Training</span>
                <span>${{ getCategorySpending('flight-training') }} / $25,000</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4 cursor-pointer" 
                   data-testid="spending-progress-bar"
                   @mouseenter="showFinancialTooltip($event)"
                   @mouseleave="hideFinancialTooltip"
                   style="min-height: 48px;">
                <div class="h-4 rounded-full transition-all duration-300"
                     :class="getBudgetStatusColor('flight-training')"
                     :style="{ width: getSpendingPercentage('flight-training', 25000) + '%' }"></div>
              </div>
            </div>
            
            <!-- Theory Exams -->
            <div>
              <div class="flex justify-between mb-1">
                <span>Theory Exams</span>
                <span>${{ getCategorySpending('theory-exam') }} / $390</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4" data-testid="theory-exam-bar">
                <div class="h-4 rounded-full transition-all duration-300"
                     :class="getBudgetStatusColor('theory-exam')"
                     :style="{ width: getSpendingPercentage('theory-exam', 390) + '%' }"></div>
              </div>
            </div>
            
            <!-- Medical Certificate -->
            <div>
              <div class="flex justify-between mb-1">
                <span>Medical Certificate</span>
                <span>${{ getCategorySpending('medical') }} / $1,070</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4" data-testid="medical-cert-bar">
                <div class="h-4 rounded-full transition-all duration-300"
                     :class="getBudgetStatusColor('medical')"
                     :style="{ width: getSpendingPercentage('medical', 1070) + '%' }"></div>
              </div>
            </div>
          </div>
          
          <!-- Budget Status Indicator -->
          <div class="mt-4 p-3 rounded-lg" :class="overallBudgetStatusClass" data-testid="budget-status-color">
            <div class="font-semibold">Overall Budget Status</div>
            <div class="text-sm">{{ overallBudgetMessage }}</div>
          </div>
          
          <!-- Budget Limit Line -->
          <div class="mt-4 border-t-2 border-red-500 pt-2" data-testid="budget-limit-indicator">
            <div class="text-sm text-red-600 font-medium">Budget Limit: $30,000</div>
          </div>
        </div>
      </div>

      <!-- Requirements Status Grid -->
      <div class="card mb-8">
        <h3 class="text-lg font-semibold mb-4">Requirements Status</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="requirements-status-grid">
          <!-- Medical Certificate -->
          <div class="text-center p-4 rounded-lg border" :class="getRequirementStatusClass('medical')">
            <div class="text-3xl mb-2" data-testid="medical-cert-status-icon">
              {{ getRequirementIcon('medical') }}
            </div>
            <div class="font-medium">Medical Certificate</div>
            <div class="text-sm text-gray-600">{{ getRequirementStatus('medical') }}</div>
          </div>
          
          <!-- Theory Exams -->
          <div class="text-center p-4 rounded-lg border cursor-pointer" 
               :class="getRequirementStatusClass('theory')"
               data-testid="theory-progress-card"
               @mouseenter="showTheoryTooltip($event)"
               @mouseleave="hideTheoryTooltip"
               style="min-width: 48px; min-height: 48px;">
            <div class="text-3xl mb-2" data-testid="theory-progress-icons">
              {{ getRequirementIcon('theory') }}
            </div>
            <div class="font-medium">Theory Exams</div>
            <div class="text-sm text-gray-600" data-testid="theory-exam-progress">{{ passedExamsCount }}/6 passed</div>
          </div>
          
          <!-- FPP Status -->
          <div class="text-center p-4 rounded-lg border" :class="getRequirementStatusClass('fpp')">
            <div class="text-3xl mb-2" data-testid="fpp-status-icon">
              {{ getRequirementIcon('fpp') }}
            </div>
            <div class="font-medium">Flight Test (FPP)</div>
            <div class="text-sm text-gray-600">{{ getRequirementStatus('fpp') }}</div>
          </div>
          
          <!-- Hours Status -->
          <div class="text-center p-4 rounded-lg border" :class="getRequirementStatusClass('hours')">
            <div class="text-3xl mb-2">
              {{ getRequirementIcon('hours') }}
            </div>
            <div class="font-medium">Flight Hours</div>
            <div class="text-sm text-gray-600">{{ progress.flightHours.total }}/50 hours</div>
          </div>
        </div>
        
        <!-- Status Legend -->
        <div class="flex justify-center gap-6 mt-6 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span data-testid="not-started-icon">Not Started</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span data-testid="in-progress-icon">In Progress</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Completed</span>
          </div>
        </div>
      </div>

      <!-- Earned Badges Showcase -->
      <div class="card mb-8">
        <h3 class="text-lg font-semibold mb-4">Achievement Showcase</h3>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4" data-testid="earned-badges-showcase">
          <div v-for="badge in allBadges" :key="badge.id"
               class="text-center p-3 rounded-lg transition-all duration-300 cursor-pointer"
               :class="progress.achievements.includes(badge.id) ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-gray-50 border border-gray-200'"
               :data-testid="`${badge.id}-badge`"
               @mouseenter="showAchievementTooltip(badge, $event)"
               @mouseleave="hideAchievementTooltip"
               style="min-width: 48px; min-height: 48px;">
            <div class="text-3xl mb-2" :class="!progress.achievements.includes(badge.id) ? 'grayscale opacity-50' : ''">
              {{ badge.icon }}
            </div>
            <div class="text-sm font-medium">{{ badge.name }}</div>
            <div class="text-xs text-gray-600">{{ badge.description }}</div>
            
            <!-- Rarity Indicator -->
            <div v-if="progress.achievements.includes(badge.id)" 
                 class="mt-2 px-2 py-1 rounded text-xs"
                 :class="getBadgeRarityClass(badge.rarity)"
                 data-testid="badge-rarity-indicator">
              {{ badge.rarity }}
            </div>
          </div>
        </div>
        
        <!-- Milestones Section -->
        <div class="mt-6 p-4 bg-purple-50 rounded-lg">
          <div class="font-semibold text-purple-800 mb-2">Training Milestones</div>
          <div class="space-y-2">
            <div class="flex items-center gap-3 cursor-pointer"
                 data-testid="milestone-solo-flight"
                 @mouseenter="showMilestoneTooltip({ name: 'Solo Flight', description: 'First solo flight achievement', requirements: 'Medical certificate and solo endorsement' }, $event)"
                 @mouseleave="hideMilestoneTooltip">
              <div class="text-2xl">🦅</div>
              <div class="flex-1">
                <div class="font-medium">Solo Flight</div>
                <div class="text-sm text-gray-600">First solo milestone</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Next Badge Progress -->
        <div v-if="nextBadgeToUnlock" class="mt-6 p-4 bg-blue-50 rounded-lg" data-testid="next-badge-preview">
          <div class="font-semibold text-blue-800 mb-2">Next Badge to Unlock</div>
          <div class="flex items-center gap-4">
            <div class="text-4xl">{{ nextBadgeToUnlock.icon }}</div>
            <div class="flex-1">
              <div class="font-medium">{{ nextBadgeToUnlock.name }}</div>
              <div class="text-sm text-gray-600">{{ nextBadgeToUnlock.description }}</div>
              <div class="mt-2">
                <div class="flex justify-between text-sm mb-1">
                  <span>Progress:</span>
                  <span data-testid="next-badge-progress">{{ getNextBadgeProgress() }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                       :style="{ width: getNextBadgeProgress() + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Flight Path Visualization on Map -->
      <div class="card mb-8">
        <h3 class="text-lg font-semibold mb-4">New Zealand Flight Training Areas</h3>
        <div class="relative bg-blue-50 rounded-lg p-4 h-64" data-testid="nz-flight-map">
          <!-- Simplified NZ Map Outline -->
          <div class="absolute inset-4 bg-green-100 rounded-lg border-2 border-green-300">
            <div class="text-center pt-8 text-sm text-green-700">New Zealand Flight Training Areas</div>
            
            <!-- Training Area Markers -->
            <div class="absolute top-4 left-8 w-3 h-3 bg-red-500 rounded-full" data-testid="training-area-auckland" title="Auckland"></div>
            <div class="absolute top-12 right-12 w-3 h-3 bg-red-500 rounded-full" data-testid="training-area-hamilton" title="Hamilton"></div>
            <div class="absolute bottom-16 left-16 w-3 h-3 bg-red-500 rounded-full" data-testid="training-area-wellington" title="Wellington"></div>
            <div class="absolute bottom-8 right-8 w-3 h-3 bg-red-500 rounded-full" data-testid="training-area-christchurch" title="Christchurch"></div>
            
            <!-- Cross Country Routes -->
            <svg class="absolute inset-0 w-full h-full" data-testid="cross-country-routes">
              <line x1="32" y1="16" x2="80" y2="48" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5"/>
              <line x1="80" y1="48" x2="64" y2="128" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5"/>
              <line x1="64" y1="128" x2="160" y2="160" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5"/>
            </svg>
            
            <!-- Terrain Awareness Zones -->
            <div class="absolute top-8 left-12 w-16 h-12 bg-orange-200 border border-orange-400 rounded opacity-60" data-testid="terrain-awareness-zones" title="Mountain Region"></div>
            <div class="absolute bottom-12 right-16 w-12 h-8 bg-orange-200 border border-orange-400 rounded opacity-60" data-testid="terrain-awareness-zones" title="Alps Region"></div>
            
            <!-- Controlled Airspace -->
            <div class="absolute top-6 right-6 w-20 h-16 border-2 border-purple-400 rounded-full opacity-50" data-testid="controlled-airspace" title="Controlled Zone"></div>
            <div class="absolute bottom-20 left-8 w-16 h-12 border-2 border-purple-400 rounded-full opacity-50" data-testid="controlled-airspace" title="Terminal Area"></div>
          </div>
        </div>
      </div>

      <!-- Time-based Progress Animations -->
      <div class="card mb-8">
        <h3 class="text-lg font-semibold mb-4">Training Timeline Projections</h3>
        
        <!-- Completion Timeline Visual -->
        <div class="mb-6" data-testid="completion-timeline-visual">
          <div class="text-sm font-medium mb-2">Estimated Completion Timeline</div>
          <div class="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
            <!-- Timeline Animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-1000"
                 :style="{ width: (progress.completedLessons.length / 27) * 100 + '%' }"
                 data-testid="timeline-animation"></div>
            <div class="absolute inset-0 flex items-center justify-center text-white font-semibold">
              {{ Math.round((progress.completedLessons.length / 27) * 100) }}% Complete
            </div>
          </div>
        </div>
        
        <!-- Monthly Progress Chart -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="text-sm font-medium mb-3" data-testid="monthly-progress-chart">Monthly Progress Projection</div>
            <div class="space-y-2">
              <div v-for="month in 6" :key="month" class="flex items-center gap-2">
                <div class="text-xs w-16">Month {{ month }}</div>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                       :style="{ width: Math.min(month * 15, 100) + '%' }"></div>
                </div>
                <div class="text-xs">{{ Math.min(month * 4, 27) }} lessons</div>
              </div>
            </div>
          </div>
          
          <!-- Seasonal Indicators -->
          <div>
            <div class="text-sm font-medium mb-3" data-testid="seasonal-indicators">Seasonal Training Considerations</div>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Summer: Ideal conditions, longer days</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span>Autumn: Variable weather, good visibility</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Winter: Limited hours, weather delays</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Spring: Improving conditions, turbulence</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pace Comparison -->
        <div class="mt-6" data-testid="pace-comparison">
          <div class="text-sm font-medium mb-3">Training Pace Options</div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-3 border rounded-lg">
              <div class="font-semibold text-green-600">Accelerated</div>
              <div class="text-sm text-gray-600">2-3 lessons/week</div>
              <div class="text-xs">Complete in 3-4 months</div>
            </div>
            <div class="p-3 border rounded-lg bg-blue-50 border-blue-300">
              <div class="font-semibold text-blue-600">Standard</div>
              <div class="text-sm text-gray-600">1-2 lessons/week</div>
              <div class="text-xs">Complete in 6-8 months</div>
            </div>
            <div class="p-3 border rounded-lg">
              <div class="font-semibold text-gray-600">Flexible</div>
              <div class="text-sm text-gray-600">1 lesson/week</div>
              <div class="text-xs">Complete in 8-12 months</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Optimized Elements -->
      <div class="block md:hidden">
        <!-- Mobile Progress Wheels -->
        <div class="card mb-8" data-testid="mobile-progress-wheels">
          <h3 class="text-lg font-semibold mb-4">Progress Overview</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-sm font-bold">{{ hoursPercentage }}%</span>
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium">Flight Hours</div>
                <div class="text-xs text-gray-600">{{ progress.flightHours.total }}/50 hours</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-sm font-bold">{{ achievementPercentage }}%</span>
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium">Achievements</div>
                <div class="text-xs text-gray-600">{{ progress.achievements.length }}/12 badges</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mobile Timeline Stack -->
        <div class="card mb-8" data-testid="mobile-timeline-stack">
          <h3 class="text-lg font-semibold mb-4">Training Phases</h3>
          <div class="space-y-3">
            <div v-for="(phase, index) in trainingPhases" :key="phase.id"
                 class="flex items-center gap-3 p-3 rounded-lg"
                 :class="getPhaseIconClass(index)">
              <div class="text-2xl">{{ phase.icon }}</div>
              <div class="flex-1">
                <div class="font-medium">{{ phase.name }}</div>
                <div class="text-xs text-gray-600">{{ phase.lessons }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Swipeable Lesson Cards -->
        <div class="card mb-8 overflow-x-auto" data-testid="swipeable-lesson-cards" style="overflow-x: auto !important;">
          <h3 class="text-lg font-semibold mb-4">📚 Lesson Progress</h3>
          <div class="relative">
            <!-- Horizontal scrollable lesson cards -->
            <div class="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
                 style="overflow-x: auto !important; scrollbar-width: none; -ms-overflow-style: none;"
                 ref="lessonCardsContainer">
              <div v-for="lesson in 27" :key="lesson"
                   class="flex-shrink-0 w-48 h-32 p-4 border-2 rounded-xl text-center cursor-pointer transition-all duration-300 hover:shadow-lg snap-center touch-manipulation"
                   :class="getLessonCardClass(lesson)"
                   :data-testid="`lesson-card-${lesson}`"
                   style="min-width: 48px; min-height: 48px;"
                   @click="showLessonDetails(lesson)"
                   @touchstart="handleTouchStart($event, lesson)"
                   @touchend="handleTouchEnd($event, lesson)">
                
                <!-- Lesson Number Badge -->
                <div class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-2 mx-auto"
                     :class="getLessonBadgeClass(lesson)">
                  {{ lesson }}
                </div>
                
                <!-- Lesson Title -->
                <div class="font-semibold text-sm mb-1" data-testid="lesson-card-title">
                  {{ getLessonName(lesson) }}
                </div>
                
                <!-- Lesson Status -->
                <div class="text-xs px-2 py-1 rounded-full" 
                     :class="getLessonStatusClass(lesson)"
                     data-testid="lesson-card-status">
                  {{ getLessonStatus(lesson) }}
                </div>
                
                <!-- Duration and Cost -->
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{{ getLessonDuration(lesson) }}</span>
                  <span>${{ getLessonCost(lesson) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Swipe Indicators -->
            <div class="flex justify-center mt-3 gap-1" data-testid="swipe-indicators">
              <div v-for="indicator in Math.ceil(27 / 5)" :key="indicator"
                   class="w-2 h-2 rounded-full transition-colors duration-300"
                   :class="indicator === currentCardPage ? 'bg-blue-500' : 'bg-gray-300'">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mobile Requirement Icons -->
        <div class="card mb-8" data-testid="mobile-requirement-icons">
          <h3 class="text-lg font-semibold mb-4">Requirements</h3>
          <div class="grid grid-cols-2 gap-3">
            <div class="text-center p-3 rounded-lg border">
              <div class="text-2xl mb-1">{{ getRequirementIcon('medical') }}</div>
              <div class="text-sm font-medium">Medical</div>
            </div>
            <div class="text-center p-3 rounded-lg border">
              <div class="text-2xl mb-1">{{ getRequirementIcon('theory') }}</div>
              <div class="text-sm font-medium">Theory</div>
            </div>
            <div class="text-center p-3 rounded-lg border">
              <div class="text-2xl mb-1">{{ getRequirementIcon('hours') }}</div>
              <div class="text-sm font-medium">Hours</div>
            </div>
            <div class="text-center p-3 rounded-lg border">
              <div class="text-2xl mb-1">{{ getRequirementIcon('fpp') }}</div>
              <div class="text-sm font-medium">Flight Test</div>
            </div>
          </div>
        </div>
        
        <!-- Touch Friendly Targets -->
        <div class="grid grid-cols-2 gap-4" data-testid="touch-friendly-targets">
          <div class="p-4 bg-blue-50 rounded-lg text-center" style="min-width: 48px; min-height: 48px;">
            <div class="text-2xl mb-2">✈️</div>
            <div class="text-sm font-medium">Lessons</div>
          </div>
          <div class="p-4 bg-green-50 rounded-lg text-center" style="min-width: 48px; min-height: 48px;">
            <div class="text-2xl mb-2">📊</div>
            <div class="text-sm font-medium">Progress</div>
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


    <!-- Phase Tooltip -->
    <div v-if="phaseTooltipVisible" 
         class="fixed bg-black bg-opacity-75 text-white p-3 rounded-lg text-sm pointer-events-none z-50"
         :style="phaseTooltipStyle"
         data-testid="phase-tooltip">
      <div class="font-semibold">{{ phaseTooltipPhase.name }}</div>
      <div>{{ phaseTooltipPhase.description }}</div>
      <div class="text-xs text-gray-300">Lessons {{ phaseTooltipPhase.lessons }}</div>
    </div>

    <!-- Hours Breakdown Tooltip -->
    <div v-if="hoursTooltipVisible" 
         class="fixed bg-black bg-opacity-75 text-white p-3 rounded-lg text-sm pointer-events-none z-50"
         :style="hoursTooltipStyle"
         data-testid="hours-breakdown-tooltip">
      <div class="font-semibold">Flight Hours Breakdown</div>
      <div>Dual: {{ progress.flightHours.dual }}h</div>
      <div>Solo: {{ progress.flightHours.solo }}h</div>
      <div>Cross Country: {{ progress.flightHours.crossCountry }}h</div>
      <div>Total: {{ progress.flightHours.total }}h / 50h required</div>
    </div>

    <!-- Hover Animations Container -->
    <div data-testid="hover-animation" class="hidden"></div>

    <!-- Hours Education Modal -->
    <div v-if="showHoursEducation" class="modal-overlay" @click="showHoursEducation = false">
      <div class="modal-content max-w-4xl" @click.stop data-testid="hours-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">⏱️ Flight Hours Requirements</h3>
          
          <!-- Minimum Hours -->
          <div class="bg-blue-50 p-4 rounded-lg mb-6" data-testid="minimum-hours-explanation">
            <h4 class="font-semibold text-blue-800 mb-2">📊 Minimum Hour Requirements</h4>
            <div class="text-blue-700">
              <p class="mb-2"><strong>Total Minimum:</strong> 50 hours flight time</p>
              <p class="text-sm">Most students require 60-80 hours to reach proficiency for the flight test.</p>
            </div>
          </div>

          <!-- Hour Types Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border rounded-lg p-4" data-testid="dual-hours-explanation">
              <h4 class="font-semibold text-green-600 mb-2">👨‍✈️ Dual Instruction Hours</h4>
              <div class="text-sm space-y-2">
                <p><strong>Minimum Required:</strong> 25 hours with instructor</p>
                <p>Covers basic flight maneuvers, emergency procedures, and cross-country navigation.</p>
              </div>
            </div>

            <div class="border rounded-lg p-4" data-testid="solo-hours-explanation">
              <h4 class="font-semibold text-purple-600 mb-2">🦅 Solo Flight Hours</h4>
              <div class="text-sm space-y-2">
                <p><strong>Minimum Required:</strong> 15 hours solo</p>
                <p>Includes 5 hours solo cross-country and local area practice.</p>
              </div>
            </div>

            <div class="border rounded-lg p-4 md:col-span-2" data-testid="cross-country-explanation">
              <h4 class="font-semibold text-orange-600 mb-2">🗺️ Cross-Country Requirements</h4>
              <div class="text-sm">
                <p><strong>Solo Cross-Country:</strong> 5 hours minimum including at least one flight over 150nm with 2 intermediate stops.</p>
              </div>
            </div>
          </div>

          <!-- NZ-Specific Requirements -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-green-50 p-4 rounded-lg" data-testid="nz-terrain-awareness-info">
              <h4 class="font-semibold text-green-800 mb-2">🏔️ NZ Terrain Awareness</h4>
              <div class="text-green-700 text-sm">
                <p>New Zealand's mountainous terrain requires specific training in mountain flying techniques and weather recognition.</p>
              </div>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg" data-testid="controlled-airspace-info">
              <h4 class="font-semibold text-purple-800 mb-2">🛂 Controlled Airspace</h4>
              <div class="text-purple-700 text-sm">
                <p>Training must include controlled airspace operations and ATC communication procedures.</p>
              </div>
            </div>
          </div>

          <!-- Hour Logging Guidance -->
          <div class="bg-yellow-50 p-4 rounded-lg mb-6" data-testid="hour-logging-guidance">
            <h4 class="font-semibold text-yellow-800 mb-2">📝 Hour Logging Guidelines</h4>
            <div class="text-yellow-700 text-sm">
              <p>Log all flight time from engine start to engine stop. Dual flights must be signed by instructor.</p>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showHoursEducation = false" class="btn btn-primary flex-1">
              Start Logging Hours
            </button>
            <router-link to="/education" class="btn btn-secondary">
              Education Center
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Lesson Tooltip -->
    <div v-if="tooltipVisible" 
         class="fixed z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg pointer-events-none"
         :style="tooltipStyle"
         data-testid="lesson-tooltip">
      <div class="font-semibold mb-1" data-testid="lesson-tooltip-title">
        Lesson {{ tooltipLesson }}: {{ getLessonName(tooltipLesson) }}
      </div>
      <div class="text-xs px-2 py-1 rounded mb-2" 
           :class="getLessonType(tooltipLesson) === 'Ground School' ? 'bg-orange-600 text-white' : 'bg-blue-600 text-white'"
           data-testid="lesson-type">
        {{ getLessonType(tooltipLesson) }}
      </div>
      <div class="text-sm text-gray-300 mb-2" data-testid="lesson-tooltip-description">
        {{ getLessonDescription(tooltipLesson) }}
      </div>
      <div class="flex items-center gap-2">
        <div class="text-xs px-2 py-1 rounded" 
             :class="getLessonStatusColor(tooltipLesson)"
             data-testid="lesson-tooltip-status">
          {{ getLessonStatus(tooltipLesson) }}
        </div>
        <div class="text-xs text-gray-400" data-testid="lesson-duration">
          {{ getLessonDuration(tooltipLesson) }}
        </div>
        <div class="text-xs text-green-400" data-testid="lesson-cost">
          ${{ getLessonCost(tooltipLesson) }}
        </div>
      </div>
      <div v-if="getLessonPrerequisites(tooltipLesson).length > 0" 
           class="mt-2 text-xs text-orange-300" 
           data-testid="lesson-prerequisites">
        Prerequisites: {{ getLessonPrerequisites(tooltipLesson).join(', ') }}
      </div>
      <div v-if="getLessonStatus(tooltipLesson) === 'Completed'" 
           class="mt-1 text-xs text-green-300" 
           data-testid="lesson-completion-date">
        Completed: {{ getLessonCompletionDate(tooltipLesson) }}
      </div>
      <div v-if="getLessonStatus(tooltipLesson) === 'Locked'" 
           class="mt-2 text-xs text-red-300" 
           data-testid="lesson-unlock-requirements">
        Unlock by: {{ getLessonUnlockRequirements(tooltipLesson) }}
      </div>
    </div>

    <!-- Phase Tooltip -->
    <div v-if="phaseTooltipVisible" 
         class="fixed z-50 bg-blue-900 text-white p-3 rounded-lg shadow-lg pointer-events-none"
         :style="phaseTooltipStyle"
         data-testid="phase-tooltip">
      <div class="font-semibold mb-1">{{ phaseTooltipPhase.name }} Phase</div>
      <div class="text-sm text-blue-200 mb-2">{{ phaseTooltipPhase.description }}</div>
      <div class="text-xs text-blue-300">
        Lessons {{ phaseTooltipPhase.lessons }}
      </div>
    </div>

    <!-- Hours Progress Tooltip -->
    <div v-if="hoursTooltipVisible" 
         class="fixed z-50 bg-green-900 text-white p-4 rounded-lg shadow-lg pointer-events-none"
         :style="hoursTooltipStyle"
         data-testid="progress-tooltip">
      <div class="font-semibold mb-2" data-testid="progress-tooltip-title">Flight Hours Progress</div>
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
        <div class="flex justify-between font-semibold border-t border-gray-600 pt-1">
          <span>Total Hours:</span>
          <span class="text-white">{{ progress.flightHours.total.toFixed(1) }}h / 50h min</span>
        </div>
      </div>
    </div>

    <!-- Theory Progress Tooltip -->
    <div v-if="theoryTooltipVisible" 
         class="fixed z-50 bg-purple-900 text-white p-3 rounded-lg shadow-lg pointer-events-none"
         :style="theoryTooltipStyle"
         data-testid="theory-tooltip">
      <div class="font-semibold mb-2">Theory Progress</div>
      <div class="space-y-1 text-sm" data-testid="theory-exam-details">
        <div class="flex justify-between">
          <span>Passed Exams:</span>
          <span class="text-green-300">{{ passedExamsCount }} / 6</span>
        </div>
        <div class="text-xs text-purple-200 mt-2">
          Complete all 6 theory exams before flight test
        </div>
      </div>
    </div>

    <!-- Achievement Badge Tooltip -->
    <div v-if="achievementTooltipVisible" 
         class="fixed z-50 bg-yellow-900 text-white p-3 rounded-lg shadow-lg pointer-events-none"
         :style="achievementTooltipStyle"
         data-testid="achievement-tooltip">
      <div class="font-semibold mb-1">{{ achievementTooltipBadge.name }}</div>
      <div class="text-sm text-yellow-200 mb-2" data-testid="achievement-description">
        {{ achievementTooltipBadge.description }}
      </div>
      <div class="text-xs text-yellow-300" data-testid="achievement-requirements">
        {{ getAchievementRequirements(achievementTooltipBadge.id) }}
      </div>
      <div class="text-xs px-2 py-1 rounded mt-2" 
           :class="getRarityColor(achievementTooltipBadge.rarity)">
        {{ achievementTooltipBadge.rarity }}
      </div>
    </div>

    <!-- Financial Progress Tooltip -->
    <div v-if="financialTooltipVisible" 
         class="fixed z-50 bg-orange-900 text-white p-4 rounded-lg shadow-lg pointer-events-none"
         :style="financialTooltipStyle"
         data-testid="financial-tooltip">
      <div class="font-semibold mb-2">Budget Progress</div>
      <div class="space-y-1 text-sm" data-testid="spending-breakdown">
        <div class="flex justify-between">
          <span>Flight Training:</span>
          <span class="text-blue-300">${{ getCategorySpending('flight-training').toFixed(0) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Theory Exams:</span>
          <span class="text-green-300">${{ getCategorySpending('theory-exam').toFixed(0) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Medical:</span>
          <span class="text-yellow-300">${{ getCategorySpending('medical').toFixed(0) }}</span>
        </div>
        <div class="flex justify-between font-semibold border-t border-orange-600 pt-1">
          <span>Total Spent:</span>
          <span class="text-white">${{ getTotalExpenses().toFixed(0) }}</span>
        </div>
      </div>
    </div>

    <!-- Milestone Tooltip -->
    <div v-if="milestoneTooltipVisible" 
         class="fixed z-50 bg-indigo-900 text-white p-3 rounded-lg shadow-lg pointer-events-none"
         :style="milestoneTooltipStyle"
         data-testid="milestone-tooltip">
      <div class="font-semibold mb-1">{{ milestoneTooltipData.name }} Milestone</div>
      <div class="text-sm text-indigo-200 mb-2">{{ milestoneTooltipData.description }}</div>
      <div class="text-xs text-indigo-300" data-testid="milestone-requirements">
        Requirements: {{ milestoneTooltipData.requirements }}
      </div>
    </div>

    <!-- Lesson Details Modal -->
    <div v-if="showLessonDetailsModal" class="modal-overlay" @click="hideLessonDetails">
      <div class="modal-content max-w-md" @click.stop data-testid="lesson-details-modal">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold" data-testid="lesson-details-title">
              Lesson {{ selectedLesson }}: {{ getLessonName(selectedLesson) }}
            </h3>
            <button @click="hideLessonDetails" class="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          
          <div class="space-y-4">
            <!-- Lesson Description -->
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">Description</h4>
              <p class="text-gray-600 text-sm" data-testid="lesson-details-description">
                {{ getLessonDescription(selectedLesson) }}
              </p>
            </div>
            
            <!-- Lesson Details -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="font-semibold text-gray-700 mb-1">Duration</h4>
                <p class="text-blue-600 font-medium" data-testid="lesson-details-duration">
                  {{ getLessonDuration(selectedLesson) }}
                </p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-1">Estimated Cost</h4>
                <p class="text-green-600 font-medium" data-testid="lesson-details-cost">
                  ${{ getLessonCost(selectedLesson) }}
                </p>
              </div>
            </div>
            
            <!-- Status -->
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">Status</h4>
              <div class="inline-block px-3 py-1 rounded-full text-sm"
                   :class="getLessonStatusColor(selectedLesson)">
                {{ getLessonStatus(selectedLesson) }}
              </div>
            </div>
            
            <!-- Prerequisites -->
            <div v-if="getLessonPrerequisites(selectedLesson).length > 0">
              <h4 class="font-semibold text-gray-700 mb-2">Prerequisites</h4>
              <ul class="text-sm text-gray-600">
                <li v-for="prereq in getLessonPrerequisites(selectedLesson)" :key="prereq"
                    class="mb-1">
                  • {{ prereq }}
                </li>
              </ul>
            </div>
            
            <!-- Action Button -->
            <div class="pt-4">
              <button v-if="getLessonStatus(selectedLesson) === 'Current'" 
                      class="w-full btn btn-primary"
                      @click="startLesson(selectedLesson)">
                Start This Lesson
              </button>
              <button v-else-if="getLessonStatus(selectedLesson) === 'Future'" 
                      class="w-full btn btn-secondary" disabled>
                Complete Prerequisites First
              </button>
              <button v-else 
                      class="w-full btn btn-secondary"
                      @click="reviewLesson(selectedLesson)">
                Review Lesson
              </button>
            </div>
          </div>
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
    total: 0,
    dual: 0,
    solo: 0,
    crossCountry: 0,
    instrument: 0,
    terrainAwareness: 0,
    night: 0
  },
  achievements: [] as string[],
  totalSpent: 0,
  medicalCertificate: null,
  theoryExams: {
    airLaw: { attempts: [], passed: false },
    navigation: { attempts: [], passed: false },
    technicalKnowledge: { attempts: [], passed: false },
    humanFactors: { attempts: [], passed: false },
    meteorology: { attempts: [], passed: false },
    radioTelephony: { attempts: [], passed: false }
  }
})

const expenses = ref<any[]>([])
const tooltipVisible = ref(false)
const tooltipLesson = ref(0)
const tooltipStyle = ref({})
const phaseTooltipVisible = ref(false)
const phaseTooltipPhase = ref<any>({})
const phaseTooltipStyle = ref({})
const hoursTooltipVisible = ref(false)
const hoursTooltipStyle = ref({})
const showHoursEducation = ref(false)

// Additional tooltip states
const theoryTooltipVisible = ref(false)
const theoryTooltipStyle = ref({})
const achievementTooltipVisible = ref(false)
const achievementTooltipStyle = ref({})
const achievementTooltipBadge = ref<any>({})
const financialTooltipVisible = ref(false)
const financialTooltipStyle = ref({})
const milestoneTooltipVisible = ref(false)
const milestoneTooltipStyle = ref({})
const milestoneTooltipData = ref<any>({})

// Mobile touch interaction state
const showLessonDetailsModal = ref(false)
const selectedLesson = ref(1)
const currentCardPage = ref(1)
const lessonCardsContainer = ref<HTMLElement | null>(null)
const touchStartTime = ref(0)
const touchStartX = ref(0)

// Training phases
const trainingPhases = [
  { id: 'foundation', name: 'Foundation', icon: '🛫', lessons: '1-5', description: 'Basic controls and aircraft familiarization' },
  { id: 'circuit', name: 'Circuit', icon: '🔄', lessons: '6-12', description: 'Pattern work and landing practice' },
  { id: 'navigation', name: 'Navigation', icon: '🧭', lessons: '13-20', description: 'Cross-country flying and navigation' },
  { id: 'advanced', name: 'Advanced', icon: '🎯', lessons: '21-25', description: 'Advanced maneuvers and scenarios' },
  { id: 'certification', name: 'Certification', icon: '👨‍✈️', lessons: '26-27', description: 'Final test preparation and checkride' }
]

// All available badges
const allBadges = [
  { id: 'first-flight', name: 'First Flight', icon: '🛫', description: 'Complete introductory flight', rarity: 'Common' },
  { id: 'controls-master', name: 'Controls Master', icon: '🎮', description: 'Master basic aircraft controls', rarity: 'Common' },
  { id: 'circuit-master', name: 'Circuit Master', icon: '🔄', description: 'Complete circuit lessons', rarity: 'Common' },
  { id: 'solo-wings', name: 'Solo Wings', icon: '🦅', description: 'First solo flight milestone', rarity: 'Rare' },
  { id: 'navigation-pioneer', name: 'Navigation Pioneer', icon: '🧭', description: 'Navigate cross-country flights', rarity: 'Rare' },
  { id: 'theory-scholar', name: 'Theory Scholar', icon: '📖', description: 'Pass first theory exam', rarity: 'Common' },
  { id: 'theory-master', name: 'Theory Master', icon: '🎓', description: 'Pass all theory exams', rarity: 'Epic' },
  { id: 'night-flyer', name: 'Night Flyer', icon: '🌙', description: 'Optional night flying', rarity: 'Rare' },
  { id: 'instrument-rated', name: 'Instrument Rated', icon: '📊', description: 'Master instrument flying', rarity: 'Epic' },
  { id: 'terrain-master', name: 'Terrain Master', icon: '🏔️', description: 'NZ terrain awareness', rarity: 'Rare' },
  { id: 'big-spender', name: 'Big Spender', icon: '💰', description: 'Invest significantly in training', rarity: 'Common' },
  { id: 'licensed-pilot', name: 'Licensed Pilot', icon: '👨‍✈️', description: 'Complete PPL requirements', rarity: 'Epic' }
]

// Computed properties
const currentPhase = computed(() => {
  const lesson = progress.value.currentLesson
  if (lesson <= 5) return trainingPhases[0]
  if (lesson <= 12) return trainingPhases[1]
  if (lesson <= 20) return trainingPhases[2]
  if (lesson <= 25) return trainingPhases[3]
  return trainingPhases[4]
})

const phaseProgress = computed(() => {
  const completed = progress.value.completedLessons.length
  return (completed / 27) * 100
})

const hoursPercentage = computed(() => {
  return Math.round((progress.value.flightHours.total / 50) * 100)
})

const achievementPercentage = computed(() => {
  return Math.round((progress.value.achievements.length / 12) * 100)
})

const passedExamsCount = computed(() => {
  return Object.values(progress.value.theoryExams).filter(exam => exam.passed).length
})

const nextBadgeToUnlock = computed(() => {
  return allBadges.find(badge => !progress.value.achievements.includes(badge.id))
})

// SVG Circle calculations
const radius = 64
const circumference = 2 * Math.PI * radius

const dualHoursCircumference = computed(() => {
  const percentage = Math.min(progress.value.flightHours.dual / 50, 1)
  return `${circumference * percentage} ${circumference}`
})

const dualHoursOffset = computed(() => {
  return circumference
})

const soloHoursCircumference = computed(() => {
  const percentage = Math.min(progress.value.flightHours.solo / 50, 1)
  return `${circumference * percentage} ${circumference}`
})

const soloHoursOffset = computed(() => {
  const dualPercentage = Math.min(progress.value.flightHours.dual / 50, 1)
  return circumference - (circumference * dualPercentage)
})

const crossCountryCircumference = computed(() => {
  const percentage = Math.min(progress.value.flightHours.crossCountry / 50, 1)
  return `${circumference * percentage} ${circumference}`
})

const crossCountryOffset = computed(() => {
  const dualPercentage = Math.min(progress.value.flightHours.dual / 50, 1)
  const soloPercentage = Math.min(progress.value.flightHours.solo / 50, 1)
  return circumference - (circumference * (dualPercentage + soloPercentage))
})

const achievementCircumference = computed(() => {
  const percentage = progress.value.achievements.length / 12
  return `${circumference * percentage} ${circumference}`
})

const achievementOffset = computed(() => {
  return circumference
})

const overallBudgetStatusClass = computed(() => {
  const spent = progress.value.totalSpent + getTotalExpenses()
  const budget = 30000
  const percentage = (spent / budget) * 100
  
  if (percentage < 50) return 'bg-green-50 text-green-800'
  if (percentage < 80) return 'bg-yellow-50 text-yellow-800'
  if (percentage < 100) return 'bg-orange-50 text-orange-800'
  return 'bg-red-50 text-red-800'
})

const overallBudgetMessage = computed(() => {
  const spent = progress.value.totalSpent + getTotalExpenses()
  const budget = 30000
  const percentage = (spent / budget) * 100
  
  if (percentage < 50) return 'Well within budget - great progress!'
  if (percentage < 80) return 'Good budget management - stay on track'
  if (percentage < 100) return 'Approaching budget limit - monitor spending'
  return 'Over budget - consider additional funding'
})

// Methods
const getPhaseIconClass = (index: number) => {
  const currentPhaseIndex = trainingPhases.findIndex(p => p.id === currentPhase.value.id)
  if (index < currentPhaseIndex) return 'bg-green-100 text-green-600 border-2 border-green-300'
  if (index === currentPhaseIndex) return 'bg-blue-100 text-blue-600 border-2 border-blue-300 ring-2 ring-blue-400'
  return 'bg-gray-100 text-gray-400 border-2 border-gray-300'
}

const getLessonPosition = (lessonNum: number) => {
  // Create a serpentine path for lessons
  const cols = 9
  const rowHeight = 60
  const colWidth = 60
  
  const row = Math.floor((lessonNum - 1) / cols)
  let col = (lessonNum - 1) % cols
  
  // Reverse direction on odd rows
  if (row % 2 === 1) {
    col = cols - 1 - col
  }
  
  return {
    x: col * colWidth + 20,
    y: row * rowHeight + 20
  }
}

const getLessonNodeClass = (lessonNum: number) => {
  if (progress.value.completedLessons.includes(lessonNum)) {
    return 'bg-green-500 text-white border-green-600'
  }
  if (lessonNum === progress.value.currentLesson) {
    return 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-400'
  }
  return 'bg-gray-200 text-gray-600 border-gray-300'
}

const getLessonNodeTestId = (lessonNum: number) => {
  if (progress.value.completedLessons.includes(lessonNum)) return 'completed-lesson-node'
  if (lessonNum === progress.value.currentLesson) return 'current-lesson-node'
  return 'future-lesson-node'
}

const getBadgeIcon = (badgeId: string) => {
  const badge = allBadges.find(b => b.id === badgeId)
  return badge ? badge.icon : '🏆'
}

const getBadgeName = (badgeId: string) => {
  const badge = allBadges.find(b => b.id === badgeId)
  return badge ? badge.name : badgeId
}

const getBadgeRarityClass = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'bg-gray-200 text-gray-700'
    case 'Rare': return 'bg-blue-200 text-blue-700'
    case 'Epic': return 'bg-purple-200 text-purple-700'
    default: return 'bg-gray-200 text-gray-700'
  }
}

const getCategorySpending = (category: string) => {
  return expenses.value
    .filter(expense => expense.category === category)
    .reduce((total, expense) => total + expense.amount, 0)
}

const getSpendingPercentage = (category: string, budget: number) => {
  const spent = getCategorySpending(category)
  return Math.min((spent / budget) * 100, 100)
}

const getBudgetStatusColor = (category: string) => {
  const budgets: Record<string, number> = {
    'flight-training': 25000,
    'theory-exam': 390,
    'medical': 1070
  }
  
  const spent = getCategorySpending(category)
  const budget = budgets[category] || 1000
  const percentage = (spent / budget) * 100
  
  if (percentage < 70) return 'bg-green-500'
  if (percentage < 90) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getTotalExpenses = () => {
  return expenses.value.reduce((total, expense) => total + expense.amount, 0)
}

const getRequirementIcon = (requirement: string) => {
  switch (requirement) {
    case 'medical': return progress.value.medicalCertificate ? '✅' : '❌'
    case 'theory': return passedExamsCount.value >= 6 ? '✅' : passedExamsCount.value > 0 ? '🔄' : '❌'
    case 'fpp': return progress.value.completedLessons.length >= 27 ? '✅' : '❌'
    case 'hours': return progress.value.flightHours.total >= 50 ? '✅' : progress.value.flightHours.total > 0 ? '🔄' : '❌'
    default: return '❌'
  }
}

const getRequirementStatus = (requirement: string) => {
  switch (requirement) {
    case 'medical': return progress.value.medicalCertificate ? 'Completed' : 'Not Started'
    case 'fpp': return progress.value.completedLessons.length >= 27 ? 'Completed' : 'Not Started'
    case 'hours': 
      if (progress.value.flightHours.total >= 50) return 'Completed'
      if (progress.value.flightHours.total > 0) return 'In Progress'
      return 'Not Started'
    default: return 'Not Started'
  }
}

const getRequirementStatusClass = (requirement: string) => {
  const status = getRequirementStatus(requirement)
  switch (status) {
    case 'Completed': return 'bg-green-50 border-green-300'
    case 'In Progress': return 'bg-yellow-50 border-yellow-300'
    default: return 'bg-red-50 border-red-300'
  }
}

const getLessonName = (lessonNum: number) => {
  const lessons = [
    'Introductory Flight', 'Aircraft Familiarization', 'Taxi Operations', 'Straight & Level',
    'Climbing & Descending', 'Turns', 'Slow Flight', 'Stalls', 'Emergency Procedures',
    'Circuit Pattern', 'Landing Practice', 'Solo Preparation', 'First Solo', 'Solo Practice',
    'Navigation Basics', 'Cross Country Planning', 'Radio Navigation', 'Cross Country Solo',
    'Advanced Navigation', 'Night Flying', 'Instrument Flying', 'Advanced Maneuvers',
    'Unusual Attitudes', 'Flight Test Prep', 'Mock Flight Test', 'Final Flight Test', 'License Issue'
  ]
  return lessons[lessonNum - 1] || `Lesson ${lessonNum}`
}

const getLessonStatus = (lessonNum: number) => {
  if (progress.value.completedLessons.includes(lessonNum)) return 'Completed'
  if (lessonNum === progress.value.currentLesson) return 'Current'
  if (lessonNum > progress.value.currentLesson + 1) return 'Locked'
  return 'Future'
}

const getNextBadgeProgress = () => {
  if (!nextBadgeToUnlock.value) return 0
  
  const badge = nextBadgeToUnlock.value
  switch (badge.id) {
    case 'first-flight': return progress.value.flightHours.total >= 0.5 ? 100 : 0
    case 'controls-master': return Math.min((progress.value.flightHours.dual / 5) * 100, 100)
    case 'circuit-master': return Math.min((progress.value.completedLessons.length / 3) * 100, 100)
    case 'solo-wings': return progress.value.flightHours.solo >= 0.5 ? 100 : 0
    case 'navigation-pioneer': return Math.min((progress.value.flightHours.crossCountry / 5) * 100, 100)
    case 'theory-scholar': return passedExamsCount.value >= 1 ? 100 : 0
    case 'theory-master': return Math.min((passedExamsCount.value / 6) * 100, 100)
    default: return 0
  }
}

const showLessonTooltip = (lessonNum: number, event: MouseEvent) => {
  tooltipLesson.value = lessonNum
  tooltipVisible.value = true
  
  // Better positioning with edge detection
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const tooltipWidth = 300 // estimated tooltip width
  const tooltipHeight = 150 // estimated tooltip height
  
  let left = event.clientX + 10
  let top = event.clientY - 50
  
  // Adjust if tooltip would go off right edge
  if (left + tooltipWidth > viewportWidth) {
    left = event.clientX - tooltipWidth - 10
  }
  
  // Adjust if tooltip would go off bottom edge
  if (top + tooltipHeight > viewportHeight) {
    top = event.clientY - tooltipHeight - 10
  }
  
  // Adjust if tooltip would go off top edge
  if (top < 0) {
    top = event.clientY + 10
  }
  
  tooltipStyle.value = {
    left: left + 'px',
    top: top + 'px'
  }
}

const hideLessonTooltip = () => {
  tooltipVisible.value = false
}

const showLessonTooltipOnFocus = (lessonNum: number) => {
  tooltipLesson.value = lessonNum
  tooltipVisible.value = true
  tooltipStyle.value = {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

const showPhaseTooltip = (phase: any, event: MouseEvent) => {
  phaseTooltipPhase.value = phase
  phaseTooltipVisible.value = true
  phaseTooltipStyle.value = {
    left: event.clientX + 10 + 'px',
    top: event.clientY - 50 + 'px'
  }
}

const hidePhaseTooltip = () => {
  phaseTooltipVisible.value = false
}

const showHoursTooltip = (event: MouseEvent) => {
  hoursTooltipVisible.value = true
  hoursTooltipStyle.value = {
    left: event.clientX + 10 + 'px',
    top: event.clientY - 80 + 'px'
  }
}

const hideHoursTooltip = () => {
  hoursTooltipVisible.value = false
}

// Additional tooltip methods
const getLessonType = (lessonNum: number) => {
  const groundSchoolLessons = [2, 9, 15, 16]
  return groundSchoolLessons.includes(lessonNum) ? 'Ground School' : 'Flight Training'
}

const getLessonDescription = (lessonNum: number) => {
  const descriptions = [
    'Your first flight experience with an instructor',
    'Learn about aircraft systems and controls',
    'Ground operations and taxi procedures',
    'Basic flight attitude control',
    'Altitude control and power management',
    'Banking and coordinated turns',
    'Flying at minimum controllable airspeed',
    'Stall recognition and recovery',
    'Emergency procedures and safety',
    'Traffic pattern and circuit procedures',
    'Approach and landing techniques',
    'Final preparation for solo flight',
    'Your first solo flight milestone',
    'Building solo experience and confidence',
    'Basic navigation and chart reading',
    'Flight planning and weather analysis',
    'VOR, GPS and radio navigation',
    'Solo cross-country navigation',
    'Advanced navigation techniques',
    'Night flying operations (optional)',
    'Basic instrument flying skills',
    'Advanced flight maneuvers',
    'Unusual attitude recovery',
    'Flight test preparation',
    'Practice flight test with instructor',
    'Official CAA flight test',
    'License issuance and celebration'
  ]
  return descriptions[lessonNum - 1] || `Training for lesson ${lessonNum}`
}

const getLessonDuration = (lessonNum: number) => {
  const durations = [
    '1.0h', '1.5h', '1.0h', '1.5h', '1.5h', '1.5h', '1.5h', '1.5h', '1.5h',
    '1.5h', '1.5h', '1.5h', '1.0h', '1.0h', '2.0h', '2.0h', '2.0h', '2.5h',
    '2.5h', '2.0h', '2.0h', '2.0h', '1.5h', '2.0h', '2.5h', '3.0h', '0.5h'
  ]
  return durations[lessonNum - 1] || '1.5h'
}

const getLessonCost = (lessonNum: number) => {
  const costs = [
    250, 300, 250, 300, 300, 300, 300, 300, 300,
    300, 300, 300, 200, 200, 400, 400, 400, 500,
    500, 400, 400, 400, 300, 400, 500, 600, 100
  ]
  return costs[lessonNum - 1] || 300
}

const getLessonStatusColor = (lessonNum: number) => {
  const status = getLessonStatus(lessonNum)
  return {
    'Completed': 'bg-green-600',
    'Current': 'bg-blue-600', 
    'In Progress': 'bg-yellow-600',
    'Future': 'bg-gray-600',
    'Locked': 'bg-red-600'
  }[status] || 'bg-gray-600'
}

const getLessonPrerequisites = (lessonNum: number) => {
  const prerequisites: Record<number, string[]> = {
    13: ['Medical Certificate', 'Solo endorsement'],
    15: ['Navigation theory'],
    18: ['Cross-country planning'],
    20: ['Night rating (optional)'],
    26: ['All theory exams', '50+ hours'],
    27: ['Flight test pass']
  }
  return prerequisites[lessonNum] || []
}

const getLessonCompletionDate = (lessonNum: number) => {
  // Mock completion date - in real app this would come from stored data
  return new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
}

const getLessonUnlockRequirements = (lessonNum: number) => {
  const requirements: Record<number, string> = {
    13: 'Complete medical certificate and get solo endorsement',
    15: 'Pass air law and navigation theory exams',
    18: 'Complete 5 hours cross-country with instructor',
    26: 'Pass all 6 theory exams and log 50+ flight hours',
    27: 'Pass flight test'
  }
  return requirements[lessonNum] || 'Complete previous lessons'
}

const showTheoryTooltip = (event: MouseEvent) => {
  theoryTooltipVisible.value = true
  theoryTooltipStyle.value = {
    left: event.clientX + 10 + 'px',
    top: event.clientY - 50 + 'px'
  }
}

const hideTheoryTooltip = () => {
  theoryTooltipVisible.value = false
}

const showAchievementTooltip = (badge: any, event: MouseEvent) => {
  achievementTooltipBadge.value = badge
  achievementTooltipVisible.value = true
  achievementTooltipStyle.value = {
    left: event.clientX + 10 + 'px',
    top: event.clientY - 50 + 'px'
  }
}

const hideAchievementTooltip = () => {
  achievementTooltipVisible.value = false
}

const showFinancialTooltip = (event: MouseEvent) => {
  financialTooltipVisible.value = true
  financialTooltipStyle.value = {
    left: event.clientX + 10 + 'px',
    top: event.clientY - 80 + 'px'
  }
}

const hideFinancialTooltip = () => {
  financialTooltipVisible.value = false
}

const showMilestoneTooltip = (milestone: any, event: MouseEvent) => {
  milestoneTooltipData.value = milestone
  milestoneTooltipVisible.value = true
  milestoneTooltipStyle.value = {
    left: event.clientX + 10 + 'px',
    top: event.clientY - 50 + 'px'
  }
}

const hideMilestoneTooltip = () => {
  milestoneTooltipVisible.value = false
}

const getAchievementRequirements = (badgeId: string) => {
  const requirements: Record<string, string> = {
    'first-flight': 'Complete your introductory flight',
    'controls-master': 'Master basic aircraft controls',
    'circuit-master': 'Complete multiple circuit lessons',
    'solo-wings': 'Complete first solo flight',
    'navigation-pioneer': 'Complete 5 hours cross-country',
    'theory-scholar': 'Pass your first theory exam',
    'theory-master': 'Pass all 6 theory exams',
    'night-flyer': 'Complete 5 hours night flying',
    'instrument-rated': 'Complete 5 hours instrument time',
    'terrain-master': 'Complete 5 hours terrain awareness',
    'big-spender': 'Spend over $10,000 on training',
    'licensed-pilot': 'Complete all PPL requirements'
  }
  return requirements[badgeId] || 'Requirements not specified'
}

const getRarityColor = (rarity: string) => {
  return {
    'Common': 'bg-gray-600',
    'Rare': 'bg-blue-600',
    'Epic': 'bg-purple-600'
  }[rarity] || 'bg-gray-600'
}

// Duplicate functions removed - they already exist earlier in the file

// Mobile touch interaction methods
const getLessonCardClass = (lessonNum: number) => {
  if (progress.value.completedLessons.includes(lessonNum)) {
    return 'border-green-500 bg-green-50 hover:bg-green-100'
  }
  if (lessonNum === progress.value.currentLesson) {
    return 'border-blue-500 bg-blue-50 hover:bg-blue-100 ring-2 ring-blue-200'
  }
  return 'border-gray-300 bg-gray-50 hover:bg-gray-100'
}

const getLessonBadgeClass = (lessonNum: number) => {
  if (progress.value.completedLessons.includes(lessonNum)) {
    return 'bg-green-500 text-white'
  }
  if (lessonNum === progress.value.currentLesson) {
    return 'bg-blue-500 text-white'
  }
  return 'bg-gray-300 text-gray-700'
}

const getLessonStatusClass = (lessonNum: number) => {
  const status = getLessonStatus(lessonNum)
  return {
    'Completed': 'bg-green-100 text-green-800',
    'Current': 'bg-blue-100 text-blue-800', 
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Future': 'bg-gray-100 text-gray-600',
    'Locked': 'bg-red-100 text-red-600'
  }[status] || 'bg-gray-100 text-gray-600'
}

const showLessonDetails = (lessonNum: number) => {
  selectedLesson.value = lessonNum
  showLessonDetailsModal.value = true
}

const hideLessonDetails = () => {
  showLessonDetailsModal.value = false
}

const handleTouchStart = (event: TouchEvent, lessonNum: number) => {
  touchStartTime.value = Date.now()
  touchStartX.value = event.touches[0].clientX
}

const handleTouchEnd = (event: TouchEvent, lessonNum: number) => {
  const touchEndTime = Date.now()
  const touchDuration = touchEndTime - touchStartTime.value
  
  // Short tap (< 300ms) - show lesson details
  if (touchDuration < 300) {
    showLessonDetails(lessonNum)
  }
  // Long press (> 500ms) - could show context menu in future
  else if (touchDuration > 500) {
    // Long press functionality can be added here
    console.log('Long press detected on lesson', lessonNum)
  }
}

const startLesson = (lessonNum: number) => {
  // Navigate to lesson start or show lesson completion modal
  hideLessonDetails()
  console.log('Starting lesson', lessonNum)
}

const reviewLesson = (lessonNum: number) => {
  // Navigate to lesson review
  hideLessonDetails()
  console.log('Reviewing lesson', lessonNum)
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

  // Load financial data
  const financial = localStorage.getItem('ppl-quest-financial')
  if (financial) {
    try {
      const data = JSON.parse(financial)
      expenses.value = data.expenses || []
    } catch (error) {
      console.error('Failed to load financial data:', error)
    }
  }
}

onMounted(() => {
  loadProgress()
  
  // Initialize some progress for testing
  if (progress.value.completedLessons.length === 0) {
    progress.value.completedLessons = [1, 2, 3]
    progress.value.currentLesson = 4
    progress.value.flightHours = {
      total: 12.5,
      dual: 8.5,
      solo: 2.0,
      crossCountry: 2.0,
      instrument: 0,
      terrainAwareness: 0,
      night: 0
    }
    progress.value.achievements = ['first-flight', 'controls-master']
  }
})
</script>

<style scoped>
.unlocked {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
  }
  to {
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.8);
  }
}
</style>