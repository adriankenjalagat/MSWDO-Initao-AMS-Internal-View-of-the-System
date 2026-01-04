<template>
  <div class="assistance-management">
    <div class="header">
      <h1 class="page-title">Assistance Management</h1>
      <button class="new-application-btn" @click="showAddModal = true">
        <span>+</span>
        New Application
      </button>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-label-section">
            <span class="stat-label">Total Applications</span>
            <div class="filter-buttons">
              <button class="filter-btn" :class="{ active: activeFilter === 'month' }" @click="activeFilter = 'month'">Month</button>
              <button class="filter-btn" :class="{ active: activeFilter === 'year' }" @click="activeFilter = 'year'">Year</button>
            </div>
          </div>
          <h2 class="stat-number">1,248</h2>
          <p class="stat-change positive">↑ 12% from last month</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-label-section">
            <span class="stat-label">Approved</span>
            <div class="filter-buttons">
              <button class="filter-btn" :class="{ active: activeFilter === 'month' }" @click="activeFilter = 'month'">Month</button>
              <button class="filter-btn" :class="{ active: activeFilter === 'year' }" @click="activeFilter = 'year'">Year</button>
            </div>
          </div>
          <h2 class="stat-number green">856</h2>
          <p class="stat-description">68% approval rate</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-label-section">
            <span class="stat-label">Pending Review</span>
            <div class="filter-buttons">
               <button class="filter-btn" :class="{ active: activeFilter === 'month' }" @click="activeFilter = 'month'">Month</button>
               <button class="filter-btn" :class="{ active: activeFilter === 'year' }" @click="activeFilter = 'year'">Year</button>
            </div>
          </div>
          <h2 class="stat-number orange">134</h2>
          <p class="stat-description">Requires action</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-label-section">
            <span class="stat-label">Rejected</span>
            <div class="filter-buttons">
               <button class="filter-btn" :class="{ active: activeFilter === 'month' }" @click="activeFilter = 'month'">Month</button>
               <button class="filter-btn" :class="{ active: activeFilter === 'year' }" @click="activeFilter = 'year'">Year</button>
            </div>
          </div>
          <h2 class="stat-number red">258</h2>
          <p class="stat-description">20% rejection rate</p>
        </div>
      </div>
    </div>

    <div class="applications-section">
      <div class="section-header">
        <div class="header-left">
            <h2 class="section-title">Recent Applications</h2>
            <span v-if="selectedItems.length > 0" class="selection-count">
                {{ selectedItems.length }} selected
            </span>
        </div>
        
        <div class="header-actions">
            <div class="search-box">
              <span class="search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" />
            </div>

            <button class="secondary-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path></svg>
                Filter
            </button>
            
            <button class="secondary-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export
            </button>
        </div>
      </div>
      
      <div class="table-container">
        <table class="applications-table">
          <thead>
            <tr>
              <th class="checkbox-col">
                <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" class="custom-checkbox">
              </th>
              <th>ID</th>
              <th>APPLICANT NAME</th>
              <th>PROGRAM TYPE</th>
              <th>AMOUNT</th>
              <th>DATE APPLIED</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="application in filteredApplications" :key="application.id" class="table-row" :class="{ 'selected': selectedItems.includes(application.id) }">
              <td class="checkbox-col">
                <input type="checkbox" :value="application.id" v-model="selectedItems" class="custom-checkbox">
              </td>
              <td class="id-col">{{ application.appId }}</td>
              <td class="applicant-col">
                <div class="applicant-cell">
                  <div v-if="application.avatar" class="avatar">
                    <img :src="application.avatar" :alt="application.name" />
                  </div>
                  <div v-else class="avatar-initials" :style="{ backgroundColor: application.avatarColor }">
                    {{ application.initials }}
                  </div>
                  <div class="applicant-info">
                    <div class="name">{{ application.name }}</div>
                    <div class="role">{{ application.role }}</div>
                  </div>
                </div>
              </td>
              <td>{{ application.programType }}</td>
              <td class="amount-col">{{ formatAmount(application.amount) }}</td>
              <td>{{ application.dateApplied }}</td>
              <td>
                <span class="status-badge" :class="application.status.toLowerCase()">{{ application.status }}</span>
              </td>
              <td class="actions-col">
                <button class="action-icon" title="View"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button>
                <button class="action-icon-more" title="More"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="pagination">
        <div class="pagination-info">
          Showing {{ paginationStart }}-{{ paginationEnd }} of {{ totalApplications }} applications
        </div>
        <div class="pagination-controls">
          <button class="page-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
          <button v-for="page in visiblePages" :key="page" class="page-btn" :class="{ active: page === currentPage }" @click="goToPage(page)">{{ page }}</button>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
        </div>
      </div>
    </div>

    <Modal v-if="showAddModal" title="New Application" @close="showAddModal = false">
      <AddApplication @cancel="showAddModal = false" @done="handleNewApplication" />
    </Modal>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Modal from '../../components/Modal.vue'
