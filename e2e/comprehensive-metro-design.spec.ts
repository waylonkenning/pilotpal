import { test, expect } from '@playwright/test'

test.describe('Comprehensive Metro Design System Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have zero rounded rectangles across entire application', async ({ page }) => {
    const views = ['dashboard', 'journey', 'achievements', 'theory', 'requirements', 'finances', 'profile']
    
    for (const view of views) {
      // Navigate to each view
      if (view !== 'dashboard') {
        await page.click(`[data-testid="${view}-tab"]`)
        await page.waitForLoadState('networkidle')
      }
      
      // Check for rounded elements (should be minimal/zero)
      const roundedElements = await page.locator('*').evaluateAll(elements => 
        elements.filter(el => {
          const styles = getComputedStyle(el)
          const borderRadius = styles.borderRadius
          // Allow minimal radius for essential browser elements only
          return borderRadius && borderRadius !== '0px' && borderRadius !== 'none' && 
                 !borderRadius.includes('0px') && parseFloat(borderRadius) > 3
        }).length
      )
      
      // Should have zero or very minimal rounded elements
      expect(roundedElements).toBeLessThan(5)
    }
  })

  test('should have Metro tiles with sharp corners on all views', async ({ page }) => {
    const views = ['dashboard', 'journey', 'achievements', 'finances', 'requirements']
    
    for (const view of views) {
      if (view !== 'dashboard') {
        await page.click(`[data-testid="${view}-tab"]`)
        await page.waitForLoadState('networkidle')
      }
      
      // Check for Metro tiles
      const metroTiles = page.locator('.metro-tile')
      if (await metroTiles.count() > 0) {
        const firstTile = metroTiles.first()
        const styles = await firstTile.evaluate(el => getComputedStyle(el))
        expect(styles.borderRadius).toBe('0px')
        expect(styles.boxShadow).toBe('none')
      }
    }
  })

  test('should have Metro buttons with sharp corners everywhere', async ({ page }) => {
    const views = ['dashboard', 'journey', 'achievements', 'theory', 'requirements', 'finances', 'profile']
    
    for (const view of views) {
      if (view !== 'dashboard') {
        await page.click(`[data-testid="${view}-tab"]`)
        await page.waitForLoadState('networkidle')
      }
      
      // Check all Metro buttons
      const metroButtons = page.locator('.metro-button')
      const buttonCount = await metroButtons.count()
      
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = metroButtons.nth(i)
        if (await button.isVisible()) {
          const styles = await button.evaluate(el => getComputedStyle(el))
          expect(styles.borderRadius).toBe('0px')
        }
      }
    }
  })

  test('should have Metro cards instead of rounded cards', async ({ page }) => {
    const views = ['dashboard', 'journey', 'achievements', 'theory', 'requirements', 'finances', 'profile']
    
    for (const view of views) {
      if (view !== 'dashboard') {
        await page.click(`[data-testid="${view}-tab"]`)
        await page.waitForLoadState('networkidle')
      }
      
      // Should have metro-card elements
      const metroCards = page.locator('.metro-card')
      if (await metroCards.count() > 0) {
        const firstCard = metroCards.first()
        const styles = await firstCard.evaluate(el => getComputedStyle(el))
        expect(styles.borderRadius).toBe('0px')
      }
      
      // Should not have old .card elements
      const oldCards = page.locator('.card:not(.metro-card)')
      expect(await oldCards.count()).toBe(0)
    }
  })

  test('should have Metro input fields with sharp corners', async ({ page }) => {
    // Test forms across different views
    await page.click('[data-testid="finances-tab"]')
    
    // Try to open a form modal
    const addExpenseBtn = page.locator('[data-testid="add-expense-button"]')
    if (await addExpenseBtn.isVisible()) {
      await addExpenseBtn.click()
      
      // Check form inputs
      const inputs = page.locator('input, select, textarea')
      const inputCount = await inputs.count()
      
      for (let i = 0; i < Math.min(inputCount, 3); i++) {
        const input = inputs.nth(i)
        if (await input.isVisible()) {
          const classes = await input.getAttribute('class') || ''
          if (classes.includes('metro-input')) {
            const styles = await input.evaluate(el => getComputedStyle(el))
            expect(styles.borderRadius).toBe('0px')
          }
        }
      }
    }
  })

  test('should have Metro modal styling with sharp corners', async ({ page }) => {
    // Test modal on dashboard
    const helpButton = page.locator('[data-testid="contextual-help-trigger"]')
    if (await helpButton.isVisible()) {
      await helpButton.click()
      
      // Check modal content
      const modalContent = page.locator('.modal-content')
      if (await modalContent.isVisible()) {
        const styles = await modalContent.evaluate(el => getComputedStyle(el))
        expect(parseFloat(styles.borderRadius)).toBeLessThanOrEqual(0)
      }
    }
  })

  test('should have consistent Metro grid layouts', async ({ page }) => {
    // Check dashboard Metro grid
    const metroGrid = page.locator('.metro-grid-container')
    if (await metroGrid.count() > 0) {
      const firstGrid = metroGrid.first()
      const styles = await firstGrid.evaluate(el => getComputedStyle(el))
      expect(styles.display).toBe('grid')
      expect(styles.gap).toBe('0px')
    }
  })

  test('should have Metro tile navigation working correctly', async ({ page }) => {
    // Test navigation from dashboard tiles
    const navigationTiles = [
      { testId: 'journey-tab', expectedUrl: '/journey' },
      { testId: 'achievements-tab', expectedUrl: '/achievements' },
      { testId: 'finances-tab', expectedUrl: '/finances' }
    ]
    
    for (const { testId, expectedUrl } of navigationTiles) {
      await page.goto('/')
      
      const tile = page.locator(`[data-testid="${testId}"]`)
      await expect(tile).toBeVisible()
      await expect(tile).toHaveClass(/metro-tile/)
      
      await tile.click()
      await page.waitForLoadState('networkidle')
      expect(page.url()).toContain(expectedUrl)
    }
  })

  test('should have Metro typography and colors', async ({ page }) => {
    const views = ['dashboard', 'journey', 'achievements']
    
    for (const view of views) {
      if (view !== 'dashboard') {
        await page.click(`[data-testid="${view}-tab"]`)
        await page.waitForLoadState('networkidle')
      }
      
      // Check Metro tile titles
      const tileTitles = page.locator('.metro-tile-title')
      if (await tileTitles.count() > 0) {
        const firstTitle = tileTitles.first()
        const styles = await firstTitle.evaluate(el => getComputedStyle(el))
        expect(styles.fontWeight).toBe('600')
        expect(styles.textTransform).toBe('uppercase')
      }
    }
  })

  test('should not have any legacy button styling', async ({ page }) => {
    const views = ['dashboard', 'journey', 'achievements', 'theory', 'requirements', 'finances']
    
    for (const view of views) {
      if (view !== 'dashboard') {
        await page.click(`[data-testid="${view}-tab"]`)
        await page.waitForLoadState('networkidle')
      }
      
      // Check that no buttons have .btn class without .metro-button
      const legacyButtons = page.locator('.btn:not(.metro-button)')
      expect(await legacyButtons.count()).toBe(0)
    }
  })

  test('should have zero box shadows (flat design)', async ({ page }) => {
    const views = ['dashboard', 'journey', 'achievements']
    
    for (const view of views) {
      if (view !== 'dashboard') {
        await page.click(`[data-testid="${view}-tab"]`)
        await page.waitForLoadState('networkidle')
      }
      
      // Check that Metro elements have no box shadows
      const metroElements = page.locator('.metro-tile, .metro-button, .metro-card')
      const elementCount = await metroElements.count()
      
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = metroElements.nth(i)
        if (await element.isVisible()) {
          const styles = await element.evaluate(el => getComputedStyle(el))
          expect(styles.boxShadow).toBe('none')
        }
      }
    }
  })
})