<template>
  <div class="modal-overlay">
    <div class="modal-container">
      
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 class="header-title">Assessment & Recommendation</h2>
            
          </div>
        </div>
        <button @click="$emit('cancel')" class="close-btn" type="button">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div v-if="showSuccess" class="success-banner">
        <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="success-title">Assessment Submitted Successfully!</p>
        </div>
      </div>

      <div class="modal-body">
        
        <div class="client-context-banner" v-if="partOneData">
          <div class="context-label">ASSESSING CLIENT:</div>
          <div class="context-info">
            <strong>{{ partOneData.firstName }} {{ partOneData.surname }}</strong>
            <span class="context-divider">|</span>
            Ref: {{ partOneData.referenceNumber }}
          </div>
        </div>

        <div class="form-content">
          
          <div class="form-section">
            <h3 class="section-title">
              
              I. Assessment - Economic Profile
            </h3>

            <div class="grid-2">
              <div class="form-field">
                <label class="field-label">Income/Expenditure Analysis <span class="required">*</span></label>
                <div class="radio-vertical-group">
                  <label class="radio-label">
                    <input type="radio" v-model="form.incomeAnalysis" value="Equal" />
                    <span>Income is equal to monthly expenses</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="form.incomeAnalysis" value="Higher" />
                    <span>Income is higher than monthly expenses</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="form.incomeAnalysis" value="Lower" />
                    <span>Income is lower than monthly expenses</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="form.incomeAnalysis" value="NoPermanent" />
                    <span>Family has no permanent/fixed income</span>
                  </label>
                </div>
              </div>

              <div class="form-field">
                <label class="field-label">Economic Condition <span class="required">*</span></label>
                <div class="radio-vertical-group">
                  <label class="radio-label">
                    <input type="radio" v-model="form.economicCondition" value="Sufficient_All" />
                    <span>Sufficient to meet entire family's basic needs</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="form.economicCondition" value="Sufficient_Some" />
                    <span>Sufficient to meet some basic needs</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="form.economicCondition" value="Insufficient" />
                    <span>Insufficient to meet/provide all basic needs</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="form.economicCondition" value="NA" />
                    <span>Not Applicable</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
    
              II. Problem Presented & Findings
            </h3>

            <div class="form-field">
              <label class="field-label">Problem/s Presented <span class="required">*</span></label>
              <div class="checkbox-grid">
                <label v-for="prob in problemsList" :key="prob" class="checkbox-label">
                  <input type="checkbox" :value="prob" v-model="form.problemsPresented" />
                  <span>{{ prob }}</span>
                </label>
              </div>
              <div v-if="form.problemsPresented.includes('OTHERS')" class="mt-2">
                <input 
                  v-model="form.problemOthers"
                  type="text" 
                  class="field-input" 
                  placeholder="Specify other problem..." 
                />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">Client Category <span class="required">*</span></label>
              <select v-model="form.clientCategory" :class="['field-input', { 'field-error': errors.clientCategory }]">
                <option value="">Select Category</option>
                <option value="Family Head">Family head and other adult in need</option>
                <option value="Needy Youth">Needy youth</option>
                <option value="Child Situation">Child in difficult situation</option>
                <option value="Youth Offender">Youthful offender</option>
                <option value="PWD">Person with disability (PWD)</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Disaster Victim">Disaster victim</option>
                <option value="Stranded">Stranded</option>
              </select>
              <p v-if="errors.clientCategory" class="error-message">{{ errors.clientCategory }}</p>
            </div>

            <div class="form-field">
              <label class="field-label">Specific Findings / Narrative <span class="required">*</span></label>
              <textarea
                v-model="form.specificFindings"
                class="field-input field-textarea"
                rows="4"
                placeholder="Enter detailed assessment findings..."
                :class="{ 'field-error': errors.specificFindings }"
              ></textarea>
              <p v-if="errors.specificFindings" class="error-message">{{ errors.specificFindings }}</p>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">

              III. Evaluation & Recommendation
            </h3>

            <div class="form-field">
              <label class="field-label">Evaluation Status <span class="required">*</span></label>
              <div class="grid-2">
                <label class="radio-label">
                  <input type="radio" v-model="form.evaluationStatus" value="Indigent" />
                  <span>Indigent</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="form.evaluationStatus" value="Exhausted Resources" />
                  <span>Exhausted Resources</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="form.evaluationStatus" value="Limited Resources" />
                  <span>Limited Economic Resources</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="form.evaluationStatus" value="Dire Need" />
                  <span>In dire need of immediate/appropriate interventions</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="form.evaluationStatus" value="Not Eligible" />
                  <span>Not Eligible</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="form.evaluationStatus" value="Eligible" />
                  <span>Eligible</span>
                </label>
              </div>
              <p v-if="errors.evaluationStatus" class="error-message">{{ errors.evaluationStatus }}</p>
            </div>

            <div class="form-field">
              <label class="field-label">Highly Recommended For:</label>
              <input
                v-model="form.recommendation"
                type="text"
                class="field-input"
                placeholder="Specific assistance or intervention recommended..."
              />
            </div>

             <div class="grid-2 mt-4">
               <div class="form-field">
                 <label class="field-label">Interviewed By (Social Worker)</label>
                 <input
                   v-model="form.socialWorkerName"
                   type="text"
                   class="field-input field-readonly"
                   readonly
                   placeholder=""
                 />
               </div>
               <div class="form-field">
                 <label class="field-label">Noted By (Unit Head)</label>
                 <input
                   v-model="form.unitHead"
                   type="text"
                   class="field-input"
                   placeholder=""
                 />
               </div>
             </div>
          </div>

        </div>

        <div class="modal-footer">
          <p class="footer-note">
            <span class="required">*</span> Required fields
          </p>
          <div class="footer-actions">
            <button @click="$emit('back')" type="button" class="btn-cancel" :disabled="isSubmitting">
              Back
            </button>
            
            <button @click="handleSubmit" type="button" class="btn-submit" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="btn-spinner"></span>
              <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {{ isSubmitting ? 'Saving...' : 'Finish & Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// ACCEPT DATA FROM PARENT
const props = defineProps({
  partOneData: {
    type: Object,
    required: true
  }
})

// DEFINE EMITS (cancel = close, back = prev step, finish = submit)
const emit = defineEmits(['cancel', 'back', 'finish'])

// Static list of problems
const problemsList = [
  'Medicines', 'Coffin', 'Temporary Shelter', 'Financial Aid',
  'Embalming', 'Hospital Bill', 'Food Assistance', 'Transportation',
  'Court Related', 'OTHERS'
]

const form = reactive({
  // Section I
  incomeAnalysis: '',
  economicCondition: '',
  problemsPresented: [],
  problemOthers: '',
  clientCategory: '',
  specificFindings: '',
  
  // Section II
  evaluationStatus: '',
  recommendation: '',
  
  // Signatories
  socialWorkerName: '', 
  unitHead: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = () => {
  const newErrors = {}

  if (!form.incomeAnalysis) newErrors.incomeAnalysis = 'Please select an income analysis.'
  if (!form.economicCondition) newErrors.economicCondition = 'Please select an economic condition.'
  if (form.problemsPresented.length === 0) newErrors.problemsPresented = 'Select at least one problem.'
  if (!form.clientCategory) newErrors.clientCategory = 'Client Category is required.'
  if (!form.specificFindings.trim()) newErrors.specificFindings = 'Specific findings are required.'
  if (!form.evaluationStatus) newErrors.evaluationStatus = 'Evaluation status is required.'

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  
  // MERGE Part 1 (props) and Part 2 (form) data
  const finalData = {
    ...props.partOneData, // Data from Step 1
    ...form,              // Data from Step 2
    timestamp: new Date().toISOString()
  }

  // Simulate API call
  setTimeout(() => {
    console.log('Final Submission Data:', finalData)
    isSubmitting.value = false
    showSuccess.value = true
    
    setTimeout(() => {
      // Emit 'finish' with the complete data object
      emit('finish', finalData)
    }, 1500)
  }, 1000)
}
</script>

<style scoped>
/* Previous Styles + New Client Banner Style */
* { box-sizing: border-box; }

.icon { width: 1.25rem; height: 1.25rem; }
.section-icon { width: 1rem; height: 1rem; }
.btn-icon { width: 1.125rem; height: 1.125rem; }
.success-icon { width: 1.25rem; height: 1.25rem; }

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
  background: linear-gradient(to right, #5b4b8a, #7c6ba8);
  padding: 1.25rem 1.5rem; display: flex; align-items: center;
  justify-content: space-between; flex-shrink: 0;
}

.header-content { display: flex; align-items: center; gap: 0.75rem; }
.header-icon { background: rgba(255, 255, 255, 0.2); padding: 0.5rem; border-radius: 0.5rem; color: white; }
.header-title { font-size: 1.25rem; font-weight: 700; color: white; margin: 0; }
.header-subtitle { color: #d8d0eb; font-size: 0.875rem; margin: 0; }
.close-btn { color: white; background: none; border: none; padding: 0.5rem; border-radius: 0.5rem; cursor: pointer; }
.close-btn:hover { background: rgba(255, 255, 255, 0.2); }

/* --- NEW STYLE FOR CLIENT CONTEXT --- */
.client-context-banner {
  background-color: #f0f4ff;
  border-bottom: 1px solid #dbeafe;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #1e3a8a;
}
.context-label { font-weight: 700; letter-spacing: 0.5px; font-size: 0.75rem; opacity: 0.8; }
.context-divider { margin: 0 0.5rem; opacity: 0.4; }
/* ------------------------------------ */

.modal-body { padding: 0; overflow-y: auto; flex: 1; display: flex; flex-direction: column; }
.form-content { padding: 1.5rem; display: flex; flex-direction: column; gap: 2rem; }

.form-section { display: flex; flex-direction: column; gap: 1rem; }

.section-title {
  font-size: 0.95rem; font-weight: 600; color: #4b5563; margin: 0;
  display: flex; align-items: center; gap: 0.5rem; padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }

.checkbox-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem; background: #f9fafb; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e5e7eb;
}

.radio-vertical-group { display: flex; flex-direction: column; gap: 0.75rem; padding: 0.5rem 0; }
.form-field { display: flex; flex-direction: column; gap: 0.375rem; }
.field-label { font-size: 0.875rem; font-weight: 500; color: #374151; }

.field-input {
  width: 100%; padding: 0.625rem 1rem; border: 1px solid #d1d5db;
  border-radius: 0.5rem; outline: none; font-size: 0.875rem;
  font-family: inherit; transition: all 0.2s;
}
.field-textarea { resize: vertical; }
.field-input:focus { border-color: #7c6ba8; box-shadow: 0 0 0 3px rgba(124, 107, 168, 0.15); }
.field-readonly { background-color: #f3f4f6; color: #6b7280; cursor: default; }
.field-error { border-color: #fca5a5 !important; background-color: #fef2f2; }
.error-message { margin: 0; font-size: 0.75rem; color: #dc2626; }
.required { color: #ef4444; }

.radio-label, .checkbox-label { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.875rem; color: #374151; cursor: pointer; }
input[type="radio"], input[type="checkbox"] { accent-color: #5b4b8a; width: 1rem; height: 1rem; margin-top: 0.125rem; cursor: pointer; }

.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }

.success-banner {
  background: #f0fdf4; border-left: 4px solid #22c55e;
  padding: 1rem 1.5rem; display: flex; align-items: center; gap: 0.75rem;
}
.success-title { font-weight: 600; color: #166534; margin: 0; }

.modal-footer {
  display: flex; align-items: center; justify-content: space-between;
  gap: 0.75rem; padding: 1.5rem; border-top: 1px solid #e5e7eb;
  background-color: white; margin-top: auto;
}

.footer-note { font-size: 0.75rem; color: #6b7280; margin: 0; }
.footer-actions { display: flex; gap: 0.75rem; }

.btn-cancel {
  padding: 0.625rem 1.5rem; border: 1px solid #d1d5db; color: #374151;
  border-radius: 0.5rem; font-weight: 500; cursor: pointer; background: white;
}
.btn-cancel:hover { background-color: #f9fafb; }

.btn-submit {
  padding: 0.625rem 1.5rem; background: #5b4b8a; color: white;
  border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;
  display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;
}
.btn-submit:hover { background-color: #4c3e74; }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.btn-spinner {
  width: 1rem; height: 1rem; border: 2px solid #ffffff;
  border-top-color: transparent; border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .modal-container { height: 100vh; max-height: 100vh; border-radius: 0; }
  .grid-2 { grid-template-columns: 1fr; }
  .modal-footer { flex-direction: column-reverse; gap: 1rem; align-items: stretch; }
  .footer-actions { display: grid; grid-template-columns: 1fr 1fr; }
  .btn-submit, .btn-cancel { justify-content: center; }
}
</style>