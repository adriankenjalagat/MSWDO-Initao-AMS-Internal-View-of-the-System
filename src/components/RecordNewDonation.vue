<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-container">
      
      <div v-if="!showSuccess" class="modal-content-wrapper">
        <div class="modal-header">
          <div class="header-content">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div>
              <h2 class="modal-title">Record New Donation</h2>
              <p class="modal-subtitle">Enter donation details.</p>
            </div>
          </div>

          <div class="header-right">
            <div class="ref-input-wrapper">
              <label for="refNumber" class="ref-label">Ref. No.:</label>
              <input 
                id="refNumber" 
                type="text" 
                v-model="form.referenceNumber"
                class="ref-input" 
                placeholder=""
              >
            </div>
            
            <button type="button" class="close-btn" @click="$emit('cancel')" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div class="modal-body">
          <div class="form-section">
            <h3 class="section-title">Donor Information</h3>
            
            <div class="form-row">
              <div class="form-group full">
                <label for="donorName" class="form-label">
                  Donor Name <span class="required">*</span>
                </label>
                <input 
                  id="donorName"
                  v-model="form.donorName" 
                  type="text" 
                  class="form-input"
                  :class="{ 'input-error': errors.donorName }"
                  placeholder="e.g. Juan dela Cruz, Coca-Cola Foundation Inc." 
                  @input="clearError('donorName')"
                />
                <span v-if="errors.donorName" class="error-message">{{ errors.donorName }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="donorType" class="form-label">
                  Donor Type <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select id="donorType" v-model="form.donorType" class="form-select">
                    <option value="Private Individual">Private Individual</option>
                    <option value="Partner">Partner Organization</option>
                    <option value="School">Educational Institution</option>
                    <option value="NGO">Non-Government Organization</option>
                    <option value="LGU">Local Government Unit</option>
                    <option value="Company">Private Company</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="contactNumber" class="form-label">
                  Contact Number
                </label>
                <input 
                  id="contactNumber"
                  v-model="form.contactNumber" 
                  type="tel" 
                  class="form-input"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Donation Details</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="donationType" class="form-label">
                  Donation Category <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select id="donationType" v-model="form.type" class="form-select">
                    <option value="Food Packs">Food Packs/Relief Goods</option>
                    <option value="Rice">Rice</option>
                    <option value="Water">In-Kind - Bottled Water</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Hygiene Kits">Hygiene Kits</option>
                    <option value="Clothing">Clothing/Textiles</option>
                    <option value="Equipment">Equipment/Tools</option>
                    <option value="Others">Others (Specify in notes)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="amount" class="form-label">
                  {{ form.type === 'Cash' ? 'Amount (₱)' : 'Quantity/Description' }} <span class="required">*</span>
                </label>
                <input 
                  id="amount"
                  v-model="form.amount" 
                  :type="form.type === 'Cash' ? 'number' : 'text'"
                  class="form-input"
                  :class="{ 'input-error': errors.amount }"
                  :placeholder="form.type === 'Cash' ? 'e.g. 5000' : 'e.g. 50 Sacks, 100 pieces'" 
                  @input="clearError('amount')"
                />
                <span v-if="errors.amount" class="error-message">{{ errors.amount }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="dateReceived" class="form-label">
                  Date Received <span class="required">*</span>
                </label>
                <input 
                  id="dateReceived"
                  v-model="form.dateReceived" 
                  type="date" 
                  class="form-input"
                  :class="{ 'input-error': errors.dateReceived }"
                  :max="today"
                  @input="clearError('dateReceived')"
                />
                <span v-if="errors.dateReceived" class="error-message">{{ errors.dateReceived }}</span>
              </div>

              <div class="form-group">
                <label for="receivedBy" class="form-label">
                  Received By
                </label>
                <input 
                  id="receivedBy"
                  v-model="form.receivedBy" 
                  type="text" 
                  class="form-input"
                  placeholder=""
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full">
                <label for="notes" class="form-label">
                  Additional Notes
                </label>
                <textarea 
                  id="notes"
                  v-model="form.notes" 
                  class="form-textarea"
                  rows="3"
                  placeholder="Any additional information about the donation..."
                ></textarea>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Verification</h3>
            
            <div class="form-row">
              <div class="form-group full">
                <label for="status" class="form-label">
                  Verification Status <span class="required">*</span>
                </label>
                <div class="status-selector">
                  <label class="status-option" :class="{ active: form.status === 'Pending' }">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Pending" 
                      v-model="form.status"
                    />
                    <span class="status-badge pending">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Pending Verification
                    </span>
                  </label>
                  <label class="status-option" :class="{ active: form.status === 'Verified' }">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Verified" 
                      v-model="form.status"
                    />
                    <span class="status-badge verified">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Verified & Received
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="isSubmitting">
              <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              <span v-if="isSubmitting">Recording...</span>
              <span v-else>Record Donation</span>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="success-message-wrapper">
        <div class="success-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 class="success-title">Success!</h3>
        <p class="success-subtitle">
          Donation from <span class="highlight">{{ form.donorName }}</span> has been recorded successfully.
        </p>
        <div class="success-details" v-if="form.referenceNumber">
          <span>Reference #:</span>
          <strong>{{ form.referenceNumber }}</strong>
        </div>
        
        <button type="button" class="btn btn-primary success-btn" @click="handleSuccessDone">
          Done
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const emit = defineEmits(['cancel', 'done'])

const form = reactive({
  referenceNumber: '',
  donorName: '',
  donorType: 'Private Individual',
  contactNumber: '',
  type: 'Food Packs',
  amount: '',
  dateReceived: new Date().toISOString().substr(0, 10),
  receivedBy: '',
  notes: '',
  status: 'Pending'
})

const errors = reactive({
  donorName: '',
  amount: '',
  dateReceived: ''
})

const isSubmitting = ref(false)
// 3. NEW STATE VARIABLE
const showSuccess = ref(false)

const today = computed(() => {
  return new Date().toISOString().substr(0, 10)
})

const clearError = (field) => {
  errors[field] = ''
}

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!form.donorName.trim()) {
    errors.donorName = 'Donor name is required'
    isValid = false
  }
  
  if (!form.amount) {
    errors.amount = 'Amount or quantity is required'
    isValid = false
  }
  
  if (!form.dateReceived) {
    errors.dateReceived = 'Date received is required'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    isSubmitting.value = false
    // 4. TRIGGER SUCCESS SCREEN INSTEAD OF EMITTING DONE IMMEDIATELY
    showSuccess.value = true
  }, 500)
}

