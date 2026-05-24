<template>
  <div class="program-management">
    <div class="header">
      <div>
        <h1>Programs Management</h1>
      </div>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <span class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          type="text" 
          placeholder="Search programs by name or code..." 
          v-model="searchQuery"
        >
      </div>

      <div class="action-group">
        <button class="btn-filter">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Status: All
        </button>
        <button class="btn-filter">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Sort: Name
        </button>
        
        <button class="btn-primary" @click="showCreateModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Program
        </button>
      </div>
    </div>

    <div class="programs-grid">
      <div 
        v-for="program in filteredPrograms" 
        :key="program.id"
        class="program-card"
        :class="getCategoryClass(program.category)"
      >
        <div class="card-bg-icon" v-html="getCategoryIcon(program.category)"></div>

        <div class="card-header">
          <span class="category-badge">
            {{ program.category }}
          </span>
          <button class="btn-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        <div class="card-body">
          <div class="program-title">
            <span class="status-dot" :class="program.statusClass"></span>
            <h3>{{ program.name }}</h3>
          </div>
          <p class="program-description">{{ program.description }}</p>

          <div class="program-stats">
            <div class="stat-item">
              <span class="stat-label">{{ program.stat1Label }}</span>
              <span class="stat-value">{{ program.stat1Value }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">{{ program.stat2Label }}</span>
              <span class="stat-value">{{ program.stat2Value }}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button class="btn-configure">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configure
          </button>
          <button class="btn-delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div class="program-card new-program">
        <div class="new-program-content">
          <div class="plus-icon">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3>New Program</h3>
          <p>Add a new assistance or social welfare program to the system.</p>
          <button class="btn-create-secondary" @click="showCreateModal = true">Create Program</button>
        </div>
      </div>
    </div>

    <CreateProgram 
      v-if="showCreateModal"
      @cancel="showCreateModal = false" 
      @done="handleCreateProgram" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CreateProgram from '../../components/AddProgram.vue'

// --- State ---
const showCreateModal = ref(false)
const searchQuery = ref('')

const programs = ref([
  {
    id: 1,
    category: 'SOCIAL SERVICE',
    name: 'AICS',
    description: 'Assistance to Individuals in Crisis Situation. Provides medical, burial, transportation, and educational...',
    stat1Label: 'Beneficiaries',
    stat1Value: '16,250',
    stat2Label: 'Budget YTD',
    stat2Value: '₱ 5.2M',
    statusClass: 'active'
  },
  {
    id: 2,
    category: 'PENSION',
    name: 'Social Pension',
    description: 'Monthly stipend for indigent senior citizens to augment their daily subsistence and other medical...',
    stat1Label: 'Active Pensioners',
    stat1Value: '8,400',
    stat2Label: 'Next Payout',
    stat2Value: 'Dec 15',
    statusClass: 'active'
  },
  {
    id: 3,
    category: 'LIVELIHOOD',
    name: 'SLP',
    description: 'Sustainable Livelihood Program. Capacity building and resource provision for micro-enterprise development.',
    stat1Label: 'Participants',
    stat1Value: '2,100',
    stat2Label: 'Projects',
    stat2Value: '45 Active',
    statusClass: 'active'
  },
  {
    id: 4,
    category: 'EMERGENCY',
    name: 'Relief Operations',
    description: 'Disaster response and management. Distribution of food packs and essential items during calamities.',
    stat1Label: 'Stockpiles',
    stat1Value: '15,000',
    stat2Label: 'Operations',
    stat2Value: '12 YTD',
    statusClass: 'active'
  },
  {
    id: 5,
    category: 'RESOURCE',
    name: 'Donations',
    description: 'Management of in-kind donations from private and public partners.',
    stat1Label: 'Donors',
    stat1Value: '340',
    stat2Label: 'Total Value',
    stat2Value: '₱ 8.5M',
    statusClass: 'active'
  }
])

// --- Logic ---

const getCategoryClass = (category) => {
  return category.toLowerCase().replace(' ', '-')
}

const getCategoryIcon = (category) => {
  const cat = category.toLowerCase()
  const props = 'width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"'
  
  if (cat.includes('social')) return `<svg ${props}><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`
  if (cat.includes('pension')) return `<svg ${props}><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  if (cat.includes('livelihood')) return `<svg ${props}><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`
  if (cat.includes('emergency')) return `<svg ${props}><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`
  return `<svg ${props}><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`
}

const handleCreateProgram = (formData) => {
  const newProgram = {
    id: Date.now(),
    category: formData.category,
    name: formData.name,
    description: formData.description,
    stat1Label: formData.stat1Label,
    stat1Value: formData.stat1Value,
    stat2Label: formData.stat2Label,
    stat2Value: formData.stat2Value,
    statusClass: 'active'
  }
  
  // Add to beginning of list
  programs.value.unshift(newProgram)
  showCreateModal.value = false
}

// --- Computed ---

const filteredPrograms = computed(() => {
  if (!searchQuery.value) return programs.value
  const query = searchQuery.value.toLowerCase()
  return programs.value.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
/* Copied directly from your source to maintain visual fidelity */
.program-management {
  padding: 9px;
  background: #f5f5f5;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.header { margin-bottom: 24px; }
h1 { font-size: 30px; font-weight: 600; margin: 0 0 4px 0; color: #1a1a1a; font-family: outfit; }
.subtitle { font-size: 14px; color: #6b7280; margin: 0; }

/* FILTERS BAR */
.filters-bar { display: flex; gap: 16px; margin-bottom: 24px; align-items: center; }
.search-box { position: relative; flex: 1; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; display: flex; align-items: center; }
.search-box input { width: 100%; padding: 10px 10px 10px 40px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; background: white; outline: none; box-sizing: border-box; }
.search-box input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
.search-box input::placeholder { color: #9ca3af; }

/* Action Group */
.action-group { display: flex; gap: 12px; }
.btn-filter { padding: 10px 16px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #374151; font-weight: 500; transition: all 0.2s; }
.btn-filter:hover { background: #f9fafb; border-color: #d1d5db; }
.btn-primary { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.btn-primary:hover { background: #1d4ed8; }

/* Programs Grid */
.programs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

/* Program Card */
.program-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; flex-direction: column; border-left: 4px solid #e5e7eb; transition: transform 0.2s; position: relative; }
.program-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.card-bg-icon { position: absolute; right: -20px; bottom: -20px; width: 140px; height: 140px; opacity: 0.05; pointer-events: none; z-index: 0; }

/* CATEGORY COLORS */
.program-card.social-service { border-left-color: #3b82f6; }
.program-card.social-service .category-badge { background: #eff6ff; color: #1d4ed8; }
.program-card.social-service .status-dot { background: #3b82f6; }
.program-card.pension { border-left-color: #ec4899; }
.program-card.pension .category-badge { background: #fdf2f8; color: #be185d; }
.program-card.pension .status-dot { background: #ec4899; }
.program-card.livelihood { border-left-color: #22c55e; }
.program-card.livelihood .category-badge { background: #f0fdf4; color: #15803d; }
.program-card.livelihood .status-dot { background: #22c55e; }
.program-card.emergency { border-left-color: #f97316; }
.program-card.emergency .category-badge { background: #fff7ed; color: #c2410c; }
.program-card.emergency .status-dot { background: #f97316; }
.program-card.resource { border-left-color: #6366f1; }
.program-card.resource .category-badge { background: #eef2ff; color: #4338ca; }
.program-card.resource .status-dot { background: #6366f1; }

.card-header { padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; position: relative; z-index: 1; }
.category-badge { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.btn-menu { background: none; border: none; cursor: pointer; color: #9ca3af; padding: 4px; display: flex; align-items: center; transition: color 0.2s; }
.btn-menu:hover { color: #1a1a1a; }

.card-body { padding: 16px; flex: 1; position: relative; z-index: 1; }
.program-title { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.program-title h3 { font-size: 18px; font-weight: 600; margin: 0; color: #1a1a1a; }
.program-description { font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0 0 16px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.program-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.stat-item { display: flex; flex-direction: column; }
.stat-label { font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 500; margin-bottom: 4px; }
.stat-value { font-size: 16px; font-weight: 600; color: #1a1a1a; }

.card-footer { padding: 12px 16px; border-top: 1px solid #f3f4f6; display: flex; gap: 8px; position: relative; z-index: 1; background: rgba(255,255,255,0.8); }
.btn-configure { flex: 1; padding: 8px 16px; background: white; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; color: #374151; font-weight: 500; transition: all 0.2s; }
.btn-configure:hover { background: #f9fafb; border-color: #d1d5db; }
.btn-delete { width: 36px; padding: 0; background: white; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #ef4444; transition: all 0.2s; }
.btn-delete:hover { background: #fef2f2; border-color: #fecaca; }

/* New Program Card */
.program-card.new-program { background: #f9fafb; border: 2px dashed #d1d5db; border-left: 2px dashed #d1d5db; display: flex; align-items: center; justify-content: center; box-shadow: none; }
.program-card.new-program:hover { border-color: #2563eb; background: #eff6ff; }
.new-program-content { text-align: center; padding: 40px 20px; }
.plus-icon { width: 64px; height: 64px; background: white; border: 1px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #6b7280; margin: 0 auto 16px; }
.new-program-content h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px 0; }
.new-program-content p { font-size: 13px; color: #6b7280; margin: 0 0 20px 0; line-height: 1.5; }
.btn-create-secondary { padding: 8px 20px; background: white; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
.btn-create-secondary:hover { background: #2563eb; color: white; }

/* Responsive */
@media (max-width: 1024px) { .programs-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { 
  .programs-grid { grid-template-columns: 1fr; }
  .filters-bar { flex-direction: column; align-items: stretch; }
  .action-group { flex-direction: column; }
  .btn-filter, .btn-primary { justify-content: center; }
}
</style>