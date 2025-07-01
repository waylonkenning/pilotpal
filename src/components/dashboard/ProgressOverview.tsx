import { UserProgress } from '@/types'
import { TRAINING_PHASES, CORE_BADGES } from '@/lib/constants'
import Card from '@/components/shared/Card'

interface ProgressOverviewProps {
  progress: UserProgress
}

export default function ProgressOverview({ progress }: ProgressOverviewProps) {
  const currentPhase = TRAINING_PHASES.find(phase => 
    progress.flightHours.total >= phase.hourRange.min && 
    progress.flightHours.total < phase.hourRange.max
  ) || TRAINING_PHASES[0]

  const achievementCount = progress.achievements.length
  const totalAchievements = CORE_BADGES.length

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Flight Hours Card */}
      <Card data-testid="flight-hours-card">
        <h3 className="text-lg font-semibold mb-2">Flight Hours</h3>
        <div className="text-3xl font-bold text-blue-600 mb-2" data-testid="total-hours">
          {progress.flightHours.total.toFixed(1)}
        </div>
        <div className="text-sm text-gray-600">
          <div>Dual: {progress.flightHours.dual.toFixed(1)}h</div>
          <div>Solo: {progress.flightHours.solo.toFixed(1)}h</div>
          <div>Cross Country: {progress.flightHours.crossCountry.toFixed(1)}h</div>
        </div>
      </Card>

      {/* Current Phase Card */}
      <Card data-testid="current-phase-card">
        <h3 className="text-lg font-semibold mb-2">Current Phase</h3>
        <div className="text-xl font-bold mb-2" data-testid="current-phase">
          {currentPhase.name}
        </div>
        <div className="text-sm text-gray-600 mb-3">
          {currentPhase.description}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ 
              width: `${Math.min(
                ((progress.flightHours.total - currentPhase.hourRange.min) / 
                (currentPhase.hourRange.max - currentPhase.hourRange.min)) * 100, 
                100
              )}%` 
            }}
          />
        </div>
      </Card>

      {/* Achievements Card */}
      <Card data-testid="achievements-card">
        <h3 className="text-lg font-semibold mb-2">Achievements</h3>
        <div className="text-3xl font-bold text-green-600 mb-2" data-testid="achievements-count">
          {achievementCount} of {totalAchievements}
        </div>
        <div className="text-sm text-gray-600 mb-3">
          {achievementCount === 0 ? 'Start flying to unlock badges!' : 'Keep up the great work!'}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full" 
            style={{ width: `${(achievementCount / totalAchievements) * 100}%` }}
          />
        </div>
      </Card>
    </div>
  )
}