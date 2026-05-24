<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 class="header-title">Create New Program</h2>
          </div>
        </div>
        <button @click="handleCancel" class="close-btn" type="button">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="success-banner">
        <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="success-title">Program Created Successfully!</p>
          <p class="success-text">The program has been added to the system.</p>
        </div>
      </div>

      <!-- Form Content -->
      <div class="modal-body">
        <div class="form-content">
          <!-- Program Information Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Program Information
            </h3>
            <div class="field-stack">
              <div class="form-field">
                <label class="field-label">
                  Program Name <span class="required">*</span>
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  :class="['field-input', { 'field-error': errors.title }]"
                  placeholder=""
                />
                <p v-if="errors.title" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.title }}
                </p>
              </div>

              <div class="form-field">
                <label class="field-label">
                  Program Category <span class="required">*</span>
                </label>
                <select
                  v-model="form.category"
                  :class="['field-input', { 'field-error': errors.category }]"
                >
                  <option value="">Select Program Category</option>
                  <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                    {{ cat.label }}
                  </option>
                </select>
                <p v-if="errors.category" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.category }}
                </p>
              </div>

              <div class="form-field">
                <label class="field-label">
                  Program Description <span class="required">*</span>
                </label>
                <textarea
                  v-model="form.desc"
                  rows="4"
                  :class="['field-textarea', { 'field-error': errors.desc }]"
                  placeholder="Provide a detailed description of the program, its objectives, and target beneficiaries..."
                ></textarea>
                <div class="field-helper">
                  <p v-if="errors.desc" class="error-message">
                    <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ errors.desc }}
                  </p>
                  <span v-else class="char-count" :class="{ 'char-limit': form.desc.length > 450 }">
                    {{ form.desc.length }} / 500
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Budget Information Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Budget Allocation
            </h3>
            <div class="budget-grid">
              <div class="form-field">
                <label class="field-label">
                  Total Budget (PHP) <span class="required">*</span>
                </label>
                <div class="input-with-icon">
                  <span class="currency-symbol">₱</span>
                  <input
                    v-model="form.budget"
                    type="text"
                    :class="['field-input', 'input-with-padding', { 'field-error': errors.budget }]"
                    placeholder="0.00"
                    @input="formatBudget"
                  />
                </div>
                <p v-if="errors.budget" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.budget }}
                </p>
                <p v-else-if="budgetInWords" class="budget-words">
                  {{ budgetInWords }}
                </p>
              </div>

              <div class="form-field">
                <label class="field-label">
                  Fiscal Year <span class="required">*</span>
                </label>
                <select
                  v-model="form.fiscalYear"
                  :class="['field-input', { 'field-error': errors.fiscalYear }]"
                >
                  <option value="">Select Fiscal Year</option>
                  <option v-for="year in fiscalYears" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
                <p v-if="errors.fiscalYear" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.fiscalYear }}
                </p>
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">
                Funding Source <span class="required">*</span>
              </label>
              <select
                v-model="form.fundingSource"
                :class="['field-input', { 'field-error': errors.fundingSource }]"
              >
                <option value="">Select Funding Source</option>
                <option v-for="source in fundingSources" :key="source" :value="source">
                  {{ source }}
                </option>
              </select>
              <p v-if="errors.fundingSource" class="error-message">
                <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ errors.fundingSource }}
              </p>
            </div>
          </div>

          <!-- Program Schedule Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Program Schedule
            </h3>
            <div class="date-grid">
              <div class="form-field">
                <label class="field-label">
                  Start Date <span class="required">*</span>
                </label>
                <input
                  v-model="form.startDate"
                  type="date"
                  :class="['field-input', { 'field-error': errors.startDate }]"
                />
                <p v-if="errors.startDate" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.startDate }}
                </p>
              </div>

              <div class="form-field">
                <label class="field-label">
                  Estimated End Date
                </label>
                <input
                  v-model="form.endDate"
                  type="date"
                  :class="['field-input', { 'field-error': errors.endDate }]"
                  :min="form.startDate"
                />
                <p v-if="errors.endDate" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.endDate }}
                </p>
              </div>
            </div>
          </div>

          <!-- Program Status Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Program Status
            </h3>
            <div class="status-options">
              <label
                v-for="status in statuses"
                :key="status.value"
                :class="['status-card', { 'status-selected': form.status === status.value }]"
              >
                <input
                  type="radio"
                  v-model="form.status"
                  :value="status.value"
                  class="status-radio"
                />
                <div class="status-content">
                  <div class="status-header">
                    <span :class="['status-badge', `status-${status.value.toLowerCase()}`]">
                      {{ status.label }}
                    </span>
                  </div>
                  <p class="status-desc">{{ status.desc }}</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="modal-footer">
          <p class="footer-note">
            <span class="required">*</span> Required fields
          </p>
          <div class="footer-actions">
            <button
              @click="handleCancel"
              type="button"
              class="btn-cancel"
              :disabled="isSubmitting"
            >
              Cancel
            </button>
            <button
              @click="handleSubmit"
              type="button"
              :disabled="isSubmitting"
              class="btn-submit"
            >
              <span v-if="isSubmitting" class="btn-spinner"></span>
              <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ isSubmitting ? 'Creating Program...' : 'Create Program' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const emit = defineEmits(['cancel', 'done'])

