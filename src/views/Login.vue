<template>
  <div class="login-container">
    <div class="main-card">
      <div class="header">
        <div class="logo">
          <img :src="mswdoLogo" alt="MSWDO Logo" class="logo-img" />
          <img :src="initaoLogo" alt="Initao Logo" class="logo-img" />
        </div>
        <h1 class="title">MSWDO-Initao AMS</h1>
        <p class="subtitle">The Assistance Management System for the Municipal Social Welfare and Development Office of Initao, Misamis Oriental</p>
      </div>

      <div class="login-form">
        <h2 class="form-title">Login</h2>
        
        <form @submit.prevent="login" class="form-box">
          <div class="input-group">
            <input 
              v-model="username" 
              type="text"
              placeholder="Username" 
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <div class="password-wrapper">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password" 
                class="input-field"
                required
              />
              <button 
                type="button"
                @click.stop="showPassword = !showPassword"
                class="toggle-password"
              >
                <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="keepLoggedIn" />
              <span>Keep me logged-in</span>
            </label>
            <a href="#" @click.prevent class="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" class="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>

    <div class="demo-card">
      <h3 class="demo-title">Dummy Users (Click to autofill)</h3>
      <div class="credentials-grid">
        <button 
          v-for="(cred, index) in demoCredentials" 
          :key="index" 
          class="cred-item"
          @click="autoFill(cred.user, cred.pass)"
        >
          <span class="cred-role">{{ cred.label }}</span>
          <div class="cred-details">
            <span>User: {{ cred.user }}</span>
            <span>Pass: {{ cred.pass }}</span>
          </div>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import initaoLogo from '../assets/initao-logo.png'
import mswdoLogo from '../assets/mswdo-logo.png'

const router = useRouter()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(false)

// -- NEW: Data for the display --
const demoCredentials = [
  { label: 'Admin', user: 'admin', pass: 'admin123' },
  { label: 'Staff', user: 'staff', pass: 'staff123' },
  { label: 'AICS Focal', user: 'aicsfocalperson', pass: 'aicsfocalperson123' },
  { label: 'OIC', user: 'officerincharge', pass: 'officerincharge123' },
  { label: 'SC Focal', user: 'scfocalperson', pass: 'scfocalperson123' },
  { label: 'SLP Focal', user: 'slpfocalperson', pass: 'slpfocalperson123' }
]

// -- NEW: Helper function to autofill --
const autoFill = (u, p) => {
  username.value = u
  password.value = p
}

const login = () => {
  console.log('Login function called')
  
  if (username.value === 'admin' && password.value === 'admin123') {
    const userData = { username: 'admin', role: 'admin' }
    localStorage.setItem('user', JSON.stringify(userData))
    if (keepLoggedIn.value) localStorage.setItem('keepLoggedIn', 'true')
    router.push('/admin/dashboard')
  } 
  else if (username.value === 'staff' && password.value === 'staff123') {
    const userData = { username: 'staff', role: 'staff' }
    localStorage.setItem('user', JSON.stringify(userData))
    if (keepLoggedIn.value) localStorage.setItem('keepLoggedIn', 'true')
    router.push('/staff/dashboard') 
  } 
  else if (username.value === 'aicsfocalperson' && password.value === 'aicsfocalperson123') {
    const userData = { username: 'aicsfocalperson', role: 'aicsfocalperson' }
    localStorage.setItem('user', JSON.stringify(userData))
    if (keepLoggedIn.value) localStorage.setItem('keepLoggedIn', 'true')
    router.push('/aicsfocalperson/dashboard') 
  } 
  else if (username.value === 'officerincharge' && password.value === 'officerincharge123') {
    const userData = { username: 'officerincharge', role: 'officerincharge' }
    localStorage.setItem('user', JSON.stringify(userData))
    if (keepLoggedIn.value) localStorage.setItem('keepLoggedIn', 'true')
    router.push('/officerincharge/dashboard') 
  } 
  else if (username.value === 'scfocalperson' && password.value === 'scfocalperson123') {
    const userData = { username: 'scfocalperson', role: 'scfocalperson' }
    localStorage.setItem('user', JSON.stringify(userData))
    if (keepLoggedIn.value) localStorage.setItem('keepLoggedIn', 'true')
    router.push('/scfocalperson/dashboard') 
  } 
  else if (username.value === 'slpfocalperson' && password.value === 'slpfocalperson123') {
    const userData = { username: 'slpfocalperson', role: 'slpfocalperson' }
    localStorage.setItem('user', JSON.stringify(userData))
    if (keepLoggedIn.value) localStorage.setItem('keepLoggedIn', 'true')
    router.push('/slpfocalperson/dashboard') 
  } 
  else {
    console.log('Invalid credentials')
    alert('Invalid credentials')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 20px;
  gap: 20px; /* Added gap between main card and demo card */
}

.main-card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 30px 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.logo {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.logo-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.title {
  font-size: 22px;
  font-weight: bold;
  color: #000;
  margin: 8px 0;
  letter-spacing: -0.3px;
}

.subtitle {
  font-size: 11px;
  color: #666;
  margin: 6px 0;
  line-height: 1.5;
  padding: 0 5px;
}

.login-form {
  background: transparent;
}

.form-title {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 12px;
}

.form-box {
  background: rgba(233, 213, 218, 0.5);
  padding: 22px 20px;
  border-radius: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.input-group {
  margin-bottom: 14px;
}

.password-wrapper {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-radius: 20px;
  font-size: 0.85rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.input-field::placeholder {
  color: #999;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: #666;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.8rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #333;
}

.checkbox-label input[type="checkbox"] {
  cursor: pointer;
}

.forgot-link {
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #000;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 11px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.login-button:hover {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.login-button:active {
  transform: translateY(1px);
}

/* -- NEW STYLES FOR DEMO SECTION -- */
.demo-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px dashed #ccc;
}

.demo-title {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 0;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.credentials-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.cred-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.cred-item:hover {
  background: #eff6ff;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.cred-role {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.cred-details {
  font-size: 10px;
  color: #666;
  display: flex;
  flex-direction: column;
  font-family: monospace;
}

@media (max-width: 600px) {
  .main-card {
    padding: 25px 22px;
  }
  .credentials-grid {
    grid-template-columns: 1fr; /* Stack vertically on mobile */
  }
  .logo-img {
    width: 55px;
    height: 55px;
  }
  .title {
    font-size: 20px;
  }
  .subtitle {
    font-size: 10px;
  }
  .form-box {
    padding: 20px 18px;
  }
}
</style>