<template>
  <div class="donation-management">
    <div class="header">
      <h1>Donations Management</h1>
      <button class="btn-primary" @click="showCreateModal = true">
        + Record New Donation
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg class="icon" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-6"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Estimated Amount of Donations</div>
          <div class="stat-value">₱ 2,450,000</div>
          <div class="stat-change positive">+10% from last month</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <svg class="icon" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">In-Kind Donations</div>
          <div class="stat-value">450 Items</div>
          <div class="stat-subtitle">Food packs, Clothing, Medical, etc.</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon yellow">
          <svg class="icon" viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Pending Pre-donations</div>
          <div class="stat-value">8 Records</div>
          <div class="stat-subtitle warning">Requires Verification</div>
        </div>
      </div>
    </div>

    <div class="filters-bar">
      <div class="selection-indicator" v-if="selectedDonations.length > 0">
        <span class="count-badge">{{ selectedDonations.length }}</span> Selected
      </div>

      <div class="search-box">
        <span class="search-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input type="text" placeholder="Search donor, reference no, or type..." v-model="searchQuery">
      </div>
      <div class="filter-actions">
        <button class="btn-filter">
          <svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M6 12h12M10 18h4"/></svg>
          Filter by Status
        </button>
        <button class="btn-filter">
          <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          This Month
        </button>
        <button class="btn-export">
          <svg class="icon" viewBox="0 0 24 24"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
          Export
        </button>
      </div>
    </div>

    <div class="table-container">
      <table class="donations-table">
        <thead>
          <tr>
            <th class="checkbox-col">
              <input 
                type="checkbox" 
                :checked="isAllSelected" 
                @change="toggleSelectAll"
                class="custom-checkbox"
              >
            </th>
            <th>REFERENCE NO.</th>
            <th>DONOR NAME</th>
            <th>TYPE</th>
            <th>AMOUNT / VALUE</th>
            <th>DATE RECEIVED</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="donation in filteredDonations" 
            :key="donation.refNo"
            :class="{ 'selected-row': selectedDonations.includes(donation.refNo) }"
          >
            <td class="checkbox-col">
              <input 
                type="checkbox" 
                :value="donation.refNo" 
                v-model="selectedDonations"
                class="custom-checkbox"
              >
            </td>
            <td>{{ donation.refNo }}</td>
            <td>
              <div class="donor-cell">
                <span class="donor-avatar">{{ donation.avatar }}</span>
                <div>
                  <div class="donor-name">{{ donation.donorName }}</div>
                  <div class="donor-type">{{ donation.donorType }}</div>
                </div>
              </div>
            </td>
            <td>{{ donation.type }}</td>
            <td class="amount">{{ donation.amount }}</td>
            <td>{{ donation.dateReceived }}</td>
            <td>
              <span class="status-badge" :class="donation.status.toLowerCase()">
                {{ donation.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn-icon" title="View">
                  <svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button class="btn-icon" title="Edit">
                  <svg class="icon" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span>Rows per page: 10   1-{{ filteredDonations.length }} of {{ filteredDonations.length }}</span>
      <div class="pagination-controls">
        <button class="btn-page">‹</button>
        <button class="btn-page">›</button>
      </div>
    </div>

    <Modal v-if="showCreateModal" title="Record New Donation" @close="showCreateModal = false">
      <RecordDonation @cancel="showCreateModal = false" @done="handleCreateDonation" />
    </Modal>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../../components/Modal.vue'
import RecordDonation from '../../components/RecordNewDonation.vue'

// --- State ---
const showCreateModal = ref(false)
const searchQuery = ref('')
const selectedDonations = ref([])

const donations = ref([
  {
    refNo: 'DN-2023-001',
    avatar: 'MSU',
    donorName: 'MSU-Naawan',
    donorType: 'Partner',
    type: 'Food Packs',
    amount: '100 pcs.',
    dateReceived: 'Nov 10, 2023',
    status: 'Verified'
  },
  {
    refNo: 'DN-2023-002',
    avatar: 'AG',
    donorName: 'Ariana Grande',
    donorType: 'Private Individual',
    type: 'In-Kind (Rice)',
    amount: '50 Sacks',
    dateReceived: 'Nov 08, 2023',
    status: 'Verified'
  },
  {
    refNo: 'DN-2023-003',
    avatar: 'XAI',
    donorName: 'Xavier Academy Initao',
    donorType: 'School',
    type: 'In-Kind (Water)',
    amount: '200 Boxes',
    dateReceived: 'Nov 05, 2023',
    status: 'Pending'
  },
  {
    refNo: 'DN-2023-004',
    avatar: 'TS',
    donorName: 'Taylor Swift',
    donorType: 'Private Individual',
    type: 'Hygiene Kits',
    amount: '50 pcs.',
    dateReceived: 'Nov 01, 2023',
    status: 'Verified'
  },
  {
    refNo: 'DN-2023-005',
    avatar: 'ABF',
    donorName: 'Angat Buhay Foundation',
    donorType: 'NGO',
    type: 'Medical Supplies',
    amount: '10 Boxes',
    dateReceived: 'Oct 28, 2023',
    status: 'Verified'
  }
])

// --- Logic ---

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 3) // Max 3 letters
    .join('')
    .toUpperCase();
}