import AddApplication from '../../components/AddApplication.vue'

// --- State ---
const showAddModal = ref(false)
const searchQuery = ref('')
const activeFilter = ref('month')
const currentPage = ref(1)
const itemsPerPage = 6
const selectedItems = ref([])

// Dummy Data
const applications = ref([
  { id: 1, appId: 'APP-2023-892', name: 'Maria Santos', role: 'Beneficiary', initials: 'MS', avatarColor: '#e3f2fd', avatar: null, programType: 'Medical Assistance (AICS)', amount: 5000.00, dateApplied: 'Oct 24, 2023', status: 'Approved' },
  { id: 2, appId: 'APP-2023-891', name: 'Juan Dela Cruz', role: 'Client', initials: 'JD', avatarColor: '#fff3e0', avatar: null, programType: 'Educational Assistance', amount: 3000.00, dateApplied: 'Oct 24, 2023', status: 'Pending' },
  { id: 3, appId: 'APP-2023-890', name: 'Elena Reyes', role: 'Beneficiary', initials: 'ER', avatarColor: '#fce4ec', avatar: null, programType: 'Social Pension', amount: 1500.00, dateApplied: 'Oct 23, 2023', status: 'Approved' },
  { id: 4, appId: 'APP-2023-889', name: 'Ricardo Dalisay', role: 'Client', initials: 'RD', avatarColor: '#e8f5e9', avatar: null, programType: 'Burial Assistance', amount: 10000.00, dateApplied: 'Oct 22, 2023', status: 'Rejected' },
  { id: 5, appId: 'APP-2023-888', name: 'Ana Bautista', role: 'Beneficiary', initials: 'AB', avatarColor: '#e1f5fe', avatar: null, programType: 'Transportation Aid', amount: 2500.00, dateApplied: 'Oct 21, 2023', status: 'Approved' },
  { id: 6, appId: 'APP-2023-887', name: 'Manuel Lopez', role: 'Client', initials: 'ML', avatarColor: '#fff9c4', avatar: null, programType: 'Medical Assistance (AICS)', amount: 7500.00, dateApplied: 'Oct 20, 2023', status: 'Pending' }
])

// --- Methods ---

// Handle the data coming from the AddApplication form
const handleNewApplication = (formData) => {
  const newId = applications.value.length + 1
  const initials = formData.firstName.charAt(0) + formData.lastName.charAt(0)
  
  // Random color for avatar (simple logic)
  const colors = ['#e3f2fd', '#fff3e0', '#fce4ec', '#e8f5e9', '#e1f5fe', '#fff9c4']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  const newItem = {
    id: newId,
    appId: `APP-2024-${892 + newId}`,
    name: formData.fullName,
    role: formData.role,
    initials: initials.toUpperCase(),
    avatarColor: randomColor,
    avatar: null,
    programType: formData.programType,
    amount: parseFloat(formData.amount),
    dateApplied: 'Jan 04, 2024', // Current Date
    status: formData.status
  }

  applications.value.unshift(newItem)
  showAddModal.value = false
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const visibleIds = paginatedApplications.value.map(app => app.id)
    selectedItems.value = selectedItems.value.filter(id => !visibleIds.includes(id))
  } else {
    const visibleIds = paginatedApplications.value.map(app => app.id)
    visibleIds.forEach(id => {
      if (!selectedItems.value.includes(id)) {
        selectedItems.value.push(id)
      }
    })
  }
}

const formatAmount = (amount) => {
  return '₱' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// --- Computed Props ---
const filteredList = computed(() => {
  if (!searchQuery.value) return applications.value
  const query = searchQuery.value.toLowerCase()
  return applications.value.filter(app => 
    app.appId.toLowerCase().includes(query) ||
    app.name.toLowerCase().includes(query) ||
    app.programType.toLowerCase().includes(query)
  )
})

const paginatedApplications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredList.value.slice(start, end)
})

const filteredApplications = computed(() => paginatedApplications.value)

const totalApplications = computed(() => filteredList.value.length)
const totalPages = computed(() => Math.ceil(totalApplications.value / itemsPerPage))

const paginationStart = computed(() => {
  if (totalApplications.value === 0) return 0
  return (currentPage.value - 1) * itemsPerPage + 1
})

const paginationEnd = computed(() => {
  const end = currentPage.value * itemsPerPage
  return end > totalApplications.value ? totalApplications.value : end
})

const visiblePages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

const isAllSelected = computed(() => {
  return paginatedApplications.value.length > 0 && 
         paginatedApplications.value.every(app => selectedItems.value.includes(app.id))
})

// --- Watchers ---
watch(searchQuery, () => {
  currentPage.value = 1
})

</script>

