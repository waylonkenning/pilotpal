<template>
  <div>
    <div>
      <!-- Header -->
      <div>
        <h1>🏆 Achievement Badges</h1>
        <p>
          Track your progress and celebrate milestones on your PPL journey
        </p>
        
        <!-- Achievement Stats -->
        <div data-testid="achievement-stats">
          <div>
            <div>
              <div data-testid="badges-earned">
                {{ earnedBadges.length }}
              </div>
              <div>Earned</div>
            </div>
            <div>
              <div data-testid="badges-available">
                {{ totalBadges }}
              </div>
              <div>Available</div>
            </div>
            <div>
              <div data-testid="completion-percentage">
                {{ Math.round((earnedBadges.length / totalBadges) * 100) }}%
              </div>
              <div>Complete</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Badge Categories -->
      <div>
        <!-- Foundation Badges -->
        <div data-testid="foundation-badges">
          <h2>🛫 Foundation</h2>
          <div>
            <div v-for="badge in foundationBadges" :key="badge.id" 
                 :data-testid="badge.id + '-badge'">
              <div>{{ badge.icon }}</div>
              <div>{{ badge.name }}</div>
              <div>{{ badge.description }}</div>
              <div>
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Badges -->
        <div data-testid="skills-badges">
          <h2>⚡ Skills</h2>
          <div>
            <div v-for="badge in skillsBadges" :key="badge.id" 
                 :data-testid="badge.id + '-badge'">
              <div>{{ badge.icon }}</div>
              <div>{{ badge.name }}</div>
              <div>{{ badge.description }}</div>
              <div>
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Knowledge Badges -->
        <div data-testid="knowledge-badges">
          <h2>📚 Knowledge</h2>
          <div>
            <div v-for="badge in knowledgeBadges" :key="badge.id" 
                 :data-testid="badge.id + '-badge'">
              <div>{{ badge.icon }}</div>
              <div>{{ badge.name }}</div>
              <div>{{ badge.description }}</div>
              <div>
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Special Badges -->
        <div data-testid="special-badges">
          <h2>⭐ Special</h2>
          <div>
            <div v-for="badge in specialBadges" :key="badge.id" 
                 :data-testid="badge.id + '-badge'">
              <div>{{ badge.icon }}</div>
              <div>{{ badge.name }}</div>
              <div>{{ badge.description }}</div>
              <div>
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
              <div v-if="badge.rarity">
                {{ badge.rarity }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Dashboard -->
      <div>
        <router-link to="/dashboard" data-testid="back-to-dashboard">
          ← Back to Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// State
const progress = ref({
  achievements: [] as string[],
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
  totalSpent: 0,
  theoryExams: {
    airLaw: { attempts: [], passed: false },
    navigation: { attempts: [], passed: false },
    technicalKnowledge: { attempts: [], passed: false },
    humanFactors: { attempts: [], passed: false },
    meteorology: { attempts: [], passed: false },
    radioTelephony: { attempts: [], passed: false }
  }
})

// Badge definitions
const foundationBadges = [
  {
    id: 'first-flight',
    name: 'First Flight',
    icon: '🛫',
    description: 'Complete your introductory flight',
    requirement: 'Log 0.5+ hours'
  },
  {
    id: 'controls-master',
    name: 'Controls Master',
    icon: '🎮',
    description: 'Master basic aircraft controls',
    requirement: '5+ hours dual instruction'
  },
  {
    id: 'circuit-master',
    name: 'Circuit Master',
    icon: '🔄',
    description: 'Complete multiple circuit lessons',
    requirement: 'Complete 3+ lessons'
  }
]

const skillsBadges = [
  {
    id: 'solo-wings',
    name: 'Solo Wings',
    icon: '🦅',
    description: 'Your first solo flight milestone',
    requirement: '0.5+ hours solo'
  },
  {
    id: 'navigation-pioneer',
    name: 'Navigation Pioneer',
    icon: '🧭',
    description: 'Navigate cross-country flights',
    requirement: '5+ hours cross country'
  },
  {
    id: 'instrument-rated',
    name: 'Instrument Rated',
    icon: '📊',
    description: 'Master instrument flying',
    requirement: '5+ hours instrument time'
  },
  {
    id: 'terrain-master',
    name: 'Terrain Master',
    icon: '🏔️',
    description: 'NZ terrain awareness training',
    requirement: '5+ hours terrain awareness'
  }
]

const knowledgeBadges = [
  {
    id: 'theory-scholar',
    name: 'Theory Scholar',
    icon: '📖',
    description: 'Pass your first theory exam',
    requirement: 'Pass 1+ theory exam'
  },
  {
    id: 'theory-master',
    name: 'Theory Master',
    icon: '🎓',
    description: 'Pass all required theory exams',
    requirement: 'Pass all 6 theory exams'
  }
]

const specialBadges = [
  {
    id: 'night-flyer',
    name: 'Night Flyer',
    icon: '🌙',
    description: 'Optional night flying qualification',
    requirement: '5+ hours night flying',
    rarity: 'Optional'
  },
  {
    id: 'big-spender',
    name: 'Big Spender',
    icon: '💰',
    description: 'Invest significantly in your training',
    requirement: 'Spend $10,000+',
    rarity: 'Rare'
  },
  {
    id: 'licensed-pilot',
    name: 'Licensed Pilot',
    icon: '👨‍✈️',
    description: 'Complete your PPL requirements',
    requirement: 'Complete all requirements',
    rarity: 'Ultimate'
  }
]

// Computed properties
const allBadges = computed(() => [
  ...foundationBadges,
  ...skillsBadges,
  ...knowledgeBadges,
  ...specialBadges
])

const totalBadges = computed(() => allBadges.value.length)

const earnedBadges = computed(() => 
  allBadges.value.filter(badge => progress.value.achievements.includes(badge.id))
)

// Methods
const isEarned = (badgeId: string) => {
  return progress.value.achievements.includes(badgeId)
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

