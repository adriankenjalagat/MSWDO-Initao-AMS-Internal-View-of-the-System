<template>
  <div class="reports-module">
    <div class="header">
      <div>
        <h1>Reports Module</h1>
        <p class="subtitle">Generate and download various reports</p>
      </div>
    </div>

    <div class="generate-report-card">
      <h2>Generate Report</h2>
      
      <div class="form-grid">
        <div class="form-group">
          <label>Report Type <span class="required">*</span></label>
          <select v-model="reportForm.reportType" class="form-select">
            <option value="">Select Report Type</option>
            <option value="beneficiary">Beneficiary List Report</option>
            <option value="assistance">Assistance Summary Report</option>
            <option value="barangay">Barangay Reports</option>
            <option value="monthly">Monthly Accomplishment Report</option>
            <option value="client">Client Profile Report</option>
            <option value="relief">Relief Operations Report</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div class="form-group">
          <label>Program Filter</label>
          <select v-model="reportForm.programFilter" class="form-select">
            <option value="">All Programs</option>
            <option value="aics">AICS</option>
            <option value="social pension">Social Pension</option>
            <option value="SLP">SLP</option>
            <option value="relief">Relief Operations</option>
            <option value="donations">Donations</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div class="form-group">
          <label>Date From <span class="required">*</span></label>
          <input 
            type="text" 
            v-model="reportForm.dateFrom" 
            placeholder="mm/dd/yyyy"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>Date To <span class="required">*</span></label>
          <input 
            type="text" 
            v-model="reportForm.dateTo" 
            placeholder="mm/dd/yyyy"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>Barangay Filter</label>
          <select v-model="reportForm.barangayFilter" class="form-select">
            <option value="">All Barangays</option>
            <option value="poblacion">Poblacion</option>
            <option value="san-jose">Andales</option>
            <option value="lumbocan">Apas</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div class="form-group">
          <label>Output Format</label>
          <select v-model="reportForm.outputFormat" class="form-select">
            <option value="pdf">PDF Document</option>
            <option value="excel">Excel Spreadsheet</option>
            <option value="csv">CSV File</option>
          </select>
        </div>
      </div>

      <div class="action-buttons">
        <button class="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m2 0H7m0 0v8h10v-8m-5-5V4H5v16h14V4h-6v3z"/>
          </svg>
          Generate Report
        </button>
        <button class="btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9V3h12v6M6 15h12v6H6v-6z"/>
          </svg>
          Print Preview
        </button>
      </div>
    </div>

    <div class="templates-section">
      <h2>Report Templates</h2>
      
      <div class="templates-grid">
        <div 
          v-for="template in reportTemplates" 
          :key="template.id"
          class="template-card"
        >
          <div class="template-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="template-content">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-reports-section">
      <h2>Recently Generated Reports</h2>
      
      <div class="reports-list">
        <div 
          v-for="report in recentReports" 
          :key="report.id"
          class="report-item"
        >
          <div class="report-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="report-info">
            <h3>{{ report.title }}</h3>
            <p>Generated by {{ report.generatedBy }} on {{ report.generatedDate }}</p>
          </div>
          <div class="report-actions">
            <span class="format-badge">{{ report.format }}</span>
            <button class="btn-download" title="Download">
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="statistics-section">
      <h2>Report Statistics</h2>
      
      <div class="stats-grid">
        <div class="stat-card blue">
          <h3>Reports Generated</h3>
          <p class="stat-value">245</p>
          <p class="stat-label">This month</p>
        </div>

        <div class="stat-card green">
          <h3>Total Beneficiaries</h3>
          <p class="stat-value">3,891</p>
          <p class="stat-label">Across all programs</p>
        </div>

        <div class="stat-card purple">
          <h3>Total Assistance</h3>
          <p class="stat-value">₱2.5M</p>
          <p class="stat-label">This year</p>
        </div>

        <div class="stat-card yellow">
          <h3>Active Programs</h3>
          <p class="stat-value">8</p>
          <p class="stat-label">Currently running</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportsModule',
  data() {
    return {
      reportForm: {
        reportType: '',
        programFilter: '',
        dateFrom: '',
        dateTo: '',
        barangayFilter: '',
        outputFormat: 'pdf'
      },
      reportTemplates: [
        {
          id: 1,
          name: 'Beneficiary List Report',
          description: 'Complete list of beneficiaries by program'
        },
        {
          id: 2,
          name: 'Assistance Summary Report',
          description: 'Summary of assistance provided by type and amount'
        },
        {
          id: 3,
          name: 'Barangay Report',
          description: 'Assistance distribution per barangay'
        },
        {
          id: 4,
          name: 'Monthly Accomplishment Report',
          description: 'Monthly summary of all programs and activities'
        },
        {
          id: 5,
          name: 'Client Profile Report',
          description: 'Detailed client information and assistance history'
        },
        {
          id: 6,
          name: 'Relief Operations Report',
          description: 'Summary of relief operations and distributions'
        }
      ],
      recentReports: [
        {
          id: 1,
          title: 'AICS Monthly Report - December 2024',
          generatedBy: 'Ben Calif',
          generatedDate: '2024-12-22 10:30 AM',
          format: 'PDF'
        },
        {
          id: 2,
          title: 'Beneficiary List - Poblacion',
          generatedBy: 'Adrian Ken',
          generatedDate: '2024-12-21 03:45 PM',
          format: 'Excel'
        },
        {
          id: 3,
          title: 'Relief Operations Summary - Q4 2024',
          generatedBy: 'Zendie Lou',
          generatedDate: '2024-12-20 09:15 AM',
          format: 'PDF'
        }
      ]
    }
  }
}
</script>

