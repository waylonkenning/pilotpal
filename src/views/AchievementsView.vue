<template>
  <div class="app-layout" data-testid="achievements-view">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">🏆 Achievement Badges</h1>
            <p class="text-sm opacity-60">
              Track your progress and celebrate milestones on your PPL journey
            </p>
          </div>
          <div class="status-dot"></div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">

        <!-- Achievement Stats -->
        <div class="card card-elevated mb-xl" data-testid="achievement-stats">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📊</div>
            <div>
              <h2 class="font-bold">Your Progress</h2>
              <p class="text-sm opacity-80">Achievement unlocking status</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-md">
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm" data-testid="badges-earned">
                {{ earnedBadges.length }}
              </div>
              <div class="text-sm opacity-80">Earned</div>
              <div class="progress mt-sm">
                <div class="progress-bar" :style="{ width: (earnedBadges.length / totalBadges) * 100 + '%' }"></div>
              </div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm" data-testid="badges-available">
                {{ totalBadges }}
              </div>
              <div class="text-sm opacity-80">Available</div>
              <div class="badge badge-primary mt-sm">Total</div>
            </div>
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm" data-testid="completion-percentage">
                {{ Math.round((earnedBadges.length / totalBadges) * 100) }}%
              </div>
              <div class="text-sm opacity-80">Complete</div>
              <div class="badge badge-success mt-sm">Progress</div>
            </div>
          </div>
        </div>

        <!-- Foundation Badges -->
        <div class="card card-elevated mb-xl" data-testid="foundation-badges">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">🛫</div>
            <h2 class="font-bold">Foundation</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div v-for="badge in foundationBadges" :key="badge.id" 
                 class="card card-compact"
                 :class="{ 'bg-success': isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-2xl mb-sm">{{ badge.icon }}</div>
              <div class="font-medium mb-sm">{{ badge.name }}</div>
              <div class="text-sm opacity-80 mb-md">{{ badge.description }}</div>
              <div class="badge" :class="isEarned(badge.id) ? 'badge-success' : 'badge-secondary'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Badges -->
        <div class="card card-elevated mb-xl" data-testid="skills-badges">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">⚡</div>
            <h2 class="font-bold">Skills</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div v-for="badge in skillsBadges" :key="badge.id" 
                 class="card card-compact"
                 :class="{ 'bg-primary': isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-2xl mb-sm">{{ badge.icon }}</div>
              <div class="font-medium mb-sm">{{ badge.name }}</div>
              <div class="text-sm opacity-80 mb-md">{{ badge.description }}</div>
              <div class="badge" :class="isEarned(badge.id) ? 'badge-success' : 'badge-secondary'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Knowledge Badges -->
        <div class="card card-elevated mb-xl" data-testid="knowledge-badges">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📚</div>
            <h2 class="font-bold">Knowledge</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div v-for="badge in knowledgeBadges" :key="badge.id" 
                 class="card card-compact"
                 :class="{ 'bg-warning': isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-2xl mb-sm">{{ badge.icon }}</div>
              <div class="font-medium mb-sm">{{ badge.name }}</div>
              <div class="text-sm opacity-80 mb-md">{{ badge.description }}</div>
              <div class="badge" :class="isEarned(badge.id) ? 'badge-success' : 'badge-secondary'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
            </div>
          </div>
        </div>

        <!-- Special Badges -->
        <div class="card card-elevated mb-xl" data-testid="special-badges">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">⭐</div>
            <h2 class="font-bold">Special</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div v-for="badge in specialBadges" :key="badge.id" 
                 class="card card-compact"
                 :class="{ 'bg-purple': isEarned(badge.id) }"
                 :data-testid="badge.id + '-badge'">
              <div class="text-2xl mb-sm">{{ badge.icon }}</div>
              <div class="font-medium mb-sm">{{ badge.name }}</div>
              <div class="text-sm opacity-80 mb-md">{{ badge.description }}</div>
              <div class="badge" :class="isEarned(badge.id) ? 'badge-success' : 'badge-secondary'">
                {{ isEarned(badge.id) ? '✅ Earned' : badge.requirement }}
              </div>
              <div v-if="badge.rarity" class="badge badge-purple mt-sm">
                {{ badge.rarity }}
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Dashboard -->
        <div class="text-center">
          <router-link to="/dashboard" class="btn btn-secondary" data-testid="back-to-dashboard">
            ← Back to Dashboard
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
.bg-success {
  background: var(--gradient-success) !important;
  color: var(--text-inverse) !important;
}

.bg-primary {
  background: var(--gradient-primary) !important;
  color: var(--text-inverse) !important;
}

.bg-warning {
  background: var(--gradient-warning) !important;
  color: var(--text-inverse) !important;
}

.bg-purple {
  background: var(--gradient-purple) !important;
  color: var(--text-inverse) !important;
}
</style>