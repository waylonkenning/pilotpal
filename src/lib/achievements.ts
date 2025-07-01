import { UserProgress, Achievement, FlightHours } from '@/types'
import { CORE_BADGES } from './constants'

export function checkForNewAchievements(
  oldProgress: UserProgress, 
  newProgress: UserProgress
): Achievement[] {
  const newAchievements: Achievement[] = []
  const unlockedBadgeIds = oldProgress.achievements.map(a => a.id)

  // Check each badge to see if it should be unlocked
  for (const badge of CORE_BADGES) {
    if (unlockedBadgeIds.includes(badge.id)) continue // Already unlocked

    let shouldUnlock = true

    // Check all requirements for this badge
    for (const requirement of badge.requirements) {
      switch (requirement.type) {
        case 'hours':
          const requiredHours = requirement.value as number
          if (newProgress.flightHours.total < requiredHours) {
            shouldUnlock = false
          }
          break

        case 'exam':
          // For theory exam requirements
          const allExamsPassed = Object.values(newProgress.theoryExams).every(exam => exam.passed)
          if (requirement.value === true && !allExamsPassed) {
            shouldUnlock = false
          }
          break

        default:
          // Other requirement types can be added later
          break
      }
    }

    if (shouldUnlock) {
      const achievement: Achievement = {
        id: badge.id,
        unlockedAt: new Date(),
        category: badge.category,
        title: badge.title,
        description: badge.description,
        badgeIcon: badge.icon,
        metadata: {}
      }
      newAchievements.push(achievement)
    }
  }

  return newAchievements
}

export function calculateTotalHours(hours: FlightHours): number {
  return hours.dual + hours.solo + hours.crossCountry + hours.instrument + hours.night
}

export function addFlightHours(existingHours: FlightHours, newHours: FlightHours): FlightHours {
  return {
    dual: existingHours.dual + newHours.dual,
    solo: existingHours.solo + newHours.solo,
    crossCountry: existingHours.crossCountry + newHours.crossCountry,
    instrument: existingHours.instrument + newHours.instrument,
    night: existingHours.night + newHours.night,
    total: 0 // Will be recalculated
  }
}