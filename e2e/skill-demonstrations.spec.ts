import { test, expect } from '@playwright/test'

test.describe('Skill Demonstrations Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show skill demonstrations for lessons with specific skills', async ({ page }) => {
    // Lesson 1 should have skills (cockpit familiarization, basic controls)
    await expect(page.locator('[data-testid="current-lesson-title"]')).toContainText('Lesson 1')
    
    // Click Complete Lesson
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Should show skill demonstrations section
    await expect(page.locator('[data-testid="skill-demonstrations"]')).toBeVisible()
    
    // Should show specific skills for lesson 1
    await expect(page.locator('[data-testid="skill-cockpit-familiarization"]')).toBeVisible()
    await expect(page.locator('[data-testid="skill-basic-controls"]')).toBeVisible()
    
    // Should show skill names and descriptions
    await expect(page.locator('text=Cockpit Familiarization')).toBeVisible()
    await expect(page.locator('text=Basic Control Understanding')).toBeVisible()
  })

  test('should allow checking and unchecking skill demonstrations', async ({ page }) => {
    // Open complete lesson modal
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Skills should be unchecked by default
    await expect(page.locator('[data-testid="skill-cockpit-familiarization"]')).not.toBeChecked()
    await expect(page.locator('[data-testid="skill-basic-controls"]')).not.toBeChecked()
    
    // Check first skill
    await page.click('[data-testid="skill-cockpit-familiarization"]')
    await expect(page.locator('[data-testid="skill-cockpit-familiarization"]')).toBeChecked()
    
    // Check second skill
    await page.click('[data-testid="skill-basic-controls"]')
    await expect(page.locator('[data-testid="skill-basic-controls"]')).toBeChecked()
    
    // Uncheck first skill
    await page.click('[data-testid="skill-cockpit-familiarization"]')
    await expect(page.locator('[data-testid="skill-cockpit-familiarization"]')).not.toBeChecked()
  })

  test('should save demonstrated skills when lesson is completed', async ({ page }) => {
    // Open complete lesson modal
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Fill required hours
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    
    // Check some skills
    await page.click('[data-testid="skill-cockpit-familiarization"]')
    await page.click('[data-testid="skill-basic-controls"]')
    
    // Complete the lesson
    await page.click('[data-testid="save-hours-button"]')
    
    // Should show celebration modal
    await expect(page.locator('[data-testid="lesson-complete-celebration"]')).toBeVisible()
    
    // Close celebration
    await page.click('[data-testid="continue-to-next-lesson"]')
    
    // Verify skills were saved to localStorage
    const savedSkills = await page.evaluate(() => {
      const progress = JSON.parse(localStorage.getItem('ppl-quest-progress') || '{}')
      return progress.demonstratedSkills || {}
    })
    
    // Should have saved the demonstrated skills
    expect(savedSkills['cockpit-familiarization']).toBeDefined()
    expect(savedSkills['cockpit-familiarization'].lessonNumber).toBe(1)
    expect(savedSkills['basic-controls']).toBeDefined()
    expect(savedSkills['basic-controls'].lessonNumber).toBe(1)
  })

  test('should show different skills for different lessons', async ({ page }) => {
    // Set to lesson 8 (Stalls) which has specific stall recovery skills
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 8,
        completedLessons: [1, 2, 3, 4, 5, 6, 7],
        flightHours: { total: 10, dual: 10, solo: 0, crossCountry: 0 },
        demonstratedSkills: {}
      }))
    })
    
    // Go directly to dashboard
    await page.goto('/dashboard')
    
    // Should be on lesson 8
    await expect(page.locator('[data-testid="current-lesson-title"]')).toContainText('Lesson 8')
    
    // Open complete lesson modal
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Should show stall-specific skills
    await expect(page.locator('[data-testid="skill-stall-recognition"]')).toBeVisible()
    await expect(page.locator('[data-testid="skill-stall-recovery"]')).toBeVisible()
    await expect(page.locator('[data-testid="skill-power-on-stall"]')).toBeVisible()
    await expect(page.locator('[data-testid="skill-power-off-stall"]')).toBeVisible()
    
    // Verify that skills are properly shown and interactive
    await expect(page.locator('[data-testid="skill-stall-recognition"]')).toBeEnabled()
    await expect(page.locator('[data-testid="skill-stall-recovery"]')).toBeEnabled()
  })

  test('should not show skills section for lessons without specific skills', async ({ page }) => {
    // Set to lesson 14 (Solo Practice) which has no specific skills defined
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 14,
        completedLessons: Array.from({length: 13}, (_, i) => i + 1),
        flightHours: { total: 20, dual: 15, solo: 5, crossCountry: 0 },
        demonstratedSkills: {}
      }))
    })
    
    // Go directly to dashboard
    await page.goto('/dashboard')
    
    // Should be on lesson 14
    await expect(page.locator('[data-testid="current-lesson-title"]')).toContainText('Lesson 14')
    
    // Open complete lesson modal
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Should NOT show skill demonstrations section
    await expect(page.locator('[data-testid="skill-demonstrations"]')).not.toBeVisible()
  })

  test('should clear skill selections when modal is cancelled', async ({ page }) => {
    // Open complete lesson modal
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Check some skills
    await page.click('[data-testid="skill-cockpit-familiarization"]')
    await page.click('[data-testid="skill-basic-controls"]')
    
    // Verify skills are checked
    await expect(page.locator('[data-testid="skill-cockpit-familiarization"]')).toBeChecked()
    await expect(page.locator('[data-testid="skill-basic-controls"]')).toBeChecked()
    
    // Cancel the modal
    await page.click('button:has-text("Cancel")')
    
    // Reopen modal
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Skills should be unchecked again
    await expect(page.locator('[data-testid="skill-cockpit-familiarization"]')).not.toBeChecked()
    await expect(page.locator('[data-testid="skill-basic-controls"]')).not.toBeChecked()
  })

  test('should show progress for emergency skills in lesson 9', async ({ page }) => {
    // Set to lesson 9 (Emergency Procedures)
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 9,
        completedLessons: [1, 2, 3, 4, 5, 6, 7, 8],
        flightHours: { total: 12, dual: 12, solo: 0, crossCountry: 0 },
        demonstratedSkills: {}
      }))
    })
    
    // Go directly to dashboard
    await page.goto('/dashboard')
    
    // Should be on lesson 9
    await expect(page.locator('[data-testid="current-lesson-title"]')).toContainText('Lesson 9')
    
    // Open complete lesson modal
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Should show emergency procedure skills
    await expect(page.locator('[data-testid="skill-emergency-descent"]')).toBeVisible()
    await expect(page.locator('[data-testid="skill-engine-failure"]')).toBeVisible()
    await expect(page.locator('[data-testid="skill-forced-landing"]')).toBeVisible()
    
    // Verify that skills are properly shown and interactive
    await expect(page.locator('[data-testid="skill-emergency-descent"]')).toBeEnabled()
    await expect(page.locator('[data-testid="skill-engine-failure"]')).toBeEnabled()
    await expect(page.locator('[data-testid="skill-forced-landing"]')).toBeEnabled()
  })
})