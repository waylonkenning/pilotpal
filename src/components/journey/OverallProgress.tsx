import { UserProgress } from '@/types'

interface OverallProgressProps {
  progress: UserProgress
}

export default function OverallProgress({ progress }: OverallProgressProps) {
  const totalRequiredHours = 50
  const overallProgress = Math.min((progress.flightHours.total / totalRequiredHours) * 100, 100)
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 mb-12" data-testid="overall-progress">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Overall Journey Progress
      </h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-semibold text-lg">Progress to PPL(A)</span>
          <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-testid="overall-progress-text">
            {overallProgress.toFixed(0)}% complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-6 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${overallProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 text-center border border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {progress.flightHours.total.toFixed(1)}
          </div>
          <div className="text-sm font-semibold text-blue-700">Hours Flown</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 text-center border border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {progress.achievements.length}
          </div>
          <div className="text-sm font-semibold text-green-700">Badges Earned</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6 text-center border border-purple-200">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {Object.values(progress.theoryExams).filter(exam => exam.passed).length}
          </div>
          <div className="text-sm font-semibold text-purple-700">Exams Passed</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-6 text-center border border-orange-200">
          <div className="text-3xl font-bold text-orange-600 mb-2" data-testid="total-hours-requirement">
            50
          </div>
          <div className="text-sm font-semibold text-orange-700">Hours Required</div>
        </div>
      </div>
      
      {overallProgress < 100 && (
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-3 inline-block shadow-lg">
            <span className="font-bold text-lg">
              {(totalRequiredHours - progress.flightHours.total).toFixed(0)} hours remaining
            </span>
            <span className="ml-2 font-medium">to complete your PPL(A)</span>
          </div>
        </div>
      )}
    </div>
  )
}