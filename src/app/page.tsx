import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  BarChart3,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
  Users2,
  GraduationCap,
  Globe
} from "lucide-react";
import { GSAPEntrance } from "@/components/landing/gsap-entrance";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { StatsCounter } from "@/components/landing/stats-counter";
import { ProductMockup } from "@/components/landing/product-mockup";
import { AntigravityBackground } from "@/components/landing/antigravity-background";
import { LogoMarquee } from "@/components/landing/logo-marquee";

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-primary/20 transition-colors duration-300 overflow-x-hidden relative">
      <AntigravityBackground />
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass-header">
        <GSAPEntrance y={-20} duration={0.8}>
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="size-8 rounded-xl bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-zinc-50 dark:text-zinc-900 font-black text-lg transition-transform group-hover:rotate-12">
                D
              </div>
              <span className="font-extrabold text-xl tracking-tight">DevFlow</span>
            </div>
            <nav className="hidden md:flex items-center gap-10">

            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" asChild className="rounded-xl font-bold text-xs uppercase tracking-widest px-6 hidden sm:flex hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 px-6 font-black text-xs uppercase tracking-widest shadow-xl shadow-zinc-200 dark:shadow-zinc-950/50 transition-all duration-300 hover:scale-110 active:scale-95">
                <Link href="/sign-up">Start Tracking</Link>
              </Button>
            </div>
          </div>
        </GSAPEntrance>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-4 overflow-hidden">
          {/* Advanced Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-zinc-100 dark:from-zinc-900/50 via-transparent to-transparent opacity-70" />
            <div className="absolute top-1/4 -left-20 size-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 size-[500px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <GSAPEntrance delay={0.2} y={20}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Internship Season Live</span>
                </div>
              </GSAPEntrance>

              <GSAPEntrance delay={0.4} y={30}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-[900] tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-zinc-50 dark:to-zinc-500">
                  Take control <br />
                  of your career <br />
                  <span className="text-zinc-900 dark:text-zinc-50 relative">
                    pipeline.
                    <span className="absolute bottom-2 left-0 w-full h-4 bg-emerald-500/10 -z-10 rounded-full" />
                  </span>
                </h1>
              </GSAPEntrance>

              <GSAPEntrance delay={0.6} y={20}>
                <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  The ultimate internship and job application tracker built for modern developers. Organize your pipeline, manage interviews, and land the offer.
                </p>
              </GSAPEntrance>

              <GSAPEntrance delay={0.8} y={15}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Button size="lg" asChild className="rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 px-8 h-14 text-lg shadow-2xl shadow-zinc-300 dark:shadow-zinc-950 transition-all duration-300 group font-bold">
                    <Link href="/sign-up" className="flex items-center gap-2">
                      Get Started Free
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-2xl border-zinc-200 dark:border-zinc-800 h-14 px-8 text-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 font-semibold">
                    <Link href="#features">See how it works</Link>
                  </Button>
                </div>
              </GSAPEntrance>

              {/* Animated Stats */}
              <GSAPEntrance delay={1} y={20}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                  <div className="space-y-1">
                    <p className="text-3xl font-black tabular-nums">
                      <StatsCounter end={200} suffix="+" />
                    </p>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Applications Tracked</p>
                  </div>
                  <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
                  <div className="space-y-1">
                    <p className="text-3xl font-black tabular-nums">
                      <StatsCounter end={89} suffix="%" />
                    </p>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Interview Success Rate</p>
                  </div>
                </div>
              </GSAPEntrance>
            </div>

            <GSAPEntrance delay={0.6} y={0}>
              <div className="hidden lg:block relative scale-110">
                <ProductMockup />
              </div>
            </GSAPEntrance>
          </div>
        </section>

        {/* Infinite Logo Marquee */}
        <GSAPEntrance delay={1.2}>
          <LogoMarquee />
        </GSAPEntrance>

        {/* Features Preview (Bento Grid) */}
        <section id="features" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">Everything you need to land the offer.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-medium">
                Stop using spreadsheets. Start using a specialized tool built for the modern applicant.
              </p>
            </div>

            <ScrollReveal>
              <div className="md:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between group overflow-hidden相对 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="space-y-4 relative z-10">
                  <div className="size-12 rounded-2xl bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-zinc-50 dark:text-zinc-900 shadow-lg group-hover:scale-110 transition-transform">
                    <LayoutDashboard size={24} />
                  </div>
                  <h3 className="text-2xl font-black">Visual Kanban Pipeline</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 max-w-md font-medium leading-relaxed">
                    Drag and drop your applications through stages. From "Applied" to "Offer", see exactly where you stand in your search.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="h-2 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-2 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 group-hover:bg-zinc-900 group-hover:text-zinc-50 dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-900 transition-all duration-500">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-2xl font-black">Smart Insights</h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                  Track your application volume and interview success rates with beautiful, real-time analytics.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 group-hover:bg-zinc-900 group-hover:text-zinc-50 dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-900 transition-all duration-500">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-black">Management</h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                  Store notes, interview dates, and contact info. Everything in one centralized place.
                </p>
              </div>

              <div className="md:col-span-2 bg-zinc-900 text-zinc-50 p-8 rounded-[2rem] border border-zinc-800 shadow-2xl flex items-center justify-between overflow-hidden relative group transition-all duration-500 hover:-translate-y-2">
                <div className="relative z-10 space-y-4 max-w-sm">
                  <ShieldCheck size={40} className="text-emerald-500 shadow-emerald-500/50" />
                  <h3 className="text-2xl font-black">Privacy & Security</h3>
                  <p className="text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500 font-medium">
                    Your data is strictly isolated and secure. We use industry-standard authentication to keep your job search private.
                  </p>
                </div>
                <div className="absolute -right-20 -bottom-20 size-80 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials Placeholder */}
        <section id="testimonials" className="py-24 px-4 bg-zinc-50/30 dark:bg-zinc-900/5 border-t border-zinc-100 dark:border-zinc-900">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight italic">"Life changing tool."</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Akhil Bhaskar", role: "Software Intern @ LTIMindtree", quote: "DevFlow helped me stay sane during the application season. The kanban board is exactly what I needed." },
                { name: "Chinmay Gokhale", role: "Final Year Student", quote: "Beautiful UI and very functional. I love how it tracks my interview success rates automatically." },
                { name: "Ashish Nehra", role: "Game Tester @ HITWICKET", quote: "No more messy spreadsheets. DevFlow is the single source of truth for my career search." }
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 group hover:border-zinc-900 dark:hover:border-zinc-50 transition-all duration-300">
                  <p className="text-zinc-600 dark:text-zinc-400 italic font-medium">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-zinc-500 font-bold tracking-tight uppercase">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-zinc-50 dark:text-zinc-900 font-bold text-xs">
              D
            </div>
            <span className="font-bold tracking-tight">DevFlow</span>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest">
            © 2026 DevFlow. Built for the next generation.
          </div>
          <div className="flex items-center gap-6 font-bold text-xs uppercase tracking-widest">
            <Link href="https://www.linkedin.com/in/anshtripathi20/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">LinkedIn</Link>
            <Link href="https://github.com/anshtripathi6969" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
