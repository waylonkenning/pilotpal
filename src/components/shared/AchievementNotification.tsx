'use client'

import { useEffect } from 'react'
import { Achievement } from '@/types'

interface AchievementNotificationProps {
  achievement: Achievement | null
  onClose: () => void
}

export default function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Auto close after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div 
        className="bg-green-600 text-white p-4 rounded-lg shadow-lg border-l-4 border-green-800"
        data-testid="achievement-notification"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl" role="img" aria-label={achievement.title}>
            {achievement.badgeIcon}
          </span>
          <div className="flex-1">
            <h4 className="font-semibold">
              {achievement.title} badge unlocked!
            </h4>
            <p className="text-sm opacity-90 mt-1">
              {achievement.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}