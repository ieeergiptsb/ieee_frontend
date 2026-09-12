"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import PillNav from "@/components/ui/PillNav";
import Footer from "@/components/ui/Footer";
import { bootcampService } from "@/lib/bootcamp";
import { useAuth } from "@/components/providers/SessionProvider";
import { authService } from "@/lib/auth";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { label: "IEEE", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Chapters", href: "/#chapters" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const SLUG_POSTER_MAP = {
  'robogenesis': '/robogenises/ROBOGENESIS.png',
  'robotics-workshop-2026': '/robogenises/ROBOGENESIS.png',
  'devwave-2026': '/images/posters/devwave.png',
  'codenex-3': '/images/posters/codenex.png',
};

const STATIC_UPDATES_MAP = {
  'robogenesis': [
    {
      _id: 'robogenesis-whatsapp-update',
      title: 'Official WhatsApp Community Group',
      short_description: 'Join the official participants WhatsApp group for workshop schedule, bot design resources, competition updates, and TechFest wildcard entry announcements.',
      link: 'https://chat.whatsapp.com/C5Ypne3xe7A76CVyh9Ksxt',
      createdAt: new Date().toISOString(),
    },
  ],
  'robotics-workshop-2026': [
    {
      _id: 'robogenesis-whatsapp-update',
      title: 'Official WhatsApp Community Group',
      short_description: 'Join the official participants WhatsApp group for workshop schedule, bot design resources, competition updates, and TechFest wildcard entry announcements.',
      link: 'https://chat.whatsapp.com/C5Ypne3xe7A76CVyh9Ksxt',
      createdAt: new Date().toISOString(),
    },
  ],
};

const STATIC_EVENTS_MAP = {
  'robogenesis': {
    slug: 'robogenesis',
    title: 'RoboGenesis',
    category: 'Workshop',
    partner: 'TechFest, IIT Bombay',
    tagline: 'Build. Learn. Compete. Innovate — One-Day Robotics Workshop',
    duration: 'One-Day Intensive Workshop',
    banner_url: '/robogenises/ROBOGENESIS.png',
    short_description: 'RoboGenesis is a robotics workshop organised by the IEEE RGIPT Robotics & Automation Society in association with TechFest, IIT Bombay.',
    description: 'RoboGenesis is a premier robotics workshop organised by the IEEE RGIPT Robotics & Automation Society in association with TechFest, IIT Bombay.\n\nThe workshop will cover bot design, Arduino basics, and strategies for TechFest robotics competitions, helping participants develop practical robotics skills and explore opportunities to participate in TechFest competitions through wildcard entries.\n\nOrganized by IEEE RGIPT Student Branch in collaboration with TechFest, IIT Bombay.',
    highlights: [
      'Bot Design & Hardware Architecture',
      'Arduino Basics & Microcontroller Interfacing',
      'Strategies for Roboreach, Meshmerize & Thetashift',
      'Chance to get Wildcard Entry in TechFest, IIT Bombay',
      'Mentorship from Senior IEEE Robotics Developers'
    ],
    topics: ['Bot Design', 'Arduino Basics', 'Roboreach', 'Meshmerize', 'Thetashift', 'Sensors', 'TechFest IIT Bombay'],
    registrationDisabled: false,
    isUpcoming: false,
    statusNote: 'Registration is Open — Organized in association with TechFest, IIT Bombay.'
  },
  'robotics-workshop-2026': {
    slug: 'robogenesis',
    title: 'RoboGenesis',
    category: 'Workshop',
    partner: 'TechFest, IIT Bombay',
    tagline: 'Build. Learn. Compete. Innovate — One-Day Robotics Workshop',
    duration: 'One-Day Intensive Workshop',
    banner_url: '/robogenises/ROBOGENESIS.png',
    short_description: 'RoboGenesis is a robotics workshop organised by the IEEE RGIPT Robotics & Automation Society in association with TechFest, IIT Bombay.',
    description: 'RoboGenesis is a premier robotics workshop organised by the IEEE RGIPT Robotics & Automation Society in association with TechFest, IIT Bombay.\n\nThe workshop will cover bot design, Arduino basics, and strategies for TechFest robotics competitions, helping participants develop practical robotics skills and explore opportunities to participate in TechFest competitions through wildcard entries.\n\nOrganized by IEEE RGIPT Student Branch in collaboration with TechFest, IIT Bombay.',
    highlights: [
      'Bot Design & Hardware Architecture',
      'Arduino Basics & Microcontroller Interfacing',
      'Strategies for Roboreach, Meshmerize & Thetashift',
      'Chance to get Wildcard Entry in TechFest, IIT Bombay',
      'Mentorship from Senior IEEE Robotics Developers'
    ],
    topics: ['Bot Design', 'Arduino Basics', 'Roboreach', 'Meshmerize', 'Thetashift', 'Sensors', 'TechFest IIT Bombay'],
    registrationDisabled: false,
    isUpcoming: false,
    statusNote: 'Registration is Open — Organized in association with TechFest, IIT Bombay.'
  },
  'devwave-2026': {
    slug: 'devwave-2026',
    title: 'DEVWAVE 2026',
    category: 'Bootcamp',
    tagline: 'Full-Stack Development & UI/UX Bootcamp',
    duration: 'May 2026',
    banner_url: '/images/posters/devwave.png',
    short_description: 'IEEE RGIPT\'s flagship full-stack development bootcamp exploring UI/UX, frontend, backend, and React.',
    description: 'DEVWAVE 2026 was IEEE RGIPT\'s flagship full-stack development bootcamp. Students explored UI/UX, frontend, backend, and React development with mentorship from senior developers.',
    highlights: [
      'UI/UX Design Principles',
      'Modern Frontend Development (React / Next.js)',
      'Backend APIs & Database Architecture',
      'Hands-On Project Mentorship'
    ],
    topics: ['Full-Stack', 'React', 'Node.js', 'UI/UX', 'Web Development'],
    registrationDisabled: true,
    isCompleted: true,
    statusNote: 'Event Completed — Check out past highlights in the event archive.'
  },
  'codenex-3': {
    slug: 'codenex-3',
    title: 'CodeNex 3.0',
    category: 'Bootcamp',
    tagline: 'Master Data Structures & Algorithms Step by Step',
    duration: 'May 2026 (10-Week Program)',
    banner_url: '/images/posters/codenex.png',
    short_description: 'A 10-week structured DSA learning program focused on problem-solving, coding logic, interview preparation, contests, and guided practice.',
    description: 'CodeNex 3.0 was IEEE RGIPT\'s 10-week structured DSA program designed to master data structures and algorithms with weekly contests and interview preparation.',
    highlights: [
      'Weekly Coding Contests',
      'Practice Problems & Solution Guides',
      'Interview Preparation & Mock Sessions',
      'Data Structures & Algorithms Mastery'
    ],
    topics: ['DSA', 'Algorithms', 'Competitive Programming', 'Interview Prep', 'C++ / Java / Python'],
    registrationDisabled: true,
    isCompleted: true,
    statusNote: 'Event Completed — Check out past archives in the event portal.'
  }
};

