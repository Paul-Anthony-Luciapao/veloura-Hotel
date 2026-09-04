import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import About from './pages/About'
import Contact from './pages/Contact'
import BookingForm from './pages/BookingForm'
import Login from './pages/Login'
import Register from './pages/Register'

// This is the main frontend router.
// At the moment, it only renders the UI pages and does not yet call the Laravel API.
// If the backend is connected later, each page can fetch data from endpoints like /api/services.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
