import { test, expect } from '@playwright/test'

test.describe('Advanced User Interactions and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show hover tooltips on lesson nodes and progress elements', async ({ page }) => {
    // Navigate to journey view with progress visualization
    await page.click('[data-testid="journey-tab"]')
    
    // Hover over current lesson node
    await page.hover('[data-testid="current-lesson-node"]')
    
    // Should show lesson tooltip with details
    await expect(page.locator('[data-testid="lesson-tooltip"]'))
      .toBeVisible()
    
    // Should contain lesson information
    await expect(page.locator('[data-testid="lesson-tooltip"]'))
      .toContainText('Lesson')
    
    // Hover over progress wheel
    await page.hover('[data-testid="flight-hours-wheel"]')
    
    // Should show hours breakdown tooltip
    await expect(page.locator('[data-testid="hours-breakdown-tooltip"]'))
      .toBeVisible()
    
    // Should show detailed hour breakdown
    await expect(page.locator('[data-testid="hours-breakdown-tooltip"]'))
      .toContainText('Dual')
    
    // Hover over phase icon
    await page.hover('[data-testid="foundation-phase-icon"]')
    
    // Should show phase tooltip
    await expect(page.locator('[data-testid="phase-tooltip"]'))
      .toBeVisible()
    
    // Should contain phase information
    await expect(page.locator('[data-testid="phase-tooltip"]'))
      .toContainText('Foundation')
  })

  test('should handle mobile touch interactions and gestures', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigate to journey view
    await page.click('[data-testid="journey-tab"]')
    
    // Should show mobile-optimized lesson cards
    await expect(page.locator('[data-testid="swipeable-lesson-cards"]'))
      .toBeVisible()
    
    // Should have touch-friendly interaction areas
    await expect(page.locator('[data-testid="touch-friendly-targets"]'))
      .toBeVisible()
    
    // Test touch interactions on lesson nodes
    await page.tap('[data-testid="current-lesson-node"]')
    
    // Should show lesson details or action
    await expect(page.locator('[data-testid="lesson-details-mobile"]'))
      .toBeVisible()
    
    // Test swipe gesture simulation (using mouse drag)
    await page.locator('[data-testid="swipeable-lesson-cards"]').dragTo(
      page.locator('[data-testid="swipe-target"]')
    )
    
    // Should respond to swipe action
    await expect(page.locator('[data-testid="swipe-indicator"]'))
      .toBeVisible()
  })

  test('should handle form validation errors gracefully', async ({ page }) => {
    // Test lesson completion with invalid data
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Try to save without required fields
    await page.click('[data-testid="save-hours-button"]')
    
    // Should show validation errors
    await expect(page.locator('[data-testid="hours-validation-error"]'))
      .toBeVisible()
    
    // Try negative hours
    await page.fill('[data-testid="lesson-hours-input"]', '-1')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should show negative hours error
    await expect(page.locator('[data-testid="hours-validation-error"]'))
      .toContainText('positive')
    
    // Try extremely high hours
    await page.fill('[data-testid="lesson-hours-input"]', '50')
    await page.click('[data-testid="save-hours-button"]')
    
    // Should show reasonable hours warning
    await expect(page.locator('[data-testid="hours-validation-warning"]'))
      .toBeVisible()
    
    // Test future date validation
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)
    await page.fill('[data-testid="lesson-date-input"]', futureDate.toISOString().split('T')[0])
    await page.click('[data-testid="save-hours-button"]')
    
    // Should show future date error
    await expect(page.locator('[data-testid="date-validation-error"]'))
      .toContainText('future')
  })

  test('should handle network simulation and offline behavior', async ({ page }) => {
    // Navigate to finances to test data operations
    await page.click('[data-testid="finances-tab"]')
    
    // Add an expense normally
    await page.click('[data-testid="add-expense-button"]')
    await page.selectOption('[data-testid="expense-category-select"]', 'Flight Training')
    await page.fill('[data-testid="expense-amount-input"]', '150')
    await page.fill('[data-testid="expense-description-input"]', 'Test expense')
    await page.fill('[data-testid="expense-date-input"]', '2024-06-01')
    
    // Simulate network failure (by going offline)
    await page.context().setOffline(true)
    
    // Try to save expense
    await page.click('[data-testid="save-expense-button"]')
    
    // Should handle offline gracefully
    await expect(page.locator('[data-testid="offline-indicator"]'))
      .toBeVisible()
    
    // Should queue action for when online
    await expect(page.locator('[data-testid="pending-actions"]'))
      .toContainText('1 pending')
    
    // Go back online
    await page.context().setOffline(false)
    
    // Should sync pending actions
    await expect(page.locator('[data-testid="sync-success"]'))
      .toBeVisible()
    
    // Expense should now appear
    await expect(page.locator('[data-testid="expense-item"]'))
      .toHaveCount(1)
  })

  test('should handle browser storage limitations and cleanup', async ({ page }) => {
    // Fill storage with large amount of data
    await page.evaluate(() => {
      const largeData = {
        expenses: Array(1000).fill(null).map((_, i) => ({
          id: i,
          category: 'Flight Training',
          amount: 100 + i,
          description: `Large expense entry number ${i}`,
          date: '2024-06-01'
        }))
      }
      
      try {
        localStorage.setItem('ppl-quest-financial', JSON.stringify(largeData))
      } catch (e) {
        // Storage full
        console.log('Storage full:', e)
      }
    })
    
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Navigate to finances
    await page.click('[data-testid="finances-tab"]')
    
    // Should handle large data gracefully
    await expect(page.locator('[data-testid="total-spent"]'))
      .toBeVisible()
    
    // Should offer data cleanup options
    await expect(page.locator('[data-testid="storage-management"]'))
      .toBeVisible()
    
    // Test cleanup action
    await page.click('[data-testid="cleanup-old-data"]')
    
    // Should show cleanup confirmation
    await expect(page.locator('[data-testid="cleanup-confirmation"]'))
      .toBeVisible()
    
    await page.click('[data-testid="confirm-cleanup"]')
    
    // Should show cleanup success
    await expect(page.locator('[data-testid="cleanup-success"]'))
      .toBeVisible()
  })

  test('should handle concurrent user sessions and data conflicts', async ({ page, context }) => {
    // Create a second page to simulate concurrent session
    const page2 = await context.newPage()
    
    // Set up both sessions
    await page2.goto('/')
    await page2.evaluate(() => localStorage.clear())
    await page2.click('[data-testid="start-journey-button"]')
    await page2.click('[data-testid="continue-to-app"]')
    
    // Complete a lesson in first session
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    await page.click('[data-testid="save-hours-button"]')
    
    // Complete a different lesson in second session (conflict scenario)
    await page2.click('[data-testid="complete-lesson-button"]')
    await page2.fill('[data-testid="lesson-hours-input"]', '2.0')
    await page2.click('[data-testid="save-hours-button"]')
    
    // Refresh first session to check conflict resolution
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should handle data merge or show conflict resolution
    await expect(page.locator('[data-testid="total-hours"]'))
      .toBeVisible()
    
    // Should show most recent or merged data
    await expect(page.locator('[data-testid="lesson-progress"]'))
      .toContainText('2 of 27')
    
    await page2.close()
  })

  test('should handle rapid user interactions and prevent duplicate actions', async ({ page }) => {
    // Navigate to lesson completion
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    
    // Rapidly click save button multiple times
    await Promise.all([
      page.click('[data-testid="save-hours-button"]'),
      page.click('[data-testid="save-hours-button"]'),
      page.click('[data-testid="save-hours-button"]')
    ])
    
    // Should only process one save action
    await expect(page.locator('[data-testid="lesson-progress"]'))
      .toContainText('1 of 27')
    
    // Should not show duplicate hours
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('1.5')
    
    // Test rapid navigation clicks
    await Promise.all([
      page.click('[data-testid="journey-tab"]'),
      page.click('[data-testid="finances-tab"]'),
      page.click('[data-testid="achievements-tab"]')
    ])
    
    // Should end up in final clicked tab
    await expect(page.locator('[data-testid="achievements-tab"]'))
      .toHaveClass(/active/)
  })

  test('should provide accessible keyboard navigation', async ({ page }) => {
    // Test tab navigation through main interface
    await page.keyboard.press('Tab')
    
    // Should focus on first interactive element
    await expect(page.locator(':focus'))
      .toBeVisible()
    
    // Tab through navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
    }
    
    // Should be able to activate with Enter/Space
    await page.keyboard.press('Enter')
    
    // Should navigate to focused section
    await expect(page.url())
      .toContain('localhost:3000')
    
    // Test modal keyboard interaction
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Should trap focus in modal
    await page.keyboard.press('Tab')
    await expect(page.locator('[data-testid="lesson-hours-input"]:focus'))
      .toBeVisible()
    
    // Escape should close modal
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-testid="complete-lesson-modal"]'))
      .not.toBeVisible()
  })

  test('should handle different screen sizes and orientations', async ({ page }) => {
    // Test various mobile screen sizes
    const screenSizes = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 375, height: 667 }, // iPhone 6/7/8
      { width: 414, height: 896 }, // iPhone XR
      { width: 768, height: 1024 } // iPad
    ]
    
    for (const size of screenSizes) {
      await page.setViewportSize(size)
      
      // Should maintain usability at all sizes
      await expect(page.locator('[data-testid="main-dashboard"]'))
        .toBeVisible()
      
      // Navigation should remain accessible
      await expect(page.locator('[data-testid="navigation-menu"]'))
        .toBeVisible()
      
      // Text should remain readable
      await expect(page.locator('[data-testid="current-lesson-title"]'))
        .toBeVisible()
    }
    
    // Test landscape orientation on mobile
    await page.setViewportSize({ width: 667, height: 375 })
    
    // Should adapt layout for landscape
    await expect(page.locator('[data-testid="landscape-layout"]'))
      .toBeVisible()
    
    // Should maintain full functionality
    await page.click('[data-testid="complete-lesson-button"]')
    await expect(page.locator('[data-testid="complete-lesson-modal"]'))
      .toBeVisible()
  })
})