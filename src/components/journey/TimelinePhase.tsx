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
    completed: 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-400 text-green-900 shadow-green-100',
    current: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-400 text-blue-900 shadow-blue-200 ring-2 ring-blue-200 shadow-lg',
    upcoming: 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-300 text-gray-700 hover:shadow-md'
  }

  return (
    <div
      className={`flex-shrink-0 w-72 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm ${
        statusClasses[getPhaseStatus()]
      }`}
      onClick={onClick}
      data-testid={`phase-${phase.id}`}
    >
      {/* Phase Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
          }`} />
          <h3 className="font-bold text-xl">{phase.name}</h3>
        </div>
        <div className="text-sm font-medium opacity-80 bg-white/50 rounded-full px-3 py-1 inline-block">
          {phase.hourRange.min}-{phase.hourRange.max} hours
        </div>
      </div>

      {/* Progress Bar */}
      {isActive && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-blue-700">Progress</span>
            <span className="text-xs font-bold text-blue-800">{phaseProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-3 shadow-inner" data-testid="phase-progress-bar">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Phase Description */}
      <p className="text-sm mb-4 leading-relaxed font-medium opacity-90 bg-white/30 rounded-lg p-3">
        {phase.description}
      </p>

      {/* Milestones Preview */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-70 mb-3">Key Milestones</h4>
        {phase.milestones.slice(0, 2).map((milestone, index) => {
          const isUnlocked = progress.achievements.some(a => a.title === milestone)
          
          return (
            <div 
              key={milestone}
              className={`text-xs p-3 rounded-lg border transition-all duration-200 ${
                isUnlocked 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200 shadow-sm' 
                  : 'bg-white/60 text-gray-700 border-gray-200 hover:bg-white/80'
              }`}
              data-testid={`phase-preview-milestone-${milestone.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                  isUnlocked ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {isUnlocked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span className="font-semibold">{milestone}</span>
              </div>
              {isUnlocked && (
                <div className="text-xs opacity-75 mt-2 ml-6 font-medium" data-testid={`phase-preview-milestone-${milestone.toLowerCase().replace(/\s+/g, '-')}-date`}>
                  ✓ Completed
                </div>
              )}
            </div>
          )
        })}
        
        {phase.milestones.length > 2 && (
          <div className="text-xs font-medium text-center pt-2 opacity-70 bg-white/40 rounded-lg py-2">
            +{phase.milestones.length - 2} more milestones
          </div>
        )}
      </div>

      {/* Phase Status Indicator */}
      <div className="mt-4 pt-4 border-t border-white/30">
        <div className={`text-xs font-bold text-center py-2 px-4 rounded-full ${
          isCompleted 
            ? 'bg-green-500 text-white shadow-md' 
            : isActive 
            ? 'bg-blue-500 text-white shadow-md animate-pulse' 
            : 'bg-gray-400 text-white/90'
        }`}>
          {isCompleted && '✓ COMPLETED'}
          {isActive && '🎯 CURRENT PHASE'}
          {!isCompleted && !isActive && '🔒 UPCOMING'}
        </div>
      </div>
    </div>
  )
}