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
import { LogoMarquee } from "@/components/landing/logo-marquee";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface FeatureCardProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

function FeatureCard({ area, icon, title, description }: FeatureCardProps) {
  return (
    <div className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-black tracking-tight md:text-2xl md:leading-[1.875rem] text-balance">
                {title}
              </h3>
              <p className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-zinc-600 dark:text-zinc-400 font-medium">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 selection:bg-primary/20 transition-colors duration-300 overflow-x-hidden relative">
      {/* Background Sparkles for Full Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass-header border-b border-zinc-100 dark:border-zinc-900">
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

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-4 overflow-hidden flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <div className="space-y-8 flex flex-col items-center">
              <GSAPEntrance delay={0.2} y={20}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Internship Season 2026 Live</span>
                </div>
              </GSAPEntrance>

              <GSAPEntrance delay={0.4} y={30}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-zinc-950 to-zinc-500 dark:from-zinc-50 dark:to-zinc-500">
                  Take control <br />
                  of your career
                </h1>
              </GSAPEntrance>

              <div className="w-full max-w-[40rem] h-40 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm mx-auto" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4 mx-auto" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm mx-auto" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4 mx-auto" />

                {/* Core component */}
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
              </div>

              <GSAPEntrance delay={0.6} y={20}>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  The ultimate internship and job application tracker built for modern developers. Organize your pipeline, manage interviews, and land the offer.
                </p>
              </GSAPEntrance>

              <GSAPEntrance delay={0.8} y={15}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button size="lg" asChild className="rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 px-10 h-14 text-lg shadow-2xl shadow-zinc-300 dark:shadow-zinc-950 transition-all duration-300 group font-bold">
                    <Link href="/sign-up" className="flex items-center gap-2">
                      Get Started Free
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-2xl border-zinc-200 dark:border-zinc-800 h-14 px-10 text-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 font-semibold backdrop-blur-sm">
                    <Link href="#features">See how it works</Link>
                  </Button>
                </div>
              </GSAPEntrance>

              {/* Animated Stats restored for social proof */}
              <GSAPEntrance delay={1} y={20}>
                <div className="flex flex-wrap items-center justify-center gap-8 pt-10">
                  <div className="space-y-1">
                    <p className="text-3xl font-black tabular-nums">
                      <StatsCounter end={200} suffix="+" />
                    </p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-80">Applications Tracked</p>
                  </div>
                  <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
                  <div className="space-y-1">
                    <p className="text-3xl font-black tabular-nums">
                      <StatsCounter end={89} suffix="%" />
                    </p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-80">Interview Success Rate</p>
                  </div>
                </div>
              </GSAPEntrance>
            </div>
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

            <div className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
              <FeatureCard
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<LayoutDashboard className="h-4 w-4" />}
                title="Visual Kanban Pipeline"
                description="Drag and drop your applications through stages. From Applied to Offer, see exactly where you stand in your search."
              />
              <FeatureCard
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<BarChart3 className="h-4 w-4" />}
                title="Smart Insights"
                description="Track your application volume and interview success rates with beautiful, real-time analytics."
              />
              <FeatureCard
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<Briefcase className="h-4 w-4" />}
                title="Unified Management"
                description="Store notes, interview dates, and contact info. Everything in one centralized place, built for speed."
              />
              <FeatureCard
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Privacy & Security"
                description="Your data is strictly isolated and secure. We use industry-standard encryption to keep your search private."
              />
              <FeatureCard
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<CheckCircle2 className="h-4 w-4" />}
                title="Always in Sync"
                description="Whether on mobile or desktop, your applications are always updated and ready when you are."
              />
            </div>
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
