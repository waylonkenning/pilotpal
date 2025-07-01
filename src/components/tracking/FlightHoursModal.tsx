'use client'

import { useState } from 'react'
import { UserProgress, FlightHours } from '@/types'
import Modal from '@/components/shared/Modal'

interface FlightHoursModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (hours: FlightHours, description: string, date: Date) => void
}

interface FormData {
  dual: string
  solo: string
  crossCountry: string
  instrument: string
  night: string
  description: string
  date: string
}

const initialFormData: FormData = {
  dual: '',
  solo: '',
  crossCountry: '',
  instrument: '',
  night: '',
  description: '',
  date: new Date().toISOString().split('T')[0] // Today's date
}

export default function FlightHoursModal({ isOpen, onClose, onSave }: FlightHoursModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [validationError, setValidationError] = useState('')

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValidationError('') // Clear validation error when user types
  }

  const validateForm = (): boolean => {
    const dual = parseFloat(formData.dual) || 0
    const solo = parseFloat(formData.solo) || 0
    const crossCountry = parseFloat(formData.crossCountry) || 0
    const instrument = parseFloat(formData.instrument) || 0
    const night = parseFloat(formData.night) || 0

    // Check if any hours are negative
    if (dual < 0 || solo < 0 || crossCountry < 0 || instrument < 0 || night < 0) {
      setValidationError('Hours must be positive numbers')
      return false
    }

    // Check if any non-zero values are actually valid numbers
    const values = [formData.dual, formData.solo, formData.crossCountry, formData.instrument, formData.night]
    for (const value of values) {
      if (value && isNaN(parseFloat(value))) {
        setValidationError('Hours must be positive numbers')
        return false
      }
    }

    // Check if at least some hours are logged
    const totalHours = dual + solo + crossCountry + instrument + night
    if (totalHours < 0.1) {
      setValidationError('Please enter at least 0.1 hours')
      return false
    }

    return true
  }

  const handleSave = () => {
    if (!validateForm()) return

    const hours: FlightHours = {
      dual: parseFloat(formData.dual) || 0,
      solo: parseFloat(formData.solo) || 0,
      crossCountry: parseFloat(formData.crossCountry) || 0,
      instrument: parseFloat(formData.instrument) || 0,
      night: parseFloat(formData.night) || 0,
      total: 0 // Will be calculated by the parent
    }

    const date = new Date(formData.date)
    onSave(hours, formData.description, date)
    
    // Reset form
    setFormData(initialFormData)
    setValidationError('')
    onClose()
  }

  const handleCancel = () => {
    setFormData(initialFormData)
    setValidationError('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Log Flight Hours"
      data-testid="flight-hours-modal"
    >
      <div className="space-y-3">
        {/* Date and Description */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label htmlFor="flight-date" className="block text-sm font-medium text-gray-700 mb-1">
              Flight Date
            </label>
            <input
              id="flight-date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="flight-date-input"
            />
          </div>
          <div>
            <label htmlFor="flight-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              id="flight-description"
              type="text"
              placeholder="e.g., Pattern work, Cross country to NZAA"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="flight-description-input"
            />
          </div>
        </div>

        {/* Hours Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="dual-hours" className="block text-sm font-medium text-gray-700 mb-1">
              Dual
            </label>
            <input
              id="dual-hours"
              type="number"
              step="0.1"
              min="0"
              placeholder="0.0"
              value={formData.dual}
              onChange={(e) => handleInputChange('dual', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="dual-hours-input"
            />
          </div>
          
          <div>
            <label htmlFor="solo-hours" className="block text-sm font-medium text-gray-700 mb-1">
              Solo
            </label>
            <input
              id="solo-hours"
              type="number"
              step="0.1"
              min="0"
              placeholder="0.0"
              value={formData.solo}
              onChange={(e) => handleInputChange('solo', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="solo-hours-input"
            />
          </div>
          
          <div>
            <label htmlFor="cross-country-hours" className="block text-sm font-medium text-gray-700 mb-1">
              Cross Country
            </label>
            <input
              id="cross-country-hours"
              type="number"
              step="0.1"
              min="0"
              placeholder="0.0"
              value={formData.crossCountry}
              onChange={(e) => handleInputChange('crossCountry', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="cross-country-hours-input"
            />
          </div>
          
          <div>
            <label htmlFor="instrument-hours" className="block text-sm font-medium text-gray-700 mb-1">
              Instrument
            </label>
            <input
              id="instrument-hours"
              type="number"
              step="0.1"
              min="0"
              placeholder="0.0"
              value={formData.instrument}
              onChange={(e) => handleInputChange('instrument', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="instrument-hours-input"
            />
          </div>
          
          <div>
            <label htmlFor="night-hours" className="block text-sm font-medium text-gray-700 mb-1">
              Night
            </label>
            <input
              id="night-hours"
              type="number"
              step="0.1"
              min="0"
              placeholder="0.0"
              value={formData.night}
              onChange={(e) => handleInputChange('night', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="night-hours-input"
            />
          </div>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="text-red-600 text-sm" data-testid="validation-error">
            {validationError}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            data-testid="cancel-flight-button"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            data-testid="save-flight-button"
          >
            Save Flight
          </button>
        </div>
      </div>
    </Modal>
  )
}