export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          NZ Private Pilot Journey
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Transform your flight training into an engaging, milestone-based experience
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-3">🎯 Journey Map</h2>
            <p className="text-gray-600">Visual timeline showing your progress through all training phases</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-3">🏆 Achievements</h2>
            <p className="text-gray-600">Earn 27+ badges as you master each flight milestone</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-3">📊 Progress Tracking</h2>
            <p className="text-gray-600">Log hours, track theory exams, and monitor expenses</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Start Your Journey
          </button>
        </div>
      </div>
    </main>
  )
}