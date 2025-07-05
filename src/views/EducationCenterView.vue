<template>
  <div>
    <div>
      <!-- Header -->
      <div>
        <h1>📚 Education Center</h1>
        <p>
          Learn about New Zealand PPL requirements and aviation regulations
        </p>
      </div>

      <!-- PPL Pathway Overview -->
      <div data-testid="ppl-pathway-overview">
        <h2>🎯 Complete PPL Pathway</h2>
        <div>
          <div>
            <div>📋</div>
            <div>Medical Certificate</div>
            <div>Class 2 or DL9</div>
          </div>
          <div>
            <div>✈️</div>
            <div>Flight Training</div>
            <div>50+ hours</div>
          </div>
          <div>
            <div>📚</div>
            <div>Theory Exams</div>
            <div>6 subjects</div>
          </div>
          <div>
            <div>🎯</div>
            <div>Flight Test</div>
            <div>FPP Practical</div>
          </div>
        </div>
        
        <!-- CAA Part 61 Explanation -->
        <div data-testid="part-61-explanation">
          <h3>📜 CAA Part 61 Requirements</h3>
          <p>
            New Zealand Private Pilot Licence requirements are governed by CAA Part 61. 
            This comprehensive regulation outlines all training, experience, and examination 
            requirements for obtaining your PPL(A) in New Zealand airspace.
          </p>
        </div>
      </div>

      <!-- Educational Content Grid -->
      <div>
        <!-- Medical Certificate Education -->
        <div>
          <h3>🏥 Medical Certificate Guide</h3>
          <p>
            Understand the medical requirements for PPL training and choose between Class 2 and DL9 options.
          </p>
          <button 
            @click="showMedicalEducation = true"
            data-testid="medical-education-link">
            Learn About Medical Requirements
          </button>
        </div>

        <!-- Theory Exam Education -->
        <div>
          <h3>📖 Theory Exam Guide</h3>
          <p>
            Master all 6 theory exam subjects with detailed explanations and study resources.
          </p>
          <button 
            @click="showTheoryEducation = true"
            data-testid="theory-education-link">
            Study Theory Requirements
          </button>
        </div>

        <!-- Flight Hours Education -->
        <div>
          <h3>⏱️ Flight Hours Guide</h3>
          <p>
            Understand NZ-specific hour requirements including terrain awareness and controlled airspace.
          </p>
          <button 
            @click="showHoursEducation = true"
            data-testid="hours-education-link">
            Learn About Hour Requirements
          </button>
        </div>

        <!-- Flight Test Education -->
        <div>
          <h3>🎯 Flight Test Guide</h3>
          <p>
            Prepare for your Flight Proficiency Program (FPP) with comprehensive guidance.
          </p>
          <button 
            @click="showFPPEducation = true"
            data-testid="fpp-education-link">
            Prepare for Flight Test
          </button>
        </div>
      </div>

      <!-- Timeline and Cost Information -->
      <div>
        <!-- Typical Timeline -->
        <div data-testid="typical-timeline-info">
          <h3>⏳ Typical Training Timeline</h3>
          <div>
            <div>
              <span>Accelerated (3-4 lessons/week):</span>
              <span>3-4 months</span>
            </div>
            <div>
              <span>Standard (1-2 lessons/week):</span>
              <span>6-8 months</span>
            </div>
            <div>
              <span>Part-time (1 lesson/week):</span>
              <span>8-12 months</span>
            </div>
          </div>
          <div>
            <p>
              <strong>Note:</strong> Timeline varies based on weather, aircraft availability, 
              and individual progress. NZ weather can impact training consistency.
            </p>
          </div>
        </div>

        <!-- Cost Breakdown Education -->
        <div data-testid="cost-breakdown-education">
          <h3>💰 Comprehensive Cost Guide</h3>
          <div>
            <div>
              <span>Flight Training (40-50hrs):</span>
              <span>$18,000-$25,000</span>
            </div>
            <div>
              <span>Theory Exams (6 subjects):</span>
              <span>$390</span>
            </div>
            <div>
              <span>Medical Certificate:</span>
              <span>$420-$1,070</span>
            </div>
            <div>
              <span>Equipment & Materials:</span>
              <span>$2,000-$4,000</span>
            </div>
            <div>
              <span>Flight Test (FPP):</span>
              <span>$800-$1,200</span>
            </div>
            <div>
              <div>
                <span>Total Estimated Cost:</span>
                <span>$25,000-$35,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Study Resources -->
      <div data-testid="study-resources-section">
        <h3>📖 Study Resources & Links</h3>
        
        <div>
          <!-- CAA Resources -->
          <div data-testid="caa-resources-link">
            <h4>🏛️ Official CAA Resources</h4>
            <div>
              <a href="https://www.caa.govt.nz" target="_blank">
                CAA New Zealand Website
              </a>
              <a href="https://www.caa.govt.nz/rules/rule-part-61/" target="_blank">
                Part 61 - Pilot Licences and Ratings
              </a>
              <a href="https://www.caa.govt.nz/safety/aviation-medicine/" target="_blank">
                Aviation Medicine Information
              </a>
            </div>
          </div>

          <!-- Theory Exam Prep -->
          <div data-testid="theory-prep-resources">
            <h4>📚 Theory Exam Preparation</h4>
            <div>
              <div>• Air Traffic Services and Procedures</div>
              <div>• Meteorology Study Guides</div>
              <div>• Navigation Practice Questions</div>
              <div>• Human Factors Resources</div>
              <div>• Technical Knowledge Materials</div>
            </div>
          </div>

          <!-- Flight Training Resources -->
          <div data-testid="flight-training-resources">
            <h4>✈️ Flight Training Resources</h4>
            <div>
              <div>• Flight Training Organizations</div>
              <div>• Aircraft Rental Options</div>
              <div>• Weather Resources</div>
              <div>• Airspace Charts</div>
              <div>• Flight Planning Tools</div>
            </div>
          </div>
        </div>
      </div>

      <!-- School Selection Tips -->
      <div data-testid="school-selection-tips">
        <h3>🏫 Choosing a Flight School</h3>
        <div>
          <div>
            <h4>✅ What to Look For</h4>
            <ul>
              <li>• CAA Part 141 or Part 61 authorization</li>
              <li>• Experienced, qualified instructors</li>
              <li>• Well-maintained aircraft fleet</li>
              <li>• Structured training programs</li>
              <li>• Good safety record</li>
              <li>• Reasonable pricing structure</li>
            </ul>
          </div>
          <div>
            <h4>❓ Questions to Ask</h4>
            <ul>
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
      <div>
        <router-link to="/dashboard">
          ← Back to Dashboard
        </router-link>
      </div>
    </div>

    <!-- Medical Education Modal -->
    <div v-if="showMedicalEducation" @click="showMedicalEducation = false">
      <div @click.stop data-testid="medical-education-modal">
        <div>
          <h3>🏥 Medical Certificate Requirements</h3>
          
          <!-- Class 2 vs DL9 Comparison -->
          <div>
            <div data-testid="class-2-explanation">
              <h4>Class 2 Medical Certificate</h4>
              <div>
                <p><strong>Required for:</strong> All private pilot operations</p>
                <p><strong>Validity:</strong> 5 years (under 40), 2 years (40+)</p>
                <p><strong>Examination:</strong> Comprehensive medical by CAA-approved doctor</p>
                <p><strong>Cost:</strong> $420-$1,070 depending on tests required</p>
                <p><strong>Includes:</strong> Vision, hearing, cardiovascular, neurological tests</p>
              </div>
            </div>
            
            <div data-testid="dl9-explanation">
              <h4>DL9 Driver License Medical</h4>
              <div>
                <p><strong>Alternative option:</strong> Use existing NZ driver license medical</p>
                <p><strong>Validity:</strong> Same as your driver license</p>
                <p><strong>Requirements:</strong> Valid NZ driver license in good health</p>
                <p><strong>Cost:</strong> Significantly cheaper than Class 2</p>
                <p><strong>Limitations:</strong> Private operations only, no commercial flying</p>
              </div>
            </div>
          </div>

          <!-- Cost Comparison -->
          <div data-testid="medical-cost-comparison">
            <h4>💰 Cost Comparison</h4>
            <div>
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
          <div data-testid="medical-eligibility-info">
            <h4>✅ Eligibility Requirements</h4>
            <div>
              <p>• Must be at least 17 years old for PPL training</p>
              <p>• No disqualifying medical conditions</p>
              <p>• Meet vision standards (correctable to 20/20)</p>
              <p>• Meet hearing standards</p>
              <p>• Declare any medications or medical history</p>
            </div>
          </div>

          <!-- Next Steps -->
          <div data-testid="medical-next-steps">
            <h4>🎯 Next Steps</h4>
            <div>
              <p><strong>1. Choose your option:</strong> Decide between Class 2 or DL9 based on your needs</p>
              <p><strong>2. Find a CAME:</strong> Locate a Civil Aviation Medical Examiner near you</p>
              <p><strong>3. Book examination:</strong> Schedule your medical examination</p>
              <p><strong>4. Prepare documents:</strong> Bring ID, medical history, and current medications</p>
              <p><strong>5. Complete forms:</strong> Fill out CAA medical forms accurately</p>
            </div>
          </div>

          <div>
            <button @click="showMedicalEducation = false">
              Got it!
            </button>
            <a href="https://www.caa.govt.nz/safety/aviation-medicine/" target="_blank">
              CAA Medical Info
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Theory Education Modal -->
    <div v-if="showTheoryEducation" @click="showTheoryEducation = false">
      <div @click.stop data-testid="theory-education-modal">
        <div>
          <h3>📚 Theory Exam Requirements</h3>
          
          <!-- Exam Format Info -->
          <div data-testid="exam-format-info">
            <h4>📋 Exam Format</h4>
            <div>
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
          <div>
            <div data-testid="air-law-explanation">
              <h4>📜 Air Law</h4>
              <p>Aviation regulations, airspace, and legal requirements</p>
              <ul>
                <li>• CAA Part 91 General Operating Rules</li>
                <li>• Airspace classifications and requirements</li>
                <li>• Aircraft documents and markings</li>
                <li>• Pilot privileges and limitations</li>
              </ul>
            </div>

            <div data-testid="navigation-explanation">
              <h4>🧭 Navigation</h4>
              <p>Chart reading, flight planning, and navigation techniques</p>
              <ul>
                <li>• Map reading and chart symbols</li>
                <li>• Dead reckoning and pilotage</li>
                <li>• GPS and electronic navigation</li>
                <li>• Flight planning and fuel calculations</li>
              </ul>
            </div>

            <div data-testid="technical-knowledge-explanation">
              <h4>🔧 Technical Knowledge</h4>
              <p>Aircraft systems, engines, and performance</p>
              <ul>
                <li>• Aircraft systems and components</li>
                <li>• Engine operation and maintenance</li>
                <li>• Weight and balance calculations</li>
                <li>• Performance charts and limitations</li>
              </ul>
            </div>

            <div data-testid="human-factors-explanation">
              <h4>🧠 Human Factors</h4>
              <p>Aviation psychology, decision making, and safety</p>
              <ul>
                <li>• Threat and error management</li>
                <li>• Situational awareness</li>
                <li>• Fatigue and stress management</li>
                <li>• Risk assessment and decision making</li>
              </ul>
            </div>

            <div data-testid="meteorology-explanation">
              <h4>🌤️ Meteorology</h4>
              <p>Weather theory, forecasting, and interpretation</p>
              <ul>
                <li>• Weather systems and patterns</li>
                <li>• Cloud types and formation</li>
                <li>• Weather reports and forecasts</li>
                <li>• Hazardous weather conditions</li>
              </ul>
            </div>

            <div data-testid="radio-telephony-explanation">
              <h4>📻 Radio Telephony</h4>
              <p>Communication procedures and phraseology</p>
              <ul>
                <li>• Standard radio procedures</li>
                <li>• Controlled and uncontrolled airspace comms</li>
                <li>• Emergency communication procedures</li>
                <li>• Phonetic alphabet and numbers</li>
              </ul>
            </div>
          </div>

          <!-- Study Resources -->
          <div data-testid="theory-study-resources">
            <h4>📖 Study Resources</h4>
            <div>
              <div>
                <strong>Official Resources:</strong>
                <ul>
                  <li>• CAA Part 61 Regulations</li>
                  <li>• Visual Flight Rules Guide</li>
                  <li>• AIP New Zealand</li>
                  <li>• CAA Safety Publications</li>
                </ul>
              </div>
              <div>
                <strong>Study Materials:</strong>
                <ul>
                  <li>• Flight school theory courses</li>
                  <li>• Online practice exams</li>
                  <li>• Aviation textbooks</li>
                  <li>• Study groups and forums</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Booking Information -->
          <div data-testid="exam-booking-info">
            <h4>📅 Booking Your Exams</h4>
            <div>
              <p>Theory exams are conducted at approved testing centres throughout New Zealand.</p>
              <p><strong>Booking:</strong> Contact your local testing centre or flight school to schedule exams</p>
              <p><strong>Timing:</strong> You can take exams in any order, but all must be passed before your flight test</p>
              <p><strong>Preparation:</strong> Most students require 2-4 weeks of study per subject</p>
            </div>
          </div>

          <div>
            <button @click="showTheoryEducation = false">
              Start Studying!
            </button>
            <router-link to="/theory">
              Track My Progress
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Hours Education Modal -->
    <div v-if="showHoursEducation" @click="showHoursEducation = false">
      <div @click.stop data-testid="hours-education-modal">
        <div>
          <h3>⏱️ Flight Hours Requirements</h3>
          
          <!-- Minimum Hours -->
          <div data-testid="minimum-hours-explanation">
            <h4>📊 Minimum Hour Requirements</h4>
            <div>
              <p><strong>Total Minimum:</strong> 50 hours flight time</p>
              <p>Most students require 60-80 hours to reach proficiency for the flight test.</p>
            </div>
          </div>

          <!-- Hour Types Breakdown -->
          <div>
            <div data-testid="dual-hours-explanation">
              <h4>👨‍✈️ Dual Instruction Hours</h4>
              <div>
                <p><strong>Minimum Required:</strong> 25 hours with instructor</p>
                <p><strong>Includes:</strong></p>
                <ul>
                  <li>• Basic flight maneuvers</li>
                  <li>• Emergency procedures</li>
                  <li>• Cross-country navigation</li>
                  <li>• Solo preparation</li>
                  <li>• Flight test preparation</li>
                </ul>
              </div>
            </div>

            <div data-testid="solo-hours-explanation">
              <h4>🦅 Solo Flight Hours</h4>
              <div>
                <p><strong>Minimum Required:</strong> 15 hours solo</p>
                <p><strong>Includes:</strong></p>
                <ul>
                  <li>• 5 hours solo cross-country</li>
                  <li>• Local area practice</li>
                  <li>• Pattern work</li>
                  <li>• Skill building flights</li>
                </ul>
              </div>
            </div>

            <div data-testid="cross-country-explanation">
              <h4>🗺️ Cross-Country Requirements</h4>
              <div>
                <div>
                  <p><strong>Solo Cross-Country:</strong> 5 hours minimum</p>
                  <ul>
                    <li>• At least one flight over 150nm</li>
                    <li>• Minimum 2 intermediate stops</li>
                    <li>• Solo navigation and planning</li>
                  </ul>
                </div>
                <div>
                  <p><strong>Dual Cross-Country:</strong> Included in dual time</p>
                  <ul>
                    <li>• Navigation training</li>
                    <li>• Different airport procedures</li>
                    <li>• Flight planning practice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- NZ-Specific Requirements -->
          <div>
            <div data-testid="nz-terrain-awareness-info">
              <h4>🏔️ NZ Terrain Awareness</h4>
              <div>
                <p>New Zealand's mountainous terrain requires specific training:</p>
                <ul>
                  <li>• Mountain flying techniques</li>
                  <li>• Valley flying procedures</li>
                  <li>• Weather recognition in terrain</li>
                  <li>• Density altitude effects</li>
                  <li>• Emergency landing site selection</li>
                </ul>
              </div>
            </div>

            <div data-testid="controlled-airspace-info">
              <h4>🛂 Controlled Airspace</h4>
              <div>
                <p>Training must include controlled airspace operations:</p>
                <ul>
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
          <div data-testid="hour-logging-guidance">
            <h4>📝 Hour Logging Guidelines</h4>
            <div>
              <p><strong>What Counts:</strong> All flight time from engine start to engine stop</p>
              <p><strong>Required Records:</strong> Date, aircraft type, route, flight time, duty type</p>
              <p><strong>Logbook Requirements:</strong> Must be signed by instructor for dual flights</p>
              <p><strong>Digital vs Paper:</strong> Both acceptable, but must be verifiable</p>
            </div>
          </div>

          <div>
            <button @click="showHoursEducation = false">
              Start Logging Hours
            </button>
            <div>
              Track My Progress
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FPP Education Modal -->
    <div v-if="showFPPEducation" @click="showFPPEducation = false">
      <div @click.stop data-testid="fpp-education-modal">
        <div>
          <h3>🎯 Flight Proficiency Program (FPP)</h3>
          
          <!-- FPP Components -->
          <div>
            <div data-testid="fpp-oral-exam-info">
              <h4>🗣️ Oral Examination</h4>
              <div>
                <p><strong>Duration:</strong> 30-60 minutes</p>
                <p><strong>Content:</strong> Theory knowledge application</p>
                <ul>
                  <li>• Aircraft systems and limitations</li>
                  <li>• Weather interpretation</li>
                  <li>• Navigation and flight planning</li>
                  <li>• Emergency procedures</li>
                  <li>• Regulations and airspace</li>
                </ul>
              </div>
            </div>

            <div data-testid="fpp-flight-test-info">
              <h4>✈️ Practical Flight Test</h4>
              <div>
                <p><strong>Duration:</strong> 90-120 minutes</p>
                <p><strong>Content:</strong> Demonstration of flying skills</p>
                <ul>
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
          <div data-testid="fpp-preparation-tips">
            <h4>📚 Preparation Tips</h4>
            <div>
              <div>
                <strong>Before the Test:</strong>
                <ul>
                  <li>• Complete instructor recommendation</li>
                  <li>• Review all theory subjects</li>
                  <li>• Practice flight test maneuvers</li>
                  <li>• Study aircraft systems thoroughly</li>
                </ul>
              </div>
              <div>
                <strong>Test Day:</strong>
                <ul>
                  <li>• Arrive early and prepared</li>
                  <li>• Bring all required documents</li>
                  <li>• Stay calm and confident</li>
                  <li>• Ask for clarification if needed</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Required Documents -->
          <div data-testid="fpp-required-documents">
            <h4>📄 Required Documents</h4>
            <div>
              <div>
                <strong>Personal Documents:</strong>
                <ul>
                  <li>• Valid medical certificate</li>
                  <li>• Student pilot permit</li>
                  <li>• Photo identification</li>
                  <li>• Logbook with endorsements</li>
                </ul>
              </div>
              <div>
                <strong>Training Records:</strong>
                <ul>
                  <li>• Theory exam certificates</li>
                  <li>• Flight training records</li>
                  <li>• Instructor recommendations</li>
                  <li>• Solo endorsements</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Examiner Information -->
          <div data-testid="fpp-examiner-info">
            <h4>👨‍✈️ About Your Examiner</h4>
            <div>
              <p>Your flight test will be conducted by a CAA authorised examiner who:</p>
              <ul>
                <li>• Holds appropriate qualifications and experience</li>
                <li>• Is independent from your training organization</li>
                <li>• Will assess you fairly against published standards</li>
                <li>• Can provide valuable feedback on your performance</li>
              </ul>
            </div>
          </div>

          <!-- Cost Information -->
          <div data-testid="fpp-cost-info">
            <h4>💰 Cost Information</h4>
            <div>
              <p><strong>Typical FPP Costs:</strong></p>
              <div>
                <div>
                  <ul>
                    <li>• Examiner fee: $400-$600</li>
                    <li>• Aircraft rental: $300-$500</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>• Total cost: $800-$1,200</li>
                    <li>• Retest fee: $200-$400 (if required)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button @click="showFPPEducation = false">
              Ready to Test!
            </button>
            <router-link to="/requirements">
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
</style>