<style scoped>
* { box-sizing: border-box; }
.assistance-management { padding: -5px; background-color: #f5f7fa; min-height: 100vh; width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; width: 100%; }
.page-title { font-size: 30px; font-family: outfit; font-weight: 600; margin: 0; color: #1a1a1a; }
.new-application-btn { padding: 12px 22px; background: #4c6ef5; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; position: relative; top: 14px; }
.new-application-btn:hover { background: #3b5bdb; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px; }
.stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.stat-header { display: flex; flex-direction: column; }
.stat-label-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.stat-label { font-size: 13px; color: #666; font-weight: 500; }
.filter-buttons { display: flex; gap: 4px; background: #f5f5f5; padding: 2px; border-radius: 6px; }
.filter-btn { padding: 4px 12px; background: transparent; border: none; border-radius: 4px; font-size: 11px; font-weight: 500; color: #666; cursor: pointer; transition: all 0.2s; }
.filter-btn.active { background: white; color: #1a1a1a; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); }
.stat-number { font-size: 36px; font-weight: 700; margin: 0 0 4px 0; color: #1a1a1a; }
.stat-number.green { color: #0d7738; }
.stat-number.orange { color: #e67700; }
.stat-number.red { color: #c92a2a; }
.stat-change { font-size: 12px; margin: 0; }
.stat-change.positive { color: #0d7738; }
.stat-description { font-size: 12px; color: #666; margin: 0; }
.applications-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
.header-left { display: flex; align-items: center; gap: 12px; }
.section-title { font-size: 20px; font-weight: 600; margin: 0; color: #1a1a1a; }
.selection-count { font-size: 13px; color: #4c6ef5; background: #edf2ff; padding: 2px 8px; border-radius: 4px; font-weight: 500; }
.header-actions { display: flex; align-items: center; gap: 12px; }
.search-box { display: flex; align-items: center; background: #f9fafb; border: 1px solid #e0e0e0; border-radius: 8px; padding: 8px 16px; width: 250px; }
.search-icon { margin-right: 8px; opacity: 0.5; }
.search-input { border: none; outline: none; background: transparent; font-size: 14px; width: 100%; }
.secondary-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: white; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; color: #444; cursor: pointer; font-weight: 500; transition: all 0.2s; }
.secondary-btn:hover { background: #f8f9fa; border-color: #d0d0d0; }
.table-container { overflow-x: auto; margin-bottom: 20px; }
.applications-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.applications-table thead th { text-align: left; font-size: 11px; font-weight: 600; color: #666; text-transform: uppercase; padding: 12px; border-bottom: 2px solid #f0f0f0; letter-spacing: 0.5px; }
.applications-table tbody td { padding: 16px 12px; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px; vertical-align: middle; }
.table-row:hover { background-color: #f9fafb; }
.table-row.selected { background-color: #f0f7ff; }
.checkbox-col { width: 40px; text-align: center; }
.custom-checkbox { width: 16px; height: 16px; cursor: pointer; accent-color: #4c6ef5; }
.id-col { font-weight: 500; color: #666; font-size: 13px; }
.applicant-cell { display: flex; align-items: center; gap: 12px; }
.avatar, .avatar-initials { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; overflow: hidden; }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar-initials { display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: #333; }
.applicant-info { display: flex; flex-direction: column; }
.name { font-weight: 500; color: #1a1a1a; margin-bottom: 2px; }
.role { font-size: 12px; color: #999; }
.amount-col { font-weight: 600; color: #1a1a1a; }
.status-badge { padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; display: inline-block; }
.status-badge.approved { background: #d3f9e3; color: #0d7738; }
.status-badge.pending { background: #fff4d6; color: #996600; }
.status-badge.rejected { background: #ffe5e5; color: #c92a2a; }
.actions-col { display: flex; gap: 12px; align-items: center; }
.action-icon, .action-icon-more { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; opacity: 0.6; transition: opacity 0.2s; }
.action-icon:hover, .action-icon-more:hover { opacity: 1; }
.action-icon-more { font-size: 20px; font-weight: bold; }
.pagination { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid #f0f0f0; }
.pagination-info { font-size: 14px; color: #666; }
.pagination-controls { display: flex; gap: 8px; }
.page-btn { padding: 8px 12px; border: 1px solid #e0e0e0; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.2s; min-width: 40px; }
.page-btn:hover:not(:disabled):not(.active) { background: #f5f5f5; }
.page-btn.active { background: #4c6ef5; color: white; border-color: #4c6ef5; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
@media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .section-header { flex-direction: column; align-items: flex-start; } .header-actions { width: 100%; flex-wrap: wrap; } .search-box { width: 100%; flex: 1; min-width: 200px; } }
@media (max-width: 768px) { .header { flex-direction: column; align-items: flex-start; gap: 16px; } .new-application-btn { width: 100%; justify-content: center; } .stats-grid { grid-template-columns: 1fr; } .applications-table { font-size: 12px; } .applications-table thead th, .applications-table tbody td { padding: 8px 6px; } .pagination { flex-direction: column; gap: 16px; } }
</style>