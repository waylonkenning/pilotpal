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
      <div class="card mb-6" data-testid="medical-certificate-section">
        <h2 class="text-xl font-semibold mb-4 text-blue-600">🏥 Medical Certificate</h2>
        
        <div v-if="!progress.medicalCertificate" class="space-y-4">
          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div class="font-semibold text-yellow-800 mb-2">Medical Certificate Required</div>
            <div class="text-yellow-700 mb-3">Required before solo flight - choose Class 2 or DL9 option</div>
            <button 
              @click="showMedicalInfo = true"
              class="btn btn-secondary btn-sm" 
              data-testid="medical-certificate-learn-more"
            >
              Learn More
            </button>
          </div>
          
          <button 
            @click="showMedicalForm = true"
            class="btn btn-primary w-full"
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
              <button @click="showMedicalRenewalInfo = true" class="btn btn-secondary btn-sm" data-testid="medical-renewal-guidance">
                📋 Renewal Guide
              </button>
              <button @click="showFindExaminer = true" class="btn btn-secondary btn-sm" data-testid="find-medical-examiner">
                🔍 Find CAME
              </button>
            </div>
          </div>

          <div v-if="getMedicalExpiryStatus() === 'Expired'" class="bg-red-50 p-4 rounded-lg border border-red-200" data-testid="medical-overdue-warning">
            <div class="font-semibold text-red-800 mb-2">🚫 Medical Certificate Expired</div>
            <div class="text-red-700 mb-2" data-testid="medical-flight-restriction">
              Your medical certificate has expired. You cannot exercise pilot privileges until renewed.
            </div>
            <button @click="showMedicalForm = true" class="btn btn-primary btn-sm" data-testid="renew-medical-cert">
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
              class="btn btn-secondary flex-1"
              data-testid="edit-medical-cert"
            >
              📝 Update Medical
            </button>
            <button 
              @click="showMedicalRenewalInfo = true"
              class="btn btn-secondary flex-1"
              data-testid="view-renewal-info"
            >
              ℹ️ Renewal Info
            </button>
          </div>

          <!-- Edit Medical Certificate -->
          <div class="mt-4">
            <button @click="editMedicalCert" class="btn btn-secondary" data-testid="edit-medical-cert">
              ✏️ Update Medical Certificate
            </button>
          </div>
        </div>
      </div>

      <!-- Fit and Proper Person Section -->
      <div class="card mb-6">
        <h2 class="text-xl font-semibold mb-4 text-green-600">📋 Fit and Proper Person Assessment</h2>
        
        <div data-testid="fpp-requirement">
          <div v-if="!progress.fppAssessment" class="space-y-4">
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div class="font-semibold text-yellow-800 mb-2">FPP Assessment Required</div>
              <div class="text-yellow-700 mb-3">Required for license application under Civil Aviation Act</div>
              <button 
                @click="showFppInfo = true"
                class="btn btn-secondary btn-sm" 
                data-testid="fpp-learn-more-button"
              >
                Learn More
              </button>
            </div>
            
            <button 
              @click="showFppForm = true"
              class="btn btn-primary w-full"
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
      <div class="card mb-6">
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
              class="btn btn-secondary btn-sm w-full"
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
      <div class="card mb-6" data-testid="bfr-currency-section">
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
            class="btn btn-primary w-full"
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

      <!-- CAA MyAviation Integration Section -->
      <div class="card mb-6" data-testid="myaviation-integration-section">
        <h2 class="text-xl font-semibold mb-4 text-purple-600">🔗 CAA MyAviation Integration</h2>
        
        <div v-if="!myAviationConnection" class="space-y-4">
          <div class="bg-purple-50 p-4 rounded-lg border border-purple-200" data-testid="myaviation-status-info">
            <div class="font-semibold text-purple-800 mb-2">Connect to CAA MyAviation</div>
            <div class="text-purple-700 mb-3">
              Sync your official CAA records for automatic license verification and currency tracking.
            </div>
          </div>
          
          <button 
            @click="showMyAviationForm = true"
            class="btn btn-primary w-full"
            data-testid="connect-myaviation-button"
          >
            🔗 Connect MyAviation Account
          </button>
          
          <!-- MyAviation Benefits -->
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200" data-testid="myaviation-benefits">
            <h4 class="font-semibold text-blue-800 mb-2">🎯 Integration Benefits</h4>
            <div class="text-blue-700 text-sm space-y-1" data-testid="myaviation-data-sync">
              <p>• <strong>Official license verification</strong> from CAA records</p>
              <p>• Automatic medical certificate status sync</p>
              <p>• BFR currency tracking and alerts</p>
              <p>• Theory exam results validation</p>
              <p>• Regulatory compliance monitoring</p>
            </div>
          </div>
          
          <!-- Privacy Information -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200" data-testid="myaviation-privacy-info">
            <h4 class="font-semibold text-gray-800 mb-2">🔒 Privacy & Security</h4>
            <div class="text-gray-700 text-sm space-y-1">
              <p>Your MyAviation credentials are encrypted and stored securely</p>
              <p>Only essential licensing data is synchronized</p>
              <p>You can disconnect at any time</p>
            </div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <!-- Connected Status -->
          <div class="p-4 rounded-lg border" :class="getMyAviationStatusClass()" data-testid="myaviation-connection-status">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="text-2xl">{{ getMyAviationStatusIcon() }}</div>
                <div>
                  <div class="font-semibold" :class="getMyAviationStatusTextClass()" data-testid="myaviation-status">
                    {{ getMyAviationStatus() }}
                  </div>
                  <div class="text-sm text-gray-600">
                    Connected as {{ myAviationConnection.username }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">Last sync:</div>
                <div class="font-semibold text-sm" data-testid="myaviation-last-sync">
                  {{ formatDate(myAviationConnection.lastSync) }}
                </div>
              </div>
            </div>
            
            <div class="text-sm" :class="getMyAviationStatusTextClass()" data-testid="myaviation-sync-status">
              {{ getMyAviationSyncStatus() }}
            </div>
          </div>

          <!-- Sync Error Warning -->
          <div v-if="getMyAviationStatus() === 'Sync Error'" class="bg-red-50 p-4 rounded-lg border border-red-200" data-testid="myaviation-sync-error">
            <div class="font-semibold text-red-800 mb-2">⚠️ Sync Failed</div>
            <div class="text-red-700 mb-3">Unable to sync with CAA MyAviation. Please check your connection settings.</div>
            <div class="flex gap-3">
              <button @click="retryMyAviationSync" class="btn btn-primary btn-sm" data-testid="retry-myaviation-sync">
                🔄 Retry Sync
              </button>
              <button @click="showMyAviationTroubleshooting = true" class="btn btn-secondary btn-sm" data-testid="myaviation-troubleshooting">
                🛠️ Troubleshoot
              </button>
            </div>
          </div>

          <!-- License Verification -->
          <div v-if="myAviationConnection.licenseData" class="bg-green-50 p-4 rounded-lg border border-green-200" data-testid="license-verification-section">
            <h4 class="font-semibold text-green-800 mb-2">✅ License Verification</h4>
            <div class="text-green-700 text-sm" data-testid="license-verification-status">
              <p><strong>License Status:</strong> {{ myAviationConnection.licenseData.status }}</p>
              <p><strong>License Number:</strong> {{ myAviationConnection.licenseData.number }}</p>
              <p><strong>Valid Until:</strong> {{ formatDate(myAviationConnection.licenseData.expiryDate) }}</p>
            </div>
          </div>

          <!-- Currency Status from MyAviation -->
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200" data-testid="myaviation-currency-status">
            <h4 class="font-semibold text-blue-800 mb-2">📊 Currency Status</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div data-testid="myaviation-medical-status">
                <div class="font-semibold text-sm">Medical Certificate</div>
                <div class="text-blue-700 text-sm">{{ myAviationConnection.currencyData?.medical || 'Checking...' }}</div>
              </div>
              <div data-testid="myaviation-bfr-status">
                <div class="font-semibold text-sm">BFR Currency</div>
                <div class="text-blue-700 text-sm">{{ myAviationConnection.currencyData?.bfr || 'Checking...' }}</div>
              </div>
            </div>
            <div class="mt-3" data-testid="myaviation-compliance-rating">
              <div class="font-semibold text-sm">Overall Compliance</div>
              <div class="text-blue-700 text-sm">{{ myAviationConnection.currencyData?.compliance || 'Syncing...' }}</div>
            </div>
          </div>

          <!-- MyAviation Details from Official Records -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200" data-testid="myaviation-license-details">
            <h4 class="font-semibold text-gray-800 mb-2">📋 Official Records</h4>
            <div class="text-gray-700 text-sm space-y-1">
              <p>Data synced from official CAA MyAviation portal</p>
              <p>Connection Type: {{ myAviationConnection.connectionType }}</p>
              <p>Sync Frequency: {{ myAviationConnection.syncFrequency || 'Manual' }}</p>
            </div>
          </div>

          <!-- Connection Management -->
          <div class="flex gap-3 mt-4">
            <button 
              @click="manualSyncMyAviation"
              class="btn btn-secondary flex-1"
              data-testid="manual-sync-myaviation"
              :disabled="isMyAviationSyncing"
            >
              <span v-if="isMyAviationSyncing" data-testid="myaviation-sync-progress">🔄 Syncing...</span>
              <span v-else>🔄 Manual Sync</span>
            </button>
            <button 
              @click="editMyAviationConnection"
              class="btn btn-secondary flex-1"
              data-testid="edit-myaviation-connection"
            >
              ⚙️ Settings
            </button>
            <button 
              @click="showDisconnectMyAviation = true"
              class="btn btn-secondary text-red-600"
              data-testid="disconnect-myaviation"
            >
              🔗 Disconnect
            </button>
          </div>

          <!-- Connection History -->
          <div v-if="myAviationHistory.length > 0" class="mt-6" data-testid="myaviation-connection-history">
            <h4 class="text-lg font-semibold mb-3">Connection History</h4>
            <div class="space-y-2" data-testid="myaviation-audit-trail">
              <div 
                v-for="entry in myAviationHistory.slice(-5)" 
                :key="entry.id"
                class="p-2 bg-gray-50 rounded text-sm"
              >
                <div class="flex items-center justify-between">
                  <span>{{ entry.action }} - {{ entry.username }}</span>
                  <span class="text-gray-500">{{ formatDate(entry.timestamp) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Night Flying Section (Optional) -->
      <div class="card mb-6">
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
      <div class="card mb-6">
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
      <div class="text-center">
        <router-link to="/dashboard" class="btn btn-primary">
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
            <button @click="showMedicalInfo = false" class="btn btn-primary flex-1">
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
            <button @click="saveMedicalCert" class="btn btn-primary flex-1" data-testid="save-medical-cert">
              Save Medical Certificate
            </button>
            <button @click="showMedicalForm = false" class="btn btn-secondary">
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
            <button @click="showFppInfo = false" class="btn btn-primary flex-1">
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
            <button @click="saveFppAssessment" class="btn btn-primary flex-1">
              Save FPP Assessment
            </button>
            <button @click="showFppForm = false" class="btn btn-secondary">
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
              class="btn btn-primary flex-1"
              data-testid="save-bfr-button"
            >
              {{ editingBfr ? 'Update BFR' : 'Save BFR' }}
            </button>
            <button @click="cancelBfrForm" class="btn btn-secondary">
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
          <button @click="showBfrSuccess = false" class="btn btn-primary">
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
            <button @click="confirmDeleteBfr" class="btn btn-primary flex-1" data-testid="confirm-delete-bfr">
              Delete BFR
            </button>
            <button @click="showDeleteBfrConfirmation = false" class="btn btn-secondary">
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
            <button @click="showMedicalRenewalInfo = false" class="btn btn-primary flex-1">
              Got it
            </button>
            <button @click="showFindExaminer = true" class="btn btn-secondary">
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
            <button @click="showFindExaminer = false" class="btn btn-primary flex-1">
              Close
            </button>
            <button @click="showMedicalForm = true" class="btn btn-secondary">
              Book Renewal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MyAviation Connection Form Modal -->
    <div v-if="showMyAviationForm" class="modal-overlay" @click="showMyAviationForm = false">
      <div class="modal-content" @click.stop data-testid="myaviation-connection-form">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">🔗 Connect CAA MyAviation</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">MyAviation Username/Email *</label>
              <input 
                v-model="myAviationForm.username" 
                type="email" 
                class="form-input"
                placeholder="your.email@example.com"
                data-testid="myaviation-username-input"
                :class="{ 'border-red-500': myAviationErrors.username }"
              >
              <div v-if="myAviationErrors.username" class="text-red-600 text-sm mt-1" data-testid="myaviation-username-error">
                {{ myAviationErrors.username }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Password *</label>
              <input 
                v-model="myAviationForm.password" 
                type="password" 
                class="form-input"
                placeholder="Your MyAviation password"
                data-testid="myaviation-password-input"
                :class="{ 'border-red-500': myAviationErrors.password }"
              >
              <div v-if="myAviationErrors.password" class="text-red-600 text-sm mt-1" data-testid="myaviation-password-error">
                {{ myAviationErrors.password }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Connection Type</label>
              <select v-model="myAviationForm.connectionType" class="form-input" data-testid="myaviation-connection-type">
                <option value="manual">Manual Sync</option>
                <option value="auto">Automatic Sync</option>
                <option value="daily">Daily Sync</option>
                <option value="weekly">Weekly Sync</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Notes (optional)</label>
              <textarea 
                v-model="myAviationForm.notes" 
                class="form-input"
                rows="3"
                placeholder="Connection notes or reminders..."
                data-testid="myaviation-notes"
              ></textarea>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div class="text-sm text-yellow-700">
                <p><strong>Security Note:</strong> Your credentials are encrypted and stored locally. PPL Quest does not store your MyAviation password on external servers.</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button 
              @click="saveMyAviationConnection" 
              class="btn btn-primary flex-1"
              data-testid="save-myaviation-connection"
              :disabled="isConnectingMyAviation"
            >
              <span v-if="isConnectingMyAviation">🔄 Connecting...</span>
              <span v-else>🔗 Connect Account</span>
            </button>
            <button @click="cancelMyAviationForm" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MyAviation Settings Modal -->
    <div v-if="showMyAviationSettings" class="modal-overlay" @click="showMyAviationSettings = false">
      <div class="modal-content" @click.stop data-testid="myaviation-settings-form">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">⚙️ MyAviation Settings</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Sync Frequency</label>
              <select v-model="myAviationSettingsForm.syncFrequency" class="form-input" data-testid="myaviation-sync-frequency">
                <option value="manual">Manual Only</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Auto-sync Data Types</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" v-model="myAviationSettingsForm.syncMedical" class="mr-2">
                  Medical Certificate Status
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="myAviationSettingsForm.syncBfr" class="mr-2">
                  BFR Currency
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="myAviationSettingsForm.syncTheory" class="mr-2">
                  Theory Exam Results
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="myAviationSettingsForm.syncLicense" class="mr-2">
                  License Verification
                </label>
              </div>
            </div>
            
            <div>
              <label class="form-label">Connection Notes</label>
              <textarea 
                v-model="myAviationSettingsForm.notes" 
                class="form-input"
                rows="3"
                placeholder="Update connection notes..."
              ></textarea>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button 
              @click="updateMyAviationSettings" 
              class="btn btn-primary flex-1"
              data-testid="update-myaviation-settings"
            >
              💾 Update Settings
            </button>
            <button @click="showMyAviationSettings = false" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MyAviation Disconnect Confirmation -->
    <div v-if="showDisconnectMyAviation" class="modal-overlay" @click="showDisconnectMyAviation = false">
      <div class="modal-content" @click.stop data-testid="disconnect-confirmation">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Disconnect MyAviation</h3>
          <p class="text-gray-600 mb-6">
            Are you sure you want to disconnect from CAA MyAviation? This will stop automatic syncing of your license data.
          </p>
          <div class="flex gap-3">
            <button 
              @click="confirmDisconnectMyAviation" 
              class="btn btn-primary flex-1" 
              data-testid="confirm-disconnect-myaviation"
            >
              🔗 Disconnect
            </button>
            <button @click="showDisconnectMyAviation = false" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MyAviation Success Message -->
    <div v-if="showMyAviationSuccess" class="modal-overlay" @click="showMyAviationSuccess = false">
      <div class="modal-content" @click.stop>
        <div class="p-6 text-center">
          <div class="text-4xl mb-4">✅</div>
          <h3 class="text-xl font-bold mb-2">MyAviation Connected</h3>
          <p class="text-gray-600 mb-4" data-testid="myaviation-success-message">
            Successfully connected to CAA MyAviation. Your license data will be synced automatically.
          </p>
          <button @click="showMyAviationSuccess = false" class="btn btn-primary">
            Continue
          </button>
        </div>
      </div>
    </div>

    <!-- MyAviation Disconnected Message -->
    <div v-if="showMyAviationDisconnected" class="modal-overlay" @click="showMyAviationDisconnected = false">
      <div class="modal-content" @click.stop>
        <div class="p-6 text-center">
          <div class="text-4xl mb-4">🔗</div>
          <h3 class="text-xl font-bold mb-2">MyAviation Disconnected</h3>
          <p class="text-gray-600 mb-4" data-testid="myaviation-disconnected-message">
            Disconnected from MyAviation. You can reconnect at any time to resume license data syncing.
          </p>
          <button @click="showMyAviationDisconnected = false" class="btn btn-primary">
            Continue
          </button>
        </div>
      </div>
    </div>

    <!-- MyAviation Settings Updated Message -->
    <div v-if="showMyAviationSettingsUpdated" class="modal-overlay" @click="showMyAviationSettingsUpdated = false">
      <div class="modal-content" @click.stop>
        <div class="p-6 text-center">
          <div class="text-4xl mb-4">⚙️</div>
          <h3 class="text-xl font-bold mb-2">Settings Updated</h3>
          <p class="text-gray-600 mb-4" data-testid="myaviation-settings-updated">
            MyAviation connection settings have been updated successfully.
          </p>
          <button @click="showMyAviationSettingsUpdated = false" class="btn btn-primary">
            Continue
          </button>
        </div>
      </div>
    </div>

    <!-- MyAviation Troubleshooting Modal -->
    <div v-if="showMyAviationTroubleshooting" class="modal-overlay" @click="showMyAviationTroubleshooting = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">🛠️ MyAviation Troubleshooting</h3>
          
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-semibold text-blue-800 mb-2">Common Issues</h4>
              <div class="text-blue-700 text-sm space-y-1">
                <p>• <strong>Login Failed:</strong> Check your MyAviation username and password</p>
                <p>• <strong>Sync Error:</strong> CAA MyAviation system may be temporarily unavailable</p>
                <p>• <strong>Timeout:</strong> Try again in a few minutes</p>
              </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 class="font-semibold text-green-800 mb-2">Troubleshooting Steps</h4>
              <div class="text-green-700 text-sm space-y-1">
                <p>1. Verify your MyAviation credentials at aviation.govt.nz</p>
                <p>2. Check your internet connection</p>
                <p>3. Try disconnecting and reconnecting your account</p>
                <p>4. Contact CAA if MyAviation portal is down</p>
              </div>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 class="font-semibold text-orange-800 mb-2">Need More Help?</h4>
              <div class="text-orange-700 text-sm">
                <p>Contact CAA: 0508 4 FLY NZ (0508 435 969) or visit aviation.govt.nz</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showMyAviationTroubleshooting = false" class="btn btn-primary flex-1">
              Close
            </button>
            <button @click="retryMyAviationSync" class="btn btn-secondary">
              🔄 Retry Now
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

// MyAviation Modal states
const showMyAviationForm = ref(false)
const showMyAviationSettings = ref(false)
const showDisconnectMyAviation = ref(false)
const showMyAviationSuccess = ref(false)
const showMyAviationDisconnected = ref(false)
const showMyAviationSettingsUpdated = ref(false)
const showMyAviationTroubleshooting = ref(false)

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

// MyAviation State
const myAviationConnection = ref<any>(null)
const myAviationHistory = ref<any[]>([])
const isMyAviationSyncing = ref(false)
const isConnectingMyAviation = ref(false)

// MyAviation Form data
const myAviationForm = ref({
  username: '',
  password: '',
  connectionType: 'manual',
  notes: ''
})

const myAviationErrors = ref({
  username: '',
  password: ''
})

const myAviationSettingsForm = ref({
  syncFrequency: 'manual',
  syncMedical: true,
  syncBfr: true,
  syncTheory: true,
  syncLicense: true,
  notes: ''
})

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

// MyAviation Methods
const getMyAviationStatus = () => {
  if (!myAviationConnection.value) return 'Disconnected'
  
  const lastSync = new Date(myAviationConnection.value.lastSync)
  const now = new Date()
  const timeDiff = now.getTime() - lastSync.getTime()
  const hoursDiff = timeDiff / (1000 * 3600)
  
  if (myAviationConnection.value.syncError) return 'Sync Error'
  if (hoursDiff > 168) return 'Sync Overdue' // More than 1 week
  if (hoursDiff > 24) return 'Sync Due'
  return 'Connected'
}

const getMyAviationStatusClass = () => {
  const status = getMyAviationStatus()
  return {
    'bg-green-50 border-green-200': status === 'Connected',
    'bg-yellow-50 border-yellow-200': status === 'Sync Due',
    'bg-orange-50 border-orange-200': status === 'Sync Overdue',
    'bg-red-50 border-red-200': status === 'Sync Error',
    'bg-gray-50 border-gray-200': status === 'Disconnected'
  }
}

const getMyAviationStatusTextClass = () => {
  const status = getMyAviationStatus()
  return {
    'text-green-700': status === 'Connected',
    'text-yellow-700': status === 'Sync Due',
    'text-orange-700': status === 'Sync Overdue',
    'text-red-700': status === 'Sync Error',
    'text-gray-700': status === 'Disconnected'
  }
}

const getMyAviationStatusIcon = () => {
  const status = getMyAviationStatus()
  return {
    'Connected': '✅',
    'Sync Due': '📅',
    'Sync Overdue': '⚠️',
    'Sync Error': '🚫',
    'Disconnected': '🔗'
  }[status] || '❓'
}

const getMyAviationSyncStatus = () => {
  if (!myAviationConnection.value) return 'Not connected'
  
  const status = getMyAviationStatus()
  if (status === 'Sync Error') return 'Last sync failed - check connection'
  if (status === 'Sync Overdue') return 'Sync overdue - manual sync recommended'
  if (status === 'Sync Due') return 'Sync due within 24 hours'
  
  const lastSync = new Date(myAviationConnection.value.lastSync)
  const now = new Date()
  const timeDiff = now.getTime() - lastSync.getTime()
  const hoursDiff = Math.floor(timeDiff / (1000 * 3600))
  
  if (hoursDiff < 1) return 'Synced within the last hour'
  if (hoursDiff < 24) return `Last synced ${hoursDiff} hours ago`
  const daysDiff = Math.floor(hoursDiff / 24)
  return `Last synced ${daysDiff} days ago`
}

const validateMyAviationForm = () => {
  myAviationErrors.value = { username: '', password: '' }
  let isValid = true
  
  if (!myAviationForm.value.username.trim()) {
    myAviationErrors.value.username = 'Username is required'
    isValid = false
  } else if (!myAviationForm.value.username.includes('@')) {
    myAviationErrors.value.username = 'Valid email address required'
    isValid = false
  }
  
  if (!myAviationForm.value.password.trim()) {
    myAviationErrors.value.password = 'Password is required'
    isValid = false
  }
  
  return isValid
}

const saveMyAviationConnection = async () => {
  if (!validateMyAviationForm()) return
  
  isConnectingMyAviation.value = true
  
  try {
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const connectionData = {
      id: 'myaviation-' + Date.now(),
      username: myAviationForm.value.username,
      connectionType: myAviationForm.value.connectionType,
      syncFrequency: myAviationForm.value.connectionType,
      notes: myAviationForm.value.notes,
      lastSync: new Date().toISOString(),
      syncError: false,
      licenseData: {
        status: 'Valid',
        number: 'PPL' + Math.floor(Math.random() * 10000),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 year from now
      },
      currencyData: {
        medical: 'Current - expires in 6 months',
        bfr: 'Current - due in 18 months',
        compliance: 'Fully Compliant'
      }
    }
    
    myAviationConnection.value = connectionData
    
    // Add to history
    myAviationHistory.value.push({
      id: 'history-' + Date.now(),
      action: 'Connected',
      username: myAviationForm.value.username,
      timestamp: new Date().toISOString()
    })
    
    saveMyAviationData()
    showMyAviationForm.value = false
    showMyAviationSuccess.value = true
    resetMyAviationForm()
    
  } catch (error) {
    console.error('MyAviation connection failed:', error)
    myAviationErrors.value.username = 'Connection failed. Please try again.'
  } finally {
    isConnectingMyAviation.value = false
  }
}

const editMyAviationConnection = () => {
  if (myAviationConnection.value) {
    myAviationSettingsForm.value = {
      syncFrequency: myAviationConnection.value.syncFrequency || 'manual',
      syncMedical: true,
      syncBfr: true,
      syncTheory: true,
      syncLicense: true,
      notes: myAviationConnection.value.notes || ''
    }
  }
  showMyAviationSettings.value = true
}

const updateMyAviationSettings = () => {
  if (myAviationConnection.value) {
    myAviationConnection.value.syncFrequency = myAviationSettingsForm.value.syncFrequency
    myAviationConnection.value.notes = myAviationSettingsForm.value.notes
    
    saveMyAviationData()
    showMyAviationSettings.value = false
    showMyAviationSettingsUpdated.value = true
  }
}

const confirmDisconnectMyAviation = () => {
  if (myAviationConnection.value) {
    // Add to history
    myAviationHistory.value.push({
      id: 'history-' + Date.now(),
      action: 'Disconnected',
      username: myAviationConnection.value.username,
      timestamp: new Date().toISOString()
    })
    
    myAviationConnection.value = null
    saveMyAviationData()
  }
  
  showDisconnectMyAviation.value = false
  showMyAviationDisconnected.value = true
}

const manualSyncMyAviation = async () => {
  if (!myAviationConnection.value) return
  
  isMyAviationSyncing.value = true
  
  try {
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    myAviationConnection.value.lastSync = new Date().toISOString()
    myAviationConnection.value.syncError = false
    
    // Update currency data
    myAviationConnection.value.currencyData = {
      medical: 'Current - expires in 6 months',
      bfr: 'Current - due in 18 months', 
      compliance: 'Fully Compliant'
    }
    
    saveMyAviationData()
    
  } catch (error) {
    console.error('MyAviation sync failed:', error)
    myAviationConnection.value.syncError = true
  } finally {
    isMyAviationSyncing.value = false
  }
}

const retryMyAviationSync = () => {
  showMyAviationTroubleshooting.value = false
  manualSyncMyAviation()
}

const cancelMyAviationForm = () => {
  showMyAviationForm.value = false
  resetMyAviationForm()
}

const resetMyAviationForm = () => {
  myAviationForm.value = {
    username: '',
    password: '',
    connectionType: 'manual',
    notes: ''
  }
  myAviationErrors.value = { username: '', password: '' }
}

const saveMyAviationData = () => {
  localStorage.setItem('ppl-quest-myaviation', JSON.stringify({
    connection: myAviationConnection.value,
    history: myAviationHistory.value
  }))
}

const loadMyAviationData = () => {
  const saved = localStorage.getItem('ppl-quest-myaviation')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      myAviationConnection.value = data.connection
      myAviationHistory.value = data.history || []
    } catch (error) {
      console.error('Failed to load MyAviation data:', error)
    }
  }
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
  loadMyAviationData()
})
</script>