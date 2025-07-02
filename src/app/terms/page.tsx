'use client'
import Link from 'next/link'

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 lg:px-8 py-6 border-b border-gray-800 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
              <span className="text-white font-bold text-lg">SE</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
              Scent Emitter
            </div>
          </Link>
          <Link href="/" className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold">
              Terms of <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Use</span>
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: March 15, 2025
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Scent Emitter's website, products, and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Scent Emitter provides immersive entertainment technology that synchronizes scents with video content and gaming experiences. Our service includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Hardware devices for scent emission</li>
                <li>Software applications for content synchronization</li>
                <li>Scent cartridge refills and accessories</li>
                <li>Online platform and mobile applications</li>
                <li>Customer support and technical assistance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As a user of Scent Emitter services, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Use the device in accordance with provided instructions</li>
                <li>Maintain the device in good working condition</li>
                <li>Use only authorized scent cartridges</li>
                <li>Ensure proper ventilation when using the device</li>
                <li>Not modify or tamper with the device hardware</li>
                <li>Respect intellectual property rights of content creators</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Safety and Health</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Scent Emitter devices are designed with safety in mind, but users should:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Use in well-ventilated areas</li>
                <li>Discontinue use if experiencing adverse reactions</li>
                <li>Keep out of reach of children and pets</li>
                <li>Consult healthcare providers if you have respiratory conditions</li>
                <li>Follow all safety warnings and instructions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Privacy and Data</h2>
              <p className="text-gray-300 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of information as outlined in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                All content, features, and functionality of Scent Emitter services, including but not limited to text, graphics, logos, and software, are owned by Scent Emitter Inc. and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                Scent Emitter Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Warranty and Support</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Scent Emitter devices come with a limited warranty covering defects in materials and workmanship. Our warranty does not cover:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Damage from misuse or accidents</li>
                <li>Unauthorized modifications</li>
                <li>Normal wear and tear</li>
                <li>Third-party accessories</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms of Use. Upon termination, your right to use the service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website. Your continued use of the service after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-300">
                  <strong>Email:</strong> legal@scentemitter.com<br />
                  <strong>Address:</strong> Scent Emitter Inc.<br />
                  123 Innovation Drive<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/waitlist" className="hover:text-white transition-colors">Waitlist</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
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