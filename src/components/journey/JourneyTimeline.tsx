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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your PPL Journey
              </h1>
              <p className="text-gray-700 text-lg font-medium">
                Track your progress through the five training phases
              </p>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-blue-700 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
              data-testid="back-to-dashboard"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Overall Progress */}
        <OverallProgress progress={progress} />

        {/* Timeline Filters */}
        <div className="mb-8" data-testid="timeline-filters">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                    : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md hover:scale-105'
                }`}
              >
                All Milestones
              </button>
              <button
                onClick={() => setFilter('flight')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  filter === 'flight' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                    : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md hover:scale-105'
                }`}
                data-testid="filter-flight-milestones"
              >
                Flight Milestones
              </button>
              <button
                onClick={() => setFilter('theory')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  filter === 'theory' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                    : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md hover:scale-105'
                }`}
              >
                Theory Progress
              </button>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-8">
          <div 
            className="overflow-x-auto pb-6 scrollbar-hide"
            data-testid="timeline-scroll-container"
          >
            <div 
              className="flex gap-6 min-w-full lg:min-w-0 px-2"
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
        <div className="mb-12 text-center" data-testid="current-position-indicator">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg inline-block">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              <span className="font-bold text-lg">
                You are in {currentPhase.name}
              </span>
            </div>
            <div className="text-gray-700 font-semibold text-xl mb-2" data-testid="hours-completed">
              {progress.flightHours.total.toFixed(1)} hours completed
            </div>
            {currentPhase && (
              <div className="text-gray-600 font-medium" data-testid="time-to-next-phase">
                {(currentPhase.hourRange.max - progress.flightHours.total).toFixed(0)} hours to {
                  TRAINING_PHASES.find(p => p.hourRange.min === currentPhase.hourRange.max)?.name || 'completion'
                }
              </div>
            )}
          </div>
        </div>

        {/* Current Milestone */}
        <div className="text-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Current Milestone</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3" data-testid="current-milestone">
              {progress.flightHours.total === 0 ? 'First Flight' : 'Controls Master'}
            </div>
            <p className="text-gray-700 text-lg font-medium">
              {progress.flightHours.total === 0 
                ? 'Complete your introductory flight'
                : 'Master basic aircraft control skills'
              }
            </p>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="mb-12" data-testid="upcoming-milestones">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upcoming Milestones
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                data-testid="upcoming-milestone-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="font-bold text-blue-700 text-lg">First Flight</div>
                </div>
                <div className="text-blue-600 font-medium">Complete introductory flight</div>
              </div>
              <div 
                className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl shadow-lg p-6 border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                data-testid="upcoming-milestone-2"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="font-bold text-emerald-700 text-lg">Controls Master</div>
                </div>
                <div className="text-emerald-600 font-medium">Demonstrate basic aircraft control</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl shadow-lg p-6 border border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="font-bold text-purple-700 text-lg">Solo Wings</div>
                </div>
                <div className="text-purple-600 font-medium">Your first solo flight</div>
              </div>
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