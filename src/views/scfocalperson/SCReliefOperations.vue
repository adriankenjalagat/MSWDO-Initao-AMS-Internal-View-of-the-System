<template>
  <div class="relief-operations">
    <div class="header">
      <h1 class="page-title">Relief Operations</h1>
      <button class="create-btn" @click="showCreateModal = true">
        <span class="btn-icon">+</span>
        Create Relief Operation
      </button>
    </div>
    
    <div class="search-filter-bar">
      <div class="search-box">
        <span class="search-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search operation name, location or ID..."
          class="search-input"
        />
      </div>
      <button class="filters-btn">
        <span class="filter-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.6 1.6 0 0 0-1.82-.33 1.6 1.6 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.6 1.6 0 0 0-1-1.51 1.6 1.6 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.6 1.6 0 0 0 .33-1.82 1.6 1.6 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.6 1.6 0 0 0 1.51-1 1.6 1.6 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.6 1.6 0 0 0 1.82.33H9a1.6 1.6 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.6 1.6 0 0 0 1 1.51 1.6 1.6 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.6 1.6 0 0 0-.33 1.82V9c0 .66.39 1.26 1 1.51.3.13.62.2.95.2H21a2 2 0 1 1 0 4h-.09c-.33 0-.65.07-.95.2z"/></svg>
        </span>
        Filters
      </button>
    </div>
    
    <div class="operations-section">
      <div class="section-header">
        <h2 class="section-title">
          Planned Operations
          <span class="count-badge">{{ filteredPlanned.length }}</span>
        </h2>
      </div>
      
      <div class="operations-list">
        <div 
          v-for="operation in filteredPlanned" 
          :key="operation.id"
          class="operation-card"
        >
          <div class="operation-icon" :style="{ backgroundColor: operation.iconBg }">
            <svg v-if="operation.type === 'fire'" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2c2 4-1 6-1 8a3 3 0 006 0c0-3-2-5-5-8z"/>
              <path d="M8 14a4 4 0 108 0c0-2-2-3-4-6-2 3-4 4-4 6z"/>
            </svg>

            <svg v-else-if="operation.type === 'earthquake'" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18"/><path d="M21 3v18"/><path d="M9 3l-2 6 4 6-2 6"/><path d="M15 3l-2 6 4 6-2 6"/>
            </svg>

             <svg v-else viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M9.879 11.879a3 3 0 104.242 0"/>
            </svg>
          </div>
          
          <div class="operation-content">
            <h3 class="operation-title">{{ operation.name }}</h3>
            <div class="operation-details">
              <span class="detail-item">
                <span class="detail-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                {{ operation.location }}
              </span>
              <span class="detail-item">
                <span class="detail-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
                {{ operation.date }}
              </span>
              <span class="detail-item">
                <span class="detail-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M17 11a4 4 0 1 0-4-4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M17 21v-2a4 4 0 0 0-3-3.87"/></svg></span>
                {{ operation.target }}
              </span>
            </div>
          </div>
          
          <div class="operation-actions">
            <span class="status-badge" :class="operation.status.toLowerCase().replace(' ', '-')">
              {{ operation.status }}
            </span>
            <button class="more-btn">⋯</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="operations-section">
      <div class="section-header">
        <h2 class="section-title">
          Completed Operations
          <span class="count-badge">{{ filteredCompleted.length }}</span>
        </h2>
      </div>
      
      <div class="operations-list">
        <div 
          v-for="operation in filteredCompleted" 
          :key="operation.id" 
          class="operation-card completed"
        >
          <div class="operation-icon gray">
            <span class="checkmark">✓</span>
          </div>
          
          <div class="operation-content">
            <h3 class="operation-title">{{ operation.name }}</h3>
            <div class="operation-details">
              <span class="detail-item">
                <span class="detail-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                {{ operation.location }}
              </span>
              <span class="detail-item">
                <span class="detail-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
                {{ operation.date }}
              </span>
            </div>
          </div>
          
          <div class="operation-progress">
            <div class="progress-text">{{ operation.progressText }}</div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: operation.progress + '%' }"></div>
            </div>
          </div>
          
          <div class="operation-actions">
            <span class="status-badge completed">{{ operation.status }}</span>
            <button class="document-btn" title="View Document">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="showCreateModal" title="Create Relief Operation" @close="showCreateModal = false">
      <CreateReliefOperation @cancel="showCreateModal = false" @done="handleCreateOperation" />
    </Modal>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../../components/Modal.vue'
import CreateReliefOperation from '../../components/CreateReliefOperation.vue'

// --- State ---
const showCreateModal = ref(false)
const searchQuery = ref('')

const plannedOperations = ref([
  {
    id: 1,
    name: 'Brgy. Poblacion Fire Response',
    location: 'Poblacion, Initao, Mis. Or.',
    date: 'Nov 12, 2023 • 08:00 AM',
    target: '250 Families Target',
    status: 'Scheduled',
    type: 'fire',
    iconBg: '#e3f2fd'
  },
  {
    id: 2,
    name: 'Barangay Apas Earthquake Response',
    location: 'Apas Barangay Hall',
    date: 'Nov 15, 2023 • 09:00 AM',
    target: '600 Students',
    status: 'Planning Phase',
    type: 'earthquake',
    iconBg: '#f3e5f5'
  }
])

