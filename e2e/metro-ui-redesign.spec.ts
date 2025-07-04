import { test, expect } from '@playwright/test'

test.describe('Metro/Windows Phone Style UI Redesign', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display Metro-style flat tiles with sharp corners', async ({ page }) => {
    // Navigate to dashboard to see Metro tiles
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check that cards have been replaced with flat Metro tiles
    const tiles = page.locator('[data-testid="metro-tile"]')
    await expect(tiles.first()).toBeVisible()
    
    // Verify tiles have sharp corners (no border-radius)
    const tileStyles = await tiles.first().evaluate(el => getComputedStyle(el))
    expect(tileStyles.borderRadius).toBe('0px')
    
    // Verify tiles have flat appearance (no box-shadow)
    expect(tileStyles.boxShadow).toBe('none')
  })

  test('should implement aviation-themed color palette', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check for aviation-themed colors on tiles
    const progressTile = page.locator('[data-testid="metro-tile-progress"]')
    await expect(progressTile).toBeVisible()
    
    const achievementTile = page.locator('[data-testid="metro-tile-achievements"]')
    await expect(achievementTile).toBeVisible()
    
    const financialTile = page.locator('[data-testid="metro-tile-financial"]')
    await expect(financialTile).toBeVisible()
    
    // Verify different tile colors for different categories
    const progressColor = await progressTile.evaluate(el => getComputedStyle(el).backgroundColor)
    const achievementColor = await achievementTile.evaluate(el => getComputedStyle(el).backgroundColor)
    const financialColor = await financialTile.evaluate(el => getComputedStyle(el).backgroundColor)
    
    // Colors should be different for different tile types
    expect(progressColor).not.toBe(achievementColor)
    expect(achievementColor).not.toBe(financialColor)
  })

  test('should display grid-based tile layout system', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check for different tile sizes in grid system
    const smallTile = page.locator('[data-testid="metro-tile-1x1"]')
    const mediumTile = page.locator('[data-testid="metro-tile-2x1"]')
    const largeTile = page.locator('[data-testid="metro-tile-2x2"]')
    
    await expect(smallTile).toBeVisible()
    await expect(mediumTile).toBeVisible()
    await expect(largeTile).toBeVisible()
    
    // Verify grid layout with CSS Grid
    const gridContainer = page.locator('[data-testid="metro-grid-container"]')
    const gridStyles = await gridContainer.evaluate(el => getComputedStyle(el))
    expect(gridStyles.display).toBe('grid')
  })

  test('should use bold sans-serif Metro typography', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check Metro-style typography on tiles
    const tileTitle = page.locator('[data-testid="metro-tile-title"]').first()
    await expect(tileTitle).toBeVisible()
    
    const titleStyles = await tileTitle.evaluate(el => getComputedStyle(el))
    
    // Verify bold font weight
    expect(parseInt(titleStyles.fontWeight)).toBeGreaterThanOrEqual(600)
    
    // Verify sans-serif font family
    expect(titleStyles.fontFamily).toContain('sans-serif')
  })

  test('should have no rounded corners on interactive elements', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check buttons have sharp corners
    const metroButton = page.locator('[data-testid="metro-button"]').first()
    if (await metroButton.isVisible()) {
      const buttonStyles = await metroButton.evaluate(el => getComputedStyle(el))
      expect(buttonStyles.borderRadius).toBe('0px')
    }
    
    // Check input fields have sharp corners
    const metroInput = page.locator('[data-testid="metro-input"]').first()
    if (await metroInput.isVisible()) {
      const inputStyles = await metroInput.evaluate(el => getComputedStyle(el))
      expect(inputStyles.borderRadius).toBe('0px')
    }
  })

  test('should maintain Metro design in Journey view', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Verify training phase tiles are Metro-styled
    const phaseContainer = page.locator('[data-testid="metro-training-phases"]')
    await expect(phaseContainer).toBeVisible()
    
    const phaseTile = page.locator('[data-testid="metro-phase-tile"]').first()
    await expect(phaseTile).toBeVisible()
    
    const tileStyles = await phaseTile.evaluate(el => getComputedStyle(el))
    expect(tileStyles.borderRadius).toBe('0px')
    expect(tileStyles.boxShadow).toBe('none')
  })

  test('should apply Metro styling to aviation map card', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Check that aviation map container is Metro-styled
    const mapContainer = page.locator('[data-testid="nz-aviation-map"]')
    await expect(mapContainer).toBeVisible()
    
    const containerStyles = await mapContainer.evaluate(el => getComputedStyle(el))
    expect(containerStyles.borderRadius).toBe('0px')
    
    // Verify map legend is also Metro-styled
    const mapLegend = page.locator('[data-testid="map-legend"]')
    await expect(mapLegend).toBeVisible()
    
    const legendStyles = await mapLegend.evaluate(el => getComputedStyle(el))
    expect(legendStyles.borderRadius).toBe('0px')
  })

  test('should have Metro-styled achievements in Achievements view', async ({ page }) => {
    await page.click('[data-testid="achievements-tab"]')
    
    // Check achievement badges are Metro-styled
    const achievementBadge = page.locator('[data-testid="metro-achievement-badge"]').first()
    await expect(achievementBadge).toBeVisible()
    
    const badgeStyles = await achievementBadge.evaluate(el => getComputedStyle(el))
    expect(badgeStyles.borderRadius).toBe('0px')
  })

  test('should display Metro-styled financial tiles', async ({ page }) => {
    await page.click('[data-testid="financial-tab"]')
    
    // Verify financial summary tiles are Metro-styled
    const financialTile = page.locator('[data-testid="metro-financial-tile"]').first()
    await expect(financialTile).toBeVisible()
    
    const tileStyles = await financialTile.evaluate(el => getComputedStyle(el))
    expect(tileStyles.borderRadius).toBe('0px')
    expect(tileStyles.boxShadow).toBe('none')
  })

  test('should maintain Metro design consistency across all views', async ({ page }) => {
    const tabs = ['dashboard-tab', 'journey-tab', 'achievements-tab', 'financial-tab', 'requirements-tab']
    
    for (const tab of tabs) {
      await page.click(`[data-testid="${tab}"]`)
      
      // Check that main content area maintains Metro styling
      const mainContent = page.locator('[data-testid="main-content"]')
      if (await mainContent.isVisible()) {
        const contentStyles = await mainContent.evaluate(el => getComputedStyle(el))
        // Main content should not have rounded corners
        expect(contentStyles.borderRadius).toBe('0px')
      }
      
      // Verify no elements have box shadows
      const elementsWithShadow = await page.locator('*').evaluateAll(elements => 
        elements.filter(el => {
          const styles = getComputedStyle(el)
          return styles.boxShadow !== 'none' && styles.boxShadow !== ''
        }).length
      )
      
      // Allow minimal shadows for essential elements like modals/dropdowns
      expect(elementsWithShadow).toBeLessThan(5)
    }
  })

  test('should display full-width edge-to-edge Metro grid layout', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check that Metro grid container fills complete width
    const gridContainer = page.locator('[data-testid="metro-grid-container"]')
    await expect(gridContainer).toBeVisible()
    
    // Verify grid container spans full viewport width (no side margins)
    const gridBounds = await gridContainer.boundingBox()
    const viewportSize = await page.viewportSize()
    
    if (gridBounds && viewportSize) {
      // Grid should start at x=0 (no left margin)
      expect(gridBounds.x).toBeLessThan(10) // Allow small tolerance for borders
      
      // Grid should extend close to viewport width (no right margin)
      expect(gridBounds.width).toBeGreaterThan(viewportSize.width * 0.95)
    }
  })

  test('should have edge-to-edge layout on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check Metro grid fills mobile width completely
    const gridContainer = page.locator('[data-testid="metro-grid-container"]')
    await expect(gridContainer).toBeVisible()
    
    const gridBounds = await gridContainer.boundingBox()
    const viewportSize = await page.viewportSize()
    
    if (gridBounds && viewportSize) {
      // On mobile, grid should be completely edge-to-edge
      expect(gridBounds.x).toBeLessThan(5)
      expect(gridBounds.width).toBeGreaterThan(viewportSize.width * 0.98)
    }
  })

  test('should maintain full-width layout across different screen sizes', async ({ page }) => {
    const screenSizes = [
      { width: 320, height: 568 },  // iPhone SE
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // iPad Landscape
      { width: 1920, height: 1080 } // Desktop
    ]
    
    for (const size of screenSizes) {
      await page.setViewportSize(size)
      await page.click('[data-testid="dashboard-tab"]')
      
      const gridContainer = page.locator('[data-testid="metro-grid-container"]')
      const gridBounds = await gridContainer.boundingBox()
      
      if (gridBounds) {
        // Grid should always start near edge (x close to 0)
        expect(gridBounds.x).toBeLessThan(10)
        
        // Grid should fill most of the width
        expect(gridBounds.width).toBeGreaterThan(size.width * 0.95)
      }
    }
  })

  test('should have high contrast Metro color scheme', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check for high contrast between tile backgrounds and text
    const tiles = page.locator('[data-testid="metro-tile"]')
    const firstTile = tiles.first()
    await expect(firstTile).toBeVisible()
    
    const tileBackground = await firstTile.evaluate(el => getComputedStyle(el).backgroundColor)
    const tileText = page.locator('[data-testid="metro-tile-title"]').first()
    const textColor = await tileText.evaluate(el => getComputedStyle(el).color)
    
    // Background and text should have sufficient contrast
    expect(tileBackground).not.toBe(textColor)
  })

  test('should support tile interactions with Metro feedback', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Test tile hover/click states
    const interactiveTile = page.locator('[data-testid="metro-tile-interactive"]').first()
    await expect(interactiveTile).toBeVisible()
    
    // Hover should provide visual feedback
    await interactiveTile.hover()
    
    // Click should work without rounded corners affecting interaction
    await interactiveTile.click()
    
    // Verify interaction was successful (depends on tile function)
    // This will be implemented based on actual tile functionality
  })
})