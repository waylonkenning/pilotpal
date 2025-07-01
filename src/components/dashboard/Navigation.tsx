export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b mb-8">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">NZ PPL Journey</h1>
          
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="journey-nav-link"
            >
              Journey Map
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="achievements-nav-link"
            >
              Achievements
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="progress-nav-link"
            >
              Progress
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}