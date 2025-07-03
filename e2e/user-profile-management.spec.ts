import { test, expect } from '@playwright/test'

test.describe('User Profile and State Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should handle user profile creation and updates', async ({ page }) => {
    // Navigate to user profile section
    await page.click('[data-testid="user-profile-tab"]')
    
    // Should show empty profile initially
    await expect(page.locator('[data-testid="user-profile-form"]'))
      .toBeVisible()
    
    // Fill in basic profile information
    await page.fill('[data-testid="pilot-name-input"]', 'John Smith')
    await page.fill('[data-testid="pilot-email-input"]', 'john@example.com')
    await page.fill('[data-testid="pilot-phone-input"]', '021-123-4567')
    await page.fill('[data-testid="training-start-date"]', '2024-01-15')
    
    // Save profile
    await page.click('[data-testid="save-profile-button"]')
    
    // Should show success message
    await expect(page.locator('[data-testid="profile-save-success"]'))
      .toBeVisible()
    
    // Should persist data across page reloads
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    await page.click('[data-testid="user-profile-tab"]')
    
    // Should show saved data
    await expect(page.locator('[data-testid="pilot-name-input"]'))
      .toHaveValue('John Smith')
    
    await expect(page.locator('[data-testid="pilot-email-input"]'))
      .toHaveValue('john@example.com')
  })

  test('should track BFR (Biennial Flight Review) currency for licensed pilots', async ({ page }) => {
    // Simulate being a licensed pilot
    await page.evaluate(() => {
      localStorage.setItem('ppl-quest-user', JSON.stringify({
        isLicensed: true,
        licenseDate: '2023-06-15',
        lastBFR: '2023-06-15'
      }))
    })
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Navigate to currency tracking
    await page.click('[data-testid="currency-tab"]')
    
    // Should show BFR status
    await expect(page.locator('[data-testid="bfr-current-status"]'))
      .toBeVisible()
    
    // Should show next BFR due date (24 months from last)
    await expect(page.locator('[data-testid="bfr-due-date"]'))
      .toContainText('June 2025')
    
    // Should show days remaining
    await expect(page.locator('[data-testid="bfr-days-remaining"]'))
      .toContainText('days')
    
    // Record a new BFR
    await page.click('[data-testid="record-bfr-button"]')
    await page.fill('[data-testid="bfr-date-input"]', '2024-06-15')
    await page.fill('[data-testid="bfr-instructor-input"]', 'CFI John Doe')
    await page.fill('[data-testid="bfr-cost-input"]', '400')
    await page.click('[data-testid="save-bfr-button"]')
    
    // Should update BFR status
    await expect(page.locator('[data-testid="bfr-due-date"]'))
      .toContainText('June 2026')
    
    // Should show BFR history
    await expect(page.locator('[data-testid="bfr-history"]'))
      .toContainText('CFI John Doe')
  })

  test('should handle medical certificate expiry warnings', async ({ page }) => {
    // Set up user with medical certificate close to expiry
    await page.evaluate(() => {
      const nearExpiryDate = new Date()
      nearExpiryDate.setMonth(nearExpiryDate.getMonth() + 2) // 2 months from now
      
      localStorage.setItem('ppl-quest-user', JSON.stringify({
        medicalCertificate: {
          type: 'Class 2',
          issueDate: '2024-01-15',
          expiryDate: nearExpiryDate.toISOString().split('T')[0]
        }
      }))
    })
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should show expiry warning on dashboard
    await expect(page.locator('[data-testid="medical-expiry-warning"]'))
      .toBeVisible()
    
    // Should show specific warning message
    await expect(page.locator('[data-testid="medical-expiry-warning"]'))
      .toContainText('expires in')
    
    // Navigate to requirements to see details
    await page.click('[data-testid="requirements-tab"]')
    
    // Should show detailed expiry information
    await expect(page.locator('[data-testid="medical-expiry-details"]'))
      .toBeVisible()
    
    // Should offer renewal reminder option
    await expect(page.locator('[data-testid="renewal-reminder-button"]'))
      .toBeVisible()
  })

  test('should track flight currency and recent experience', async ({ page }) => {
    // Set up user with some flight experience
    await page.evaluate(() => {
      localStorage.setItem('ppl-quest-user', JSON.stringify({
        isLicensed: true,
        licenseDate: '2023-06-15',
        recentFlights: [
          { date: '2024-06-01', duration: 1.5, type: 'local' },
          { date: '2024-05-15', duration: 2.0, type: 'cross-country' },
          { date: '2024-05-01', duration: 1.0, type: 'night' }
        ]
      }))
    })
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Navigate to currency tab
    await page.click('[data-testid="currency-tab"]')
    
    // Should show recent flight summary
    await expect(page.locator('[data-testid="recent-flight-hours"]'))
      .toContainText('4.5') // Total of recent flights
    
    // Should show currency status for different flight types
    await expect(page.locator('[data-testid="day-currency-status"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="night-currency-status"]'))
      .toBeVisible()
    
    // Should show passenger carrying currency (90 days, 3 takeoffs/landings)
    await expect(page.locator('[data-testid="passenger-currency"]'))
      .toBeVisible()
    
    // Add a new flight to update currency
    await page.click('[data-testid="log-recent-flight"]')
    await page.fill('[data-testid="flight-date-input"]', '2024-06-20')
    await page.fill('[data-testid="flight-duration-input"]', '1.5')
    await page.selectOption('[data-testid="flight-type-select"]', 'local')
    await page.fill('[data-testid="takeoffs-landings-input"]', '3')
    await page.click('[data-testid="save-flight-button"]')
    
    // Should update currency calculations
    await expect(page.locator('[data-testid="recent-flight-hours"]'))
      .toContainText('6.0') // Updated total
  })


  test('should persist state across browser sessions', async ({ page }) => {
    // Create comprehensive state data
    const testState = {
      progress: {
        currentLesson: 5,
        completedLessons: [1, 2, 3, 4],
        flightHours: { total: 12.5, dual: 10.0, solo: 2.5 }
      },
      user: {
        name: 'Test Pilot',
        email: 'test@example.com',
        licenseDate: '2023-06-15'
      },
      financial: {
        totalSpent: 3500,
        expenses: [
          { category: 'Flight Training', amount: 3000, date: '2024-06-01' },
          { category: 'Theory Exams', amount: 390, date: '2024-05-15' },
          { category: 'Equipment', amount: 110, date: '2024-05-01' }
        ]
      }
    }
    
    // Set up initial state
    await page.evaluate((state) => {
      localStorage.setItem('ppl-quest-progress', JSON.stringify(state.progress))
      localStorage.setItem('ppl-quest-user', JSON.stringify(state.user))
      localStorage.setItem('ppl-quest-financial', JSON.stringify(state.financial))
    }, testState)
    
    // Reload page to simulate new session
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Verify progress state persisted
    await expect(page.locator('[data-testid="current-lesson-title"]'))
      .toContainText('Lesson 5')
    
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('12.5')
    
    // Check financial state
    await page.click('[data-testid="finances-tab"]')
    await expect(page.locator('[data-testid="total-spent"]'))
      .toContainText('3,500')
    
    // Check user profile state
    await page.click('[data-testid="user-profile-tab"]')
    await expect(page.locator('[data-testid="pilot-name-input"]'))
      .toHaveValue('Test Pilot')
    
    // Clear specific storage and verify impact
    await page.evaluate(() => {
      localStorage.removeItem('ppl-quest-user')
    })
    
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Progress should still be there
    await expect(page.locator('[data-testid="current-lesson-title"]'))
      .toContainText('Lesson 5')
    
    // But user profile should be empty
    await page.click('[data-testid="user-profile-tab"]')
    await expect(page.locator('[data-testid="pilot-name-input"]'))
      .toHaveValue('')
  })

  test('should handle data migration and version updates', async ({ page }) => {
    // Simulate old data format
    await page.evaluate(() => {
      // Old format without version info
      localStorage.setItem('ppl-quest-progress', JSON.stringify({
        lesson: 3, // Old single lesson field
        hours: 8.5, // Old simple hours field
        completed: ['lesson1', 'lesson2'] // Old format
      }))
    })
    
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Should handle migration gracefully
    await expect(page.locator('[data-testid="current-lesson-title"]'))
      .toBeVisible()
    
    // Should show migration success or default state
    await expect(page.locator('[data-testid="total-hours"]'))
      .toBeVisible()
    
    // Check that data was migrated to new format
    const migratedData = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('ppl-quest-progress') || '{}')
    })
    
    // Should have new format fields
    expect(migratedData).toHaveProperty('currentLesson')
    expect(migratedData).toHaveProperty('flightHours')
  })
})