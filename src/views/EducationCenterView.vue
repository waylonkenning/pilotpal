<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-4">📚 Education Center</h1>
        <p class="text-lg text-gray-600 mb-6">
          Learn about New Zealand PPL requirements and aviation regulations
        </p>
      </div>

      <!-- PPL Pathway Overview -->
      <div class="card mb-8" data-testid="ppl-pathway-overview">
        <h2 class="text-xl font-semibold mb-4">🎯 Complete PPL Pathway</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="text-center p-4 bg-blue-50 metro-card">
            <div class="text-3xl mb-2">📋</div>
            <div class="font-semibold">Medical Certificate</div>
            <div class="text-sm text-gray-600">Class 2 or DL9</div>
          </div>
          <div class="text-center p-4 bg-green-50 metro-card">
            <div class="text-3xl mb-2">✈️</div>
            <div class="font-semibold">Flight Training</div>
            <div class="text-sm text-gray-600">50+ hours</div>
          </div>
          <div class="text-center p-4 bg-purple-50 metro-card">
            <div class="text-3xl mb-2">📚</div>
            <div class="font-semibold">Theory Exams</div>
            <div class="text-sm text-gray-600">6 subjects</div>
          </div>
          <div class="text-center p-4 bg-orange-50 metro-card">
            <div class="text-3xl mb-2">🎯</div>
            <div class="font-semibold">Flight Test</div>
            <div class="text-sm text-gray-600">FPP Practical</div>
          </div>
        </div>
        
        <!-- CAA Part 61 Explanation -->
        <div class="bg-blue-50 p-4 metro-card" data-testid="part-61-explanation">
          <h3 class="font-semibold text-blue-800 mb-2">📜 CAA Part 61 Requirements</h3>
          <p class="text-blue-700 text-sm">
            New Zealand Private Pilot Licence requirements are governed by CAA Part 61. 
            This comprehensive regulation outlines all training, experience, and examination 
            requirements for obtaining your PPL(A) in New Zealand airspace.
          </p>
        </div>
      </div>

      <!-- Educational Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Medical Certificate Education -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">🏥 Medical Certificate Guide</h3>
          <p class="text-gray-600 mb-4">
            Understand the medical requirements for PPL training and choose between Class 2 and DL9 options.
          </p>
          <button 
            @click="showMedicalEducation = true"
            class="btn btn-primary w-full"
            data-testid="medical-education-link">
            Learn About Medical Requirements
          </button>
        </div>

        <!-- Theory Exam Education -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">📖 Theory Exam Guide</h3>
          <p class="text-gray-600 mb-4">
            Master all 6 theory exam subjects with detailed explanations and study resources.
          </p>
          <button 
            @click="showTheoryEducation = true"
            class="btn btn-primary w-full"
            data-testid="theory-education-link">
            Study Theory Requirements
          </button>
        </div>

        <!-- Flight Hours Education -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">⏱️ Flight Hours Guide</h3>
          <p class="text-gray-600 mb-4">
            Understand NZ-specific hour requirements including terrain awareness and controlled airspace.
          </p>
          <button 
            @click="showHoursEducation = true"
            class="btn btn-primary w-full"
            data-testid="hours-education-link">
            Learn About Hour Requirements
          </button>
        </div>

        <!-- Flight Test Education -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">🎯 Flight Test Guide</h3>
          <p class="text-gray-600 mb-4">
            Prepare for your Flight Proficiency Program (FPP) with comprehensive guidance.
          </p>
          <button 
            @click="showFPPEducation = true"
            class="btn btn-primary w-full"
            data-testid="fpp-education-link">
            Prepare for Flight Test
          </button>
        </div>
      </div>

      <!-- Timeline and Cost Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Typical Timeline -->
        <div class="card" data-testid="typical-timeline-info">
          <h3 class="text-lg font-semibold mb-4">⏳ Typical Training Timeline</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span>Accelerated (3-4 lessons/week):</span>
              <span class="font-semibold">3-4 months</span>
            </div>
            <div class="flex justify-between">
              <span>Standard (1-2 lessons/week):</span>
              <span class="font-semibold">6-8 months</span>
            </div>
            <div class="flex justify-between">
              <span>Part-time (1 lesson/week):</span>
              <span class="font-semibold">8-12 months</span>
            </div>
          </div>
          <div class="mt-4 p-3 bg-yellow-50 metro-card">
            <p class="text-yellow-800 text-sm">
              <strong>Note:</strong> Timeline varies based on weather, aircraft availability, 
              and individual progress. NZ weather can impact training consistency.
            </p>
          </div>
        </div>

        <!-- Cost Breakdown Education -->
        <div class="card" data-testid="cost-breakdown-education">
          <h3 class="text-lg font-semibold mb-4">💰 Comprehensive Cost Guide</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Flight Training (40-50hrs):</span>
              <span>$18,000-$25,000</span>
            </div>
            <div class="flex justify-between">
              <span>Theory Exams (6 subjects):</span>
              <span>$390</span>
            </div>
            <div class="flex justify-between">
              <span>Medical Certificate:</span>
              <span>$420-$1,070</span>
            </div>
            <div class="flex justify-between">
              <span>Equipment & Materials:</span>
              <span>$2,000-$4,000</span>
            </div>
            <div class="flex justify-between">
              <span>Flight Test (FPP):</span>
              <span>$800-$1,200</span>
            </div>
            <div class="border-t pt-2 mt-2 font-semibold">
              <div class="flex justify-between">
                <span>Total Estimated Cost:</span>
                <span>$25,000-$35,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Study Resources -->
      <div class="card mb-8" data-testid="study-resources-section">
        <h3 class="text-lg font-semibold mb-4">📖 Study Resources & Links</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- CAA Resources -->
          <div data-testid="caa-resources-link">
            <h4 class="font-semibold mb-3">🏛️ Official CAA Resources</h4>
            <div class="space-y-2 text-sm">
              <a href="https://www.caa.govt.nz" target="_blank" class="block text-blue-600 hover:underline">
                CAA New Zealand Website
              </a>
              <a href="https://www.caa.govt.nz/rules/rule-part-61/" target="_blank" class="block text-blue-600 hover:underline">
                Part 61 - Pilot Licences and Ratings
              </a>
              <a href="https://www.caa.govt.nz/safety/aviation-medicine/" target="_blank" class="block text-blue-600 hover:underline">
                Aviation Medicine Information
              </a>
            </div>
          </div>

          <!-- Theory Exam Prep -->
          <div data-testid="theory-prep-resources">
            <h4 class="font-semibold mb-3">📚 Theory Exam Preparation</h4>
            <div class="space-y-2 text-sm">
              <div class="text-gray-600">• Air Traffic Services and Procedures</div>
              <div class="text-gray-600">• Meteorology Study Guides</div>
              <div class="text-gray-600">• Navigation Practice Questions</div>
              <div class="text-gray-600">• Human Factors Resources</div>
              <div class="text-gray-600">• Technical Knowledge Materials</div>
            </div>
          </div>

          <!-- Flight Training Resources -->
          <div data-testid="flight-training-resources">
            <h4 class="font-semibold mb-3">✈️ Flight Training Resources</h4>
            <div class="space-y-2 text-sm">
              <div class="text-gray-600">• Flight Training Organizations</div>
              <div class="text-gray-600">• Aircraft Rental Options</div>
              <div class="text-gray-600">• Weather Resources</div>
              <div class="text-gray-600">• Airspace Charts</div>
              <div class="text-gray-600">• Flight Planning Tools</div>
            </div>
          </div>
        </div>
      </div>

      <!-- School Selection Tips -->
      <div class="card mb-8" data-testid="school-selection-tips">
        <h3 class="text-lg font-semibold mb-4">🏫 Choosing a Flight School</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold mb-3">✅ What to Look For</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• CAA Part 141 or Part 61 authorization</li>
              <li>• Experienced, qualified instructors</li>
              <li>• Well-maintained aircraft fleet</li>
              <li>• Structured training programs</li>
              <li>• Good safety record</li>
              <li>• Reasonable pricing structure</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-3">❓ Questions to Ask</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• What is the average time to PPL completion?</li>
              <li>• What are the total costs involved?</li>
              <li>• How often can I schedule lessons?</li>
              <li>• What happens if weather cancels lessons?</li>
              <li>• Do you provide theory exam preparation?</li>
              <li>• What is your first-time pass rate?</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Back to Dashboard -->
      <div class="text-center mt-16 mb-8 pt-8" style="margin-top: 4rem; padding-top: 2rem; margin-bottom: 2rem;">
        <router-link to="/dashboard" class="btn btn-primary">
          ← Back to Dashboard
        </router-link>
      </div>
    </div>

    <!-- Medical Education Modal -->
    <div v-if="showMedicalEducation" class="modal-overlay" @click="showMedicalEducation = false">
      <div class="modal-content max-w-4xl" @click.stop data-testid="medical-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">🏥 Medical Certificate Requirements</h3>
          
          <!-- Class 2 vs DL9 Comparison -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border metro-card p-4" data-testid="class-2-explanation">
              <h4 class="font-semibold text-blue-600 mb-3">Class 2 Medical Certificate</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Required for:</strong> All private pilot operations</p>
                <p><strong>Validity:</strong> 5 years (under 40), 2 years (40+)</p>
                <p><strong>Examination:</strong> Comprehensive medical by CAA-approved doctor</p>
                <p><strong>Cost:</strong> $420-$1,070 depending on tests required</p>
                <p><strong>Includes:</strong> Vision, hearing, cardiovascular, neurological tests</p>
              </div>
            </div>
            
            <div class="border metro-card p-4" data-testid="dl9-explanation">
              <h4 class="font-semibold text-green-600 mb-3">DL9 Driver License Medical</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Alternative option:</strong> Use existing NZ driver license medical</p>
                <p><strong>Validity:</strong> Same as your driver license</p>
                <p><strong>Requirements:</strong> Valid NZ driver license in good health</p>
                <p><strong>Cost:</strong> Significantly cheaper than Class 2</p>
                <p><strong>Limitations:</strong> Private operations only, no commercial flying</p>
              </div>
            </div>
          </div>

          <!-- Cost Comparison -->
          <div class="bg-gray-50 p-4 metro-card mb-6" data-testid="medical-cost-comparison">
            <h4 class="font-semibold mb-3">💰 Cost Comparison</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Class 2 Medical:</strong> $420-$1,070
                <br><em>One-time comprehensive examination</em>
              </div>
              <div>
                <strong>DL9 Option:</strong> $0-$200
                <br><em>Use existing driver license medical</em>
              </div>
            </div>
          </div>

          <!-- Eligibility Requirements -->
          <div class="bg-blue-50 p-4 metro-card mb-6" data-testid="medical-eligibility-info">
            <h4 class="font-semibold text-blue-800 mb-3">✅ Eligibility Requirements</h4>
            <div class="text-blue-700 text-sm space-y-1">
              <p>• Must be at least 17 years old for PPL training</p>
              <p>• No disqualifying medical conditions</p>
              <p>• Meet vision standards (correctable to 20/20)</p>
              <p>• Meet hearing standards</p>
              <p>• Declare any medications or medical history</p>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="bg-green-50 p-4 metro-card mb-6" data-testid="medical-next-steps">
            <h4 class="font-semibold text-green-800 mb-3">🎯 Next Steps</h4>
            <div class="text-green-700 text-sm space-y-2">
              <p><strong>1. Choose your option:</strong> Decide between Class 2 or DL9 based on your needs</p>
              <p><strong>2. Find a CAME:</strong> Locate a Civil Aviation Medical Examiner near you</p>
              <p><strong>3. Book examination:</strong> Schedule your medical examination</p>
              <p><strong>4. Prepare documents:</strong> Bring ID, medical history, and current medications</p>
              <p><strong>5. Complete forms:</strong> Fill out CAA medical forms accurately</p>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showMedicalEducation = false" class="btn btn-primary flex-1">
              Got it!
            </button>
            <a href="https://www.caa.govt.nz/safety/aviation-medicine/" target="_blank" class="btn btn-secondary">
              CAA Medical Info
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Theory Education Modal -->
    <div v-if="showTheoryEducation" class="modal-overlay" @click="showTheoryEducation = false">
      <div class="modal-content max-w-5xl" @click.stop data-testid="theory-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">📚 Theory Exam Requirements</h3>
          
          <!-- Exam Format Info -->
          <div class="bg-blue-50 p-4 metro-card mb-6" data-testid="exam-format-info">
            <h4 class="font-semibold text-blue-800 mb-2">📋 Exam Format</h4>
            <div class="text-blue-700 text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <strong>Format:</strong> Multiple choice
                <br><strong>Duration:</strong> 90 minutes each
              </div>
              <div>
                <strong>Pass Mark:</strong> 70% minimum
                <br><strong>Cost:</strong> $65 per exam
              </div>
              <div>
                <strong>Attempts:</strong> Unlimited
                <br><strong>Validity:</strong> 2 years
              </div>
            </div>
          </div>

          <!-- 6 Exam Subjects -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="border metro-card p-4" data-testid="air-law-explanation">
              <h4 class="font-semibold text-purple-600 mb-2">📜 Air Law</h4>
              <p class="text-sm text-gray-600 mb-2">Aviation regulations, airspace, and legal requirements</p>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• CAA Part 91 General Operating Rules</li>
                <li>• Airspace classifications and requirements</li>
                <li>• Aircraft documents and markings</li>
                <li>• Pilot privileges and limitations</li>
              </ul>
            </div>

            <div class="border metro-card p-4" data-testid="navigation-explanation">
              <h4 class="font-semibold text-blue-600 mb-2">🧭 Navigation</h4>
              <p class="text-sm text-gray-600 mb-2">Chart reading, flight planning, and navigation techniques</p>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• Map reading and chart symbols</li>
                <li>• Dead reckoning and pilotage</li>
                <li>• GPS and electronic navigation</li>
                <li>• Flight planning and fuel calculations</li>
              </ul>
            </div>

            <div class="border metro-card p-4" data-testid="technical-knowledge-explanation">
              <h4 class="font-semibold text-green-600 mb-2">🔧 Technical Knowledge</h4>
              <p class="text-sm text-gray-600 mb-2">Aircraft systems, engines, and performance</p>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• Aircraft systems and components</li>
                <li>• Engine operation and maintenance</li>
                <li>• Weight and balance calculations</li>
                <li>• Performance charts and limitations</li>
              </ul>
            </div>

            <div class="border metro-card p-4" data-testid="human-factors-explanation">
              <h4 class="font-semibold text-orange-600 mb-2">🧠 Human Factors</h4>
              <p class="text-sm text-gray-600 mb-2">Aviation psychology, decision making, and safety</p>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• Threat and error management</li>
                <li>• Situational awareness</li>
                <li>• Fatigue and stress management</li>
                <li>• Risk assessment and decision making</li>
              </ul>
            </div>

            <div class="border metro-card p-4" data-testid="meteorology-explanation">
              <h4 class="font-semibold text-indigo-600 mb-2">🌤️ Meteorology</h4>
              <p class="text-sm text-gray-600 mb-2">Weather theory, forecasting, and interpretation</p>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• Weather systems and patterns</li>
                <li>• Cloud types and formation</li>
                <li>• Weather reports and forecasts</li>
                <li>• Hazardous weather conditions</li>
              </ul>
            </div>

            <div class="border metro-card p-4" data-testid="radio-telephony-explanation">
              <h4 class="font-semibold text-red-600 mb-2">📻 Radio Telephony</h4>
              <p class="text-sm text-gray-600 mb-2">Communication procedures and phraseology</p>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• Standard radio procedures</li>
                <li>• Controlled and uncontrolled airspace comms</li>
                <li>• Emergency communication procedures</li>
                <li>• Phonetic alphabet and numbers</li>
              </ul>
            </div>
          </div>

          <!-- Study Resources -->
          <div class="bg-green-50 p-4 metro-card mb-6" data-testid="theory-study-resources">
            <h4 class="font-semibold text-green-800 mb-3">📖 Study Resources</h4>
            <div class="text-green-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Official Resources:</strong>
                <ul class="mt-1 space-y-1">
                  <li>• CAA Part 61 Regulations</li>
                  <li>• Visual Flight Rules Guide</li>
                  <li>• AIP New Zealand</li>
                  <li>• CAA Safety Publications</li>
                </ul>
              </div>
              <div>
                <strong>Study Materials:</strong>
                <ul class="mt-1 space-y-1">
                  <li>• Flight school theory courses</li>
                  <li>• Online practice exams</li>
                  <li>• Aviation textbooks</li>
                  <li>• Study groups and forums</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Booking Information -->
          <div class="bg-yellow-50 p-4 metro-card mb-6" data-testid="exam-booking-info">
            <h4 class="font-semibold text-yellow-800 mb-2">📅 Booking Your Exams</h4>
            <div class="text-yellow-700 text-sm">
              <p class="mb-2">Theory exams are conducted at approved testing centres throughout New Zealand.</p>
              <p><strong>Booking:</strong> Contact your local testing centre or flight school to schedule exams</p>
              <p><strong>Timing:</strong> You can take exams in any order, but all must be passed before your flight test</p>
              <p><strong>Preparation:</strong> Most students require 2-4 weeks of study per subject</p>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showTheoryEducation = false" class="btn btn-primary flex-1">
              Start Studying!
            </button>
            <router-link to="/theory" class="btn btn-secondary">
              Track My Progress
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Hours Education Modal -->
    <div v-if="showHoursEducation" class="modal-overlay" @click="showHoursEducation = false">
      <div class="modal-content max-w-4xl" @click.stop data-testid="hours-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">⏱️ Flight Hours Requirements</h3>
          
          <!-- Minimum Hours -->
          <div class="bg-blue-50 p-4 metro-card mb-6" data-testid="minimum-hours-explanation">
            <h4 class="font-semibold text-blue-800 mb-2">📊 Minimum Hour Requirements</h4>
            <div class="text-blue-700">
              <p class="mb-2"><strong>Total Minimum:</strong> 50 hours flight time</p>
              <p class="text-sm">Most students require 60-80 hours to reach proficiency for the flight test.</p>
            </div>
          </div>

          <!-- Hour Types Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border metro-card p-4" data-testid="dual-hours-explanation">
              <h4 class="font-semibold text-green-600 mb-2">👨‍✈️ Dual Instruction Hours</h4>
              <div class="text-sm space-y-2">
                <p><strong>Minimum Required:</strong> 25 hours with instructor</p>
                <p><strong>Includes:</strong></p>
                <ul class="ml-4 space-y-1">
                  <li>• Basic flight maneuvers</li>
                  <li>• Emergency procedures</li>
                  <li>• Cross-country navigation</li>
                  <li>• Solo preparation</li>
                  <li>• Flight test preparation</li>
                </ul>
              </div>
            </div>

            <div class="border metro-card p-4" data-testid="solo-hours-explanation">
              <h4 class="font-semibold text-purple-600 mb-2">🦅 Solo Flight Hours</h4>
              <div class="text-sm space-y-2">
                <p><strong>Minimum Required:</strong> 15 hours solo</p>
                <p><strong>Includes:</strong></p>
                <ul class="ml-4 space-y-1">
                  <li>• 5 hours solo cross-country</li>
                  <li>• Local area practice</li>
                  <li>• Pattern work</li>
                  <li>• Skill building flights</li>
                </ul>
              </div>
            </div>

            <div class="border metro-card p-4 md:col-span-2" data-testid="cross-country-explanation">
              <h4 class="font-semibold text-orange-600 mb-2">🗺️ Cross-Country Requirements</h4>
              <div class="text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Solo Cross-Country:</strong> 5 hours minimum</p>
                  <ul class="ml-4 mt-2 space-y-1">
                    <li>• At least one flight over 150nm</li>
                    <li>• Minimum 2 intermediate stops</li>
                    <li>• Solo navigation and planning</li>
                  </ul>
                </div>
                <div>
                  <p><strong>Dual Cross-Country:</strong> Included in dual time</p>
                  <ul class="ml-4 mt-2 space-y-1">
                    <li>• Navigation training</li>
                    <li>• Different airport procedures</li>
                    <li>• Flight planning practice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- NZ-Specific Requirements -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-green-50 p-4 metro-card" data-testid="nz-terrain-awareness-info">
              <h4 class="font-semibold text-green-800 mb-2">🏔️ NZ Terrain Awareness</h4>
              <div class="text-green-700 text-sm">
                <p class="mb-2">New Zealand's mountainous terrain requires specific training:</p>
                <ul class="space-y-1">
                  <li>• Mountain flying techniques</li>
                  <li>• Valley flying procedures</li>
                  <li>• Weather recognition in terrain</li>
                  <li>• Density altitude effects</li>
                  <li>• Emergency landing site selection</li>
                </ul>
              </div>
            </div>

            <div class="bg-purple-50 p-4 metro-card" data-testid="controlled-airspace-info">
              <h4 class="font-semibold text-purple-800 mb-2">🛂 Controlled Airspace</h4>
              <div class="text-purple-700 text-sm">
                <p class="mb-2">Training must include controlled airspace operations:</p>
                <ul class="space-y-1">
                  <li>• Class C airspace procedures</li>
                  <li>• ATC communication</li>
                  <li>• Transponder operations</li>
                  <li>• Airways and reporting points</li>
                  <li>• Terminal area procedures</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Hour Logging Guidance -->
          <div class="bg-yellow-50 p-4 metro-card mb-6" data-testid="hour-logging-guidance">
            <h4 class="font-semibold text-yellow-800 mb-2">📝 Hour Logging Guidelines</h4>
            <div class="text-yellow-700 text-sm space-y-2">
              <p><strong>What Counts:</strong> All flight time from engine start to engine stop</p>
              <p><strong>Required Records:</strong> Date, aircraft type, route, flight time, duty type</p>
              <p><strong>Logbook Requirements:</strong> Must be signed by instructor for dual flights</p>
              <p><strong>Digital vs Paper:</strong> Both acceptable, but must be verifiable</p>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showHoursEducation = false" class="btn btn-primary flex-1">
              Start Logging Hours
            </button>
            <router-link to="/journey" class="btn btn-secondary">
              Track My Progress
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- FPP Education Modal -->
    <div v-if="showFPPEducation" class="modal-overlay" @click="showFPPEducation = false">
      <div class="modal-content max-w-4xl" @click.stop data-testid="fpp-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">🎯 Flight Proficiency Program (FPP)</h3>
          
          <!-- FPP Components -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border metro-card p-4" data-testid="fpp-oral-exam-info">
              <h4 class="font-semibold text-blue-600 mb-2">🗣️ Oral Examination</h4>
              <div class="text-sm space-y-2">
                <p><strong>Duration:</strong> 30-60 minutes</p>
                <p><strong>Content:</strong> Theory knowledge application</p>
                <ul class="ml-4 mt-2 space-y-1">
                  <li>• Aircraft systems and limitations</li>
                  <li>• Weather interpretation</li>
                  <li>• Navigation and flight planning</li>
                  <li>• Emergency procedures</li>
                  <li>• Regulations and airspace</li>
                </ul>
              </div>
            </div>

            <div class="border metro-card p-4" data-testid="fpp-flight-test-info">
              <h4 class="font-semibold text-green-600 mb-2">✈️ Practical Flight Test</h4>
              <div class="text-sm space-y-2">
                <p><strong>Duration:</strong> 90-120 minutes</p>
                <p><strong>Content:</strong> Demonstration of flying skills</p>
                <ul class="ml-4 mt-2 space-y-1">
                  <li>• Pre-flight inspection and planning</li>
                  <li>• Normal and emergency procedures</li>
                  <li>• Navigation and communication</li>
                  <li>• Flight maneuvers to standards</li>
                  <li>• Decision making and safety</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Preparation Tips -->
          <div class="bg-blue-50 p-4 metro-card mb-6" data-testid="fpp-preparation-tips">
            <h4 class="font-semibold text-blue-800 mb-3">📚 Preparation Tips</h4>
            <div class="text-blue-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Before the Test:</strong>
                <ul class="mt-1 space-y-1">
                  <li>• Complete instructor recommendation</li>
                  <li>• Review all theory subjects</li>
                  <li>• Practice flight test maneuvers</li>
                  <li>• Study aircraft systems thoroughly</li>
                </ul>
              </div>
              <div>
                <strong>Test Day:</strong>
                <ul class="mt-1 space-y-1">
                  <li>• Arrive early and prepared</li>
                  <li>• Bring all required documents</li>
                  <li>• Stay calm and confident</li>
                  <li>• Ask for clarification if needed</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Required Documents -->
          <div class="bg-green-50 p-4 metro-card mb-6" data-testid="fpp-required-documents">
            <h4 class="font-semibold text-green-800 mb-2">📄 Required Documents</h4>
            <div class="text-green-700 text-sm grid grid-cols-2 gap-4">
              <div>
                <strong>Personal Documents:</strong>
                <ul class="mt-1 space-y-1">
                  <li>• Valid medical certificate</li>
                  <li>• Student pilot permit</li>
                  <li>• Photo identification</li>
                  <li>• Logbook with endorsements</li>
                </ul>
              </div>
              <div>
                <strong>Training Records:</strong>
                <ul class="mt-1 space-y-1">
                  <li>• Theory exam certificates</li>
                  <li>• Flight training records</li>
                  <li>• Instructor recommendations</li>
                  <li>• Solo endorsements</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Examiner Information -->
          <div class="bg-purple-50 p-4 metro-card mb-6" data-testid="fpp-examiner-info">
            <h4 class="font-semibold text-purple-800 mb-2">👨‍✈️ About Your Examiner</h4>
            <div class="text-purple-700 text-sm">
              <p class="mb-2">Your flight test will be conducted by a CAA authorised examiner who:</p>
              <ul class="space-y-1">
                <li>• Holds appropriate qualifications and experience</li>
                <li>• Is independent from your training organization</li>
                <li>• Will assess you fairly against published standards</li>
                <li>• Can provide valuable feedback on your performance</li>
              </ul>
            </div>
          </div>

          <!-- Cost Information -->
          <div class="bg-orange-50 p-4 metro-card mb-6" data-testid="fpp-cost-info">
            <h4 class="font-semibold text-orange-800 mb-2">💰 Cost Information</h4>
            <div class="text-orange-700 text-sm space-y-2">
              <p><strong>Typical FPP Costs:</strong></p>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <ul class="space-y-1">
                    <li>• Examiner fee: $400-$600</li>
                    <li>• Aircraft rental: $300-$500</li>
                  </ul>
                </div>
                <div>
                  <ul class="space-y-1">
                    <li>• Total cost: $800-$1,200</li>
                    <li>• Retest fee: $200-$400 (if required)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showFPPEducation = false" class="btn btn-primary flex-1">
              Ready to Test!
            </button>
            <router-link to="/requirements" class="btn btn-secondary">
              Check Requirements
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Modal state
const showMedicalEducation = ref(false)
const showTheoryEducation = ref(false)
const showHoursEducation = ref(false)
const showFPPEducation = ref(false)
</script>

<style scoped>
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}
</style>