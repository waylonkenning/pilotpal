import { test, expect } from '@playwright/test'

test.describe('Enhanced Financial Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show comprehensive financial dashboard', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    
    // Should show total spent and budget remaining
    await expect(page.locator('[data-testid="total-spent"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="budget-remaining"]'))
      .toContainText('$30,000')
    
    // Should show cost breakdown by category
    await expect(page.locator('[data-testid="flight-training-costs"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="theory-exam-costs"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="medical-cert-costs"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="equipment-costs"]'))
      .toBeVisible()
  })

  test('should allow detailed expense categorization', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="add-expense-button"]')
    
    // Should show expense categories
    await expect(page.locator('[data-testid="expense-category-select"]'))
      .toBeVisible()
    
    // Test flight training expense
    await page.selectOption('[data-testid="expense-category-select"]', 'flight-training')
    await page.fill('[data-testid="expense-amount"]', '180')
    await page.fill('[data-testid="expense-description"]', 'Lesson 5 - Circuit training')
    await page.fill('[data-testid="expense-date"]', '2024-01-15')
    await page.click('[data-testid="save-expense-button"]')
    
    // Should appear in expense list
    await expect(page.locator('[data-testid="expense-item"]'))
      .toContainText('Flight Training')
    
    await expect(page.locator('[data-testid="expense-item"]'))
      .toContainText('$180')
      
    await expect(page.locator('[data-testid="expense-item"]'))
      .toContainText('Lesson 5 - Circuit training')
  })

  test('should provide cost forecasting based on progress', async ({ page }) => {
    // Complete a few lessons first
    await page.click('[data-testid="complete-lesson-button"]')
    await page.fill('[data-testid="lesson-hours-input"]', '1.5')
    await page.fill('[data-testid="lesson-cost-input"]', '180')
    await page.click('[data-testid="save-hours-button"]')
    
    await page.click('[data-testid="continue-to-next-lesson"]')
    
    // Navigate to financial forecasting
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="cost-forecast-tab"]')
    
    // Should show projected total cost
    await expect(page.locator('[data-testid="projected-total-cost"]'))
      .toContainText('$')
    
    // Should show remaining cost estimate
    await expect(page.locator('[data-testid="remaining-cost-estimate"]'))
      .toBeVisible()
    
    // Should show cost per hour average
    await expect(page.locator('[data-testid="cost-per-hour-average"]'))
      .toContainText('$120/hour')
    
    // Should show completion timeline estimate
    await expect(page.locator('[data-testid="completion-timeline"]'))
      .toContainText('months remaining')
  })

  test('should show budget planning with NZ cost ranges', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="budget-planner-tab"]')
    
    // Should show NZ PPL cost range
    await expect(page.locator('[data-testid="nz-ppl-cost-range"]'))
      .toContainText('$25,000 - $35,000')
    
    // Should show detailed cost breakdown
    await expect(page.locator('[data-testid="flight-training-budget"]'))
      .toContainText('$18,000 - $25,000')
      
    await expect(page.locator('[data-testid="theory-exam-budget"]'))
      .toContainText('$390')
      
    await expect(page.locator('[data-testid="medical-cert-budget"]'))
      .toContainText('$420 - $1,070')
    
    // Should allow custom budget setting
    await page.fill('[data-testid="custom-budget-input"]', '28000')
    await page.click('[data-testid="save-budget-button"]')
    
    await expect(page.locator('[data-testid="current-budget"]'))
      .toContainText('$28,000')
  })

  test('should provide student loan guidance for NZ students', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="funding-options-tab"]')
    
    // Should show StudyLink information
    await expect(page.locator('[data-testid="studylink-info"]'))
      .toBeVisible()
    
    await expect(page.locator('[data-testid="studylink-amount"]'))
      .toContainText('$35,000')
    
    // Should explain eligibility criteria
    await page.click('[data-testid="studylink-eligibility-info"]')
    await expect(page.locator('[data-testid="eligibility-criteria"]'))
      .toContainText('NZ citizen or resident')
    
    // Should show other funding options
    await expect(page.locator('[data-testid="private-loan-options"]'))
      .toBeVisible()
      
    await expect(page.locator('[data-testid="payment-plan-options"]'))
      .toBeVisible()
  })

  test('should compare costs between different flight schools', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="cost-comparison-tab"]')
    
    // Should show flight school comparison
    await expect(page.locator('[data-testid="school-comparison-table"]'))
      .toBeVisible()
    
    // Should show different hourly rates
    await expect(page.locator('[data-testid="school-hourly-rates"]'))
      .toContainText('per hour')
    
    // Should show total cost estimates
    await expect(page.locator('[data-testid="school-total-estimates"]'))
      .toBeVisible()
    
    // Should highlight cost differences
    await expect(page.locator('[data-testid="cost-difference"]'))
      .toContainText('Save up to')
  })

  test('should track payment timeline and milestones', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="payment-timeline-tab"]')
    
    // Should show payment milestones
    await expect(page.locator('[data-testid="payment-milestone"]'))
      .toBeVisible()
    
    // Should show upcoming payments
    await expect(page.locator('[data-testid="upcoming-payments"]'))
      .toContainText('Theory Exams')
    
    // Should allow payment scheduling
    await page.click('[data-testid="schedule-payment"]')
    await page.fill('[data-testid="payment-amount"]', '500')
    await page.fill('[data-testid="payment-date"]', '2024-02-01')
    await page.selectOption('[data-testid="payment-category"]', 'flight-training')
    await page.click('[data-testid="save-payment-schedule"]')
    
    // Should appear in timeline
    await expect(page.locator('[data-testid="scheduled-payment"]'))
      .toContainText('$500')
  })

  test('should provide financial progress visualization', async ({ page }) => {
    // Add some expenses first
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="add-expense-button"]')
    await page.selectOption('[data-testid="expense-category-select"]', 'flight-training')
    await page.fill('[data-testid="expense-amount"]', '180')
    await page.click('[data-testid="save-expense-button"]')
    
    // Check progress visualization
    await page.click('[data-testid="financial-progress-tab"]')
    
    // Should show spending progress bar
    await expect(page.locator('[data-testid="spending-progress-bar"]'))
      .toBeVisible()
    
    // Should show category breakdowns
    await expect(page.locator('[data-testid="category-spending-chart"]'))
      .toBeVisible()
    
    // Should show monthly spending trend
    await expect(page.locator('[data-testid="monthly-spending-trend"]'))
      .toBeVisible()
    
    // Should show cost efficiency metrics
    await expect(page.locator('[data-testid="cost-efficiency"]'))
      .toContainText('cost per hour')
  })

  test('should handle expense editing and deletion', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    
    // Add an expense
    await page.click('[data-testid="add-expense-button"]')
    await page.selectOption('[data-testid="expense-category-select"]', 'theory-exam')
    await page.fill('[data-testid="expense-amount"]', '65')
    await page.fill('[data-testid="expense-description"]', 'Air Law exam')
    await page.click('[data-testid="save-expense-button"]')
    
    // Edit the expense
    await page.click('[data-testid="edit-expense-button"]')
    await page.fill('[data-testid="expense-amount"]', '70')
    await page.click('[data-testid="save-expense-button"]')
    
    // Should show updated amount
    await expect(page.locator('[data-testid="expense-item"]'))
      .toContainText('$70')
    
    // Delete the expense
    await page.click('[data-testid="delete-expense-button"]')
    await page.click('[data-testid="confirm-delete"]')
    
    // Should no longer appear
    await expect(page.locator('[data-testid="expense-item"]'))
      .not.toBeVisible()
  })

  test('should export financial data', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    
    // Should have export options
    await expect(page.locator('[data-testid="export-financial-data"]'))
      .toBeVisible()
    
    // Test CSV export
    await page.click('[data-testid="export-csv"]')
    // Note: In real implementation, this would trigger a download
    
    // Test PDF report export
    await page.click('[data-testid="export-pdf-report"]')
    // Note: In real implementation, this would generate a PDF
    
    // Should show export confirmation
    await expect(page.locator('[data-testid="export-success"]'))
      .toContainText('exported successfully')
  })

  test('should provide tax deduction guidance for training costs', async ({ page }) => {
    await page.click('[data-testid="finances-tab"]')
    await page.click('[data-testid="tax-info-tab"]')
    
    // Should show tax deduction information
    await expect(page.locator('[data-testid="tax-deduction-info"]'))
      .toBeVisible()
    
    // Should explain deductible vs non-deductible costs
    await expect(page.locator('[data-testid="deductible-costs"]'))
      .toContainText('Training costs may be deductible')
    
    // Should provide IRD guidance links
    await expect(page.locator('[data-testid="ird-guidance"]'))
      .toBeVisible()
    
    // Should calculate potential deductions
    await page.fill('[data-testid="income-level"]', '50000')
    await page.click('[data-testid="calculate-deductions"]')
    
    await expect(page.locator('[data-testid="potential-deduction"]'))
      .toContainText('$')
  })
})