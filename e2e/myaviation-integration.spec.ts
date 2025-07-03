import { test, expect } from '@playwright/test'

test.describe('CAA MyAviation Integration Status Tracking', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to requirements view where MyAviation integration would be shown
    await page.goto('/requirements')
  })

  test('should show CAA MyAviation integration section', async ({ page }) => {
    // Should show MyAviation integration section
    await expect(page.locator('[data-testid="myaviation-integration-section"]')).toBeVisible()
    
    // Should show integration status info
    await expect(page.locator('[data-testid="myaviation-status-info"]')).toBeVisible()
    
    // Should show connect to MyAviation button if not connected
    await expect(page.locator('[data-testid="connect-myaviation-button"]')).toBeVisible()
    
    // Should show what MyAviation integration provides
    await expect(page.locator('[data-testid="myaviation-benefits"]')).toBeVisible()
  })

  test('should allow connecting to CAA MyAviation account', async ({ page }) => {
    // Click to connect MyAviation account
    await page.click('[data-testid="connect-myaviation-button"]')
    
    // Should show MyAviation connection form
    await expect(page.locator('[data-testid="myaviation-connection-form"]')).toBeVisible()
    
    // Fill in MyAviation connection details
    await page.fill('[data-testid="myaviation-username-input"]', 'test.pilot@example.com')
    await page.fill('[data-testid="myaviation-password-input"]', 'testpassword123')
    
    // Select connection type
    await page.selectOption('[data-testid="myaviation-connection-type"]', 'manual')
    
    // Add notes about integration
    await page.fill('[data-testid="myaviation-notes"]', 'Connected for license verification and currency tracking')
    
    // Save MyAviation connection
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show success message
    await expect(page.locator('[data-testid="myaviation-success-message"]'))
      .toContainText('Successfully connected to CAA MyAviation')
    
    // Should update status to connected
    await expect(page.locator('[data-testid="myaviation-status"]'))
      .toContainText('Connected')
  })

  test('should show MyAviation connection status and sync information', async ({ page }) => {
    // Set up a connected MyAviation account (mock data)
    await page.click('[data-testid="connect-myaviation-button"]')
    
    // Create a connection with recent sync
    await page.fill('[data-testid="myaviation-username-input"]', 'connected.pilot@example.com')
    await page.selectOption('[data-testid="myaviation-connection-type"]', 'auto')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show connected status
    await expect(page.locator('[data-testid="myaviation-status"]'))
      .toContainText('Connected')
    
    // Should show last sync time
    await expect(page.locator('[data-testid="myaviation-last-sync"]')).toBeVisible()
    
    // Should show sync status indicator
    await expect(page.locator('[data-testid="myaviation-sync-status"]')).toBeVisible()
  })

  test('should show license verification status from MyAviation', async ({ page }) => {
    // Connect MyAviation account first
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.fill('[data-testid="myaviation-username-input"]', 'verified.pilot@example.com')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show license verification section
    await expect(page.locator('[data-testid="license-verification-section"]')).toBeVisible()
    
    // Should show license status
    await expect(page.locator('[data-testid="license-verification-status"]')).toBeVisible()
    
    // Should show license details from MyAviation
    await expect(page.locator('[data-testid="myaviation-license-details"]')).toBeVisible()
  })

  test('should handle MyAviation sync errors and connection issues', async ({ page }) => {
    // Set up a connection with sync issues
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.fill('[data-testid="myaviation-username-input"]', 'error.pilot@example.com')
    await page.selectOption('[data-testid="myaviation-connection-type"]', 'auto')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Simulate sync error scenario
    await page.click('[data-testid="force-sync-error"]') // Test helper
    
    // Should show sync error status
    await expect(page.locator('[data-testid="myaviation-sync-error"]'))
      .toContainText('Sync failed')
    
    // Should show retry sync button
    await expect(page.locator('[data-testid="retry-myaviation-sync"]')).toBeVisible()
    
    // Should show troubleshooting guidance
    await expect(page.locator('[data-testid="myaviation-troubleshooting"]')).toBeVisible()
  })

  test('should display currency and compliance status from MyAviation', async ({ page }) => {
    // Connect MyAviation with currency data
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.fill('[data-testid="myaviation-username-input"]', 'current.pilot@example.com')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show currency compliance section
    await expect(page.locator('[data-testid="myaviation-currency-status"]')).toBeVisible()
    
    // Should show BFR status from MyAviation
    await expect(page.locator('[data-testid="myaviation-bfr-status"]')).toBeVisible()
    
    // Should show medical certificate status from MyAviation
    await expect(page.locator('[data-testid="myaviation-medical-status"]')).toBeVisible()
    
    // Should show overall compliance rating
    await expect(page.locator('[data-testid="myaviation-compliance-rating"]')).toBeVisible()
  })

  test('should allow manual sync with MyAviation', async ({ page }) => {
    // Set up connected account
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.fill('[data-testid="myaviation-username-input"]', 'manual.pilot@example.com')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show manual sync button
    await expect(page.locator('[data-testid="manual-sync-myaviation"]')).toBeVisible()
    
    // Click manual sync
    await page.click('[data-testid="manual-sync-myaviation"]')
    
    // Should show sync in progress indicator
    await expect(page.locator('[data-testid="myaviation-sync-progress"]')).toBeVisible()
    
    // Should update last sync time after completion
    await expect(page.locator('[data-testid="myaviation-last-sync"]'))
      .toContainText('Just now')
  })

  test('should show MyAviation integration benefits and features', async ({ page }) => {
    // Should show benefits information
    await expect(page.locator('[data-testid="myaviation-benefits"]'))
      .toContainText('official license verification')
    
    // Should show what data can be synced
    await expect(page.locator('[data-testid="myaviation-data-sync"]')).toBeVisible()
    
    // Should show privacy and security information
    await expect(page.locator('[data-testid="myaviation-privacy-info"]')).toBeVisible()
  })

  test('should allow editing MyAviation connection settings', async ({ page }) => {
    // Connect account first
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.fill('[data-testid="myaviation-username-input"]', 'edit.pilot@example.com')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show edit connection settings
    await expect(page.locator('[data-testid="edit-myaviation-connection"]')).toBeVisible()
    
    // Edit the connection
    await page.click('[data-testid="edit-myaviation-connection"]')
    
    // Should show connection settings form
    await expect(page.locator('[data-testid="myaviation-settings-form"]')).toBeVisible()
    
    // Change sync frequency
    await page.selectOption('[data-testid="myaviation-sync-frequency"]', 'weekly')
    
    // Update settings
    await page.click('[data-testid="update-myaviation-settings"]')
    
    // Should show settings updated confirmation
    await expect(page.locator('[data-testid="myaviation-settings-updated"]'))
      .toContainText('Settings updated')
  })

  test('should allow disconnecting from MyAviation', async ({ page }) => {
    // Connect account first
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.fill('[data-testid="myaviation-username-input"]', 'disconnect.pilot@example.com')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show disconnect option
    await expect(page.locator('[data-testid="disconnect-myaviation"]')).toBeVisible()
    
    // Click disconnect
    await page.click('[data-testid="disconnect-myaviation"]')
    
    // Should show confirmation dialog
    await expect(page.locator('[data-testid="disconnect-confirmation"]')).toBeVisible()
    
    // Confirm disconnection
    await page.click('[data-testid="confirm-disconnect-myaviation"]')
    
    // Should return to unconnected state
    await expect(page.locator('[data-testid="connect-myaviation-button"]')).toBeVisible()
    
    // Should show disconnection success message
    await expect(page.locator('[data-testid="myaviation-disconnected-message"]'))
      .toContainText('Disconnected from MyAviation')
  })

  test('should validate MyAviation connection form inputs', async ({ page }) => {
    // Try to save connection without required fields
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show validation errors
    await expect(page.locator('[data-testid="myaviation-username-error"]'))
      .toContainText('Username is required')
    
    // Test invalid email format
    await page.fill('[data-testid="myaviation-username-input"]', 'invalid-email')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Should show email format error
    await expect(page.locator('[data-testid="myaviation-username-error"]'))
      .toContainText('Valid email address required')
  })

  test('should integrate MyAviation status with dashboard alerts', async ({ page }) => {
    // Set up MyAviation connection with issues
    await page.click('[data-testid="connect-myaviation-button"]')
    await page.fill('[data-testid="myaviation-username-input"]', 'issue.pilot@example.com')
    await page.click('[data-testid="save-myaviation-connection"]')
    
    // Navigate to dashboard
    await page.goto('/dashboard')
    
    // Should show MyAviation status on dashboard if there are issues
    await expect(page.locator('[data-testid="myaviation-dashboard-alert"]')).toBeVisible()
    
    // Should show sync status
    await expect(page.locator('[data-testid="myaviation-dashboard-alert"]'))
      .toContainText('MyAviation')
  })

  test('should show MyAviation connection history and audit trail', async ({ page }) => {
    // Connect and disconnect multiple times to create history
    const connections = [
      { username: 'history1@example.com', action: 'connect' },
      { username: 'history2@example.com', action: 'disconnect' }
    ]
    
    for (const conn of connections) {
      if (conn.action === 'connect') {
        await page.click('[data-testid="connect-myaviation-button"]')
        await page.fill('[data-testid="myaviation-username-input"]', conn.username)
        await page.click('[data-testid="save-myaviation-connection"]')
      }
      if (conn.action === 'disconnect') {
        await page.click('[data-testid="disconnect-myaviation"]')
        await page.click('[data-testid="confirm-disconnect-myaviation"]')
      }
    }
    
    // Should show connection history
    await expect(page.locator('[data-testid="myaviation-connection-history"]')).toBeVisible()
    
    // Should show audit trail of connections
    await expect(page.locator('[data-testid="myaviation-audit-trail"]')).toBeVisible()
  })
})