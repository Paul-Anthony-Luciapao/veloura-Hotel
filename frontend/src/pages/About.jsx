import Navbar from '../components/Navbar'

const About = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f0] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="hero-rise mb-4 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          About us
        </p>
        <h1 className="hero-rise hero-rise-delay-1 text-4xl font-bold tracking-tight">A better way to stay.</h1>
        <p className="hero-rise hero-rise-delay-1 mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Veloura Hotel makes it simple to find a comfortable place and book it without the usual back and forth.
          Every stay is selected for thoughtful design, practical amenities, and a smooth guest experience.
        </p>

        <div className="hero-rise hero-rise-delay-2 mt-14 grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold">Comfort first</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Spaces designed for restful nights, productive mornings, and everything in between.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Simple booking</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Choose your dates, share your details, and leave the complicated steps behind.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Human support</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Our team is here to answer questions and help make your stay feel easy from start to finish.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
