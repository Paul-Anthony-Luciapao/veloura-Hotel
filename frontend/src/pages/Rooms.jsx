import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { rooms } from '../data/room'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

const Rooms = () => {
  const navigate = useNavigate()
  const [selectedRoom, setSelectedRoom] = useState('All')
  const roomCategories = ['All', 'Standard', 'Premium']

  const filteredRooms =
    selectedRoom === 'All'
      ? rooms
      : rooms.filter((room) => room.type === selectedRoom)

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="hero-rise mb-4 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Choose your stay
        </p>
        <h1 className="hero-rise hero-rise-delay-1 text-4xl font-bold tracking-tight">Rooms that fit every trip.</h1>

        <div className="hero-rise hero-rise-delay-2 mt-8 flex justify-end">
          <label className="sr-only" htmlFor="room-category">
            Choose a room category
          </label>
          <select
            id="room-category"
            value={selectedRoom}
            onChange={(event) => setSelectedRoom(event.target.value)}
            className="h-10 rounded-4xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
          >
            {roomCategories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All rooms' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="hero-rise hero-rise-delay-2 mt-10 grid gap-6 md:grid-cols-2">
          {filteredRooms.map((room) => (
            <Card key={room.name} className="overflow-hidden bg-white shadow-sm">
              <img
                src={room.src}
                alt={`${room.name} hotel interior`}
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover"
              />

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{room.name}</CardTitle>
                  <span className="text-sm font-medium text-slate-600">{room.price}</span>
                </div>
                <span className="mt-2 inline-flex w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700">
                  {room.type}
                </span>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-sm leading-6 text-slate-600">
                  {room.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  type="button"
                  className="w-full"
                  aria-label={`Book ${room.name}`}
                  onClick={() => navigate('/booking')}
                >
                  Book now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Rooms
