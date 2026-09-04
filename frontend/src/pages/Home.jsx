import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { fetchServices } from '../lib/api'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
      } catch (error) {
        console.error('Failed to load services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const handleBookNow = () => {
    navigate('/booking')
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-slate-900">
      <Navbar />

      <section className="hero-wallpaper flex min-h-[calc(100vh-73px)] items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="max-w-xl text-white">
          <p className="hero-rise mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#f7e7c6]">
            Your stay, simplified
          </p>
          <h1 className="hero-rise hero-rise-delay-1 text-5xl font-bold tracking-tight md:text-6xl">
            Book a space that feels like home.
          </h1>
          <p className="hero-rise hero-rise-delay-1 mt-5 text-lg leading-8 text-white/80">
            Discover comfortable rooms, flexible stays, and seamless booking for work or travel.
          </p>

          <div className="hero-rise hero-rise-delay-2 mt-8 flex flex-wrap gap-4">
            <Button onClick={handleBookNow}>Book now</Button>
            <Button variant="outline" className="border-white/50 bg-white/10 text-white hover:bg-white hover:text-slate-900" onClick={handleBookNow}>Explore rooms</Button>
          </div>

          </div>
        </div>

      </section>
    </main>
  )
}

export default Home
