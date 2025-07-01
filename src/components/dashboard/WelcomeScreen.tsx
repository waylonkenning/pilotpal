'use client'

import { useState } from 'react'
import Card from '@/components/shared/Card'

interface WelcomeScreenProps {
  onStartJourney: (name: string) => void
}

export default function WelcomeScreen({ onStartJourney }: WelcomeScreenProps) {
  const [showNameForm, setShowNameForm] = useState(false)
  const [name, setName] = useState('')

  const handleGetStarted = () => {
    setShowNameForm(true)
  }

  const handleStartJourney = () => {
    if (name.trim()) {
      onStartJourney(name.trim())
    }
  }

  if (showNameForm) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">Let's get started!</h2>
          <p className="text-gray-600 mb-6">What should we call you?</p>
          
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            data-testid="name-input"
            autoFocus
          />
          
          <button
            onClick={handleStartJourney}
            disabled={!name.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            data-testid="start-journey-button"
          >
            Start My Journey
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold mb-6" data-testid="welcome-message">
          Welcome to your PPL Journey
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Transform your flight training into an engaging, milestone-based experience
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <h3 className="text-xl font-semibold mb-3">🎯 Journey Map</h3>
            <p className="text-gray-600">Visual timeline showing your progress through all training phases</p>
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold mb-3">🏆 Achievements</h3>
            <p className="text-gray-600">Earn 27+ badges as you master each flight milestone</p>
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold mb-3">📊 Progress Tracking</h3>
            <p className="text-gray-600">Log hours, track theory exams, and monitor expenses</p>
          </Card>
        </div>
        
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg text-lg transition-colors"
          data-testid="get-started-button"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}