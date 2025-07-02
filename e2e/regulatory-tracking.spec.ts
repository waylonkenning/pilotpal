import { test, expect } from '@playwright/test'

test.describe('Regulatory Requirements Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show medical certificate requirement before solo', async ({ page }) => {
    // Should show medical certificate as upcoming requirement
    await expect(page.locator('[data-testid="upcoming-requirements"]'))
      .toContainText('Medical Certificate')
    
    // Should explain why it's needed
    await page.click('[data-testid="medical-cert-info"]')
    await expect(page.locator('[data-testid="requirement-explanation"]'))
      .toContainText('required before solo flight')
    
    // Should show both Class 2 and DL9 options
    await expect(page.locator('[data-testid="medical-options"]'))
      .toContainText('Class 2 Medical Certificate')
    
    await expect(page.locator('[data-testid="medical-options"]'))
      .toContainText('DL9 Driver License Medical')
    
    // Should show cost comparison
    await expect(page.locator('[data-testid="class-2-cost"]'))
      .toContainText('$420-$1070')
    
    await expect(page.locator('[data-testid="dl9-cost"]'))
      .toContainText('Save $300-$800')
  })

  test('should track medical certificate completion', async ({ page }) => {
    // Mark medical certificate as obtained
    await page.click('[data-testid="medical-cert-requirement"]')
    await page.click('[data-testid="select-dl9-option"]')
    await page.fill('[data-testid="medical-issue-date"]', '2024-01-15')
    await page.fill('[data-testid="medical-expiry-date"]', '2029-01-15')
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show as completed
    await expect(page.locator('[data-testid="medical-cert-status"]'))
      .toHaveClass(/completed/)
    
    // Should show expiry information
    await expect(page.locator('[data-testid="medical-expiry"]'))
      .toContainText('Valid until Jan 2029')
    
    // Should unlock related progress
    await expect(page.locator('[data-testid="solo-flight-unlocked"]'))
      .toBeVisible()
  })

  test('should show Fit and Proper Person requirement', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Should show FPP requirement
    await expect(page.locator('[data-testid="fpp-requirement"]'))
      .toBeVisible()
    
    // Should explain what it involves
    await page.click('[data-testid="fpp-info"]')
    await expect(page.locator('[data-testid="fpp-explanation"]'))
      .toContainText('criminal history, alcohol/drug use, and general character')
    
    // Should show it's required under Section 80
    await expect(page.locator('[data-testid="fpp-legal-basis"]'))
      .toContainText('Section 80 of the Civil Aviation Act 2023')
    
    // Should show validity period
    await expect(page.locator('[data-testid="fpp-validity"]'))
      .toContainText('Valid for 1 year')
  })

  test('should track theory exam requirements progressively', async ({ page }) => {
    await page.click('[data-testid="theory-tab"]')
    
    // Should show all 6 theory subjects
    await expect(page.locator('[data-testid="air-law-exam"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="navigation-exam"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="technical-knowledge-exam"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="human-factors-exam"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="meteorology-exam"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="radio-telephony-exam"]'))
      .toBeVisible()
    
    // Should show 70% pass requirement
    await expect(page.locator('[data-testid="pass-requirement"]'))
      .toContainText('70% minimum to pass')
    
    // Should show retest policy
    await expect(page.locator('[data-testid="retest-policy"]'))
      .toContainText('Up to 3 attempts within 3 months')
  })

  test('should handle theory exam completion and retests', async ({ page }) => {
    await page.click('[data-testid="theory-tab"]')
    
    // Attempt Air Law exam (fail first attempt)
    await page.click('[data-testid="air-law-exam"]')
    await page.fill('[data-testid="exam-score"]', '65')
    await page.click('[data-testid="record-exam-result"]')
    
    // Should show as failed
    await expect(page.locator('[data-testid="air-law-status"]'))
      .toHaveClass(/failed/)
    
    // Should show attempts remaining
    await expect(page.locator('[data-testid="air-law-attempts"]'))
      .toContainText('2 attempts remaining')
    
    // Second attempt (pass)
    await page.click('[data-testid="retake-air-law"]')
    await page.fill('[data-testid="exam-score"]', '78')
    await page.click('[data-testid="record-exam-result"]')
    
    // Should show as passed
    await expect(page.locator('[data-testid="air-law-status"]'))
      .toHaveClass(/passed/)
    
    // Should update overall theory progress
    await expect(page.locator('[data-testid="theory-progress"]'))
      .toContainText('1 of 6 subjects passed')
  })

  test('should show night flying as optional requirement', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Should show night flying as optional
    await expect(page.locator('[data-testid="night-flying-requirement"]'))
      .toContainText('Optional')
    
    // Should explain NZ-specific approach
    await page.click('[data-testid="night-flying-info"]')
    await expect(page.locator('[data-testid="night-flying-explanation"]'))
      .toContainText('Unlike many countries, night flying is optional for PPL in New Zealand')
    
    // Should show requirements if elected
    await expect(page.locator('[data-testid="night-flying-hours"]'))
      .toContainText('5 hours total (2h dual, 2h solo, 1h additional)')
    
    // Should allow opting in or out
    await expect(page.locator('[data-testid="elect-night-flying"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="skip-night-flying"]'))
      .toBeVisible()
  })

  test('should track terrain awareness training (NZ specific)', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Should show terrain awareness requirement
    await expect(page.locator('[data-testid="terrain-awareness-requirement"]'))
      .toBeVisible()
    
    // Should explain NZ-specific nature
    await page.click('[data-testid="terrain-awareness-info"]')
    await expect(page.locator('[data-testid="terrain-explanation"]'))
      .toContainText('5 hours of terrain and weather awareness training')
    
    // Should show low flying requirement
    await expect(page.locator('[data-testid="low-flying-requirement"]'))
      .toContainText('minimum 2 hours below 500 feet AGL')
    
    // Should explain why it's important for NZ
    await expect(page.locator('[data-testid="nz-terrain-explanation"]'))
      .toContainText('New Zealand\'s challenging mountainous terrain')
  })

  test('should show solo flight endorsement requirements', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Should show solo endorsement requirement
    await expect(page.locator('[data-testid="solo-endorsement-requirement"]'))
      .toBeVisible()
    
    // Should explain what's needed
    await page.click('[data-testid="solo-endorsement-info"]')
    await expect(page.locator('[data-testid="solo-requirements"]'))
      .toContainText('valid medical certification and instructor endorsement')
    
    // Should show minimum age
    await expect(page.locator('[data-testid="solo-age-requirement"]'))
      .toContainText('age 16 minimum')
    
    // Should explain endorsement types
    await expect(page.locator('[data-testid="endorsement-types"]'))
      .toContainText('initial solo, cross-country, specific routes')
  })

  test('should show flight test requirements and preparation', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Should show flight test requirement
    await expect(page.locator('[data-testid="flight-test-requirement"]'))
      .toBeVisible()
    
    // Should show prerequisites
    await page.click('[data-testid="flight-test-info"]')
    await expect(page.locator('[data-testid="flight-test-prerequisites"]'))
      .toContainText('50 hours minimum')
    
    await expect(page.locator('[data-testid="flight-test-prerequisites"]'))
      .toContainText('all theory exams passed')
    
    // Should explain test format
    await expect(page.locator('[data-testid="flight-test-format"]'))
      .toContainText('practical flying skills with integrated oral examination')
    
    // Should show no partial passes
    await expect(page.locator('[data-testid="flight-test-policy"]'))
      .toContainText('no partial passes allowed')
  })

  test('should show BFR currency requirements for licensed pilots', async ({ page }) => {
    // Simulate being a licensed pilot
    await page.evaluate(() => {
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        isLicensed: true,
        licenseDate: '2023-06-15'
      }))
    })
    await page.reload()
    
    await page.click('[data-testid="currency-tab"]')
    
    // Should show BFR requirement
    await expect(page.locator('[data-testid="bfr-requirement"]'))
      .toBeVisible()
    
    // Should show interval
    await expect(page.locator('[data-testid="bfr-interval"]'))
      .toContainText('every 24 months')
    
    // Should show what's involved
    await page.click('[data-testid="bfr-info"]')
    await expect(page.locator('[data-testid="bfr-requirements"]'))
      .toContainText('1 hour ground instruction plus 1 hour flight training')
    
    // Should show cost estimate
    await expect(page.locator('[data-testid="bfr-cost"]'))
      .toContainText('$300-500')
    
    // Should show due date
    await expect(page.locator('[data-testid="bfr-due-date"]'))
      .toContainText('Due: June 2025')
  })

  test('should integrate requirements with lesson progression', async ({ page }) => {
    // Progress through several lessons
    for (let i = 1; i <= 8; i++) {
      await page.click('[data-testid="complete-lesson-button"]')
      await page.fill('[data-testid="lesson-hours-input"]', '1.5')
      await page.click('[data-testid="save-hours-button"]')
      
      if (i < 8) {
        await page.click('[data-testid="continue-to-next-lesson"]')
      }
    }
    
    // Should now show solo flight as imminent
    await expect(page.locator('[data-testid="next-major-milestone"]'))
      .toContainText('First Solo Flight')
    
    // Should check medical certificate status
    await expect(page.locator('[data-testid="solo-prerequisites"]'))
      .toContainText('Medical Certificate required')
    
    // Should show solo endorsement needed
    await expect(page.locator('[data-testid="solo-prerequisites"]'))
      .toContainText('Instructor endorsement required')
  })

  test('should record theory exam attempts with scores and locations', async ({ page }) => {
    // Navigate to theory exams
    await page.click('[data-testid="theory-tab"]')
    
    // Record an attempt for Air Law
    await page.click('[data-testid="air-law-exam"] [data-testid="record-attempt-button"]')
    
    // Fill in exam attempt details
    await page.fill('[data-testid="exam-date-input"]', '2024-06-15')
    await page.fill('[data-testid="exam-score-input"]', '85')
    await page.fill('[data-testid="exam-center-input"]', 'Auckland')
    await page.fill('[data-testid="exam-cost-input"]', '65')
    
    // Save the attempt
    await page.click('[data-testid="save-exam-attempt"]')
    
    // Should show as passed (85% > 70%)
    await expect(page.locator('[data-testid="air-law-exam"]'))
      .toContainText('✅')
    
    // Should show attempt in history
    await expect(page.locator('[data-testid="air-law-exam"]'))
      .toContainText('85%')
  })

  test('should handle failed exam attempts and retakes', async ({ page }) => {
    // Navigate to theory exams
    await page.click('[data-testid="theory-tab"]')
    
    // Record a failed attempt for Navigation
    await page.click('[data-testid="navigation-exam"] [data-testid="record-attempt-button"]')
    
    // Fill in failing score
    await page.fill('[data-testid="exam-date-input"]', '2024-06-10')
    await page.fill('[data-testid="exam-score-input"]', '65')
    await page.fill('[data-testid="exam-center-input"]', 'Wellington')
    await page.fill('[data-testid="exam-cost-input"]', '65')
    
    // Save the failed attempt
    await page.click('[data-testid="save-exam-attempt"]')
    
    // Should still show as pending (65% < 70%)
    await expect(page.locator('[data-testid="navigation-exam"]'))
      .toContainText('⏳')
    
    // Should show failed attempt in history
    await expect(page.locator('[data-testid="navigation-exam"]'))
      .toContainText('65%')
    
    // Record a passing retake
    await page.click('[data-testid="navigation-exam"] [data-testid="record-attempt-button"]')
    
    // Fill in passing score
    await page.fill('[data-testid="exam-date-input"]', '2024-06-20')
    await page.fill('[data-testid="exam-score-input"]', '78')
    await page.fill('[data-testid="exam-center-input"]', 'Wellington')
    await page.fill('[data-testid="exam-cost-input"]', '65')
    
    // Save the passing attempt
    await page.click('[data-testid="save-exam-attempt"]')
    
    // Should now show as passed
    await expect(page.locator('[data-testid="navigation-exam"]'))
      .toContainText('✅')
    
    // Should show 2 attempts
    await expect(page.locator('[data-testid="navigation-exam"]'))
      .toContainText('2 attempts')
  })

  test('should display theory exam education and resources', async ({ page }) => {
    // Navigate to theory exams
    await page.click('[data-testid="theory-tab"]')
    
    // Open theory education modal
    await page.click('[data-testid="theory-exam-help-button"]')
    
    // Should show theory education modal
    await expect(page.locator('[data-testid="theory-education-modal"]'))
      .toBeVisible()
    
    // Should show exam format information
    await expect(page.locator('[data-testid="exam-format-info"]'))
      .toContainText('Multiple choice')
    
    // Should show all 6 subject explanations
    await expect(page.locator('[data-testid="air-law-explanation"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="navigation-explanation"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="technical-knowledge-explanation"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="human-factors-explanation"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="meteorology-explanation"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="radio-telephony-explanation"]'))
      .toBeVisible()
    
    // Should show study resources
    await expect(page.locator('[data-testid="theory-study-resources"]'))
      .toContainText('CAA')
    
    // Should show exam booking information
    await expect(page.locator('[data-testid="exam-booking-info"]'))
      .toBeVisible()
  })
})