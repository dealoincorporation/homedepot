import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function AssociatePortalLocked() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-primary text-text-primary px-6 py-20">
      <div className="absolute top-[20%] right-[-10%] w-[480px] h-[480px] bg-[#EE7125]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/60 border border-border-primary mb-8">
          <Lock className="w-8 h-8 text-[#EE7125]" aria-hidden />
        </div>
        <p className="text-[11px] font-black tracking-[0.35em] text-[#EE7125] uppercase mb-4">Current associates</p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          This portal is for <span className="text-[#EE7125]">active team members</span>
        </h1>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-10">
          After HR marks your application as <strong className="text-text-primary">Hired</strong>, your account is upgraded
          automatically and you can sign in here with the same email and password you used to apply.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex justify-center items-center px-8 py-4 rounded-2xl bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-xs uppercase tracking-widest transition-colors"
          >
            My applications
          </Link>
          <Link
            href="/job-search"
            className="inline-flex justify-center items-center px-8 py-4 rounded-2xl bg-secondary/50 border border-border-primary hover:bg-secondary/70 font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
