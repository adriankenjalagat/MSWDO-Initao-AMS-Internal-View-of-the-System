<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-content">
          <svg class="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div>
            <h2 class="modal-title">New Application Entry</h2>
            <p class="modal-subtitle">Create a new assistance application record</p>
          </div>
        </div>
        <button type="button" class="close-btn" @click="$emit('cancel')" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="modal-form">
        <div class="form-content">
          <!-- Client/Beneficiary Selection Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Client & Beneficiary Information
            </h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="clientId">
                  Client ID <span class="required">*</span>
                </label>
                <div class="id-input-wrapper">
                  <input 
                    id="clientId"
                    v-model="form.clientId" 
                    type="text" 
                    placeholder="e.g., CLT-2024-0001"
                    required
                    :class="{ 'error': errors.clientId }"
                    @blur="validateField('clientId')"
                  />
                  <button type="button" class="lookup-btn" @click="lookupClient" title="Lookup Client">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                <span v-if="errors.clientId" class="error-message">{{ errors.clientId }}</span>
                <span v-else class="helper-text">Enter existing client ID or search</span>
              </div>

              <div class="form-group">
                <label for="beneficiaryId">
                  Beneficiary ID <span class="required">*</span>
                </label>
                <div class="id-input-wrapper">
                  <input 
                    id="beneficiaryId"
                    v-model="form.beneficiaryId" 
                    type="text" 
                    placeholder="e.g., BEN-2024-0001"
                    required
                    :class="{ 'error': errors.beneficiaryId }"
                    @blur="validateField('beneficiaryId')"
                  />
                  <button type="button" class="lookup-btn" @click="lookupBeneficiary" title="Lookup Beneficiary" :disabled="form.samePerson">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                <span v-if="errors.beneficiaryId" class="error-message">{{ errors.beneficiaryId }}</span>
                <span v-else class="helper-text">
                  <template v-if="form.samePerson">IDs will mirror each other while the toggle is on.</template>
                  <template v-else>Enter existing beneficiary ID or search</template>
                </span>
              </div>
            </div>

            <div class="form-row same-person-row">
              <div class="switch-wrapper">
                <span class="switch-text">Client and beneficiary are the same person</span>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="form.samePerson" />
                  <span class="slider"></span>
                </label>
              </div>
            </div>

            <!-- Quick Create Links -->
            <div class="quick-actions">
              <button type="button" class="link-btn" @click="createNewClient">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Create New Client
              </button>
              <span class="divider">|</span>
              <button type="button" class="link-btn" @click="createNewBeneficiary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Create New Beneficiary
              </button>
            </div>

            <!-- Display Selected Info (if IDs are valid) -->
            <div v-if="clientInfo" class="info-card">
              <div class="info-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Client Found</span>
              </div>
              <p class="info-text"><strong>Name:</strong> {{ clientInfo.name }}</p>
              <p class="info-text"><strong>Contact:</strong> {{ clientInfo.contact }}</p>
            </div>

            <div v-if="beneficiaryInfo" class="info-card">
              <div class="info-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Beneficiary Found</span>
              </div>
              <p class="info-text"><strong>Name:</strong> {{ beneficiaryInfo.name }}</p>
              <p class="info-text"><strong>Relationship:</strong> {{ beneficiaryInfo.relationship }}</p>
            </div>
          </div>

          <!-- Assistance Details Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Assistance Details
            </h3>
            
            <div class="form-row">
              <div class="form-group full-width">
                <label for="programType">
                  Program Type <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select id="programType" v-model="form.programType">
                    <option value="Medical Assistance (AICS)">Medical Assistance (AICS)</option>
                    <option value="Educational Assistance">Educational Assistance</option>
                    <option value="Burial Assistance">Burial Assistance</option>
                    <option value="Transportation Aid">Transportation Aid</option>
                    <option value="Social Pension">Social Pension for Indigent Senior Citizens</option>
                    <option value="Food Assistance">Food Assistance Program</option>
                    <option value="Livelihood Assistance">Livelihood Assistance</option>
                  </select>
                </div>
                <span class="helper-text">Select the type of assistance being requested</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="amount">
                  Assistance Amount (PHP) <span class="required">*</span>
                </label>
                <div class="input-with-prefix">
                  <span class="prefix">₱</span>
                  <input 
                    id="amount"
                    v-model="form.amount" 
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                    :class="{ 'error': errors.amount }"
                    @blur="validateField('amount')"
                  />
                </div>
                <span v-if="errors.amount" class="error-message">{{ errors.amount }}</span>
              </div>

              <div class="form-group">
                <label for="status">
                  Initial Status <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select id="status" v-model="form.status">
                    <option value="Pending">Pending Review</option>
                    <option value="For Validation">For Validation</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="remarks">Remarks / Notes</label>
                <textarea 
                  id="remarks"
                  v-model="form.remarks" 
                  placeholder="Add any additional notes or comments about this application (optional)"
                  rows="3"
                  maxlength="500"
                ></textarea>
                <span class="helper-text">{{ form.remarks.length }}/500 characters</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="modal-footer">
          <!-- Success Message -->
          <div v-if="showSuccessMessage" class="success-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Application recorded successfully!</span>
          </div>

          <div v-else class="button-group">
            <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Create Application</span>
              <span v-else class="loading-text">
                <svg class="spinner" viewBox="0 0 24 24">
                  <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                </svg>
                Creating...
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const emit = defineEmits(['cancel', 'done', 'openCreateClient', 'openCreateBeneficiary'])

