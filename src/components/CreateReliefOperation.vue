<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-content">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <h2 class="modal-title">Create Relief Operation</h2>
          </div>
        </div>
        <button type="button" class="close-btn" @click="$emit('cancel')" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        
        <div v-if="isSuccess" class="success-view">
          <div class="success-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 class="success-heading">Success!</h3>
          <p class="success-message">
            The relief operation <strong>{{ form.name }}</strong> has been successfully created.
          </p>
          <div class="success-actions">
            <button type="button" class="btn btn-primary" @click="finalize">
              Okay, Close
            </button>
          </div>
        </div>

        <div v-else>
          <div class="form-section">
            <h3 class="section-title">Operation Information</h3>
            
            <div class="form-row">
              <div class="form-group full">
                <label for="operationName" class="form-label">
                  Operation Name <span class="required">*</span>
                </label>
                <input 
                  id="operationName"
                  v-model="form.name" 
                  type="text" 
                  class="form-input"
                  :class="{ 'input-error': errors.name }"
                  placeholder="" 
                  @input="clearError('name')"
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="operationType" class="form-label">
                  Disaster/Incident Type <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select id="operationType" v-model="form.type" class="form-select">
                    <option value="fire">Fire Incident</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="typhoon">Typhoon / Flood</option>
                    <option value="landslide">Landslide</option>
                    <option value="drought">Drought</option>
                    <option value="health">Health Emergency</option>
                    <option value="conflict">Conflict/Violence</option>
                    <option value="other">Other Emergency</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="severity" class="form-label">
                  Severity Level <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select id="severity" v-model="form.severity" class="form-select">
                    <option value="minor">Minor - Limited Impact</option>
                    <option value="moderate">Moderate - Some Displacement</option>
                    <option value="major">Major - Significant Damage</option>
                    <option value="critical">Critical - Large Scale</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Location & Schedule</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="location" class="form-label">
                  Location <span class="required">*</span>
                </label>
                <input 
                  id="location"
                  v-model="form.location" 
                  type="text" 
                  class="form-input"
                  :class="{ 'input-error': errors.location }"
                  placeholder="" 
                  @input="clearError('location')"
                />
                <span v-if="errors.location" class="error-message">{{ errors.location }}</span>
              </div>

              <div class="form-group">
                <label for="coordinates" class="form-label">
                  GPS Coordinates (Optional)
                </label>
                <input 
                  id="coordinates"
                  v-model="form.coordinates" 
                  type="text" 
                  class="form-input"
                  placeholder=""
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="incidentDate" class="form-label">
                  Incident Date & Time <span class="required">*</span>
                </label>
                <input 
                  id="incidentDate"
                  v-model="form.date" 
                  type="datetime-local" 
                  class="form-input"
                  :class="{ 'input-error': errors.date }"
                  :max="maxDateTime"
                  @input="clearError('date')"
                />
                <span v-if="errors.date" class="error-message">{{ errors.date }}</span>
              </div>

              <div class="form-group">
                <label for="operationDate" class="form-label">
                  Operation Start Date
                </label>
                <input 
                  id="operationDate"
                  v-model="form.operationDate" 
                  type="datetime-local" 
                  class="form-input"
                  :min="form.date"
                />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Beneficiaries & Resources</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="targetBeneficiaries" class="form-label">
                  Target Beneficiaries <span class="required">*</span>
                </label>
                <input 
                  id="targetBeneficiaries"
                  v-model="form.target" 
                  type="text" 
                  class="form-input"
                  :class="{ 'input-error': errors.target }"
                  placeholder="" 
                  @input="clearError('target')"
                />
                <span v-if="errors.target" class="error-message">{{ errors.target }}</span>
              </div>

              <div class="form-group">
                <label for="teamLeader" class="form-label">
                  Team Leader/Coordinator
                </label>
                <input 
                  id="teamLeader"
                  v-model="form.teamLeader" 
                  type="text" 
                  class="form-input"
                  placeholder=""
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full">
                <label for="estimatedBudget" class="form-label">
                  Estimated Budget (₱)
                </label>
                <input 
                  id="estimatedBudget"
                  v-model="form.budget" 
                  type="number" 
                  class="form-input"
                  placeholder=""
                  min="0"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full">
                <label for="description" class="form-label">
                  Operation Description
                </label>
                <textarea 
                  id="description"
                  v-model="form.description" 
                  class="form-textarea"
                  rows="3"
                  placeholder="Describe the situation, needs, and planned response activities..."
                ></textarea>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Status & Priority</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="status" class="form-label">
                  Initial Status <span class="required">*</span>
                </label>
                <div class="status-selector">
                  <label class="status-option" :class="{ active: form.status === 'Planning Phase' }">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Planning Phase" 
                      v-model="form.status"
                    />
                    <span class="status-badge planning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      Planning
                    </span>
                  </label>
                  <label class="status-option" :class="{ active: form.status === 'Scheduled' }">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Scheduled" 
                      v-model="form.status"
                    />
                    <span class="status-badge scheduled">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      Scheduled
                    </span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label for="priority" class="form-label">
                  Priority Level <span class="required">*</span>
                </label>
                <div class="priority-selector">
                  <label 
                    v-for="level in ['Low', 'Medium', 'High', 'Urgent']" 
                    :key="level"
                    class="priority-option" 
                    :class="{ active: form.priority === level, [level.toLowerCase()]: true }"
                  >
                    <input 
                      type="radio" 
                      name="priority" 
                      :value="level" 
                      v-model="form.priority"
                    />
                    <span>{{ level }}</span>
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
              <span v-if="isSubmitting">Creating...</span>
              <span v-else>Create Operation</span>
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
  name: '',
  type: 'fire',
  severity: 'moderate',
  location: '',
  coordinates: '',
  date: '',
  operationDate: '',
  target: '',
  teamLeader: '',
  budget: '',
  description: '',
  status: 'Planning Phase',
  priority: 'Medium'
})

