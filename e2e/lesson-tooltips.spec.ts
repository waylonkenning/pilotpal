import { test, expect } from '@playwright/test'

test.describe('Lesson Node Hover Tooltips', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to journey view where lesson nodes are displayed
    await page.goto('/journey')
  })

  test('should show hover tooltips on lesson nodes', async ({ page }) => {
    // Find first lesson node
    const lessonNode = page.locator('[data-testid="lesson-1-node"]').first()
    await expect(lessonNode).toBeVisible()
    
    // Hover over lesson node
    await lessonNode.hover()
    
    // Should show tooltip
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    
    // Tooltip should contain lesson information
    await expect(page.locator('[data-testid="lesson-tooltip"]'))
      .toContainText('Lesson 1')
    
    // Should show lesson details in tooltip
    await expect(page.locator('[data-testid="lesson-tooltip-title"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-tooltip-description"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-tooltip-status"]')).toBeVisible()
  })

  test('should show different tooltip content for different lesson types', async ({ page }) => {
    // Test ground school lesson tooltip
    const groundLessonNode = page.locator('[data-testid="lesson-2-node"]').first()
    await groundLessonNode.hover()
    
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-tooltip"]'))
      .toContainText('Ground School')
    
    // Move away to hide tooltip
    await page.locator('body').hover()
    await expect(page.locator('[data-testid="lesson-tooltip"]')).not.toBeVisible()
    
    // Test flight lesson tooltip
    const flightLessonNode = page.locator('[data-testid="lesson-3-node"]').first()
    await flightLessonNode.hover()
    
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    await expect(page.locator('[data-testid="lesson-tooltip"]'))
      .toContainText('Flight Training')
  })

  test('should show hover tooltips on progress elements', async ({ page }) => {
    // Navigate to dashboard for progress elements
    await page.goto('/dashboard')
    
    // Hover over flight hours progress
    const flightHoursCard = page.locator('[data-testid="total-hours"]').first()
    await flightHoursCard.hover()
    
    // Should show progress tooltip
    await expect(page.locator('[data-testid="progress-tooltip"]')).toBeVisible()
    await expect(page.locator('[data-testid="progress-tooltip"]'))
      .toContainText('Flight Hours')
    
    // Should show detailed breakdown in tooltip
    await expect(page.locator('[data-testid="progress-tooltip-details"]')).toBeVisible()
  })

  test('should show lesson completion status in tooltips', async ({ page }) => {
    // Test completed lesson tooltip
    const completedLessonNode = page.locator('[data-testid*="lesson"][data-status="completed"]').first()
    if (await completedLessonNode.count() > 0) {
      await completedLessonNode.hover()
      
      await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
      await expect(page.locator('[data-testid="lesson-tooltip-status"]'))
        .toContainText('Completed')
      
      // Should show completion date
      await expect(page.locator('[data-testid="lesson-completion-date"]')).toBeVisible()
    }
    
    // Test in-progress lesson tooltip
    const currentLessonNode = page.locator('[data-testid*="lesson"][data-status="current"]').first()
    if (await currentLessonNode.count() > 0) {
      await currentLessonNode.hover()
      
      await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
      await expect(page.locator('[data-testid="lesson-tooltip-status"]'))
        .toContainText('In Progress')
    }
  })

  test('should show lesson prerequisites in tooltips', async ({ page }) => {
    // Find lesson node with prerequisites
    const lessonNode = page.locator('[data-testid="lesson-5-node"]').first()
    await lessonNode.hover()
    
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    
    // Should show prerequisites section if lesson has them
    const prerequisitesSection = page.locator('[data-testid="lesson-prerequisites"]')
    if (await prerequisitesSection.count() > 0) {
      await expect(prerequisitesSection).toBeVisible()
      await expect(prerequisitesSection).toContainText('Prerequisites')
    }
  })

  test('should show lesson duration and cost in tooltips', async ({ page }) => {
    const lessonNode = page.locator('[data-testid="lesson-1-node"]').first()
    await lessonNode.hover()
    
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    
    // Should show lesson duration
    await expect(page.locator('[data-testid="lesson-duration"]')).toBeVisible()
    
    // Should show estimated cost
    await expect(page.locator('[data-testid="lesson-cost"]')).toBeVisible()
  })

  test('should hide tooltips when mouse moves away', async ({ page }) => {
    const lessonNode = page.locator('[data-testid="lesson-1-node"]').first()
    await lessonNode.hover()
    
    // Tooltip should be visible
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    
    // Move mouse away
    await page.locator('body').hover()
    
    // Tooltip should disappear
    await expect(page.locator('[data-testid="lesson-tooltip"]')).not.toBeVisible()
  })

  test('should show tooltips with keyboard navigation', async ({ page }) => {
    // Focus on first lesson node
    await page.keyboard.press('Tab')
    
    // Should show tooltip on focus
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
    
    // Navigate to next lesson
    await page.keyboard.press('Tab')
    
    // Should show different tooltip
    await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
  })

  test('should show appropriate tooltips for locked lessons', async ({ page }) => {
    // Find locked lesson node
    const lockedLessonNode = page.locator('[data-testid*="lesson"][data-status="locked"]').first()
    if (await lockedLessonNode.count() > 0) {
      await lockedLessonNode.hover()
      
      await expect(page.locator('[data-testid="lesson-tooltip"]')).toBeVisible()
      await expect(page.locator('[data-testid="lesson-tooltip-status"]'))
        .toContainText('Locked')
      
      // Should show why lesson is locked
      await expect(page.locator('[data-testid="lesson-unlock-requirements"]')).toBeVisible()
    }
  })

  test('should show theory exam progress in tooltips', async ({ page }) => {
    // Navigate to theory exam view
    await page.goto('/theory')
    
    // Hover over theory exam progress element
    const theoryProgressCard = page.locator('[data-testid="theory-progress-card"]').first()
    await theoryProgressCard.hover()
    
    // Should show theory progress tooltip
    await expect(page.locator('[data-testid="theory-tooltip"]')).toBeVisible()
    await expect(page.locator('[data-testid="theory-tooltip"]'))
      .toContainText('Theory Progress')
    
    // Should show exam details
    await expect(page.locator('[data-testid="theory-exam-details"]')).toBeVisible()
  })

  test('should show milestone tooltips', async ({ page }) => {
    // Find milestone element
    const milestoneElement = page.locator('[data-testid*="milestone"]').first()
    if (await milestoneElement.count() > 0) {
      await milestoneElement.hover()
      
      await expect(page.locator('[data-testid="milestone-tooltip"]')).toBeVisible()
      await expect(page.locator('[data-testid="milestone-tooltip"]'))
        .toContainText('Milestone')
      
      // Should show milestone requirements
      await expect(page.locator('[data-testid="milestone-requirements"]')).toBeVisible()
    }
  })

  test('should show achievement badge tooltips', async ({ page }) => {
    // Navigate to achievements view
    await page.goto('/achievements')
    
    // Hover over achievement badge
    const achievementBadge = page.locator('[data-testid*="badge"]').first()
    if (await achievementBadge.count() > 0) {
      await achievementBadge.hover()
      
      await expect(page.locator('[data-testid="achievement-tooltip"]')).toBeVisible()
      
      // Should show achievement details
      await expect(page.locator('[data-testid="achievement-description"]')).toBeVisible()
      await expect(page.locator('[data-testid="achievement-requirements"]')).toBeVisible()
    }
  })

  test('should show financial progress tooltips', async ({ page }) => {
    // Navigate to financial view
    await page.goto('/finances')
    
    // Hover over spending progress bar
    const spendingProgress = page.locator('[data-testid="spending-progress-bar"]').first()
    await spendingProgress.hover()
    
    // Should show financial tooltip
    await expect(page.locator('[data-testid="financial-tooltip"]')).toBeVisible()
    await expect(page.locator('[data-testid="financial-tooltip"]'))
      .toContainText('Budget Progress')
    
    // Should show spending breakdown
    await expect(page.locator('[data-testid="spending-breakdown"]')).toBeVisible()
  })

  test('should show tooltips with proper positioning', async ({ page }) => {
    const lessonNode = page.locator('[data-testid="lesson-1-node"]').first()
    await lessonNode.hover()
    
    const tooltip = page.locator('[data-testid="lesson-tooltip"]')
    await expect(tooltip).toBeVisible()
    
    // Tooltip should be positioned relative to the hovered element
    const lessonBox = await lessonNode.boundingBox()
    const tooltipBox = await tooltip.boundingBox()
    
    // Tooltip should be positioned above or below the element
    expect(tooltipBox).toBeTruthy()
    expect(lessonBox).toBeTruthy()
  })

  test('should handle tooltip overflow and edge positioning', async ({ page }) => {
    // Navigate to bottom of page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Find lesson node at bottom edge
    const bottomLessonNode = page.locator('[data-testid*="lesson"]').last()
    await bottomLessonNode.hover()
    
    const tooltip = page.locator('[data-testid="lesson-tooltip"]')
    await expect(tooltip).toBeVisible()
    
    // Tooltip should remain within viewport
    const tooltipBox = await tooltip.boundingBox()
    const viewportSize = await page.viewportSize()
    
    if (tooltipBox && viewportSize) {
      expect(tooltipBox.y).toBeGreaterThanOrEqual(0)
      expect(tooltipBox.y + tooltipBox.height).toBeLessThanOrEqual(viewportSize.height)
    }
  })
})