<template>
  <div class="client-management">
    <h1 class="page-title">Client & Beneficiary Management</h1>

    <div v-if="selectedClient" class="selected-client-card">
      <div class="selected-client-heading">
        <div>
          <p class="selected-client-tag">Viewing Profile</p>
          <h2>{{ selectedClient.name }}</h2>
          <p class="selected-client-role">{{ selectedClient.role }} • {{ selectedClient.clientId }}</p>
        </div>
        <button class="back-to-list" @click="clearSelectedClient">Back to list</button>
      </div>
      <div class="selected-client-grid">
        <div>
          <p class="detail-label">Contact</p>
          <p class="detail-value">{{ selectedClient.contact }}</p>
        </div>
        <div>
          <p class="detail-label">Email</p>
          <p class="detail-value">{{ selectedClient.email }}</p>
        </div>
        <div>
          <p class="detail-label">Address</p>
          <p class="detail-value">{{ selectedClient.address }}</p>
        </div>
        <div>
          <p class="detail-label">Status</p>
          <p class="detail-value">{{ selectedClient.status }}</p>
        </div>
      </div>
    </div>

    <div class="action-bar">
      <div class="search-box">
        <span class="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input type="text" v-model="searchQuery" placeholder="Search by ID, name or contact..." class="search-input" />
      </div>
      
      <div class="action-buttons">
        <button class="export-btn">
          <span class="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </span>
          Export Selected
        </button>
        
        <button class="add-btn" @click="openModal">
          <span class="btn-icon">+</span>
          Add Client/Beneficiary
        </button>
      </div>
    </div>
    
    <div class="table-container">
      <table class="clients-table">
        <thead>
          <tr>
            <th class="checkbox-col">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            </th>
            <th>ID</th>
            <th>FULL NAME</th>
            <th>CONTACT</th>
            <th>FULL ADDRESS</th>
            <th>DATE ADDED</th>
            <th>STATUS</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in filteredClients" :key="client.id" class="table-row">
            <td class="checkbox-col">
              <input type="checkbox" v-model="client.selected" />
            </td>
            <td class="id-col">{{ client.clientId }}</td>
            <td class="name-col">
              <div class="name-cell">
                <div v-if="client.avatar" class="avatar">
                  <img :src="client.avatar" :alt="client.name" />
                </div>
                <div v-else class="avatar-initials" :style="{ backgroundColor: client.avatarColor }">
                  {{ client.initials }}
                </div>
                <div class="name-info">
                  <div class="name">{{ client.name }}</div>
                  <div class="email">{{ client.email }}</div>
                </div>
              </div>
            </td>
            <td>{{ client.contact }}</td>
            <td class="address-col">{{ client.address }}</td>
            <td>{{ client.dateAdded }}</td>
            <td>
              <span class="status-badge" :class="client.status.toLowerCase()">{{ client.status }}</span>
            </td>
            <td>
              <span class="role-badge" :class="client.role.toLowerCase().replace(' ', '-')">{{ client.role }}</span>
            </td>
            <td class="actions-col">
              <button class="action-icon" title="View"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"></path></svg></button>
              <button class="action-icon" title="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path></svg></button>
              <button class="action-icon delete" title="Delete"><svg width="16" height="30" viewBox="0 0 24 24" fill="none" stroke="#c92a2a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="pagination">
      <div class="pagination-info">Showing {{ paginationStart }}-{{ paginationEnd }} of {{ totalEntries }} entries</div>
      <div class="pagination-controls">
        <button class="page-btn1" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
        <button v-for="page in visiblePages" :key="page" class="page-btn2" :class="{ active: page === currentPage }" @click="goToPage(page)">{{ page === '...' ? '...' : page }}</button>
        <button class="page-btn3" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
      </div>
    </div>

    <div v-if="showAddModal">
      <AddClientBeneficiaryV3 
        @cancel="closeModal" 
        @finish="handleFinalSubmit" 
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// --- IMPORTS ---
// Updated to use only V3
import AddClientBeneficiaryV3 from '../../components/AddClientBeneficiaryV3.vue'

// --- State ---
const showAddModal = ref(false)
// NOTE: currentStep and tempClientData were removed as V3 handles internal state
const searchQuery = ref('')
const selectAll = ref(false)
const route = useRoute()
const router = useRouter()
const currentPage = ref(1)
const itemsPerPage = 10

