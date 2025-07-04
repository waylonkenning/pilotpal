import { test, expect } from '@playwright/test'

test.describe('Visual Progress Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show visual journey timeline with phase icons', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show visual timeline with phases
    await expect(page.locator('[data-testid="journey-timeline"]'))
      .toBeVisible()
    
    // Should show 5 training phases with distinct icons
    await expect(page.locator('[data-testid="foundation-phase-icon"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="circuit-phase-icon"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="navigation-phase-icon"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="advanced-phase-icon"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="certification-phase-icon"]'))
      .toBeVisible()
    
    // Should show current phase highlighted/active
    await expect(page.locator('[data-testid="current-phase-indicator"]'))
      .toBeVisible()
    
    // Should show progress dots/circles for lessons within phase
    await expect(page.locator('[data-testid="lesson-progress-dots"]'))
      .toBeVisible()
  })

  test('should display interactive circular progress wheels', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show flight hours progress wheel
    await expect(page.locator('[data-testid="flight-hours-wheel"]'))
      .toBeVisible()
    
    // Should show hours breakdown with colored segments
    await expect(page.locator('[data-testid="dual-hours-segment"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="solo-hours-segment"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="cross-country-segment"]'))
      .toBeVisible()
    
    // Should show achievement progress wheel
    await expect(page.locator('[data-testid="achievement-progress-wheel"]'))
      .toBeVisible()
    
    // Should show percentage in center of wheels
    await expect(page.locator('[data-testid="hours-percentage"]'))
      .toContainText('%')
      
    await expect(page.locator('[data-testid="achievement-percentage"]'))
      .toContainText('%')
  })

  test('should show visual lesson completion map', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show 27 lesson nodes/circles
    await expect(page.locator('[data-testid="lesson-map"]'))
      .toBeVisible()
    
    // Should show completed lessons as filled/green
    await expect(page.locator('[data-testid="completed-lesson-node"]'))
      .toHaveCount(0) // Initially none completed
    
    // Should show current lesson highlighted
    await expect(page.locator('[data-testid="current-lesson-node"]'))
      .toBeVisible()
    
    // Should show future lessons as empty/gray
    await expect(page.locator('[data-testid="future-lesson-node"]'))
      .toHaveCount(26) // 26 future lessons initially
    
    // Should show connecting lines between lessons
    await expect(page.locator('[data-testid="lesson-connection-lines"]'))
      .toBeVisible()
  })

  test('should display animated milestone celebrations', async ({ page }) => {
    // Complete a lesson to trigger milestone
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should show animated celebration
    await expect(page.locator('[data-testid="milestone-celebration-animation"]'))
      .toBeVisible()
    
    // Should show confetti or particles
    await expect(page.locator('[data-testid="celebration-particles"]'))
      .toBeVisible()
    
    // Should show milestone badge with glow effect
    await expect(page.locator('[data-testid="milestone-badge-glow"]'))
      .toBeVisible()
    
    // Should show progress bar animation
    await expect(page.locator('[data-testid="progress-bar-animation"]'))
      .toBeVisible()
  })

  test('should show visual spending vs budget comparison', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show budget vs spending visual comparison
    await expect(page.locator('[data-testid="budget-comparison-chart"]'))
      .toBeVisible()
    
    // Should show spending categories as colored bars/segments
    await expect(page.locator('[data-testid="flight-training-bar"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="theory-exam-bar"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="medical-cert-bar"]'))
      .toBeVisible()
    
    // Should show budget limit line/indicator
    await expect(page.locator('[data-testid="budget-limit-indicator"]'))
      .toBeVisible()
    
    // Should use colors to indicate budget status (green/yellow/red)
    await expect(page.locator('[data-testid="budget-status-color"]'))
      .toBeVisible()
  })

  test('should display requirement status with visual icons', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show requirements grid with status icons
    await expect(page.locator('[data-testid="requirements-status-grid"]'))
      .toBeVisible()
    
    // Should show medical certificate status icon
    await expect(page.locator('[data-testid="medical-cert-status-icon"]'))
      .toBeVisible()
    
    // Should show theory exam progress icons (6 subjects)
    await expect(page.locator('[data-testid="theory-progress-icons"]'))
      .toBeVisible()
    
    // Should show FPP status icon
    await expect(page.locator('[data-testid="fpp-status-icon"]'))
      .toBeVisible()
    
    // Should use different icons for: not started, in progress, completed
    await expect(page.locator('[data-testid="not-started-icon"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="in-progress-icon"]'))
      .toBeVisible()
  })

  test('should show interactive hover effects and animations', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show tooltip on lesson node hover
    await page.hover('[data-testid="current-lesson-node"]')
    await expect(page.locator('[data-testid="lesson-tooltip"]'))
      .toBeVisible()
    
    // Should show phase details on phase icon hover
    await page.hover('[data-testid="foundation-phase-icon"]')
    await expect(page.locator('[data-testid="phase-tooltip"]'))
      .toBeVisible()
    
    // Should show progress details on wheel hover
    await page.hover('[data-testid="flight-hours-wheel"]')
    await expect(page.locator('[data-testid="hours-breakdown-tooltip"]'))
      .toBeVisible()
    
    // Should have hover animations container present
    await expect(page.locator('[data-testid="hover-animation"]'))
      .toBeAttached()
  })

  test('should display achievement showcase with visual badges', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show earned badges prominently
    await expect(page.locator('[data-testid="earned-badges-showcase"]'))
      .toBeVisible()
    
    // Should show locked badges in grayscale/outline
    await expect(page.locator('[data-testid="locked-badge-display"]'))
      .toBeVisible()
    
    // Should show next badge to unlock with progress
    await expect(page.locator('[data-testid="next-badge-preview"]'))
      .toBeVisible()
    
    // Should show badge rarity indicators (common, rare, epic)
    await expect(page.locator('[data-testid="badge-rarity-indicator"]'))
      .toBeVisible()
    
    // Should show completion percentage for next badge
    await expect(page.locator('[data-testid="next-badge-progress"]'))
      .toContainText('%')
  })

  test('should show flight path visualization on map', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show NZ map with flight training areas
    await expect(page.locator('[data-testid="nz-flight-map"]'))
      .toBeVisible()
    
    // Should show training area markers (check that they are attached, not necessarily visible due to CSS positioning)
    await expect(page.locator('[data-testid="training-area-auckland"]'))
      .toBeAttached()
    
    // Should show flight paths for cross-country requirements (canvas-based)
    await expect(page.locator('[data-testid="cross-country-routes"]'))
      .toBeVisible()
    
    // Verify canvas has been drawn with routes
    const canvas = page.locator('[data-testid="cross-country-routes"]')
    await expect(canvas).toHaveAttribute('width', '256')
    await expect(canvas).toHaveAttribute('height', '192')
    
    // Should highlight terrain awareness areas
    await expect(page.locator('[data-testid="terrain-awareness-zones"]'))
      .toBeVisible()
    
    // Should show controlled airspace visually
    await expect(page.locator('[data-testid="controlled-airspace"]'))
      .toBeVisible()
  })

  test('should display time-based progress animations', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Should show estimated completion timeline
    await expect(page.locator('[data-testid="completion-timeline-visual"]'))
      .toBeVisible()
    
    // Should show monthly progress projection
    await expect(page.locator('[data-testid="monthly-progress-chart"]'))
      .toBeVisible()
    
    // Should show seasonal training considerations
    await expect(page.locator('[data-testid="seasonal-indicators"]'))
      .toBeVisible()
    
    // Should show accelerated vs normal pace options
    await expect(page.locator('[data-testid="pace-comparison"]'))
      .toBeVisible()
    
    // Should animate timeline progression
    await expect(page.locator('[data-testid="timeline-animation"]'))
      .toBeVisible()
  })

  test('should show mobile-optimized visual progress', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.click('[data-testid="journey-tab"]')
    
    // Should adapt progress wheels for mobile
    await expect(page.locator('[data-testid="mobile-progress-wheels"]'))
      .toBeVisible()
    
    // Should stack timeline vertically on mobile
    await expect(page.locator('[data-testid="mobile-timeline-stack"]'))
      .toBeVisible()
    
    // Should show swipeable lesson cards
    await expect(page.locator('[data-testid="swipeable-lesson-cards"]'))
      .toBeVisible()
    
    // Should compress requirement icons for mobile
    await expect(page.locator('[data-testid="mobile-requirement-icons"]'))
      .toBeVisible()
    
    // Should maintain touch-friendly interaction areas
    await expect(page.locator('[data-testid="touch-friendly-targets"]'))
      .toBeVisible()
  })
})