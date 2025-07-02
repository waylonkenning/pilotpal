import { test, expect } from '@playwright/test'

test.describe('User Profile Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should navigate to user profile view', async ({ page }) => {
    // Navigate to user profile section
    await page.click('[data-testid="user-profile-tab"]')
    
    // Should show user profile form
    await expect(page.locator('[data-testid="user-profile-form"]'))
      .toBeVisible()
    
    // Should show profile input fields
    await expect(page.locator('[data-testid="pilot-name-input"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="pilot-email-input"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="save-profile-button"]'))
      .toBeVisible()
  })

  test('should save basic profile information', async ({ page }) => {
    // Navigate to user profile section
    await page.click('[data-testid="user-profile-tab"]')
    
    // Fill in basic profile information
    await page.fill('[data-testid="pilot-name-input"]', 'John Smith')
    await page.fill('[data-testid="pilot-email-input"]', 'john@example.com')
    await page.fill('[data-testid="pilot-phone-input"]', '021-123-4567')
    
    // Save profile
    await page.click('[data-testid="save-profile-button"]')
    
    // Should show success message
    await expect(page.locator('[data-testid="profile-save-success"]'))
      .toBeVisible()
  })

  test('should show CAA MyAviation integration section', async ({ page }) => {
    // Navigate to user profile section
    await page.click('[data-testid="user-profile-tab"]')
    
    // Should show CAA MyAviation section
    await expect(page.locator('[data-testid="caa-myaviation-section"]'))
      .toBeVisible()
    
    // Should show connection status
    await expect(page.locator('[data-testid="myaviation-status"]'))
      .toContainText('Not Connected')
    
    // Should show setup button
    await expect(page.locator('[data-testid="setup-myaviation-button"]'))
      .toBeVisible()
  })
})