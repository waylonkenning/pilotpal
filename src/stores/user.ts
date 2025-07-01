import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  UserProfile, 
  MedicalCertificate, 
  FitAndProperPerson,
  CAMMyAviationIntegration,
  Currency,
  BiennialFlightReview 
} from '@/types'

export const useUserStore = defineStore('user', () => {
  // State
  const profile = ref<UserProfile | null>(null)
  const medical = ref<MedicalCertificate | null>(null)
  const fpp = ref<FitAndProperPerson | null>(null)
  const myAviationIntegration = ref<CAMMyAviationIntegration>({
    isLinked: false,
    availableServices: []
  })
  const currency = ref<Currency[]>([])
  const bfr = ref<BiennialFlightReview | null>(null)
  
  // Computed
  const isProfileComplete = computed(() => {
    return profile.value && 
           medical.value && 
           fpp.value?.status === 'approved'
  })
  
  const medicalExpiryDays = computed(() => {
    if (!medical.value) return null
    const now = new Date()
    const expiry = new Date(medical.value.expiryDate)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  })
  
  const isMedicalExpiringSoon = computed(() => {
    return medicalExpiryDays.value !== null && medicalExpiryDays.value <= 30
  })
  
  const fppExpiryDays = computed(() => {
    if (!fpp.value) return null
    const now = new Date()
    const expiry = new Date(fpp.value.expiryDate)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  })
  
  const isFppExpiringSoon = computed(() => {
    return fppExpiryDays.value !== null && fppExpiryDays.value <= 30
  })
  
  const passengerCurrent = computed(() => {
    const passengerCurrency = currency.value.find(c => c.type === 'passenger')
    return passengerCurrency && !passengerCurrency.isExpired
  })
  
  const bfrCurrent = computed(() => {
    return bfr.value?.isCompleted && 
           bfr.value.completedDate && 
           new Date(bfr.value.completedDate) > new Date(Date.now() - 24 * 30 * 24 * 60 * 60 * 1000) // 24 months
  })
  
  // Actions
  const setProfile = (newProfile: UserProfile) => {
    profile.value = newProfile
    saveToStorage()
  }
  
  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile.value) {
      profile.value = { ...profile.value, ...updates, updatedAt: new Date() }
      saveToStorage()
    }
  }
  
  const setMedical = (newMedical: MedicalCertificate) => {
    medical.value = newMedical
    saveToStorage()
  }
  
  const setFpp = (newFpp: FitAndProperPerson) => {
    fpp.value = newFpp
    saveToStorage()
  }
  
  const updateFpp = (updates: Partial<FitAndProperPerson>) => {
    if (fpp.value) {
      fpp.value = { ...fpp.value, ...updates }
      saveToStorage()
    }
  }
  
  const linkMyAviation = (participantId: string) => {
    myAviationIntegration.value = {
      isLinked: true,
      participantId,
      lastSync: new Date(),
      availableServices: ['medical_renewal', 'license_application', 'logbook_submission']
    }
    saveToStorage()
  }
  
  const updateCurrency = (newCurrency: Currency[]) => {
    currency.value = newCurrency
    saveToStorage()
  }
  
  const setBfr = (newBfr: BiennialFlightReview) => {
    bfr.value = newBfr
    saveToStorage()
  }
  
  const saveToStorage = () => {
    const userData = {
      profile: profile.value,
      medical: medical.value,
      fpp: fpp.value,
      myAviationIntegration: myAviationIntegration.value,
      currency: currency.value,
      bfr: bfr.value
    }
    localStorage.setItem('ppl-quest-user', JSON.stringify(userData))
  }
  
  const loadFromStorage = () => {
    const stored = localStorage.getItem('ppl-quest-user')
    if (stored) {
      try {
        const userData = JSON.parse(stored)
        profile.value = userData.profile
        medical.value = userData.medical
        fpp.value = userData.fpp
        myAviationIntegration.value = userData.myAviationIntegration || { isLinked: false, availableServices: [] }
        currency.value = userData.currency || []
        bfr.value = userData.bfr
      } catch (error) {
        console.error('Failed to load user data from storage:', error)
      }
    }
  }
  
  const clearUserData = () => {
    profile.value = null
    medical.value = null
    fpp.value = null
    myAviationIntegration.value = { isLinked: false, availableServices: [] }
    currency.value = []
    bfr.value = null
    localStorage.removeItem('ppl-quest-user')
  }
  
  return {
    // State
    profile,
    medical, 
    fpp,
    myAviationIntegration,
    currency,
    bfr,
    
    // Computed
    isProfileComplete,
    medicalExpiryDays,
    isMedicalExpiringSoon,
    fppExpiryDays,
    isFppExpiringSoon,
    passengerCurrent,
    bfrCurrent,
    
    // Actions
    setProfile,
    updateProfile,
    setMedical,
    setFpp,
    updateFpp,
    linkMyAviation,
    updateCurrency,
    setBfr,
    loadFromStorage,
    clearUserData
  }
})