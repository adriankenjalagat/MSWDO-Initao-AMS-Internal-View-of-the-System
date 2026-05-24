import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  // --- Admin Routes ---
  {
    path: '/admin',
    component: () => import('../views/admin/AdminLayout.vue'),
    meta: { role: 'admin' },
    redirect: '/admin/dashboard', // FIX: Redirects /admin to dashboard
    children: [
      { path: 'dashboard', component: () => import('../views/admin/AdminDashboard.vue') },
      { path: 'clients', component: () => import('../views/admin/AdminClientsBeneficiaries.vue') },
      { path: 'assistance', component: () => import('../views/admin/AdminAssistanceManagement.vue') },
      { path: 'relief', component: () => import('../views/admin/AdminReliefOperations.vue') },
      { path: 'donations', component: () => import('../views/admin/AdminDonationsManagement.vue') },
      { path: 'reports', component: () => import('../views/admin/AdminReports.vue') },
      { path: 'users', component: () => import('../views/admin/AdminUsersManagement.vue') },
      { path: 'programs', component: () => import('../views/admin/AdminProgramsManagement.vue') }
    ]
  },

  // --- Staff Routes ---
  {
    path: '/staff',
    component: () => import('../views/staff/StaffLayout.vue'),
    meta: { role: 'staff' }, // FIX: Changed from 'admin' to 'staff'
    redirect: '/staff/dashboard', // FIX: Redirects /staff to dashboard
    children: [
      { path: 'dashboard', component: () => import('../views/staff/StaffDashboard.vue') },
      { path: 'clients', component: () => import('../views/staff/StaffClientsBeneficiaries.vue') },
      { path: 'clients/:id', name: 'StaffClientDetail', component: () => import('../views/staff/StaffClientsBeneficiaries.vue') },
      { path: 'assistance', component: () => import('../views/staff/StaffAssistanceManagement.vue') },
      { path: 'relief', component: () => import('../views/staff/StaffReliefOperations.vue') },
      { path: 'donations', component: () => import('../views/staff/StaffDonationsManagement.vue') },
      { path: 'reports', component: () => import('../views/staff/StaffReports.vue') }
    ]
  },

   {
    path: '/aicsfocalperson',
    component: () => import('../views/aicsfocalperson/AFPLayout.vue'),
    meta: { role: 'aicsfocalperson' }, // FIX: Changed from 'admin' to 'staff'
    redirect: '/aicsfocalperson/dashboard', // FIX: Redirects /staff to dashboard
    children: [
      { path: 'dashboard', component: () => import('../views/aicsfocalperson/AFPDashboard.vue') },
      { path: 'clients', component: () => import('../views/aicsfocalperson/AFPClientsBeneficiaries.vue') },
      { path: 'aics-application', component: () => import('../views/aicsfocalperson/AICSApplication.vue') },
      { path: 'assistance', component: () => import('../views/aicsfocalperson/AFPAssistanceManagement.vue') },
      { path: 'relief', component: () => import('../views/aicsfocalperson/AFPReliefOperations.vue') },
      { path: 'donations', component: () => import('../views/aicsfocalperson/AFPDonationsManagement.vue') },
      { path: 'reports', component: () => import('../views/aicsfocalperson/AFPReports.vue') }
    ]
  },
  {
    path: '/officerincharge',
    component: () => import('../views/officerincharge/OICLayout.vue'),
    meta: { role: 'officerincharge' }, // FIX: Changed from 'admin' to 'staff'
    redirect: '/officerincharge/dashboard', // FIX: Redirects /staff to dashboard
    children: [
      { path: 'dashboard', component: () => import('../views/officerincharge/OICDashboard.vue') },
      { path: 'clients', component: () => import('../views/officerincharge/OICClientsBeneficiaries.vue') },
      { path: 'assistance', component: () => import('../views/officerincharge/OICAssistanceManagement.vue') },
      { path: 'relief', component: () => import('../views/officerincharge/OICReliefOperations.vue') },
      { path: 'donations', component: () => import('../views/officerincharge/OICDonationsManagement.vue') },
      { path: 'reports', component: () => import('../views/officerincharge/OICReports.vue') }
    ]
  },
  {
    path: '/scfocalperson',
    component: () => import('../views/scfocalperson/SCLayout.vue'),
    meta: { role: 'scfocalperson' }, // FIX: Changed from 'admin' to 'staff'
    redirect: '/scfocalperson/dashboard', // FIX: Redirects /staff to dashboard
    children: [
      { path: 'dashboard', component: () => import('../views/scfocalperson/SCDashboard.vue') },
      { path: 'social-pension-beneficiaries', component: () => import('../views/scfocalperson/SCSocialPensionBeneficiaries.vue') },
      { path: 'clients', component: () => import('../views/scfocalperson/SCClientsBeneficiaries.vue') },
      { path: 'assistance', component: () => import('../views/scfocalperson/SCAssistanceManagement.vue') },
      { path: 'relief', component: () => import('../views/scfocalperson/SCReliefOperations.vue') },
      { path: 'donations', component: () => import('../views/scfocalperson/SCDonationsManagement.vue') },
      { path: 'reports', component: () => import('../views/scfocalperson/SCReports.vue') }
    ]
  },
  {
    path: '/slpfocalperson',
    component: () => import('../views/slpfocalperson/SLPLayout.vue'),
    meta: { role: 'slpfocalperson' }, // FIX: Changed from 'admin' to 'staff'
    redirect: '/slpfocalperson/dashboard', // FIX: Redirects /staff to dashboard
    children: [
      { path: 'dashboard', component: () => import('../views/slpfocalperson/SLPDashboard.vue') },
      { path: 'clients', component: () => import('../views/slpfocalperson/SLPClientsBeneficiaries.vue') },
      { path: 'slp-beneficiaries', component: () => import('../views/slpfocalperson/SLPClientsBeneficiaries.vue') },
      { path: 'assistance', component: () => import('../views/slpfocalperson/SLPAssistanceManagement.vue') },
      { path: 'relief', component: () => import('../views/slpfocalperson/SLPReliefOperations.vue') },
      { path: 'donations', component: () => import('../views/slpfocalperson/SLPDonationsManagement.vue') },
      { path: 'reports', component: () => import('../views/slpfocalperson/SLPReports.vue') }
    ]
  }

  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// --- Fixed Navigation Guard ---
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  // Check if the route requires a specific role
  if (to.meta.role) {
    // 1. Check if user is logged in
    if (!user) {
      return next('/login')
    }

    // 2. Check if user role matches the required role
    // Note: This enforces strict matching. If you want Admins to also access 
    // Staff pages, you would change this condition.
    if (user.role !== to.meta.role) {
      // User is logged in but unauthorized. 
      // Redirect to their own dashboard or login.
      if(user.role === 'admin') return next('/admin/dashboard')
      if(user.role === 'staff') return next('/staff/dashboard')
      return next('/login')
    }
  }
  
  // If the route has no meta.role (like /login), allow access
  next()
})

export default router