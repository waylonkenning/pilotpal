'use client'

import { useState } from 'react'
import { UserProgress, FlightHours } from '@/types'
import Navigation from './Navigation'
import ProgressOverview from './ProgressOverview'
import NextMilestone from './NextMilestone'
import FlightHoursModal from '@/components/tracking/FlightHoursModal'
import RecentFlights from '@/components/tracking/RecentFlights'

interface DashboardProps {
  progress: UserProgress
  onLogFlightHours: (hours: FlightHours, description: string, date: Date) => void
}

export default function Dashboard({ progress, onLogFlightHours }: DashboardProps) {
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false)

  const handleLogFlightHours = (hours: FlightHours, description: string, date: Date) => {
    onLogFlightHours(hours, description, date)
    setIsFlightModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6">
        {/* User Greeting */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" data-testid="user-greeting">
            Hello, {progress.profile.name}
          </h2>
          <p className="text-gray-600">
            Welcome back to your PPL journey! Here's your progress overview.
          </p>
        </div>

        {/* Progress Overview Cards */}
        <ProgressOverview progress={progress} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <NextMilestone progress={progress} />
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setIsFlightModalOpen(true)}
                className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                📝 Log Flight Hours
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                📚 Update Theory Progress
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                💰 Track Expenses
              </button>
            </div>
          </div>
        </div>

        {/* Recent Flights */}
        {progress.flightEntries.length > 0 && (
          <div className="mb-8">
            <RecentFlights flights={progress.flightEntries} />
          </div>
        )}
      </div>

      {/* Flight Hours Modal */}
      <FlightHoursModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
        onSave={handleLogFlightHours}
      />
    </div>
  )
}