import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="hero-rise text-4xl font-bold tracking-tight">Let&apos;s plan your next stay.</h1>
        <div className="mt-10 grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-lg leading-8 text-slate-600">
              Have a question about a room, your dates, or the booking process? Send us a message and our team
              will get back to you.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <p><strong className="text-slate-900">Email:</strong> veloura@gmail.com</p>
              <p><strong className="text-slate-900">Phone:</strong> +1 (555) 014-2080</p>
              <p><strong className="text-slate-900">Hours:</strong> 24/7</p>
            </div>
          </div>

          <form className="hero-rise hero-rise-delay-1 space-y-5 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <Input name="name" placeholder="Your full name" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                name="message"
                className="min-h-32 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                placeholder="How can we help?"
                required
              />
            </div>
            <Button type="submit" className="w-full">Send message</Button>
            {submitted && <p className="text-sm text-emerald-600" role="status">Thanks! We&apos;ll be in touch soon.</p>}
          </form>
        </div>
      </section>
    </main>
  )
}

export default Contact
