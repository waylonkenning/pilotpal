import { test, expect } from '@playwright/test'

test.describe('Milestone Requirements Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show View Requirements button and open modal', async ({ page }) => {
    // Should show View Requirements button in Next Major Milestone section
    await expect(page.locator('[data-testid="view-milestone-requirements"]')).toBeVisible()
    await expect(page.locator('[data-testid="view-milestone-requirements"]')).toContainText('View Requirements')
    
    // Click View Requirements button
    await page.click('[data-testid="view-milestone-requirements"]')
    
    // Should show milestone requirements modal
    await expect(page.locator('[data-testid="milestone-requirements-modal"]')).toBeVisible()
  })

  test('should show First Flight requirements for new users', async ({ page }) => {
    // New user should see First Flight milestone
    await expect(page.locator('[data-testid="next-major-milestone"]')).toContainText('First Flight')
    
    // Click View Requirements
    await page.click('[data-testid="view-milestone-requirements"]')
    
    // Should show First Flight requirements in modal
    await expect(page.locator('[data-testid="milestone-requirements-modal"] h3')).toContainText('Complete Your First Flight')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toBeVisible()
    await expect(page.locator('[data-testid="milestone-next-steps"]')).toBeVisible()
    await expect(page.locator('[data-testid="milestone-cost"]')).toBeVisible()
    await expect(page.locator('[data-testid="milestone-timeframe"]')).toBeVisible()
    
    // Should show specific First Flight requirements
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('Contact a flight school')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('Bring valid photo ID')
    await expect(page.locator('[data-testid="milestone-cost"]')).toContainText('$280-$420')
  })

  test('should show Controls Master requirements for users with some flight time', async ({ page }) => {
    // Set user with 2 hours of flight time
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 4,
        completedLessons: [1, 2, 3],
        flightHours: { total: 2.5, dual: 2.5, solo: 0, crossCountry: 0 },
        demonstratedSkills: {}
      }))
    })
    
    // Go directly to dashboard
    await page.goto('/dashboard')
    
    // Should show Controls Master milestone
    await expect(page.locator('[data-testid="next-major-milestone"]')).toContainText('Controls Master')
    
    // Click View Requirements
    await page.click('[data-testid="view-milestone-requirements"]')
    
    // Should show Controls Master requirements in modal
    await expect(page.locator('[data-testid="milestone-requirements-modal"] h3')).toContainText('Master Basic Aircraft Controls')
    
    // Should show current progress in requirements
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('currently: 2.5h')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('straight and level flight')
    await expect(page.locator('[data-testid="milestone-timeframe"]')).toContainText('2.5 more hours needed')
  })

  test('should show Solo Wings requirements for advanced students', async ({ page }) => {
    // Set user with 8 hours, ready for solo
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 11,
        completedLessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        flightHours: { total: 8.0, dual: 8.0, solo: 0, crossCountry: 0 },
        demonstratedSkills: {}
      }))
    })
    
    // Go directly to dashboard
    await page.goto('/dashboard')
    
    // Should show Solo Wings milestone
    await expect(page.locator('[data-testid="next-major-milestone"]')).toContainText('Solo Wings')
    
    // Click View Requirements
    await page.click('[data-testid="view-milestone-requirements"]')
    
    // Should show Solo Wings requirements in modal
    await expect(page.locator('[data-testid="milestone-requirements-modal"] h3')).toContainText('Achieve Your First Solo Flight')
    
    // Should show specific solo requirements
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('Valid medical certificate')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('Student pilot permit')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('solo endorsement')
    await expect(page.locator('[data-testid="milestone-next-steps"]')).toContainText('Complete medical certificate')
  })

  test('should show Navigation Phase requirements for post-solo students', async ({ page }) => {
    // Set user with solo hours
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 15,
        completedLessons: Array.from({length: 14}, (_, i) => i + 1),
        flightHours: { total: 18.0, dual: 12.0, solo: 6.0, crossCountry: 0 },
        achievements: ['first-flight', 'controls-master', 'solo-wings'],
        demonstratedSkills: {}
      }))
    })
    
    // Go directly to dashboard
    await page.goto('/dashboard')
    
    // Should show Navigation Phase milestone
    await expect(page.locator('[data-testid="next-major-milestone"]')).toContainText('Navigation Phase')
    
    // Click View Requirements
    await page.click('[data-testid="view-milestone-requirements"]')
    
    // Should show Navigation Phase requirements in modal
    await expect(page.locator('[data-testid="milestone-requirements-modal"] h3')).toContainText('Begin Cross-Country Navigation')
    
    // Should show current solo hours
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('solo hours: 6.0h')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('navigation theory exam')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('VOR and GPS navigation')
  })

  test('should close modal when close button is clicked', async ({ page }) => {
    // Open modal
    await page.click('[data-testid="view-milestone-requirements"]')
    await expect(page.locator('[data-testid="milestone-requirements-modal"]')).toBeVisible()
    
    // Click close button
    await page.click('button:has-text("Close")')
    
    // Modal should be closed
    await expect(page.locator('[data-testid="milestone-requirements-modal"]')).not.toBeVisible()
  })

  test('should close modal when clicking outside', async ({ page }) => {
    // Open modal
    await page.click('[data-testid="view-milestone-requirements"]')
    await expect(page.locator('[data-testid="milestone-requirements-modal"]')).toBeVisible()
    
    // Click outside modal (on overlay)
    await page.click('.modal-overlay', { position: { x: 10, y: 10 } })
    
    // Modal should be closed
    await expect(page.locator('[data-testid="milestone-requirements-modal"]')).not.toBeVisible()
  })

  test('should provide link to view all requirements', async ({ page }) => {
    // Open modal
    await page.click('[data-testid="view-milestone-requirements"]')
    
    // Should show link to view all requirements
    await expect(page.locator('a:has-text("View All Requirements")')).toBeVisible()
    await expect(page.locator('a:has-text("View All Requirements")')).toHaveAttribute('href', '/requirements')
  })

  test('should show Licensed Pilot requirements for advanced students', async ({ page }) => {
    // Set user with high hours and achievements
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        currentLesson: 25,
        completedLessons: Array.from({length: 24}, (_, i) => i + 1),
        flightHours: { total: 45.0, dual: 25.0, solo: 20.0, crossCountry: 8.0 },
        achievements: ['first-flight', 'controls-master', 'solo-wings', 'navigation-pioneer', 'theory-scholar', 'night-flyer'],
        demonstratedSkills: {}
      }))
    })
    
    // Go directly to dashboard
    await page.goto('/dashboard')
    
    // Should show Licensed Pilot milestone
    await expect(page.locator('[data-testid="next-major-milestone"]')).toContainText('Licensed Pilot')
    
    // Click View Requirements
    await page.click('[data-testid="view-milestone-requirements"]')
    
    // Should show Licensed Pilot requirements in modal
    await expect(page.locator('[data-testid="milestone-requirements-modal"] h3')).toContainText('Complete Your PPL License')
    
    // Should show final requirements
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('minimum 50 hours total flight time')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('Pass all 6 theory exams')
    await expect(page.locator('[data-testid="milestone-requirements-list"]')).toContainText('PPL flight test with CAA examiner')
    await expect(page.locator('[data-testid="milestone-cost"]')).toContainText('$500-$800 for flight test')
  })
})