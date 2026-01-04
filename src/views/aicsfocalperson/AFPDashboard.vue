<template>
  <div class="dashboard">
    <div class="main-content">
      <div class="header-section">
        <h1 class="page-title">AICS Monitoring Dashboard</h1>
        
      </div>
    
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">142</h2>
            <div class="stat-icon1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <p class="stat-label">Clients Served Today</p>
          <span class="stat-sub">Queued: 23 pending</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">₱85k</h2>
            <div class="stat-icon2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
          </div>
          <p class="stat-label">Daily Disbursement</p>
          <span class="stat-sub">Remaining Daily Cap: ₱15k</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">8</h2>
            <div class="stat-icon3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                 <polyline points="14 2 14 8 20 8"></polyline>
                 <line x1="16" y1="13" x2="8" y2="13"></line>
                 <line x1="16" y1="17" x2="8" y2="17"></line>
                 <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
          </div>
          <p class="stat-label">Pending Guarantee Letters</p>
          <span class="stat-sub">Requires Signature</span>
        </div>
      </div>
      
      <div class="activities-section">
        <div class="section-header">
            <h2 class="section-title">Client Intake & Status Log</h2>
            <div class="filter-tabs">
                <span class="active">All</span>
                <span>Medical</span>
                <span>Burial</span>
                <span>Educ</span>
            </div>
        </div>
        
        <table class="activities-table">
          <thead>
            <tr>
              <th>CLIENT/BENEFICIARY</th>
              <th>ASSISTANCE TYPE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <td>
                <div class="user-cell">
                  <div class="avatar" :style="{ backgroundColor: client.avatarColor }">
                    {{ client.initials }}
                  </div>
                  <div class="cell-info">
                      <span class="cell-primary">{{ client.name }}</span>
                      <span class="cell-secondary">GIS: {{ client.gisNumber }}</span>
                  </div>
                </div>
              </td>
              <td>
                 <span class="badge" :class="client.type.toLowerCase()">{{ client.type }}</span>
              </td>
              <td class="amount-cell">{{ client.amount }}</td>
              <td>
                <div class="status-pill" :class="client.statusClass">
                    {{ client.status }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <button class="view-all-btn">View Master List</button>
      </div>
    </div>
    
    <div class="sidebar">
      <div class="quick-actions">
        <h3 class="sidebar-title">Processing Actions</h3>
        
        <button class="action-btn primary" @click="showIntakeModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          New Client Intake
        </button>

        <button class="action-btn secondary" @click="showVerifyModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Check Eligibility / Records
        </button>
        
        <button class="action-btn outline">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
             </svg>
             Print GL Template
        </button>
      </div>
      
      <div class="notifications">
        <h3 class="sidebar-title">System Alerts</h3>
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          <div class="notification-icon" :class="notification.type">
            <svg v-if="notification.icon === 'alert-triangle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <svg v-if="notification.icon === 'check-circle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg v-if="notification.icon === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
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
import Modal from '../../components/Modal.vue'

// -- Reactive State --
const showIntakeModal = ref(false)
const showVerifyModal = ref(false)

// -- Data for AICS --
const clients = ref([
  { 
    id: 1, 
    name: 'Maria Santos', 
    gisNumber: '2023-10-0042',
    initials: 'MS', 
    avatarColor: '#ffebee', 
    type: 'Medical', 
    amount: '₱5,000',
    status: 'GL Printed', 
    statusClass: 'purple'
  },
  { 
    id: 2, 
    name: 'Roberto Gomez', 
    gisNumber: '2023-10-0043',
    initials: 'RG', 
    avatarColor: '#eceff1', 
    type: 'Burial', 
    amount: '₱10,000',
    status: 'For Payout', 
    statusClass: 'green'
  },
  { 
    id: 3, 
    name: 'Lina Reyes', 
    gisNumber: '2023-10-0044',
    initials: 'LR', 
    avatarColor: '#fff3e0', 
    type: 'Food/Transpo', 
    amount: '₱2,000',
    status: 'Interview', 
    statusClass: 'orange'
  },
])

const notifications = ref([
  { id: 1, type: 'warning', icon: 'alert-triangle', text: 'Daily Cash Advance is at 85% utilization.', time: '10 mins ago' },
  { id: 2, type: 'info', icon: 'info', text: 'New memo on Dialysis assistance requirements.', time: '2 hours ago' },
  { id: 3, type: 'success', icon: 'check-circle', text: 'Replenishment for GL Fund approved.', time: 'Yesterday' }
])
</script>

<style scoped>
* { box-sizing: border-box; }
.dashboard { display: flex; gap: 24px; padding: 24px; background-color: #f5f7fa; min-height: 100vh; margin-left: -30px; margin-top: -15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.main-content { flex: 1; }

.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 26px; font-weight: 700; color: #1a1a1a; margin: 0; }
.live-indicator { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #e03131; background: #fff5f5; padding: 6px 12px; border-radius: 20px; }
.pulse { width: 8px; height: 8px; background: #e03131; border-radius: 50%; box-shadow: 0 0 0 0 rgba(224, 49, 49, 0.7); animation: pulse 1.5s infinite; }

@keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(224, 49, 49, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(224, 49, 49, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(224, 49, 49, 0); }
}

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
.stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); border: 1px solid #f0f0f0; }
.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.stat-number { font-size: 28px; font-weight: 700; margin: 0; color: #1a1a1a; }
.stat-icon1 { color: #f76707; background: #fff4e6; padding: 8px; border-radius: 8px; display: flex; }
.stat-icon2 { color: #2f9e44; background: #ebfbee; padding: 8px; border-radius: 8px; display: flex; }
.stat-icon3 { color: #7048e8; background: #f3f0ff; padding: 8px; border-radius: 8px; display: flex; }
.stat-header svg { width: 20px; height: 20px; }
.stat-label { font-size: 13px; color: #666; margin: 0 0 4px 0; font-weight: 500; }
.stat-sub { font-size: 12px; color: #adb5bd; }

.activities-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid #f0f0f0; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.section-title { font-size: 18px; font-weight: 600; margin: 0; color: #1a1a1a; }
.filter-tabs span { font-size: 13px; color: #868e96; cursor: pointer; margin-left: 15px; font-weight: 500; }
.filter-tabs span.active { color: #f76707; font-weight: 600; border-bottom: 2px solid #f76707; padding-bottom: 2px; }

.activities-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.activities-table thead th { text-align: left; font-size: 11px; font-weight: 700; color: #868e96; text-transform: uppercase; padding: 12px 0; border-bottom: 1px solid #dee2e6; letter-spacing: 0.5px; }
.activities-table tbody td { padding: 16px 0; border-bottom: 1px solid #f1f3f5; color: #333; font-size: 14px; vertical-align: middle; }
.user-cell { display: flex; align-items: center; gap: 12px; }
.cell-info { display: flex; flex-direction: column; }
.cell-primary { font-weight: 600; color: #343a40; }
.cell-secondary { font-size: 11px; color: #868e96; font-family: monospace; }
.avatar { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #495057; }
.amount-cell { font-weight: 600; color: #343a40; }

.badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
.badge.medical { background: #ffe3e3; color: #c92a2a; }
.badge.burial { background: #f1f3f5; color: #495057; }
.badge.educ { background: #e7f5ff; color: #1c7ed6; }

.status-pill { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; }
.status-pill.purple { background: #f3f0ff; color: #7048e8; }
.status-pill.green { background: #ebfbee; color: #2f9e44; }
.status-pill.orange { background: #fff4e6; color: #e8590c; }

.view-all-btn { width: 100%; padding: 12px; background: #f8f9fa; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; color: #495057; cursor: pointer; transition: all 0.2s; }
.view-all-btn:hover { background: #e9ecef; }

.sidebar { width: 300px; flex-shrink: 0; }
.sidebar-title { font-size: 15px; font-weight: 700; margin: 0 0 16px 0; color: #343a40; text-transform: uppercase; letter-spacing: 0.5px; }
.quick-actions { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border: 1px solid #f0f0f0; }

.action-btn { width: 100%; padding: 12px 16px; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.action-btn svg { width: 18px; height: 18px; }
.action-btn:last-child { margin-bottom: 0; }
.action-btn.primary { background: #f76707; color: white; }
.action-btn.primary:hover { background: #d9480f; }
.action-btn.secondary { background: #228be6; color: white; }
.action-btn.secondary:hover { background: #1c7ed6; }
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