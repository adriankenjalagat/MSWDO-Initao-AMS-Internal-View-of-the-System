<template>
  <div class="dashboard">
    <div class="main-content">
      <h1 class="page-title">Staff Dashboard Overview</h1>
    
      <div class="stats-grid">
<div class="stat-card clickable" @click="openPendingModal">
        <div class="stat-header">
          <h2 class="stat-number">{{ pendingApplications.length }}</h2>
            <div class="stat-icon1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <circle cx="12" cy="14" r="3"></circle>
              </svg>
            </div>
          </div>
          <p class="stat-label">Pending Pre-applications</p>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">145</h2>
            <div class="stat-icon2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <p class="stat-label">Clients/Beneficiaries Served (This Month)</p>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">24</h2>
            <div class="stat-icon3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
          </div>
          <p class="stat-label">Processed Today</p>
        </div>
      </div>
      
      <div class="activities-section">
        <h2 class="section-title">Recent Assistance Applications</h2>
        
        <table class="activities-table">
          <thead>
            <tr>
              <th>BENEFICIARY NAME</th>
              <th>ASSISTANCE TYPE</th>
              <th>STATUS</th>
              <th>DATE FILED</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in applications" :key="app.id">
              <td>
                <div class="user-cell">
                  <div class="avatar" :style="{ backgroundColor: app.avatarColor }">
                    {{ app.initials }}
                  </div>
                  <div class="user-info">
                    <span class="font-bold">{{ app.name }}</span>
                    <span class="sub-text">{{ app.barangay }}</span>
                  </div>
                </div>
              </td>
              <td>{{ app.type }}</td>
              <td>
                <span class="status-badge" :class="app.status.toLowerCase()">
                  {{ app.status }}
                </span>
              </td>
              <td class="timestamp">{{ app.date }}</td>
            </tr>
          </tbody>
        </table>
        
        <button class="view-all-btn">View All Records</button>
      </div>
    </div>
    
    <div class="sidebar">
      <div class="quick-actions">
        <h3 class="sidebar-title">Quick Actions</h3>
        
        <button class="action-btn primary" @click="showAppModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          New Application
        </button>

        <button class="action-btn secondary" @click="showBenModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Register Client/Beneficiary
        </button>
      </div>
      
      <div class="notifications">
        <h3 class="sidebar-title">Notifications</h3>
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          <div class="notification-icon" :class="notification.type">
            <svg v-if="notification.icon === 'alert-circle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <svg v-if="notification.icon === 'check-circle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg v-if="notification.icon === 'clock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="notification-content">
            <p class="notification-text">{{ notification.text }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="showAppModal" title="Create new Application" @close="showAppModal = false">
      <AddApplication 
        @cancel="showAppModal = false" 
        @done="showAppModal = false" 
        @openCreateClient="openCreateClientModal"
        @openCreateBeneficiary="openCreateBeneficiaryModal"
      />
    </Modal>

    <Modal v-if="showPendingModal" title="Pending Applications" @close="showPendingModal = false">
      <div class="pending-modal">
        <p class="pending-summary">Showing {{ pendingApplications.length }} pending client application(s)</p>
        <div v-if="pendingApplications.length" class="pending-list">
          <div v-for="item in pendingApplications" :key="item.id" class="pending-item clickable" @click="viewPendingProfile(item)">
            <div>
              <p class="pending-name">{{ item.name }}</p>
              <p class="pending-detail">{{ item.type }} • {{ item.barangay }} • {{ item.date }}</p>
            </div>
            <span class="pending-status">{{ item.status }}</span>
          </div>
        </div>
        <div v-else class="empty-message">No pending applications found.</div>
      </div>
    </Modal>

    <Modal v-if="showBenModal" :title="`Add New ${clientBeneficiaryMode}`" @close="showBenModal = false">
      <AddClientBeneficiary 
        :recordType="clientBeneficiaryMode"
        @cancel="showBenModal = false" 
        @done="showBenModal = false" 
      />
    </Modal>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Import the components (Ensure you create these components or rename existing ones)
import Modal from '../../components/Modal.vue'
import AddApplication from '../../components/AddApplication.vue'
import AddClientBeneficiary from '../../components/AddClientBeneficiaryV3.vue'

const router = useRouter()

// -- Reactive State for Modals --
const showAppModal = ref(false)
const showBenModal = ref(false)
const showPendingModal = ref(false)
const clientBeneficiaryMode = ref('Client')

const openPendingModal = () => {
  showPendingModal.value = true
}

const viewPendingProfile = (item) => {
  showPendingModal.value = false
  router.push({ name: 'StaffClientDetail', params: { id: item.id } })
}

const openCreateClientModal = () => {
  clientBeneficiaryMode.value = 'Client'
  showBenModal.value = true
}

const openCreateBeneficiaryModal = () => {
  clientBeneficiaryMode.value = 'Beneficiary'
  showBenModal.value = true
}

// -- Data for the Staff UI --
// Changed from "Activities" to "Applications"
const applications = ref([
  { id: 1, name: 'Juan Dela Cruz', barangay: 'Poblacion', initials: 'JD', avatarColor: '#e3f2fd', type: 'Medical Assistance', status: 'Pending', date: 'May 12, 2024' },
  { id: 2, name: 'Maria Santos', barangay: 'San Pedro', initials: 'MS', avatarColor: '#fff3e0', type: 'Burial Assistance', status: 'Approved', date: 'May 12, 2024' },
  { id: 3, name: 'Roberto Lim', barangay: 'Tubigan', initials: 'RL', avatarColor: '#f3e5f5', type: 'Educational', status: 'For Review', date: 'May 11, 2024' },
  { id: 4, name: 'Elena Gomez', barangay: 'Gimangpang', initials: 'EG', avatarColor: '#e8f5e9', type: 'Medical Assistance', status: 'Approved', date: 'May 10, 2024' },
])

const pendingApplications = computed(() => applications.value.filter(app => app.status.toLowerCase() === 'pending'))

// Changed notifications to be relevant to Staff workflow
const notifications = ref([
  { id: 1, type: 'warning', icon: 'alert-circle', text: 'Social Pension Budget is running low (15% left).', time: '1 hour ago' },
  { id: 2, type: 'success', icon: 'check-circle', text: 'Application ID #8823 approved by MSWDO Head.', time: '2 hours ago' },
  { id: 3, type: 'info', icon: 'clock', text: '3 pending applications require interview notes.', time: '5 hours ago' }
])
</script>

<style scoped>
* { box-sizing: border-box; }
.dashboard { display: flex; gap: 24px; padding: 24px; background-color: #f5f7fa; min-height: 100vh; margin-left: -30px; margin-top: -15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
.main-content { flex: 1; }
.page-title { font-size: 30px; font-weight: 600; font-family: outfit; margin: 0 0 24px 0; color: #1a1a1a; margin-bottom: 35px; }

/* Stats Grid */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
.stat-card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.stat-number { font-size: 36px; font-weight: 700; margin: 0; color: #1a1a1a; }

/* Icon Colors - Optimized for Staff Context */
.stat-icon1 { width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: #fff3e0; border-radius: 10px; color: #e65100; } /* Orange for Pending */
.stat-icon2 { width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: #e3f2fd; border-radius: 10px; color: #1565c0; } /* Blue for People */
.stat-icon3 { width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: #e8f5e9; border-radius: 10px; color: #2e7d32; } /* Green for Processed */
.stat-icon svg { width: 20px; height: 20px; } /* Fixed selector */
.stat-icon1 svg, .stat-icon2 svg, .stat-icon3 svg { width: 20px; height: 20px; } /* Ensure SVGs size correctly */

.stat-label { font-size: 14px; color: #666; margin: 0; }

.stat-card.clickable { cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.stat-card.clickable:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); }

.pending-modal { display: flex; flex-direction: column; gap: 16px; }
.pending-summary { margin: 0 0 12px 0; color: #333; font-size: 14px; }
.pending-list { display: flex; flex-direction: column; gap: 12px; }
.pending-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 14px 16px; border: 1px solid #e8eef7; border-radius: 12px; background: #fafbff; }
.pending-item.clickable { cursor: pointer; transition: background-color 0.2s ease, transform 0.2s ease; }
.pending-item.clickable:hover { background-color: #eef4ff; transform: translateY(-1px); }
.pending-name { margin: 0 0 4px 0; font-weight: 600; color: #102a43; }
.pending-detail { margin: 0; font-size: 13px; color: #556575; }
.pending-status { padding: 4px 10px; border-radius: 999px; background: #fff3e0; color: #d97706; font-size: 12px; font-weight: 700; text-transform: uppercase; }
.empty-message { color: #65748b; font-size: 14px; }

/* Activities/Table Section */
.activities-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.section-title { font-size: 20px; font-weight: 600; margin: 0 0 20px 0; color: #1a1a1a; }
.activities-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.activities-table thead th { text-align: left; font-size: 11px; font-weight: 600; color: #666; text-transform: uppercase; padding: 12px; border-bottom: 2px solid #f0f0f0; letter-spacing: 0.5px; }
.activities-table tbody td { padding: 16px 12px; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px; vertical-align: middle; }

/* User Cell Styling */
.user-cell { display: flex; align-items: center; gap: 12px; }
.user-info { display: flex; flex-direction: column; }
.user-info .sub-text { font-size: 12px; color: #888; margin-top: 2px; }
.avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #495057; border: 1px solid #dee2e6; flex-shrink: 0; }

/* Status Badges */
.status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: capitalize; }
.status-badge.approved { background: #e8f5e9; color: #2e7d32; }
.status-badge.pending { background: #fff3e0; color: #ef6c00; }
.status-badge.review { background: #e3f2fd; color: #1565c0; }

.timestamp { color: #999; }
.view-all-btn { width: 100%; padding: 12px; background: white; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; font-weight: 500; color: #333; cursor: pointer; transition: all 0.2s; }
.view-all-btn:hover { background: #f5f5f5; }

/* Sidebar */
.sidebar { width: 300px; flex-shrink: 0; }
.sidebar-title { font-size: 16px; font-weight: 600; margin: 0 0 16px 0; color: #1a1a1a; }
.quick-actions { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); margin-bottom: 20px; }
.action-btn { width: 100%; padding: 12px 16px; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; }
.action-btn svg { width: 16px; height: 16px; }
.action-btn:last-child { margin-bottom: 0; }
.action-btn.primary { background: #4c6ef5; color: white; }
.action-btn.primary:hover { background: #3b5bdb; }
.action-btn.secondary { background: #12b886; color: white; }
.action-btn.secondary:hover { background: #0ca678; }

/* Notifications */
.notifications { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.notification-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
.notification-item:last-child { border-bottom: none; padding-bottom: 0; }
.notification-item:first-child { padding-top: 0; }
.notification-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.notification-icon svg { width: 18px; height: 18px; }
.notification-icon.warning { background: #fff3cd; color: #856404; }
.notification-icon.success { background: #d4edda; color: #155724; }
.notification-icon.info { background: #d1ecf1; color: #0c5460; }
.notification-content { flex: 1; }
.notification-text { font-size: 13px; color: #333; margin: 0 0 4px 0; line-height: 1.5; }
.notification-time { font-size: 12px; color: #999; }

@media (max-width: 1024px) { .dashboard { flex-direction: column; } .sidebar { width: 100%; } .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr; } .activities-table { font-size: 12px; } .activities-table thead th, .activities-table tbody td { padding: 8px; } }
</style>