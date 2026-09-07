// Central API helper for frontend requests to the Laravel backend.
// In local development, Vite proxies /api requests to the backend server.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function fetchServices({ startDate = '', endDate = '' } = {}) {
  const params = new URLSearchParams()

  if (startDate && endDate) {
    params.set('start_date', startDate)
    params.set('end_date', endDate)
  }

  const query = params.toString()
  const response = await fetch(`${API_BASE_URL}/services${query ? `?${query}` : ''}`)

  if (!response.ok) {
    throw new Error('Failed to load services from the backend.')
  }

  const payload = await response.json()
  return payload.data ?? []
}

export async function loginUser(payload) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const result = await response.json()

  if(!response.ok) {
    throw new Error(result.message || 'Login failed')
  }

  return result
}

export async function registerUser(payload) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed.')
  }

  return result
}

export async function createBooking(payload) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify(payload),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Booking failed.')
  }

  return result
}
