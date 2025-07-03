import { test, expect } from '@playwright/test'

test.describe('Medical Certificate Expiry Warnings', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to requirements view
    await page.goto('/requirements')
  })

  test('should show medical certificate expiry warnings in requirements view', async ({ page }) => {
    // Add a medical certificate that's expiring soon (3 weeks before expiry)
    await page.click('[data-testid="medical-cert-requirement"]')
    
    const expiringDate = new Date()
    expiringDate.setDate(expiringDate.getDate() + 21) // Expires in 3 weeks (21 days)
    const formattedDate = expiringDate.toISOString().split('T')[0]
    
    await page.selectOption('[data-testid="medical-cert-type"]', 'class2')
    await page.fill('[data-testid="medical-issue-date"]', '2024-01-15')
    await page.fill('[data-testid="medical-expiry-date"]', formattedDate)
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show expiry warning
    await expect(page.locator('[data-testid="medical-expiry-warning"]')).toBeVisible()
    await expect(page.locator('[data-testid="medical-expiry-warning"]'))
      .toContainText('expires soon')
    
    // Should show days until expiry
    await expect(page.locator('[data-testid="medical-days-remaining"]')).toBeVisible()
  })

  test('should show overdue medical certificate warnings', async ({ page }) => {
    // Add an overdue medical certificate
    await page.click('[data-testid="medical-cert-requirement"]')
    
    const overdueDate = new Date()
    overdueDate.setMonth(overdueDate.getMonth() - 1) // Expired 1 month ago
    const formattedDate = overdueDate.toISOString().split('T')[0]
    
    await page.selectOption('[data-testid="medical-cert-type"]', 'class2')
    await page.fill('[data-testid="medical-issue-date"]', '2023-01-15')
    await page.fill('[data-testid="medical-expiry-date"]', formattedDate)
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show overdue warning
    await expect(page.locator('[data-testid="medical-overdue-warning"]')).toBeVisible()
    await expect(page.locator('[data-testid="medical-overdue-warning"]'))
      .toContainText('expired')
    
    // Should show flight restriction warning
    await expect(page.locator('[data-testid="medical-flight-restriction"]'))
      .toContainText('cannot exercise pilot privileges')
  })

  test('should show medical certificate renewal reminders', async ({ page }) => {
    // Add a medical certificate expiring within 3 months
    await page.click('[data-testid="medical-cert-requirement"]')
    
    const renewalDate = new Date()
    renewalDate.setMonth(renewalDate.getMonth() + 2) // Expires in 2 months
    const formattedDate = renewalDate.toISOString().split('T')[0]
    
    await page.fill('[data-testid="medical-expiry-date"]', formattedDate)
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show renewal reminder
    await expect(page.locator('[data-testid="medical-renewal-reminder"]')).toBeVisible()
    await expect(page.locator('[data-testid="medical-renewal-reminder"]'))
      .toContainText('scheduling your medical renewal')
  })

  test('should integrate medical warnings with dashboard alerts', async ({ page }) => {
    // Set up an expiring medical certificate
    await page.click('[data-testid="medical-cert-requirement"]')
    
    const expiringDate = new Date()
    expiringDate.setDate(expiringDate.getDate() + 21) // Expires in 3 weeks
    const formattedDate = expiringDate.toISOString().split('T')[0]
    
    await page.fill('[data-testid="medical-expiry-date"]', formattedDate)
    await page.click('[data-testid="save-medical-cert"]')
    
    // Navigate to dashboard
    await page.goto('/dashboard')
    
    // Should show medical warning on dashboard
    await expect(page.locator('[data-testid="medical-dashboard-warning"]')).toBeVisible()
    await expect(page.locator('[data-testid="medical-dashboard-warning"]'))
      .toContainText('Medical Certificate')
  })

  test('should show different warnings for Class 2 vs DL9 medical certificates', async ({ page }) => {
    // Test Class 2 medical certificate
    await page.click('[data-testid="medical-cert-requirement"]')
    await page.selectOption('[data-testid="medical-cert-type"]', 'class2')
    
    const expiringDate = new Date()
    expiringDate.setMonth(expiringDate.getMonth() + 1)
    await page.fill('[data-testid="medical-expiry-date"]', expiringDate.toISOString().split('T')[0])
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show Class 2 specific information
    await expect(page.locator('[data-testid="medical-cert-status"]'))
      .toContainText('Class 2 Medical Certificate')
    
    // Clear and test DL9
    await page.click('[data-testid="edit-medical-cert"]')
    await page.selectOption('[data-testid="medical-cert-type"]', 'dl9')
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show DL9 specific information
    await expect(page.locator('[data-testid="medical-cert-status"]'))
      .toContainText('DL9 Driver License Medical')
  })

  test('should calculate correct expiry warnings for different medical types', async ({ page }) => {
    // Test Class 2 medical (typically 1-2 years validity)
    await page.click('[data-testid="medical-cert-requirement"]')
    await page.selectOption('[data-testid="medical-cert-type"]', 'class2')
    
    const class2Expiry = new Date()
    class2Expiry.setDate(class2Expiry.getDate() + 21) // 3 weeks validity
    await page.fill('[data-testid="medical-expiry-date"]', class2Expiry.toISOString().split('T')[0])
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show appropriate warning level
    await expect(page.locator('[data-testid="medical-expiry-status"]')).toBeVisible()
    
    // Should show renewal guidance
    await expect(page.locator('[data-testid="medical-renewal-guidance"]')).toBeVisible()
  })

  test('should provide medical examiner contact information', async ({ page }) => {
    // Add an expiring medical certificate
    await page.click('[data-testid="medical-cert-requirement"]')
    
    const expiringDate = new Date()
    expiringDate.setDate(expiringDate.getDate() + 21) // Expires in 3 weeks
    await page.fill('[data-testid="medical-expiry-date"]', expiringDate.toISOString().split('T')[0])
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show medical examiner finder
    await expect(page.locator('[data-testid="find-medical-examiner"]')).toBeVisible()
    
    // Click to get examiner information
    await page.click('[data-testid="find-medical-examiner"]')
    
    // Should show CAME (Civil Aviation Medical Examiner) information
    await expect(page.locator('[data-testid="came-information"]')).toBeVisible()
    await expect(page.locator('[data-testid="came-information"]'))
      .toContainText('Civil Aviation Medical Examiner')
  })

  test('should show medical certificate cost estimation for renewal', async ({ page }) => {
    // Add an expiring medical certificate
    await page.click('[data-testid="medical-cert-requirement"]')
    
    const expiringDate = new Date()
    expiringDate.setMonth(expiringDate.getMonth() + 2)
    await page.fill('[data-testid="medical-expiry-date"]', expiringDate.toISOString().split('T')[0])
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show renewal cost information
    await expect(page.locator('[data-testid="medical-renewal-cost"]')).toBeVisible()
    await expect(page.locator('[data-testid="medical-renewal-cost"]'))
      .toContainText('$')
  })

  test('should allow updating medical certificate to extend validity', async ({ page }) => {
    // Add an expiring medical certificate
    await page.click('[data-testid="medical-cert-requirement"]')
    
    const expiringDate = new Date()
    expiringDate.setDate(expiringDate.getDate() + 21) // Expires in 3 weeks
    await page.fill('[data-testid="medical-expiry-date"]', expiringDate.toISOString().split('T')[0])
    await page.click('[data-testid="save-medical-cert"]')
    
    // Update with new medical certificate
    await page.click('[data-testid="renew-medical-cert"]')
    
    const newExpiryDate = new Date()
    newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1)
    await page.fill('[data-testid="medical-expiry-date"]', newExpiryDate.toISOString().split('T')[0])
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should no longer show expiry warning
    await expect(page.locator('[data-testid="medical-expiry-warning"]')).not.toBeVisible()
    
    // Should show current status
    await expect(page.locator('[data-testid="medical-cert-status"]'))
      .toContainText('✅')
  })

  test('should show medical certificate history and track renewals', async ({ page }) => {
    // Add multiple medical certificates to show history
    const medicalDates = [
      { issue: '2022-01-15', expiry: '2024-01-15' },
      { issue: '2024-02-01', expiry: '2026-02-01' }
    ]
    
    for (const dates of medicalDates) {
      await page.click('[data-testid="medical-cert-requirement"]')
      await page.fill('[data-testid="medical-issue-date"]', dates.issue)
      await page.fill('[data-testid="medical-expiry-date"]', dates.expiry)
      await page.click('[data-testid="save-medical-cert"]')
    }
    
    // Should show medical certificate history
    await expect(page.locator('[data-testid="medical-cert-history"]')).toBeVisible()
    
    // Should show renewal tracking
    await expect(page.locator('[data-testid="medical-renewals-count"]')).toBeVisible()
  })

  test('should handle medical certificate validation errors', async ({ page }) => {
    // Try to save medical certificate with invalid dates
    await page.click('[data-testid="medical-cert-requirement"]')
    
    // Set expiry date before issue date
    await page.fill('[data-testid="medical-issue-date"]', '2024-06-15')
    await page.fill('[data-testid="medical-expiry-date"]', '2024-01-15')
    await page.click('[data-testid="save-medical-cert"]')
    
    // Should show validation error
    await expect(page.locator('[data-testid="medical-date-error"]'))
      .toContainText('Expiry date must be after issue date')
    
    // Should not save invalid certificate
    await expect(page.locator('[data-testid="medical-cert-status"]')).not.toBeVisible()
  })
})