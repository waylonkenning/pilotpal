import { TrainingPhase, UserProgress } from '@/types'
import Modal from '@/components/shared/Modal'

interface PhaseDetailsProps {
  phase: TrainingPhase
  progress: UserProgress
  onClose: () => void
}

export default function PhaseDetails({ phase, progress, onClose }: PhaseDetailsProps) {
  const isCurrentPhase = progress.flightHours.total >= phase.hourRange.min && 
                         progress.flightHours.total < phase.hourRange.max
  const isCompleted = progress.flightHours.total >= phase.hourRange.max
  const hoursNeeded = Math.max(0, phase.hourRange.min - progress.flightHours.total)

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={phase.name}
      data-testid="phase-details"
    >
      <div className="space-y-6">
        {/* Phase Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-2" data-testid="phase-details-title">
            {phase.name}
          </h3>
          <div className="text-gray-600 mb-2" data-testid="phase-details-hours">
            {phase.hourRange.min}-{phase.hourRange.max} hours
          </div>
          <p className="text-gray-700" data-testid="phase-details-description">
            {phase.description}
          </p>
        </div>

        {/* Phase Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Status</h4>
          {isCompleted && (
            <div className="text-green-600 font-medium">
              ✓ Completed - You've mastered this phase!
            </div>
          )}
          {isCurrentPhase && (
            <div className="text-blue-600 font-medium">
              📍 Current Phase - You're currently working on this
            </div>
          )}
          {!isCompleted && !isCurrentPhase && (
            <div>
              <div className="text-gray-600 font-medium">
                🔒 Upcoming Phase
              </div>
              <div className="text-sm text-gray-500 mt-1" data-testid="phase-requirements">
                Complete {hoursNeeded.toFixed(0)} more hours to unlock
              </div>
            </div>
          )}
        </div>

        {/* Milestones */}
        <div data-testid="phase-milestones">
          <h4 className="font-semibold mb-3">Milestones & Achievements</h4>
          <div className="space-y-3">
            {phase.milestones.map((milestone) => {
              const achievement = progress.achievements.find(a => a.title === milestone)
              const isUnlocked = !!achievement
              
              return (
                <div 
                  key={milestone}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    isUnlocked 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200 incomplete'
                  }`}
                  data-testid={`milestone-${milestone.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUnlocked 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {isUnlocked ? '✓' : '○'}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-medium ${
                      isUnlocked ? 'text-green-800' : 'text-gray-700'
                    }`}>
                      {milestone}
                    </div>
                    {achievement && (
                      <div className="text-sm text-green-600 mt-1">
                        Unlocked on {achievement.unlockedAt.toLocaleDateString()}
                      </div>
                    )}
                    {!isUnlocked && (
                      <div className="text-sm text-gray-500 mt-1">
                        Complete the requirements to unlock this milestone
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cost Estimate */}
        <div className="bg-blue-50 rounded-lg p-4" data-testid="cost-tracking">
          <h4 className="font-semibold mb-2 text-blue-800">Cost Estimate</h4>
          <div className="text-blue-700">
            <div data-testid="phase-cost-estimate">
              Estimated cost for this phase: $5,000 - $8,000
            </div>
            <div className="text-sm mt-1 opacity-75">
              Based on average NZ flight training costs
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}