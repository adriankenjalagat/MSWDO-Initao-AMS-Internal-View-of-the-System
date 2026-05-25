<template>
  <div class="users-management">
    <div class="header">
      <h1>Users Management</h1>
      <button class="btn-primary" @click="showCreateModal = true">
        + Add New User
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg class="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Total Users</div>
          <div class="stat-value">24</div>
          <div class="stat-change positive">+2 new this week</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <svg class="icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Active Users</div>
          <div class="stat-value">18</div>
          <div class="stat-subtitle">Currently logged in: 4</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Admin Accounts</div>
          <div class="stat-value">3</div>
          <div class="stat-subtitle">Full system access</div>
        </div>
      </div>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <span class="search-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input type="text" placeholder="Search users by name or email..." v-model="searchQuery">
      </div>
      <div class="filter-actions">
        <button class="btn-filter">
          <svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M6 12h12M10 18h4"/></svg>
          Role
        </button>
        <button class="btn-filter">
          <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Status
        </button>
      </div>
    </div>

    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th class="checkbox-col">
              <input type="checkbox" class="custom-checkbox">
            </th>
            <th>USER</th>
            <th>ROLE</th>
            <th>EMAIL ADDRESS</th>
            <th>STATUS</th>
            <th>LAST ACTIVE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="checkbox-col">
              <input type="checkbox" class="custom-checkbox">
            </td>
            <td>
              <div class="user-cell">
                <span class="user-avatar" :style="{ backgroundColor: user.avatarColor }">
                  {{ user.avatar }}
                </span>
                <div class="user-name">{{ user.name }}</div>
              </div>
            </td>
            <td>
              <span class="role-badge" :class="user.role.toLowerCase()">
                {{ user.role }}
              </span>
            </td>
            <td class="email-col">{{ user.email }}</td>
            <td>
              <span class="status-indicator" :class="user.status.toLowerCase()">
                {{ user.status }}
              </span>
            </td>
            <td class="date-col">{{ user.lastActive }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-icon" title="Edit">
                  <svg class="icon" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="btn-icon delete" title="Delete">
                  <svg class="icon" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span>Rows per page: 10   1-{{ filteredUsers.length }} of {{ filteredUsers.length }}</span>
      <div class="pagination-controls">
        <button class="btn-page">‹</button>
        <button class="btn-page">›</button>
      </div>
    </div>

    <Modal v-if="showCreateModal" title="Add New User" @close="showCreateModal = false">
      <CreateUser @cancel="showCreateModal = false" @done="handleCreateUser" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../../components/Modal.vue'
import CreateUser from '../../components/CreateUser.vue'

// --- State ---
const showCreateModal = ref(false)
const searchQuery = ref('')

const users = ref([
  {
    id: 1,
    name: 'Ben Calif',
    avatar: 'BC',
    avatarColor: '#e0e7ff',
    role: 'Admin',
    email: 'bencalif@email.com',
    status: 'Active',
    lastActive: '2 mins ago'
  },
  {
    id: 2,
    name: 'Adrian Ken',
    avatar: 'AK',
    avatarColor: '#fef3c7',
    role: 'Staff',
    email: 'adrianken@email.com',
    status: 'Active',
    lastActive: '1 day ago'
  },
  {
    id: 3,
    name: 'Zendie Lou',
    avatar: 'ZL',
    avatarColor: '#d1fae5',
    role: 'Focal Person',
    email: 'zendielou@.com',
    status: 'Inactive',
    lastActive: '1 week ago'
  }
])

// --- Logic ---
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

// Simple color rotater for new avatars
const colors = ['#e0e7ff', '#fef3c7', '#d1fae5', '#fce7f3', '#e0f2fe'];

const handleCreateUser = (formData) => {
  const newUser = {
    id: Date.now(), // Mock ID
    name: formData.name,
    avatar: getInitials(formData.name),
    avatarColor: colors[Math.floor(Math.random() * colors.length)],
    role: formData.role,
    email: formData.email,
    status: formData.status,
    lastActive: 'Just now'
  }

  // Add to top of list
  users.value.unshift(newUser)
  showCreateModal.value = false
}

// --- Computed ---
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(u => 
    u.name.toLowerCase().includes(query) || 
    u.email.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
/* Main Layout */
.users-management {
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
.stat-icon.purple { background: #f3e8ff; }
.stat-content { flex: 1; }
.stat-label { font-size: 13px; color: #6b7280; margin-bottom: 4px; }
.stat-value { font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
.stat-change { font-size: 12px; color: #6b7280; }
.stat-change.positive { color: #10b981; }
.stat-subtitle { font-size: 12px; color: #6b7280; }

/* Filters */
.filters-bar { background: white; padding: 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.search-box { position: relative; flex: 1; max-width: 400px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); }
.search-box input { width: 100%; padding: 8px 8px 8px 36px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; }
.filter-actions { display: flex; gap: 8px; }
.btn-filter { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; }
.btn-filter:hover { background: #f9fafb; }

/* Table */
.table-container { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.users-table { width: 100%; border-collapse: collapse; }
.users-table thead { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
.users-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
.users-table td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #1a1a1a; vertical-align: middle; }

.checkbox-col { width: 48px; text-align: center; padding-right: 0 !important; }
.custom-checkbox { width: 16px; height: 16px; cursor: pointer; accent-color: #2563eb; }

/* User Cell */
.user-cell { display: flex; align-items: center; gap: 12px; }
.user-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #374151; flex-shrink: 0; }
.user-name { font-weight: 500; color: #1a1a1a; }

/* Role Badge */
.role-badge { padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; display: inline-block; }
.role-badge.admin { background: #e0e7ff; color: #3730a3; }
.role-badge.staff { background: #f3f4f6; color: #374151; }
.role-badge.volunteer { background: #d1fae5; color: #065f46; }

/* Status Indicator */
.status-indicator { display: inline-flex; align-items: center; font-size: 13px; font-weight: 500; }
.status-indicator::before { content: ''; width: 8px; height: 8px; border-radius: 50%; margin-right: 8px; }
.status-indicator.active { color: #059669; }
.status-indicator.active::before { background: #10b981; }
.status-indicator.inactive { color: #6b7280; }
.status-indicator.inactive::before { background: #9ca3af; }

.email-col, .date-col { color: #6b7280; }

/* Actions */
.action-buttons { display: flex; gap: 8px; }
.btn-icon { width: 32px; height: 32px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.btn-icon:hover { background: #f9fafb; }
.btn-icon.delete:hover { background: #fee2e2; border-color: #fecaca; color: #dc2626; }

/* Pagination */
.pagination { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; font-size: 14px; color: #6b7280; }
.pagination-controls { display: flex; gap: 8px; }
.btn-page { width: 32px; height: 32px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; cursor: pointer; }
.btn-page:hover { background: #f9fafb; }
</style>