import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from './ui/sheet'

const navLinks = [
  { label: 'Rooms', href: '/rooms' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const user = getStoredUser()

  const handleBookingClick = () => {
    navigate('/booking')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const [menuOpen, setMenuOpen] = useState(false)


  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-[#30251f]/90 text-white shadow-sm backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-bold tracking-tight text-[#f7e7c6]">
          Veloura Hotel
        </a>

        {/* Show full navigation from medium screens up; use the sheet on mobile. */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm font-medium text-white/75 transition hover:text-[#f7e7c6]"
            >
              {link.label}
            </a>
          ))}

          <Button variant="outline" size="sm" onClick={handleBookingClick}>
            Book now
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Open user menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="User avatar" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>

                <span className="hidden text-sm font-medium text-white sm:inline">
                  {user.name}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-50 mt-4 w-40 rounded-md border border-slate-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      localStorage.removeItem('user')
                      setMenuOpen(false)
                      navigate('/login')
                    }}
                    className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="hidden border-white/30 text-white hover:bg-white/10 sm:inline-flex"
              onClick={handleLoginClick}
            >
             Login
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                ☰
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full sm:max-w-sm">
              <div className="mt-6 flex flex-col text-center gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="text-base font-medium text-slate-700 hover:text-slate-900"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}

                {user ? (
                  <span className="mb-4 text-lg text-slate-600 hidden sm:block">
                    {user.name}
                  </span>
                ) : (
                <Button variant="ghost" className="mt-2 w-full" onClick={handleLoginClick}>
                  Log in
                </Button>
                )}
                <Button className="w-full" onClick={handleBookingClick}>Book now</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
