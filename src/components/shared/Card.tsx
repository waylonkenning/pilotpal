interface CardProps {
  children: React.ReactNode
  className?: string
  'data-testid'?: string
}

export default function Card({ children, className = '', 'data-testid': testId }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 border ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  )
}