// Dummy Data
const clients = ref([
  { id: 1, clientId: 'CB-2023-001', name: 'Vanisa Lungay', email: 'vani.lungay@gmail.com', initials: 'VL', avatarColor: '#e3f2fd', avatar: null, contact: '0900-000-0000', address: 'Gimampang, Initao, Mis. Or.', dateAdded: 'Oct 12, 2023', status: 'Approved', role: 'Beneficiary', selected: false },
  { id: 2, clientId: 'CB-2023-002', name: 'Xarzha Bagares', email: 'xarzha.bagares@gmail.com', initials: 'XB', avatarColor: '#fff3e0', avatar: null, contact: '0900-000-0000', address: 'Iligan, Lanao Del Norte', dateAdded: 'Oct 14, 2023', status: 'Pending', role: 'Client', selected: false },
  { id: 3, clientId: 'CB-2023-003', name: 'Cyrel Ansing', email: 'cyrel.ansing@gmail.com', initials: 'CA', avatarColor: '#fce4ec', avatar: null, contact: '0900-000-0000', address: 'Calacapan, Initao, Mis. Or.', dateAdded: 'Oct 15, 2023', status: 'Approved', role: 'Both', selected: false },
  { id: 4, clientId: 'CB-2023-004', name: 'Warren Inigo', email: 'warren.inigo@gmail.com', initials: 'WI', avatarColor: '#e8f5e9', avatar: null, contact: '0900-000-0000', address: 'San Pedro, Initao, Mis. Or.', dateAdded: 'Oct 16, 2023', status: 'Rejected', role: 'Client', selected: false },
  { id: 5, clientId: 'CB-2023-005', name: 'Eyrol Junio', email: 'eyrol.junio@gmail.com', initials: 'EJ', avatarColor: '#e1f5fe', avatar: null, contact: '0900-000-0000', address: 'Tubigan, Initao, Mis. Or.', dateAdded: 'Oct 17, 2023', status: 'Approved', role: 'Beneficiary', selected: false },
  { id: 6, clientId: 'CB-2023-006', name: 'Angelo Wabe', email: 'angelo.wabe@gmail.com', initials: 'AW', avatarColor: '#fff9c4', avatar: null, contact: '0900-000-0000', address: 'Poblacion, Naawan, Mis. Or.', dateAdded: 'Oct 18, 2023', status: 'Pending', role: 'Client', selected: false }
])

// --- Methods ---

const openModal = () => {
  showAddModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
}

// STEP COMPLETE -> SAVE TO TABLE
// Now receives the full object directly from V3
const handleFinalSubmit = (finalData) => {
  const newId = clients.value.length + 1
  
  // Defensive coding: Assumes V3 sends either specific fields or a fullName
  const firstName = finalData.firstName || 'New'
  const lastName = finalData.surname || 'User'
  const fullName = finalData.fullName || `${firstName} ${lastName}`
  const initials = firstName.charAt(0) + lastName.charAt(0)
  
  const newItem = {
    id: newId,
    clientId: `CB-2023-00${newId}`,
    name: fullName,
    email: finalData.email || '',
    initials: initials.toUpperCase(),
    avatarColor: '#e3f2fd',
    avatar: null,
    contact: finalData.contact,
    // Assumes V3 sends address parts or a full address string
    address: finalData.address || `${finalData.barangay || ''}, ${finalData.municipality || ''}`,
    dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    status: finalData.status || 'Pending',
    role: finalData.role || 'Client',
    selected: false
  }
  
  // Add to start of list
  clients.value.unshift(newItem)
  
  // Close modal
  closeModal()
}

const toggleSelectAll = () => {
  clients.value.forEach(client => { client.selected = selectAll.value })
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== '...') {
    currentPage.value = page
  }
}

const clearSelectedClient = () => {
  router.push({ path: '/staff/clients' })
}

// --- Computed Properties ---
const filteredClients = computed(() => {
  if (!searchQuery.value) return paginatedClients.value
  const query = searchQuery.value.toLowerCase()
  const filtered = clients.value.filter(client => 
    client.clientId.toLowerCase().includes(query) ||
    client.name.toLowerCase().includes(query) ||
    client.contact.includes(query) ||
    client.email.toLowerCase().includes(query)
  )
  return filtered.slice(paginationStart.value - 1, paginationEnd.value)
})

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return clients.value.slice(start, end)
})

const totalEntries = computed(() => clients.value.length)
const totalPages = computed(() => Math.ceil(totalEntries.value / itemsPerPage))
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1)
const paginationEnd = computed(() => {
  const end = currentPage.value * itemsPerPage
  return end > totalEntries.value ? totalEntries.value : end
})

// Logic for page numbers (1, 2, ..., 10)
const selectedClientId = computed(() => {
  return route.params.id ? Number(route.params.id) : null
})

const selectedClient = computed(() => {
  if (!selectedClientId.value) return null
  return clients.value.find(client => client.id === selectedClientId.value)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 3; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 2; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      pages.push(current)
      pages.push('...')
      pages.push(total)
    }
  }
  return pages
})
</script>

