import { test, expect } from '@playwright/test';

test.describe('Flight Hours Logging', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage to start fresh
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    
    // Setup: Create a user and get to dashboard
    await page.goto('/');
    await page.click('[data-testid="get-started-button"]');
    await page.fill('[data-testid="name-input"]', 'Test Pilot');
    await page.click('[data-testid="start-journey-button"]');
  });

  test('should open flight hours logging modal from quick actions', async ({ page }) => {
    // Click on Log Flight Hours quick action
    await page.click('text=📝 Log Flight Hours');
    
    // Should open modal
    await expect(page.locator('[data-testid="flight-hours-modal"]'))
      .toBeVisible();
    
    // Should show form title
    await expect(page.locator('[data-testid="modal-title"]'))
      .toContainText('Log Flight Hours');
  });

  test('should display flight hours form with all input fields', async ({ page }) => {
    await page.click('text=📝 Log Flight Hours');
    
    // Should show all hour type inputs
    await expect(page.locator('[data-testid="dual-hours-input"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="solo-hours-input"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="cross-country-hours-input"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="instrument-hours-input"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="night-hours-input"]'))
      .toBeVisible();
    
    // Should show date input
    await expect(page.locator('[data-testid="flight-date-input"]'))
      .toBeVisible();
    
    // Should show description input
    await expect(page.locator('[data-testid="flight-description-input"]'))
      .toBeVisible();
    
    // Should show save and cancel buttons
    await expect(page.locator('[data-testid="save-flight-button"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="cancel-flight-button"]'))
      .toBeVisible();
  });

  test('should log dual instruction hours and update dashboard', async ({ page }) => {
    await page.click('text=📝 Log Flight Hours');
    
    // Fill in dual hours
    await page.fill('[data-testid="dual-hours-input"]', '1.5');
    await page.fill('[data-testid="flight-description-input"]', 'First lesson - basic controls');
    
    // Save the flight
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Modal should close
    await expect(page.locator('[data-testid="flight-hours-modal"]'))
      .not.toBeVisible();
    
    // Dashboard should update with new hours
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('1.5');
    
    // Should show dual hours breakdown
    await expect(page.locator('[data-testid="flight-hours-card"]'))
      .toContainText('Dual: 1.5h');
  });

  test('should log solo flight and unlock First Flight badge', async ({ page }) => {
    await page.click('text=📝 Log Flight Hours');
    
    // Fill in initial dual hours first
    await page.fill('[data-testid="dual-hours-input"]', '0.5');
    await page.fill('[data-testid="flight-description-input"]', 'Introductory flight');
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Should unlock First Flight badge
    await expect(page.locator('[data-testid="achievement-notification"]'))
      .toContainText('First Flight badge unlocked!');
    
    // Achievement count should update (may unlock multiple badges on first flight)
    await expect(page.locator('[data-testid="achievements-count"]'))
      .toContainText('2 of 4');
  });

  test('should validate required fields', async ({ page }) => {
    await page.click('text=📝 Log Flight Hours');
    
    // Try to save without any hours
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Should show validation error
    await expect(page.locator('[data-testid="validation-error"]'))
      .toContainText('Please enter at least 0.1 hours');
    
    // Modal should stay open
    await expect(page.locator('[data-testid="flight-hours-modal"]'))
      .toBeVisible();
  });

  test('should validate hour inputs are numeric and positive', async ({ page }) => {
    await page.click('text=📝 Log Flight Hours');
    
    // Try negative input
    await page.fill('[data-testid="dual-hours-input"]', '-1');
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    await expect(page.locator('[data-testid="validation-error"]'))
      .toContainText('Hours must be positive numbers');
  });

  test('should close modal when cancel is clicked', async ({ page }) => {
    await page.click('text=📝 Log Flight Hours');
    
    // Fill some data
    await page.fill('[data-testid="dual-hours-input"]', '1.0');
    
    // Click cancel
    await page.locator('[data-testid="cancel-flight-button"]').click({ force: true });
    
    // Modal should close
    await expect(page.locator('[data-testid="flight-hours-modal"]'))
      .not.toBeVisible();
    
    // Hours should not be saved
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('0.0');
  });

  test('should calculate total hours correctly with multiple entries', async ({ page }) => {
    // Log first flight
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="dual-hours-input"]', '1.5');
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Log second flight
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="solo-hours-input"]', '0.8');
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Log third flight
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="cross-country-hours-input"]', '2.2');
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Total should be calculated correctly
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('4.5');
    
    // Individual breakdowns should be correct
    await expect(page.locator('[data-testid="flight-hours-card"]'))
      .toContainText('Dual: 1.5h');
    await expect(page.locator('[data-testid="flight-hours-card"]'))
      .toContainText('Solo: 0.8h');
    await expect(page.locator('[data-testid="flight-hours-card"]'))
      .toContainText('Cross Country: 2.2h');
  });

  test('should update current phase based on total hours', async ({ page }) => {
    // Initially in Foundation Phase
    await expect(page.locator('[data-testid="current-phase"]'))
      .toContainText('Foundation Phase');
    
    // Log 20 hours to move to Circuit Phase
    for (let i = 0; i < 4; i++) {
      await page.click('text=📝 Log Flight Hours');
      await page.fill('[data-testid="dual-hours-input"]', '5.0');
      await page.locator('[data-testid="save-flight-button"]').scrollIntoViewIfNeeded();
      await page.click('[data-testid="save-flight-button"]', { force: true });
    }
    
    // Should now be in Circuit Phase (15-25 hours)
    await expect(page.locator('[data-testid="current-phase"]'))
      .toContainText('Circuit Phase');
  });

  test('should persist flight hours across page reloads', async ({ page }) => {
    // Log some hours
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="dual-hours-input"]', '2.5');
    await page.fill('[data-testid="flight-description-input"]', 'Pattern work');
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Reload page
    await page.reload();
    
    // Hours should still be there
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('2.5');
    await expect(page.locator('[data-testid="flight-hours-card"]'))
      .toContainText('Dual: 2.5h');
  });

  test('should show recent flights list', async ({ page }) => {
    // Log a flight
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="dual-hours-input"]', '1.2');
    await page.fill('[data-testid="flight-description-input"]', 'Steep turns and stalls');
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Should show recent flights section
    await expect(page.locator('[data-testid="recent-flights"]'))
      .toBeVisible();
    
    // Should show the logged flight
    await expect(page.locator('[data-testid="recent-flights"]'))
      .toContainText('Steep turns and stalls');
    await expect(page.locator('[data-testid="recent-flights"]'))
      .toContainText('1.2h dual');
  });
});