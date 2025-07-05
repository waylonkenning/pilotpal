<template>
  <div class="app-layout" data-testid="financial-view">
    <!-- Modern Header -->
    <div class="app-header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">💰 Financial Tracking</h1>
            <p class="text-sm opacity-60">
              Manage your PPL training budget and track expenses
            </p>
          </div>
          <button 
            @click="showContextualHelp = true"
            class="btn btn-secondary btn-sm"
            data-testid="contextual-help-trigger">
            ❓ Help
          </button>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="app-content">
      <div class="container">

        <!-- Financial Overview -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📊</div>
            <div>
              <h2 class="font-bold">Financial Overview</h2>
              <p class="text-sm opacity-80">Your PPL training budget breakdown</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <!-- Total Spent -->
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm" data-testid="total-spent">
                ${{ formatCurrency(totalSpent) }}
              </div>
              <div class="text-sm opacity-80 mb-sm">Total Spent</div>
              <div class="text-sm opacity-60">
                ${{ (totalSpent / Math.max(progress.flightHours.total, 0.1)).toFixed(0) }}/hour average
              </div>
            </div>

            <!-- Budget Remaining -->
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm" :class="budgetRemaining < 0 ? 'text-red-400' : 'text-green-400'" data-testid="budget-remaining">
                ${{ formatCurrency(budgetRemaining) }}
              </div>
              <div class="text-sm opacity-80 mb-sm">Budget Remaining</div>
              <div class="text-sm opacity-60">
                of ${{ formatCurrency(currentBudget) }} total budget
              </div>
            </div>

            <!-- Projected Total -->
            <div class="card card-compact text-center">
              <div class="text-2xl font-bold mb-sm" data-testid="projected-total">
                ${{ formatCurrency(projectedTotal) }}
              </div>
              <div class="text-sm opacity-80 mb-sm">Projected Total</div>
              <div class="text-sm opacity-60">
                Based on current spending rate
              </div>
            </div>
          </div>

          <!-- Budget Progress Bar -->
          <div class="mt-lg">
            <div class="flex justify-between items-center mb-sm">
              <span class="text-sm">Budget Progress</span>
              <span class="text-sm">{{ Math.round((totalSpent / currentBudget) * 100) }}%</span>
            </div>
            <div class="progress">
              <div class="progress-bar" 
                   :class="totalSpent > currentBudget ? 'bg-red-500' : ''"
                   :style="{ width: Math.min((totalSpent / currentBudget) * 100, 100) + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Expense Categories -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📋</div>
            <h2 class="font-bold">Expense Categories</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div class="card card-compact">
              <div class="font-medium mb-sm">✈️ Flight Training</div>
              <div class="text-lg font-bold mb-sm">${{ formatCurrency(categories.flightTraining) }}</div>
              <div class="text-sm opacity-80">Aircraft rental and instruction</div>
            </div>
            <div class="card card-compact">
              <div class="font-medium mb-sm">📚 Theory & Exams</div>
              <div class="text-lg font-bold mb-sm">${{ formatCurrency(categories.theoryExams) }}</div>
              <div class="text-sm opacity-80">Study materials and exam fees</div>
            </div>
            <div class="card card-compact">
              <div class="font-medium mb-sm">🏥 Medical</div>
              <div class="text-lg font-bold mb-sm">${{ formatCurrency(categories.medical) }}</div>
              <div class="text-sm opacity-80">Medical certificate costs</div>
            </div>
            <div class="card card-compact">
              <div class="font-medium mb-sm">🛠️ Equipment</div>
              <div class="text-lg font-bold mb-sm">${{ formatCurrency(categories.equipment) }}</div>
              <div class="text-sm opacity-80">Headsets, charts, and gear</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card card-elevated mb-xl">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">⚡</div>
            <h2 class="font-bold">Quick Actions</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <button @click="showAddExpense = true" class="btn btn-primary">
              ➕ Add Expense
            </button>
            <button @click="showSetBudget = true" class="btn btn-secondary">
              📊 Set Budget
            </button>
            <button @click="exportData" class="btn btn-secondary">
              📤 Export Data
            </button>
          </div>
        </div>

        <!-- Recent Expenses -->
        <div class="card card-elevated mb-xl" v-if="recentExpenses.length > 0">
          <div class="flex items-center gap-md mb-md">
            <div class="text-xl">📝</div>
            <h2 class="font-bold">Recent Expenses</h2>
          </div>
          
          <div class="space-y-2">
            <div v-for="expense in recentExpenses.slice(0, 5)" :key="expense.id" 
                 class="card card-compact">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium">{{ expense.description }}</div>
                  <div class="text-sm opacity-80">{{ expense.category }} • {{ formatDate(expense.date) }}</div>
                </div>
                <div class="text-lg font-bold">${{ formatCurrency(expense.amount) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Dashboard -->
        <div class="text-center">
          <router-link to="/dashboard" class="btn btn-secondary">
            ← Back to Dashboard
          </router-link>
        </div>
        
      </div>
    </div>

    <!-- Add Expense Modal -->
    <div v-if="showAddExpense" class="modal-overlay" @click="showAddExpense = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">➕ Add Expense</h3>
          <button @click="showAddExpense = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <form @submit.prevent="addExpense" class="space-y-4">
          <div class="form-group">
            <label class="form-label">Description</label>
            <input v-model="expenseForm.description" type="text" class="form-input" placeholder="e.g., Flight lesson with instructor" required>
          </div>

          <div class="form-group">
            <label class="form-label">Amount</label>
            <input v-model="expenseForm.amount" type="number" step="0.01" class="form-input" placeholder="0.00" required>
          </div>

          <div class="form-group">
            <label class="form-label">Category</label>
            <select v-model="expenseForm.category" class="form-input" required>
              <option value="">Select category...</option>
              <option value="flightTraining">Flight Training</option>
              <option value="theoryExams">Theory & Exams</option>
              <option value="medical">Medical</option>
              <option value="equipment">Equipment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Date</label>
            <input v-model="expenseForm.date" type="date" class="form-input" required>
          </div>

          <div class="flex gap-md">
            <button type="button" @click="showAddExpense = false" class="btn btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Set Budget Modal -->
    <div v-if="showSetBudget" class="modal-overlay" @click="showSetBudget = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">📊 Set Budget</h3>
          <button @click="showSetBudget = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <form @submit.prevent="setBudget" class="space-y-4">
          <div class="form-group">
            <label class="form-label">Total Budget</label>
            <input v-model="budgetForm.amount" type="number" step="100" class="form-input" placeholder="30000" required>
          </div>

          <div class="card card-compact">
            <div class="font-medium mb-sm">💡 Budget Guidelines</div>
            <div class="text-sm opacity-80 space-y-1">
              <div>• Typical PPL cost: $25,000-$35,000</div>
              <div>• Flight training: $18,000-$25,000</div>
              <div>• Equipment & materials: $2,000-$4,000</div>
              <div>• Theory exams: $390</div>
              <div>• Medical certificate: $420-$1,070</div>
            </div>
          </div>

          <div class="flex gap-md">
            <button type="button" @click="showSetBudget = false" class="btn btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Set Budget
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Help Modal -->
    <div v-if="showContextualHelp" class="modal-overlay" @click="showContextualHelp = false">
      <div class="modal-content" @click.stop>
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-bold text-lg">❓ Financial Tracking Help</h3>
          <button @click="showContextualHelp = false" class="btn-ghost text-2xl">&times;</button>
        </div>

        <div class="card card-compact mb-lg">
          <h4 class="font-medium mb-md">How to Track Your PPL Expenses</h4>
          <div class="text-sm opacity-80 space-y-2">
            <p>• Set a realistic budget based on NZ training costs</p>
            <p>• Record all expenses including flight hours, exams, and equipment</p>
            <p>• Monitor your spending rate to avoid budget overruns</p>
            <p>• Use categories to understand where your money goes</p>
            <p>• Export data for tax purposes or loan applications</p>
          </div>
        </div>

        <button @click="showContextualHelp = false" class="btn btn-primary w-full">
          Got it!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// State
const progress = ref({
  flightHours: {
    total: 0
  }
})

const expenses = ref<any[]>([])
const currentBudget = ref(30000)

// Modal states
const showAddExpense = ref(false)
const showSetBudget = ref(false)
const showContextualHelp = ref(false)

// Form data
const expenseForm = ref({
  description: '',
  amount: 0,
  category: '',
  date: new Date().toISOString().split('T')[0]
})

const budgetForm = ref({
  amount: 30000
})

// Computed properties
const totalSpent = computed(() => {
  return expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
})

const budgetRemaining = computed(() => {
  return currentBudget.value - totalSpent.value
})

const projectedTotal = computed(() => {
  if (progress.value.flightHours.total === 0) return totalSpent.value
  const avgPerHour = totalSpent.value / progress.value.flightHours.total
  return avgPerHour * 50 // Projected for 50 hour minimum
})

const categories = computed(() => {
  const cats = {
    flightTraining: 0,
    theoryExams: 0,
    medical: 0,
    equipment: 0,
    other: 0
  }
  
  expenses.value.forEach(expense => {
    if (Object.prototype.hasOwnProperty.call(cats, expense.category)) {
      (cats as any)[expense.category] += expense.amount
    } else {
      cats.other += expense.amount
    }
  })
  
  return cats
})

const recentExpenses = computed(() => {
  return [...expenses.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// Methods
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-NZ', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const addExpense = () => {
  const newExpense = {
    id: Date.now().toString(),
    ...expenseForm.value,
    amount: Number(expenseForm.value.amount)
  }
  
  expenses.value.push(newExpense)
  saveData()
  
  // Reset form
  expenseForm.value = {
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0]
  }
  
  showAddExpense.value = false
}

const setBudget = () => {
  currentBudget.value = Number(budgetForm.value.amount)
  saveData()
  showSetBudget.value = false
}

const exportData = () => {
  const data = {
    expenses: expenses.value,
    budget: currentBudget.value,
    summary: {
      totalSpent: totalSpent.value,
      budgetRemaining: budgetRemaining.value,
      categories: categories.value
    }
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ppl-expenses-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const saveData = () => {
  const data = {
    expenses: expenses.value,
    budget: currentBudget.value
  }
  localStorage.setItem('ppl-quest-finances', JSON.stringify(data))
}

const loadData = () => {
  const saved = localStorage.getItem('ppl-quest-finances')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      expenses.value = data.expenses || []
      currentBudget.value = data.budget || 30000
    } catch (error) {
      console.error('Failed to load financial data:', error)
    }
  }
  
  // Load progress data for flight hours
  const progressSaved = localStorage.getItem('ppl-quest-progress')
  if (progressSaved) {
    try {
      const progressData = JSON.parse(progressSaved)
      if (progressData.flightHours) {
        progress.value.flightHours = progressData.flightHours
      }
    } catch (error) {
      console.error('Failed to load progress data:', error)
    }
  }
}

onMounted(() => {
  loadData()
  budgetForm.value.amount = currentBudget.value
})
</script>

<style scoped>
</style>