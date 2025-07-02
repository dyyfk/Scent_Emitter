import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage({ params }: { params: { token: string } }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`/api/verify/${params.token}`);
        const data = await res.json();
        if (data.success && data.message === 'Already verified.') {
          setStatus('already');
          setMessage('Your email is already verified.');
        } else if (data.success) {
          setStatus('success');
          setMessage('Your email has been verified! Thank you for joining the Scent Emitter waitlist.');
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1c] via-[#181c2f] to-[#1a2340] text-white">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        {status === 'loading' && <div className="text-lg font-semibold">Verifying...</div>}
        {status === 'success' && <div className="text-green-400 text-xl font-bold mb-2">Success!</div>}
        {status === 'already' && <div className="text-blue-400 text-xl font-bold mb-2">Already Verified</div>}
        {status === 'error' && <div className="text-red-400 text-xl font-bold mb-2">Error</div>}
        <div className="mt-2 text-lg">{message}</div>
        <button
          className="mt-8 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
          onClick={() => router.push('/')}
        >
          Go to Home
        </button>
      </div>
    </main>
  );
} 