const form = reactive({
  title: '',
  category: '',
  desc: '',
  budget: '',
  fiscalYear: new Date().getFullYear().toString(),
  fundingSource: '',
  startDate: '',
  endDate: '',
  status: 'Planning'
})

const errors = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

const categories = [
  { value: 'Educational', label: 'Educational Assistance' },
  { value: 'Medical', label: 'Medical Assistance' },
  { value: 'Livelihood', label: 'Livelihood & Skills Training' },
  { value: 'PWD', label: 'PWD Assistance Program' },
  { value: 'Senior', label: 'Senior Citizen Program' },
  { value: 'Child', label: 'Child Welfare Program' },
  { value: 'Housing', label: 'Housing & Shelter Assistance' },
  { value: 'Food', label: 'Food Security Program' },
  { value: 'Crisis', label: 'Crisis Intervention' },
  { value: 'Other', label: 'Other Programs' }
]

const fundingSources = [
  'Local Government Unit (LGU) Budget',
  'Regional Budget Allocation',
  'Private Sector Partnership',
  'International Development Aid',
  'Donation/Grant',
  'Others'
]

const fiscalYears = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => (currentYear + i).toString())
})

const statuses = [
  { 
    value: 'Planning', 
    label: 'Planning', 
    desc: 'Program is being planned and prepared' 
  },
  { 
    value: 'Active', 
    label: 'Active', 
    desc: 'Program is currently running and accepting beneficiaries' 
  },
  { 
    value: 'OnHold', 
    label: 'On Hold', 
    desc: 'Program is temporarily suspended' 
  }
]

const budgetInWords = computed(() => {
  if (!form.budget) return ''
  
  const numValue = parseFloat(form.budget.replace(/,/g, ''))
  if (isNaN(numValue)) return ''
  
  if (numValue >= 1000000) {
    return `${(numValue / 1000000).toFixed(2)} Million Pesos`
  } else if (numValue >= 1000) {
    return `${(numValue / 1000).toFixed(2)} Thousand Pesos`
  }
  return ''
})

