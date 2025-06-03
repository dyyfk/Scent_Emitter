'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-4 md:px-8 lg:px-16 py-8 md:py-12 space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto relative min-h-[60vh] md:min-h-[80vh] flex items-center">
        {/* Content */}
        <div className="relative z-20 w-full max-w-xl">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E6DDD4] leading-tight">
              Let Videos<br />
              Bring You<br />
              Scent
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-md">
              A portable device that releases scents synchronized with video playback, taking your viewing and gaming experiences to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:flex-1 px-4 py-3 bg-[#141414]/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6A95F]"
              />
              <button className="w-full sm:w-auto px-6 py-3 bg-[#E6A95F] text-gray-900 font-semibold rounded-lg hover:bg-[#E6A95F]/90 transition-colors">
                Get Early Access
              </button>
            </div>
          </div>
        </div>

        {/* Desktop and tablet image with gradients */}
        <div className="absolute inset-0 -right-1/6 overflow-hidden hidden sm:block">
          <div className="absolute right-0 w-[100%] h-full">
            {/* Left gradient */}
            <div className="absolute inset-0 z-10"
              style={{ background: 'linear-gradient(to left, transparent 30%, rgba(10, 10, 10, 0.4) 70%, #0A0A0A 85%)' }}
            />
            {/* Top gradient */}
            <div className="absolute inset-0 z-10"
              style={{ background: 'linear-gradient(to top, transparent 70%, rgba(10, 10, 10, 0.2) 85%, #0A0A0A 95%)' }}
            />
            {/* Bottom gradient */}
            <div className="absolute inset-0 z-10"
              style={{ background: 'linear-gradient(to bottom, transparent 70%, rgba(10, 10, 10, 0.2) 85%, #0A0A0A 95%)' }}
            />
            <div className="relative w-full h-full scale-125">
              <Image
                src={`${process.env.NODE_ENV === 'production' ? '/Scent_Emitter' : ''}/hero-model.png`}
                alt="Scent device illustration"
                fill
                className="object-contain object-right"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* Mobile image */}
        <div className="absolute inset-0 sm:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-10" />
          <div className="relative w-full h-full">
            <Image
              src={`${process.env.NODE_ENV === 'production' ? '/Scent_Emitter' : ''}/hero-model.png`}
              alt="Scent device illustration"
              fill
              className="object-cover object-center opacity-60"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: 'Real-time Scent Sync', icon: '⚡' },
            { title: 'Multiple Replaceable Aroma Cartridges', icon: '🔄' },
            { title: 'App/PC Control', icon: '📱' },
            { title: 'Portable Wearable/ Desktop Use', icon: '🎮' }
          ].map((feature, i) => (
            <div key={i} className="p-4 md:p-6 bg-[#141414]/30 rounded-lg border border-gray-800 hover:border-[#E6A95F] transition-colors">
              <span className="text-3xl md:text-4xl mb-3 md:mb-4 block">{feature.icon}</span>
              <h3 className="text-base md:text-lg font-semibold text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Setup Steps */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12">Simple Setup in Three Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { step: '1', title: 'Place device near screen', icon: '📺' },
            { step: '2', title: 'Play a scent-enabled video', icon: '▶️' },
            { step: '3', title: 'Experience synchronized scents', icon: '✨' }
          ].map((step, i) => (
            <div key={i} className="p-4 md:p-6 bg-[#141414]/30 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-[#E6A95F] text-gray-900 font-bold text-sm md:text-base">
                  {step.step}
                </span>
                <span className="text-xl md:text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white">{step.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Scenarios */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12">Imagine These Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: 'Cooking Stream',
              description: 'Small ingredients and dishes as they are being cooked',
              icon: '🍳'
            },
            {
              title: 'Horror Movie',
              description: 'Feel enveloped by an eerie-sinister aroma',
              icon: '👻'
            },
            {
              title: 'Gaming Environment',
              description: 'Immerse in different virtual worlds with scents',
              icon: '🎮'
            }
          ].map((scenario, i) => (
            <div key={i} className="p-4 md:p-6 bg-[#141414]/30 rounded-lg border border-gray-800">
              <span className="text-3xl md:text-4xl mb-3 md:mb-4 block">{scenario.icon}</span>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">{scenario.title}</h3>
              <p className="text-sm md:text-base text-gray-400">{scenario.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-2">
          {[
            {
              question: "How long do the scent cartridges last?",
              answer: "Each cartridge typically lasts for 30-40 hours of active use. The app will notify you when it's time to replace a cartridge."
            },
            {
              question: "Is it safe to use indoors?",
              answer: "Yes, all our scents are made from natural, hypoallergenic ingredients that are safe for indoor use. The device includes built-in safety features for controlled dispersion."
            },
            {
              question: "What content is compatible with the device?",
              answer: "Our device works with specially encoded videos from our partner platforms. We're continuously expanding our library and working with content creators to bring more scent-enabled experiences."
            },
            {
              question: "How does the synchronization work?",
              answer: "The device connects to your computer or mobile device via Bluetooth. Our software reads special timestamps in compatible content to release the right scents at the perfect moment."
            }
          ].map((faq, i) => (
            <button
              key={i}
              onClick={() => toggleFaq(i)}
              className="w-full text-left"
            >
              <div className="p-4 md:p-6 bg-[#0F1218] rounded-lg border border-gray-800 transition-all hover:border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-medium text-gray-200">{faq.question}</h3>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={`text-gray-400 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`}
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
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-48 mt-4' : 'max-h-0'
                    }`}
                >
                  <p className="text-sm md:text-base text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
} 