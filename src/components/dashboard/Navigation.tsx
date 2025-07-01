import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b mb-8">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            NZ PPL Journey
          </Link>
          
          <div className="flex gap-6">
            <Link 
              href="/journey" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="journey-nav-link"
            >
              Journey Map
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="achievements-nav-link"
            >
              Achievements
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="progress-nav-link"
            >
              Progress
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}