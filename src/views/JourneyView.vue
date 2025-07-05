<template>
  <div>
    <div>
      <!-- Header -->
      <div>
        <div>
          <h1>🗺️ Your PPL Journey</h1>
          <p>
            Track your progress through the Private Pilot License training program
          </p>
        </div>
        <button 
          @click="showHoursEducation = true"
          data-testid="flight-hours-education-button"
        >
          ⏱️ Hours Guide
        </button>
      </div>

      <!-- Training Progress Summary -->
      <div data-testid="training-summary">
        <h2>Training Progress Summary</h2>
        
        <!-- Current Status -->
        <div data-testid="current-status">
          <h3>Current Status</h3>
          <div>
            <div>Current Lesson: {{ progress.currentLesson }}</div>
            <div>Completed Lessons: {{ progress.completedLessons.length }}/27</div>
            <div>Total Flight Hours: {{ progress.flightHours.total }}/50</div>
            <div>Achievements Earned: {{ progress.achievements.length }}/12</div>
          </div>
        </div>

        <!-- Training Phases Overview -->
        <div data-testid="phases-overview">
          <h3>Training Phases</h3>
          <div>
            <div v-for="phase in trainingPhases" :key="phase.id">
              <div>
                <span>{{ phase.icon }}</span>
                <strong>{{ phase.name }}</strong>
                <span>({{ phase.lessons }})</span>
              </div>
              <div>{{ phase.description }}</div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div data-testid="next-steps">
          <h3>Next Steps</h3>
          <div>{{ nextStepsMessage }}</div>
        </div>
      </div>
    </div>

    <!-- Flight Hours Education Modal -->
    <div v-if="showHoursEducation" data-testid="hours-education-modal" @click="showHoursEducation = false">
      <div @click.stop>
        <div>
          <h3>✈️ Understanding Flight Hours</h3>
          <button @click="showHoursEducation = false">×</button>
        </div>
        
        <div>
          <h4>NZ PPL Hour Requirements</h4>
          <p>To obtain your PPL(A) in New Zealand, you need <strong>minimum 50 hours</strong> total flight time:</p>
          
          <ul>
            <li><strong>35 hours dual instruction</strong> - Flying with an instructor</li>
            <li><strong>10 hours solo flight</strong> - Flying alone (after solo endorsement)</li>
            <li><strong>5 hours cross-country solo</strong> - Navigation flights over 150nm</li>
            <li><strong>5 hours terrain awareness</strong> - NZ mountain flying requirement</li>
            <li><strong>5 hours night flying</strong> - Optional night rating (recommended)</li>
          </ul>
          
          <h4>Hour Categories Explained</h4>
          <div>
            <div>
              <strong>Dual Hours:</strong> Flight time with a certified instructor. Required for learning new skills and regulatory compliance.
            </div>
            <div>
              <strong>Solo Hours:</strong> Flight time alone after receiving solo endorsement. Builds confidence and independence.
            </div>
            <div>
              <strong>Cross-Country:</strong> Navigation flights between different airports. Essential for developing pilotage skills.
            </div>
            <div>
              <strong>Terrain Awareness:</strong> Mandatory NZ training for mountain flying and hazardous terrain recognition.
            </div>
          </div>
          
          <button @click="showHoursEducation = false">
            Got it!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Progress tracking
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
  totalSpent: 0
})

// Modals
const showHoursEducation = ref(false)

// Training phases data
const trainingPhases = [
  {
    id: 'foundation',
    name: 'Foundation',
    icon: '🏗️',
    lessons: 'Lessons 1-5',
    description: 'Basic aircraft handling, controls, and initial solo preparation'
  },
  {
    id: 'skills',
    name: 'Skills Development', 
    icon: '🎯',
    lessons: 'Lessons 6-15',
    description: 'Circuit training, emergency procedures, and advanced maneuvers'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: '🧭', 
    lessons: 'Lessons 16-22',
    description: 'Cross-country flying, navigation techniques, and radio procedures'
  },
  {
    id: 'advanced',
    name: 'Advanced Training',
    icon: '🚁',
    lessons: 'Lessons 23-27', 
    description: 'Night flying, terrain awareness, and flight test preparation'
  }
]

// Computed properties
const nextStepsMessage = computed(() => {
  if (progress.value.currentLesson <= 5) {
    return 'Focus on mastering basic aircraft control and safety procedures. Practice pre-flight checks and radio communications.'
  } else if (progress.value.currentLesson <= 15) {
    return 'Develop circuit proficiency and emergency procedures. Work toward your first solo flight milestone.'
  } else if (progress.value.currentLesson <= 22) {
    return 'Build cross-country navigation skills. Plan and execute solo navigation flights to build experience.'
  } else {
    return 'Prepare for your flight test. Review all maneuvers and ensure regulatory requirements are complete.'
  }
})

// Load progress data
onMounted(() => {
  const savedProgress = localStorage.getItem('ppl-quest-progress')
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress)
    progress.value = parsed
  }
})
</script>