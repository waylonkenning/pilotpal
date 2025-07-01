import { test, expect } from '@playwright/test'

test.describe('Couch to PPL - Core Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh for each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('should display welcoming first-time user experience', async ({ page }) => {
    await page.goto('/')
    
    // Should show the landing page for new users
    await expect(page.locator('[data-testid="welcome-hero"]'))
      .toContainText('PPL Quest NZ')
    
    // Should have a clear call to action to start the journey
    await expect(page.locator('[data-testid="start-journey-button"]'))
      .toBeVisible()
    
    // Should explain what the journey involves
    await expect(page.locator('[data-testid="journey-overview"]'))
      .toContainText('27 lessons')
  })

  test('should guide user through initial onboarding', async ({ page }) => {
    await page.goto('/')
    
    // Start the journey
    await page.click('[data-testid="start-journey-button"]')
    
    // Should show onboarding flow
    await expect(page.locator('[data-testid="onboarding-step-1"]'))
      .toBeVisible()
    
    // Should explain the linear progression approach
    await expect(page.locator('[data-testid="onboarding-explanation"]'))
      .toContainText('complete lessons in order')
    
    // Continue to main app
    await page.click('[data-testid="continue-to-app"]')
    
    // Should show the main dashboard
    await expect(page.locator('[data-testid="main-dashboard"]'))
      .toBeVisible()
  })

  test('should show current lesson as primary focus', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should highlight the current lesson prominently
    await expect(page.locator('[data-testid="current-lesson"]'))
      .toBeVisible()
    
    // Should show Lesson 1 as the first lesson
    await expect(page.locator('[data-testid="current-lesson-title"]'))
      .toContainText('Lesson 1')
    
    // Should show what this lesson involves
    await expect(page.locator('[data-testid="current-lesson-description"]'))
      .toContainText('Introductory Flight')
    
    // Should have a clear action to mark lesson complete
    await expect(page.locator('[data-testid="complete-lesson-button"]'))
      .toBeVisible()
  })

  test('should enforce linear progression - cannot skip lessons', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Lesson 2 should not be accessible yet
    await expect(page.locator('[data-testid="lesson-2"]'))
      .toHaveClass(/disabled|locked/)
    
    // Lesson 3 should not be accessible yet  
    await expect(page.locator('[data-testid="lesson-3"]'))
      .toHaveClass(/disabled|locked/)
    
    // Only Lesson 1 should be available
    await expect(page.locator('[data-testid="lesson-1"]'))
      .not.toHaveClass(/disabled|locked/)
  })

  test('should unlock next lesson after completing current lesson', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Complete Lesson 1
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Should show celebration for completing first lesson
    await expect(page.locator('[data-testid="lesson-complete-celebration"]'))
      .toBeVisible()
    
    // Should advance to Lesson 2
    await expect(page.locator('[data-testid="current-lesson-title"]'))
      .toContainText('Lesson 2')
    
    // Lesson 1 should now show as completed
    await expect(page.locator('[data-testid="lesson-1"]'))
      .toHaveClass(/completed/)
    
    // Lesson 2 should now be unlocked
    await expect(page.locator('[data-testid="lesson-2"]'))
      .not.toHaveClass(/disabled|locked/)
  })

  test('should show overall progress visualization', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should show progress out of 27 total lessons
    await expect(page.locator('[data-testid="lesson-progress"]'))
      .toContainText('1 of 27')
    
    // Should show progress bar
    await expect(page.locator('[data-testid="progress-bar"]'))
      .toBeVisible()
    
    // Progress should be minimal at start
    const progressBar = page.locator('[data-testid="progress-bar-fill"]')
    const width = await progressBar.getAttribute('style')
    expect(width).toContain('3.7%') // 1/27 ≈ 3.7%
  })

  test('should track and display flight hours', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should show current flight hours (starting at 0)
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('0.0')
    
    // Complete lesson with hours
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Should be able to log hours for the lesson
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    await page.click('[data-testid="save-hours-button"]')
    
    // Hours should update
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('1.5')
    
    // Should show breakdown by type
    await expect(page.locator('[data-testid="dual-hours"]'))
      .toContainText('1.5')
  })

  test('should show achievement badges for major milestones', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Complete first lesson
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.0')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should unlock "First Flight" badge
    await expect(page.locator('[data-testid="achievement-notification"]'))
      .toContainText('First Flight badge unlocked!')
    
    // Badge should appear in achievements section
    await expect(page.locator('[data-testid="first-flight-badge"]'))
      .toBeVisible()
    
    // Should show badge count
    await expect(page.locator('[data-testid="badges-earned"]'))
      .toContainText('1 of 12')
  })

  test('should integrate regulatory requirements with lesson progression', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should show upcoming regulatory requirements
    await expect(page.locator('[data-testid="next-requirement"]'))
      .toContainText('Medical Certificate')
    
    // Should explain why this requirement exists
    await page.click('[data-testid="requirement-info-button"]')
    await expect(page.locator('[data-testid="requirement-explanation"]'))
      .toContainText('required before solo flight')
    
    // Should be able to mark requirement as completed
    await page.click('[data-testid="mark-requirement-complete"]')
    await expect(page.locator('[data-testid="medical-certificate-status"]'))
      .toHaveClass(/completed/)
  })

  test('should handle financial tracking simply', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should show total spent (starting at $0)
    await expect(page.locator('[data-testid="total-spent"]'))
      .toContainText('$0')
    
    // Complete lesson and add cost
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.0')
    await page.fill('[data-testid="lesson-cost-input"]', '180')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should update total
    await expect(page.locator('[data-testid="total-spent"]'))
      .toContainText('$180')
    
    // Should show average cost per hour
    await expect(page.locator('[data-testid="cost-per-hour"]'))
      .toContainText('$180/hour')
  })

  test('should show what to do next clearly', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should have a prominent "Today's Focus" section
    await expect(page.locator('[data-testid="todays-focus"]'))
      .toBeVisible()
    
    // Should show the primary action needed
    await expect(page.locator('[data-testid="primary-action"]'))
      .toContainText('Complete Lesson 1: Introductory Flight')
    
    // Should show any preparation needed
    await expect(page.locator('[data-testid="preparation-needed"]'))
      .toContainText('Book your first lesson with a flight instructor')
  })

  test('should persist progress across browser sessions', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Complete first lesson
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    await page.click('[data-testid="save-hours-button"]')
    
    // Reload the page
    await page.reload()
    
    // Should remember progress
    await expect(page.locator('[data-testid="current-lesson-title"]'))
      .toContainText('Lesson 2')
    
    // Should remember hours
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('1.5')
    
    // Should remember badges
    await expect(page.locator('[data-testid="first-flight-badge"]'))
      .toBeVisible()
  })

  test('should handle lesson repetition positively', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Complete lesson
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.0')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should be able to repeat the lesson
    await page.click('[data-testid="lesson-1"]')
    await expect(page.locator('[data-testid="repeat-lesson-option"]'))
      .toBeVisible()
    
    // Should explain repetition positively
    await expect(page.locator('[data-testid="repeat-lesson-explanation"]'))
      .toContainText('Additional practice makes perfect!')
  })
})