'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  Mail, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as { error?: string }).error ?? 'Request failed');
      }
      setSubmitted(true);
      toast.success('If an account exists for that email, you will receive a reset link shortly.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EE7125]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#EE7125]/5 blur-[100px] rounded-full pointer-events-none" />


      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-12">
        <div 
          className={`w-full max-w-lg transition-all duration-1000 transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          {/* Glassmorphic Container */}
          <div className="bg-secondary/40 backdrop-blur-3xl rounded-[40px] p-10 md:p-14 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-40" />
            
            {!submitted ? (
              <>
                <div className="text-center mb-12">
                  <div className="w-20 h-20 rounded-[24px] bg-[#EE7125]/10 border border-[#EE7125]/20 flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-10 h-10 text-[#EE7125]" />
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl text-text-primary leading-none mb-4 uppercase">
                    RECOVER <span className="text-[#EE7125]">ACCESS</span>
                  </h1>
                  <p className="text-text-muted text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                    Enter the email associated with your account and we&apos;ll send you a recovery link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                      <Mail className="w-3 h-3 text-[#EE7125]" />
                      Email Identity
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-tertiary/10 rounded-2xl px-6 py-5 text-text-primary focus:outline-none focus:bg-tertiary/20 transition-all text-sm font-medium placeholder-text-muted/30 shadow-inner"
                        placeholder="you@example.com"
                      />
                      <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#EE7125]/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="group relative w-full bg-[#EE7125] hover:bg-[#FF8A40] disabled:bg-[#EE7125]/30 text-white font-black py-5 rounded-2xl transition-all duration-300 shadow-[0_12px_32px_-8px_rgba(238,113,37,0.5)] flex items-center justify-center gap-3 overflow-hidden"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <>
                        <span className="text-xs uppercase tracking-[0.2em]">Send Recovery Link</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <Link 
                    href="/applicant-login" 
                    className="flex items-center justify-center gap-2 w-full py-4 text-[10px] font-black text-text-muted hover:text-[#EE7125] uppercase tracking-[0.3em] transition-all group/back"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover/back:-translate-x-1 transition-transform" />
                    Return to Login
                  </Link>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 mx-auto animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="font-display text-4xl text-text-primary mb-4 uppercase tracking-tight">TRANSMISSION SENT</h2>
                <p className="text-text-muted text-sm md:text-base max-w-sm mx-auto leading-relaxed mb-10">
                  A recovery link has been dispatched to <span className="text-text-primary font-bold">{email}</span>. Please check your inbox (and spam).
                </p>
                <div className="space-y-4">
                  <Link 
                    href="/applicant-login" 
                    className="block w-full bg-secondary text-text-primary font-black py-4 rounded-2xl transition-all hover:bg-tertiary text-xs uppercase tracking-[0.2em] shadow-lg"
                  >
                    Return to Login
                  </Link>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] font-black text-[#EE7125] hover:text-[#FF8A40] transition-colors uppercase tracking-[0.2em]"
                  >
                    Didn&apos;t receive it? Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-12 px-6 text-center opacity-30 hover:opacity-100 transition-opacity duration-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-black tracking-[0.5em] text-text-muted uppercase">Antigravity Identity Protocol</span>
          <div className="font-display text-xl text-text-muted/40 tracking-[0.2em]">DEPOT PRIME</div>
        </div>
      </footer>
    </div>
  );
}
