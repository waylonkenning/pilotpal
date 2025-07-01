import { UserProgress } from '@/types'
import { CORE_BADGES } from '@/lib/constants'
import Card from '@/components/shared/Card'

interface NextMilestoneProps {
  progress: UserProgress
}

export default function NextMilestone({ progress }: NextMilestoneProps) {
  // Find the next badge to unlock
  const unlockedBadgeIds = progress.achievements.map(a => a.id)
  const nextBadge = CORE_BADGES.find(badge => !unlockedBadgeIds.includes(badge.id))

  if (!nextBadge) {
    return (
      <Card data-testid="next-milestone-card">
        <h3 className="text-lg font-semibold mb-2">🎉 All Core Milestones Complete!</h3>
        <p className="text-gray-600">Congratulations! You've earned your PPL(A)!</p>
      </Card>
    )
  }

  return (
    <Card data-testid="next-milestone-card">
      <h3 className="text-lg font-semibold mb-4">Next Milestone</h3>
      
      <div className="flex items-start gap-4">
        <div className="text-4xl" role="img" aria-label={nextBadge.title}>
          {nextBadge.icon}
        </div>
        
        <div className="flex-1">
          <h4 className="text-xl font-bold mb-2" data-testid="next-milestone-title">
            {nextBadge.title}
          </h4>
          <p className="text-gray-600 mb-4" data-testid="next-milestone-description">
            {nextBadge.description}
          </p>
          
          <div className="space-y-2">
            <h5 className="font-semibold text-sm">Requirements:</h5>
            {nextBadge.requirements.map((req, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
                {req.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}