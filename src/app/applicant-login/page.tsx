'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { 
  Globe, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';

function ApplicantLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,
    minLength: false,
  });

  const [animated, setAnimated] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  useEffect(() => {
    const v = searchParams.get('verify');
    if (v === 'success') toast.success('Email verified. You can sign in now.');
    else if (v === 'invalid') toast.error('That verification link is invalid or expired.');
    else if (v === 'missing') toast.error('Missing verification token.');
    else if (v === 'error') toast.error('Could not verify email. Try again later.');
    if (searchParams.get('registered') === '1') {
      toast('Verify your email, then sign in below.', { icon: '✉️' });
    }
  }, [searchParams]);

  useEffect(() => {
    if (mode === 'register' && password) {
      setPasswordRequirements({
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numeric: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        minLength: password.length >= 8,
      });
    }
  }, [password, mode]);

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password) return false;
    if (mode === 'register' && !name.trim()) return false;
    if (mode === 'register') {
      const allRequirementsMet = Object.values(passwordRequirements).every(req => req);
      if (!allRequirementsMet) return false;
    }
    return true;
  }, [email, password, name, mode, passwordRequirements]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setNeedsVerification(false);
    try {
      const res = await fetch(mode === 'login' ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          mode === 'login'
            ? { email, password }
            : { name: name.trim(), email: email.trim(), password },
        ),
      });
      
      let errorMessage = 'Something went wrong';
      try {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          code?: string;
          user?: { role?: string };
        };
        if (!res.ok) {
          if (res.status === 403 && data?.code === 'EMAIL_NOT_VERIFIED') {
            setNeedsVerification(true);
          }
          errorMessage = data?.error ?? 'Something went wrong';
          throw new Error(errorMessage);
        }

        const role = data?.user?.role as string | undefined;

        toast.success(
          mode === 'login'
            ? 'Successfully signed in!'
            : 'Account created! Check your email to verify, then sign in.',
        );

        if (mode === 'register') {
          const qs = new URLSearchParams();
          qs.set('registered', '1');
          const apply = searchParams.get('apply');
          const redirect = searchParams.get('redirect');
          if (apply) qs.set('apply', apply);
          if (redirect) qs.set('redirect', redirect);
          router.push(`/applicant-login?${qs.toString()}`);
          return;
        }

        const apply = searchParams.get('apply');
        const redirect = searchParams.get('redirect');

        if (apply === 'true' && redirect) {
          const jobIdMatch = redirect.match(/\/(?:application|apply)\/([^/?]+)/);
          if (jobIdMatch && jobIdMatch[1]) {
            router.push(`/application/${jobIdMatch[1]}`);
            return;
          }
          router.push(redirect);
          return;
        }

        router.push(role === 'admin' ? '/admin' : '/dashboard');
      } catch (parseError: any) {
        if (parseError.message && parseError.message !== 'Something went wrong') {
          errorMessage = parseError.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      const errorMsg = err?.message ?? 'An unexpected error occurred. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col relative overflow-x-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EE7125]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#EE7125]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-primary/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/icons/logo.8eb14c19.png"
              alt="The Home Depot"
              width={48}
              height={48}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-text-primary text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">The Home Depot</span>
              <span className="text-[#EE7125] text-sm font-black tracking-[0.1em] uppercase">Careers</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-text-secondary uppercase">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <Link href="/job-search" className="hover:text-text-primary transition-colors">Jobs</Link>
            </div>
            <div className="h-4 w-px bg-border-primary hidden md:block" />
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary/80 uppercase">
              <Globe className="w-4 h-4 text-[#EE7125]" />
              <span>EN</span>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-12">
        <div 
          className={`w-full max-w-xl transition-all duration-700 transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          {/* Glassmorphic Form Container */}
          <div className="bg-secondary/60 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#EE7125]/10 border border-[#EE7125]/20 text-[#EE7125] text-[10px] font-black tracking-[0.2em] uppercase mb-4">
                {mode === 'login' ? 'Welcome Back' : 'Join the Team'}
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-text-primary leading-none">
                {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </h1>
              <p className="mt-4 text-text-muted text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                {mode === 'login' 
                  ? 'Access your profile and manage your applications.' 
                  : 'Start your journey with The Home Depot Canada.'}
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-3">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                  {needsVerification && mode === 'login' && (
                    <button
                      type="button"
                      disabled={loading || !email.trim()}
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const r = await fetch('/api/auth/resend-verification', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email.trim() }),
                          });
                          if (!r.ok) {
                            const d = await r.json().catch(() => ({}));
                            throw new Error((d as { error?: string }).error ?? 'Failed to send');
                          }
                          toast.success('Check your inbox for a new verification link.');
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : 'Could not resend');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="text-xs font-bold text-[#EE7125] hover:text-[#FF8A40] uppercase tracking-wide"
                    >
                      Resend verification email
                    </button>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {mode === 'register' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-4">Full Name</label>
                  <div className="relative group">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-tertiary/20 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:bg-tertiary/40 transition-all group-hover:bg-tertiary/30"
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-4">Email Address</label>
                <div className="relative group">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-tertiary/20 rounded-2xl px-6 py-4 text-text-primary focus:outline-none transition-all group-hover:bg-tertiary/30"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-4">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Password</label>
                  {mode === 'login' && (
                    <Link href="/forgot-password" className="text-[10px] font-bold text-[#EE7125] hover:text-[#FF8A40] transition-colors uppercase tracking-[0.1em]">Forgot?</Link>
                  )}
                </div>
                <div className="relative group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-tertiary/20 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:bg-tertiary/40 transition-all group-hover:bg-tertiary/30 pr-14"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {mode === 'register' && password && (
                  <div className="mt-4 p-4 bg-tertiary/20 rounded-2xl">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3">Requirements</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {[
                        { label: 'Lowercase', met: passwordRequirements.lowercase },
                        { label: 'Uppercase', met: passwordRequirements.uppercase },
                        { label: 'Numeric', met: passwordRequirements.numeric },
                        { label: 'Special char', met: passwordRequirements.special },
                        { label: '8+ Characters', met: passwordRequirements.minLength },
                      ].map((req) => (
                        <div key={req.label} className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${req.met ? 'bg-green-500/20 border-green-500/40 text-green-500' : 'border-border-primary text-text-muted opacity-20'}`}>
                            {req.met && <CheckCircle2 className="w-2.5 h-2.5" />}
                          </div>
                          <span className={`text-[10px] font-medium tracking-wide ${req.met ? 'text-text-primary' : 'text-text-muted'}`}>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="group relative w-full bg-[#EE7125] hover:bg-[#FF8A40] disabled:bg-[#EE7125]/30 disabled:text-white/30 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_24px_-8px_rgba(238,113,37,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(238,113,37,0.6)] overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </button>

              <div className="pt-6 text-center">
                <p className="text-sm text-text-muted">
                  {mode === 'login' ? "Don't have an account yet?" : "Already have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === 'login' ? 'register' : 'login');
                      setShowPassword(false);
                      setError(null);
                    }}
                    className="text-[#EE7125] hover:text-[#FF8A40] font-bold transition-colors"
                  >
                    {mode === 'login' ? 'Create Account' : 'Sign In'}
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Social Links & Trust */}
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              {['facebook-f', 'youtube', 'x-twitter', 'linkedin-in'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-2xl bg-tertiary/20 border border-border-primary flex items-center justify-center text-text-muted hover:bg-[#EE7125]/10 hover:border-[#EE7125]/30 hover:text-[#EE7125] transition-all duration-300"
                >
                  <i className={`fab fa-${social} text-sm`}></i>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">
              <Link href="/associate-privacy-statement" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
              <span className="w-1 h-1 rounded-full bg-border-primary" />
              <Link href="/accessibility" className="hover:text-text-primary transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-8 px-6 text-center">
        <div className="flex flex-col items-center gap-2 opacity-20 hover:opacity-40 transition-opacity duration-500">
          <span className="text-[10px] font-light tracking-[0.4em] text-text-muted uppercase">Powered By</span>
          <div className="font-display text-xl text-text-muted/30 tracking-widest">WORKDAY</div>
        </div>
      </footer>
    </div>
  );
}

export default function ApplicantLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-[#EE7125] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#EE7125] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    }>
      <ApplicantLoginContent />
    </Suspense>
  );
}
