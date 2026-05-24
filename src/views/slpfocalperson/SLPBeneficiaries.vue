<template>
  <div class="slp-beneficiaries-page">
    <section class="page-header">
      <h1>SLP Beneficiaries</h1>
      <p>Listahan ng mga beneficiaries para sa SLP focal person.</p>
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
              <td>{{ beneficiary.idNumber }}</td>
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
  { id: 1, idNumber: 'SLP-001', name: 'Aling Nena Marquez', age: 66, barangay: 'Poblacion', status: 'Active', dateEnrolled: 'Jan 05, 2026' },
  { id: 2, idNumber: 'SLP-002', name: 'Mang Rodolfo Cruz', age: 70, barangay: 'San Roque', status: 'Active', dateEnrolled: 'Feb 12, 2026' },
  { id: 3, idNumber: 'SLP-003', name: 'Lola Genoveva Santos', age: 74, barangay: 'Tabok', status: 'Inactive', dateEnrolled: 'Mar 14, 2026' },
  { id: 4, idNumber: 'SLP-004', name: 'Lolo Nestor Padu', age: 69, barangay: 'Calinginan', status: 'Active', dateEnrolled: 'Apr 20, 2026' }
])
</script>

<style scoped>
.slp-beneficiaries-page {
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
