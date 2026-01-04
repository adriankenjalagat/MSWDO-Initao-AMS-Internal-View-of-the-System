<template>
  <div class="dashboard">
    <div class="main-content">
      <div class="header-section">
        <h1 class="page-title">SLP Focal Person Dashboard</h1>
        <span class="date-badge">FY 2026 - Q1</span>
      </div>
    
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">1,240</h2>
            <div class="stat-icon1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <p class="stat-label">Total Active Beneficiaries</p>
          <span class="stat-sub">Target: 1,500 (82%)</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">₱2.4M</h2>
            <div class="stat-icon2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5v14"></path>
                <path d="M7 5v14"></path>
              </svg>
            </div>
          </div>
          <p class="stat-label">Funds Utilized </p>
          <span class="stat-sub">Remaining: ₱600k</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">12</h2>
            <div class="stat-icon3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </div>
          </div>
          <p class="stat-label">Pending Validations</p>
          <span class="stat-sub">Requires Action</span>
        </div>
      </div>
      
      <div class="activities-section">
        <div class="section-header">
            <h2 class="section-title">Project Implementation Status</h2>
            <div class="filter-tabs">
                <span class="active">All</span>
                <span>MD</span>
                <span>EF</span>
            </div>
        </div>
        
        <table class="activities-table">
          <thead>
            <tr>
              <th>ASSOCIATION / BENEFICIARY</th>
              <th>TRACK</th>
              <th>STATUS</th>
              <th>LAST UPDATE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>
                <div class="user-cell">
                  <div class="avatar" :style="{ backgroundColor: project.avatarColor }">
                    {{ project.initials }}
                  </div>
                  <div class="cell-info">
                      <span class="cell-primary">{{ project.name }}</span>
                      <span class="cell-secondary">{{ project.location }}</span>
                  </div>
                </div>
              </td>
              <td>
                  <span class="badge" :class="project.track.toLowerCase()">{{ project.track }}</span>
              </td>
              <td>
                <div class="status-indicator">
                    <span class="dot" :class="project.statusColor"></span>
                    {{ project.status }}
                </div>
              </td>
              <td class="timestamp">{{ project.timestamp }}</td>
            </tr>
          </tbody>
        </table>
        
        <button class="view-all-btn">View Masterlist</button>
      </div>
    </div>
    
    <div class="sidebar">
      <div class="quick-actions">
        <h3 class="sidebar-title">Focal Person Actions</h3>
        
        <button class="action-btn primary" @click="showValidationModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
            <path d="M10 9H8"></path>
          </svg>
          Review Proposals
        </button>

        <button class="action-btn secondary" @click="showAddBeneficiaryModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
             <circle cx="8.5" cy="7" r="4"></circle>
             <line x1="20" y1="8" x2="20" y2="14"></line>
             <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Add New Beneficiary
        </button>
        
        <button class="action-btn outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            Generate Utilization Report
        </button>
      </div>
      
      <div class="notifications">
        <h3 class="sidebar-title">Updates & Deadlines</h3>
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

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import your components here
import Modal from '../../components/Modal.vue'
// import AddBeneficiaryForm from ...

// -- Reactive State for Modals --
const showAddBeneficiaryModal = ref(false)
const showValidationModal = ref(false)

// -- Data for the SLP Focal Person --
// Mixed of Associations (SLPAs) and Individual Referrals
const projects = ref([
  { 
    id: 1, 
    name: 'Green Valley Farmers SLPA', 
    location: 'Brgy. Matina',
    initials: 'GV', 
    avatarColor: '#e8f5e9', 
    track: 'MD', // Micro-enterprise Development
    status: 'Capital Released', 
    statusColor: 'success',
    timestamp: '2 hours ago' 
  },
  { 
    id: 2, 
    name: 'Juan Dela Cruz', 
    location: 'Brgy. Centro',
    initials: 'JD', 
    avatarColor: '#e3f2fd', 
    track: 'EF', // Employment Facilitation
    status: 'For Validation', 
    statusColor: 'warning',
    timestamp: '5 hours ago' 
  },
  { 
    id: 3, 
    name: 'Women Weavers Assoc.', 
    location: 'Brgy. Talomo',
    initials: 'WW', 
    avatarColor: '#fce4ec', 
    track: 'MD', 
    status: 'Purchase approved', 
    statusColor: 'info',
    timestamp: '1 day ago' 
  },
])

const notifications = ref([
  { id: 1, type: 'warning', icon: 'alert-circle', text: '3 Project Proposals returned for revision.', time: '30 mins ago' },
  { id: 2, type: 'info', icon: 'clock', text: 'Deadline for Q1 Budget Utilization Report.', time: 'Due Tomorrow' },
  { id: 3, type: 'success', icon: 'check-circle', text: 'Fund Transfer for Batch 4 approved.', time: 'Yesterday' }
])
</script>

