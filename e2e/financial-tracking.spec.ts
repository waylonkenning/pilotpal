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

  test('should handle expense editing and updating', async ({ page }) => {
    // Navigate to finances
    await page.click('[data-testid="finances-tab"]')
    
    // Add an expense first
    await page.click('[data-testid="add-expense-button"]')
    await page.selectOption('[data-testid="expense-category-select"]', 'Flight Training')
    await page.fill('[data-testid="expense-amount-input"]', '150')
    await page.fill('[data-testid="expense-description-input"]', 'Initial lesson')
    await page.fill('[data-testid="expense-date-input"]', '2024-06-01')
    await page.click('[data-testid="save-expense-button"]')
    
    // Edit the expense
    await page.click('[data-testid="expense-item"]:first-child [data-testid="edit-expense-button"]')
    
    // Update the amount
    await page.fill('[data-testid="expense-amount-input"]', '175')
    await page.fill('[data-testid="expense-description-input"]', 'Updated lesson cost')
    await page.click('[data-testid="save-expense-button"]')
    
    // Should show updated amount
    await expect(page.locator('[data-testid="expense-item"]:first-child'))
      .toContainText('$175')
    
    // Should show updated description
    await expect(page.locator('[data-testid="expense-item"]:first-child'))
      .toContainText('Updated lesson cost')
    
    // Total should reflect the change
    await expect(page.locator('[data-testid="total-spent"]'))
      .toContainText('175')
  })

  test('should handle expense deletion with confirmation', async ({ page }) => {
    // Navigate to finances
    await page.click('[data-testid="finances-tab"]')
    
    // Add an expense first
    await page.click('[data-testid="add-expense-button"]')
    await page.selectOption('[data-testid="expense-category-select"]', 'Equipment')
    await page.fill('[data-testid="expense-amount-input"]', '250')
    await page.fill('[data-testid="expense-description-input"]', 'Headset purchase')
    await page.fill('[data-testid="expense-date-input"]', '2024-06-05')
    await page.click('[data-testid="save-expense-button"]')
    
    // Delete the expense
    await page.click('[data-testid="expense-item"]:first-child [data-testid="delete-expense-button"]')
    
    // Should show confirmation dialog
    await expect(page.locator('[data-testid="delete-confirmation"]'))
      .toBeVisible()
    
    // Confirm deletion
    await page.click('[data-testid="confirm-delete-expense"]')
    
    // Expense should be removed
    await expect(page.locator('[data-testid="expense-item"]'))
      .toHaveCount(0)
    
    // Total should reflect the change
    await expect(page.locator('[data-testid="total-spent"]'))
      .toContainText('0')
  })

  test('should export financial data in CSV and PDF formats', async ({ page }) => {
    // Navigate to finances
    await page.click('[data-testid="finances-tab"]')
    
    // Add some expenses for export
    const expenses = [
      { category: 'Flight Training', amount: '150', description: 'Lesson 1' },
      { category: 'Theory Exams', amount: '65', description: 'Air Law exam' },
      { category: 'Medical Certificate', amount: '200', description: 'DL9 medical' }
    ]
    
    for (const expense of expenses) {
      await page.click('[data-testid="add-expense-button"]')
      await page.selectOption('[data-testid="expense-category-select"]', expense.category)
      await page.fill('[data-testid="expense-amount-input"]', expense.amount)
      await page.fill('[data-testid="expense-description-input"]', expense.description)
      await page.fill('[data-testid="expense-date-input"]', '2024-06-01')
      await page.click('[data-testid="save-expense-button"]')
    }
    
    // Export as CSV
    await page.click('[data-testid="export-csv"]')
    
    // Should show export success message
    await expect(page.locator('[data-testid="export-success"]'))
      .toBeVisible()
    
    // Should show success message content
    await expect(page.locator('[data-testid="export-success"]'))
      .toContainText('Data exported successfully')
    
    // Wait for success message to disappear
    await page.waitForTimeout(1000)
    
    // Export as PDF
    await page.click('[data-testid="export-pdf-report"]')
    
    // Should show export success message again
    await expect(page.locator('[data-testid="export-success"]'))
      .toBeVisible()
  })

  test('should validate expense input and show appropriate errors', async ({ page }) => {
    // Navigate to finances
    await page.click('[data-testid="finances-tab"]')
    
    // Try to add expense with missing required fields
    await page.click('[data-testid="add-expense-button"]')
    
    // Leave amount empty and try to save
    await page.selectOption('[data-testid="expense-category-select"]', 'Flight Training')
    await page.fill('[data-testid="expense-description-input"]', 'Test expense')
    await page.click('[data-testid="save-expense-button"]')
    
    // Should show validation error for missing amount
    await expect(page.locator('[data-testid="expense-form"] .error'))
      .toBeVisible()
    
    // Test with valid data
    await page.fill('[data-testid="expense-amount-input"]', '100')
    await page.fill('[data-testid="expense-date-input"]', '2024-06-01')
    await page.click('[data-testid="save-expense-button"]')
    
    // Should successfully save
    await expect(page.locator('[data-testid="expense-item"]'))
      .toHaveCount(1)
  })

  test('should calculate and display accurate spending by category', async ({ page }) => {
    // Navigate to finances
    await page.click('[data-testid="finances-tab"]')
    
    // Add expenses across different categories
    const expensesByCategory = [
      { category: 'Flight Training', amount: '1500', description: 'Multiple lessons' },
      { category: 'Flight Training', amount: '800', description: 'More lessons' },
      { category: 'Theory Exams', amount: '390', description: 'All 6 exams' },
      { category: 'Equipment', amount: '250', description: 'Headset and charts' }
    ]
    
    for (const expense of expensesByCategory) {
      await page.click('[data-testid="add-expense-button"]')
      await page.selectOption('[data-testid="expense-category-select"]', expense.category)
      await page.fill('[data-testid="expense-amount-input"]', expense.amount)
      await page.fill('[data-testid="expense-description-input"]', expense.description)
      await page.fill('[data-testid="expense-date-input"]', '2024-06-01')
      await page.click('[data-testid="save-expense-button"]')
    }
    
    // Should show correct category totals
    await expect(page.locator('[data-testid="flight-training-costs"]'))
      .toContainText('2,300') // $1500 + $800
    
    await expect(page.locator('[data-testid="theory-exam-costs"]'))
      .toContainText('390')
    
    await expect(page.locator('[data-testid="equipment-costs"]'))
      .toContainText('250')
    
    // Should show correct total
    await expect(page.locator('[data-testid="total-spent"]'))
      .toContainText('2,940') // $2300 + $390 + $250
  })
})