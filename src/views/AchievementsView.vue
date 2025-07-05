<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-4">🏆 Achievement Badges</h1>
        <p class="text-lg text-gray-600 mb-6">
          Track your progress and celebrate milestones on your PPL journey
        </p>
        
        <!-- Achievement Stats -->
        <div class="metro-card max-w-lg mx-auto mb-8" data-testid="achievement-stats">
          <div class="grid grid-cols-3 text-center">
            <div>
              <div class="text-2xl font-bold text-green-600" data-testid="badges-earned">
                {{ earnedBadges.length }}
              </div>
              <div class="text-sm text-gray-600">Earned</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-600" data-testid="badges-available">
                {{ totalBadges }}
              </div>
              <div class="text-sm text-gray-600">Available</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-orange-600" data-testid="completion-percentage">
                {{ Math.round((earnedBadges.length / totalBadges) * 100) }}%
              </div>
              <div class="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Badge Categories -->
      <div class="space-y-8">
        <!-- Foundation Badges -->
        <div class="metro-card" data-testid="foundation-badges">
          <h2 class="text-xl font-semibold mb-4 text-blue-600">🛫 Foundation</h2>
          <div class="grid grid-auto-fit gap-4">
            <div v-for="badge in foundationBadges" :key="badge.id" 
                 class="badge-card" 
                 :class="{ 'earned': isEarned(badge.id), 'locked': !isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-4xl mb-2">{{ badge.icon }}</div>
              <div class="font-semibold mb-1">{{ badge.name }}</div>
              <div class="text-sm text-gray-600 mb-2">{{ badge.description }}</div>
              <div class="text-xs" :class="isEarned(badge.id) ? 'text-green-600' : 'text-orange-600'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Badges -->
        <div class="metro-card" data-testid="skills-badges">
          <h2 class="text-xl font-semibold mb-4 text-green-600">⚡ Skills</h2>
          <div class="grid grid-auto-fit gap-4">
            <div v-for="badge in skillsBadges" :key="badge.id" 
                 class="badge-card" 
                 :class="{ 'earned': isEarned(badge.id), 'locked': !isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-4xl mb-2">{{ badge.icon }}</div>
              <div class="font-semibold mb-1">{{ badge.name }}</div>
              <div class="text-sm text-gray-600 mb-2">{{ badge.description }}</div>
              <div class="text-xs" :class="isEarned(badge.id) ? 'text-green-600' : 'text-orange-600'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Knowledge Badges -->
        <div class="metro-card" data-testid="knowledge-badges">
          <h2 class="text-xl font-semibold mb-4 text-purple-600">📚 Knowledge</h2>
          <div class="grid grid-auto-fit gap-4">
            <div v-for="badge in knowledgeBadges" :key="badge.id" 
                 class="badge-card" 
                 :class="{ 'earned': isEarned(badge.id), 'locked': !isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-4xl mb-2">{{ badge.icon }}</div>
              <div class="font-semibold mb-1">{{ badge.name }}</div>
              <div class="text-sm text-gray-600 mb-2">{{ badge.description }}</div>
              <div class="text-xs" :class="isEarned(badge.id) ? 'text-green-600' : 'text-orange-600'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Special Badges -->
        <div class="metro-card" data-testid="special-badges">
          <h2 class="text-xl font-semibold mb-4 text-orange-600">⭐ Special</h2>
          <div class="grid grid-auto-fit gap-4">
            <div v-for="badge in specialBadges" :key="badge.id" 
                 class="badge-card" 
                 :class="{ 'earned': isEarned(badge.id), 'locked': !isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-4xl mb-2">{{ badge.icon }}</div>
              <div class="font-semibold mb-1">{{ badge.name }}</div>
              <div class="text-sm text-gray-600 mb-2">{{ badge.description }}</div>
              <div class="text-xs" :class="isEarned(badge.id) ? 'text-green-600' : 'text-orange-600'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
              <div v-if="badge.rarity" class="text-xs font-bold text-purple-600 mt-1">
                {{ badge.rarity }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Dashboard -->
      <div class="text-center mt-16 mb-8 pt-8" style="margin-top: 4rem; padding-top: 2rem; margin-bottom: 2rem;">
        <router-link to="/dashboard" class="metro-button metro-button-primary" data-testid="back-to-dashboard">
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

<style scoped>
.badge-card {
  @apply p-4 border transition-all duration-300 text-center;
  border-radius: 0 !important;
}

.badge-card.earned {
  @apply bg-green-50 border-green-200;
  box-shadow: none !important;
}

.badge-card.locked {
  @apply bg-gray-50 border-gray-200 opacity-70;
}
</style>