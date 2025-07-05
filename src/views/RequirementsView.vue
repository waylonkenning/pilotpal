<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-4">📋 Regulatory Requirements</h1>
        <p class="text-lg text-gray-600 mb-6">
          Track your progress through New Zealand CAA Part 61 requirements
        </p>
      </div>

      <!-- Medical Certificate Section -->
      <div class="metro-card mb-6" data-testid="medical-certificate-section">
        <h2 class="text-xl font-semibold mb-4 text-blue-600">🏥 Medical Certificate</h2>
        
        <div v-if="!progress.medicalCertificate" class="space-y-4">
          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div class="font-semibold text-yellow-800 mb-2">Medical Certificate Required</div>
            <div class="text-yellow-700 mb-3">Required before solo flight - choose Class 2 or DL9 option</div>
            <button 
              @click="showMedicalInfo = true"
              class="metro-button metro-button-secondary metro-button-sm" 
              data-testid="medical-certificate-learn-more"
            >
              Learn More
            </button>
          </div>
          
          <button 
            @click="showMedicalForm = true"
            class="metro-button metro-button-primary w-full"
            data-testid="medical-cert-requirement"
          >
            📄 Complete Medical Certificate
          </button>
        </div>

        <div v-else class="space-y-4">
          <!-- Medical Certificate Status with Expiry Warnings -->
          <div class="p-4 rounded-lg border" :class="getMedicalStatusClass()" data-testid="medical-cert-status">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="text-2xl">{{ getMedicalStatusIcon() }}</div>
                <div>
                  <div class="font-semibold" :class="getMedicalStatusTextClass()">
                    {{ progress.medicalCertificate.type === 'class2' ? 'Class 2 Medical Certificate' : 'DL9 Driver License Medical' }}
                  </div>
                  <div class="text-sm text-gray-600" data-testid="medical-expiry">
                    Valid until {{ formatDate(progress.medicalCertificate.expiryDate) }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">Status:</div>
                <div class="font-semibold" :class="getMedicalStatusTextClass()" data-testid="medical-expiry-status">
                  {{ getMedicalExpiryStatus() }}
                </div>
              </div>
            </div>
            
            <div class="text-sm" :class="getMedicalStatusTextClass()" data-testid="medical-days-remaining">
              {{ getMedicalTimeRemaining() }}
            </div>
          </div>

          <!-- Medical Expiry Warnings -->
          <div v-if="getMedicalExpiryStatus() === 'Expiring Soon'" class="bg-orange-50 p-4 rounded-lg border border-orange-200" data-testid="medical-expiry-warning">
            <div class="font-semibold text-orange-800 mb-2">⚠️ Medical Certificate Expiring Soon</div>
            <div class="text-orange-700 mb-3">Your medical certificate expires soon. Schedule a renewal to maintain flying privileges.</div>
            <div class="flex gap-3">
              <button @click="showMedicalRenewalInfo = true" class="metro-button metro-button-secondary metro-button-sm" data-testid="medical-renewal-guidance">
                📋 Renewal Guide
              </button>
              <button @click="showFindExaminer = true" class="metro-button metro-button-secondary metro-button-sm" data-testid="find-medical-examiner">
                🔍 Find CAME
              </button>
            </div>
          </div>

          <div v-if="getMedicalExpiryStatus() === 'Expired'" class="bg-red-50 p-4 rounded-lg border border-red-200" data-testid="medical-overdue-warning">
            <div class="font-semibold text-red-800 mb-2">🚫 Medical Certificate Expired</div>
            <div class="text-red-700 mb-2" data-testid="medical-flight-restriction">
              Your medical certificate has expired. You cannot exercise pilot privileges until renewed.
            </div>
            <button @click="showMedicalForm = true" class="metro-button metro-button-primary metro-button-sm" data-testid="renew-medical-cert">
              🏥 Renew Medical Certificate
            </button>
          </div>

          <div v-if="getMedicalExpiryStatus() === 'Renewal Due'" class="bg-yellow-50 p-4 rounded-lg border border-yellow-200" data-testid="medical-renewal-reminder">
            <div class="font-semibold text-yellow-800 mb-2">📅 Medical Renewal Recommended</div>
            <div class="text-yellow-700 mb-3">Consider scheduling your medical renewal now to avoid any interruption to your flying.</div>
            <div class="text-sm text-yellow-600" data-testid="medical-renewal-cost">
              Estimated renewal cost: {{ progress.medicalCertificate.type === 'class2' ? '$420-$1070' : '$0 (if driver license valid)' }}
            </div>
          </div>
          
          <div v-if="progress.medicalCertificate && !isExpired()" class="bg-blue-50 p-4 rounded-lg" data-testid="solo-flight-unlocked">
            <div class="font-semibold text-blue-800 mb-2">🦅 Solo Flight Unlocked!</div>
            <div class="text-blue-700">You can now progress to solo flight lessons with instructor endorsement.</div>
          </div>
          
          <!-- Medical Certificate Management -->
          <div class="flex gap-3 mt-4">
            <button 
              @click="editMedicalCert"
              class="metro-button metro-button-secondary flex-1"
              data-testid="edit-medical-cert"
            >
              📝 Update Medical
            </button>
            <button 
              @click="showMedicalRenewalInfo = true"
              class="metro-button metro-button-secondary flex-1"
              data-testid="view-renewal-info"
            >
              ℹ️ Renewal Info
            </button>
          </div>

          <!-- Edit Medical Certificate -->
          <div class="mt-4">
            <button @click="editMedicalCert" class="metro-button metro-button-secondary" data-testid="edit-medical-cert">
              ✏️ Update Medical Certificate
            </button>
          </div>
        </div>
      </div>

      <!-- Fit and Proper Person Section -->
      <div class="metro-card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-green-600">📋 Fit and Proper Person Assessment</h2>
        
        <div data-testid="fpp-requirement">
          <div v-if="!progress.fppAssessment" class="space-y-4">
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div class="font-semibold text-yellow-800 mb-2">FPP Assessment Required</div>
              <div class="text-yellow-700 mb-3">Required for license application under Civil Aviation Act</div>
              <button 
                @click="showFppInfo = true"
                class="metro-button metro-button-secondary metro-button-sm" 
                data-testid="fpp-learn-more-button"
              >
                Learn More
              </button>
            </div>
            
            <button 
              @click="showFppForm = true"
              class="metro-button metro-button-primary w-full"
            >
              📝 Complete FPP Assessment
            </button>
          </div>

          <div v-else class="bg-green-50 p-4 rounded-lg border border-green-200">
            <div class="flex items-center gap-3">
              <div class="text-2xl">✅</div>
              <div>
                <div class="font-semibold text-green-800">FPP Assessment Complete</div>
                <div class="text-green-700" data-testid="fpp-validity">
                  Valid for 1 year (expires {{ formatDate(progress.fppAssessment.expiryDate) }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Theory Exams Section -->
      <div class="metro-card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-purple-600">📚 Theory Examinations</h2>
        
        <div class="mb-4">
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200" data-testid="pass-requirement">
            <div class="font-semibold text-blue-800 mb-2">📊 Pass Requirements</div>
            <div class="text-blue-700">70% minimum to pass each subject. All 6 subjects must be completed.</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="(exam, subject) in progress.theoryExams" 
            :key="subject"
            class="p-4 rounded-lg border"
            :class="exam.passed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'"
            :data-testid="subject.replace(/([A-Z])/g, '-$1').toLowerCase() + '-exam'"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="font-semibold">{{ getExamName(subject) }}</div>
              <div v-if="exam.passed" class="text-green-600">✅</div>
              <div v-else class="text-gray-400">⏳</div>
            </div>
            
            <div class="text-sm text-gray-600 mb-3">
              {{ getExamDescription(subject) }}
            </div>
            
            <div v-if="exam.attempts.length > 0" class="text-xs text-gray-500 mb-2">
              Attempts: {{ exam.attempts.length }}
            </div>
            
            <button 
              v-if="!exam.passed"
              @click="scheduleExam(subject)"
              class="metro-button metro-button-secondary metro-button-sm w-full"
            >
              📅 Schedule Exam
            </button>
            
            <div v-else class="text-xs text-green-600">
              Passed ✓
            </div>
          </div>
        </div>
        
        <!-- Medical Certificate History -->
        <div v-if="medicalHistory.length > 0" class="mt-6" data-testid="medical-cert-history">
          <h3 class="text-lg font-semibold mb-3">Medical Certificate History</h3>
          <div class="text-sm text-gray-600 mb-3" data-testid="medical-renewals-count">
            Total renewals: {{ medicalHistory.length }}
          </div>
          <div class="space-y-3">
            <div 
              v-for="medical in medicalHistory" 
              :key="medical.id"
              class="p-3 bg-gray-50 rounded-lg border text-sm"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-semibold">{{ medical.type === 'class2' ? 'Class 2 Medical' : 'DL9 Medical' }}</div>
                  <div class="text-gray-600">{{ formatDate(medical.issueDate) }} - {{ formatDate(medical.expiryDate) }}</div>
                  <div class="text-gray-500">Cost: ${{ medical.cost || 'N/A' }}</div>
                </div>
                <div class="text-xs text-gray-500">
                  {{ medical.isActive ? 'Current' : 'Expired' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BFR Currency Tracking Section (for Licensed Pilots) -->
      <div class="metro-card mb-6" data-testid="bfr-currency-section">
        <h2 class="text-xl font-semibold mb-4 text-indigo-600">🛩️ Biennial Flight Review (BFR) Currency</h2>
        
        <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-4" data-testid="bfr-requirements-info">
          <div class="font-semibold text-indigo-800 mb-2">BFR Requirements for Licensed Pilots</div>
          <div class="text-indigo-700 text-sm space-y-1">
            <p>• Required every 24 months for license currency</p>
            <p>• Must include minimum 1 hour flight review and 1 hour ground review</p>
            <p>• Conducted by qualified instructor or examiner</p>
            <p>• Covers general operating and flight rules, and safe flight operations</p>
          </div>
        </div>

        <!-- Current BFR Status -->
        <div v-if="!bfrRecords.length" class="space-y-4">
          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div class="flex items-center gap-3">
              <div class="text-2xl">⚠️</div>
              <div>
                <div class="font-semibold text-yellow-800" data-testid="no-bfr-recorded">No BFR recorded</div>
                <div class="text-yellow-700">Record your BFR to track currency status</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <!-- BFR Status Card -->
          <div class="p-4 rounded-lg border" :class="getBfrStatusClass()" data-testid="bfr-status-card">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="text-2xl">{{ getBfrStatusIcon() }}</div>
                <div>
                  <div class="font-semibold" :class="getBfrStatusTextClass()" data-testid="bfr-status">
                    {{ getBfrStatus() }}
                  </div>
                  <div class="text-sm text-gray-600" data-testid="last-bfr-date">
                    Last BFR: {{ formatDate(latestBfr.date) }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">Next due:</div>
                <div class="font-semibold" data-testid="next-bfr-due">{{ formatDate(getNextBfrDue()) }}</div>
              </div>
            </div>
            
            <div class="text-sm" :class="getBfrStatusTextClass()" data-testid="bfr-days-remaining">
              {{ getBfrTimeRemaining() }}
            </div>
          </div>

          <!-- BFR Warning Messages -->
          <div v-if="getBfrStatus() === 'Expiring Soon'" class="bg-orange-50 p-4 rounded-lg border border-orange-200" data-testid="bfr-warning-message">
            <div class="font-semibold text-orange-800 mb-2">⏰ BFR Expiring Soon</div>
            <div class="text-orange-700">Your BFR will expire soon. Schedule a flight review to maintain currency.</div>
          </div>

          <div v-if="getBfrStatus() === 'Overdue'" class="bg-red-50 p-4 rounded-lg border border-red-200" data-testid="bfr-overdue-warning">
            <div class="font-semibold text-red-800 mb-2">🚫 BFR Overdue</div>
            <div class="text-red-700">Your BFR has expired. You cannot exercise pilot privileges until completing a BFR.</div>
          </div>
        </div>

        <!-- Record New BFR Button -->
        <div class="mt-4">
          <button 
            @click="showBfrForm = true"
            class="metro-button metro-button-primary w-full"
            data-testid="record-bfr-button"
          >
            📝 Record BFR
          </button>
        </div>

        <!-- BFR History -->
        <div v-if="bfrRecords.length > 0" class="mt-6" data-testid="bfr-history">
          <h3 class="text-lg font-semibold mb-3">BFR History</h3>
          <div class="space-y-3">
            <div 
              v-for="bfr in sortedBfrRecords" 
              :key="bfr.id"
              class="p-4 bg-gray-50 rounded-lg border"
              data-testid="bfr-history-item"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-semibold">{{ formatDate(bfr.date) }}</div>
                  <div class="text-sm text-gray-600">{{ bfr.instructor }}</div>
                  <div class="text-sm text-gray-600">{{ bfr.location }}</div>
                  <div class="text-xs text-gray-500">
                    Flight: {{ bfr.flightTime }}h | Ground: {{ bfr.groundTime }}h
                  </div>
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="editBfr(bfr)"
                    class="text-blue-600 text-sm"
                    data-testid="edit-bfr-button"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteBfr(bfr.id)"
                    class="text-red-600 text-sm"
                    data-testid="delete-bfr-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div v-if="bfr.notes" class="text-sm text-gray-600 mt-2">{{ bfr.notes }}</div>
            </div>
          </div>
        </div>

        <!-- What BFR Includes -->
        <div class="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200" data-testid="bfr-includes">
          <h4 class="font-semibold text-blue-800 mb-2">What a BFR Includes</h4>
          <div class="text-blue-700 text-sm space-y-1">
            <p><strong>Flight Review:</strong> Demonstration of safe flight operations and general operating rules</p>
            <p><strong>Ground Review:</strong> Discussion of regulations, aircraft systems, and operating procedures</p>
            <p><strong>Minimum Duration:</strong> 1 hour flight + 1 hour ground (minimum)</p>
            <p><strong>Scope:</strong> Tailored to pilot's experience and type of flying</p>
          </div>
        </div>
      </div>

      <!-- Night Flying Section (Optional) -->
      <div class="metro-card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-orange-600">🌙 Night Flying (Optional)</h2>
        
        <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div class="font-semibold text-orange-800 mb-2">Optional Qualification</div>
          <div class="text-orange-700 mb-3">
            Night flying is optional in New Zealand. Requires 5 hours including 2h dual, 2h solo, and 1h additional.
          </div>
          <div class="text-sm text-orange-600">
            Current night hours: {{ progress.flightHours.night || 0 }}h / 5h required
          </div>
        </div>
      </div>

      <!-- Terrain Awareness Section (NZ Specific) -->
      <div class="metro-card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-red-600">🏔️ Terrain Awareness Training</h2>
        
        <div class="bg-red-50 p-4 rounded-lg border border-red-200">
          <div class="font-semibold text-red-800 mb-2">NZ Specific Requirement</div>
          <div class="text-red-700 mb-3">
            5 hours of terrain awareness training required for New Zealand mountainous conditions.
          </div>
          <div class="text-sm text-red-600">
            Current terrain hours: {{ progress.flightHours.terrainAwareness }}h / 5h required
          </div>
        </div>
      </div>

      <!-- Back to Dashboard -->
      <div class="text-center mt-16 mb-8 pt-8" style="margin-top: 4rem; padding-top: 2rem; margin-bottom: 2rem;">
        <router-link to="/dashboard" class="metro-button metro-button-primary">
          ← Back to Dashboard
        </router-link>
      </div>
    </div>

    <!-- Medical Certificate Information Modal -->
    <div v-if="showMedicalInfo" class="modal-overlay" @click="showMedicalInfo = false">
      <div class="modal-content" @click.stop data-testid="medical-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Medical Certificate Options</h3>
          
          <div class="space-y-4" data-testid="medical-cost-comparison">
            <div class="border rounded-lg p-4" data-testid="class-2-explanation">
              <h4 class="font-semibold text-blue-600 mb-2">Class 2 Medical Certificate</h4>
              <p class="text-gray-700 mb-2">
                Full aviation medical examination by CAA-approved doctor. Required before solo flight.
              </p>
              <div class="text-sm text-orange-600" data-testid="class-2-cost">
                Cost: $420-$1070 depending on location and tests required
              </div>
            </div>
            
            <div class="border rounded-lg p-4" data-testid="dl9-explanation">
              <h4 class="font-semibold text-green-600 mb-2">DL9 Driver License Medical</h4>
              <p class="text-gray-700 mb-2">
                Use your existing NZ driver license medical if valid. Simpler and more cost-effective option.
              </p>
              <div class="text-sm text-green-600" data-testid="dl9-cost">
                Save $300-$800 compared to Class 2 medical
              </div>
            </div>
          </div>

          <!-- Eligibility Requirements -->
          <div class="bg-blue-50 p-4 rounded-lg mt-4" data-testid="medical-eligibility-info">
            <h4 class="font-semibold text-blue-800 mb-2">✅ Eligibility Requirements</h4>
            <div class="text-blue-700 text-sm space-y-1">
              <p>• Must be at least 17 years old for PPL training</p>
              <p>• No disqualifying medical conditions</p>
              <p>• Meet vision standards (correctable to 20/20)</p>
              <p>• Meet hearing standards</p>
              <p>• Declare any medications or medical history</p>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="bg-green-50 p-4 rounded-lg mt-4" data-testid="medical-next-steps">
            <h4 class="font-semibold text-green-800 mb-2">🎯 Next Steps</h4>
            <div class="text-green-700 text-sm space-y-2">
              <p><strong>1. Choose your option:</strong> Decide between Class 2 or DL9 based on your needs</p>
              <p><strong>2. Find a CAME:</strong> Locate a Civil Aviation Medical Examiner near you</p>
              <p><strong>3. Book examination:</strong> Schedule your medical examination</p>
              <p><strong>4. Complete forms:</strong> Fill out CAA medical forms accurately</p>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showMedicalInfo = false" class="metro-button metro-button-primary flex-1">
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Medical Certificate Form Modal -->
    <div v-if="showMedicalForm" class="modal-overlay" @click="showMedicalForm = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Add Medical Certificate</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Certificate Type</label>
              <select v-model="medicalForm.type" class="form-input" data-testid="medical-cert-type">
                <option value="class2">Class 2 Medical Certificate</option>
                <option value="dl9" data-testid="select-dl9-option">DL9 Driver License Medical</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Issue Date</label>
              <input 
                v-model="medicalForm.issueDate" 
                type="date" 
                class="form-input"
                data-testid="medical-issue-date"
              >
            </div>
            
            <div>
              <label class="form-label">Expiry Date</label>
              <input 
                v-model="medicalForm.expiryDate" 
                type="date" 
                class="form-input"
                data-testid="medical-expiry-date"
                :class="{ 'border-red-500': medicalErrors.expiryDate }"
              >
              <div v-if="medicalErrors.expiryDate" class="text-red-600 text-sm mt-1" data-testid="medical-date-error">
                {{ medicalErrors.expiryDate }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Cost (optional)</label>
              <input 
                v-model="medicalForm.cost" 
                type="number" 
                class="form-input"
                placeholder="420"
              >
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="saveMedicalCert" class="metro-button metro-button-primary flex-1" data-testid="save-medical-cert">
              Save Medical Certificate
            </button>
            <button @click="showMedicalForm = false" class="metro-button metro-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FPP Information Modal -->
    <div v-if="showFppInfo" class="modal-overlay" @click="showFppInfo = false">
      <div class="modal-content" @click.stop data-testid="fpp-education-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">🎯 Flight Proficiency Program (FPP)</h3>
          
          <!-- FPP Components -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border rounded-lg p-4" data-testid="fpp-oral-exam-info">
              <h4 class="font-semibold text-blue-600 mb-2">🗣️ Oral Examination</h4>
              <div class="text-sm space-y-2">
                <p><strong>Duration:</strong> 30-60 minutes</p>
                <p><strong>Content:</strong> Theory knowledge application</p>
                <p>The oral examination tests your understanding of aircraft systems, weather, navigation, and regulations.</p>
              </div>
            </div>

            <div class="border rounded-lg p-4" data-testid="fpp-flight-test-info">
              <h4 class="font-semibold text-green-600 mb-2">✈️ Practical Flight Test</h4>
              <div class="text-sm space-y-2">
                <p><strong>Duration:</strong> 90-120 minutes</p>
                <p><strong>Content:</strong> Demonstration of flying skills</p>
                <p>The flight test demonstrates your practical ability to safely operate an aircraft to PPL standards.</p>
              </div>
            </div>
          </div>

          <!-- Preparation Tips -->
          <div class="bg-blue-50 p-4 rounded-lg mb-6" data-testid="fpp-preparation-tips">
            <h4 class="font-semibold text-blue-800 mb-3">📚 Preparation Tips</h4>
            <div class="text-blue-700 text-sm space-y-1">
              <p>• Complete instructor recommendation before booking</p>
              <p>• Review all theory subjects thoroughly</p>
              <p>• Practice flight test maneuvers to standards</p>
              <p>• Study aircraft systems and emergency procedures</p>
            </div>
          </div>

          <!-- Required Documents -->
          <div class="bg-green-50 p-4 rounded-lg mb-6" data-testid="fpp-required-documents">
            <h4 class="font-semibold text-green-800 mb-2">📄 Required Documents</h4>
            <div class="text-green-700 text-sm space-y-1">
              <p>• Valid medical certificate</p>
              <p>• Student pilot permit</p>
              <p>• Photo identification</p>
              <p>• Logbook with endorsements</p>
              <p>• Theory exam certificates</p>
            </div>
          </div>

          <!-- Examiner Information -->
          <div class="bg-purple-50 p-4 rounded-lg mb-6" data-testid="fpp-examiner-info">
            <h4 class="font-semibold text-purple-800 mb-2">👨‍✈️ About Your Examiner</h4>
            <div class="text-purple-700 text-sm">
              <p>Your flight test will be conducted by a CAA authorised examiner who holds appropriate qualifications and experience.</p>
            </div>
          </div>

          <!-- Cost Information -->
          <div class="bg-orange-50 p-4 rounded-lg" data-testid="fpp-cost-info">
            <h4 class="font-semibold text-orange-800 mb-2">💰 Cost Information</h4>
            <div class="text-orange-700 text-sm">
              <p><strong>Typical FPP Costs:</strong> $800-$1,200 including examiner fee and aircraft rental</p>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showFppInfo = false" class="metro-button metro-button-primary flex-1">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FPP Form Modal -->
    <div v-if="showFppForm" class="modal-overlay" @click="showFppForm = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Complete FPP Assessment</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Declaration Type</label>
              <select v-model="fppForm.declarationType" class="form-input">
                <option value="24FPP">24FPP - Standard Declaration</option>
                <option value="24FPPDEC">24FPPDEC - Detailed Declaration</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Submission Date</label>
              <input 
                v-model="fppForm.submissionDate" 
                type="date" 
                class="form-input"
              >
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-sm text-blue-700">
                This will be valid for 1 year from submission date. You'll need to update if circumstances change.
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="saveFppAssessment" class="metro-button metro-button-primary flex-1">
              Save FPP Assessment
            </button>
            <button @click="showFppForm = false" class="metro-button metro-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- BFR Recording Form Modal -->
    <div v-if="showBfrForm" class="modal-overlay" @click="showBfrForm = false">
      <div class="modal-content" @click.stop data-testid="bfr-form">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">{{ editingBfr ? 'Edit BFR' : 'Record BFR' }}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">BFR Date *</label>
              <input 
                v-model="bfrForm.date" 
                type="date" 
                class="form-input"
                data-testid="bfr-date-input"
                :class="{ 'border-red-500': bfrErrors.date }"
              >
              <div v-if="bfrErrors.date" class="text-red-600 text-sm mt-1" data-testid="bfr-date-error">
                {{ bfrErrors.date }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Instructor/Examiner *</label>
              <input 
                v-model="bfrForm.instructor" 
                type="text" 
                class="form-input"
                placeholder="John Smith CFI"
                data-testid="bfr-instructor-input"
                :class="{ 'border-red-500': bfrErrors.instructor }"
              >
              <div v-if="bfrErrors.instructor" class="text-red-600 text-sm mt-1" data-testid="bfr-instructor-error">
                {{ bfrErrors.instructor }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Location *</label>
              <input 
                v-model="bfrForm.location" 
                type="text" 
                class="form-input"
                placeholder="Auckland Airport"
                data-testid="bfr-location-input"
                :class="{ 'border-red-500': bfrErrors.location }"
              >
              <div v-if="bfrErrors.location" class="text-red-600 text-sm mt-1" data-testid="bfr-location-error">
                {{ bfrErrors.location }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Aircraft Type</label>
              <select v-model="bfrForm.aircraftType" class="form-input" data-testid="bfr-aircraft-type">
                <option value="">Select Aircraft Type</option>
                <option value="Cessna 172">Cessna 172</option>
                <option value="Cessna 152">Cessna 152</option>
                <option value="Piper Cherokee">Piper Cherokee</option>
                <option value="Tecnam P2002">Tecnam P2002</option>
                <option value="Diamond DA40">Diamond DA40</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Flight Time (hours)</label>
                <input 
                  v-model="bfrForm.flightTime" 
                  type="number" 
                  step="0.1"
                  min="1.0"
                  class="form-input"
                  placeholder="1.5"
                  data-testid="bfr-flight-time"
                >
              </div>
              
              <div>
                <label class="form-label">Ground Time (hours)</label>
                <input 
                  v-model="bfrForm.groundTime" 
                  type="number" 
                  step="0.1"
                  min="1.0"
                  class="form-input"
                  placeholder="1.0"
                  data-testid="bfr-ground-time"
                >
              </div>
            </div>
            
            <div>
              <label class="form-label">Notes</label>
              <textarea 
                v-model="bfrForm.notes" 
                class="form-input"
                rows="3"
                placeholder="BFR notes, areas covered, recommendations..."
                data-testid="bfr-notes"
              ></textarea>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button 
              @click="saveBfr" 
              class="metro-button metro-button-primary flex-1"
              data-testid="save-bfr-button"
            >
              {{ editingBfr ? 'Update BFR' : 'Save BFR' }}
            </button>
            <button @click="cancelBfrForm" class="metro-button metro-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- BFR Success Message -->
    <div v-if="showBfrSuccess" class="modal-overlay" @click="showBfrSuccess = false">
      <div class="modal-content" @click.stop>
        <div class="p-6 text-center">
          <div class="text-4xl mb-4">✅</div>
          <h3 class="text-xl font-bold mb-2">BFR Recorded Successfully</h3>
          <p class="text-gray-600 mb-4" data-testid="bfr-success-message">
            Your Biennial Flight Review has been recorded and your currency status updated.
          </p>
          <button @click="showBfrSuccess = false" class="metro-button metro-button-primary">
            Continue
          </button>
        </div>
      </div>
    </div>

    <!-- Delete BFR Confirmation -->
    <div v-if="showDeleteBfrConfirmation" class="modal-overlay" @click="showDeleteBfrConfirmation = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Delete BFR Record</h3>
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete this BFR record? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button @click="confirmDeleteBfr" class="metro-button metro-button-primary flex-1" data-testid="confirm-delete-bfr">
              Delete BFR
            </button>
            <button @click="showDeleteBfrConfirmation = false" class="metro-button metro-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Medical Renewal Information Modal -->
    <div v-if="showMedicalRenewalInfo" class="modal-overlay" @click="showMedicalRenewalInfo = false">
      <div class="modal-content" @click.stop data-testid="medical-renewal-info-modal">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">🏥 Medical Certificate Renewal Guide</h3>
          
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-semibold text-blue-800 mb-2">📅 When to Renew</h4>
              <div class="text-blue-700 text-sm space-y-1">
                <p>• Class 2 Medical: Valid for 60 months (until age 40), then 24 months</p>
                <p>• DL9 Medical: Valid while driver license is current</p>
                <p>• Renew 1-3 months before expiry to avoid grounding</p>
              </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 class="font-semibold text-green-800 mb-2">🔍 What You'll Need</h4>
              <div class="text-green-700 text-sm space-y-1">
                <p>• Current medical certificate</p>
                <p>• Photo identification</p>
                <p>• Medical history since last examination</p>
                <p>• List of current medications</p>
                <p>• Any specialist reports if required</p>
              </div>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg border border-orange-200" data-testid="medical-renewal-cost">
              <h4 class="font-semibold text-orange-800 mb-2">💰 Renewal Costs</h4>
              <div class="text-orange-700 text-sm space-y-1">
                <p><strong>Class 2 Medical:</strong> $420-$1070 (varies by location and tests)</p>
                <p><strong>DL9 Medical:</strong> $0 (if driver license remains valid)</p>
                <p><strong>Additional tests:</strong> $100-$300 if required (ECG, blood work)</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showMedicalRenewalInfo = false" class="metro-button metro-button-primary flex-1">
              Got it
            </button>
            <button @click="showFindExaminer = true" class="metro-button metro-button-secondary">
              Find CAME
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Find Medical Examiner Modal -->
    <div v-if="showFindExaminer" class="modal-overlay" @click="showFindExaminer = false">
      <div class="modal-content" @click.stop data-testid="came-information">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">🔍 Find a Civil Aviation Medical Examiner (CAME)</h3>
          
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-semibold text-blue-800 mb-2">📍 Major Centers</h4>
              <div class="text-blue-700 text-sm space-y-2">
                <div><strong>Auckland:</strong> Multiple CAMEs available - Auckland Airport area</div>
                <div><strong>Wellington:</strong> 2-3 CAMEs - Wellington and Lower Hutt</div>
                <div><strong>Christchurch:</strong> 2-3 CAMEs - Christchurch and Timaru</div>
                <div><strong>Hamilton:</strong> 1-2 CAMEs - Hamilton and Tauranga region</div>
              </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 class="font-semibold text-green-800 mb-2">📞 How to Find CAMEs</h4>
              <div class="text-green-700 text-sm space-y-1">
                <p>1. <strong>CAA Website:</strong> aviation.govt.nz - Medical section</p>
                <p>2. <strong>Call CAA:</strong> 0508 4 FLY NZ (0508 435 969)</p>
                <p>3. <strong>Flying clubs:</strong> Local clubs have CAME contacts</p>
                <p>4. <strong>Flight schools:</strong> Training organizations maintain lists</p>
              </div>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 class="font-semibold text-orange-800 mb-2">⏰ Booking Tips</h4>
              <div class="text-orange-700 text-sm space-y-1">
                <p>• Book 2-4 weeks in advance</p>
                <p>• Morning appointments often preferred</p>
                <p>• Bring all required documentation</p>
                <p>• Fast for blood tests if required</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showFindExaminer = false" class="metro-button metro-button-primary flex-1">
              Close
            </button>
            <button @click="showMedicalForm = true" class="metro-button metro-button-secondary">
              Book Renewal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface BfrRecord {
  id: string
  date: string
  instructor: string
  location: string
  aircraftType?: string
  flightTime: number
  groundTime: number
  notes?: string
  createdAt: string
}

// State
const progress = ref({
  medicalCertificate: null as any,
  fppAssessment: null as any,
  flightHours: {
    night: 0,
    terrainAwareness: 0
  },
  theoryExams: {
    airLaw: { attempts: [], passed: false },
    navigation: { attempts: [], passed: false },
    technicalKnowledge: { attempts: [], passed: false },
    humanFactors: { attempts: [], passed: false },
    meteorology: { attempts: [], passed: false },
    radioTelephony: { attempts: [], passed: false }
  }
})

// BFR State
const bfrRecords = ref<BfrRecord[]>([])
const showBfrForm = ref(false)
const showBfrSuccess = ref(false)
const showDeleteBfrConfirmation = ref(false)
const editingBfr = ref<BfrRecord | null>(null)
const bfrToDelete = ref<string | null>(null)

// Modal states
const showMedicalInfo = ref(false)
const showMedicalForm = ref(false)
const showFppInfo = ref(false)
const showFppForm = ref(false)
const showMedicalRenewalInfo = ref(false)
const showFindExaminer = ref(false)


// Form data
const medicalForm = ref({
  type: 'class2',
  issueDate: '',
  expiryDate: '',
  cost: ''
})

const medicalErrors = ref({
  expiryDate: ''
})

const medicalHistory = ref<any[]>([])

const fppForm = ref({
  declarationType: '24FPP',
  submissionDate: new Date().toISOString().split('T')[0]
})

// BFR Form data
const bfrForm = ref({
  date: '',
  instructor: '',
  location: '',
  aircraftType: '',
  flightTime: 1.0,
  groundTime: 1.0,
  notes: ''
})

const bfrErrors = ref({
  date: '',
  instructor: '',
  location: ''
})

// Medical Expiry Methods
const getMedicalExpiryStatus = () => {
  if (!progress.value.medicalCertificate) return 'No Medical'
  
  const expiryDate = new Date(progress.value.medicalCertificate.expiryDate)
  const now = new Date()
  const timeDiff = expiryDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) return 'Expired'
  if (daysDiff <= 30) return 'Expiring Soon'
  if (daysDiff <= 90) return 'Renewal Due'
  return 'Current'
}

const getMedicalStatusClass = () => {
  const status = getMedicalExpiryStatus()
  return {
    'bg-green-50 border-green-200': status === 'Current',
    'bg-yellow-50 border-yellow-200': status === 'Renewal Due',
    'bg-orange-50 border-orange-200': status === 'Expiring Soon',
    'bg-red-50 border-red-200': status === 'Expired'
  }
}

const getMedicalStatusTextClass = () => {
  const status = getMedicalExpiryStatus()
  return {
    'text-green-700': status === 'Current',
    'text-yellow-700': status === 'Renewal Due',
    'text-orange-700': status === 'Expiring Soon',
    'text-red-700': status === 'Expired'
  }
}

const getMedicalStatusIcon = () => {
  const status = getMedicalExpiryStatus()
  return {
    'Current': '✅',
    'Renewal Due': '📅',
    'Expiring Soon': '⚠️',
    'Expired': '🚫',
    'No Medical': '❌'
  }[status] || '❓'
}

const getMedicalTimeRemaining = () => {
  if (!progress.value.medicalCertificate) return ''
  
  const expiryDate = new Date(progress.value.medicalCertificate.expiryDate)
  const now = new Date()
  const timeDiff = expiryDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) {
    return `Expired ${Math.abs(daysDiff)} days ago`
  } else if (daysDiff === 0) {
    return 'Expires today'
  } else if (daysDiff === 1) {
    return '1 day remaining'
  } else if (daysDiff <= 30) {
    return `${daysDiff} days remaining`
  } else if (daysDiff <= 90) {
    return `${daysDiff} days until renewal recommended`
  } else {
    const monthsRemaining = Math.floor(daysDiff / 30)
    return `${monthsRemaining} months remaining`
  }
}

const isExpired = () => {
  return getMedicalExpiryStatus() === 'Expired'
}

const editMedicalCert = () => {
  if (progress.value.medicalCertificate) {
    medicalForm.value = {
      type: progress.value.medicalCertificate.type,
      issueDate: progress.value.medicalCertificate.issueDate,
      expiryDate: progress.value.medicalCertificate.expiryDate,
      cost: progress.value.medicalCertificate.cost?.toString() || ''
    }
  }
  showMedicalForm.value = true
}


// BFR Computed Properties
const sortedBfrRecords = computed(() => {
  return [...bfrRecords.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const latestBfr = computed(() => {
  return sortedBfrRecords.value[0]
})

// BFR Methods
const getBfrStatus = () => {
  if (!latestBfr.value) return 'No BFR Recorded'
  
  const bfrDate = new Date(latestBfr.value.date)
  const now = new Date()
  const monthsDiff = (now.getFullYear() - bfrDate.getFullYear()) * 12 + (now.getMonth() - bfrDate.getMonth())
  
  if (monthsDiff >= 24) return 'Overdue'
  if (monthsDiff >= 22) return 'Expiring Soon'
  return 'Current'
}

const getBfrStatusClass = () => {
  const status = getBfrStatus()
  return {
    'bg-green-50 border-green-200': status === 'Current',
    'bg-orange-50 border-orange-200': status === 'Expiring Soon',
    'bg-red-50 border-red-200': status === 'Overdue',
    'bg-gray-50 border-gray-200': status === 'No BFR Recorded'
  }
}

const getBfrStatusTextClass = () => {
  const status = getBfrStatus()
  return {
    'text-green-700': status === 'Current',
    'text-orange-700': status === 'Expiring Soon',
    'text-red-700': status === 'Overdue',
    'text-gray-700': status === 'No BFR Recorded'
  }
}

const getBfrStatusIcon = () => {
  const status = getBfrStatus()
  return {
    'Current': '✅',
    'Expiring Soon': '⚠️',
    'Overdue': '🚫',
    'No BFR Recorded': '❓'
  }[status] || '❓'
}

const getNextBfrDue = () => {
  if (!latestBfr.value) return ''
  
  const bfrDate = new Date(latestBfr.value.date)
  const dueDate = new Date(bfrDate)
  dueDate.setMonth(dueDate.getMonth() + 24)
  
  return dueDate.toISOString().split('T')[0]
}

const getBfrTimeRemaining = () => {
  if (!latestBfr.value) return ''
  
  const dueDate = new Date(getNextBfrDue())
  const now = new Date()
  const timeDiff = dueDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) {
    return `${Math.abs(daysDiff)} days overdue`
  } else if (daysDiff === 0) {
    return 'Due today'
  } else if (daysDiff === 1) {
    return '1 day remaining'
  } else {
    return `${daysDiff} days remaining`
  }
}

const validateBfrForm = () => {
  bfrErrors.value = { date: '', instructor: '', location: '' }
  let isValid = true
  
  if (!bfrForm.value.date) {
    bfrErrors.value.date = 'Date is required'
    isValid = false
  }
  
  if (!bfrForm.value.instructor.trim()) {
    bfrErrors.value.instructor = 'Instructor is required'
    isValid = false
  }
  
  if (!bfrForm.value.location.trim()) {
    bfrErrors.value.location = 'Location is required'
    isValid = false
  }
  
  return isValid
}

const saveBfr = () => {
  if (!validateBfrForm()) return
  
  const bfrData: BfrRecord = {
    id: editingBfr.value?.id || 'bfr-' + Date.now(),
    date: bfrForm.value.date,
    instructor: bfrForm.value.instructor.trim(),
    location: bfrForm.value.location.trim(),
    aircraftType: bfrForm.value.aircraftType,
    flightTime: parseFloat(bfrForm.value.flightTime.toString()) || 1.0,
    groundTime: parseFloat(bfrForm.value.groundTime.toString()) || 1.0,
    notes: bfrForm.value.notes.trim(),
    createdAt: editingBfr.value?.createdAt || new Date().toISOString()
  }
  
  if (editingBfr.value) {
    // Update existing BFR
    const index = bfrRecords.value.findIndex(b => b.id === editingBfr.value!.id)
    if (index !== -1) {
      bfrRecords.value[index] = bfrData
    }
  } else {
    // Add new BFR
    bfrRecords.value.push(bfrData)
  }
  
  saveBfrData()
  showBfrForm.value = false
  showBfrSuccess.value = true
  resetBfrForm()
}

const editBfr = (bfr: BfrRecord) => {
  editingBfr.value = bfr
  bfrForm.value = {
    date: bfr.date,
    instructor: bfr.instructor,
    location: bfr.location,
    aircraftType: bfr.aircraftType || '',
    flightTime: bfr.flightTime,
    groundTime: bfr.groundTime,
    notes: bfr.notes || ''
  }
  showBfrForm.value = true
}

const deleteBfr = (bfrId: string) => {
  bfrToDelete.value = bfrId
  showDeleteBfrConfirmation.value = true
}

const confirmDeleteBfr = () => {
  if (bfrToDelete.value) {
    bfrRecords.value = bfrRecords.value.filter(b => b.id !== bfrToDelete.value)
    saveBfrData()
  }
  showDeleteBfrConfirmation.value = false
  bfrToDelete.value = null
}

const cancelBfrForm = () => {
  showBfrForm.value = false
  resetBfrForm()
}

const resetBfrForm = () => {
  editingBfr.value = null
  bfrForm.value = {
    date: '',
    instructor: '',
    location: '',
    aircraftType: '',
    flightTime: 1.0,
    groundTime: 1.0,
    notes: ''
  }
  bfrErrors.value = { date: '', instructor: '', location: '' }
}

const saveBfrData = () => {
  localStorage.setItem('ppl-quest-bfr-records', JSON.stringify(bfrRecords.value))
}

const loadBfrData = () => {
  const saved = localStorage.getItem('ppl-quest-bfr-records')
  if (saved) {
    try {
      bfrRecords.value = JSON.parse(saved)
    } catch (error) {
      console.error('Failed to load BFR data:', error)
    }
  }
}

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NZ', { 
    year: 'numeric', 
    month: 'short' 
  })
}

const getExamName = (subject: string) => {
  const names: Record<string, string> = {
    airLaw: 'Air Law',
    navigation: 'Navigation',
    technicalKnowledge: 'Technical Knowledge',
    humanFactors: 'Human Factors',
    meteorology: 'Meteorology',
    radioTelephony: 'Radio Telephony'
  }
  return names[subject] || subject
}

const getExamDescription = (subject: string) => {
  const descriptions: Record<string, string> = {
    airLaw: 'Aviation regulations and legal requirements',
    navigation: 'Flight planning and navigation techniques',
    technicalKnowledge: 'Aircraft systems and performance',
    humanFactors: 'Human performance and limitations',
    meteorology: 'Weather theory and interpretation',
    radioTelephony: 'Radio procedures and phraseology'
  }
  return descriptions[subject] || ''
}

const scheduleExam = (subject: string) => {
  // Navigate to theory exam scheduling - placeholder
  alert(`Scheduling ${getExamName(subject)} exam - feature coming soon!`)
}

const validateMedicalCert = () => {
  medicalErrors.value = { expiryDate: '' }
  let isValid = true
  
  if (medicalForm.value.issueDate && medicalForm.value.expiryDate) {
    const issueDate = new Date(medicalForm.value.issueDate)
    const expiryDate = new Date(medicalForm.value.expiryDate)
    
    if (expiryDate <= issueDate) {
      medicalErrors.value.expiryDate = 'Expiry date must be after issue date'
      isValid = false
    }
  }
  
  return isValid
}

const saveMedicalCert = () => {
  if (!validateMedicalCert()) return
  
  const expiryDate = new Date(medicalForm.value.expiryDate)
  
  // Save current medical to history if it exists
  if (progress.value.medicalCertificate) {
    medicalHistory.value.push({ ...progress.value.medicalCertificate })
  }
  
  const newMedical = {
    id: 'med-' + Date.now(),
    type: medicalForm.value.type,
    issueDate: medicalForm.value.issueDate,
    expiryDate: medicalForm.value.expiryDate,
    cost: parseFloat(medicalForm.value.cost) || 0,
    isActive: expiryDate > new Date()
  }
  
  progress.value.medicalCertificate = newMedical
  
  saveProgress()
  saveMedicalHistory()
  showMedicalForm.value = false
  
  // Reset form
  medicalForm.value = {
    type: 'class2',
    issueDate: '',
    expiryDate: '',
    cost: ''
  }
  medicalErrors.value = { expiryDate: '' }
}

const saveFppAssessment = () => {
  const submissionDate = new Date(fppForm.value.submissionDate)
  const expiryDate = new Date(submissionDate)
  expiryDate.setFullYear(expiryDate.getFullYear() + 1)
  
  progress.value.fppAssessment = {
    id: 'fpp-' + Date.now(),
    submissionDate: fppForm.value.submissionDate,
    expiryDate: expiryDate.toISOString().split('T')[0],
    status: 'approved',
    hasChanges: false,
    declarationUsed: fppForm.value.declarationType
  }
  
  saveProgress()
  showFppForm.value = false
}

const saveProgress = () => {
  localStorage.setItem('ppl-quest-progress', JSON.stringify(progress.value))
}

const saveMedicalHistory = () => {
  localStorage.setItem('ppl-quest-medical-history', JSON.stringify(medicalHistory.value))
}

const loadMedicalHistory = () => {
  const saved = localStorage.getItem('ppl-quest-medical-history')
  if (saved) {
    try {
      medicalHistory.value = JSON.parse(saved)
    } catch (error) {
      console.error('Failed to load medical history:', error)
    }
  }
}

const loadProgress = () => {
  const saved = localStorage.getItem('ppl-quest-progress')
  if (saved) {
    try {
      progress.value = { ...progress.value, ...JSON.parse(saved) }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }
}

onMounted(() => {
  loadProgress()
  loadBfrData()
  loadMedicalHistory()
})
</script>