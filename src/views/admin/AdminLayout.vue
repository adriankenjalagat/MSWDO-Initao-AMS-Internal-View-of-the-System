<template>
  <div class="layout">
    <aside class="sidebar" :class="{ collapsed: isCollapsed }">
      
      <div class="sidebar-header">
        <div class="brand-container">
          <img :src="mswdoLogo" alt="MSWDO Logo" class="brand-logo" />
          <div class="brand-text">
            <h3 class="brand-title">MSWDO - Initao</h3>
            <p class="brand-subtitle">Assistance Management System</p>
          </div>
        </div>
        
        <button class="toggle-btn" @click="toggleSidebar">
          <svg v-if="!isCollapsed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <nav class="nav-scroller">
        <div class="nav-group">
          <!--     <p class="group-label">MAIN MENU</p> -->
     
          
          <router-link to="/admin/dashboard" class="nav-item">
            <div class="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <span class="nav-text">Dashboard</span>
          </router-link>

          <router-link to="/admin/clients" class="nav-item">
            <div class="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <span class="nav-text">Clients & Beneficiaries</span>
          </router-link>

          <router-link to="/admin/assistance" class="nav-item">
            <div class="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <span class="nav-text">Assistance Management</span>
          </router-link>

          <router-link to="/admin/relief" class="nav-item">
            <div class="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span class="nav-text">Relief Operations</span>
          </router-link>

          <router-link to="/admin/donations" class="nav-item">
            <div class="icon-wrapper">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <span class="nav-text">Donations Management</span>
          </router-link>
          
          <router-link to="/admin/reports" class="nav-item">
            <div class="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span class="nav-text">Reports</span>
          </router-link>
        </div>

        <div class="divider"></div>

        <div class="nav-group">
          <p class="group-label">SYSTEM</p>
          
          <router-link to="/admin/users" class="nav-item">
            <div class="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <span class="nav-text">Users Management</span>
          </router-link>

          <router-link to="/admin/programs" class="nav-item">
            <div class="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <span class="nav-text">Programs Management</span>
          </router-link>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="user-info">
            <p class="user-name">Admin Name</p>
            <p class="user-role">System Administrator</p>
          </div>
        </div>

        <button class="logout-btn" @click="logout">
          <div class="icon-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <span class="logout-text">Logout</span>
        </button>
      </div>

    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import mswdoLogo from '../../assets/mswdo-logo.png'

const router = useRouter()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
/* --- BASE LAYOUT --- */
.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 280px; /* Kept original width */
  background: linear-gradient(180deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 100;
  overflow: hidden;
}

/* --- HEADER SECTION --- */
.sidebar-header {
  height: 70px;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  transition: opacity 0.2s;
}

.brand-logo {
  width: 50px; /* Restored size */
  height: 50px;
  object-fit: contain;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.brand-title {
  font-size: 18px; /* Restored size */
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 10px; /* Restored size */
  margin: 0;
  opacity: 0.8;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-left: auto;
}

.toggle-btn:hover {
  background: rgba(255,255,255,0.15);
}

/* --- NAVIGATION SECTION --- */
.nav-scroller {
  flex: 1;
  padding: 6px 12px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* --- SCROLLBAR (Restored EXACTLY as requested) --- */
.nav-scroller::-webkit-scrollbar {
  width: 6px;
}

.nav-scroller::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.nav-scroller::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

/* --- NAV ITEMS --- */
.nav-group {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px; 
}

.group-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 8px;
  margin: 8px 0 4px 0;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 7px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s ease;
  min-height: 40px; 
  box-sizing: border-box;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.router-link-active {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  font-weight: 500;
  position: relative;
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: #fbbf24;
  border-radius: 0 4px 4px 0;
}

.icon-wrapper {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Color icon active state */
.nav-item.router-link-active .icon-wrapper svg {
  stroke: #fbbf24;
}

.nav-text {
  white-space: nowrap;
  transition: opacity 0.2s;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 12px 16px;
  flex-shrink: 0;
}

/* --- FOOTER SECTION --- */
.sidebar-footer {
  padding: 12px 16px; /* Restored padding */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent; /* Removed bg as per old design, or keep transparent */
  display: flex;
  flex-direction: column;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  transition: background 0.2s;
  margin-bottom: 12px;
}

.user-avatar {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fbbf24;
}

.user-avatar svg {
  width: 20px;
  height: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-name {
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  color: white;
  white-space: nowrap;
}

.user-role {
  font-size: 10px;
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}

.logout-btn {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  width: 100%;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.4);
  color: #fecaca;
}

/* --- COLLAPSED STATE LOGIC --- */

.sidebar.collapsed {
  width: 80px;
}

/* 1. Header Changes */
.sidebar.collapsed .sidebar-header {
  padding: 0;
  justify-content: center;
}

.sidebar.collapsed .brand-container {
  display: none;
}

.sidebar.collapsed .toggle-btn {
  margin: 0;
}

/* 2. Nav Changes */
.sidebar.collapsed .group-label {
  display: none;
}

.sidebar.collapsed .divider {
  margin: 12px 12px;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 9px 0;
}

.sidebar.collapsed .nav-text {
  display: none;
}

/* 3. Footer Changes */
.sidebar.collapsed .sidebar-footer {
  padding: 12px;
}

.sidebar.collapsed .user-profile {
  justify-content: center;
  padding: 12px 0; /* Remove horizontal padding */
  margin: 0 0 12px 0;
  height: auto;
}

.sidebar.collapsed .user-info {
  display: none;
}

.sidebar.collapsed .logout-text {
  display: none;
}

.sidebar.collapsed .logout-btn {
  padding: 10px 0;
  gap: 0;
}

/* --- MAIN CONTENT ADJUSTMENT --- */
.content {
  flex: 1;
  padding: 32px;
  margin-left: 280px; 
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.collapsed ~ .content {
  margin-left: 80px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); width: 280px; }
  .sidebar.collapsed { transform: translateX(0); }
  .content { margin-left: 0 !important; }
}
</style>