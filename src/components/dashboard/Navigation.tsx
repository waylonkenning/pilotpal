import Link from 'next/link'

export default function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav card mb-8">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold text-gradient">
              NZ PPL Journey
            </Link>
            
            <div className="flex">
              <Link 
                href="/journey" 
                className="btn btn-secondary"
                data-testid="journey-nav-link"
              >
                Journey Map
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        <Link 
          href="/" 
          className="flex flex-col items-center p-2"
          data-testid="home-nav-mobile"
        >
          <span className="text-xs">Home</span>
        </Link>
        <Link 
          href="/journey" 
          className="flex flex-col items-center p-2"
          data-testid="journey-nav-mobile"
        >
          <span className="text-xs">Journey</span>
        </Link>
        <Link 
          href="#" 
          className="flex flex-col items-center p-2"
          data-testid="achievements-nav-mobile"
        >
          <span className="text-xs">Awards</span>
        </Link>
        <Link 
          href="#" 
          className="flex flex-col items-center p-2"
          data-testid="progress-nav-mobile"
        >
          <span className="text-xs">Progress</span>
        </Link>
      </nav>
    </>
  )
}