import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { registerUser } from '../lib/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await registerUser(form)
      alert('Registration successful!')
      navigate('/login')
    } catch (registrationError) {
      setError(registrationError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-md px-6 py-20">
        <div className="hero-rise rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
          <p className="hero-rise text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Get started</p>
          <h1 className="hero-rise hero-rise-delay-1 mt-3 text-3xl font-bold tracking-tight">Create your account</h1>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a password" minLength={8} required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
              <Input name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} placeholder="Repeat your password" required />
            </div>

            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-slate-900 underline underline-offset-4">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Register
