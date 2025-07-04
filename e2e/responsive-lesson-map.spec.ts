import { test, expect } from '@playwright/test'

test.describe('Responsive Lesson Map', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/journey')
  })

  test.describe('Mobile View (375px width)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
    })

    test('should display lesson map with 3-column grid on mobile', async ({ page }) => {
      const lessonMap = page.getByTestId('lesson-map')
      await expect(lessonMap).toBeVisible()
      
      // Check that lesson nodes are arranged in 3 columns
      const firstRowNodes = [
        page.getByTestId('lesson-1-node'),
        page.getByTestId('lesson-2-node'),
        page.getByTestId('lesson-3-node')
      ]
      
      for (const node of firstRowNodes) {
        await expect(node).toBeVisible()
      }

      // Verify nodes are properly spaced for 3-column layout
      const node1 = await page.getByTestId('lesson-1-node').boundingBox()
      const node2 = await page.getByTestId('lesson-2-node').boundingBox()
      const node3 = await page.getByTestId('lesson-3-node').boundingBox()
      
      expect(node1?.x).toBeLessThan(node2?.x || 0)
      expect(node2?.x).toBeLessThan(node3?.x || 0)
    })

    test('should have minimum 44px touch targets', async ({ page }) => {
      const lessonNode = page.getByTestId('lesson-1-node')
      await expect(lessonNode).toBeVisible()
      
      const boundingBox = await lessonNode.boundingBox()
      expect(boundingBox?.width).toBeGreaterThanOrEqual(44)
      expect(boundingBox?.height).toBeGreaterThanOrEqual(44)
    })

    test('should display responsive connection lines', async ({ page }) => {
      const connectionLines = page.getByTestId('lesson-connection-lines')
      await expect(connectionLines).toBeVisible()
      
      // Check that connection lines adapt to mobile layout
      const line1 = page.getByTestId('lesson-connection-line-1')
      await expect(line1).toBeVisible()
    })

    test('should show lesson details in modal on mobile tap', async ({ page }) => {
      const lessonNode = page.getByTestId('lesson-1-node')
      await lessonNode.tap()
      
      const modal = page.getByTestId('lesson-details-modal')
      await expect(modal).toBeVisible()
      
      // Check modal content
      await expect(modal.getByText('Lesson 1')).toBeVisible()
      await expect(modal.getByText('Close')).toBeVisible()
    })

    test('should position tooltips within viewport', async ({ page }) => {
      const lessonNode = page.getByTestId('lesson-1-node')
      await lessonNode.hover()
      
      const tooltip = page.getByTestId('lesson-tooltip')
      await expect(tooltip).toBeVisible()
      
      const tooltipBox = await tooltip.boundingBox()
      const viewportWidth = page.viewportSize()?.width || 0
      
      // Tooltip should not extend beyond viewport
      expect((tooltipBox?.x || 0) + (tooltipBox?.width || 0)).toBeLessThanOrEqual(viewportWidth)
    })

    test('should display phase grouping indicators', async ({ page }) => {
      const phaseIndicators = page.getByTestId('lesson-phase-indicators')
      await expect(phaseIndicators).toBeVisible()
      
      // Check that phase separators are visible
      const foundationPhase = page.getByTestId('foundation-phase-indicator')
      await expect(foundationPhase).toBeVisible()
    })
  })

  test.describe('Tablet View (768px width)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
    })

    test('should display lesson map with 6-column grid on tablet', async ({ page }) => {
      const lessonMap = page.getByTestId('lesson-map')
      await expect(lessonMap).toBeVisible()
      
      // Check that lesson nodes are arranged in 6 columns
      const firstRowNodes = []
      for (let i = 1; i <= 6; i++) {
        firstRowNodes.push(page.getByTestId(`lesson-${i}-node`))
      }
      
      for (const node of firstRowNodes) {
        await expect(node).toBeVisible()
      }
    })

    test('should maintain touch-friendly targets on tablet', async ({ page }) => {
      const lessonNode = page.getByTestId('lesson-1-node')
      const boundingBox = await lessonNode.boundingBox()
      expect(boundingBox?.width).toBeGreaterThanOrEqual(44)
      expect(boundingBox?.height).toBeGreaterThanOrEqual(44)
    })
  })

  test.describe('Desktop View (1024px+ width)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 })
    })

    test('should display lesson map with 9-column grid on desktop', async ({ page }) => {
      const lessonMap = page.getByTestId('lesson-map')
      await expect(lessonMap).toBeVisible()
      
      // Check that lesson nodes are arranged in 9 columns
      const firstRowNodes = []
      for (let i = 1; i <= 9; i++) {
        firstRowNodes.push(page.getByTestId(`lesson-${i}-node`))
      }
      
      for (const node of firstRowNodes) {
        await expect(node).toBeVisible()
      }
    })

    test('should show hover tooltips on desktop', async ({ page }) => {
      const lessonNode = page.getByTestId('lesson-1-node')
      await lessonNode.hover()
      
      const tooltip = page.getByTestId('lesson-tooltip')
      await expect(tooltip).toBeVisible()
      
      await lessonNode.blur()
      await expect(tooltip).not.toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should support keyboard navigation', async ({ page }) => {
      // Focus first lesson node
      await page.keyboard.press('Tab')
      const firstNode = page.getByTestId('lesson-1-node')
      await expect(firstNode).toBeFocused()
      
      // Navigate to next lesson
      await page.keyboard.press('ArrowRight')
      const secondNode = page.getByTestId('lesson-2-node')
      await expect(secondNode).toBeFocused()
      
      // Show details with Enter
      await page.keyboard.press('Enter')
      const tooltip = page.getByTestId('lesson-tooltip')
      await expect(tooltip).toBeVisible()
    })

    test('should have proper ARIA labels', async ({ page }) => {
      const lessonNode = page.getByTestId('lesson-1-node')
      const ariaLabel = await lessonNode.getAttribute('aria-label')
      expect(ariaLabel).toContain('Lesson 1')
    })

    test('should support screen reader announcements', async ({ page }) => {
      const lessonMap = page.getByTestId('lesson-map')
      const role = await lessonMap.getAttribute('role')
      expect(role).toBe('region')
      
      const ariaLabel = await lessonMap.getAttribute('aria-label')
      expect(ariaLabel).toContain('Lesson completion map')
    })
  })

  test.describe('Performance', () => {
    test('should render all 27 lessons efficiently', async ({ page }) => {
      const startTime = Date.now()
      
      const lessonMap = page.getByTestId('lesson-map')
      await expect(lessonMap).toBeVisible()
      
      // Check that all 27 lessons are rendered
      for (let i = 1; i <= 27; i++) {
        const node = page.getByTestId(`lesson-${i}-node`)
        await expect(node).toBeVisible()
      }
      
      const endTime = Date.now()
      const renderTime = endTime - startTime
      
      // Should render within reasonable time (less than 2 seconds)
      expect(renderTime).toBeLessThan(2000)
    })

    test('should handle rapid viewport changes', async ({ page }) => {
      const lessonMap = page.getByTestId('lesson-map')
      
      // Rapidly change viewport sizes
      await page.setViewportSize({ width: 375, height: 667 })
      await expect(lessonMap).toBeVisible()
      
      await page.setViewportSize({ width: 768, height: 1024 })
      await expect(lessonMap).toBeVisible()
      
      await page.setViewportSize({ width: 1024, height: 768 })
      await expect(lessonMap).toBeVisible()
    })
  })

  test.describe('Visual Distinction from Timeline', () => {
    test('should be visually distinct from training phase timeline', async ({ page }) => {
      const timeline = page.getByTestId('journey-timeline')
      const lessonMap = page.getByTestId('lesson-map')
      
      await expect(timeline).toBeVisible()
      await expect(lessonMap).toBeVisible()
      
      // Timeline should have phase icons
      const phaseIcon = page.getByTestId('foundation-phase-icon')
      await expect(phaseIcon).toBeVisible()
      
      // Lesson map should have lesson nodes
      const lessonNode = page.getByTestId('lesson-1-node')
      await expect(lessonNode).toBeVisible()
      
      // Different visual styling
      const timelineStyle = await timeline.getAttribute('class')
      const lessonMapStyle = await lessonMap.getAttribute('class')
      expect(timelineStyle).not.toEqual(lessonMapStyle)
    })
  })
})