function bannerSrc(url, slug) {
  if (!url || url.match(/\/images\/posters\/(?:4|6)\.png$/)) {
    return SLUG_POSTER_MAP[slug] || '/images/posters/devwave.png';
  }
  return url;
}

export default function BootcampEventPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const isSignedIn = !!user || authService.isAuthenticated();
  const [event, setEvent] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [regLoading, setRegLoading] = useState(false);
  const [updatesLoading, setUpdatesLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setPageLoading(true);
      const r = await bootcampService.getEventBySlug(slug);
      if (cancelled) return;
      if (!r.success) {
        if (STATIC_EVENTS_MAP[slug]) {
          setEvent(STATIC_EVENTS_MAP[slug]);
          setLoadError("");
        } else {
          setLoadError(r.error || "Program not found");
          setEvent(null);
        }
      } else {
        setEvent(r.event);
        setLoadError("");
      }
      setPageLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug || authLoading) return;
    (async () => {
      if (!isSignedIn) {
        setRegistered(false);
        setUpdates([]);
        return;
      }
      const st = await bootcampService.registrationStatus(slug);
      setRegistered(!!st.registered);
      if (st.registered) {
        setUpdatesLoading(true);
        const u = await bootcampService.getUpdates(slug);
        if (u.success && u.updates && u.updates.length > 0) {
          setUpdates(u.updates);
        } else if (STATIC_UPDATES_MAP[slug]) {
          setUpdates(STATIC_UPDATES_MAP[slug]);
        } else {
          setUpdates([]);
        }
        setUpdatesLoading(false);
      } else {
        setUpdates([]);
      }
    })();
  }, [slug, user, authLoading, isSignedIn]);

  const handleRegister = async () => {
    if (!isSignedIn) {
      router.push(`/signin?redirect=${encodeURIComponent(`/events/${slug}`)}`);
      return;
    }
    setRegLoading(true);
    setToast("");
    const r = await bootcampService.register(slug);
    setRegLoading(false);
    if (r.success) {
      setToast("Registered successfully! Check your email for confirmation.");
      setRegistered(true);
      setUpdatesLoading(true);
      const u = await bootcampService.getUpdates(slug);
      if (u.success && u.updates && u.updates.length > 0) {
        setUpdates(u.updates);
      } else if (STATIC_UPDATES_MAP[slug]) {
        setUpdates(STATIC_UPDATES_MAP[slug]);
      } else {
        setUpdates([]);
      }
      setUpdatesLoading(false);
    } else {
      setToast(r.error || "Could not register");
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
      </div>
    );
  }

  if (loadError || !event) {
    return (
      <div className="min-h-screen bg-black text-white">
        <PillNav items={navItems} />
        <div className="max-w-xl mx-auto px-4 py-32 text-center">
          <p className="text-white/60 mb-6">{loadError || "Not found"}</p>
          <Link href="/events" className="text-purple-400 hover:underline">
            Back to events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <PillNav items={navItems} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24 md:pt-36">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All events
        </Link>

        {/* Showcase Banner Header */}
        <div className="rounded-3xl overflow-hidden border border-white/15 bg-white/[0.02] backdrop-blur-xl mb-10 p-6 md:p-8 relative">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Poster Frame - 4:5 native ratio */}
            <div className="md:col-span-5 relative mx-auto w-full max-w-sm group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/40 via-indigo-600/30 to-fuchsia-600/40 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/60">
                <img
                  src={bannerSrc(event.banner_url, slug)}
                  alt={event.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Event Header Information */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold bg-purple-500/20 border border-purple-500/40 text-purple-200">
                  {event.category || "Workshop"}
                </span>
                {event.partner && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-indigo-400/40 text-indigo-100">
                    {event.partner}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {event.title}
              </h1>

              {event.tagline && (
                <p className="text-base sm:text-lg text-purple-200/90 font-medium leading-relaxed">
                  {event.tagline}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-white/70">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/90">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {event.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {toast && (
          <div
            className={`mb-8 px-4 py-3 rounded-lg border text-sm ${
              toast.includes("success")
                ? "border-green-500/40 bg-green-500/10 text-green-200"
                : "border-red-500/40 bg-red-500/10 text-red-200"
            }`}
          >
            {toast}
          </div>
        )}

        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
            {event.description || event.short_description}
          </p>
        </div>

        {event.highlights?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              Highlights
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {event.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {event.topics?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {event.topics.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-purple-500/15 border border-purple-500/30 text-purple-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {event.roadmap && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Learning roadmap</h2>
            <pre className="whitespace-pre-wrap text-white/75 font-sans text-sm leading-relaxed bg-white/5 border border-white/10 rounded-xl p-6">
              {event.roadmap}
            </pre>
          </section>
        )}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 mb-16">
          {event.registrationDisabled ? (
            event.isCompleted ? (
              <div>
                <h3 className="font-semibold text-lg text-purple-300">Event Completed</h3>
                <p className="text-white/60 text-sm mt-1">
                  {event.statusNote || "This program has concluded. Check out our active events and past highlights."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300">Registration Opening Soon</h3>
                  <p className="text-white/60 text-sm mt-1">
                    {event.statusNote || "Registration details will be announced soon by IEEE RGIPT & S&T Council."}
                  </p>
                </div>
                <button
                  type="button"
                  disabled
                  className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white/60 font-semibold cursor-not-allowed text-sm min-w-[180px]"
                >
                  Registration Opening Soon
                </button>
              </div>
            )
          ) : registered ? (
            <div>
              <p className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Registered successfully
              </p>
              <p className="text-white/60 text-sm mb-6">
                You have full access to program updates below.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">Join this program</h3>
                <p className="text-white/50 text-sm">
                  Sign in with your IEEE RGIPT account, then register in one click.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRegister}
                disabled={regLoading || authLoading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold disabled:opacity-50 min-w-[160px]"
              >
                {regLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : authLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : isSignedIn ? (
                  "Register now"
                ) : (
                  "Sign in to register"
                )}
              </button>
            </div>
          )}

          {registered && (
            <section className="mt-10 border-t border-white/10 pt-10">
              <h3 className="text-lg font-semibold mb-4">Program updates</h3>
              {updatesLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              ) : updates.length === 0 ? (
                <p className="text-white/50 text-sm">No updates posted yet.</p>
              ) : (
                <ul className="space-y-4">
                  {updates.map((u) => {
                    const isWhatsapp = typeof u.link === 'string' && u.link.includes('whatsapp.com');
                    return (
                      <li
                        key={u._id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isWhatsapp
                            ? 'bg-gradient-to-r from-emerald-950/40 via-green-950/20 to-black/60 border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                            : 'p-4 rounded-xl bg-black/40 border border-white/10'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              {isWhatsapp && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                                  WhatsApp Community
                                </span>
                              )}
                              <h4 className="font-semibold text-white text-base">{u.title}</h4>
                            </div>
                            {u.short_description && (
                              <p className="text-white/70 text-sm leading-relaxed">{u.short_description}</p>
                            )}
                          </div>
                          <div>
                            {isWhatsapp ? (
                              <a
                                href={u.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 transition-all shadow-md shadow-emerald-950/40 shrink-0"
                              >
                                <MessageCircle className="w-4 h-4" />
                                Join WhatsApp Group
                                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                              </a>
                            ) : (
                              <a
                                href={u.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 text-sm text-purple-400 hover:text-purple-300"
                              >
                                Open resource <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