const form = reactive({
  clientId: '',
  beneficiaryId: '',
  samePerson: false,
  programType: 'Medical Assistance (AICS)',
  amount: '',
  status: 'Pending',
  remarks: ''
})

const errors = reactive({
  clientId: '',
  beneficiaryId: '',
  amount: ''
})

const isSubmitting = ref(false)
const clientInfo = ref(null)
const beneficiaryInfo = ref(null)

const validateField = (field) => {
  errors[field] = ''
  
  if (field === 'clientId' && form.clientId.trim().length < 3) {
    errors.clientId = 'Client ID must be at least 3 characters'
  }
  
  if (field === 'beneficiaryId' && form.beneficiaryId.trim().length < 3) {
    errors.beneficiaryId = 'Beneficiary ID must be at least 3 characters'
  }
  
  if (field === 'amount' && (parseFloat(form.amount) <= 0 || isNaN(form.amount))) {
    errors.amount = 'Amount must be greater than 0'
  }
}

const validateForm = () => {
  validateField('clientId')
  validateField('beneficiaryId')
  validateField('amount')
  
  return !Object.values(errors).some(error => error !== '')
}

// Mock lookup functions (these would call your backend API)
const lookupClient = () => {
  // This is just for frontend display - simulating a found client
  if (form.clientId) {
    clientInfo.value = {
      name: 'Juan Dela Cruz',
      contact: '0912-345-6789'
    }
    if (form.samePerson) {
      syncSamePersonIds('clientId')
    }
  }
}

const syncSamePersonIds = (changedField) => {
  if (!form.samePerson) {
    return
  }

  if (changedField === 'clientId') {
    form.beneficiaryId = form.clientId
  } else {
    form.clientId = form.beneficiaryId
  }

  const currentId = form.clientId.trim()
  if (currentId) {
    clientInfo.value = {
      name: 'Juan Dela Cruz',
      contact: '0912-345-6789'
    }
    beneficiaryInfo.value = {
      ...clientInfo.value,
      relationship: 'Self'
    }
  } else {
    clientInfo.value = null
    beneficiaryInfo.value = null
  }
}

watch(() => form.samePerson, (value) => {
  if (value) {
    if (form.clientId.trim()) {
      syncSamePersonIds('clientId')
    } else if (form.beneficiaryId.trim()) {
      syncSamePersonIds('beneficiaryId')
    }
  }
})

watch(() => form.clientId, (value) => {
  if (errors.clientId && value.trim().length >= 3) {
    errors.clientId = ''
  }
  if (form.samePerson) {
    syncSamePersonIds('clientId')
  }
})

watch(() => form.beneficiaryId, (value) => {
  if (errors.beneficiaryId && value.trim().length >= 3) {
    errors.beneficiaryId = ''
  }
  if (form.samePerson) {
    syncSamePersonIds('beneficiaryId')
  }
})

watch(() => form.amount, (value) => {
  if (errors.amount && value !== '' && parseFloat(value) > 0 && !Number.isNaN(parseFloat(value))) {
    errors.amount = ''
  }
})

