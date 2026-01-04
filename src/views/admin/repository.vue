<template>
  <div class="dashboard">
    <div class="main-content">
      <h1 class="page-title">Dashboard Overview</h1>
      
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">1,248</h2>
            <span class="stat-icon user-icon">👥</span>
          </div>
          <p class="stat-label">Total Active Users</p>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">36</h2>
            <span class="stat-icon folder-icon">📁</span>
          </div>
          <p class="stat-label">Total Programs</p>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">14</h2>
            <span class="stat-icon clock-icon">⏱️</span>
          </div>
          <p class="stat-label">Pending Approvals</p>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h2 class="stat-number">892</h2>
            <span class="stat-icon chart-icon">📊</span>
          </div>
          <p class="stat-label">This Month's Transactions</p>
        </div>
      </div>
      
      <!-- Recent Activities -->
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
    
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="quick-actions">
        <h3 class="sidebar-title">Quick Actions</h3>
        <button class="action-btn primary">+ Create New User</button>
        <button class="action-btn secondary">📁 Add New Program</button>
      </div>
      
      <div class="notifications">
        <h3 class="sidebar-title">Recent Notifications</h3>
        
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          <span class="notification-icon" :class="notification.type">
            {{ notification.icon }}
          </span>
          <div class="notification-content">
            <p class="notification-text">{{ notification.text }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardOverview',
  data() {
    return {
      activities: [
        {
          id: 1,
          username: 'Michael Chen',
          initials: 'MC',
          avatarColor: '#e3f2fd',
          action: 'Approved Application',
          program: 'AICS Program - #4921',
          timestamp: '2 mins ago'
        },
        {
          id: 2,
          username: 'Sarah Williams',
          initials: 'SW',
          avatarColor: '#fce4ec',
          action: 'Updated Budget',
          program: 'Social Pension Fund',
          timestamp: '45 mins ago'
        },
        {
          id: 3,
          username: 'Robert Taylor',
          initials: 'RT',
          avatarColor: '#fff3e0',
          action: 'Created New User',
          program: 'Field Officer Account',
          timestamp: '2 hours ago'
        },
        {
          id: 4,
          username: 'Emily Davis',
          initials: 'ED',
          avatarColor: '#f3e5f5',
          action: 'Generated Report',
          program: 'Monthly Disbursement',
          timestamp: '4 hours ago'
        },
        {
          id: 5,
          username: 'James Wilson',
          initials: 'JW',
          avatarColor: '#ffebee',
          action: 'Flagged Application',
          program: 'SLP Grant - #2290',
          timestamp: 'Yesterday'
        }
      ],
      notifications: [
        {
          id: 1,
          type: 'warning',
          icon: '⚠️',
          text: 'System maintenance scheduled for tonight at 2:00 AM.',
          time: '1 hour ago'
        },
        {
          id: 2,
          type: 'success',
          icon: '✓',
          text: 'Q3 Budget Report has been successfully generated.',
          time: '3 hours ago'
        },
        {
          id: 3,
          type: 'info',
          icon: '👥',
          text: '5 new field officers added to the SLP program.',
          time: 'Yesterday'
        }
      ]
    };
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.dashboard {
  display: flex;
  gap: 24px;
  padding: 24px;
  background-color: #f5f7fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.main-content {
  flex: 1;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #1a1a1a;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

.stat-icon {
  font-size: 24px;
  opacity: 0.6;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Activities Section */
.activities-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1a1a1a;
}

.activities-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.activities-table thead th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  padding: 12px;
  border-bottom: 2px solid #f0f0f0;
  letter-spacing: 0.5px;
}

.activities-table tbody td {
  padding: 16px 12px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.timestamp {
  color: #999;
}

.view-all-btn {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.view-all-btn:hover {
  background: #f5f5f5;
}

/* Sidebar */
.sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1a1a1a;
}

.quick-actions {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.action-btn {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
}

.action-btn:last-child {
  margin-bottom: 0;
}

.action-btn.primary {
  background: #4c6ef5;
  color: white;
}

.action-btn.primary:hover {
  background: #3b5bdb;
}

.action-btn.secondary {
  background: #12b886;
  color: white;
}

.action-btn.secondary:hover {
  background: #0ca678;
}

/* Notifications */
.notifications {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.notification-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.notification-item:first-child {
  padding-top: 0;
}

.notification-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-text {
  font-size: 13px;
  color: #333;
  margin: 0 0 4px 0;
  line-height: 1.5;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

@media (max-width: 1024px) {
  .dashboard {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .activities-table {
    font-size: 12px;
  }
  
  .activities-table thead th,
  .activities-table tbody td {
    padding: 8px;
  }
}
</style>