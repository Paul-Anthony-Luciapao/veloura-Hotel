import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { createBooking, fetchServices } from '../lib/api'

const BookingForm = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  })
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices({
      startDate: form.startDate,
      endDate: form.endDate,
    })
      .then((availableServices) => {
        setServices(availableServices)
        setForm((current) => {
          const selectedService = availableServices.find(
            (service) => String(service.id) === current.serviceId,
          )

          return selectedService && selectedService.available_rooms === 0
            ? { ...current, serviceId: '' }
            : current
        })
      })
      .catch((error) => alert(error.message))
  }, [form.startDate, form.endDate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await createBooking({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service_id: Number(form.serviceId),
        start_date: form.startDate,
        end_date: form.endDate,
        start_time: form.startTime,
        end_time: form.endTime,
      })
      alert('Booking request submitted successfully!')
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="hero-rise rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
          <h1 className="hero-rise-delay-1 mt-3 text-3xl font-bold tracking-tight">Book your room</h1>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Number</label>
              <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Your phone number" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Room type</label>
              <select
                name="serviceId"
                value={form.serviceId}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Choose a room type</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id} disabled={service.available_rooms === 0}>
                    {service.name}
                    {service.available_rooms === 0
                      ? ' - Fully booked'
                      : service.available_rooms
                        ? ` - ${service.available_rooms} available`
                        : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Start date</label>
                <Input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">End date</label>
                <Input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Start time</label>
                <Input name="startTime" type="time" value={form.startTime} onChange={handleChange} required />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">End time</label>
                <Input name="endTime" type="time" value={form.endTime} onChange={handleChange} required />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full">Submit booking</Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default BookingForm
