'use client'

import { useProgress } from '@/lib/useProgress'
import WelcomeScreen from '@/components/dashboard/WelcomeScreen'
import Dashboard from '@/components/dashboard/Dashboard'
import AchievementNotification from '@/components/shared/AchievementNotification'

export default function Home() {
  const { 
    progress, 
    isLoading, 
    newAchievement,
    startJourney, 
    logFlightHours,
    dismissAchievement 
  } = useProgress()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!progress || !progress.profile.name) {
    return <WelcomeScreen onStartJourney={startJourney} />
  }

  return (
    <>
      <Dashboard 
        progress={progress} 
        onLogFlightHours={logFlightHours}
      />
      
      <AchievementNotification
        achievement={newAchievement}
        onClose={dismissAchievement}
      />
    </>
  )
}