<style scoped>
.reports-module {
  padding: 9px;
  background: #f5f5f5;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  margin-bottom: 24px;
}

h1 {
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1a1a1a;
  font-family: outfit;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1a1a1a;
}

/* Generate Report Card */
.generate-report-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-select,
.form-input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #1a1a1a;
  background: white;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.form-input::placeholder {
  color: #9ca3af;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
}

/* Report Templates Section */
.templates-section {
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.template-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.template-card:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.template-icon {
  width: 48px;
  height: 48px;
  background: #eff6ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* Removed font-size as we are using SVG now */
}

/* SVG Styling */
.svg-blue {
  width: 24px;
  height: 24px;
  color: #2563eb;
}

.svg-gray {
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.svg-dark {
  width: 18px;
  height: 18px;
  color: #374151;
}

.template-content h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.template-content p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

/* Recently Generated Reports Section */
.recent-reports-section {
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.reports-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.report-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.report-icon {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.report-info {
  flex: 1;
}

.report-info h3 {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.report-info p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.report-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.format-badge {
  padding: 4px 12px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.btn-download {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-download:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

/* Statistics Section */
.statistics-section {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  padding: 20px;
  border-radius: 8px;
}

.stat-card.blue {
  background: #eff6ff;
}

.stat-card.green {
  background: #f0fdf4;
}

.stat-card.purple {
  background: #faf5ff;
}

.stat-card.yellow {
  background: #fefce8;
}

.stat-card h3 {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 12px 0;
}

.stat-card.blue h3 {
  color: #1e40af;
}

.stat-card.green h3 {
  color: #15803d;
}

.stat-card.purple h3 {
  color: #7e22ce;
}

.stat-card.yellow h3 {
  color: #a16207;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.stat-card.blue .stat-value {
  color: #1e40af;
}

.stat-card.green .stat-value {
  color: #15803d;
}

.stat-card.purple .stat-value {
  color: #7e22ce;
}

.stat-card.yellow .stat-value {
  color: #a16207;
}

.stat-label {
  font-size: 13px;
  margin: 0;
}

.stat-card.blue .stat-label {
  color: #1e40af;
}

.stat-card.green .stat-label {
  color: #15803d;
}

.stat-card.purple .stat-label {
  color: #7e22ce;
}

.stat-card.yellow .stat-label {
  color: #a16207;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>