const completedOperations = ref([
  {
    id: 101,
    name: 'Typhoon Karding Relief Ops',
    location: 'Purok 2, Tubigan, Initao, Mis. Or.',
    date: 'Oct 05, 2023',
    progress: 100,
    progressText: '1,200 / 1,200 Kits Distributed',
    status: 'Completed'
  },
  {
    id: 102,
    name: 'Ramirez Residency Fire Incident',
    location: 'Purok 3, Andales, Intao, Mis. Or.',
    date: 'Sep 20, 2023',
    progress: 90,
    progressText: '1 Family Assisted',
    status: 'Completed'
  },
  {
    id: 103,
    name: 'Food Pack Distribution Phase 2',
    location: 'Initao Gymnasium',
    date: 'Sep 15, 2023',
    progress: 100,
    progressText: '800 / 800 Packs Distributed',
    status: 'Completed'
  }
])

// --- Methods ---

const formatDate = (dateString) => {
  // Input: "2024-01-05T08:30" -> Output: "Jan 05, 2024 • 08:30 AM"
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  
  return `${date.toLocaleDateString('en-US', options)} • ${date.toLocaleTimeString('en-US', timeOptions)}`;
}

const getIconColor = (type) => {
  if (type === 'fire') return '#e3f2fd' // Blue
  if (type === 'earthquake') return '#f3e5f5' // Purple
  return '#e0f7fa' // Default Cyan
}

const handleCreateOperation = (formData) => {
  const newOperation = {
    id: Date.now(),
    name: formData.name,
    location: formData.location,
    date: formatDate(formData.date),
    target: formData.target,
    status: formData.status,
    type: formData.type,
    iconBg: getIconColor(formData.type)
  }
  
  // Add to top of list
  plannedOperations.value.unshift(newOperation)
  showCreateModal.value = false
}

// --- Computed ---
const filteredPlanned = computed(() => {
  if (!searchQuery.value) return plannedOperations.value
  const query = searchQuery.value.toLowerCase()
  return plannedOperations.value.filter(op => 
    op.name.toLowerCase().includes(query) || 
    op.location.toLowerCase().includes(query)
  )
})

const filteredCompleted = computed(() => {
  if (!searchQuery.value) return completedOperations.value
  const query = searchQuery.value.toLowerCase()
  return completedOperations.value.filter(op => 
    op.name.toLowerCase().includes(query) || 
    op.location.toLowerCase().includes(query)
  )
})

</script>

<style scoped>
* { box-sizing: border-box; }
.relief-operations { padding: 24px; background-color: #f5f7fa; min-height: 100vh; margin-left: -30px; margin-right: -30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; margin-top: -10px; }
.page-title { font-size: 28px; font-weight: 600; margin: 0; color: #1a1a1a; font-family: outfit; font-size: 30px; }
.create-btn { padding: 10px 20px; background: #4c6ef5; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: flex-end; gap: 8px; transition: all 0.2s; position: absolute; right: 0; top: 120px; }
.create-btn:hover { background: #3b5bdb; }
.btn-icon { font-size: 18px; }
.search-filter-bar { display: flex; gap: 12px; margin-bottom: 32px; }
.search-box { display: flex; align-items: center; background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 10px 16px; flex: 1; max-width: 500px; }
.search-icon { margin-right: 8px; opacity: 0.5; }
.search-input { border: none; outline: none; font-size: 14px; width: 100%; }
.filters-btn { padding: 10px 20px; background: white; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
.filters-btn:hover { background: #f5f5f5; }
.filter-icon { font-size: 16px; }
.operations-section { margin-bottom: 32px; }
.section-header { margin-bottom: 16px; }
.section-title { font-size: 18px; font-weight: 600; color: #1a1a1a; display: flex; align-items: center; gap: 8px; margin: 0; }
.count-badge { background: #e0e0e0; color: #666; font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 12px; }
.operations-list { display: flex; flex-direction: column; gap: 12px; }
.operation-card { background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); transition: all 0.2s; }
.operation-card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.operation-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
.operation-icon.gray { background: #f0f0f0; }
.checkmark { font-size: 20px; color: #666; }
.operation-content { flex: 1; min-width: 0; }
.operation-title { font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px 0; }
.operation-details { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: #666; }
.detail-item { display: flex; align-items: center; gap: 6px; }
.detail-icon { font-size: 14px; }
.operation-progress { display: flex; flex-direction: column; gap: 8px; min-width: 200px; }
.progress-text { font-size: 13px; font-weight: 500; color: #333; text-align: right; }
.progress-bar-container { width: 100%; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.progress-bar { height: 100%; background: #0d7738; border-radius: 3px; transition: width 0.3s ease; }
.operation-actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.status-badge { padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 500; white-space: nowrap; }
.status-badge.scheduled { background: #e3f2fd; color: #1565c0; }
.status-badge.planning-phase { background: #f3e5f5; color: #6a1b9a; }
.status-badge.completed { background: #e8f5e9; color: #2e7d32; }
.more-btn, .document-btn { background: none; border: none; cursor: pointer; font-size: 20px; padding: 4px 8px; opacity: 0.6; transition: opacity 0.2s; }
.more-btn:hover, .document-btn:hover { opacity: 1; }
.document-btn { font-size: 18px; }
@media (max-width: 1024px) { .operation-card { flex-wrap: wrap; } .operation-progress { width: 100%; order: 3; } .progress-text { text-align: left; } }
@media (max-width: 768px) { .header { flex-direction: column; align-items: flex-start; gap: 16px; } .create-btn { width: 100%; justify-content: center; position: static; margin-top: 10px; } .search-filter-bar { flex-direction: column; } .search-box { max-width: 100%; } .filters-btn { width: 100%; justify-content: center; } .operation-card { padding: 16px; } .operation-details { flex-direction: column; gap: 8px; } .operation-actions { width: 100%; justify-content: space-between; order: 4; } }
</style>