'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LogOut,
  LayoutDashboard,
  Heart,
  Users,
  Briefcase,
  FileText,
  ExternalLink,
  CalendarDays,
} from 'lucide-react';

type MeUser = { id: string; email: string; name: string | null; role: string };

const tiles = [
  {
    title: 'Benefits & wellness',
    description: 'Health, retirement, and programs available to associates.',
    href: '/about/our-benefits',
    icon: Heart,
  },
  {
    title: 'Culture & values',
    description: 'How we work together and grow careers at The Home Depot.',
    href: '/about/culture',
    icon: Users,
  },
  {
    title: 'Internal mobility',
    description: 'Explore other roles and career paths with the company.',
    href: '/job-search',
    icon: Briefcase,
  },
  {
    title: 'Associate privacy',
    description: 'How we handle associate personal information.',
    href: '/associate-privacy-statement',
    icon: FileText,
  },
] as const;

export default function AssociatePortal() {
  const [user, setUser] = useState<MeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        const data = await res.json();
        if (!cancelled && data?.user) setUser(data.user);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/applicant-login';
  }

  const displayName = user?.name?.trim() || user?.email?.split('@')[0] || 'Associate';

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      <section className="relative pt-16 pb-16 px-6 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[520px] h-[520px] bg-[#EE7125]/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gradient-to-r from-[#EE7125] to-transparent" />
                <span className="text-[10px] font-black tracking-[0.35em] text-[#EE7125] uppercase">
                  Associate hub
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl leading-[0.95] mb-4">
                Welcome back,
                <br />
                <span className="text-[#EE7125]">{loading ? '…' : displayName}</span>
              </h1>
              <p className="text-text-secondary max-w-xl text-sm md:text-base leading-relaxed">
                This area is for current team members. Use the shortcuts below for HR, benefits, and career resources.
                Payroll and scheduling tools can be linked here when your organization connects them.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-secondary/50 border border-border-primary hover:bg-secondary/70 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-[#EE7125]" />
                Application history
              </Link>
              <button
                type="button"
                onClick={() => void logout()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-secondary/50 border border-border-primary hover:bg-secondary/70 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <LogOut className="w-4 h-4 opacity-60" />
                Sign out
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <div className="rounded-3xl border border-border-primary bg-secondary/30 backdrop-blur-xl p-8 flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#EE7125]/15 flex items-center justify-center shrink-0">
                <CalendarDays className="w-6 h-6 text-[#EE7125]" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary mb-2">Schedule & time</h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  Your store or corporate team may use a separate workforce system. Placeholder until that link is
                  configured.
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/70">
                  Coming soon
                </span>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-border-primary bg-white/[0.02] p-8 flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-tertiary flex items-center justify-center shrink-0">
                <Image src="/images/icons/logo.8eb14c19.png" alt="The Home Depot" width={28} height={28} className="opacity-80" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary mb-2">Need HR help?</h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  For payroll corrections, leave, or workplace questions, contact your store manager or People team
                  through your usual channel.
                </p>
                <Link
                  href="/careers"
                  className="text-[10px] font-bold text-[#EE7125] hover:text-[#FF8A40] uppercase tracking-widest inline-flex items-center gap-1"
                >
                  Careers contact
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          <h2 className="text-[11px] font-black tracking-[0.3em] text-text-muted uppercase mb-6">Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiles.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-3xl border border-border-primary bg-secondary/25 hover:bg-secondary/40 backdrop-blur-xl p-7 transition-all hover:border-[#EE7125]/40"
              >
                <Icon className="w-8 h-8 text-[#EE7125] mb-5 opacity-90 group-hover:scale-105 transition-transform" />
                <h3 className="font-bold text-text-primary mb-2 leading-snug">{title}</h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4">{description}</p>
                <span className="text-[10px] font-black text-[#EE7125] uppercase tracking-widest group-hover:underline">
                  Open
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