const lookupBeneficiary = () => {
  if (form.samePerson) {
    return
  }

  // This is just for frontend display - simulating a found beneficiary
  if (form.beneficiaryId) {
    beneficiaryInfo.value = {
      name: 'Maria Santos',
      relationship: 'Spouse'
    }
  }
}

const createNewClient = () => {
  emit('openCreateClient')
}

const createNewBeneficiary = () => {
  emit('openCreateBeneficiary')
}

const showSuccessMessage = ref(false)

const submit = () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    const payload = {
      ...form,
      dateCreated: new Date().toISOString(),
      createdBy: 'Current User'
    }
    
    isSubmitting.value = false
    showSuccessMessage.value = true
    
    // Show success message then emit and close
    setTimeout(() => {
      emit('done', payload)
      // Reset form for next time
      Object.keys(form).forEach(key => {
        if (typeof form[key] === 'string') form[key] = ''
      })
      form.programType = 'Medical Assistance (AICS)'
      form.status = 'Pending'
      clientInfo.value = null
      beneficiaryInfo.value = null
      showSuccessMessage.value = false
    }, 1500)
  }, 800)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 0;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;
  overflow: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 24px 20px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border-radius: 12px 12px 0 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  color: white;
  flex-shrink: 0;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
}

.modal-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  color: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.form-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.form-section {
  margin-bottom: 28px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #dbeafe;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: #3b82f6;
  flex-shrink: 0;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-row:last-child {
  margin-bottom: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.form-group.full-width {
  flex: 1 1 100%;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 4px;
}

.required {
  color: #dc2626;
  font-weight: 700;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  font-size: 14px;
  font-family: inherit;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: #eff6ff;
}

.form-group input.error {
  border-color: #dc2626;
}

.form-group input.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.id-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: stretch;
}

.id-input-wrapper input {
  flex: 1;
}

.same-person-row {
  margin-bottom: 16px;
}

.switch-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.switch-text {
  font-size: 13px;
  color: #374151;
  font-weight: 600;
  line-height: 1.4;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 26px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #d1d5db;
  border-radius: 999px;
  transition: background-color 0.2s ease;
}

.slider::before {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  left: 3px;
  top: 3px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);
  transition: transform 0.2s ease;
}

.toggle-switch input:checked + .slider {
  background-color: #2563eb;
}

.toggle-switch input:checked + .slider::before {
  transform: translateX(20px);
}

.form-group input:disabled {
  background: #f9fafb;
  cursor: not-allowed;
}

.lookup-btn {
  background: #f3f4f6;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.lookup-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
  color: #374151;
}

.quick-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.link-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.link-btn:hover {
  background: #dbeafe;
  color: #1e40af;
}

.divider {
  color: #d1d5db;
}

.info-card {
  margin-top: 12px;
  padding: 12px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #059669;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
}

.info-text {
  font-size: 13px;
  color: #064e3b;
  margin: 4px 0;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #6b7280;
  pointer-events: none;
}

.select-wrapper select {
  appearance: none;
  width: 100%;
  padding-right: 36px;
  cursor: pointer;
}

.input-with-prefix {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-prefix .prefix {
  position: absolute;
  left: 12px;
  font-weight: 600;
  color: #6b7280;
  pointer-events: none;
}

.input-with-prefix input {
  padding-left: 32px;
}

.helper-text {
  font-size: 12px;
  color: #6b7280;
  margin-top: -2px;
}

.error-message {
  font-size: 12px;
  color: #dc2626;
  margin-top: -2px;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
  min-height: 70px;
}

.button-group {
  display: flex;
  gap: 12px;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ecfdf5;
  color: #059669;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #a7f3d0;
  animation: slideInRight 0.3s ease-out;
}

.success-message svg {
  color: #059669;
  flex-shrink: 0;
}

@keyframes slideInRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1.5px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-primary {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  min-width: 160px;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(30, 64, 175, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(30, 64, 175, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

.spinner-circle {
  stroke-dasharray: 62.83185307179586;
  stroke-dashoffset: 47.12388980384689;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .modal-container {
    max-height: 95vh;
  }
  
  .modal-header,
  .form-content,
  .modal-footer {
    padding: 20px 16px;
  }

  .quick-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .divider {
    display: none;
  }
}
</style>