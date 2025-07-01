'use client'

import { useProgress } from '@/lib/useProgress'
import JourneyTimeline from '@/components/journey/JourneyTimeline'
import WelcomeScreen from '@/components/dashboard/WelcomeScreen'

export default function JourneyPage() {
  const { progress, isLoading, startJourney } = useProgress()

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

  return <JourneyTimeline progress={progress} />
}