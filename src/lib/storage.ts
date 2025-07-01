import { UserProgress, UserProfile, FlightHours, TheoryExams, Achievement, Expense } from '@/types'

const STORAGE_KEY = 'ppl-journey-progress'

export const createDefaultProgress = (): UserProgress => ({
  id: crypto.randomUUID(),
  startDate: new Date(),
  lastUpdated: new Date(),
  profile: {
    name: '',
    targetCompletionDate: undefined,
    medicalType: null,
    medicalExpiry: undefined
  },
  flightHours: {
    dual: 0,
    solo: 0,
    crossCountry: 0,
    instrument: 0,
    night: 0,
    total: 0
  },
  theoryExams: {
    airLaw: { attempted: false, passed: false },
    navigation: { attempted: false, passed: false },
    technical: { attempted: false, passed: false },
    humanFactors: { attempted: false, passed: false },
    meteorology: { attempted: false, passed: false },
    radioTelephony: { attempted: false, passed: false }
  },
  achievements: [],
  expenses: [],
  flightEntries: []
})

export const saveProgress = (data: UserProgress): void => {
  try {
    const serializedData = {
      ...data,
      startDate: data.startDate.toISOString(),
      lastUpdated: new Date().toISOString(),
      profile: {
        ...data.profile,
        targetCompletionDate: data.profile.targetCompletionDate?.toISOString(),
        medicalExpiry: data.profile.medicalExpiry?.toISOString()
      },
      achievements: data.achievements.map(achievement => ({
        ...achievement,
        unlockedAt: achievement.unlockedAt.toISOString()
      })),
      expenses: data.expenses.map(expense => ({
        ...expense,
        date: expense.date.toISOString()
      })),
      flightEntries: data.flightEntries.map(entry => ({
        ...entry,
        date: entry.date.toISOString()
      })),
      theoryExams: {
        ...data.theoryExams,
        airLaw: {
          ...data.theoryExams.airLaw,
          date: data.theoryExams.airLaw.date?.toISOString()
        },
        navigation: {
          ...data.theoryExams.navigation,
          date: data.theoryExams.navigation.date?.toISOString()
        },
        technical: {
          ...data.theoryExams.technical,
          date: data.theoryExams.technical.date?.toISOString()
        },
        humanFactors: {
          ...data.theoryExams.humanFactors,
          date: data.theoryExams.humanFactors.date?.toISOString()
        },
        meteorology: {
          ...data.theoryExams.meteorology,
          date: data.theoryExams.meteorology.date?.toISOString()
        },
        radioTelephony: {
          ...data.theoryExams.radioTelephony,
          date: data.theoryExams.radioTelephony.date?.toISOString()
        }
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedData))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

export const loadProgress = (): UserProgress | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    
    const parsed = JSON.parse(data)
    
    return {
      ...parsed,
      startDate: new Date(parsed.startDate),
      lastUpdated: new Date(parsed.lastUpdated),
      profile: {
        ...parsed.profile,
        targetCompletionDate: parsed.profile.targetCompletionDate 
          ? new Date(parsed.profile.targetCompletionDate) 
          : undefined,
        medicalExpiry: parsed.profile.medicalExpiry 
          ? new Date(parsed.profile.medicalExpiry) 
          : undefined
      },
      achievements: parsed.achievements.map((achievement: any) => ({
        ...achievement,
        unlockedAt: new Date(achievement.unlockedAt)
      })),
      expenses: parsed.expenses.map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      })),
      flightEntries: parsed.flightEntries?.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })) || [],
      theoryExams: {
        ...parsed.theoryExams,
        airLaw: {
          ...parsed.theoryExams.airLaw,
          date: parsed.theoryExams.airLaw.date 
            ? new Date(parsed.theoryExams.airLaw.date) 
            : undefined
        },
        navigation: {
          ...parsed.theoryExams.navigation,
          date: parsed.theoryExams.navigation.date 
            ? new Date(parsed.theoryExams.navigation.date) 
            : undefined
        },
        technical: {
          ...parsed.theoryExams.technical,
          date: parsed.theoryExams.technical.date 
            ? new Date(parsed.theoryExams.technical.date) 
            : undefined
        },
        humanFactors: {
          ...parsed.theoryExams.humanFactors,
          date: parsed.theoryExams.humanFactors.date 
            ? new Date(parsed.theoryExams.humanFactors.date) 
            : undefined
        },
        meteorology: {
          ...parsed.theoryExams.meteorology,
          date: parsed.theoryExams.meteorology.date 
            ? new Date(parsed.theoryExams.meteorology.date) 
            : undefined
        },
        radioTelephony: {
          ...parsed.theoryExams.radioTelephony,
          date: parsed.theoryExams.radioTelephony.date 
            ? new Date(parsed.theoryExams.radioTelephony.date) 
            : undefined
        }
      }
    }
  } catch (error) {
    console.error('Failed to load progress:', error)
    return null
  }
}

export const exportProgress = (): void => {
  try {
    const data = loadProgress()
    if (!data) {
      console.warn('No progress data to export')
      return
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    })
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ppl-journey-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export progress:', error)
  }
}

export const importProgress = (file: File): Promise<UserProgress> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        
        const progress = {
          ...data,
          startDate: new Date(data.startDate),
          lastUpdated: new Date(data.lastUpdated),
          profile: {
            ...data.profile,
            targetCompletionDate: data.profile.targetCompletionDate 
              ? new Date(data.profile.targetCompletionDate) 
              : undefined,
            medicalExpiry: data.profile.medicalExpiry 
              ? new Date(data.profile.medicalExpiry) 
              : undefined
          },
          achievements: data.achievements.map((achievement: any) => ({
            ...achievement,
            unlockedAt: new Date(achievement.unlockedAt)
          })),
          expenses: data.expenses.map((expense: any) => ({
            ...expense,
            date: new Date(expense.date)
          }))
        }
        
        saveProgress(progress)
        resolve(progress)
      } catch (error) {
        reject(new Error('Invalid backup file format'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear progress:', error)
  }
}