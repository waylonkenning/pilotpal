import { test, expect } from '@playwright/test'

test.describe('Error Handling and Boundaries', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('should display error boundary when critical error occurs', async ({ page }) => {
    // Navigate to app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Navigate to profile tab
    await page.click('[data-testid="user-profile-tab"]')
    
    // Override localStorage.setItem to throw an error when save is attempted
    await page.evaluate(() => {
      const originalSetItem = localStorage.setItem
      localStorage.setItem = (key: string, value: string) => {
        if (key === 'ppl-quest-user-profile') {
          throw new Error('Storage quota exceeded')
        }
        return originalSetItem.call(localStorage, key, value)
      }
    })
    
    // Fill required fields
    await page.fill('[data-testid="pilot-name-input"]', 'Test Pilot')
    await page.fill('[data-testid="pilot-email-input"]', 'test@example.com')
    
    // Try to save profile which should trigger error handling
    await page.click('[data-testid="save-profile-button"]')
    
    // Should show error notification
    await expect(page.locator('[data-testid="error-notification"]')).toBeVisible()
    
    // Should be able to dismiss the notification
    await page.click('[data-testid="dismiss-notification"]')
    await expect(page.locator('[data-testid="error-notification"]')).not.toBeVisible()
  })

  test('should handle form validation errors', async ({ page }) => {
    // Navigate to app and user profile
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    await page.click('[data-testid="user-profile-tab"]')
    
    // Try to save profile without required fields
    await page.click('[data-testid="save-profile-button"]')
    
    // Should show validation error notification
    await expect(page.locator('[data-testid="error-notification"]')).toBeVisible()
    
    // Should contain validation message
    await expect(page.locator('[data-testid="error-notification"]'))
      .toContainText('Full Name')
  })

  test('should handle corrupted localStorage gracefully', async ({ page }) => {
    // Set corrupted data in localStorage
    await page.evaluate(() => {
      localStorage.setItem('ppl-quest-user-profile', 'invalid-json{')
    })
    
    // Navigate to app and user profile
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    await page.click('[data-testid="user-profile-tab"]')
    
    // Should load without crashing (graceful degradation)
    await expect(page.locator('[data-testid="user-profile-form"]')).toBeVisible()
    
    // Should show error notification about loading issue
    await expect(page.locator('[data-testid="error-notification"]')).toBeVisible()
  })

  test('should auto-dismiss non-persistent notifications', async ({ page }) => {
    // Navigate to app and user profile
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    await page.click('[data-testid="user-profile-tab"]')
    
    // Trigger a validation error (non-persistent)
    await page.click('[data-testid="save-profile-button"]')
    
    // Should show notification initially
    await expect(page.locator('[data-testid="error-notification"]')).toBeVisible()
    
    // Should auto-dismiss after 5 seconds
    await page.waitForTimeout(5500)
    await expect(page.locator('[data-testid="error-notification"]')).not.toBeVisible()
  })

  test('should handle network-like errors gracefully', async ({ page }) => {
    // Navigate to app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Simulate network error by intercepting requests
    await page.route('**/*', route => {
      if (route.request().url().includes('api')) {
        route.abort('connectionfailed')
      } else {
        route.continue()
      }
    })
    
    // The app should still function normally for local-only operations
    await page.click('[data-testid="user-profile-tab"]')
    await expect(page.locator('[data-testid="user-profile-form"]')).toBeVisible()
  })

  test('should provide error recovery options', async ({ page }) => {
    // Navigate to app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Simulate an error that would trigger error boundary
    await page.evaluate(() => {
      window.dispatchEvent(new ErrorEvent('error', {
        error: new Error('Test error'),
        message: 'Test error message'
      }))
    })
    
    // Should show error notification
    await expect(page.locator('[data-testid="error-notification"]')).toBeVisible()
    
    // Should be able to dismiss and continue using the app
    await page.click('[data-testid="dismiss-notification"]')
    await expect(page.locator('[data-testid="error-notification"]')).not.toBeVisible()
    
    // App should still be functional
    await page.click('[data-testid="user-profile-tab"]')
    await expect(page.locator('[data-testid="user-profile-form"]')).toBeVisible()
  })
})