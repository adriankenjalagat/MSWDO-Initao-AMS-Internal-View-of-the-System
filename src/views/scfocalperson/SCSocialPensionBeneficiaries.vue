<template>
  <div class="social-pension-page">
    <section class="page-header">
      <h1>Social Pension Beneficiaries</h1>
      <p>Listahan ng mga benepisyaryo ng social pension para sa senior citizen focal person.</p>
    </section>

    <section class="page-body">
      <div class="table-card">
        <table class="beneficiaries-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Barangay</th>
              <th>Status</th>
              <th>Date Enrolled</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="beneficiary in beneficiaries" :key="beneficiary.id">
              <td>{{ beneficiary.beneficiaryId }}</td>
              <td>{{ beneficiary.name }}</td>
              <td>{{ beneficiary.age }}</td>
              <td>{{ beneficiary.barangay }}</td>
              <td>
                <span class="status-badge" :class="beneficiary.status.toLowerCase()">{{ beneficiary.status }}</span>
              </td>
              <td>{{ beneficiary.dateEnrolled }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const beneficiaries = ref([
  { id: 1, beneficiaryId: 'SPB-001', name: 'Lola Maria dela Cruz', age: 72, barangay: 'Poblacion', status: 'Active', dateEnrolled: 'Jan 10, 2026' },
  { id: 2, beneficiaryId: 'SPB-002', name: 'Lolo Pedro Santos', age: 78, barangay: 'Sapang', status: 'Active', dateEnrolled: 'Feb 4, 2026' },
  { id: 3, beneficiaryId: 'SPB-003', name: 'Lola Ester Reyes', age: 80, barangay: 'Gining', status: 'Inactive', dateEnrolled: 'Mar 22, 2026' },
  { id: 4, beneficiaryId: 'SPB-004', name: 'Lolo Oscar Pabillo', age: 75, barangay: 'San Miguel', status: 'Active', dateEnrolled: 'Apr 6, 2026' }
])
</script>

<style scoped>
.social-pension-page {
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

.table-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
  padding: 24px;
  overflow-x: auto;
}

.beneficiaries-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.beneficiaries-table th,
.beneficiaries-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.beneficiaries-table th {
  background: #f8fafc;
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.beneficiaries-table tbody tr:hover {
  background: #f3f4f6;
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

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #991b1b;
}
</style>
