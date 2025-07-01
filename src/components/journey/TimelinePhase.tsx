import { TrainingPhase, UserProgress } from '@/types'

interface TimelinePhaseProps {
  phase: TrainingPhase
  progress: UserProgress
  isActive: boolean
  isCompleted: boolean
  onClick: () => void
  filter: 'all' | 'flight' | 'theory'
}

export default function TimelinePhase({ 
  phase, 
  progress, 
  isActive, 
  isCompleted, 
  onClick,
  filter 
}: TimelinePhaseProps) {
  const phaseProgress = isActive 
    ? Math.min(
        ((progress.flightHours.total - phase.hourRange.min) / 
        (phase.hourRange.max - phase.hourRange.min)) * 100, 
        100
      )
    : isCompleted ? 100 : 0

  const getPhaseStatus = () => {
    if (isCompleted) return 'completed'
    if (isActive) return 'current'
    return 'upcoming'
  }

  const statusClasses = {
    completed: 'bg-green-100 border-green-500 text-green-800',
    current: 'bg-blue-100 border-blue-500 text-blue-800 ring-2 ring-blue-200',
    upcoming: 'bg-gray-100 border-gray-300 text-gray-600'
  }

  return (
    <div
      className={`flex-shrink-0 w-64 p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
        statusClasses[getPhaseStatus()]
      }`}
      onClick={onClick}
      data-testid={`phase-${phase.id}`}
    >
      {/* Phase Header */}
      <div className="mb-3">
        <h3 className="font-bold text-lg">{phase.name}</h3>
        <div className="text-sm opacity-75">
          {phase.hourRange.min}-{phase.hourRange.max} hours
        </div>
      </div>

      {/* Progress Bar */}
      {isActive && (
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2" data-testid="phase-progress-bar">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
          <div className="text-xs mt-1 text-center">
            {phaseProgress.toFixed(0)}% complete
          </div>
        </div>
      )}

      {/* Phase Description */}
      <p className="text-sm mb-3 opacity-90">
        {phase.description}
      </p>

      {/* Milestones Preview */}
      <div className="space-y-1">
        {phase.milestones.slice(0, 2).map((milestone, index) => {
          const isUnlocked = progress.achievements.some(a => a.title === milestone)
          
          return (
            <div 
              key={milestone}
              className={`text-xs p-2 rounded ${
                isUnlocked 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-white bg-opacity-50'
              }`}
              data-testid={`phase-preview-milestone-${milestone.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isUnlocked ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                {milestone}
              </div>
              {isUnlocked && (
                <div className="text-xs opacity-75 mt-1" data-testid={`phase-preview-milestone-${milestone.toLowerCase().replace(/\s+/g, '-')}-date`}>
                  Completed
                </div>
              )}
            </div>
          )
        })}
        
        {phase.milestones.length > 2 && (
          <div className="text-xs opacity-75 text-center pt-1">
            +{phase.milestones.length - 2} more milestones
          </div>
        )}
      </div>

      {/* Phase Status Indicator */}
      <div className="mt-3 pt-3 border-t border-current border-opacity-20">
        <div className="text-xs font-medium text-center">
          {isCompleted && '✓ Completed'}
          {isActive && '📍 Current Phase'}
          {!isCompleted && !isActive && '🔒 Upcoming'}
        </div>
      </div>
    </div>
  )
}