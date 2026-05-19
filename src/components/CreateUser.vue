<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 class="header-title">Create New User Account</h2>
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
          <p class="success-title">User Created Successfully!</p>
          <p class="success-text">Access credentials will be sent to the user's email.</p>
        </div>
      </div>

      <!-- Form Content -->
      <div class="modal-body">
        <div class="form-content">
          <!-- Personal Information Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h3>
            <div class="field-grid">
              <div class="form-field">
                <label class="field-label">
                  First Name <span class="required">*</span>
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  :class="['field-input', { 'field-error': errors.firstName }]"
                  placeholder=""
                />
                <p v-if="errors.firstName" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.firstName }}
                </p>
              </div>

              <div class="form-field">
                <label class="field-label">
                  Last Name <span class="required">*</span>
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  :class="['field-input', { 'field-error': errors.lastName }]"
                  placeholder=""
                />
                <p v-if="errors.lastName" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.lastName }}
                </p>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h3>
            <div class="field-stack">
              <div class="form-field">
                <label class="field-label">
                  Email Address <span class="required">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  :class="['field-input', { 'field-error': errors.email }]"
                  placeholder=""
                />
                <p v-if="errors.email" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.email }}
                </p>
              </div>

              <div class="form-field">
                <label class="field-label">Mobile Number</label>
                <div class="input-with-icon">
                  <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input
                    v-model="form.phone"
                    type="tel"
                    :class="['field-input', 'input-with-padding', { 'field-error': errors.phone }]"
                    placeholder="09XX XXX XXXX"
                  />
                </div>
                <p v-if="errors.phone" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.phone }}
                </p>
              </div>
            </div>
          </div>

          <!-- Office Information Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Office Information
            </h3>
            <div class="field-stack">
              
              <div class="form-field">
                <label class="field-label">
                  Employee ID <span class="required">*</span>
                </label>
                <input
                  v-model="form.employeeId"
                  type="text"
                  :class="['field-input', { 'field-error': errors.employeeId }]"
                  placeholder=""
                />
                <p v-if="errors.employeeId" class="error-message">
                  <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ errors.employeeId }}
                </p>
              </div>
            </div>
          </div>

          <!-- Access Level Section -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Access Level
            </h3>
            <div class="role-options">
              <label
                v-for="role in roles"
                :key="role.value"
                :class="['role-card', { 'role-selected': form.role === role.value }]"
              >
                <input
                  type="radio"
                  v-model="form.role"
                  :value="role.value"
                  class="role-radio"
                />
                <div class="role-content">
                  <p class="role-label">{{ role.label }}</p>
                  <p class="role-desc">{{ role.desc }}</p>
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
              {{ isSubmitting ? 'Creating...' : 'Create User Account' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['cancel', 'done'])

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'Staff',
  department: '',
  employeeId: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)


const roles = [
  { value: 'Staff', label: 'Staff', desc: 'Regular office staff with basic access' },
  { value: 'Officer-in-charge', label: 'Officer-in-charge', desc: 'Head of the office with elevated access' },
  { value: 'Focal Person', label: 'Focal Person', desc: 'Elevated access for assigned programs' },
  { value: 'Admin', label: 'System Administrator', desc: 'Full system access and management' }
]

const validateForm = () => {
  const newErrors = {}

  if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
  
  if (!form.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (form.phone && !/^(09|\+639)\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) {
    newErrors.phone = 'Please enter a valid PH mobile number'
  }

  if (!form.department) newErrors.department = 'Department is required'
  if (!form.employeeId.trim()) newErrors.employeeId = 'Employee ID is required'

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}


const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    console.log('Creating User:', form)
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
.input-icon { width: 1.25rem; height: 1.25rem; }
.success-icon { width: 1.25rem; height: 1.25rem; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
  animation: fadeIn 0.2s ease-out;
}

.modal-container {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 42rem;
  max-height: 90vh;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  background: linear-gradient(to right, #2563eb, #4f46e5);
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
  color: #bfdbfe;
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
  gap: 1.25rem;
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
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.field-stack {
  display: flex;
  flex-direction: column;
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

.field-input {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.field-input:focus {
  border-color: #3b82f6;
  ring: 2px;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.field-error {
  border-color: #fca5a5 !important;
  background-color: #fef2f2;
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.input-with-padding {
  padding-left: 2.75rem;
}

.error-message {
  margin: 0;
  font-size: 0.75rem;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.role-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.role-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.role-card:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.role-selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.role-radio {
  margin-top: 0.25rem;
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
}

.role-content {
  flex: 1;
}

.role-label {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.role-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
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
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@media (max-width: 768px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .footer-actions {
    width: 100%;
  }
  
  .btn-cancel,
  .btn-submit {
    flex: 1;
  }
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

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>