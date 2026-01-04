<template>
  <div class="dashboard">
    <div class="main-content">
      <div class="header-section">
        <div>
           <h1 class="page-title">Social Pension Monitoring Dashboard</h1>
        </div>
        
        <div class="payout-trackers">
            <div class="payout-badge regional">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                   <line x1="16" y1="2" x2="16" y2="6"></line>
                   <line x1="8" y1="2" x2="8" y2="6"></line>
                   <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <div class="payout-info">
                    <span class="p-label">Regional Payout</span>
                    <span class="p-date">March 15, 2024</span>
                </div>
            </div>
            <div class="payout-badge local">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                   <line x1="16" y1="2" x2="16" y2="6"></line>
                   <line x1="8" y1="2" x2="8" y2="6"></line>
                   <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <div class="payout-info">
                    <span class="p-label">Local Payout</span>
                    <span class="p-date">April 02, 2024</span>
                </div>
            </div>
        </div>
      </div>
    
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">1,205</h2>
            <div class="stat-icon1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="9" y1="22" x2="9" y2="22.01"></line>
                <line x1="15" y1="22" x2="15" y2="22.01"></line>
                <line x1="12" y1="22" x2="12" y2="22.01"></line>
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="4" y1="10" x2="20" y2="10"></line>
                <line x1="4" y1="16" x2="20" y2="16"></line>
              </svg>
            </div>
          </div>
          <p class="stat-label">Regional Beneficiaries</p>
          <span class="stat-sub">Fund Source: DSWD National</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">850</h2>
            <div class="stat-icon2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
          </div>
          <p class="stat-label">Local Beneficiaries</p>
          <span class="stat-sub">Fund Source: LGU / City Hall</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">412</h2>
            <div class="stat-icon3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
          </div>
          <p class="stat-label">Total Waitlist</p>
          <span class="stat-sub">Pending Replacements</span>
        </div>
      </div>
      
      <div class="activities-section">
        <div class="section-header">
            <h2 class="section-title">Master List Updates</h2>
            <div class="filter-tabs">
                <span :class="{ active: currentTab === 'all' }" @click="currentTab = 'all'">All</span>
                <span :class="{ active: currentTab === 'regional' }" @click="currentTab = 'regional'">Regional</span>
                <span :class="{ active: currentTab === 'local' }" @click="currentTab = 'local'">Local</span>
            </div>
        </div>
        
        <table class="activities-table">
          <thead>
            <tr>
              <th>SENIOR NAME / ID</th>
              <th>FUND SOURCE</th>
              <th>STATUS</th>
              <th>BARANGAY</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="senior in filteredSeniors" :key="senior.id">
              <td>
                <div class="user-cell">
                  <div class="avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div class="cell-info">
                      <span class="cell-primary">{{ senior.name }}</span>
                      <span class="cell-secondary">ID: {{ senior.oscaId }}</span>
                  </div>
                </div>
              </td>
              <td>
                 <span class="source-badge" :class="senior.source.toLowerCase()">
                    {{ senior.source }}
                 </span>
              </td>
              <td>
                 <div class="status-indicator">
                    <span class="dot" :class="senior.statusColor"></span>
                    {{ senior.status }}
                 </div>
              </td>
              <td class="barangay-text">{{ senior.barangay }}</td>
            </tr>
          </tbody>
        </table>
        
        <button class="view-all-btn">Open Full Database</button>
      </div>
    </div>
    
    <div class="sidebar">
      <div class="quick-actions">
        <h3 class="sidebar-title">Management Tools</h3>
        
        <button class="action-btn primary" @click="showModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Add New Applicant
        </button>

        <button class="action-btn outline" @click="showModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          Validate Living Status
        </button>
        
        <button class="action-btn danger" @click="showModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M3 6h18"></path>
             <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Report Deceased (Delist)
        </button>
      </div>
      
      <div class="notifications">
        <h3 class="sidebar-title">System Alerts</h3>
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          <div class="notification-icon" :class="notification.type">
            <svg v-if="notification.icon === 'file-text'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <svg v-if="notification.icon === 'activity'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
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
import { ref, computed } from 'vue'
import Modal from '../../components/Modal.vue'

const showModal = ref(false)
const currentTab = ref('all')

// Sample Data with 'source' distinguishing Local vs Regional
const seniors = ref([
  { 
    id: 1, 
    name: 'Estolano, Rogelio', 
    oscaId: 'OSCA-922',
    source: 'Regional', 
    status: 'Active', 
    statusColor: 'green',
    barangay: 'Brgy. Poblacion'
  },
  { 
    id: 2, 
    name: 'Mendez, Corazon', 
    oscaId: 'OSCA-1142',
    source: 'Local', 
    status: 'Waitlisted', 
    statusColor: 'orange',
    barangay: 'Brgy. San Jose'
  },
  { 
    id: 3, 
    name: 'Dela Cruz, Jose', 
    oscaId: 'OSCA-0012',
    source: 'Regional', 
    status: 'For Delisting', 
    statusColor: 'red',
    barangay: 'Brgy. Mabini'
  },
  { 
    id: 4, 
    name: 'Santos, Maria', 
    oscaId: 'OSCA-0551',
    source: 'Local', 
    status: 'Active', 
    statusColor: 'green',
    barangay: 'Brgy. Tigatto'
  },
])

const notifications = ref([
  { id: 1, type: 'info', icon: 'file-text', text: 'Regional (DSWD) payroll file generated.', time: '10 mins ago' },
  { id: 2, type: 'warning', icon: 'activity', text: 'Local budget util at 90%.', time: '2 hours ago' }
])

