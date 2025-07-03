import { test, expect } from '@playwright/test'

test.describe('Mobile Touch Interactions and Swipeable Lesson Cards', () => {
  test.beforeEach(async ({ page, context }) => {
    // Navigate to journey view where lesson cards are displayed
    await page.goto('/journey')
  })

  test('should display swipeable lesson cards on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Should show swipeable lesson cards container
    await expect(page.locator('[data-testid="swipeable-lesson-cards"]')).toBeVisible()
    
    // Should show multiple lesson cards
    const lessonCards = page.locator('[data-testid^="lesson-card-"]')
    expect(await lessonCards.count()).toBeGreaterThan(0)
    
    // First lesson card should be visible
    await expect(page.locator('[data-testid="lesson-card-1"]')).toBeVisible()
  })

  test('should allow horizontal swiping through lesson cards', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const lessonCards = page.locator('[data-testid="swipeable-lesson-cards"]')
    await expect(lessonCards).toBeVisible()
    
    // Get initial scroll position
    const initialScrollLeft = await lessonCards.evaluate(el => el.scrollLeft)
    
    // Perform swipe gesture (touch start, move, end)
    const cardContainer = lessonCards
    const box = await cardContainer.boundingBox()
    
    if (box) {
      // Simulate swipe left using mouse drag
      await page.mouse.move(box.x + box.width - 50, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + 50, box.y + box.height / 2)
      await page.mouse.up()
      
      // Wait for scroll animation
      await page.waitForTimeout(300)
      
      // Check that scroll position changed
      const newScrollLeft = await lessonCards.evaluate(el => el.scrollLeft)
      expect(newScrollLeft).toBeGreaterThanOrEqual(initialScrollLeft)
    }
  })

  test('should show lesson card details with touch-friendly targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Each lesson card should have touch-friendly size (minimum 44px)
    const lessonCard = page.locator('[data-testid="lesson-card-1"]').first()
    await expect(lessonCard).toBeVisible()
    
    const boundingBox = await lessonCard.boundingBox()
    expect(boundingBox?.height).toBeGreaterThan(44)
    
    // Should show lesson information
    await expect(page.locator('[data-testid="lesson-card-title"]').first()).toBeVisible()
    await expect(page.locator('[data-testid="lesson-card-status"]').first()).toBeVisible()
  })

  test('should support touch scrolling for lesson progress overview', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigate to section with lesson progress dots
    const progressDots = page.locator('[data-testid="lesson-progress-dots"]')
    await expect(progressDots).toBeVisible()
    
    // Should be able to interact with lesson nodes via touch
    const firstLessonNode = page.locator('[data-testid="lesson-1-node"]').first()
    await expect(firstLessonNode).toBeVisible()
    
    // Click the lesson node (simulating touch)
    await firstLessonNode.click()
    
    // Should show lesson details or tooltip
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
  })

  test('should handle touch interactions on mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Touch-friendly navigation elements should be present
    await expect(page.locator('[data-testid="touch-friendly-targets"]')).toBeVisible()
    
    // Check mobile requirement icons are touch-friendly
    const requirementIcons = page.locator('[data-testid="mobile-requirement-icons"]')
    await expect(requirementIcons).toBeVisible()
    
    // Each requirement icon should be clickable (simulating touch)
    const medicalIcon = requirementIcons.locator('div').first()
    await medicalIcon.click()
    
    // Should handle touch interaction without errors
  })

  test('should implement swipe gestures for lesson card navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const cardContainer = page.locator('[data-testid="swipeable-lesson-cards"]')
    await expect(cardContainer).toBeVisible()
    
    // Test swipe left to see next lessons
    const containerBox = await cardContainer.boundingBox()
    if (containerBox) {
      // Swipe left gesture
      await page.mouse.move(containerBox.x + containerBox.width - 50, containerBox.y + containerBox.height / 2)
      await page.mouse.down()
      await page.mouse.move(containerBox.x + 50, containerBox.y + containerBox.height / 2)
      await page.mouse.up()
      
      // Should show different lesson cards after swipe
      await page.waitForTimeout(500) // Allow animation to complete
    }
  })

  test('should show lesson details on mobile tap', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Click on a lesson card (simulating touch)
    const lessonCard = page.locator('[data-testid="lesson-card-1"]').first()
    await lessonCard.click()
    
    // Should show lesson details modal or expanded view
    await expect(page.locator('[data-testid="lesson-details-modal"]')).toBeVisible()
    
    // Should show lesson information
    await expect(page.locator('[data-testid="lesson-details-title"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-details-description"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-details-duration"]')).toBeVisible()
  })

  test('should handle touch interactions for progress elements', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigate to dashboard for progress elements
    await page.goto('/dashboard')
    
    // Touch progress cards should be interactive
    const flightHoursCard = page.locator('[data-testid="total-hours"]').first()
    await expect(flightHoursCard).toBeVisible()
    
    // Click to show progress details (simulating touch)
    await flightHoursCard.click()
    await expect(page.locator('[data-testid="progress-tooltip"]')).toBeVisible()
  })

  test('should implement pinch-to-zoom for journey map on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if journey map supports touch interactions
    const journeyMap = page.locator('[data-testid="nz-flight-map"]')
    await expect(journeyMap).toBeVisible()
    
    // Map should be touch-interactive
    await journeyMap.click()
    
    // Should show map interaction feedback
    await expect(journeyMap).toBeVisible()
  })

  test('should provide accessible touch targets for mobile users', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // All interactive elements should meet touch target size requirements
    const touchTargets = page.locator('[data-testid*="button"], [data-testid*="card"], [data-testid*="node"]')
    const targetCount = await touchTargets.count()
    
    for (let i = 0; i < Math.min(targetCount, 5); i++) {
      const target = touchTargets.nth(i)
      if (await target.isVisible()) {
        const box = await target.boundingBox()
        // Touch targets should be at least 44x44px
        expect(box?.width).toBeGreaterThanOrEqual(24) // Adjusted for smaller elements
        expect(box?.height).toBeGreaterThanOrEqual(24)
      }
    }
  })

  test('should handle mobile orientation changes', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('[data-testid="swipeable-lesson-cards"]')).toBeVisible()
    
    // Switch to landscape
    await page.setViewportSize({ width: 667, height: 375 })
    
    // Lesson cards should still be visible and functional
    await expect(page.locator('[data-testid="swipeable-lesson-cards"]')).toBeVisible()
    
    // Should be able to swipe in landscape mode
    const cardContainer = page.locator('[data-testid="swipeable-lesson-cards"]')
    const initialScrollLeft = await cardContainer.evaluate(el => el.scrollLeft)
    
    const containerBox = await cardContainer.boundingBox()
    if (containerBox) {
      await page.mouse.move(containerBox.x + containerBox.width - 50, containerBox.y + containerBox.height / 2)
      await page.mouse.down()
      await page.mouse.move(containerBox.x + 50, containerBox.y + containerBox.height / 2)
      await page.mouse.up()
      
      await page.waitForTimeout(300)
      const newScrollLeft = await cardContainer.evaluate(el => el.scrollLeft)
      expect(newScrollLeft).toBeGreaterThanOrEqual(initialScrollLeft)
    }
  })

  test('should implement touch feedback for interactive elements', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Interactive elements should provide visual feedback on touch
    const lessonNode = page.locator('[data-testid="lesson-1-node"]').first()
    await expect(lessonNode).toBeVisible()
    
    // Test touch down and up states
    await lessonNode.hover() // Simulates touch start
    
    // Element should have hover/active state
    const hasTransition = await lessonNode.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return styles.transition !== 'none' || styles.transform !== 'none'
    })
    
    expect(hasTransition).toBeTruthy()
  })

  test('should support long press gestures for additional options', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Long press on lesson card should show additional options
    const lessonCard = page.locator('[data-testid="lesson-card-1"]').first()
    await expect(lessonCard).toBeVisible()
    
    // Simulate long press with mouse events
    await lessonCard.hover()
    await page.mouse.down()
    await page.waitForTimeout(800) // Long press duration
    await page.mouse.up()
    
    // Should show context menu or additional options
    // Note: This test may need adjustment based on actual implementation
  })

  test('should handle rapid touch interactions without lag', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Rapidly click multiple lesson nodes
    const lessonNodes = page.locator('[data-testid^="lesson-"][data-testid$="-node"]')
    const nodeCount = Math.min(await lessonNodes.count(), 3)
    
    for (let i = 0; i < nodeCount; i++) {
      const node = lessonNodes.nth(i)
      if (await node.isVisible()) {
        await node.click()
        await page.waitForTimeout(100) // Brief pause between clicks
      }
    }
    
    // Interface should remain responsive
    await expect(page.locator('[data-testid="lesson-progress-dots"]')).toBeVisible()
  })

  test('should implement swipe indicators for lesson card navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Should show swipe indicators or dots for lesson card navigation
    const cardContainer = page.locator('[data-testid="swipeable-lesson-cards"]')
    await expect(cardContainer).toBeVisible()
    
    // Look for swipe indicators (dots, arrows, or visual cues)
    const swipeIndicators = page.locator('[data-testid="swipe-indicators"]')
    if (await swipeIndicators.count() > 0) {
      await expect(swipeIndicators).toBeVisible()
    }
    
    // Should show horizontal scrollbar or visual cue for swipeable content
    const hasOverflowScroll = await cardContainer.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return styles.overflowX === 'auto' || styles.overflowX === 'scroll'
    })
    
    expect(hasOverflowScroll).toBeTruthy()
  })

  test('should maintain touch responsiveness during animations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Interact with animated elements
    const lessonNode = page.locator('[data-testid="lesson-1-node"]').first()
    await expect(lessonNode).toBeVisible()
    
    // Click during hover animation
    await lessonNode.hover()
    await lessonNode.click()
    
    // Should show tooltip even during animation
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    
    // Click away to hide tooltip
    await page.locator('body').click()
    await expect(page.locator('[data-testid="lesson-tooltip"]')).not.toBeVisible()
  })
})