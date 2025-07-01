import { UserProgress } from '@/types'

interface OverallProgressProps {
  progress: UserProgress
}

export default function OverallProgress({ progress }: OverallProgressProps) {
  const totalRequiredHours = 50
  const overallProgress = Math.min((progress.flightHours.total / totalRequiredHours) * 100, 100)
  
  return (
    <div className="card mb-6" data-testid="overall-progress">
      <h2 className="text-3xl font-bold mb-6 text-center text-gradient">
        Overall Journey Progress
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">Progress to PPL(A)</span>
          <span className="font-bold text-2xl text-gradient" data-testid="overall-progress-text">
            {overallProgress.toFixed(0)}% complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="card text-center mr-2 mb-2">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--blue-600)' }}>
            {progress.flightHours.total.toFixed(1)}
          </div>
          <div className="text-sm font-semibold">Hours Flown</div>
        </div>
        
        <div className="card text-center mr-2 mb-2">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--green-600)' }}>
            {progress.achievements.length}
          </div>
          <div className="text-sm font-semibold">Badges Earned</div>
        </div>
        
        <div className="card text-center mr-2 mb-2">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--purple-600)' }}>
            {Object.values(progress.theoryExams).filter(exam => exam.passed).length}
          </div>
          <div className="text-sm font-semibold">Exams Passed</div>
        </div>
        
        <div className="card text-center mb-2">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--blue-600)' }} data-testid="total-hours-requirement">
            50
          </div>
          <div className="text-sm font-semibold">Hours Required</div>
        </div>
      </div>
      
      {overallProgress < 100 && (
        <div className="mt-6 text-center">
          <div className="btn btn-primary">
            <span className="font-bold">
              {(totalRequiredHours - progress.flightHours.total).toFixed(0)} hours remaining
            </span>
            <span className="ml-2">to complete your PPL(A)</span>
          </div>
        </div>
      )}
    </div>
  )
}