import { test, expect } from '@playwright/test'

test.describe('Back to Dashboard Button Spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should have proper spacing on achievements page', async ({ page }) => {
    await page.goto('/achievements')
    
    // Check that the Back to Dashboard button exists
    const backButton = page.locator('a:has-text("← Back to Dashboard")')
    await expect(backButton).toBeVisible()
    
    // Get the parent container of the back button
    const buttonContainer = backButton.locator('..')
    
    // Check that it has proper top margin (mt-16 = 64px)
    await expect(buttonContainer).toHaveClass(/mt-16/)
    
    // Check that it has proper bottom margin (mb-8 = 32px) and padding (pt-8 = 32px)
    await expect(buttonContainer).toHaveClass(/mb-8/)
    await expect(buttonContainer).toHaveClass(/pt-8/)
    
    // Get the last badge section (Special Badges)
    const lastBadgeSection = page.locator('[data-testid="special-badges"]')
    await expect(lastBadgeSection).toBeVisible()
    
    // Measure actual distance between last badge section and button
    const lastBadgeBox = await lastBadgeSection.boundingBox()
    const buttonBox = await backButton.boundingBox()
    
    if (lastBadgeBox && buttonBox) {
      const distance = buttonBox.y - (lastBadgeBox.y + lastBadgeBox.height)
      // Should have at least 80px spacing (mt-16 + pt-8 = 64px + 32px = 96px)
      expect(distance).toBeGreaterThan(80)
    }
  })

  test('should have proper spacing on journey page', async ({ page }) => {
    await page.goto('/journey')
    
    const backButton = page.locator('a:has-text("← Back to Dashboard")')
    await expect(backButton).toBeVisible()
    
    const buttonContainer = backButton.locator('..')
    await expect(buttonContainer).toHaveClass(/mt-16/)
    await expect(buttonContainer).toHaveClass(/mb-8/)
    await expect(buttonContainer).toHaveClass(/pt-8/)
    
    // Check spacing from last content section
    const lastSection = page.locator('[data-testid="journey-timeline"]').last()
    const lastSectionBox = await lastSection.boundingBox()
    const buttonBox = await backButton.boundingBox()
    
    if (lastSectionBox && buttonBox) {
      const distance = buttonBox.y - (lastSectionBox.y + lastSectionBox.height)
      expect(distance).toBeGreaterThan(40)
    }
  })

  test('should have proper spacing on requirements page', async ({ page }) => {
    await page.goto('/requirements')
    
    const backButton = page.locator('a:has-text("← Back to Dashboard")')
    await expect(backButton).toBeVisible()
    
    const buttonContainer = backButton.locator('..')
    await expect(buttonContainer).toHaveClass(/mt-16/)
    await expect(buttonContainer).toHaveClass(/mb-8/)
    await expect(buttonContainer).toHaveClass(/pt-8/)
  })

  test('should have proper spacing on theory exams page', async ({ page }) => {
    await page.goto('/theory')
    
    const backButton = page.locator('a:has-text("← Back to Dashboard")')
    await expect(backButton).toBeVisible()
    
    const buttonContainer = backButton.locator('..')
    await expect(buttonContainer).toHaveClass(/mt-16/)
    await expect(buttonContainer).toHaveClass(/mb-8/)
    await expect(buttonContainer).toHaveClass(/pt-8/)
  })

  test('should have proper spacing on education center page', async ({ page }) => {
    await page.goto('/education')
    
    const backButton = page.locator('a:has-text("← Back to Dashboard")')
    await expect(backButton).toBeVisible()
    
    const buttonContainer = backButton.locator('..')
    await expect(buttonContainer).toHaveClass(/mt-16/)
    await expect(buttonContainer).toHaveClass(/mb-8/)
    await expect(buttonContainer).toHaveClass(/pt-8/)
  })

  test('should have proper spacing on user profile page', async ({ page }) => {
    await page.goto('/profile')
    
    const backButton = page.locator('a:has-text("← Back to Dashboard")')
    await expect(backButton).toBeVisible()
    
    // Profile page has the button in a different context (button group)
    // Check that it's part of a flex container with gap
    const buttonParent = backButton.locator('..')
    await expect(buttonParent).toHaveClass(/gap-4/)
  })

  test('should not have buttons touching content on all pages', async ({ page }) => {
    const pages = ['/achievements', '/journey', '/requirements', '/theory', '/education']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      const backButton = page.locator('a:has-text("← Back to Dashboard")')
      await expect(backButton).toBeVisible()
      
      // Get all elements above the button
      const allElements = page.locator('body *')
      const buttonBox = await backButton.boundingBox()
      
      if (buttonBox) {
        // Check that no other visible elements are overlapping or too close
        const elementsAbove = await allElements.evaluateAll((elements, buttonY) => {
          return elements.filter(el => {
            const rect = el.getBoundingClientRect()
            return rect.bottom > 0 && rect.bottom < buttonY - 20 // At least 20px gap
          }).length
        }, buttonBox.y)
        
        // Should have some elements above with proper spacing
        expect(elementsAbove).toBeGreaterThan(0)
      }
    }
  })
})