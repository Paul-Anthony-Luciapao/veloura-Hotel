import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { loginUser } from '../lib/api'
import { Input } from '../components/ui/input'


const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const result = await loginUser(form)

      localStorage.setItem('token', result.data.token)
      localStorage.setItem('user', JSON.stringify(result.data.user))

      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-md px-6 py-20">
        <div className="hero-rise rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
          <p className="hero-rise text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
          <h1 className="hero-rise hero-rise-delay-1 mt-3 text-3xl font-bold tracking-tight">Log in to your account</h1>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" className="w-full">Log in</Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Do not have an account?{' '}
            <Link to="/register" className="font-medium text-slate-900 underline underline-offset-4">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
