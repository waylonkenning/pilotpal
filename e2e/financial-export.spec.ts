import { test, expect } from '@playwright/test'

test.describe('Financial Data Export', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to financial view
    await page.goto('/finances')
    
    // Add some sample expense data to ensure we have data to export
    await page.click('[data-testid="add-expense-button"]')
    await page.selectOption('[data-testid="expense-category-select"]', 'flight-training')
    await page.fill('[data-testid="expense-amount-input"]', '250')
    await page.fill('[data-testid="expense-description-input"]', 'Dual instruction lesson')
    await page.fill('[data-testid="expense-date-input"]', '2024-06-15')
    await page.click('[data-testid="save-expense-button"]')
    
    // Add another expense
    await page.click('[data-testid="add-expense-button"]')
    await page.selectOption('[data-testid="expense-category-select"]', 'theory-exam')
    await page.fill('[data-testid="expense-amount-input"]', '85')
    await page.fill('[data-testid="expense-description-input"]', 'Air Law theory exam')
    await page.fill('[data-testid="expense-date-input"]', '2024-06-10')
    await page.click('[data-testid="save-expense-button"]')
  })

  test('should show export options in financial view', async ({ page }) => {
    // Should have export section
    await expect(page.locator('[data-testid="export-section"]')).toBeVisible()
    
    // Should have CSV export button
    await expect(page.locator('[data-testid="export-csv-button"]')).toBeVisible()
    
    // Should have PDF export button
    await expect(page.locator('[data-testid="export-pdf-button"]')).toBeVisible()
    
    // Should show export options description
    await expect(page.locator('[data-testid="export-description"]'))
      .toContainText('Export your financial data for record-keeping')
  })

  test('should export financial data as CSV', async ({ page }) => {
    // Start download tracking
    const downloadPromise = page.waitForEvent('download')
    
    // Click CSV export
    await page.click('[data-testid="export-csv-button"]')
    
    // Wait for download
    const download = await downloadPromise
    
    // Verify download properties
    expect(download.suggestedFilename()).toMatch(/ppl-quest-expenses-\d{4}-\d{2}-\d{2}\.csv/)
    
    // Save and verify file contents
    const path = await download.path()
    expect(path).toBeTruthy()
  })

  test('should export financial data as PDF', async ({ page }) => {
    // Start download tracking
    const downloadPromise = page.waitForEvent('download')
    
    // Click PDF export
    await page.click('[data-testid="export-pdf-button"]')
    
    // Wait for download
    const download = await downloadPromise
    
    // Verify download properties
    expect(download.suggestedFilename()).toMatch(/ppl-quest-financial-report-\d{4}-\d{2}-\d{2}\.pdf/)
    
    // Save and verify file exists
    const path = await download.path()
    expect(path).toBeTruthy()
  })

  test('should show export confirmation messages', async ({ page }) => {
    // Export CSV
    await page.click('[data-testid="export-csv-button"]')
    
    // Should show success message
    await expect(page.locator('[data-testid="export-success-message"]'))
      .toContainText('CSV export completed successfully')
    
    // Export PDF
    await page.click('[data-testid="export-pdf-button"]')
    
    // Should show success message
    await expect(page.locator('[data-testid="export-success-message"]'))
      .toContainText('PDF export completed successfully')
  })

  test('should handle export with no data gracefully', async ({ page }) => {
    // Clear all expenses first
    const deleteButtons = page.locator('[data-testid*="delete-expense"]')
    const count = await deleteButtons.count()
    
    for (let i = 0; i < count; i++) {
      await deleteButtons.first().click()
      await page.click('[data-testid="confirm-delete-expense"]')
    }
    
    // Try to export with no data
    await page.click('[data-testid="export-csv-button"]')
    
    // Should show appropriate message
    await expect(page.locator('[data-testid="export-empty-message"]'))
      .toContainText('No expense data to export')
  })

  test('should show export statistics before download', async ({ page }) => {
    // Click export to show options
    await page.click('[data-testid="export-csv-button"]')
    
    // Should show export preview stats
    await expect(page.locator('[data-testid="export-stats"]')).toBeVisible()
    await expect(page.locator('[data-testid="export-total-expenses"]')).toBeVisible()
    await expect(page.locator('[data-testid="export-date-range"]')).toBeVisible()
    await expect(page.locator('[data-testid="export-categories-count"]')).toBeVisible()
  })

  test('should allow filtering exports by date range', async ({ page }) => {
    // Should have date range filters for export
    await expect(page.locator('[data-testid="export-date-from"]')).toBeVisible()
    await expect(page.locator('[data-testid="export-date-to"]')).toBeVisible()
    
    // Set date range
    await page.fill('[data-testid="export-date-from"]', '2024-06-01')
    await page.fill('[data-testid="export-date-to"]', '2024-06-30')
    
    // Export with date filter
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-csv-button"]')
    const download = await downloadPromise
    
    // Should include date range in filename
    expect(download.suggestedFilename()).toMatch(/2024-06-01_to_2024-06-30/)
  })

  test('should allow filtering exports by category', async ({ page }) => {
    // Should have category filter for export
    await expect(page.locator('[data-testid="export-category-filter"]')).toBeVisible()
    
    // Select specific category
    await page.selectOption('[data-testid="export-category-filter"]', 'flight-training')
    
    // Export with category filter
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-csv-button"]')
    const download = await downloadPromise
    
    // Should include category in filename
    expect(download.suggestedFilename()).toMatch(/flight-training/)
  })
})