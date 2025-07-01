'use client'

import { useState } from 'react'
import { UserProgress } from '@/types'
import { TRAINING_PHASES } from '@/lib/constants'
import Navigation from '@/components/dashboard/Navigation'
import TimelinePhase from './TimelinePhase'
import PhaseDetails from './PhaseDetails'
import OverallProgress from './OverallProgress'

interface JourneyTimelineProps {
  progress: UserProgress
}

export default function JourneyTimeline({ progress }: JourneyTimelineProps) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'flight' | 'theory'>('all')

  // Determine current phase based on total hours
  const currentPhase = TRAINING_PHASES.find(phase => 
    progress.flightHours.total >= phase.hourRange.min && 
    progress.flightHours.total < phase.hourRange.max
  ) || TRAINING_PHASES[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your PPL Journey</h1>
              <p className="text-gray-600">
                Track your progress through the five training phases
              </p>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-700"
              data-testid="back-to-dashboard"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Overall Progress */}
        <OverallProgress progress={progress} />

        {/* Timeline Filters */}
        <div className="mb-6" data-testid="timeline-filters">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setFilter('flight')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'flight' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border'
              }`}
              data-testid="filter-flight-milestones"
            >
              Flight Milestones
            </button>
            <button
              onClick={() => setFilter('theory')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'theory' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border'
              }`}
            >
              Theory Progress
            </button>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-8">
          <div 
            className="overflow-x-auto pb-4"
            data-testid="timeline-scroll-container"
          >
            <div 
              className="flex gap-4 min-w-full lg:min-w-0"
              data-testid="journey-timeline"
            >
              {TRAINING_PHASES.map((phase, index) => (
                <TimelinePhase
                  key={phase.id}
                  phase={phase}
                  progress={progress}
                  isActive={phase.id === currentPhase.id}
                  isCompleted={progress.flightHours.total >= phase.hourRange.max}
                  onClick={() => setSelectedPhase(phase.id)}
                  filter={filter}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Current Position Indicator */}
        <div className="mb-8 text-center" data-testid="current-position-indicator">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="font-medium">
              You are in {currentPhase.name}
            </span>
          </div>
          <div className="mt-2 text-gray-600" data-testid="hours-completed">
            {progress.flightHours.total.toFixed(1)} hours completed
          </div>
          {currentPhase && (
            <div className="mt-1 text-sm text-gray-500" data-testid="time-to-next-phase">
              {(currentPhase.hourRange.max - progress.flightHours.total).toFixed(0)} hours to {
                TRAINING_PHASES.find(p => p.hourRange.min === currentPhase.hourRange.max)?.name || 'completion'
              }
            </div>
          )}
        </div>

        {/* Current Milestone */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">Current Milestone</h3>
            <div className="text-2xl font-bold text-blue-600" data-testid="current-milestone">
              {progress.flightHours.total === 0 ? 'First Flight' : 'Controls Master'}
            </div>
            <p className="text-gray-600 mt-2">
              {progress.flightHours.total === 0 
                ? 'Complete your introductory flight'
                : 'Master basic aircraft control skills'
              }
            </p>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="mb-8" data-testid="upcoming-milestones">
          <h3 className="text-xl font-bold mb-4">Upcoming Milestones</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              className="bg-white rounded-lg shadow-md p-4 border"
              data-testid="upcoming-milestone-1"
            >
              <div className="font-semibold text-blue-600">First Flight</div>
              <div className="text-sm text-gray-600">Complete introductory flight</div>
            </div>
            <div 
              className="bg-white rounded-lg shadow-md p-4 border"
              data-testid="upcoming-milestone-2"
            >
              <div className="font-semibold text-blue-600">Controls Master</div>
              <div className="text-sm text-gray-600">Demonstrate basic aircraft control</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 border">
              <div className="font-semibold text-blue-600">Solo Wings</div>
              <div className="text-sm text-gray-600">Your first solo flight</div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Details Modal */}
      {selectedPhase && (
        <PhaseDetails
          phase={TRAINING_PHASES.find(p => p.id === selectedPhase)!}
          progress={progress}
          onClose={() => setSelectedPhase(null)}
        />
      )}
    </div>
  )
}