<template>
  <div class="dashboard">
    <div class="main-content">
      <div class="header-section">
        <h1 class="page-title">Officer in Charge Overview</h1>
        <p class="date-display">{{ currentDate }}</p>
      </div>
    
      <div class="stats-grid">
        <div class="stat-card urgent">
          <div class="stat-header">
            <h2 class="stat-number orange">12</h2>
            <div class="stat-icon1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M12 18v-4h4"></path> </svg>
            </div>
          </div>
          <p class="stat-label">Pending Adjudication</p>
          <span class="stat-sub">Requires your aproval.</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">₱1.2M</h2>
            <div class="stat-icon2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            </div>
          </div>
          <p class="stat-label">Funds Disbursed</p>
          <span class="stat-sub">15% of allocated budget</span>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">45</h2>
            <div class="stat-icon3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <p class="stat-label">Processed Today</p>
          <span class="stat-sub">By staff members</span>
        </div>
      </div>
      
      <div class="activities-section">
        <div class="section-header-row">
            <h2 class="section-title">Applications Awaiting Decision</h2>
            <button class="view-all-link">View Detailed Queue →</button>
        </div>
        
        <table class="activities-table">
          <thead>
            <tr>
              <th>REF NO.</th>
              <th>APPLICANT</th>
              <th>PROGRAM</th>
              <th>ASSESSED BY</th>
              <th>AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in pendingReviews" :key="app.id">
              <td class="ref-cell">{{ app.refNo }}</td>
              <td>
                <div class="user-cell">
                   <div class="avatar-initials" :style="{ backgroundColor: app.avatarColor }">
                    {{ app.initials }}
                  </div>
                  <div class="user-info">
                      <span class="user-name">{{ app.applicant }}</span>
                      <span class="user-type">{{ app.type }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="program-tag">{{ app.program }}</span>
              </td>
              <td class="staff-cell">
                 <span class="staff-name">{{ app.staffName }}</span>
              </td>
              <td class="amount-cell">{{ app.amount }}</td>
              <td class="actions-cell">
                 <button class="icon-btn approve" title="Approve" @click="approveApp(app.id)">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                 </button>
                 <button class="icon-btn reject" title="Reject" @click="rejectApp(app.id)">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                 </button>
                 <button class="icon-btn view" title="View Details">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                 </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="sidebar">
      <div class="quick-actions">
        <h3 class="sidebar-title">Management Actions</h3>
        
        <button class="action-btn primary" @click="showReportModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Generate Financial Report
        </button>

        <button class="action-btn secondary" @click="showUserModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          View Applications
        </button>
        
         
      </div>
      
      <div class="notifications">
        <h3 class="sidebar-title">Priority Alerts</h3>
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          <div class="notification-icon" :class="notification.type">
            <svg v-if="notification.icon === 'alert-triangle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <svg v-if="notification.icon === 'alert-circle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
             <svg v-if="notification.icon === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <circle cx="12" cy="12" r="10"></circle>
               <line x1="12" y1="16" x2="12" y2="12"></line>
               <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div class="notification-content">
            <p class="notification-text">{{ notification.text }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>
        </div>
      </div>
    </div>


    <Modal v-if="showProgramModal" title="Program Management" @close="showProgramModal = false">
       <div style="padding: 20px;">Program Component</div>
    </Modal>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../../components/Modal.vue'

// -- Reactive State --
const showUserModal = ref(false)
const showProgramModal = ref(false)
const showReportModal = ref(false)


// -- OIC Focused Data --
const pendingReviews = ref([
  { id: 1, refNo: 'APP-0092', applicant: 'Sarah Geronimo', type: 'Indigent', initials: 'SG', avatarColor: '#e3f2fd', program: 'Medical (AICS)', staffName: 'Adrian Ken', amount: '₱15,000.00' },
  { id: 2, refNo: 'APP-0095', applicant: 'Coco Martin', type: 'Senior Citizen', initials: 'CM', avatarColor: '#fff3e0', program: 'Social Pension', staffName: 'Ben Calif', amount: '₱6,000.00' },
  { id: 3, refNo: 'APP-0102', applicant: 'Regine Velasquez', type: 'PWD', initials: 'RV', avatarColor: '#fce4ec', program: 'Assistive Device', staffName: 'Zendie Lou', amount: '₱25,000.00' },
  { id: 4, refNo: 'APP-0105', applicant: 'Ogie Alcasid', type: 'Student', initials: 'OA', avatarColor: '#e8f5e9', program: 'Educational', staffName: 'Adrian Ken', amount: '₱5,000.00' },
])

const notifications = ref([
  { id: 1, type: 'critical', icon: 'alert-triangle', text: 'Medical Assistance Fund is below 15% threshold.', time: 'Just now' },
  { id: 2, type: 'warning', icon: 'alert-circle', text: 'Case #8821 flagged for duplicate entry by Staff.', time: '2 hours ago' },
  { id: 3, type: 'info', icon: 'info', text: 'Mayor\'s office requested Monthly Report.', time: '5 hours ago' }
])

// -- Methods --
const approveApp = (id) => {
    alert(`Application ${id} Approved. Generating Certificate...`)
    pendingReviews.value = pendingReviews.value.filter(a => a.id !== id)
}

const rejectApp = (id) => {
    if(confirm('Are you sure you want to reject this application?')) {
        pendingReviews.value = pendingReviews.value.filter(a => a.id !== id)
    }
}
</script>

<style scoped>
* { box-sizing: border-box; }
.dashboard { display: flex; gap: 24px; padding: 10px; background-color: #f5f7fa; min-height: 100vh; font-family: 'Inter', -apple-system, sans-serif; }

.main-content { flex: 1; }
.header-section { margin-bottom: 24px; }
.page-title { font-size: 30px; font-weight: 700; color: #1e293b; margin: 0; letter-spacing: -0.5px; font-family: outfit;}
.date-display { color: #64748b; margin: 4px 0 0 0; font-size: 14px; }

/* Stats */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 32px; }
.stat-card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; position: relative; overflow: hidden; }
.stat-card.urgent { border-left: 4px solid #f97316; } /* Orange accent for urgency */

.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.stat-number { font-size: 32px; font-weight: 700; margin: 0; color: #1e293b; }
.stat-number.orange { color: #ea580c; }

/* Icons */
.stat-icon1, .stat-icon2, .stat-icon3 { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
.stat-icon1 { background: #fff7ed; color: #ea580c; }
.stat-icon2 { background: #ecfdf5; color: #059669; }
.stat-icon3 { background: #eff6ff; color: #3b82f6; }
/* SVGs in stats - Consistent size */
.stat-icon1 svg, .stat-icon2 svg, .stat-icon3 svg { width: 20px; height: 20px; }

.stat-label { font-size: 14px; font-weight: 600; color: #475569; margin: 0; }
.stat-sub { font-size: 12px; color: #94a3b8; margin-top: 4px; display: block; }

/* Table Section */
.activities-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
.section-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.section-title { font-size: 18px; font-weight: 700; margin: 0; color: #1e293b; }
.view-all-link { background: none; border: none; color: #4f46e5; font-size: 13px; font-weight: 600; cursor: pointer; }

.activities-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.activities-table thead th { text-align: left; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; padding: 12px; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.5px; }
.activities-table tbody td { padding: 16px 12px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 14px; vertical-align: middle; }

/* Table Content Styling */
.ref-cell { font-family: 'Monaco', monospace; font-size: 12px; color: #64748b; }
.user-cell { display: flex; align-items: center; gap: 12px; }
.avatar-initials { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #475569; }
.user-info { display: flex; flex-direction: column; }
.user-name { font-weight: 600; color: #1e293b; font-size: 14px; }
.user-type { font-size: 11px; color: #94a3b8; }
.program-tag { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; color: #475569; }
.staff-name { font-size: 13px; color: #64748b; font-style: italic; }
.amount-cell { font-weight: 600; color: #0f172a; }

/* Action Buttons in Table */
.actions-cell { display: flex; gap: 8px; }
.icon-btn { border: none; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
.icon-btn.approve { background: #dcfce7; color: #166534; }
.icon-btn.approve:hover { background: #bbf7d0; }
.icon-btn.reject { background: #fee2e2; color: #991b1b; }
.icon-btn.reject:hover { background: #fecaca; }
.icon-btn.view { background: #f1f5f9; color: #475569; }
.icon-btn.view:hover { background: #e2e8f0; }

/* Sidebar */
.sidebar { width: 320px; flex-shrink: 0; }
.sidebar-title { font-size: 14px; font-weight: 700; margin: 0 0 16px 0; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
.quick-actions { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); margin-bottom: 24px; border: 1px solid #e2e8f0; }

.action-btn { width: 100%; padding: 12px 16px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.action-btn svg { width: 18px; height: 18px; }
.action-btn:last-child { margin-bottom: 0; }

/* Button Variants */
.action-btn.primary { background: #4f46e5; color: white; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); }
.action-btn.primary:hover { background: #4338ca; transform: translateY(-1px); }
.action-btn.secondary { background: white; border: 1px solid #e2e8f0; color: #1e293b; }
.action-btn.secondary:hover { background: #f8fafc; border-color: #cbd5e1; }
.action-btn.outline { background: transparent; border: 1px dashed #cbd5e1; color: #64748b; }
.action-btn.outline:hover { border-color: #94a3b8; color: #475569; background: #f8fafc; }

/* Notifications */
.notifications { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
.notification-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
.notification-item:last-child { border-bottom: none; padding-bottom: 0; }
.notification-item:first-child { padding-top: 0; }

.notification-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.notification-icon.critical { background: #fee2e2; color: #ef4444; }
.notification-icon.warning { background: #ffedd5; color: #f97316; }
.notification-icon.info { background: #eff6ff; color: #3b82f6; }
.notification-content { flex: 1; }
.notification-text { font-size: 13px; color: #334155; margin: 0 0 4px 0; line-height: 1.4; font-weight: 500; }
.notification-time { font-size: 11px; color: #94a3b8; }

/* Responsiveness */
@media (max-width: 1024px) { 
  .dashboard { flex-direction: column; } 
  .sidebar { width: 100%; } 
  .stats-grid { grid-template-columns: repeat(3, 1fr); } 
}
@media (max-width: 768px) { 
  .stats-grid { grid-template-columns: 1fr; } 
  .activities-table { font-size: 12px; } 
  .activities-table thead th, .activities-table tbody td { padding: 8px; } 
  .action-btn { justify-content: center; }
}
</style>