const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

const handleCreateDonation = (formData) => {
  const newDonation = {
    refNo: `DN-2024-${Math.floor(100 + Math.random() * 900)}`, // Mock Ref ID
    avatar: getInitials(formData.donorName),
    donorName: formData.donorName,
    donorType: formData.donorType,
    type: formData.type,
    amount: formData.amount,
    dateReceived: formatDate(formData.dateReceived),
    status: formData.status
  }

  // Add to top
  donations.value.unshift(newDonation)
  showCreateModal.value = false
}

// --- Computed ---

const filteredDonations = computed(() => {
  if (!searchQuery.value) return donations.value
  const query = searchQuery.value.toLowerCase()
  return donations.value.filter(d => 
    d.donorName.toLowerCase().includes(query) || 
    d.refNo.toLowerCase().includes(query) ||
    d.type.toLowerCase().includes(query)
  )
})

const isAllSelected = computed(() => {
  return donations.value.length > 0 && selectedDonations.value.length === donations.value.length
})

// --- Methods ---

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedDonations.value = []
  } else {
    selectedDonations.value = donations.value.map(d => d.refNo)
  }
}

</script>

<style scoped>
/* Main Layout */
.donation-management {
  background: #f5f5f5;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 24px;
  background-color: #f5f7fa;
  min-height: 100vh;
  margin-left: -30px;
  margin-right: -30px; 
  margin-top: -10px;
}
.icon { width: 18px; height: 18px; stroke: currentColor; stroke-width: 1.8; fill: none; flex-shrink: 0; }

/* Header */
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; }
h1 { font-size: 30px; font-weight: 600; margin: 0; color: #1a1a1a; font-family: outfit; }
.btn-primary { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500; position: absolute; right: 0; top: 15px; }
.btn-primary:hover { background: #1d4ed8; }

/* Stats */
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.stat-card { background: white; padding: 20px; border-radius: 8px; display: flex; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.stat-icon { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.stat-icon.blue { background: #dbeafe; }
.stat-icon.green { background: #d1fae5; }
.stat-icon.yellow { background: #fef3c7; }
.stat-content { flex: 1; }
.stat-label { font-size: 13px; color: #6b7280; margin-bottom: 4px; }
.stat-value { font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
.stat-change { font-size: 12px; color: #6b7280; }
.stat-change.positive { color: #10b981; }
.stat-subtitle { font-size: 12px; color: #6b7280; }
.stat-subtitle.warning { color: #f59e0b; }

/* Filters */
.filters-bar { background: white; padding: 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.selection-indicator { margin-right: 15px; font-size: 14px; font-weight: 500; color: #2563eb; display: flex; align-items: center; gap: 6px; animation: fadeIn 0.2s ease; }
.count-badge { background: #eff6ff; padding: 2px 8px; border-radius: 4px; font-weight: 700; }
.search-box { position: relative; flex: 1; max-width: 400px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); }
.search-box input { width: 100%; padding: 8px 8px 8px 36px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; }
.filter-actions { display: flex; gap: 8px; }
.btn-filter, .btn-export { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; }
.btn-filter:hover, .btn-export:hover { background: #f9fafb; }

/* Table */
.table-container { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.donations-table { width: 100%; border-collapse: collapse; }
.donations-table thead { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
.donations-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
.donations-table td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #1a1a1a; }
.checkbox-col { width: 48px; text-align: center; padding-right: 0 !important; }
.custom-checkbox { width: 16px; height: 16px; cursor: pointer; accent-color: #2563eb; }
.selected-row { background-color: #eff6ff !important; }
.donor-cell { display: flex; align-items: center; gap: 12px; }
.donor-avatar { width: 36px; height: 36px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #4b5563; flex-shrink: 0; }
.donor-name { font-weight: 500; color: #1a1a1a; }
.donor-type { font-size: 12px; color: #6b7280; }
.amount { font-weight: 600; }
.status-badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; }
.status-badge.verified { background: #d1fae5; color: #065f46; }
.status-badge.pending { background: #fef3c7; color: #92400e; }
.action-buttons { display: flex; gap: 8px; }
.btn-icon { width: 32px; height: 32px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.btn-icon:hover { background: #f9fafb; }

/* Pagination */
.pagination { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; font-size: 14px; color: #6b7280; }
.pagination-controls { display: flex; gap: 8px; }
.btn-page { width: 32px; height: 32px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; cursor: pointer; }
.btn-page:hover { background: #f9fafb; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
</style>