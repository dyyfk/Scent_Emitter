"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyPage({ params }: { params: { token: string } }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [message, setMessage] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`/api/verify/${params.token}`);
        const data = await res.json();
        if (data.success && data.message === 'Already verified.') {
          setStatus('already');
          setMessage('Thanks for verifying your email. We\'ll let you know as soon as we\'re ready to onboard you.');
        } else if (data.success) {
          setStatus('success');
          setMessage('Thanks for verifying your email. We\'ll let you know as soon as we\'re ready to onboard you.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Verification failed.');
      }
    }
    verify();
  }, [params.token]);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#181c2f] to-[#1a2340] text-white overflow-x-hidden">
      {/* Decorative blobs for background */}
      <div id="bg-blob1" className="bg-blob"></div>
      <div id="bg-blob2" className="bg-blob"></div>
      <div id="bg-blob3" className="bg-blob"></div>
      {/* Sticky Header */}
      <header className="sticky top-0 z-[100] px-6 lg:px-8 py-6 border-b border-gray-800 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-md transition-all duration-300">
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
            className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 ${isSticky ? 'ring-2 ring-blue-400 scale-105 shadow-blue-400/40 animate-pulse' : ''}`}
            onClick={() => router.push("/#waitlist")}
          >
            Join Waitlist
          </button>
        </div>
      </header>
      {/* Confirmation Card Container */}
      <div className="flex-grow flex flex-col items-center justify-center py-12">
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl text-center">
          {(status === 'success' || status === 'already') && (
            <div className="flex items-center justify-center mb-8">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#101820" />
                <circle cx="40" cy="40" r="36" fill="#101820" stroke="#22c55e" strokeWidth="4" />
                <path d="M26 43L37 54L56 30" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center justify-center mb-8">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#101820" />
                <circle cx="40" cy="40" r="36" fill="#101820" stroke="#ef4444" strokeWidth="4" />
                <path d="M30 30L50 50M50 30L30 50" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
          )}
          {(status === 'success' || status === 'already') && (
            <>
              <div className="text-2xl font-bold mb-4">You&apos;re on the waitlist!</div>
              <div className="mb-8 text-lg text-gray-300">{message}</div>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="text-2xl font-bold mb-4 text-red-400">Verification failed</div>
              <div className="mb-8 text-lg text-gray-300">{message}</div>
            </>
          )}
          <button
            className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg"
            onClick={() => router.push('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
} 