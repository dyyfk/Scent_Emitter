import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111827] flex flex-col overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-10 py-6 z-10 bg-[#111827] w-full">
        <div className="font-semibold tracking-widest text-gray-100 text-lg flex items-center gap-2">
          {/* Logo or Brand */}
          <span className="font-bold text-xl">SCENT EMITTER</span>
        </div>
        <div className="flex gap-8 text-gray-300 font-medium">
          <a href="#" className="hover:text-white transition">FEATURES</a>
          <a href="#" className="hover:text-white transition">PRODUCTS</a>
          <a href="#" className="hover:text-white transition">ABOUT</a>
        </div>
        <div className="flex gap-6 text-gray-300 font-medium items-center">
          <a href="#" className="hover:text-white transition">SUPPORT</a>
          <a href="#" className="hover:text-white transition">SIGN IN</a>
          <button className="ml-2">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-300">
              <path d="M6 6h15l-1.5 9h-13z" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /></svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Content Container - Moved before image for better z-indexing */}
        <div className="relative z-20 h-full flex items-center">
          <div className="absolute left-[5%] w-full max-w-[400px] md:max-w-[500px]">
            <h1 className="text-5xl md:text-6xl font-serif font-semibold text-white mb-8 leading-tight">
              Experience Videos Like Never Before
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Add a new dimension to your content with synchronized scents. Transform your viewing experience from watching to feeling.
            </p>
            <button className="bg-[#1a2235]/80 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded shadow hover:bg-[#1a2235] transition-all border border-gray-700">
              GET STARTED
            </button>
          </div>
        </div>

        {/* Image Container with Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-screen">
          <div className="absolute right-0 w-[85%] h-full">
            {/* Left gradient */}
            <div className="absolute inset-0 z-10"
              style={{ background: 'linear-gradient(to left, transparent 60%, rgba(17, 24, 39, 0.2) 75%, #111827 85%)' }} />
            {/* Top gradient */}
            <div className="absolute inset-0 z-10"
              style={{ background: 'linear-gradient(to top, transparent 85%, rgba(17, 24, 39, 0.2) 92%, #111827 98%)' }} />
            {/* Bottom gradient */}
            <div className="absolute inset-0 z-10"
              style={{ background: 'linear-gradient(to bottom, transparent 85%, rgba(17, 24, 39, 0.2) 92%, #111827 98%)' }} />
            <div className="relative w-full h-full">
              <Image
                src="/hero-model.png"
                alt="Model using scent device"
                fill
                priority
                className="object-contain object-right"
                sizes="85vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-xs tracking-widest text-[#7dd3fc] mb-2 uppercase">Features</span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4 text-center">Immersive Scent Technology</h2>
          <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl">
            Discover the key features that make our scent emitter the future of immersive entertainment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden mb-4 bg-[#1a2235] flex items-center justify-center">
                <span className="text-4xl">🎥</span>
              </div>
              <span className="text-sm font-medium text-gray-200 text-center">PERFECT SYNC</span>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden mb-4 bg-[#1a2235] flex items-center justify-center">
                <span className="text-4xl">🌸</span>
              </div>
              <span className="text-sm font-medium text-gray-200 text-center">NATURAL SCENTS</span>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden mb-4 bg-[#1a2235] flex items-center justify-center">
                <span className="text-4xl">⚡</span>
              </div>
              <span className="text-sm font-medium text-gray-200 text-center">INSTANT RESPONSE</span>
            </div>
            {/* Feature 4 */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden mb-4 bg-[#1a2235] flex items-center justify-center">
                <span className="text-4xl">🎮</span>
              </div>
              <span className="text-sm font-medium text-gray-200 text-center">EASY CONTROL</span>
            </div>
          </div>
          <button className="mt-12 bg-[#1a2235] text-white font-semibold py-3 px-8 rounded shadow hover:bg-[#1a2235]/80 transition-all border border-gray-700">
            LEARN MORE
          </button>
        </div>
      </section>
    </main>
  )
} 