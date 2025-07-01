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

  const getStatusClass = () => {
    if (isCompleted) return 'bg-green-50 border-green-400'
    if (isActive) return 'bg-blue-50 border-blue-400'
    return 'bg-gray-50 border-gray-300'
  }

  return (
    <div
      className={`card cursor-pointer mr-4 ${getStatusClass()}`}
      onClick={onClick}
      data-testid={`phase-${phase.id}`}
      style={{ minWidth: '280px' }}
    >
      {/* Phase Header */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className={`w-3 h-3 rounded-full mr-3 ${
            isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
          }`} />
          <h3 className="font-bold text-xl">{phase.name}</h3>
        </div>
        <div className="text-sm font-medium">
          {phase.hourRange.min}-{phase.hourRange.max} hours
        </div>
      </div>

      {/* Progress Bar */}
      {isActive && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold">Progress</span>
            <span className="text-xs font-bold">{phaseProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2" data-testid="phase-progress-bar">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Phase Description */}
      <p className="text-sm mb-4">
        {phase.description}
      </p>

      {/* Milestones Preview */}
      <div className="mb-4">
        <h4 className="text-xs font-bold mb-3">Key Milestones</h4>
        {phase.milestones.slice(0, 2).map((milestone, index) => {
          const isUnlocked = progress.achievements.some(a => a.title === milestone)
          
          return (
            <div 
              key={milestone}
              className={`text-xs p-3 mb-2 border ${
                isUnlocked 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200'
              }`}
              data-testid={`phase-preview-milestone-${milestone.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  isUnlocked ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                </div>
                <span className="font-semibold">{milestone}</span>
              </div>
              {isUnlocked && (
                <div className="text-xs mt-2 pl-6 font-medium" data-testid={`phase-preview-milestone-${milestone.toLowerCase().replace(/\s+/g, '-')}-date`}>
                  ✓ Completed
                </div>
              )}
            </div>
          )
        })}
        
        {phase.milestones.length > 2 && (
          <div className="text-xs font-medium text-center p-2 bg-gray-100" style={{ borderRadius: 'var(--radius-md)' }}>
            +{phase.milestones.length - 2} more milestones
          </div>
        )}
      </div>

      {/* Phase Status Indicator */}
      <div className="mt-4">
        <div className={`text-xs font-bold text-center py-2 px-4 text-white ${
          isCompleted 
            ? 'bg-green-500' 
            : isActive 
            ? 'bg-blue-500' 
            : 'bg-gray-400'
        }`} style={{ borderRadius: 'var(--radius-xl)' }}>
          {isCompleted && '✓ COMPLETED'}
          {isActive && '🎯 CURRENT PHASE'}
          {!isCompleted && !isActive && '🔒 UPCOMING'}
        </div>
      </div>
    </div>
  )
}