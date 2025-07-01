'use client'

import { useState, useEffect } from 'react'
import { UserProgress } from '@/types'
import { loadProgress, saveProgress, createDefaultProgress } from './storage'

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  return {
    progress,
    isLoading,
    startJourney,
    updateProgress
  }
}