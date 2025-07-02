'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 lg:px-8 py-6 border-b border-gray-800 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">SE</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
              Scent Emitter
            </div>
          </Link>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40">
            Join Waitlist
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY * 0.001
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
          <div className="space-y-8">
            <h1
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                opacity: 1 - scrollY * 0.002
              }}
            >
              Join the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Future</span> of Entertainment
            </h1>
            <p
              className="text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
                opacity: 1 - scrollY * 0.0015
              }}
            >
              Be among the first to experience immersive scent synchronization. Get early access to the most innovative entertainment technology.
            </p>

            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                  opacity: 1 - scrollY * 0.001
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-6 py-4 bg-gray-50/10 border border-gray-200/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-gray-50/20 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div
                className="max-w-md mx-auto space-y-6"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                  opacity: 1 - scrollY * 0.001
                }}
              >
                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
                    <p className="text-gray-300">We'll notify you as soon as Scent Emitter is ready. Get ready for the future of entertainment.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black/50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-16">
            <div className="space-y-6">
              <h2
                className="text-4xl lg:text-5xl font-bold"
                style={{
                  transform: `translateY(${Math.max(0, scrollY - 800) * 0.3}px)`,
                  opacity: Math.min(1, Math.max(0, scrollY - 800) * 0.002)
                }}
              >
                Why Join the Waitlist?
              </h2>
              <p
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                style={{
                  transform: `translateY(${Math.max(0, scrollY - 800) * 0.2}px)`,
                  opacity: Math.min(1, Math.max(0, scrollY - 800) * 0.0015)
                }}
              >
                Be part of the revolution in entertainment technology. Early access means exclusive benefits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Early Access",
                  description: "Be among the first to experience scent synchronization technology.",
                  icon: "🚀"
                },
                {
                  title: "Exclusive Pricing",
                  description: "Special launch pricing and limited-time offers for waitlist members.",
                  icon: "💰"
                },
                {
                  title: "Beta Testing",
                  description: "Help shape the future by testing new features before anyone else.",
                  icon: "🔬"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="text-center space-y-4 group cursor-pointer"
                  style={{
                    transform: `translateY(${Math.max(0, scrollY - 1000 + i * 200) * 0.2}px)`,
                    opacity: Math.min(1, Math.max(0, scrollY - 1000 + i * 200) * 0.001)
                  }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors duration-300 hover:scale-105">Home</Link>
              <Link href="/waitlist" className="hover:text-white transition-colors duration-300 hover:scale-105">Waitlist</Link>
              <Link href="/blog" className="hover:text-white transition-colors duration-300 hover:scale-105">Blog</Link>
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors duration-300 hover:scale-105">Terms of Use</Link>
              <Link href="/privacy" className="hover:text-white transition-colors duration-300 hover:scale-105">Privacy Policy</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2025 Scent Emitter Inc. All rights reserved
          </div>
        </div>
      </footer>
    </main>
  )
} 