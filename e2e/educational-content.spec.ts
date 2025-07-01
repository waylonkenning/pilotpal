import { test, expect } from '@playwright/test'

test.describe('Educational Content System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should provide medical certificate education and guidance', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Should show medical certificate section
    await expect(page.locator('[data-testid="medical-certificate-section"]'))
      .toBeVisible()
    
    // Should have educational content button
    await page.click('[data-testid="medical-certificate-learn-more"]')
    
    // Should show detailed educational modal
    await expect(page.locator('[data-testid="medical-education-modal"]'))
      .toBeVisible()
    
    // Should explain Class 2 vs DL9 options
    await expect(page.locator('[data-testid="class-2-explanation"]'))
      .toContainText('Class 2 Medical Certificate')
    
    await expect(page.locator('[data-testid="dl9-explanation"]'))
      .toContainText('DL9 Driver License Medical')
    
    // Should provide cost comparison
    await expect(page.locator('[data-testid="medical-cost-comparison"]'))
      .toBeVisible()
    
    // Should include eligibility requirements
    await expect(page.locator('[data-testid="medical-eligibility-info"]'))
      .toContainText('eligibility')
    
    // Should provide next steps guidance
    await expect(page.locator('[data-testid="medical-next-steps"]'))
      .toBeVisible()
  })

  test('should explain theory exam requirements and study guidance', async ({ page }) => {
    await page.click('[data-testid="theory-tab"]')
    
    // Should show theory education section
    await page.click('[data-testid="theory-exam-help-button"]')
    
    await expect(page.locator('[data-testid="theory-education-modal"]'))
      .toBeVisible()
    
    // Should explain all 6 exam subjects
    await expect(page.locator('[data-testid="air-law-explanation"]'))
      .toContainText('Air Law')
    
    await expect(page.locator('[data-testid="navigation-explanation"]'))
      .toContainText('Navigation')
    
    await expect(page.locator('[data-testid="technical-knowledge-explanation"]'))
      .toContainText('Technical Knowledge')
    
    await expect(page.locator('[data-testid="human-factors-explanation"]'))
      .toContainText('Human Factors')
    
    await expect(page.locator('[data-testid="meteorology-explanation"]'))
      .toContainText('Meteorology')
    
    await expect(page.locator('[data-testid="radio-telephony-explanation"]'))
      .toContainText('Radio Telephony')
    
    // Should provide study resources
    await expect(page.locator('[data-testid="theory-study-resources"]'))
      .toBeVisible()
    
    // Should explain exam format and scoring
    await expect(page.locator('[data-testid="exam-format-info"]'))
      .toContainText('pass mark')
    
    // Should provide booking guidance
    await expect(page.locator('[data-testid="exam-booking-info"]'))
      .toBeVisible()
  })

  test('should provide flight test (FPP) preparation guidance', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Navigate to FPP section
    await page.click('[data-testid="fpp-learn-more-button"]')
    
    await expect(page.locator('[data-testid="fpp-education-modal"]'))
      .toBeVisible()
    
    // Should explain flight test components
    await expect(page.locator('[data-testid="fpp-oral-exam-info"]'))
      .toContainText('oral examination')
    
    await expect(page.locator('[data-testid="fpp-flight-test-info"]'))
      .toContainText('flight test')
    
    // Should provide preparation guidance
    await expect(page.locator('[data-testid="fpp-preparation-tips"]'))
      .toBeVisible()
    
    // Should explain required documents
    await expect(page.locator('[data-testid="fpp-required-documents"]'))
      .toBeVisible()
    
    // Should provide examiner information
    await expect(page.locator('[data-testid="fpp-examiner-info"]'))
      .toContainText('authorised examiner')
    
    // Should include cost information
    await expect(page.locator('[data-testid="fpp-cost-info"]'))
      .toContainText('$')
  })

  test('should explain flight hours requirements with NZ specifics', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should have flight hours education button
    await page.click('[data-testid="flight-hours-education-button"]')
    
    await expect(page.locator('[data-testid="hours-education-modal"]'))
      .toBeVisible()
    
    // Should explain minimum hour requirements
    await expect(page.locator('[data-testid="minimum-hours-explanation"]'))
      .toContainText('50 hours')
    
    // Should break down hour types
    await expect(page.locator('[data-testid="dual-hours-explanation"]'))
      .toContainText('dual instruction')
    
    await expect(page.locator('[data-testid="solo-hours-explanation"]'))
      .toContainText('solo flight')
    
    await expect(page.locator('[data-testid="cross-country-explanation"]'))
      .toContainText('cross-country')
    
    // Should explain NZ-specific requirements
    await expect(page.locator('[data-testid="nz-terrain-awareness-info"]'))
      .toContainText('terrain awareness')
    
    await expect(page.locator('[data-testid="controlled-airspace-info"]'))
      .toContainText('controlled airspace')
    
    // Should provide hour logging guidance
    await expect(page.locator('[data-testid="hour-logging-guidance"]'))
      .toBeVisible()
  })

  test('should provide comprehensive regulatory overview and timeline', async ({ page }) => {
    // Should have main education center
    await page.click('[data-testid="education-center-button"]')
    
    await expect(page.locator('[data-testid="education-center-modal"]'))
      .toBeVisible()
    
    // Should show complete PPL pathway
    await expect(page.locator('[data-testid="ppl-pathway-overview"]'))
      .toBeVisible()
    
    // Should explain CAA Part 61 requirements
    await expect(page.locator('[data-testid="part-61-explanation"]'))
      .toContainText('Part 61')
    
    // Should provide timeline guidance
    await expect(page.locator('[data-testid="typical-timeline-info"]'))
      .toContainText('months')
    
    // Should explain cost breakdown
    await expect(page.locator('[data-testid="cost-breakdown-education"]'))
      .toBeVisible()
    
    // Should provide school selection guidance
    await expect(page.locator('[data-testid="school-selection-tips"]'))
      .toBeVisible()
    
    // Should include regulatory links
    await expect(page.locator('[data-testid="caa-links"]'))
      .toBeVisible()
  })

  test('should provide contextual help throughout the application', async ({ page }) => {
    // Help should be available in dashboard
    await expect(page.locator('[data-testid="contextual-help-trigger"]'))
      .toBeVisible()
    
    await page.click('[data-testid="contextual-help-trigger"]')
    
    await expect(page.locator('[data-testid="contextual-help-panel"]'))
      .toBeVisible()
    
    // Should show relevant help for current page
    await expect(page.locator('[data-testid="dashboard-help-content"]'))
      .toContainText('dashboard')
    
    // Help should change based on page context
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="contextual-help-trigger"]')
    
    await expect(page.locator('[data-testid="financial-help-content"]'))
      .toContainText('budget')
  })

  test('should provide study resources and external links', async ({ page }) => {
    await page.click('[data-testid="education-center-button"]')
    
    // Should have study resources section
    await expect(page.locator('[data-testid="study-resources-section"]'))
      .toBeVisible()
    
    // Should provide CAA resources
    await expect(page.locator('[data-testid="caa-resources-link"]'))
      .toHaveAttribute('href')
    
    // Should provide theory exam prep resources
    await expect(page.locator('[data-testid="theory-prep-resources"]'))
      .toBeVisible()
    
    // Should include flight training resources
    await expect(page.locator('[data-testid="flight-training-resources"]'))
      .toBeVisible()
    
    // Should provide regulatory document links
    await expect(page.locator('[data-testid="regulatory-documents"]'))
      .toBeVisible()
    
    // Should include recommended reading
    await expect(page.locator('[data-testid="recommended-reading"]'))
      .toBeVisible()
  })

  test('should provide progress-specific educational content', async ({ page }) => {
    // Complete a few lessons to get context-specific education
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    await page.click('[data-testid="save-hours-button"]')
    await page.click('[data-testid="continue-to-next-lesson"]')
    
    // Should show relevant education based on progress
    await page.click('[data-testid="contextual-help-trigger"]')
    
    await expect(page.locator('[data-testid="progress-based-education"]'))
      .toBeVisible()
    
    // Should recommend next steps
    await expect(page.locator('[data-testid="next-steps-recommendation"]'))
      .toBeVisible()
    
    // Should highlight upcoming requirements
    await expect(page.locator('[data-testid="upcoming-requirements-education"]'))
      .toBeVisible()
  })

  test('should provide mobile-friendly educational content', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.click('[data-testid="education-center-button"]')
    
    // Should adapt for mobile
    await expect(page.locator('[data-testid="mobile-education-layout"]'))
      .toBeVisible()
    
    // Should have swipeable content sections
    await expect(page.locator('[data-testid="swipeable-education-cards"]'))
      .toBeVisible()
    
    // Should maintain readability on small screens
    await expect(page.locator('[data-testid="mobile-optimized-text"]'))
      .toBeVisible()
  })

  test('should track educational content engagement', async ({ page }) => {
    await page.click('[data-testid="education-center-button"]')
    
    // Should track which educational content was viewed
    await page.click('[data-testid="medical-education-link"]')
    
    // Should show completion indicators
    await expect(page.locator('[data-testid="education-progress-indicator"]'))
      .toBeVisible()
    
    // Should recommend related content
    await expect(page.locator('[data-testid="related-education-content"]'))
      .toBeVisible()
    
    // Should show learning path progression
    await expect(page.locator('[data-testid="education-learning-path"]'))
      .toBeVisible()
  })
})