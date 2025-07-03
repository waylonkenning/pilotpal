import { test, expect } from '@playwright/test'

test.describe('Lesson Info Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show detailed lesson information when More Info is clicked', async ({ page }) => {
    // Should be on lesson 1 by default
    await expect(page.locator('[data-testid="current-lesson-title"]')).toContainText('Lesson 1')
    
    // Click More Info button
    await page.click('[data-testid="lesson-info-button"]')
    
    // Should show lesson info modal
    await expect(page.locator('[data-testid="lesson-info-modal"]')).toBeVisible()
    
    // Should show lesson details
    await expect(page.locator('[data-testid="lesson-description"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-preparation"]')).toBeVisible()
    await expect(page.locator('[data-testid="training-phase-info"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-duration"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-cost"]')).toBeVisible()
    
    // Should show Foundation Phase for lesson 1
    await expect(page.locator('[data-testid="training-phase-info"]')).toContainText('Foundation Phase')
    
    // Should show lesson 1 specific content
    await expect(page.locator('[data-testid="lesson-description"]')).toContainText('Get familiar with the aircraft and basic controls')
    await expect(page.locator('[data-testid="lesson-preparation"]')).toContainText('Book your first lesson with a flight instructor')
  })

  test('should show different training phases for different lessons', async ({ page }) => {
    // Set lesson to 8 (Circuit phase)
    await page.evaluate(() => {
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 8,
        completedLessons: [1, 2, 3, 4, 5, 6, 7],
        flightHours: { total: 10, dual: 10, solo: 0, crossCountry: 0 }
      }))
    })
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Click More Info for lesson 8
    await page.click('[data-testid="lesson-info-button"]')
    
    // Should show Circuit Phase
    await expect(page.locator('[data-testid="training-phase-info"]')).toContainText('Circuit Phase')
    
    // Should show lesson 8 specific content (Stalls)
    await expect(page.locator('[data-testid="lesson-description"]')).toContainText('Recognize, enter, and recover from stalls')
  })

  test('should show prerequisites for advanced lessons', async ({ page }) => {
    // Set lesson to 13 (First Solo - has prerequisites)
    await page.evaluate(() => {
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 13,
        completedLessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        flightHours: { total: 20, dual: 20, solo: 0, crossCountry: 0 }
      }))
    })
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Click More Info for lesson 13
    await page.click('[data-testid="lesson-info-button"]')
    
    // Should show prerequisites section
    await expect(page.locator('[data-testid="lesson-prerequisites"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-prerequisites"]')).toContainText('Medical certificate')
    await expect(page.locator('[data-testid="lesson-prerequisites"]')).toContainText('Solo endorsement')
  })

  test('should show cost and duration information', async ({ page }) => {
    // Click More Info button
    await page.click('[data-testid="lesson-info-button"]')
    
    // Should show duration and cost
    await expect(page.locator('[data-testid="lesson-duration"]')).toContainText('1.0-1.5 hours')
    await expect(page.locator('[data-testid="lesson-cost"]')).toContainText('$280-$420')
  })

  test('should allow starting lesson from modal', async ({ page }) => {
    // Click More Info button
    await page.click('[data-testid="lesson-info-button"]')
    
    // Should show Start Lesson button
    await expect(page.locator('[data-testid="start-lesson-button"]')).toBeVisible()
    
    // Click Start Lesson
    await page.click('[data-testid="start-lesson-button"]')
    
    // Should close lesson info modal and open complete lesson modal
    await expect(page.locator('[data-testid="lesson-info-modal"]')).not.toBeVisible()
    await expect(page.locator('[data-testid="complete-lesson-modal"]')).toBeVisible()
  })

  test('should close modal when close button is clicked', async ({ page }) => {
    // Click More Info button
    await page.click('[data-testid="lesson-info-button"]')
    
    // Should show modal
    await expect(page.locator('[data-testid="lesson-info-modal"]')).toBeVisible()
    
    // Click Close button
    await page.click('button:has-text("Close")')
    
    // Should close modal
    await expect(page.locator('[data-testid="lesson-info-modal"]')).not.toBeVisible()
  })

  test('should close modal when clicking outside', async ({ page }) => {
    // Click More Info button
    await page.click('[data-testid="lesson-info-button"]')
    
    // Should show modal
    await expect(page.locator('[data-testid="lesson-info-modal"]')).toBeVisible()
    
    // Click outside modal (on overlay)
    await page.click('.modal-overlay', { position: { x: 10, y: 10 } })
    
    // Should close modal
    await expect(page.locator('[data-testid="lesson-info-modal"]')).not.toBeVisible()
  })

  test('should show correct lesson information for all training phases', async ({ page }) => {
    const testCases = [
      { lesson: 1, phase: 'Foundation Phase', name: 'Introductory Flight' },
      { lesson: 10, phase: 'Circuit Phase', name: 'Circuit Pattern' },
      { lesson: 15, phase: 'Navigation Phase', name: 'Navigation Basics' },
      { lesson: 22, phase: 'Advanced Phase', name: 'Advanced Maneuvers' },
      { lesson: 26, phase: 'Certification Phase', name: 'Final Flight Test' }
    ]

    for (const testCase of testCases) {
      // Set lesson
      await page.evaluate((lesson) => {
        localStorage.setItem('ppl-quest-progress', JSON.stringify({
          currentLesson: lesson,
          completedLessons: Array.from({length: lesson - 1}, (_, i) => i + 1),
          flightHours: { total: lesson * 2, dual: lesson * 1.5, solo: lesson * 0.5, crossCountry: 0 }
        }))
      }, testCase.lesson)
      
      await page.reload()
      await page.click('[data-testid="start-journey-button"]')
      await page.click('[data-testid="continue-to-app"]')
      
      // Check current lesson title
      await expect(page.locator('[data-testid="current-lesson-title"]')).toContainText(`Lesson ${testCase.lesson}`)
      await expect(page.locator('[data-testid="current-lesson-description"]')).toContainText(testCase.name)
      
      // Click More Info
      await page.click('[data-testid="lesson-info-button"]')
      
      // Check training phase
      await expect(page.locator('[data-testid="training-phase-info"]')).toContainText(testCase.phase)
      
      // Close modal
      await page.click('button:has-text("Close")')
    }
  })
})