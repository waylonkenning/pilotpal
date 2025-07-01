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
    <div className="min-h-screen gradient-primary pb-mobile-nav">
      <Navigation />
      
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                Your PPL Journey
              </h1>
              <p className="text-base md:text-lg">
                Track your progress through the five training phases
              </p>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="btn btn-secondary mt-4 md:mt-0"
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
          <div className="card">
            <div className="flex flex-col sm:flex-row justify-center">
              <button
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'btn btn-primary mb-2 sm:mb-0 sm:mr-2' : 'btn btn-secondary mb-2 sm:mb-0 sm:mr-2'}
              >
                All Milestones
              </button>
              <button
                onClick={() => setFilter('flight')}
                className={filter === 'flight' ? 'btn btn-primary mb-2 sm:mb-0 sm:mr-2' : 'btn btn-secondary mb-2 sm:mb-0 sm:mr-2'}
                data-testid="filter-flight-milestones"
              >
                Flight Milestones
              </button>
              <button
                onClick={() => setFilter('theory')}
                className={filter === 'theory' ? 'btn btn-primary' : 'btn btn-secondary'}
              >
                Theory Progress
              </button>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-6">
          <div 
            className="overflow-x-auto pb-4"
            data-testid="timeline-scroll-container"
          >
            <div 
              className="flex p-2"
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
        <div className="mb-6 text-center" data-testid="current-position-indicator">
          <div className="card inline-block">
            <div className="btn btn-primary mb-3">
              <span className="font-bold">
                You are in {currentPhase.name}
              </span>
            </div>
            <div className="font-semibold text-xl mb-2" data-testid="hours-completed">
              {progress.flightHours.total.toFixed(1)} hours completed
            </div>
            {currentPhase && (
              <div className="font-medium" data-testid="time-to-next-phase">
                {(currentPhase.hourRange.max - progress.flightHours.total).toFixed(0)} hours to {
                  TRAINING_PHASES.find(p => p.hourRange.min === currentPhase.hourRange.max)?.name || 'completion'
                }
              </div>
            )}
          </div>
        </div>

        {/* Current Milestone */}
        <div className="text-center mb-6">
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Current Milestone</h3>
            <div className="text-3xl font-bold text-gradient mb-3" data-testid="current-milestone">
              {progress.flightHours.total === 0 ? 'First Flight' : 'Controls Master'}
            </div>
            <p className="text-lg font-medium">
              {progress.flightHours.total === 0 
                ? 'Complete your introductory flight'
                : 'Master basic aircraft control skills'
              }
            </p>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="mb-6" data-testid="upcoming-milestones">
          <div className="card">
            <h3 className="text-3xl font-bold mb-6 text-center text-gradient">
              Upcoming Milestones
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              <div 
                className="card mr-4 mb-4 md:mb-0"
                data-testid="upcoming-milestone-1"
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div className="font-bold text-lg">First Flight</div>
                </div>
                <div className="font-medium">Complete introductory flight</div>
              </div>
              <div 
                className="card mr-4 mb-4 md:mb-0"
                data-testid="upcoming-milestone-2"
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div className="font-bold text-lg">Controls Master</div>
                </div>
                <div className="font-medium">Demonstrate basic aircraft control</div>
              </div>
              <div className="card mb-4 md:mb-0">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <div className="font-bold text-lg">Solo Wings</div>
                </div>
                <div className="font-medium">Your first solo flight</div>
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