<style scoped>
* { box-sizing: border-box; }
.dashboard { display: flex; gap: 24px; padding: 24px; background-color: #f5f7fa; min-height: 100vh; margin-left: -30px; margin-top: -15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.main-content { flex: 1; }

.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 26px; font-weight: 700; color: #1a1a1a; margin: 0; }
.date-badge { background: #e9ecef; color: #495057; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
.stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); border: 1px solid #f0f0f0; }
.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.stat-number { font-size: 28px; font-weight: 700; margin: 0; color: #1a1a1a; }
.stat-icon1 { color: #228be6; background: #e7f5ff; padding: 8px; border-radius: 8px; display: flex; }
.stat-icon2 { color: #40c057; background: #ebfbee; padding: 8px; border-radius: 8px; display: flex; }
.stat-icon3 { color: #fcc419; background: #fff9db; padding: 8px; border-radius: 8px; display: flex; }
.stat-header svg { width: 20px; height: 20px; }
.stat-label { font-size: 13px; color: #666; margin: 0 0 4px 0; font-weight: 500; }
.stat-sub { font-size: 12px; color: #adb5bd; }

.activities-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid #f0f0f0; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.section-title { font-size: 18px; font-weight: 600; margin: 0; color: #1a1a1a; }
.filter-tabs span { font-size: 13px; color: #868e96; cursor: pointer; margin-left: 15px; font-weight: 500; }
.filter-tabs span.active { color: #228be6; font-weight: 600; border-bottom: 2px solid #228be6; padding-bottom: 2px; }

.activities-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.activities-table thead th { text-align: left; font-size: 11px; font-weight: 700; color: #868e96; text-transform: uppercase; padding: 12px 0; border-bottom: 1px solid #dee2e6; letter-spacing: 0.5px; }
.activities-table tbody td { padding: 16px 0; border-bottom: 1px solid #f1f3f5; color: #333; font-size: 14px; vertical-align: middle; }
.user-cell { display: flex; align-items: center; gap: 12px; }
.cell-info { display: flex; flex-direction: column; }
.cell-primary { font-weight: 600; color: #343a40; }
.cell-secondary { font-size: 12px; color: #868e96; }
.avatar { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #495057; }

.badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
.badge.md { background: #e3fafc; color: #0c8599; }
.badge.ef { background: #fff0f6; color: #a61e4d; }

.status-indicator { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.success { background: #40c057; }
.dot.warning { background: #fcc419; }
.dot.info { background: #228be6; }

.timestamp { color: #adb5bd; font-size: 13px; text-align: right; }
.view-all-btn { width: 100%; padding: 12px; background: #f8f9fa; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; color: #495057; cursor: pointer; transition: all 0.2s; }
.view-all-btn:hover { background: #e9ecef; }

.sidebar { width: 300px; flex-shrink: 0; }
.sidebar-title { font-size: 15px; font-weight: 700; margin: 0 0 16px 0; color: #343a40; text-transform: uppercase; letter-spacing: 0.5px; }
.quick-actions { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border: 1px solid #f0f0f0; }

.action-btn { width: 100%; padding: 12px 16px; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.action-btn svg { width: 18px; height: 18px; }
.action-btn:last-child { margin-bottom: 0; }
.action-btn.primary { background: #228be6; color: white; }
.action-btn.primary:hover { background: #1c7ed6; }
.action-btn.secondary { background: #12b886; color: white; }
.action-btn.secondary:hover { background: #0ca678; }
.action-btn.outline { background: transparent; border: 1px solid #dee2e6; color: #495057; }
.action-btn.outline:hover { background: #f8f9fa; border-color: #ced4da; }

.notifications { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid #f0f0f0; }
.notification-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f3f5; }
.notification-item:last-child { border-bottom: none; padding-bottom: 0; }
.notification-item:first-child { padding-top: 0; }
.notification-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.notification-icon svg { width: 16px; height: 16px; }
.notification-icon.warning { background: #fff9db; color: #f59f00; }
.notification-icon.success { background: #ebfbee; color: #37b24d; }
.notification-icon.info { background: #e7f5ff; color: #1c7ed6; }
.notification-text { font-size: 13px; color: #343a40; margin: 0 0 4px 0; line-height: 1.4; }
.notification-time { font-size: 11px; color: #adb5bd; }

@media (max-width: 1024px) { .dashboard { flex-direction: column; } .sidebar { width: 100%; } .stats-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(1, 1fr); } }
</style>