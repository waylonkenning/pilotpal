import { test, expect } from '@playwright/test'

test.describe('BFR Currency Tracking', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to requirements/currency view
    await page.goto('/requirements')
  })

  test('should show BFR currency section for licensed pilots', async ({ page }) => {
    // Should show BFR currency tracking section
    await expect(page.locator('[data-testid="bfr-currency-section"]')).toBeVisible()
    
    // Should show BFR requirements info
    await expect(page.locator('[data-testid="bfr-requirements-info"]')).toBeVisible()
    
    // Should show record BFR button
    await expect(page.locator('[data-testid="record-bfr-button"]')).toBeVisible()
    
    // Should show no BFR recorded initially
    await expect(page.locator('[data-testid="no-bfr-recorded"]')).toBeVisible()
    
    // Should show what BFR includes information
    await expect(page.locator('[data-testid="bfr-includes"]')).toBeVisible()
  })

  test('should allow recording a new BFR', async ({ page }) => {
    // Click to record new BFR
    await page.click('[data-testid="record-bfr-button"]')
    
    // Should show BFR recording form
    await expect(page.locator('[data-testid="bfr-form"]')).toBeVisible()
    
    // Fill in BFR details
    await page.fill('[data-testid="bfr-date-input"]', '2024-06-15')
    await page.fill('[data-testid="bfr-instructor-input"]', 'John Smith CFI')
    await page.fill('[data-testid="bfr-location-input"]', 'Auckland Airport')
    await page.selectOption('[data-testid="bfr-aircraft-type"]', 'Cessna 172')
    await page.fill('[data-testid="bfr-flight-time"]', '1.5')
    await page.fill('[data-testid="bfr-ground-time"]', '1.0')
    
    // Add notes
    await page.fill('[data-testid="bfr-notes"]', 'Completed all required maneuvers successfully')
    
    // Save BFR
    await page.click('[data-testid="save-bfr-button"]')
    
    // Should show success message
    await expect(page.locator('[data-testid="bfr-success-message"]'))
      .toContainText('BFR recorded successfully')
    
    // Should update status to current
    await expect(page.locator('[data-testid="bfr-status"]'))
      .toContainText('Current')
  })

  test('should show BFR expiry warnings', async ({ page }) => {
    // Set up a BFR that's expiring soon (mock data)
    await page.click('[data-testid="record-bfr-button"]')
    
    // Record BFR with date 23 months ago (near expiry)
    const expiringDate = new Date()
    expiringDate.setMonth(expiringDate.getMonth() - 23)
    const formattedDate = expiringDate.toISOString().split('T')[0]
    
    await page.fill('[data-testid="bfr-date-input"]', formattedDate)
    await page.fill('[data-testid="bfr-instructor-input"]', 'Test Instructor')
    await page.fill('[data-testid="bfr-location-input"]', 'Test Airport')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Should show warning status
    await expect(page.locator('[data-testid="bfr-status"]'))
      .toContainText('Expiring Soon')
    
    // Should show warning message
    await expect(page.locator('[data-testid="bfr-warning-message"]'))
      .toBeVisible()
    
    // Should show days remaining
    await expect(page.locator('[data-testid="bfr-days-remaining"]'))
      .toContainText('day')
  })

  test('should show overdue BFR status', async ({ page }) => {
    // Record BFR that's overdue (more than 24 months ago)
    await page.click('[data-testid="record-bfr-button"]')
    
    const overdueDate = new Date()
    overdueDate.setMonth(overdueDate.getMonth() - 25)
    const formattedDate = overdueDate.toISOString().split('T')[0]
    
    await page.fill('[data-testid="bfr-date-input"]', formattedDate)
    await page.fill('[data-testid="bfr-instructor-input"]', 'Past Instructor')
    await page.fill('[data-testid="bfr-location-input"]', 'Past Airport')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Should show overdue status
    await expect(page.locator('[data-testid="bfr-status"]'))
      .toContainText('Overdue')
    
    // Should show overdue warning
    await expect(page.locator('[data-testid="bfr-overdue-warning"]'))
      .toBeVisible()
    
    // Should show days overdue
    await expect(page.locator('[data-testid="bfr-days-remaining"]'))
      .toContainText('overdue')
  })

  test('should show BFR history', async ({ page }) => {
    // Record multiple BFRs
    const bfrDates = ['2022-06-15', '2024-06-15']
    
    for (const date of bfrDates) {
      await page.click('[data-testid="record-bfr-button"]')
      await page.fill('[data-testid="bfr-date-input"]', date)
      await page.fill('[data-testid="bfr-instructor-input"]', `Instructor for ${date}`)
      await page.fill('[data-testid="bfr-location-input"]', 'Test Airport')
      await page.click('[data-testid="save-bfr-button"]')
    }
    
    // Should show BFR history section
    await expect(page.locator('[data-testid="bfr-history"]')).toBeVisible()
    
    // Should show all recorded BFRs
    await expect(page.locator('[data-testid="bfr-history-item"]')).toHaveCount(2)
    
    // Should show BFR details in history
    await expect(page.locator('[data-testid="bfr-history"]'))
      .toContainText('2024-06-15')
    await expect(page.locator('[data-testid="bfr-history"]'))
      .toContainText('2022-06-15')
  })

  test('should calculate next due date correctly', async ({ page }) => {
    // Record a BFR
    await page.click('[data-testid="record-bfr-button"]')
    await page.fill('[data-testid="bfr-date-input"]', '2024-06-15')
    await page.fill('[data-testid="bfr-instructor-input"]', 'Test Instructor')
    await page.fill('[data-testid="bfr-location-input"]', 'Test Airport')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Should show correct next due date (24 months from BFR date)
    await expect(page.locator('[data-testid="next-bfr-due"]'))
      .toContainText('2026-06-15')
  })

  test('should handle BFR form validation', async ({ page }) => {
    // Try to save BFR without required fields
    await page.click('[data-testid="record-bfr-button"]')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Should show validation errors
    await expect(page.locator('[data-testid="bfr-date-error"]'))
      .toContainText('Date is required')
    await expect(page.locator('[data-testid="bfr-instructor-error"]'))
      .toContainText('Instructor is required')
    await expect(page.locator('[data-testid="bfr-location-error"]'))
      .toContainText('Location is required')
  })

  test('should allow editing BFR records', async ({ page }) => {
    // Record a BFR first
    await page.click('[data-testid="record-bfr-button"]')
    await page.fill('[data-testid="bfr-date-input"]', '2024-06-15')
    await page.fill('[data-testid="bfr-instructor-input"]', 'Original Instructor')
    await page.fill('[data-testid="bfr-location-input"]', 'Original Airport')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Edit the BFR
    await page.click('[data-testid="edit-bfr-button"]')
    await page.fill('[data-testid="bfr-instructor-input"]', 'Updated Instructor')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Should show updated information
    await expect(page.locator('[data-testid="bfr-history"]'))
      .toContainText('Updated Instructor')
  })

  test('should allow deleting BFR records', async ({ page }) => {
    // Record a BFR first
    await page.click('[data-testid="record-bfr-button"]')
    await page.fill('[data-testid="bfr-date-input"]', '2024-06-15')
    await page.fill('[data-testid="bfr-instructor-input"]', 'Test Instructor')
    await page.fill('[data-testid="bfr-location-input"]', 'Test Airport')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Delete the BFR
    await page.click('[data-testid="delete-bfr-button"]')
    await page.click('[data-testid="confirm-delete-bfr"]')
    
    // Should show no BFR recorded
    await expect(page.locator('[data-testid="no-bfr-recorded"]'))
      .toContainText('No BFR recorded')
  })

  test('should show BFR requirements information', async ({ page }) => {
    // Should show BFR requirements explanation
    await expect(page.locator('[data-testid="bfr-requirements-info"]'))
      .toBeVisible()
    
    // Should explain 24-month requirement
    await expect(page.locator('[data-testid="bfr-requirements-info"]'))
      .toContainText('24 months')
    
    // Should show what BFR includes
    await expect(page.locator('[data-testid="bfr-includes"]'))
      .toContainText('flight review')
    await expect(page.locator('[data-testid="bfr-includes"]'))
      .toContainText('ground review')
  })

  test('should integrate with dashboard currency warnings', async ({ page }) => {
    // Set up an overdue BFR
    await page.click('[data-testid="record-bfr-button"]')
    
    const overdueDate = new Date()
    overdueDate.setMonth(overdueDate.getMonth() - 25)
    const formattedDate = overdueDate.toISOString().split('T')[0]
    
    await page.fill('[data-testid="bfr-date-input"]', formattedDate)
    await page.fill('[data-testid="bfr-instructor-input"]', 'Test Instructor')
    await page.fill('[data-testid="bfr-location-input"]', 'Test Airport')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Navigate to dashboard
    await page.goto('/dashboard')
    
    // Should show BFR warning on dashboard
    await expect(page.locator('[data-testid="bfr-dashboard-warning"]'))
      .toBeVisible()
    await expect(page.locator('[data-testid="bfr-dashboard-warning"]'))
      .toContainText('BFR Overdue')
  })
})