const formatBudget = (e) => {
  let value = e.target.value.replace(/,/g, '')
  
  if (value && !isNaN(value)) {
    const parts = parseFloat(value).toFixed(2).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    form.budget = parts.join('.')
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!form.title.trim()) newErrors.title = 'Program name is required'
  if (!form.category) newErrors.category = 'Program category is required'
  if (!form.desc.trim()) {
    newErrors.desc = 'Program description is required'
  } else if (form.desc.length < 20) {
    newErrors.desc = 'Description must be at least 20 characters'
  } else if (form.desc.length > 500) {
    newErrors.desc = 'Description must not exceed 500 characters'
  }

  if (!form.budget) {
    newErrors.budget = 'Budget allocation is required'
  } else {
    const numValue = parseFloat(form.budget.replace(/,/g, ''))
    if (isNaN(numValue) || numValue <= 0) {
      newErrors.budget = 'Please enter a valid budget amount'
    }
  }

  if (!form.fiscalYear) newErrors.fiscalYear = 'Fiscal year is required'
  if (!form.fundingSource) newErrors.fundingSource = 'Funding source is required'
  if (!form.startDate) newErrors.startDate = 'Start date is required'
  
  if (form.endDate && form.startDate) {
    if (new Date(form.endDate) < new Date(form.startDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    console.log('Creating Program:', form)
    isSubmitting.value = false
    showSuccess.value = true
    
    setTimeout(() => {
      emit('done')
    }, 2000)
  }, 1500)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
* { box-sizing: border-box; }

.icon { width: 1.25rem; height: 1.25rem; }
.section-icon { width: 1rem; height: 1rem; }
.error-icon { width: 0.75rem; height: 0.75rem; }
.success-icon { width: 1.25rem; height: 1.25rem; }
.btn-icon { width: 1.25rem; height: 1.25rem; }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 0;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;
  overflow: hidden;
}

.modal-container {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0;
  box-shadow: none;
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  background: linear-gradient(to right, #10b981, #059669);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-icon {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.header-subtitle {
  color: #d1fae5;
  font-size: 0.875rem;
  margin: 0;
}

.close-btn {
  color: white;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.success-banner {
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.success-icon {
  color: #16a34a;
  flex-shrink: 0;
}

.success-title {
  font-weight: 600;
  color: #166534;
  margin: 0;
}

.success-text {
  font-size: 0.875rem;
  color: #15803d;
  margin: 0;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.field-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.budget-grid,
.date-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
}

.field-input,
.field-textarea {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-family: inherit;
}

.field-textarea {
  resize: vertical;
  min-height: 100px;
}

.field-input:focus,
.field-textarea:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.field-error {
  border-color: #fca5a5 !important;
  background-color: #fef2f2;
}

.field-helper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-left: auto;
}

.char-limit {
  color: #f59e0b;
  font-weight: 600;
}

.error-message {
  margin: 0;
  font-size: 0.75rem;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.input-with-icon {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-weight: 500;
}

.input-with-padding {
  padding-left: 2.25rem;
}

.budget-words {
  font-size: 0.75rem;
  color: #10b981;
  margin: 0;
  font-weight: 500;
}

.status-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.status-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.status-card:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.status-selected {
  border-color: #10b981;
  background-color: #f0fdf4;
}

.status-radio {
  width: 1rem;
  height: 1rem;
  accent-color: #10b981;
}

.status-content {
  flex: 1;
}

.status-header {
  margin-bottom: 0.5rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-planning {
  background: #fef3c7;
  color: #92400e;
}

.status-active {
  background: #d1fae5;
  color: #065f46;
}

.status-onhold {
  background: #fee2e2;
  color: #991b1b;
}

.status-desc {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.footer-note {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-cancel {
  padding: 0.625rem 1.5rem;
  border: 1px solid #d1d5db;
  color: #374151;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  background: white;
  font-size: 0.875rem;
}

.btn-cancel:hover {
  background-color: #f9fafb;
}

.btn-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit {
  padding: 0.625rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn-submit:hover {
  background-color: #059669;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .modal-container {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }

  .modal-body {
    flex: 1;
  }

  .budget-grid,
  .date-grid,
  .status-options {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column-reverse;
    gap: 1rem;
    align-items: stretch;
  }
  
  .footer-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  .btn-submit, .btn-cancel {
    justify-content: center;
  }
}
</style>