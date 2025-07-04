import { test, expect } from '@playwright/test'

test.describe('Requirement Information Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    
    // Quick setup to main app
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
  })

  test('should show requirement info modal when clicking info button', async ({ page }) => {
    // Look for upcoming requirements section
    await expect(page.locator('[data-testid="upcoming-requirements"]')).toBeVisible()
    
    // Look for theory exams requirement info button
    const theoryExamInfoButton = page.locator('[data-testid="theory-exams-info"]')
    
    // If theory exams requirement is visible, test the info button
    if (await theoryExamInfoButton.isVisible()) {
      await theoryExamInfoButton.click()
      
      // Should show requirement info modal
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toBeVisible()
      
      // Should show theory exam details
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toContainText('Theory')
      await expect(page.locator('[data-testid="requirement-details-list"]')).toBeVisible()
      await expect(page.locator('[data-testid="requirement-next-steps"]')).toBeVisible()
      await expect(page.locator('[data-testid="requirement-cost"]')).toBeVisible()
      await expect(page.locator('[data-testid="requirement-timeframe"]')).toBeVisible()
      
      // Should show detailed requirements
      await expect(page.locator('[data-testid="requirement-details-list"]')).toContainText('Air Law')
      await expect(page.locator('[data-testid="requirement-details-list"]')).toContainText('Navigation')
      await expect(page.locator('[data-testid="requirement-cost"]')).toContainText('$65 per exam')
      
      // Should be able to close the modal
      await page.click('button:has-text("Close")')
      await expect(page.locator('[data-testid="requirement-info-modal"]')).not.toBeVisible()
    }
  })

  test('should show medical certificate info modal when clicking info button', async ({ page }) => {
    // Ensure medical certificate requirement is visible by having no medical cert
    await page.evaluate(() => {
      const progress = {
        currentLesson: 10,
        flightHours: { total: 10, dual: 10, solo: 0, crossCountry: 0, instrument: 0, terrainAwareness: 0, night: 0 },
        medicalCertificate: null, // No medical certificate
        theoryExams: {
          airLaw: { attempts: [], passed: false },
          navigation: { attempts: [], passed: false },
          technicalKnowledge: { attempts: [], passed: false },
          humanFactors: { attempts: [], passed: false },
          meteorology: { attempts: [], passed: false },
          radioTelephony: { attempts: [], passed: false }
        },
        achievements: [],
        totalSpent: 0,
        expenses: [],
        demonstratedSkills: {},
        completedLessons: []
      }
      localStorage.setItem('ppl-quest-progress', JSON.stringify(progress))
    })
    
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Look for medical certificate requirement info button
    const medicalInfoButton = page.locator('[data-testid="medical-cert-info"]')
    
    if (await medicalInfoButton.isVisible()) {
      await medicalInfoButton.click()
      
      // Should show requirement info modal
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toBeVisible()
      
      // Should show medical certificate details
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toContainText('Medical Certificate')
      await expect(page.locator('[data-testid="requirement-details-list"]')).toContainText('Class 2')
      await expect(page.locator('[data-testid="requirement-details-list"]')).toContainText('DL9')
      await expect(page.locator('[data-testid="requirement-cost"]')).toContainText('$420')
      
      // Should be able to close the modal
      await page.click('button:has-text("Close")')
      await expect(page.locator('[data-testid="requirement-info-modal"]')).not.toBeVisible()
    }
  })

  test('should show solo endorsement info modal when clicking info button', async ({ page }) => {
    // Set up conditions for solo endorsement requirement
    await page.evaluate(() => {
      const progress = {
        currentLesson: 12,
        flightHours: { total: 10, dual: 10, solo: 0, crossCountry: 0, instrument: 0, terrainAwareness: 0, night: 0 },
        medicalCertificate: { type: 'Class 2', expiryDate: '2025-12-31' },
        theoryExams: {
          airLaw: { attempts: [], passed: false },
          navigation: { attempts: [], passed: false },
          technicalKnowledge: { attempts: [], passed: false },
          humanFactors: { attempts: [], passed: false },
          meteorology: { attempts: [], passed: false },
          radioTelephony: { attempts: [], passed: false }
        },
        achievements: [],
        totalSpent: 0,
        expenses: [],
        demonstratedSkills: {},
        completedLessons: [1,2,3,4,5,6,7,8,9]
      }
      localStorage.setItem('ppl-quest-progress', JSON.stringify(progress))
    })
    
    await page.reload()
    await page.click('[data-testid="start-journey-button"]')
    await page.click('[data-testid="continue-to-app"]')
    
    // Look for solo endorsement requirement info button
    const soloInfoButton = page.locator('[data-testid="solo-endorsement-info"]')
    
    if (await soloInfoButton.isVisible()) {
      await soloInfoButton.click()
      
      // Should show requirement info modal
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toBeVisible()
      
      // Should show solo endorsement details
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toContainText('Solo Flight Endorsement')
      await expect(page.locator('[data-testid="requirement-details-list"]')).toContainText('consistent safe flying')
      await expect(page.locator('[data-testid="requirement-details-list"]')).toContainText('circuit pattern')
      await expect(page.locator('[data-testid="requirement-timeframe"]')).toContainText('10-15 hours')
      
      // Should be able to close the modal
      await page.click('button:has-text("Close")')
      await expect(page.locator('[data-testid="requirement-info-modal"]')).not.toBeVisible()
    }
  })

  test('should handle modal closing with escape key', async ({ page }) => {
    // Look for any info button and click it
    const infoButtons = page.locator('[data-testid*="-info"]')
    const buttonCount = await infoButtons.count()
    
    if (buttonCount > 0) {
      await infoButtons.first().click()
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toBeVisible()
      
      // Press escape to close
      await page.keyboard.press('Escape')
      await expect(page.locator('[data-testid="requirement-info-modal"]')).not.toBeVisible()
    }
  })

  test('should handle modal closing by clicking overlay', async ({ page }) => {
    // Look for any info button and click it
    const infoButtons = page.locator('[data-testid*="-info"]')
    const buttonCount = await infoButtons.count()
    
    if (buttonCount > 0) {
      await infoButtons.first().click()
      await expect(page.locator('[data-testid="requirement-info-modal"]')).toBeVisible()
      
      // Click overlay to close (not the modal content)
      await page.locator('.modal-overlay').click({ position: { x: 10, y: 10 } })
      await expect(page.locator('[data-testid="requirement-info-modal"]')).not.toBeVisible()
    }
  })
})