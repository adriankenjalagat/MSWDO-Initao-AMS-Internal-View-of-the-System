<template>
  <div class="aics-application-page">
    <section class="page-header">
      <h1>AICS Application</h1>
      <p>View and assess AICS applications for clients or beneficiaries.</p>
    </section>

    <section class="page-body">
      <div class="card">
        <div class="card-header">
          <h2>AICS Applications List</h2>
          <p>Only AICS applications are shown here so the focal person can assess each entry.</p>
        </div>

        <div class="table-wrapper">
          <table class="applications-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Applicant</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="application in applications" :key="application.id">
                <td>{{ application.appId }}</td>
                <td>{{ application.name }}<span class="role">{{ application.role }}</span></td>
                <td>{{ application.programType }}</td>
                <td>{{ formatAmount(application.amount) }}</td>
                <td>{{ application.dateApplied }}</td>
                <td>
                  <span class="status-badge" :class="application.status.toLowerCase()">{{ application.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const applications = ref([
  { id: 1, appId: 'AICS-001', name: 'Maria Santos', role: 'Beneficiary', programType: 'Medical Assistance', amount: 4500, dateApplied: 'May 18, 2026', status: 'Pending' },
  { id: 2, appId: 'AICS-002', name: 'Juan Dela Cruz', role: 'Client', programType: 'Burial Assistance', amount: 8000, dateApplied: 'May 16, 2026', status: 'Approved' },
  { id: 3, appId: 'AICS-003', name: 'Elena Reyes', role: 'Beneficiary', programType: 'Transportation Aid', amount: 2500, dateApplied: 'May 14, 2026', status: 'Pending' },
  { id: 4, appId: 'AICS-004', name: 'Ricardo Dalisay', role: 'Client', programType: 'Medical Assistance', amount: 6300, dateApplied: 'May 12, 2026', status: 'Rejected' },
  { id: 5, appId: 'AICS-005', name: 'Ana Bautista', role: 'Beneficiary', programType: 'Food Assistance', amount: 3200, dateApplied: 'May 10, 2026', status: 'Approved' }
])

const formatAmount = value => {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value)
}
</script>

<style scoped>
.aics-application-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header h1 {
  font-size: 28px;
  margin: 0 0 8px;
}

.page-header p {
  color: #4b5563;
  margin: 0;
}

.card {
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
}

.card-header h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.card-header p {
  margin: 0 0 20px;
  color: #4b5563;
}

.table-wrapper {
  overflow-x: auto;
}

.applications-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.applications-table th,
.applications-table td {
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.applications-table th {
  background: #f8fafc;
  color: #374151;
  font-size: 13px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.applications-table tbody tr:hover {
  background: #f3f4f6;
}

.role {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.approved {
  background: #dcfce7;
  color: #166534;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #991b1b;
}
</style>
