<template>
  <div class="dashboard">
    <div class="main-content">
      <h1 class="page-title">System Admin Dashboard Overview</h1>
    
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">18</h2>
            <div class="stat-icon1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <p class="stat-label">Total Active Users</p>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">5</h2>
            <div class="stat-icon2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
          <p class="stat-label">Total Programs</p>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">892</h2>
            <div class="stat-icon3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
          </div>
          <p class="stat-label">This Month's Transactions</p>
        </div>
      </div>
      
      <div class="activities-section">
        <h2 class="section-title">Recent User Activities</h2>
        
        <table class="activities-table">
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>ACTION</th>
              <th>PROGRAM / TARGET</th>
              <th>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities" :key="activity.id">
              <td>
                <div class="user-cell">
                  <div class="avatar" :style="{ backgroundColor: activity.avatarColor }">
                    {{ activity.initials }}
                  </div>
                  <span>{{ activity.username }}</span>
                </div>
              </td>
              <td>{{ activity.action }}</td>
              <td>{{ activity.program }}</td>
              <td class="timestamp">{{ activity.timestamp }}</td>
            </tr>
          </tbody>
        </table>
        
        <button class="view-all-btn">View All Activities</button>
      </div>
    </div>
    
    <div class="sidebar">
      <div class="quick-actions">
        <h3 class="sidebar-title">Quick Actions</h3>
        
        <button class="action-btn primary" @click="showUserModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create New User
        </button>

        <button class="action-btn secondary" @click="showProgramModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          Add New Program
        </button>
      </div>
      
      <div class="notifications">
        <h3 class="sidebar-title">Recent Notifications</h3>
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          <div class="notification-icon" :class="notification.type">
            <svg v-if="notification.icon === 'alert-circle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
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

    <Modal v-if="showUserModal" title="Create New User" @close="showUserModal = false">
      <CreateUser 
        @cancel="showUserModal = false" 
        @done="showUserModal = false" 
      />
    </Modal>

    <AddProgram 
      v-if="showProgramModal"
      @cancel="showProgramModal = false" 
      @done="showProgramModal = false" 
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import the components
import CreateUser from '../../components/CreateUser.vue'
import AddProgram from '../../components/AddProgram.vue'

// -- Reactive State for Modals --
const showUserModal = ref(false)
const showProgramModal = ref(false)

// -- Data for the UI --
const activities = ref([
  { id: 1, username: 'Adrian Ken', initials: 'AK', avatarColor: '#fce4ec', action: 'Approved Application', program: 'AICS', timestamp: '2 mins ago' },
  { id: 2, username: 'Ben Calif', initials: 'BC', avatarColor: '#fff3e0', action: 'Updated Budget', program: 'Social Pension Fund', timestamp: '45 mins ago' },
  { id: 3, username: 'Zendie Lou', initials: 'ZL', avatarColor: '#e8f5e9', action: 'Created New Application', program: 'SLP Management', timestamp: '2 hours ago' },
])

const notifications = ref([
  { id: 1, type: 'warning', icon: 'alert-circle', text: 'System maintenance scheduled for tonight.', time: '1 hour ago' },
  { id: 2, type: 'success', icon: 'check-circle', text: 'Budget Report has been successfully generated.', time: '3 hours ago' },
  { id: 3, type: 'info', icon: 'info', text: '5 new applications added.', time: 'Yesterday' }
])
</script>

<style scoped>
* { box-sizing: border-box; }
.dashboard { display: flex; gap: 24px; padding: 24px; background-color: #f5f7fa; min-height: 100vh; margin-left: -30px; margin-top: -15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
.main-content { flex: 1; }
.page-title { font-size: 30px; font-weight: 600; font-family: outfit; margin: 0 0 24px 0; color: #1a1a1a; margin-bottom: 35px; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
.stat-card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.stat-number { font-size: 36px; font-weight: 700; margin: 0; color: #1a1a1a; }
.stat-icon1 { width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 10px; color: #06156b; }
.stat-icon2 { width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 10px; color:#217253;; }
.stat-icon3 { width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 10px; color:#997115;; }
.stat-icon svg { width: 20px; height: 20px; }
.stat-label { font-size: 14px; color: #666; margin: 0; }
.activities-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.section-title { font-size: 20px; font-weight: 600; margin: 0 0 20px 0; color: #1a1a1a; }
.activities-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.activities-table thead th { text-align: left; font-size: 11px; font-weight: 600; color: #666; text-transform: uppercase; padding: 12px; border-bottom: 2px solid #f0f0f0; letter-spacing: 0.5px; }
.activities-table tbody td { padding: 16px 12px; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px; }
.user-cell { display: flex; align-items: center; gap: 12px; }
.avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #495057; border: 1px solid #dee2e6; }
.timestamp { color: #999; }
.view-all-btn { width: 100%; padding: 12px; background: white; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; font-weight: 500; color: #333; cursor: pointer; transition: all 0.2s; }
.view-all-btn:hover { background: #f5f5f5; }
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