// Filter logic for tabs
const filteredSeniors = computed(() => {
  if (currentTab.value === 'all') return seniors.value
  return seniors.value.filter(s => s.source.toLowerCase() === currentTab.value)
})
</script>

<style scoped>
* { box-sizing: border-box; }
.dashboard { display: flex; gap: 24px; padding: 24px; background-color: #f8fafc; min-height: 100vh; margin-left: -30px; margin-top: -15px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; }
.main-content { flex: 1; }

/* Header & Payout Trackers */
.header-section { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: -0.5px; }
.subtitle { font-size: 14px; color: #64748b; margin: 4px 0 0 0; }
.payout-trackers { display: flex; gap: 12px; }
.payout-badge { display: flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 8px; border: 1px solid; }
.payout-badge svg { width: 18px; height: 18px; }
.payout-badge.regional { background: #eff6ff; border-color: #bfdbfe; color: #1e40af; } /* Blue for Regional */
.payout-badge.local { background: #f0fdf4; border-color: #bbf7d0; color: #166534; } /* Green for Local */
.payout-info { display: flex; flex-direction: column; line-height: 1.1; }
.p-label { font-size: 10px; font-weight: 600; text-transform: uppercase; opacity: 0.8; }
.p-date { font-size: 13px; font-weight: 700; }

/* Stats Grid */
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
.stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.stat-number { font-size: 30px; font-weight: 700; margin: 0; color: #0f172a; letter-spacing: -1px; }
.stat-icon1 { color: #2563eb; background: #dbeafe; padding: 10px; border-radius: 6px; display: flex; } /* Blue */
.stat-icon2 { color: #16a34a; background: #dcfce7; padding: 10px; border-radius: 6px; display: flex; } /* Green */
.stat-icon3 { color: #d97706; background: #fef3c7; padding: 10px; border-radius: 6px; display: flex; } /* Amber */
.stat-header svg { width: 22px; height: 22px; }
.stat-label { font-size: 14px; font-weight: 600; color: #475569; margin: 0 0 4px 0; }
.stat-sub { font-size: 12px; color: #94a3b8; }

/* Table Section */
.activities-section { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; }
.section-title { font-size: 16px; font-weight: 700; margin: 0; color: #0f172a; }
.filter-tabs { display: flex; gap: 4px; background: #f1f5f9; padding: 4px; border-radius: 6px; }
.filter-tabs span { font-size: 13px; color: #64748b; cursor: pointer; font-weight: 500; padding: 6px 16px; border-radius: 4px; transition: all 0.2s; }
.filter-tabs span:hover { color: #334155; }
.filter-tabs span.active { background: white; color: #0f172a; font-weight: 600; shadow: 0 1px 2px rgba(0,0,0,0.05); }

.activities-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 20px; }
.activities-table thead th { text-align: left; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.5px; }
.activities-table tbody td { padding: 16px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }

/* User Cell */
.user-cell { display: flex; align-items: center; gap: 12px; }
.avatar { width: 36px; height: 36px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #64748b; }
.avatar svg { width: 18px; height: 18px; }
.cell-info { display: flex; flex-direction: column; }
.cell-primary { font-weight: 600; font-size: 14px; color: #334155; }
.cell-secondary { font-size: 11px; color: #94a3b8; font-family: monospace; }

/* Source Badges */
.source-badge { display: inline-flex; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; border: 1px solid transparent; }
.source-badge.regional { background: #eff6ff; color: #2563eb; border-color: #dbeafe; }
.source-badge.local { background: #f0fdf4; color: #16a34a; border-color: #dcfce7; }

/* Status Dot */
.status-indicator { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569; font-weight: 500; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.green { background: #22c55e; }
.dot.orange { background: #f97316; }
.dot.red { background: #ef4444; }

.barangay-text { font-size: 13px; color: #64748b; }
.view-all-btn { width: 100%; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.2s; }
.view-all-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }

/* Sidebar */
.sidebar { width: 280px; flex-shrink: 0; }
.sidebar-title { font-size: 12px; font-weight: 700; margin: 0 0 12px 0; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.quick-actions { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px; border: 1px solid #e2e8f0; }

.action-btn { width: 100%; padding: 10px 14px; border: 1px solid transparent; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
.action-btn svg { width: 18px; height: 18px; }
.action-btn:last-child { margin-bottom: 0; }

.action-btn.primary { background: #0f172a; color: white; border-color: #0f172a; }
.action-btn.primary:hover { background: #334155; }

.action-btn.outline { background: white; border: 1px solid #e2e8f0; color: #475569; }
.action-btn.outline:hover { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; }

.action-btn.danger { background: #fef2f2; color: #dc2626; border-color: #fee2e2; }
.action-btn.danger:hover { background: #fee2e2; border-color: #fecaca; }

/* Notifications */
.notifications { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
.notification-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
.notification-item:last-child { border-bottom: none; padding-bottom: 0; }
.notification-item:first-child { padding-top: 0; }
.notification-icon { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.notification-icon svg { width: 16px; height: 16px; }
.notification-icon.info { background: #eff6ff; color: #3b82f6; }
.notification-icon.warning { background: #fff7ed; color: #f97316; }

.notification-text { font-size: 13px; color: #334155; margin: 0 0 4px 0; line-height: 1.4; font-weight: 500; }
.notification-time { font-size: 11px; color: #94a3b8; }

@media (max-width: 1024px) { .dashboard { flex-direction: column; } .sidebar { width: 100%; } .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } }
</style>