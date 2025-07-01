import { test, expect } from '@playwright/test';

test.describe('Basic Dashboard', () => {
  test('should display welcome message for new user', async ({ page }) => {
    await page.goto('/');
    
    // Should show welcome message
    await expect(page.locator('[data-testid="welcome-message"]'))
      .toContainText('Welcome to your PPL Journey');
    
    // Should show get started button
    await expect(page.locator('[data-testid="get-started-button"]'))
      .toBeVisible();
  });

  test('should allow user to enter their name and start journey', async ({ page }) => {
    await page.goto('/');
    
    // Click get started
    await page.click('[data-testid="get-started-button"]');
    
    // Should show name input form
    await expect(page.locator('[data-testid="name-input"]'))
      .toBeVisible();
    
    // Enter name
    await page.fill('[data-testid="name-input"]', 'John Pilot');
    await page.click('[data-testid="start-journey-button"]');
    
    // Should show dashboard with user name
    await expect(page.locator('[data-testid="user-greeting"]'))
      .toContainText('Hello, John Pilot');
  });

  test('should display progress overview cards', async ({ page }) => {
    // Setup: Create user with some progress
    await page.goto('/');
    await page.click('[data-testid="get-started-button"]');
    await page.fill('[data-testid="name-input"]', 'Test Pilot');
    await page.click('[data-testid="start-journey-button"]');
    
    // Should show flight hours card
    await expect(page.locator('[data-testid="flight-hours-card"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="total-hours"]'))
      .toContainText('0.0');
    
    // Should show current phase card
    await expect(page.locator('[data-testid="current-phase-card"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="current-phase"]'))
      .toContainText('Foundation Phase');
    
    // Should show achievements card
    await expect(page.locator('[data-testid="achievements-card"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="achievements-count"]'))
      .toContainText('0 of 27');
  });

  test('should display next milestone information', async ({ page }) => {
    // Setup user
    await page.goto('/');
    await page.click('[data-testid="get-started-button"]');
    await page.fill('[data-testid="name-input"]', 'Test Pilot');
    await page.click('[data-testid="start-journey-button"]');
    
    // Should show next milestone
    await expect(page.locator('[data-testid="next-milestone-card"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="next-milestone-title"]'))
      .toContainText('First Flight');
    await expect(page.locator('[data-testid="next-milestone-description"]'))
      .toContainText('Complete your introductory flight');
  });

  test('should have working navigation to other sections', async ({ page }) => {
    // Setup user
    await page.goto('/');
    await page.click('[data-testid="get-started-button"]');
    await page.fill('[data-testid="name-input"]', 'Test Pilot');
    await page.click('[data-testid="start-journey-button"]');
    
    // Should have journey map link
    await expect(page.locator('[data-testid="journey-nav-link"]'))
      .toBeVisible();
    
    // Should have achievements link
    await expect(page.locator('[data-testid="achievements-nav-link"]'))
      .toBeVisible();
    
    // Should have progress tracking link
    await expect(page.locator('[data-testid="progress-nav-link"]'))
      .toBeVisible();
  });

  test('should persist user data across sessions', async ({ page }) => {
    // First visit - create user
    await page.goto('/');
    await page.click('[data-testid="get-started-button"]');
    await page.fill('[data-testid="name-input"]', 'Persistent Pilot');
    await page.click('[data-testid="start-journey-button"]');
    
    // Reload page
    await page.reload();
    
    // Should still show user dashboard (not welcome screen)
    await expect(page.locator('[data-testid="user-greeting"]'))
      .toContainText('Hello, Persistent Pilot');
    
    // Should not show welcome message
    await expect(page.locator('[data-testid="welcome-message"]'))
      .not.toBeVisible();
  });
});