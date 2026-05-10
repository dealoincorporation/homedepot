'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft, Eye, EyeOff, Loader2, Lock } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing reset link.');
    }
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || password.length < 8) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? 'Reset failed');
      }
      toast.success('Password updated. You can sign in now.');
      router.push('/applicant-login');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EE7125]/10 blur-[120px] rounded-full pointer-events-none" />
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-primary backdrop-blur-md bg-primary/40 px-6 h-20">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/icons/logo.8eb14c19.png" alt="The Home Depot" width={40} height={40} className="object-contain" />
            <span className="text-[#EE7125] text-xs font-black tracking-widest uppercase">Careers</span>
          </Link>
        </div>
      </header>
      <div className="h-20" />

      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div
          className={`w-full max-w-md transition-all duration-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="bg-secondary/60 backdrop-blur-xl rounded-[32px] p-8 md:p-10 border border-border-primary shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#EE7125]/10 border border-[#EE7125]/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#EE7125]" />
              </div>
              <h1 className="font-display text-3xl text-text-primary">New password</h1>
              <p className="text-text-muted text-sm mt-2">Choose a strong password (8+ characters).</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-tertiary/20 rounded-2xl px-5 py-4 pr-12 text-text-primary focus:outline-none"
                  placeholder="New password"
                  minLength={8}
                  required
                  disabled={!token}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || !token || password.length < 8}
                className="w-full bg-[#EE7125] hover:bg-[#FF8A40] disabled:opacity-40 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update password'}
              </button>
              <Link
                href="/applicant-login"
                className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-[#EE7125]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#EE7125] animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
