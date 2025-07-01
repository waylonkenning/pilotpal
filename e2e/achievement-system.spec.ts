import { test, expect } from '@playwright/test'

test.describe('Achievement Badge System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup: start journey and get to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should unlock First Flight badge after completing lesson 1', async ({ page }) => {
    // Complete Lesson 1
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.0')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should show celebration animation
    await expect(page.locator('[data-testid="badge-celebration"]'))
      .toBeVisible()
    
    // Should show specific badge unlocked
    await expect(page.locator('[data-testid="badge-celebration-title"]'))
      .toContainText('First Flight')
    
    // Badge should appear in achievements section
    await expect(page.locator('[data-testid="first-flight-badge"]'))
      .toHaveClass(/unlocked/)
    
    // Should show badge description
    await expect(page.locator('[data-testid="first-flight-badge-description"]'))
      .toContainText('Complete your introductory flight')
  })

  test('should unlock Controls Master badge after 5 hours dual', async ({ page }) => {
    // Complete multiple lessons to reach 5 hours
    for (let i = 1; i <= 5; i++) {
      await page.click('[data-testid="complete-lesson-button"]')
      await page.fill('[data-testid="lesson-hours-input"]', '1.0')
      await page.click('[data-testid="save-hours-button"]')
      
      if (i < 5) {
        // Dismiss any celebration and continue to next lesson
        await page.click('[data-testid="continue-to-next-lesson"]')
      }
    }
    
    // Should unlock Controls Master badge
    await expect(page.locator('[data-testid="badge-celebration-title"]'))
      .toContainText('Controls Master')
    
    await expect(page.locator('[data-testid="controls-master-badge"]'))
      .toHaveClass(/unlocked/)
  })

  test('should show badge requirements and progress', async ({ page }) => {
    // Navigate to achievements section
    await page.click('[data-testid="achievements-tab"]')
    
    // Should show all available badges
    await expect(page.locator('[data-testid="badge-grid"]'))
      .toBeVisible()
    
    // Should show locked badges with requirements
    await expect(page.locator('[data-testid="solo-wings-badge"]'))
      .toHaveClass(/locked/)
    
    // Should show what's needed to unlock
    await page.click('[data-testid="solo-wings-badge"]')
    await expect(page.locator('[data-testid="badge-requirements"]'))
      .toContainText('Complete your first solo flight')
    
    // Should show progress towards requirement
    await expect(page.locator('[data-testid="badge-progress"]'))
      .toContainText('0 / 1 solo flights')
  })

  test('should unlock multiple badges for major milestones', async ({ page }) => {
    // Simulate completing many lessons to reach solo stage
    // (This is a fast-forward simulation for testing)
    await page.evaluate(() => {
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 10,
        completedLessons: [1,2,3,4,5,6,7,8,9],
        flightHours: { dual: 12, solo: 1, total: 13 },
        achievements: ['first-flight', 'controls-master', 'radio-operator']
      }))
    })
    await page.reload()
    
    // Mark solo flight complete
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="solo-hours-input"]', '1.0')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should unlock Solo Wings badge with big celebration
    await expect(page.locator('[data-testid="major-milestone-celebration"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="badge-celebration-title"]'))
      .toContainText('Solo Wings')
    
    // Should show this is a major achievement
    await expect(page.locator('[data-testid="milestone-significance"]'))
      .toContainText('major milestone')
  })

  test('should show badge categories and progress', async ({ page }) => {
    await page.click('[data-testid="achievements-tab"]')
    
    // Should show different categories
    await expect(page.locator('[data-testid="foundation-badges"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="circuit-badges"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="navigation-badges"]'))
      .toBeVisible()
    
    // Should show category progress
    await expect(page.locator('[data-testid="foundation-progress"]'))
      .toContainText('0 of 4') // No badges unlocked yet
    
    // Complete first lesson to unlock badge
    await page.click('[data-testid="main-tab"]')
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.0')
    await page.click('[data-testid="save-hours-button"]')
    
    // Return to achievements
    await page.click('[data-testid="achievements-tab"]')
    
    // Should show updated progress
    await expect(page.locator('[data-testid="foundation-progress"]'))
      .toContainText('1 of 4')
  })

  test('should handle theory exam badges', async ({ page }) => {
    // Navigate to theory section
    await page.click('[data-testid="theory-tab"]')
    
    // Mark Air Law exam as passed
    await page.click('[data-testid="air-law-exam"]')
    await page.fill('[data-testid="exam-score-input"]', '85')
    await page.click('[data-testid="mark-exam-passed"]')
    
    // Should unlock Theory Scholar badge
    await expect(page.locator('[data-testid="badge-celebration-title"]'))
      .toContainText('Theory Scholar')
    
    // Should show exam-specific achievement
    await expect(page.locator('[data-testid="air-law-master-badge"]'))
      .toHaveClass(/unlocked/)
  })

  test('should show overall achievement stats', async ({ page }) => {
    await page.click('[data-testid="achievements-tab"]')
    
    // Should show total progress
    await expect(page.locator('[data-testid="total-badges"]'))
      .toContainText('0 of 12')
    
    // Should show completion percentage
    await expect(page.locator('[data-testid="completion-percentage"]'))
      .toContainText('0%')
    
    // Complete a lesson to earn badge
    await page.click('[data-testid="main-tab"]')
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.0')
    await page.click('[data-testid="save-hours-button"]')
    
    // Return to achievements
    await page.click('[data-testid="achievements-tab"]')
    
    // Should show updated stats
    await expect(page.locator('[data-testid="total-badges"]'))
      .toContainText('1 of 12')
    
    await expect(page.locator('[data-testid="completion-percentage"]'))
      .toContainText('8%') // 1/12 ≈ 8%
  })

  test('should show badge rarity and special achievements', async ({ page }) => {
    await page.click('[data-testid="achievements-tab"]')
    
    // Should show different badge rarities
    await expect(page.locator('[data-testid="first-flight-badge"]'))
      .toHaveAttribute('data-rarity', 'bronze')
    
    await expect(page.locator('[data-testid="solo-wings-badge"]'))
      .toHaveAttribute('data-rarity', 'gold')
    
    await expect(page.locator('[data-testid="licensed-pilot-badge"]'))
      .toHaveAttribute('data-rarity', 'platinum')
    
    // Should show special NZ-specific badges
    await expect(page.locator('[data-testid="mountain-flyer-badge"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="mountain-flyer-description"]'))
      .toContainText('Master New Zealand\'s challenging terrain')
  })
})