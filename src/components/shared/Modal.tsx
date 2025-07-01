'use client'

import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  'data-testid'?: string
}

export default function Modal({ isOpen, onClose, title, children, 'data-testid': testId }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal */}
      <div 
        className="modal-content"
        data-testid={testId}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg md:text-xl font-semibold" data-testid="modal-title">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-xl md:text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}