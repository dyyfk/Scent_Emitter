'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={isVisible ? 'section-reveal-in' : 'section-reveal-hidden'}>{children}</div>;
}

function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadein">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validateName(name: string) {
    return name.trim().length > 0;
  }

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWaitlistError('');
    setWaitlistSuccess(false);
    if (!validateName(waitlistName)) {
      setWaitlistError('Please enter your name.');
      return;
    }
    if (!validateEmail(waitlistEmail)) {
      setWaitlistError('Please enter a valid email address.');
      return;
    }
    setWaitlistLoading(true);
    try {
      const res = await fetch('/api/collect-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: waitlistName, email: waitlistEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setWaitlistSuccess(true);
        setWaitlistName('');
        setWaitlistEmail('');
      } else {
        setWaitlistError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setWaitlistError('Something went wrong.');
    } finally {
      setWaitlistLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#181c2f] to-[#1a2340] text-white overflow-x-hidden">
      <div id="bg-blob1" className="bg-blob"></div>
      <div id="bg-blob2" className="bg-blob"></div>
      <div id="bg-blob3" className="bg-blob"></div>
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
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            onClick={() => setModalOpen(true)}
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* Waitlist Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setWaitlistError(''); setWaitlistSuccess(false); }}>
        <h2 className="text-2xl font-bold mb-4 text-center">Join the Waitlist</h2>
        <form onSubmit={handleWaitlistSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50/10 border border-gray-200/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-gray-50/20 transition-all duration-300"
              placeholder="Your name"
              value={waitlistName}
              onChange={e => setWaitlistName(e.target.value)}
              disabled={waitlistLoading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-50/10 border border-gray-200/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-gray-50/20 transition-all duration-300"
              placeholder="Your email address"
              value={waitlistEmail}
              onChange={e => setWaitlistEmail(e.target.value)}
              disabled={waitlistLoading}
              required
            />
          </div>
          {waitlistError && <div className="text-red-400 animate-fadein-slideup">{waitlistError}</div>}
          {waitlistSuccess && <div className="text-green-400 animate-fadein-slideup">Thank you, {waitlistName || 'friend'}! You'll be the first to know.</div>}
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            disabled={waitlistLoading || !validateEmail(waitlistEmail) || !validateName(waitlistName)}
            style={{ opacity: waitlistLoading || !validateEmail(waitlistEmail) || !validateName(waitlistName) ? 0.6 : 1 }}
          >
            {waitlistLoading ? 'Sending...' : 'Join Waitlist'}
          </button>
        </form>
      </Modal>

      {/* Hero Section */}
      <SectionReveal>
        <section className="relative min-h-screen flex items-center px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1
                    className="font-sans text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fadein-slideup"
                  >
                    Experience Intimacy, Not Just Entertainment
                  </h1>
                  <p
                    className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed animate-fadein-slideup"
                    style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                  >
                    Scent Emitter brings you closer—releasing evocative scents in perfect harmony with your favorite moments, deepening every connection, memory, and emotion.
                  </p>
                </div>
              </div>
              {/* Image */}
              <div
                className="relative lg:block animate-fadein-slideup"
                style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
              >
                <div className="relative w-full h-[500px] lg:h-[600px] group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Image
                    src="/hero-model.png"
                    alt="Scent device illustration"
                    fill
                    className="object-contain group-hover:scale-105 transition-all duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* The AI Powered Section */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-16">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">The AI-Powered Intimacy Engine</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                  Let our intelligent system curate scents that amplify every emotion—so you can relive, share, and savor the moments that matter most.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { title: "Daily Recap", description: "Wake up to a gentle recap of yesterday's shared moments—personalized scent memories and new experiences to explore together.", icon: "⚡" },
                  { title: "Never Lose Flow", description: "Stay present. Scent Emitter synchronizes seamlessly, so you can lose yourself in the moment, not the controls.", icon: "🎯" },
                  { title: "Atmosphere That Speaks", description: "Let your space tell your story. Scent Emitter quietly shares the mood, so every guest feels the atmosphere.", icon: "🔄" }
                ].map((feature, i) => (
                  <div key={i} className="text-center space-y-4 group cursor-pointer animate-fadein-slideup" style={{ animationDelay: `${0.3 + i * 0.1}s`, animationFillMode: 'both' }}>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                  </div>
                ))}
              </div>
              <div className="relative w-full max-w-4xl mx-auto animate-fadein-slideup" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-semibold">AI</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Scent Assistant</h3>
                        <p className="text-sm text-gray-400">Today's Experience Summary</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50 group-hover/item:scale-150 transition-transform duration-300"></div>
                        <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">Watched cooking show with herb aromas</span>
                      </div>
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50 group-hover/item:scale-150 transition-transform duration-300"></div>
                        <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">Gaming session with forest scents</span>
                      </div>
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50 group-hover/item:scale-150 transition-transform duration-300"></div>
                        <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">Movie night with ocean breeze</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Works Where You Code */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-16">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">Intimacy, everywhere</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                  Scent Emitter works with your favorite platforms, so every movie night, game, or playlist becomes a shared experience.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {['Netflix', 'YouTube', 'Twitch', 'Steam', 'PS5', 'Xbox'].map((platform, i) => (
                  <div key={i} className="flex flex-col items-center space-y-3 group cursor-pointer animate-fadein-slideup" style={{ animationDelay: `${0.3 + i * 0.07}s`, animationFillMode: 'both' }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 flex items-center justify-center shadow-lg hover:border-blue-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/25">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📺</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors duration-300">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Run Entertainment on Autopilot */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">Let go and be present</h2>
                  <p className="text-xl text-gray-300 animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                    Scent Emitter's AI curates and synchronizes scents, so you can focus on connection, not setup.
                  </p>
                </div>
                <div className="space-y-6">
                  {[
                    { title: "Save Time Daily", description: "Wake up to a gentle recap of yesterday's shared moments—personalized scent memories and new experiences to explore together." },
                    { title: "Focus on Connection", description: "Spend less time on setup and more time enjoying presence and intimacy." },
                    { title: "Works Anywhere", description: "Perfect for home theater, gaming setup, or mobile viewing—stay immersed and connected wherever you are." }
                  ].map((feature, i) => (
                    <div key={i} className="flex space-x-4 group cursor-pointer animate-fadein-slideup" style={{ animationDelay: `${0.3 + i * 0.1}s`, animationFillMode: 'both' }}>
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-blue-500/25 group-hover:scale-125 transition-transform duration-300">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative animate-fadein-slideup" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-semibold">AI</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Scent Assistant</h3>
                      <p className="text-sm text-gray-400">9:45 AM</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">I've prepared your scent experience for today's content:</p>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">• Forest scene: Pine and earth scents</div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">• Cooking show: Herbs and spices</div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">• Action movie: Smoke and metal</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-lg shadow-lg shadow-blue-500/25 hover:scale-105 transition-all duration-300">Looks Good</button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-600 hover:scale-105 transition-all duration-300">Tweak</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Mobile App Integration */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">Intimacy at your fingertips</h2>
                  <p className="text-xl text-gray-300 animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                    Adjust, personalize, and revisit your favorite scent moments, all from your phone.
                  </p>
                </div>
              </div>
              <div className="relative animate-fadein-slideup" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-semibold">📱</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Scent Control</h3>
                      <p className="text-sm text-gray-400">Mobile App</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Current Session: Horror Movie</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Active Scents: Eerie, Mist, Wood</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Intensity: 75%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Sync with Schedule */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">Make every moment special</h2>
                <p className="text-xl text-gray-300 animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                  Scent Emitter syncs with your calendar, so anniversaries, movie nights, and quiet evenings are always unforgettable.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group animate-fadein-slideup" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2 group/item">
                    <div className="text-sm font-medium text-gray-400 group-hover/item:text-blue-400 transition-colors duration-300">Mon</div>
                    <div className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">Movie Night</div>
                  </div>
                  <div className="space-y-2 group/item">
                    <div className="text-sm font-medium text-gray-400 group-hover/item:text-blue-400 transition-colors duration-300">Tue</div>
                    <div className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">Gaming</div>
                  </div>
                  <div className="space-y-2 group/item">
                    <div className="text-sm font-medium text-gray-400 group-hover/item:text-blue-400 transition-colors duration-300">Wed</div>
                    <div className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">Cooking Show</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Experience Insights */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">Discover what moves you</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                  Scent Emitter learns your preferences, helping you create more meaningful, memorable experiences.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Content Classification",
                    description: "AI automatically categorizes scents into genres, moods, and themes for perfect matching."
                  },
                  {
                    title: "Preference Detection",
                    description: "Track your favorite scents, content types, and experience patterns for personalized recommendations."
                  },
                  {
                    title: "Privacy First",
                    description: "You control what to share—private content, family visibility, you decide."
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 space-y-4 shadow-2xl hover:border-blue-500/50 transition-all duration-300 group cursor-pointer animate-fadein-slideup"
                    style={{ animationDelay: `${0.3 + i * 0.1}s`, animationFillMode: 'both' }}
                  >
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                  </div>
                ))}
              </div>
              <div
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group animate-fadein-slideup"
                style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-semibold">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Scent Assistant</h3>
                    <p className="text-sm text-gray-400">2:15 PM</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Potential enhancement detected: Multiple users enjoyed forest scents during nature content</p>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-lg shadow-lg shadow-blue-500/25 hover:scale-105 transition-all duration-300">Create Discussion</button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-600 hover:scale-105 transition-all duration-300">View Context</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Know What's Happening */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">Stay connected, always</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                  Whether you're together or apart, Scent Emitter bridges the distance—making every moment feel close.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div
                  className="text-center space-y-4 group cursor-pointer animate-fadein-slideup"
                  style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                >
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">For Viewers</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    See daily recaps of your entertainment experiences and scent preferences—so you can track and share moments effortlessly.
                  </p>
                </div>
                <div
                  className="text-center space-y-4 group cursor-pointer animate-fadein-slideup"
                  style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                >
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">For Gamers</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Immerse yourself in virtual worlds with synchronized scents that enhance your gaming experience.
                  </p>
                </div>
                <div
                  className="text-center space-y-4 group cursor-pointer animate-fadein-slideup"
                  style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
                >
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">For Content Creators</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Create scent-enabled content that engages your audience on a whole new sensory level.
                  </p>
                </div>
              </div>
              <div
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group animate-fadein-slideup"
                style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-semibold">ME</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">My Daily Recap</h3>
                    <p className="text-sm text-gray-400">Since last session</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">• Watched nature documentary with forest scents</div>
                  <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">• Gaming session with ocean breeze effects</div>
                  <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">• Cooking show with herb aromas</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* The Future Section */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-16">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">The future of intimacy is immersive</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                  Scent Emitter transforms every space into a sanctuary of connection, memory, and emotion.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Stay immersed",
                    description: "Stay immersed across all your devices and platforms."
                  },
                  {
                    title: "Track experiences",
                    description: "Gain visibility into your entertainment patterns and preferences."
                  },
                  {
                    title: "Automate setup",
                    description: "Move faster with automatic scent synchronization."
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="text-center space-y-4 group cursor-pointer animate-fadein-slideup"
                    style={{ animationDelay: `${0.3 + i * 0.1}s`, animationFillMode: 'both' }}
                  >
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 group-hover:scale-105 transition-transform duration-300">{feature.title}</h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA Section */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold animate-fadein-slideup">Feel Closer, Instantly</h2>
            <p className="text-xl text-gray-300 animate-fadein-slideup" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
              Bring intimacy, presence, and emotion to every moment—join the Scent Emitter journey.
            </p>
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 animate-fadein-slideup"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              Be First to Feel the Future
            </button>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-center mb-16 animate-fadein-slideup">FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How long do the scent cartridges last?",
                  answer: "Each cartridge is designed to last through many shared experiences—typically 30-40 hours of active use. Scent Emitter will gently remind you when it's time to refresh, so your moments are never interrupted."
                },
                {
                  question: "Is it safe to use indoors?",
                  answer: "Absolutely. Our scents are crafted from natural, hypoallergenic ingredients, safe for any home. Scent Emitter is designed for comfort, safety, and peace of mind—so you can focus on connection."
                },
                {
                  question: "What content is compatible with the device?",
                  answer: "Scent Emitter works with a growing library of scent-enabled content and is always expanding. Whether it's a movie night, a playlist, or a special occasion, we help you create unforgettable shared experiences."
                },
                {
                  question: "How does the synchronization work?",
                  answer: "Scent Emitter connects seamlessly to your devices and content. Our intelligent system reads special cues to release the perfect scent at the perfect moment—so you can be fully present."
                }
              ].map((faq, i) => (
                <button
                  key={i}
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 transition-all hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/10 group animate-fadein-slideup"
                  style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'both' }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors duration-300">{faq.question}</h3>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className={`text-gray-400 transition-transform duration-300 group-hover:text-blue-400 ${openFaqIndex === i ? 'rotate-180' : ''}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-48 mt-4' : 'max-h-0'}`}
                  >
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{faq.answer}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12">
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