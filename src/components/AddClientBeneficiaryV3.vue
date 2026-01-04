<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 class="header-title">Create New Client Record</h2>
          </div>
        </div>
        <button @click="handleCancel" class="close-btn" type="button">
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
          <p class="success-title">Client Record Created Successfully!</p>
        </div>
      </div>

      <div class="modal-body">
        
        <div class="search-panel">
          <div class="search-panel-header">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="search-title">Import Pre-Application Data</h3>
          </div>
          <p class="search-desc">Enter the reference number provided by the client.</p>
          
          <div class="search-row">
            <div class="search-input-group">
              <input 
                v-model="searchQuery" 
                type="text" 
                class="search-input" 
                placeholder="e.g. PA-2024-8888"
                @keyup.enter="handleSearch"
              />
              <button 
                type="button" 
                class="btn-search" 
                @click="handleSearch"
                :disabled="isSearching || !searchQuery"
              >
                <span v-if="isSearching" class="btn-spinner-small"></span>
                <span v-else>Import Data</span>
              </button>
            </div>
          </div>

          <div v-if="searchError" class="search-message error">
            <svg class="msg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ searchError }}
          </div>
          <div v-if="importSuccess" class="search-message success">
            <svg class="msg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Data imported successfully! Please verify details below.
          </div>
        </div>

        <div class="form-content">
          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h3>

            <div class="grid-4">
              <div class="form-field">
                <label class="field-label">Surname <span class="required">*</span></label>
                <input
                  v-model="form.surname"
                  type="text"
                  :class="['field-input', { 'field-error': errors.surname }]"
                  placeholder=""
                />
                <p v-if="errors.surname" class="error-message">{{ errors.surname }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">First Name <span class="required">*</span></label>
                <input
                  v-model="form.firstName"
                  type="text"
                  :class="['field-input', { 'field-error': errors.firstName }]"
                  placeholder=""
                />
                <p v-if="errors.firstName" class="error-message">{{ errors.firstName }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">Middle Name</label>
                <input
                  v-model="form.middleName"
                  type="text"
                  class="field-input"
                  placeholder=""
                />
              </div>

              <div class="form-field">
                <label class="field-label">Name Ext.</label>
                <input
                  v-model="form.ext"
                  type="text"
                  class="field-input"
                  placeholder="Jr., Sr., III"
                />
              </div>
            </div>

            <div class="grid-3">
              <div class="form-field">
                <label class="field-label">Age <span class="required">*</span></label>
                <input
                  v-model="form.age"
                  type="number"
                  :class="['field-input', { 'field-error': errors.age }]"
                  placeholder=""
                />
                <p v-if="errors.age" class="error-message">{{ errors.age }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">Sex <span class="required">*</span></label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input type="radio" v-model="form.sex" value="Male" />
                    <span>Male</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="form.sex" value="Female" />
                    <span>Female</span>
                  </label>
                </div>
                <p v-if="errors.sex" class="error-message">{{ errors.sex }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">Religion</label>
                <input
                  v-model="form.religion"
                  type="text"
                  class="field-input"
                  placeholder=""
                />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">Date of Birth <span class="required">*</span></label>
              <input
                v-model="form.dateOfBirth"
                type="date"
                :class="['field-input', { 'field-error': errors.dateOfBirth }]"
              />
              <p v-if="errors.dateOfBirth" class="error-message">{{ errors.dateOfBirth }}</p>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Current Address
            </h3>

            <div class="grid-4">
              <div class="form-field">
                <label class="field-label">Purok</label>
                <input
                  v-model="form.purok"
                  type="text"
                  class="field-input"
                  placeholder=""
                />
              </div>

              <div class="form-field">
                <label class="field-label">Barangay <span class="required">*</span></label>
                <input
                  v-model="form.barangay"
                  type="text"
                  :class="['field-input', { 'field-error': errors.barangay }]"
                  placeholder=""
                />
                <p v-if="errors.barangay" class="error-message">{{ errors.barangay }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">Municipality</label>
                <input
                  v-model="form.municipality"
                  type="text"
                  class="field-input field-readonly"
                  readonly
                />
              </div>

              <div class="form-field">
                <label class="field-label">Province</label>
                <input
                  v-model="form.province"
                  type="text"
                  class="field-input field-readonly"
                  readonly
                />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">Place of Birth</label>
              <div class="grid-4">
                <input
                  v-model="form.birthPurok"
                  type="text"
                  class="field-input"
                  placeholder="Purok"
                />
                <input
                  v-model="form.birthBarangay"
                  type="text"
                  class="field-input"
                  placeholder="Barangay"
                />
                <input
                  v-model="form.birthMunicipality"
                  type="text"
                  class="field-input"
                  placeholder="Municipality"
                />
                <input
                  v-model="form.birthProvince"
                  type="text"
                  class="field-input"
                  placeholder="Province"
                />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Civil Status & Education
            </h3>

            <div class="grid-2">
              <div class="form-field">
                <label class="field-label">Civil Status <span class="required">*</span></label>
                <div class="civil-status-group">
                  <label class="radio-label-block">
                    <input type="radio" v-model="form.civilStatus" value="Single" />
                    <span>Single</span>
                  </label>
                  <label class="radio-label-block">
                    <input type="radio" v-model="form.civilStatus" value="Married" />
                    <span>Married</span>
                  </label>
                  <label class="radio-label-block">
                    <input type="radio" v-model="form.civilStatus" value="Widow/er" />
                    <span>Widow/er</span>
                  </label>
                  <label class="radio-label-block">
                    <input type="radio" v-model="form.civilStatus" value="Separated" />
                    <span>Separated</span>
                  </label>
                  <label class="radio-label-block">
                    <input type="radio" v-model="form.civilStatus" value="Others" />
                    <span>Others</span>
                  </label>
                  <input
                    v-if="form.civilStatus === 'Others'"
                    v-model="form.civilStatusOther"
                    type="text"
                    class="field-input"
                    placeholder="Specify"
                    style="margin-top: 8px;"
                  />
                </div>
                <p v-if="errors.civilStatus" class="error-message">{{ errors.civilStatus }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">Highest Educational Attainment</label>
                <select v-model="form.education" class="field-input">
                  <option value="">Select Educational Level</option>
                  <option value="Elementary Graduate">Elementary Graduate</option>
                  <option value="Elementary Undergraduate">Elementary Undergraduate</option>
                  <option value="High School Graduate">High School Graduate</option>
                  <option value="High School Undergraduate">High School Undergraduate</option>
                  <option value="College Graduate">College Graduate</option>
                  <option value="College Undergraduate">College Undergraduate</option>
                  <option value="Vocational">Vocational</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="No Formal Education">No Formal Education</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Employment & Income
            </h3>

            <div class="grid-2">
              <div class="form-field">
                <label class="field-label">Occupation</label>
                <input
                  v-model="form.occupation"
                  type="text"
                  class="field-input"
                  placeholder="e.g. Farmer, Teacher, Unemployed"
                />
              </div>

              <div class="form-field">
                <label class="field-label">Monthly Income (PHP)</label>
                <div class="input-with-icon">
                  <span class="currency-symbol">₱</span>
                  <input
                    v-model="form.monthlyIncome"
                    type="text"
                    class="field-input input-with-padding"
                    placeholder="0.00"
                    @input="formatIncome"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact & Government Programs
            </h3>

            <div class="grid-2">
              <div class="form-field">
                <label class="field-label">Contact Number <span class="required">*</span></label>
                <input
                  v-model="form.contact"
                  type="tel"
                  :class="['field-input', { 'field-error': errors.contact }]"
                  placeholder="09XX XXX XXXX"
                />
                <p v-if="errors.contact" class="error-message">{{ errors.contact }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="field-input"
                  placeholder=""
                />
              </div>
            </div>

            <div class="checkbox-row">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.pantawid" />
                <span>4Ps / Pantawid Beneficiary</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.philhealth" />
                <span>PhilHealth Member</span>
              </label>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Client Role & Record Status
            </h3>

            <div class="grid-2">
              <div class="form-field">
                <label class="field-label">Client Role <span class="required">*</span></label>
                <select v-model="form.role" :class="['field-input', { 'field-error': errors.role }]">
                  <option value="">Select Role</option>
                  <option value="Client">Client (Requesting Assistance)</option>
                  <option value="Beneficiary">Beneficiary (Receiving Assistance)</option>
                  <option value="Both">Both Client & Beneficiary</option>
                </select>
                <p v-if="errors.role" class="error-message">{{ errors.role }}</p>
              </div>

              <div class="form-field">
                <label class="field-label">Record Status</label>
                <select v-model="form.status" class="field-input">
                  <option value="Pending">Pending Verification</option>
                  <option value="Approved">Approved</option>
                  <option value="Active">Active</option>
                </select>
              </div>
            </div>
          </div>
        </div>

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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ isSubmitting ? 'Creating Record...' : 'Create Client Record' }}
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

// --- Search / Import Logic ---
const searchQuery = ref('')
const isSearching = ref(false)
const searchError = ref('')
const importSuccess = ref(false)

const handleSearch = () => {
  if (!searchQuery.value) return
  
  isSearching.value = true
  searchError.value = ''
  importSuccess.value = false

  // SIMULATED API CALL
  // In your real system, this would be: await axios.get(`/api/pre-applications/${searchQuery.value}`)
  setTimeout(() => {
    // For demo: Use 'PA-2024-8888' to test success, anything else fails
    if (searchQuery.value.toUpperCase() === 'PA-2024-8888') {
      
      // Auto-populate the form
      const mockData = {
        surname: 'Bautista',
        firstName: 'Maria',
        middleName: 'Reyes',
        ext: '',
        age: '32',
        sex: 'Female',
        religion: 'Roman Catholic',
        dateOfBirth: '1992-05-15',
        purok: 'Purok 5',
        barangay: 'San Pedro',
        contact: '09171234567',
        email: 'maria.b@gmail.com',
        occupation: 'Vendor',
        monthlyIncome: '5,000.00',
        civilStatus: 'Married',
        pantawid: true,
        philhealth: true
      }

      // Merge mock data into form
      Object.assign(form, mockData)
      
      importSuccess.value = true
      // Clear errors that might have existed
      errors.value = {}
    } else {
      searchError.value = `Reference number "${searchQuery.value}" not found in pre-application records.`
    }
    
    isSearching.value = false
  }, 1000)
}

// --- Main Form Logic ---
const form = reactive({
  surname: '',
  firstName: '',
  middleName: '',
  ext: '',
  age: '',
  sex: '',
  religion: '',
  dateOfBirth: '',
  
  purok: '',
  barangay: '',
  municipality: 'Initao',
  province: 'Mis. Or.',
  
  birthPurok: '',
  birthBarangay: '',
  birthMunicipality: '',
  birthProvince: '',
  
  civilStatus: '',
  civilStatusOther: '',
  education: '',
  
  occupation: '',
  monthlyIncome: '',
  
  contact: '',
  email: '',
  
  pantawid: false,
  philhealth: false,
  
  role: '',
  status: 'Pending'
})

const errors = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)
const referenceNumber = ref('')

const generateReferenceNumber = () => {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `CLT-${year}-${random}`
}

const formatIncome = (e) => {
  let value = e.target.value.replace(/,/g, '')
  
  if (value && !isNaN(value)) {
    const parts = parseFloat(value).toFixed(2).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    form.monthlyIncome = parts.join('.')
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!form.surname.trim()) newErrors.surname = 'Surname is required'
  if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!form.age) newErrors.age = 'Age is required'
  if (!form.sex) newErrors.sex = 'Sex is required'
  if (!form.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
  if (!form.barangay.trim()) newErrors.barangay = 'Barangay is required'
  if (!form.civilStatus) newErrors.civilStatus = 'Civil status is required'
  if (!form.role) newErrors.role = 'Client role is required'
  
  if (!form.contact.trim()) {
    newErrors.contact = 'Contact number is required'
  } else if (!/^(09|\+639)\d{9}$/.test(form.contact.replace(/[\s-]/g, ''))) {
    newErrors.contact = 'Please enter a valid PH mobile number'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  referenceNumber.value = generateReferenceNumber()
  
  setTimeout(() => {
    const payload = {
      ...form,
      fullName: `${form.firstName} ${form.middleName} ${form.surname} ${form.ext}`.trim().replace(/\s+/g, ' '),
      systemReferenceNumber: referenceNumber.value,
      preAppReference: searchQuery.value, // Save the pre-app ref if used
      createdAt: new Date().toISOString()
    }
    
    console.log('Creating Client Record:', payload)
    isSubmitting.value = false
    showSuccess.value = true
    
    setTimeout(() => {
      emit('done', payload)
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
.btn-icon { width: 1.125rem; height: 1.125rem; }

/* Modal Basics */
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
  max-width: 56rem;
  max-height: 90vh;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  background: linear-gradient(to right, #5b4b8a, #7c6ba8);
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

/* --- NEW: Search Panel Styles --- */
.search-panel {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 2rem;
}

.search-panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #5b4b8a;
}

.search-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.search-desc {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1rem 0;
}

.search-row {
  max-width: 400px;
}

.search-input-group {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.625rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #5b4b8a;
  box-shadow: 0 0 0 2px rgba(91, 75, 138, 0.1);
}

.btn-search {
  background-color: #475569;
  color: white;
  border: none;
  padding: 0 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-search:hover:not(:disabled) {
  background-color: #334155;
}

.btn-search:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.search-message {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
}

.search-message.error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.search-message.success {
  background-color: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.msg-icon {
  width: 1rem;
  height: 1rem;
}

.btn-spinner-small {
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

/* --- Common Form Styles --- */
.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #4b5563;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

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

.required { color: #ef4444; }

.field-input {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-family: inherit;
  background-color: #fff;
}

.field-readonly {
  background-color: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}

.field-input:focus {
  border-color: #7c6ba8;
  box-shadow: 0 0 0 3px rgba(124, 107, 168, 0.15);
}

.field-error {
  border-color: #fca5a5 !important;
  background-color: #fef2f2;
}

.error-message {
  margin: 0;
  font-size: 0.75rem;
  color: #dc2626;
}

/* Radio & Checkbox */
.radio-group { display: flex; gap: 1.5rem; padding: 0.625rem 0; }
.civil-status-group { display: flex; flex-wrap: wrap; gap: 1rem; padding: 0.5rem 0; }
.radio-label, .radio-label-block, .checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #374151; cursor: pointer; }
.checkbox-row { display: flex; gap: 2rem; padding: 0.5rem 0; }
input[type="radio"], input[type="checkbox"] { accent-color: #5b4b8a; width: 1rem; height: 1rem; cursor: pointer; }

/* Currency */
.input-with-icon { position: relative; }
.currency-symbol { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #6b7280; font-weight: 500; }
.input-with-padding { padding-left: 2.25rem; }

select.field-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center; 
  background-size: 1rem; 
  padding-right: 2.5rem;
  cursor: pointer;
}

/* Footer & Buttons */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.footer-note { font-size: 0.75rem; color: #6b7280; margin: 0; }
.footer-actions { display: flex; gap: 0.75rem; }

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
.btn-cancel:hover { background-color: #f9fafb; }

.btn-submit {
  padding: 0.625rem 1.5rem;
  background: #5b4b8a;
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
}
.btn-submit:hover { background-color: #4c3e74; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.btn-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* Mobile */
@media (max-width: 768px) {
  .modal-container { height: 100vh; max-height: 100vh; border-radius: 0; display: flex; flex-direction: column; }
  .modal-body { flex: 1; }
  .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
  .checkbox-row { flex-direction: column; gap: 1rem; }
  .modal-footer { flex-direction: column-reverse; gap: 1rem; align-items: stretch; }
  .footer-actions { display: grid; grid-template-columns: 1fr 1fr; }
  .btn-submit, .btn-cancel { justify-content: center; }
  
  .search-row { max-width: 100%; }
}
</style>