const errors = reactive({
  name: '',
  location: '',
  date: '',
  target: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false) // New State for Success View

const maxDateTime = computed(() => {
  return new Date().toISOString().slice(0, 16)
})

const clearError = (field) => {
  errors[field] = ''
}

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!form.name.trim()) {
    errors.name = 'Operation name is required'
    isValid = false
  }
  
  if (!form.location.trim()) {
    errors.location = 'Location is required'
    isValid = false
  }
  
  if (!form.date) {
    errors.date = 'Incident date and time is required'
    isValid = false
  }
  
  if (!form.target.trim()) {
    errors.target = 'Target beneficiaries is required'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    isSubmitting.value = false
    // Show success view
    isSuccess.value = true
  }, 500)
}

const finalize = () => {
  emit('done', { 
    ...form,
    id: Date.now(),
    createdAt: new Date().toISOString()
  })
}
</script>

<style scoped>
/* ADDED: Success View Styles */
.success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  height: 100%;
  animation: fadeIn 0.3s ease;
}

.success-icon-large {
  width: 80px;
  height: 80px;
  background-color: #dcfce7;
  color: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.success-heading {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px;
}

.success-message {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px;
  max-width: 400px;
  line-height: 1.5;
}

.success-actions {
  display: flex;
  justify-content: center;
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* --- Existing Styles Below --- */

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
  padding: 0;
  z-index: 9999;
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
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  overflow: hidden;
  animation: slideUp 0.3s ease;
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

.modal-header {
  padding: 24px 28px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: linear-gradient(to bottom, #f0f9ff, #ffffff);
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.icon-wrapper {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
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
  margin-top: 10px;
  color: #111827;
  line-height: 1.3;
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
  border-bottom: 2px solid #2563eb;
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
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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

.status-badge.planning {
  color: #7c3aed;
}

.status-option.active .status-badge.planning {
  background: #ede9fe;
  border-color: #7c3aed;
}

.status-badge.scheduled {
  color: #2563eb;
}

.status-option.active .status-badge.scheduled {
  background: #dbeafe;
  border-color: #2563eb;
}

.priority-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.priority-option {
  cursor: pointer;
}

.priority-option input[type="radio"] {
  display: none;
}

.priority-option span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  background: white;
  color: #6b7280;
}

.priority-option.active span {
  border-color: currentColor;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.priority-option.low.active span {
  background: #dcfce7;
  border-color: #16a34a;
  color: #16a34a;
}

.priority-option.medium.active span {
  background: #fef3c7;
  border-color: #d97706;
  color: #d97706;
}

.priority-option.high.active span {
  background: #fed7aa;
  border-color: #ea580c;
  color: #ea580c;
}

.priority-option.urgent.active span {
  background: #fee2e2;
  border-color: #dc2626;
  color: #dc2626;
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
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0;
    align-items: flex-end;
  }
  
  .modal-container {
    max-height: 95vh;
    border-radius: 12px 12px 0 0;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .status-selector {
    grid-template-columns: 1fr;
  }
  
  .priority-selector {
    grid-template-columns: repeat(2, 1fr);
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