// 5. NEW FUNCTION TO HANDLE CLOSING FROM SUCCESS SCREEN
const handleSuccessDone = () => {
  emit('done', { 
    ...form,
    id: Date.now(),
    recordedAt: new Date().toISOString()
  })
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

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
  z-index: 9999;
  padding: 0;
  animation: fadeIn 0.2s ease;
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
  max-width: none;
  width: 100vw;
  height: 100vh;
  max-height: none;
  overflow: hidden;
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* 6. NEW WRAPPER STYLES FOR LAYOUT */
.modal-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* 7. NEW SUCCESS SCREEN STYLES */
.success-message-wrapper {
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.success-icon-container {
  width: 80px;
  height: 80px;
  background: #d1fae5;
  color: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.success-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
}

.success-subtitle {
  color: #6b7280;
  font-size: 15px;
  margin: 0 0 24px;
  max-width: 400px;
  line-height: 1.5;
}

.highlight {
  color: #0f766e;
  font-weight: 600;
}

.success-details {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  margin-bottom: 32px;
  display: flex;
  gap: 8px;
}

.success-btn {
  min-width: 140px;
  justify-content: center;
}
/* -------------------------- */

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

.modal-header {
  padding: 24px 28px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  gap: 16px;
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ref-input-wrapper {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 4px 10px;
  transition: all 0.2s;
}

.ref-input-wrapper:focus-within {
  border-color: #0f766e;
  background: white;
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.1);
}

.ref-label {
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  margin-right: 8px;
  text-transform: uppercase;
  white-space: nowrap;
}

.ref-input {
  border: none;
  background: transparent;
  font-size: 13px;
  width: 110px;
  color: #111827;
  font-weight: 500;
  outline: none;
}

.ref-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.icon-wrapper {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.modal-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

.modal-subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
}

.close-btn {
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.modal-body {
  padding: 28px;
  overflow-y: auto;
  flex: 1;
}

.form-section {
  margin-bottom: 28px;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #0f766e;
  display: inline-block;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-row:last-child {
  margin-bottom: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.required {
  color: #dc2626;
  font-weight: 700;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #111827;
  background: white;
  transition: all 0.2s;
  outline: none;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #0f766e;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #9ca3af;
}

.form-input.input-error {
  border-color: #dc2626;
}

.form-input.input-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.error-message {
  font-size: 12px;
  color: #dc2626;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
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

.form-select {
  appearance: none;
  padding-right: 36px;
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.status-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.status-option {
  cursor: pointer;
}

.status-option input[type="radio"] {
  display: none;
}

.status-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  background: white;
}

.status-option.active .status-badge {
  border-color: currentColor;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.status-badge.pending {
  color: #d97706;
}

.status-option.active .status-badge.pending {
  background: #fef3c7;
  border-color: #d97706;
}

.status-badge.verified {
  color: #059669;
}

.status-option.active .status-badge.verified {
  background: #d1fae5;
  border-color: #059669;
}

.form-actions {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1.5px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-primary {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #0d6560 0%, #10a690 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Responsive Design */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 0;
    align-items: flex-end;
  }
  
  .modal-container {
    max-height: 95vh;
    border-radius: 12px 12px 0 0;
  }

  .modal-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-right {
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
  }

  .ref-input-wrapper {
    flex: 1;
    margin-right: 12px;
  }

  .ref-input {
    width: 100%;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .status-selector {
    grid-template-columns: 1fr;
  }
  
  .header-content {
    gap: 12px;
  }
  
  .icon-wrapper {
    width: 40px;
    height: 40px;
  }
  
  .modal-title {
    font-size: 18px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>