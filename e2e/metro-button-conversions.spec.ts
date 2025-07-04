import { test, expect } from '@playwright/test'

test.describe('Metro Button Conversions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should convert DashboardView buttons to Metro style', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check complete lesson button is Metro styled
    const completeLessonBtn = page.locator('[data-testid="complete-lesson-button"]')
    await expect(completeLessonBtn).toBeVisible()
    await expect(completeLessonBtn).toHaveClass(/metro-button/)
    
    // Verify button has sharp corners (no border-radius)
    const btnStyles = await completeLessonBtn.evaluate(el => getComputedStyle(el))
    expect(btnStyles.borderRadius).toBe('0px')
    
    // Check lesson info button is Metro styled
    const lessonInfoBtn = page.locator('[data-testid="lesson-info-button"]')
    await expect(lessonInfoBtn).toBeVisible()
    await expect(lessonInfoBtn).toHaveClass(/metro-button/)
    
    // Verify no box shadows on Metro buttons
    expect(btnStyles.boxShadow).toBe('none')
  })

  test('should convert DashboardView form inputs to Metro style', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Trigger complete lesson modal to see form inputs
    await page.click('[data-testid="complete-lesson-button"]')
    
    // Check lesson hours input is Metro styled
    const hoursInput = page.locator('[data-testid="lesson-hours-input"]')
    if (await hoursInput.isVisible()) {
      await expect(hoursInput).toHaveClass(/metro-input/)
      
      const inputStyles = await hoursInput.evaluate(el => getComputedStyle(el))
      expect(inputStyles.borderRadius).toBe('0px')
    }
    
    // Check lesson cost input is Metro styled
    const costInput = page.locator('[data-testid="lesson-cost-input"]')
    if (await costInput.isVisible()) {
      await expect(costInput).toHaveClass(/metro-input/)
    }
    
    // Check lesson notes textarea is Metro styled
    const notesInput = page.locator('[data-testid="lesson-notes-input"]')
    if (await notesInput.isVisible()) {
      await expect(notesInput).toHaveClass(/metro-input/)
    }
  })

  test('should remove rounded corners from DashboardView containers', async ({ page }) => {
    await page.click('[data-testid="dashboard-tab"]')
    
    // Check Today's Focus container has sharp corners
    const todaysFocus = page.locator('[data-testid="todays-focus"]')
    await expect(todaysFocus).toBeVisible()
    
    const containerStyles = await todaysFocus.evaluate(el => getComputedStyle(el))
    expect(containerStyles.borderRadius).toBe('0px')
    
    // Check current lesson container has sharp corners
    const currentLesson = page.locator('[data-testid="current-lesson"]')
    await expect(currentLesson).toBeVisible()
    
    const lessonStyles = await currentLesson.evaluate(el => getComputedStyle(el))
    expect(lessonStyles.borderRadius).toBe('0px')
  })

  test('should convert JourneyView cards to Metro style', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Check journey timeline card
    const timelineCard = page.locator('[data-testid="journey-timeline"]')
    await expect(timelineCard).toBeVisible()
    await expect(timelineCard).toHaveClass(/metro-card/)
    
    const cardStyles = await timelineCard.evaluate(el => getComputedStyle(el))
    expect(cardStyles.borderRadius).toBe('0px')
    expect(cardStyles.boxShadow).toBe('none')
    
    // Check flight hours wheel card
    const hoursCard = page.locator('[data-testid="flight-hours-wheel"]').locator('..')
    if (await hoursCard.isVisible()) {
      await expect(hoursCard).toHaveClass(/metro-card/)
    }
  })

  test('should convert JourneyView buttons to Metro style', async ({ page }) => {
    await page.click('[data-testid="journey-tab"]')
    
    // Check hours guide button
    const hoursGuideBtn = page.locator('[data-testid="flight-hours-education-button"]')
    await expect(hoursGuideBtn).toBeVisible()
    await expect(hoursGuideBtn).toHaveClass(/metro-button/)
    
    const btnStyles = await hoursGuideBtn.evaluate(el => getComputedStyle(el))
    expect(btnStyles.borderRadius).toBe('0px')
  })

  test('should convert AchievementsView cards and buttons to Metro style', async ({ page }) => {
    await page.click('[data-testid="achievements-tab"]')
    
    // Check achievement stats card
    const statsCard = page.locator('[data-testid="achievement-stats"]')
    if (await statsCard.isVisible()) {
      await expect(statsCard).toHaveClass(/metro-card/)
      
      const cardStyles = await statsCard.evaluate(el => getComputedStyle(el))
      expect(cardStyles.borderRadius).toBe('0px')
    }
    
    // Check Back to Dashboard button
    const backBtn = page.locator('[data-testid="back-to-dashboard"]')
    if (await backBtn.isVisible()) {
      await expect(backBtn).toHaveClass(/metro-button/)
    }
  })

  test('should convert FinancialView elements to Metro style', async ({ page }) => {
    await page.click('[data-testid="financial-tab"]')
    
    // Check financial overview cards
    const overviewCards = page.locator('[data-testid*="financial-overview"]')
    const firstCard = overviewCards.first()
    if (await firstCard.isVisible()) {
      await expect(firstCard).toHaveClass(/metro-card/)
      
      const cardStyles = await firstCard.evaluate(el => getComputedStyle(el))
      expect(cardStyles.borderRadius).toBe('0px')
    }
    
    // Check add expense button
    const addBtn = page.locator('[data-testid="add-expense-button"]')
    if (await addBtn.isVisible()) {
      await expect(addBtn).toHaveClass(/metro-button/)
    }
    
    // Check export buttons
    const exportBtns = page.locator('[data-testid*="export"]')
    const firstExportBtn = exportBtns.first()
    if (await firstExportBtn.isVisible()) {
      await expect(firstExportBtn).toHaveClass(/metro-button/)
    }
  })

  test('should convert RequirementsView elements to Metro style', async ({ page }) => {
    await page.click('[data-testid="requirements-tab"]')
    
    // Check medical certificate card
    const medicalCard = page.locator('[data-testid="medical-certificate-section"]')
    if (await medicalCard.isVisible()) {
      await expect(medicalCard).toHaveClass(/metro-card/)
    }
    
    // Check complete medical button
    const completeMedicalBtn = page.locator('[data-testid="complete-medical-button"]')
    if (await completeMedicalBtn.isVisible()) {
      await expect(completeMedicalBtn).toHaveClass(/metro-button/)
      
      const btnStyles = await completeMedicalBtn.evaluate(el => getComputedStyle(el))
      expect(btnStyles.borderRadius).toBe('0px')
    }
  })

  test('should ensure consistent Metro styling across all views', async ({ page }) => {
    const tabs = ['dashboard-tab', 'journey-tab', 'achievements-tab', 'financial-tab', 'requirements-tab']
    
    for (const tab of tabs) {
      await page.click(`[data-testid="${tab}"]`)
      
      // Check that all buttons are Metro styled
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) { // Check first 5 buttons
        const button = buttons.nth(i)
        if (await button.isVisible()) {
          const classes = await button.getAttribute('class') || ''
          
          // Either should be Metro button or excluded system buttons
          if (classes.includes('btn ') && !classes.includes('metro-button')) {
            // This should fail if we haven't converted properly
            expect(classes).toContain('metro-button')
          }
        }
      }
      
      // Check that all cards are Metro styled
      const cards = page.locator('.card')
      const cardCount = await cards.count()
      
      for (let i = 0; i < cardCount; i++) {
        const card = cards.nth(i)
        if (await card.isVisible()) {
          const classes = await card.getAttribute('class') || ''
          
          // Should be converted to metro-card
          if (classes.includes('card') && !classes.includes('metro-card')) {
            expect(classes).toContain('metro-card')
          }
        }
      }
    }
  })

  test('should have Metro input styling for form elements', async ({ page }) => {
    // Test various views that might have form inputs
    const viewsToTest = ['dashboard-tab', 'financial-tab']
    
    for (const view of viewsToTest) {
      await page.click(`[data-testid="${view}"]`)
      
      // Look for any form inputs
      const inputs = page.locator('input, textarea, select')
      const inputCount = await inputs.count()
      
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i)
        if (await input.isVisible()) {
          const classes = await input.getAttribute('class') || ''
          
          // If it has form-input class, should be converted to metro-input
          if (classes.includes('form-input')) {
            expect(classes).toContain('metro-input')
          }
        }
      }
    }
  })

  test('should eliminate all rounded corners in favor of Metro sharp corners', async ({ page }) => {
    const tabs = ['dashboard-tab', 'journey-tab', 'achievements-tab', 'financial-tab']
    
    for (const tab of tabs) {
      await page.click(`[data-testid="${tab}"]`)
      
      // Check for elements with rounded corners
      const roundedElements = await page.locator('*').evaluateAll(elements => 
        elements.filter(el => {
          const styles = getComputedStyle(el)
          const borderRadius = styles.borderRadius
          // Allow minimal radius for essential browser elements
          return borderRadius && borderRadius !== '0px' && borderRadius !== 'none' && 
                 !borderRadius.includes('0px') && parseFloat(borderRadius) > 2
        }).length
      )
      
      // Should have minimal rounded elements (only essential browser/system elements)
      expect(roundedElements).toBeLessThan(10)
    }
  })
})