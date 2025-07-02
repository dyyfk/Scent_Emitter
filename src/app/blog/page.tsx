'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Blog() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      console.log('Email subscribed:', email)
    }
  }

  const blogPosts = [
    {
      title: "The Future of Immersive Entertainment",
      excerpt: "How scent synchronization is revolutionizing the way we experience movies, games, and content.",
      date: "March 15, 2025",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      title: "Behind the Scenes: Building Scent Emitter",
      excerpt: "A deep dive into the engineering challenges and breakthroughs that made our device possible.",
      date: "March 10, 2025",
      readTime: "8 min read",
      category: "Engineering"
    },
    {
      title: "The Science of Scent and Memory",
      excerpt: "Exploring how olfactory experiences enhance our emotional connection to entertainment.",
      date: "March 5, 2025",
      readTime: "6 min read",
      category: "Science"
    },
    {
      title: "Gaming in a New Dimension",
      excerpt: "How professional gamers are using scent technology to gain competitive advantages.",
      date: "February 28, 2025",
      readTime: "4 min read",
      category: "Gaming"
    },
    {
      title: "Content Creators Embrace Multi-Sensory Experiences",
      excerpt: "YouTubers and streamers are discovering new ways to engage their audiences.",
      date: "February 20, 2025",
      readTime: "7 min read",
      category: "Content Creation"
    },
    {
      title: "The Psychology of Immersive Entertainment",
      excerpt: "Understanding how multi-sensory experiences affect our brain and emotions.",
      date: "February 15, 2025",
      readTime: "9 min read",
      category: "Psychology"
    }
  ]

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
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
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
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1
            className="text-5xl lg:text-6xl font-bold mb-6"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: 1 - scrollY * 0.002
            }}
          >
            Scent Emitter <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: 1 - scrollY * 0.0015
            }}
          >
            Insights, updates, and stories from the forefront of immersive entertainment technology.
          </p>

          {!isSubscribed ? (
            <form
              onSubmit={handleSubscribe}
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
                placeholder="Subscribe to our newsletter"
                required
                className="flex-1 px-6 py-4 bg-gray-50/10 border border-gray-200/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-gray-50/20 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div
              className="max-w-md mx-auto"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                opacity: 1 - scrollY * 0.001
              }}
            >
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold">Subscribed!</p>
                  <p className="text-sm text-gray-300">You'll receive our latest updates.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black/50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <article
                key={i}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                style={{
                  transform: `translateY(${Math.max(0, scrollY - 600 + i * 100) * 0.2}px)`,
                  opacity: Math.min(1, Math.max(0, scrollY - 600 + i * 100) * 0.001)
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-xs font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h2>

                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {post.date}
                    </span>
                    <div className="flex items-center space-x-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      <span className="text-sm font-medium">Read more</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-12 shadow-2xl">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{
                transform: `translateY(${Math.max(0, scrollY - 1200) * 0.3}px)`,
                opacity: Math.min(1, Math.max(0, scrollY - 1200) * 0.002)
              }}
            >
              Stay Updated
            </h2>
            <p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              style={{
                transform: `translateY(${Math.max(0, scrollY - 1200) * 0.2}px)`,
                opacity: Math.min(1, Math.max(0, scrollY - 1200) * 0.0015)
              }}
            >
              Get the latest insights on immersive entertainment technology and exclusive updates about Scent Emitter.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              style={{
                transform: `translateY(${Math.max(0, scrollY - 1200) * 0.1}px)`,
                opacity: Math.min(1, Math.max(0, scrollY - 1200) * 0.001)
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-gray-50/10 border border-gray-200/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-gray-50/20 transition-all duration-300"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40">
                Subscribe
              </button>
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