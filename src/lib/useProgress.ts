'use client'

import { useState, useEffect } from 'react'
import { UserProgress, FlightHours, FlightEntry, Achievement } from '@/types'
import { loadProgress, saveProgress, createDefaultProgress } from './storage'
import { checkForNewAchievements, calculateTotalHours, addFlightHours } from './achievements'

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    // Load progress from localStorage on mount
    const savedProgress = loadProgress()
    setProgress(savedProgress)
    setIsLoading(false)
  }, [])

  const startJourney = (name: string) => {
    const newProgress = createDefaultProgress()
    newProgress.profile.name = name
    setProgress(newProgress)
    saveProgress(newProgress)
  }

  const updateProgress = (updatedProgress: UserProgress) => {
    setProgress(updatedProgress)
    saveProgress(updatedProgress)
  }

  const logFlightHours = (hours: FlightHours, description: string, date: Date) => {
    if (!progress) return

    const oldProgress = { ...progress }

    // Create flight entry
    const flightEntry: FlightEntry = {
      id: crypto.randomUUID(),
      date,
      description,
      hours
    }

    // Add flight hours to total
    const newFlightHours = addFlightHours(progress.flightHours, hours)
    newFlightHours.total = calculateTotalHours(newFlightHours)

    // Create updated progress
    const updatedProgress: UserProgress = {
      ...progress,
      flightHours: newFlightHours,
      flightEntries: [...progress.flightEntries, flightEntry],
      lastUpdated: new Date()
    }

    // Check for new achievements
    const newAchievements = checkForNewAchievements(oldProgress, updatedProgress)
    if (newAchievements.length > 0) {
      updatedProgress.achievements = [...progress.achievements, ...newAchievements]
      // Show the first new achievement
      setNewAchievement(newAchievements[0])
    }

    setProgress(updatedProgress)
    saveProgress(updatedProgress)
  }

  const dismissAchievement = () => {
    setNewAchievement(null)
  }

  return {
    progress,
    isLoading,
    newAchievement,
    startJourney,
    updateProgress,
    logFlightHours,
    dismissAchievement
  }
}