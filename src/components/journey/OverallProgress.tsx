import { UserProgress } from '@/types'

interface OverallProgressProps {
  progress: UserProgress
}

export default function OverallProgress({ progress }: OverallProgressProps) {
  const totalRequiredHours = 50
  const overallProgress = Math.min((progress.flightHours.total / totalRequiredHours) * 100, 100)
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border mb-8" data-testid="overall-progress">
      <h2 className="text-xl font-bold mb-4">Overall Journey Progress</h2>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Progress to PPL(A)</span>
          <span className="font-semibold" data-testid="overall-progress-text">
            {overallProgress.toFixed(0)}% complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">
            {progress.flightHours.total.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Hours Flown</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-green-600">
            {progress.achievements.length}
          </div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-purple-600">
            {Object.values(progress.theoryExams).filter(exam => exam.passed).length}
          </div>
          <div className="text-sm text-gray-600">Exams Passed</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-orange-600" data-testid="total-hours-requirement">
            50
          </div>
          <div className="text-sm text-gray-600">Hours Required</div>
        </div>
      </div>
      
      {overallProgress < 100 && (
        <div className="mt-4 text-center text-gray-600">
          <span className="font-medium">
            {(totalRequiredHours - progress.flightHours.total).toFixed(0)} hours remaining
          </span>
          {' '}to complete your PPL(A)
        </div>
      )}
    </div>
  )
}