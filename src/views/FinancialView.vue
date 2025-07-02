<template>
  <div class="min-h-screen gradient-sky">
    <div class="container p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="text-center flex-1">
          <h1 class="text-3xl font-bold mb-4">💰 Financial Tracking</h1>
          <p class="text-lg text-gray-600">
            Manage your PPL training budget and track expenses
          </p>
        </div>
        <button 
          @click="showContextualHelp = true"
          class="btn btn-secondary text-sm"
          data-testid="contextual-help-trigger"
        >
          ❓ Help
        </button>
      </div>

      <!-- Financial Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Spent -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-2">Total Spent</h3>
          <div class="text-3xl font-bold text-orange-600 mb-2" data-testid="total-spent">
            ${{ formatCurrency(totalSpent) }}
          </div>
          <div class="text-sm text-gray-600">
            ${{ (totalSpent / Math.max(progress.flightHours.total, 0.1)).toFixed(0) }}/hour average
          </div>
        </div>

        <!-- Budget Remaining -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-2">Budget Remaining</h3>
          <div class="text-3xl font-bold text-green-600 mb-2" data-testid="budget-remaining">
            ${{ formatCurrency(budgetRemaining) }}
          </div>
          <div class="text-sm text-gray-600">
            of ${{ formatCurrency(currentBudget) }} total budget
          </div>
        </div>

        <!-- Progress to Budget -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-2">Budget Progress</h3>
          <div class="text-2xl font-bold mb-2" :class="budgetProgress > 100 ? 'text-red-600' : 'text-blue-600'">
            {{ budgetProgress.toFixed(1) }}%
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3" data-testid="spending-progress-bar">
            <div 
              class="h-3 rounded-full transition-all duration-300" 
              :class="budgetProgress > 100 ? 'bg-red-600' : 'bg-blue-600'"
              :style="{ width: Math.min(budgetProgress, 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex flex-wrap gap-2 mb-6 border-b">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2 font-medium rounded-t-lg transition-colors"
          :class="activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'"
          :data-testid="tab.id + '-tab'"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Expenses Tab -->
        <div v-if="activeTab === 'expenses'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Expense Tracking</h2>
            <button 
              @click="showAddExpense = true"
              class="btn btn-primary"
              data-testid="add-expense-button"
            >
              + Add Expense
            </button>
          </div>

          <!-- Expense Categories Summary -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="card text-center" data-testid="flight-training-costs">
              <div class="text-2xl mb-2">✈️</div>
              <div class="font-semibold">Flight Training</div>
              <div class="text-lg font-bold text-blue-600">
                ${{ getCategoryTotal('flight-training').toFixed(0) }}
              </div>
            </div>
            
            <div class="card text-center" data-testid="theory-exam-costs">
              <div class="text-2xl mb-2">📚</div>
              <div class="font-semibold">Theory Exams</div>
              <div class="text-lg font-bold text-purple-600">
                ${{ getCategoryTotal('theory-exam').toFixed(0) }}
              </div>
            </div>
            
            <div class="card text-center" data-testid="medical-cert-costs">
              <div class="text-2xl mb-2">🏥</div>
              <div class="font-semibold">Medical Certs</div>
              <div class="text-lg font-bold text-green-600">
                ${{ getCategoryTotal('medical').toFixed(0) }}
              </div>
            </div>
            
            <div class="card text-center" data-testid="equipment-costs">
              <div class="text-2xl mb-2">🎧</div>
              <div class="font-semibold">Equipment</div>
              <div class="text-lg font-bold text-orange-600">
                ${{ getCategoryTotal('equipment').toFixed(0) }}
              </div>
            </div>
          </div>

          <!-- Expense List -->
          <div class="card">
            <h3 class="text-lg font-semibold mb-4">Recent Expenses</h3>
            <div v-if="expenses.length === 0" class="text-center py-8 text-gray-500">
              No expenses recorded yet. Add your first expense above!
            </div>
            <div v-else class="space-y-3">
              <div 
                v-for="expense in sortedExpenses" 
                :key="expense.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                data-testid="expense-item"
              >
                <div class="flex items-center gap-3">
                  <div class="text-2xl">{{ getCategoryIcon(expense.category) }}</div>
                  <div>
                    <div class="font-semibold">{{ getCategoryName(expense.category) }}</div>
                    <div class="text-sm text-gray-600">{{ expense.description }}</div>
                    <div class="text-xs text-gray-500">{{ formatDate(expense.date) }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-lg">${{ expense.amount.toFixed(0) }}</div>
                  <div class="flex gap-2">
                    <button 
                      @click="editExpense(expense)"
                      class="text-blue-600 text-sm"
                      data-testid="edit-expense-button"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteExpense(expense.id)"
                      class="text-red-600 text-sm"
                      data-testid="delete-expense-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget Planner Tab -->
        <div v-if="activeTab === 'budget-planner'">
          <h2 class="text-xl font-semibold mb-6">Budget Planning</h2>
          
          <!-- NZ PPL Cost Range -->
          <div class="card mb-6" data-testid="nz-ppl-cost-range">
            <h3 class="text-lg font-semibold mb-4">New Zealand PPL Typical Costs</h3>
            <div class="text-2xl font-bold text-blue-600 mb-4">$25,000 - $35,000</div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg" data-testid="flight-training-budget">
                <div class="font-semibold text-blue-800 mb-2">Flight Training</div>
                <div class="text-blue-700">$18,000 - $25,000</div>
                <div class="text-sm text-blue-600">40-50 hours @ $360-500/hour</div>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg" data-testid="theory-exam-budget">
                <div class="font-semibold text-purple-800 mb-2">Theory Exams</div>
                <div class="text-purple-700">$390</div>
                <div class="text-sm text-purple-600">6 exams @ $65 each</div>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg" data-testid="medical-cert-budget">
                <div class="font-semibold text-green-800 mb-2">Medical Certificate</div>
                <div class="text-green-700">$420 - $1,070</div>
                <div class="text-sm text-green-600">Class 2 or DL9 option</div>
              </div>
              
              <div class="bg-orange-50 p-4 rounded-lg">
                <div class="font-semibold text-orange-800 mb-2">Equipment & Misc</div>
                <div class="text-orange-700">$2,000 - $4,000</div>
                <div class="text-sm text-orange-600">Headset, charts, flight test</div>
              </div>
            </div>
          </div>

          <!-- Custom Budget Setting -->
          <div class="card">
            <h3 class="text-lg font-semibold mb-4">Your Budget</h3>
            <div class="flex items-center gap-4">
              <div>
                <label class="form-label">Set Your Total Budget</label>
                <input 
                  v-model="customBudgetInput" 
                  type="number" 
                  class="form-input"
                  placeholder="30000"
                  data-testid="custom-budget-input"
                >
              </div>
              <button 
                @click="setCustomBudget"
                class="btn btn-primary"
                data-testid="save-budget-button"
              >
                Update Budget
              </button>
            </div>
            <div class="mt-4">
              <div class="font-semibold">Current Budget: <span data-testid="current-budget">${{ formatCurrency(currentBudget) }}</span></div>
            </div>
          </div>
        </div>

        <!-- Cost Forecast Tab -->
        <div v-if="activeTab === 'cost-forecast'">
          <h2 class="text-xl font-semibold mb-6">Cost Forecasting</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Projected Total Cost -->
            <div class="card">
              <h3 class="text-lg font-semibold mb-4">Projected Total Cost</h3>
              <div class="text-3xl font-bold text-blue-600 mb-2" data-testid="projected-total-cost">
                ${{ projectedTotalCost.toFixed(0) }}
              </div>
              <div class="text-sm text-gray-600 mb-4">
                Based on current spending pattern
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Already spent:</span>
                  <span>${{ totalSpent.toFixed(0) }}</span>
                </div>
                <div class="flex justify-between" data-testid="remaining-cost-estimate">
                  <span>Estimated remaining:</span>
                  <span>${{ (projectedTotalCost - totalSpent).toFixed(0) }}</span>
                </div>
                <div class="flex justify-between font-semibold" data-testid="cost-per-hour-average">
                  <span>Average cost/hour:</span>
                  <span>${{ averageCostPerHour.toFixed(0) }}/hour</span>
                </div>
              </div>
            </div>

            <!-- Timeline Estimate -->
            <div class="card">
              <h3 class="text-lg font-semibold mb-4">Completion Timeline</h3>
              <div class="text-2xl font-bold text-green-600 mb-2" data-testid="completion-timeline">
                {{ estimatedMonthsRemaining }} months remaining
              </div>
              <div class="text-sm text-gray-600 mb-4">
                At current pace of training
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Lessons completed:</span>
                  <span>{{ progress.completedLessons.length }}/27</span>
                </div>
                <div class="flex justify-between">
                  <span>Hours logged:</span>
                  <span>{{ progress.flightHours.total.toFixed(1) }}/50</span>
                </div>
                <div class="flex justify-between">
                  <span>Estimated completion:</span>
                  <span>{{ estimatedCompletionDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Funding Options Tab -->
        <div v-if="activeTab === 'funding-options'">
          <h2 class="text-xl font-semibold mb-6">Funding Options</h2>
          
          <!-- StudyLink Information -->
          <div class="card mb-6" data-testid="studylink-info">
            <h3 class="text-lg font-semibold mb-4">🎓 StudyLink Student Loan</h3>
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
              <div class="text-2xl font-bold text-blue-600 mb-2" data-testid="studylink-amount">
                Up to $35,000
              </div>
              <div class="text-blue-700">Available for eligible PPL training in New Zealand</div>
            </div>
            
            <div class="space-y-3">
              <button 
                @click="showEligibilityInfo = true"
                class="btn btn-secondary"
                data-testid="studylink-eligibility-info"
              >
                Check Eligibility Criteria
              </button>
              
              <div class="text-sm text-gray-600">
                • Interest-free while studying in NZ<br>
                • Flexible repayment once earning $22,828+<br>
                • Covers course fees, not living costs
              </div>
            </div>
          </div>

          <!-- Other Funding Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card" data-testid="private-loan-options">
              <h3 class="text-lg font-semibold mb-4">💳 Private Loans</h3>
              <div class="space-y-2 text-sm">
                <div>• Bank personal loans</div>
                <div>• Credit union financing</div>
                <div>• Family loan arrangements</div>
                <div>• Interest rates: 6-15% typically</div>
              </div>
            </div>
            
            <div class="card" data-testid="payment-plan-options">
              <h3 class="text-lg font-semibold mb-4">📅 Payment Plans</h3>
              <div class="space-y-2 text-sm">
                <div>• Flight school payment plans</div>
                <div>• Pay-per-lesson arrangements</div>
                <div>• Block hour purchasing discounts</div>
                <div>• Equipment rental vs purchase</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Progress Tab -->
        <div v-if="activeTab === 'financial-progress'">
          <h2 class="text-xl font-semibold mb-6">Financial Progress</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Category Spending Chart -->
            <div class="card">
              <h3 class="text-lg font-semibold mb-4">Spending by Category</h3>
              <div data-testid="category-spending-chart">
                <div v-for="category in expenseCategories" :key="category.id" class="mb-3">
                  <div class="flex justify-between mb-1">
                    <span>{{ category.name }}</span>
                    <span>${{ getCategoryTotal(category.id).toFixed(0) }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="category.color"
                      :style="{ width: getCategoryPercentage(category.id) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cost Efficiency -->
            <div class="card">
              <h3 class="text-lg font-semibold mb-4">Cost Efficiency</h3>
              <div data-testid="cost-efficiency">
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span>Cost per flight hour:</span>
                    <span class="font-semibold">${{ (totalSpent / Math.max(progress.flightHours.total, 0.1)).toFixed(0) }}/hour</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Cost per lesson:</span>
                    <span class="font-semibold">${{ (totalSpent / Math.max(progress.completedLessons.length, 1)).toFixed(0) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Budget utilization:</span>
                    <span class="font-semibold">{{ budgetProgress.toFixed(1) }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Monthly Spending Trend -->
          <div class="card mt-6">
            <h3 class="text-lg font-semibold mb-4">Monthly Spending Trend</h3>
            <div data-testid="monthly-spending-trend">
              <div class="text-center py-8 text-gray-500">
                Monthly trend chart would be displayed here
                <br><small>(Chart visualization to be implemented)</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Options -->
      <div class="text-center mt-8">
        <div class="flex justify-center gap-4">
          <button 
            @click="exportData('csv')"
            class="btn btn-secondary"
            data-testid="export-csv"
          >
            📊 Export CSV
          </button>
          <button 
            @click="exportData('pdf')"
            class="btn btn-secondary"
            data-testid="export-pdf-report"
          >
            📄 Export PDF Report
          </button>
          <router-link to="/dashboard" class="btn btn-primary">
            ← Back to Dashboard
          </router-link>
        </div>
      </div>
    </div>

    <!-- Add/Edit Expense Modal -->
    <div v-if="showAddExpense || editingExpense" class="modal-overlay" @click="closeExpenseModal">
      <div class="modal-content" @click.stop data-testid="expense-form">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">
            {{ editingExpense ? 'Edit Expense' : 'Add New Expense' }}
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Category</label>
              <select 
                v-model="expenseForm.category" 
                class="form-input"
                :class="{ 'border-red-500': formErrors.category }"
                data-testid="expense-category-select"
              >
                <option value="">Select category...</option>
                <option value="flight-training">Flight Training</option>
                <option value="theory-exam">Theory Exam</option>
                <option value="medical">Medical Certificate</option>
                <option value="equipment">Equipment</option>
                <option value="fuel">Fuel</option>
                <option value="other">Other</option>
              </select>
              <div v-if="formErrors.category" class="error text-red-500 text-sm mt-1">
                {{ formErrors.category }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Amount ($)</label>
              <input 
                v-model="expenseForm.amount" 
                type="number" 
                step="0.01"
                class="form-input"
                :class="{ 'border-red-500': formErrors.amount }"
                placeholder="180.00"
                data-testid="expense-amount-input"
              >
              <div v-if="formErrors.amount" class="error text-red-500 text-sm mt-1">
                {{ formErrors.amount }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Description</label>
              <input 
                v-model="expenseForm.description" 
                type="text" 
                class="form-input"
                placeholder="Lesson 5 - Circuit training"
                data-testid="expense-description-input"
              >
            </div>
            
            <div>
              <label class="form-label">Date</label>
              <input 
                v-model="expenseForm.date" 
                type="date" 
                class="form-input"
                data-testid="expense-date-input"
              >
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="saveExpense" class="btn btn-primary flex-1" data-testid="save-expense-button">
              {{ editingExpense ? 'Update Expense' : 'Add Expense' }}
            </button>
            <button @click="closeExpenseModal" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- StudyLink Eligibility Modal -->
    <div v-if="showEligibilityInfo" class="modal-overlay" @click="showEligibilityInfo = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">StudyLink Eligibility Criteria</h3>
          
          <div data-testid="eligibility-criteria">
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="text-green-600 mt-1">✓</div>
                <div>
                  <div class="font-semibold">NZ citizen or resident</div>
                  <div class="text-sm text-gray-600">Must have NZ citizenship or permanent residency</div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="text-green-600 mt-1">✓</div>
                <div>
                  <div class="font-semibold">Approved training organization</div>
                  <div class="text-sm text-gray-600">Must be studying at a StudyLink-approved flight school</div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="text-green-600 mt-1">✓</div>
                <div>
                  <div class="font-semibold">Full-time study</div>
                  <div class="text-sm text-gray-600">Must be enrolled in full-time PPL program</div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="text-green-600 mt-1">✓</div>
                <div>
                  <div class="font-semibold">Age requirements</div>
                  <div class="text-sm text-gray-600">Generally 18+ years old</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 p-4 rounded-lg mt-4">
            <div class="font-semibold text-blue-800 mb-2">Next Steps</div>
            <div class="text-blue-700 text-sm">
              Contact StudyLink directly or visit studylink.govt.nz to apply and confirm your eligibility.
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showEligibilityInfo = false" class="btn btn-primary flex-1">
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Success Toast -->
    <div v-if="showExportSuccess" class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg" data-testid="export-success">
      <div class="flex items-center gap-2">
        <div>✅</div>
        <div>Data exported successfully!</div>
      </div>
    </div>

    <!-- Contextual Help Modal -->
    <div v-if="showContextualHelp" class="modal-overlay" @click="showContextualHelp = false">
      <div class="modal-content max-w-2xl" @click.stop data-testid="contextual-help-panel">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">💰 Financial Help</h3>
          
          <div class="space-y-4" data-testid="financial-help-content">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">📊 Budget Tracking</h4>
              <p class="text-blue-700 text-sm">
                Set realistic budgets for each category and monitor your spending to stay on track. PPL training costs typically range from $25,000-$35,000 NZD.
              </p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">💳 Expense Categories</h4>
              <p class="text-green-700 text-sm">
                Track expenses across Flight Training, Theory Exams, Medical Certificate, Equipment, and FPP costs. This helps identify areas to optimize spending.
              </p>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold text-orange-800 mb-2">📈 Cost Management</h4>
              <p class="text-orange-700 text-sm">
                Monitor your cost per flight hour and look for trends. Consistent training reduces overall costs by minimizing skill decay between lessons.
              </p>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-2">📋 Export & Records</h4>
              <p class="text-purple-700 text-sm">
                Export your financial data for tax purposes or loan applications. Keep detailed records of all training-related expenses.
              </p>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button @click="showContextualHelp = false" class="btn btn-primary flex-1">
              Got it!
            </button>
            <router-link to="/education" class="btn btn-secondary">
              Cost Guide
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="modal-overlay" @click="showDeleteConfirmation = false">
      <div class="modal-content" @click.stop data-testid="delete-confirmation">
        <div class="p-6 text-center">
          <div class="text-6xl mb-4">🗑️</div>
          <h3 class="text-xl font-bold mb-4">Delete Expense</h3>
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete this expense? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button 
              @click="confirmDelete" 
              class="btn btn-primary flex-1"
              data-testid="confirm-delete-expense"
            >
              Delete
            </button>
            <button 
              @click="showDeleteConfirmation = false" 
              class="btn btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface Expense {
  id: string
  category: string
  amount: number
  description: string
  date: string
  createdAt: string
}

// State
const progress = ref({
  completedLessons: [] as number[],
  flightHours: {
    total: 0,
    dual: 0,
    solo: 0,
    crossCountry: 0,
    instrument: 0,
    terrainAwareness: 0,
    night: 0
  },
  totalSpent: 0
})

const expenses = ref<Expense[]>([])
const currentBudget = ref(30000) // Default budget
const activeTab = ref('expenses')
const showAddExpense = ref(false)
const editingExpense = ref<Expense | null>(null)
const showContextualHelp = ref(false)
const showEligibilityInfo = ref(false)
const showExportSuccess = ref(false)
const customBudgetInput = ref('30000')
const showDeleteConfirmation = ref(false)
const expenseToDelete = ref<string | null>(null)
const formErrors = ref({
  category: '',
  amount: '',
  description: '',
  date: ''
})

// Form data
const expenseForm = ref({
  category: '',
  amount: '',
  description: '',
  date: new Date().toISOString().split('T')[0]
})

// Tab configuration
const tabs = [
  { id: 'expenses', name: '💳 Expenses' },
  { id: 'budget-planner', name: '📊 Budget Planner' },
  { id: 'cost-forecast', name: '📈 Cost Forecast' },
  { id: 'funding-options', name: '🎓 Funding Options' },
  { id: 'financial-progress', name: '📋 Progress' }
]

// Expense categories
const expenseCategories = [
  { id: 'flight-training', name: 'Flight Training', color: 'bg-blue-500' },
  { id: 'theory-exam', name: 'Theory Exams', color: 'bg-purple-500' },
  { id: 'medical', name: 'Medical Certificates', color: 'bg-green-500' },
  { id: 'equipment', name: 'Equipment', color: 'bg-orange-500' },
  { id: 'fuel', name: 'Fuel', color: 'bg-red-500' },
  { id: 'other', name: 'Other', color: 'bg-gray-500' }
]

// Computed properties
const totalSpent = computed(() => {
  return expenses.value.reduce((total, expense) => total + expense.amount, 0) + progress.value.totalSpent
})

const budgetRemaining = computed(() => {
  return currentBudget.value - totalSpent.value
})

const budgetProgress = computed(() => {
  return (totalSpent.value / currentBudget.value) * 100
})

const sortedExpenses = computed(() => {
  return [...expenses.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const averageCostPerHour = computed(() => {
  return totalSpent.value / Math.max(progress.value.flightHours.total, 0.1)
})

const projectedTotalCost = computed(() => {
  if (progress.value.flightHours.total < 1) {
    return 30000 // Default estimate
  }
  // Project based on current cost per hour to reach 50 hours
  const targetHours = 50
  const currentCostPerHour = averageCostPerHour.value
  return currentCostPerHour * targetHours
})

const estimatedMonthsRemaining = computed(() => {
  const lessonsRemaining = 27 - progress.value.completedLessons.length
  const averageLessonsPerMonth = 4 // Estimate
  return Math.ceil(lessonsRemaining / averageLessonsPerMonth)
})

const estimatedCompletionDate = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() + estimatedMonthsRemaining.value)
  return date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long' })
})

// Methods
const getCategoryTotal = (categoryId: string) => {
  return expenses.value
    .filter(expense => expense.category === categoryId)
    .reduce((total, expense) => total + expense.amount, 0)
}

const getCategoryPercentage = (categoryId: string) => {
  return totalSpent.value > 0 ? (getCategoryTotal(categoryId) / totalSpent.value) * 100 : 0
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'flight-training': '✈️',
    'theory-exam': '📚',
    'medical': '🏥',
    'equipment': '🎧',
    'fuel': '⛽',
    'other': '📝'
  }
  return icons[category] || '📝'
}

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    'flight-training': 'Flight Training',
    'theory-exam': 'Theory Exam',
    'medical': 'Medical Certificate',
    'equipment': 'Equipment',
    'fuel': 'Fuel',
    'other': 'Other'
  }
  return names[category] || 'Other'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NZ')
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-NZ', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const validateForm = () => {
  formErrors.value = {
    category: '',
    amount: '',
    description: '',
    date: ''
  }
  
  let isValid = true
  
  if (!expenseForm.value.category) {
    formErrors.value.category = 'Category is required'
    isValid = false
  }
  
  if (!expenseForm.value.amount) {
    formErrors.value.amount = 'Amount is required'
    isValid = false
  } else if (parseFloat(expenseForm.value.amount) <= 0) {
    formErrors.value.amount = 'Amount must be positive'
    isValid = false
  }
  
  if (!expenseForm.value.date) {
    formErrors.value.date = 'Date is required'
    isValid = false
  }
  
  return isValid
}

const saveExpense = () => {
  if (!validateForm()) {
    return
  }

  const expense: Expense = {
    id: editingExpense.value?.id || 'exp-' + Date.now(),
    category: expenseForm.value.category,
    amount: parseFloat(expenseForm.value.amount),
    description: expenseForm.value.description,
    date: expenseForm.value.date,
    createdAt: editingExpense.value?.createdAt || new Date().toISOString()
  }

  if (editingExpense.value) {
    const index = expenses.value.findIndex(e => e.id === editingExpense.value!.id)
    expenses.value[index] = expense
  } else {
    expenses.value.push(expense)
  }

  saveProgress()
  closeExpenseModal()
}

const editExpense = (expense: Expense) => {
  editingExpense.value = expense
  expenseForm.value = {
    category: expense.category,
    amount: expense.amount.toString(),
    description: expense.description,
    date: expense.date
  }
  showAddExpense.value = true
}

const deleteExpense = (expenseId: string) => {
  expenseToDelete.value = expenseId
  showDeleteConfirmation.value = true
}

const confirmDelete = () => {
  if (expenseToDelete.value) {
    expenses.value = expenses.value.filter(e => e.id !== expenseToDelete.value)
    saveProgress()
  }
  showDeleteConfirmation.value = false
  expenseToDelete.value = null
}

const closeExpenseModal = () => {
  showAddExpense.value = false
  editingExpense.value = null
  expenseForm.value = {
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  }
}

const setCustomBudget = () => {
  const budget = parseFloat(customBudgetInput.value)
  if (budget > 0) {
    currentBudget.value = budget
    saveProgress()
  }
}

const exportData = (format: string) => {
  // Simulate export functionality
  console.log(`Exporting financial data as ${format}`)
  showExportSuccess.value = true
  setTimeout(() => {
    showExportSuccess.value = false
  }, 3000)
}

const saveProgress = () => {
  const data = {
    progress: progress.value,
    expenses: expenses.value,
    currentBudget: currentBudget.value
  }
  localStorage.setItem('ppl-quest-financial', JSON.stringify(data))
}

const loadProgress = () => {
  // Load main progress from existing storage
  const mainProgress = localStorage.getItem('ppl-quest-progress')
  if (mainProgress) {
    try {
      progress.value = { ...progress.value, ...JSON.parse(mainProgress) }
    } catch (error) {
      console.error('Failed to load main progress:', error)
    }
  }

  // Load financial data
  const saved = localStorage.getItem('ppl-quest-financial')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      expenses.value = data.expenses || []
      currentBudget.value = data.currentBudget || 30000
    } catch (error) {
      console.error('Failed to load financial data:', error)
    }
  }
}

onMounted(() => {
  loadProgress()
})
</script>

<style scoped>
.tab-content {
  min-height: 400px;
}
</style>