import { test, expect } from '@playwright/test';

test.describe('Journey Timeline Visualization', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Create a user and get to dashboard
    await page.goto('/');
    await page.click('[data-testid="get-started-button"]');
    await page.fill('[data-testid="name-input"]', 'Test Pilot');
    await page.click('[data-testid="start-journey-button"]');
  });

  test('should navigate to journey timeline from dashboard', async ({ page }) => {
    // Click on Journey Map navigation
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should navigate to journey page
    await expect(page).toHaveURL(/.*journey/);
    
    // Should show journey timeline
    await expect(page.locator('[data-testid="journey-timeline"]'))
      .toBeVisible();
  });

  test('should display all five training phases', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should show all 5 phases
    await expect(page.locator('[data-testid="phase-foundation"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="phase-circuit"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="phase-navigation"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="phase-advanced"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="phase-certification"]'))
      .toBeVisible();
  });

  test('should show current position indicator at Foundation Phase for new user', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should highlight Foundation Phase as current
    await expect(page.locator('[data-testid="phase-foundation"]'))
      .toHaveClass(/bg-blue-100/);
    
    // Should show current position indicator
    await expect(page.locator('[data-testid="current-position-indicator"]'))
      .toBeVisible();
    
    // Should show 0 hours completed
    await expect(page.locator('[data-testid="hours-completed"]'))
      .toContainText('0.0 hours');
  });

  test('should display phase details when phase is clicked', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Click on Foundation Phase
    await page.click('[data-testid="phase-foundation"]');
    
    // Should show phase details modal/panel
    await expect(page.locator('[data-testid="phase-details"]'))
      .toBeVisible();
    
    // Should show phase information
    await expect(page.locator('[data-testid="phase-details-title"]'))
      .toContainText('Foundation Phase');
    await expect(page.locator('[data-testid="phase-details-hours"]'))
      .toContainText('0-15 hours');
    await expect(page.locator('[data-testid="phase-details-description"]'))
      .toContainText('Basic aircraft control');
  });

  test('should show phase milestones and their completion status', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    await page.click('[data-testid="phase-foundation"]');
    
    // Should show milestones list
    await expect(page.locator('[data-testid="phase-milestones"]'))
      .toBeVisible();
    
    // Should show individual milestones in the phase details modal
    await expect(page.locator('[data-testid="phase-details"] [data-testid="milestone-first-flight"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="phase-details"] [data-testid="milestone-controls-master"]'))
      .toBeVisible();
    
    // Milestones should be incomplete initially
    await expect(page.locator('[data-testid="phase-details"] [data-testid="milestone-first-flight"]'))
      .toHaveClass(/incomplete/);
  });

  test('should update current position when user logs flight hours', async ({ page }) => {
    // Log some flight hours to move out of Foundation Phase
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="dual-hours-input"]', '18.0');
    // Wait for modal to be fully rendered and stable
    await page.waitForSelector('[data-testid="save-flight-button"]', { state: 'visible' });
    await page.evaluate(() => {
      const button = document.querySelector('[data-testid="save-flight-button"]');
      if (button) button.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(500);
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    // Go to journey timeline
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should now highlight Circuit Phase as current (15-25 hours)
    await expect(page.locator('[data-testid="phase-circuit"]'))
      .toHaveClass(/current/);
    
    // Foundation phase should be completed
    await expect(page.locator('[data-testid="phase-foundation"]'))
      .toHaveClass(/completed/);
    
    // Should show updated hours
    await expect(page.locator('[data-testid="hours-completed"]'))
      .toContainText('18.0 hours');
  });

  test('should show progress bar within current phase', async ({ page }) => {
    // Log 8 hours (middle of Foundation Phase)
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="dual-hours-input"]', '8.0');
    // Wait for modal to be fully rendered and stable
    await page.waitForSelector('[data-testid="save-flight-button"]', { state: 'visible' });
    await page.evaluate(() => {
      const button = document.querySelector('[data-testid="save-flight-button"]');
      if (button) button.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(500);
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should show progress bar within Foundation Phase
    await expect(page.locator('[data-testid="phase-progress-bar"]'))
      .toBeVisible();
    
    // Progress should be roughly 50% (8 out of 15 hours)
    const progressBar = page.locator('[data-testid="phase-progress-bar"]');
    await expect(progressBar).toHaveAttribute('style', /width.*53/); // 8/15 ≈ 53%
  });

  test('should display estimated time to next phase', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should show time estimate to next phase
    await expect(page.locator('[data-testid="time-to-next-phase"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="time-to-next-phase"]'))
      .toContainText('15 hours to Circuit Phase');
  });

  test('should show overall journey progress', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should show overall progress
    await expect(page.locator('[data-testid="overall-progress"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="overall-progress-text"]'))
      .toContainText('0% complete');
    
    // Should show total hours requirement
    await expect(page.locator('[data-testid="total-hours-requirement"]'))
      .toContainText('50');
  });

  test('should display upcoming milestones section', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should show next 3 upcoming milestones
    await expect(page.locator('[data-testid="upcoming-milestones"]'))
      .toBeVisible();
    
    // Should show milestone previews
    await expect(page.locator('[data-testid="upcoming-milestone-1"]'))
      .toContainText('First Flight');
    await expect(page.locator('[data-testid="upcoming-milestone-2"]'))
      .toContainText('Controls Master');
  });

  test('should allow filtering timeline by milestone type', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should show filter options
    await expect(page.locator('[data-testid="timeline-filters"]'))
      .toBeVisible();
    
    // Click on Flight Milestones filter
    await page.click('[data-testid="filter-flight-milestones"]');
    
    // Should show only flight-related milestones (this is in the upcoming milestones section)
    await expect(page.locator('[data-testid="upcoming-milestone-1"]'))
      .toBeVisible();
    
    // Phase should still be visible when filtering
    await expect(page.locator('[data-testid="phase-foundation"]'))
      .toBeVisible();
  });

  test('should show completed milestones with achievement date', async ({ page }) => {
    // First log flight hours to unlock First Flight badge
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="dual-hours-input"]', '0.5');
    // Wait for modal to be fully rendered and stable
    await page.waitForSelector('[data-testid="save-flight-button"]', { state: 'visible' });
    await page.evaluate(() => {
      const button = document.querySelector('[data-testid="save-flight-button"]');
      if (button) button.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(500);
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    await page.click('[data-testid="journey-nav-link"]');
    
    // First Flight milestone should now be completed
    await expect(page.locator('[data-testid="milestone-first-flight"]'))
      .toHaveClass(/completed/);
    
    // Should show completion date
    await expect(page.locator('[data-testid="milestone-first-flight-date"]'))
      .toBeVisible();
  });

  test('should display cost tracking within phase details', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Click on Foundation Phase to open details modal
    await page.click('[data-testid="phase-foundation"]');
    
    // Should show cost information in modal
    await expect(page.locator('[data-testid="cost-tracking"]'))
      .toBeVisible();
    
    // Should show estimated cost for current phase
    await expect(page.locator('[data-testid="phase-cost-estimate"]'))
      .toContainText('$');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.click('[data-testid="journey-nav-link"]');
    
    // Timeline should be visible and usable on mobile
    await expect(page.locator('[data-testid="journey-timeline"]'))
      .toBeVisible();
    
    // Should allow scrolling horizontally on mobile
    await expect(page.locator('[data-testid="timeline-scroll-container"]'))
      .toBeVisible();
  });

  test('should return to dashboard from timeline', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Should have back to dashboard button/link
    await page.click('[data-testid="back-to-dashboard"]');
    
    // Should return to dashboard
    await expect(page.locator('[data-testid="user-greeting"]'))
      .toBeVisible();
  });

  test('should show requirements for upcoming phases', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // Click on Circuit Phase (future phase)
    await page.click('[data-testid="phase-circuit"]');
    
    // Should show requirements to unlock this phase
    await expect(page.locator('[data-testid="phase-requirements"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="phase-requirements"]'))
      .toContainText('Complete 15 more hours');
  });

  test('should highlight current milestone based on hours', async ({ page }) => {
    await page.click('[data-testid="journey-nav-link"]');
    
    // For new user (0 hours), next milestone should be First Flight
    await expect(page.locator('[data-testid="current-milestone"]'))
      .toContainText('First Flight');
    
    // Log hours to unlock First Flight and move to next milestone
    await page.click('[data-testid="back-to-dashboard"]');
    await page.click('text=📝 Log Flight Hours');
    await page.fill('[data-testid="dual-hours-input"]', '3.0');
    // Wait for modal to be fully rendered and stable
    await page.waitForSelector('[data-testid="save-flight-button"]', { state: 'visible' });
    await page.evaluate(() => {
      const button = document.querySelector('[data-testid="save-flight-button"]');
      if (button) button.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(500);
    await page.locator('[data-testid="save-flight-button"]').click({ force: true });
    
    await page.click('[data-testid="journey-nav-link"]');
    
    // Current milestone should now be Controls Master
    await expect(page.locator('[data-testid="current-milestone"]'))
      .toContainText('Controls Master');
  });
});