<style scoped>
* { box-sizing: border-box; }
.client-management { padding: 24px; background-color: #f5f7fa; min-height: 100vh; margin-left: -30px; margin-right: -30px; margin-top: -10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
.page-title { font-size: 30px; font-weight: 600; font-family: outfit; margin: 0 0 24px 0; margin-bottom: 35px; color: #1a1a1a; }
.action-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 16px; }
.search-box { display: flex; align-items: center; background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 10px 16px; flex: 1; max-width: 400px; }
.search-icon { margin-right: 8px; opacity: 0.5; }
.search-input { border: none; outline: none; font-size: 14px; width: 100%; }
.action-buttons { display: flex; gap: 12px; flex-wrap: wrap; }
.export-btn, .add-btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }

.export-btn { background: white; border: 1px solid #e0e0e0; color: #333; }
.export-btn:hover { background: #f5f5f5; }
.add-btn { background: #4c6ef5; color: white; }
.add-btn:hover { background: #3b5bdb; }
.btn-icon { font-size: 16px; }
.table-container { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow-x: auto; width: 100%; max-width: 1200px; margin: 0 auto; }
.clients-table { width: 100%; border-collapse: collapse; }
.clients-table thead th { text-align: left; font-size: 11px; font-weight: 600; color: #666; text-transform: uppercase; padding: 16px 12px; border-bottom: 2px solid #f0f0f0; background: #fafafa; letter-spacing: 0.5px; }
.clients-table tbody td { padding: 16px 12px; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px; }
.table-row:hover { background-color: #f9fafb; }
.checkbox-col { width: 40px; }
.id-col { font-weight: 500; color: #666; }
.name-cell { display: flex; align-items: center; gap: 12px; }
.avatar, .avatar-initials { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; overflow: hidden; }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar-initials { display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: #333; }
.name-info { display: flex; flex-direction: column; }
.name { font-weight: 500; color: #1a1a1a; margin-bottom: 2px; }
.email { font-size: 12px; color: #999; }
.address-col { max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.status-badge { padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; display: inline-block; }
.status-badge.approved { background: #d3f9e3; color: #0d7738; }
.status-badge.pending { background: #fff4d6; color: #996600; }
.status-badge.rejected { background: #ffe5e5; color: #c92a2a; }
.role-badge { padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; display: inline-block; }
.role-badge.beneficiary { background: #e3f2fd; color: #1565c0; }
.role-badge.client { background: #fff3e0; color: #e65100; }
.role-badge.both { background: #f3e5f5; color: #6a1b9a; }
.actions-col { display: flex; gap: 8px; }
.action-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; opacity: 0.6; transition: opacity 0.2s; }
.action-icon:hover { opacity: 1; }
.action-icon.delete:hover { opacity: 1; color: #c92a2a; }
.pagination { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
.pagination-info { font-size: 14px; color: #666; }
.pagination-controls { display: flex; gap: 8px; }
.page-btn1, .page-btn2, .page-btn3 { padding: 8px 15px; border: 1px solid #e0e0e0; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.2s; min-width: 40px;}
.page-btn2:hover:not(:disabled):not(.active) { background: #f5f5f5; }
.page-btn2.active { background: #4c6ef5; color: white; border-color: #4c6ef5; }
.page-btn2:disabled { opacity: 0.4; cursor: not-allowed; }
.selected-client-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); margin-bottom: 24px; }
.selected-client-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 18px; }
.selected-client-tag { font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #4c6ef5; margin: 0 0 6px 0; }
.selected-client-role { margin: 6px 0 0 0; color: #65748b; font-size: 14px; }
.back-to-list { padding: 10px 16px; border-radius: 10px; border: 1px solid #e0e0e0; background: white; cursor: pointer; font-weight: 600; transition: background 0.2s ease; }
.back-to-list:hover { background: #f5f7ff; }
.selected-client-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.detail-label { font-size: 12px; color: #6b7280; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.08em; }
.detail-value { margin: 0; font-size: 15px; color: #111827; }
@media (max-width: 1024px) { .selected-client-grid { grid-template-columns: 1fr; } }
@media (max-width: 1200px) { .action-bar { flex-direction: column; align-items: stretch; } .search-box { max-width: 100%; } .action-buttons { justify-content: flex-end; } }
@media (max-width: 768px) { .clients-table { font-size: 12px; } .clients-table thead th, .clients-table tbody td { padding: 8px 6px; } .pagination { flex-direction: column; gap: 16px; } .action-buttons { flex-direction: column; } }
</style>