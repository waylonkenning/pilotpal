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
    <div className="min-h-screen gradient-primary pb-mobile-nav">
      <Navigation />
      
      <div className="container">
        {/* User Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" data-testid="user-greeting">
            Hello, {progress.profile.name}
          </h2>
          <p className="text-sm md:text-base">
            Welcome back to your PPL journey! Here's your progress overview.
          </p>
        </div>

        {/* Progress Overview Cards */}
        <ProgressOverview progress={progress} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
          <NextMilestone progress={progress} />
          
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-col">
              <button 
                onClick={() => setIsFlightModalOpen(true)}
                className="btn btn-primary mb-3 text-left"
                data-testid="log-flight-hours-button"
              >
                📝 Log Flight Hours
              </button>
              <button className="btn btn-secondary mb-3 text-left">
                📚 Update Theory Progress
              </button>
              <button className="btn btn-secondary text-left">
                💰 Track Expenses
              </button>
            </div>
          </div>
        </div>

        {/* Recent Flights */}
        {progress.flightEntries.length > 0 && (
          <div className="mb-6">
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