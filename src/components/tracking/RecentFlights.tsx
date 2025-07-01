import { FlightEntry } from '@/types'
import Card from '@/components/shared/Card'

interface RecentFlightsProps {
  flights: FlightEntry[]
}

export default function RecentFlights({ flights }: RecentFlightsProps) {
  const recentFlights = flights
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5) // Show last 5 flights

  if (recentFlights.length === 0) {
    return null
  }

  return (
    <Card data-testid="recent-flights">
      <h3 className="text-lg font-semibold mb-4">Recent Flights</h3>
      
      <div className="space-y-3">
        {recentFlights.map((flight) => (
          <div key={flight.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {flight.description || 'Flight training'}
              </div>
              <div className="text-sm text-gray-600">
                {flight.date.toLocaleDateString()}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 text-right">
              {flight.hours.dual > 0 && <div>{flight.hours.dual.toFixed(1)}h dual</div>}
              {flight.hours.solo > 0 && <div>{flight.hours.solo.toFixed(1)}h solo</div>}
              {flight.hours.crossCountry > 0 && <div>{flight.hours.crossCountry.toFixed(1)}h XC</div>}
              {flight.hours.instrument > 0 && <div>{flight.hours.instrument.toFixed(1)}h inst</div>}
              {flight.hours.night > 0 && <div>{flight.hours.night.toFixed(1)}h night</div>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}