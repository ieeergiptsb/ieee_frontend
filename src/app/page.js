"use client";

import { Suspense, useRef, useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PillNav from "@/components/ui/PillNav";
import Footer from "@/components/ui/Footer";

// Lazy load heavy components
const Hero = dynamic(() => import("@/components/ui/animated-shader-hero"), { 
  ssr: false,
  loading: () => <div className="min-h-screen" />
});
const SponsorsSection = dynamic(() => import("@/components/ui/sponsors-section"), { 
  ssr: false 
});
const EventsSection = dynamic(() => import("@/components/ui/events-section"), { 
  ssr: false 
});
const PastEventsTimeline = dynamic(() => import("@/components/ui/past-events-timeline"), { 
  ssr: false 
});
const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then(mod => ({ default: mod.ContainerScroll })), { 
  ssr: false 
});
const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), { 
  ssr: false,
  loading: () => <div className="h-[50vh] md:h-[60vh] flex items-center justify-center text-white/60">Loading...</div>
});
const DomeGallery = dynamic(() => import("@/components/ui/DomeGallery"), { 
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center text-white/60">Loading gallery...</div>
});

import picturesData from "@/data/pictures.json";
import { sponsorsData } from "@/data/sponsors-data";

const navItems = [
  { label: "IEEE", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Chapters", href: "#chapters" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const announcements = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    badge: "Hackathon",
    title: "CodeForHer Hackathon 2025",
    description: "Join us for CodeForHer, a hackathon aimed at encouraging innovation, creativity, and problem-solving among students through technology-driven solutions. Focused on promoting women participation in tech and inclusive innovation.",
    description2: "Open to all undergraduate female students across India. Teams of 3-4 members can participate. Registration is now open! Showcase your skills and win exciting certificates and IEEE goodies.",
    primaryButton: { text: "Learn More", href: "/events/codeforher" },
    secondaryButton: { text: "Register Now", href: "/contact" }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    badge: "Announcement",
    title: "Join Our Upcoming Event",
    description: "We're excited to announce our upcoming IEEE event that brings together students, professionals, and innovators from across the region. This is an opportunity to network, learn, and be part of the future of technology.",
    description2: "Don't miss out on this incredible opportunity to connect with industry leaders, participate in hands-on workshops, and explore cutting-edge technologies that are shaping tomorrow.",
    primaryButton: { text: "Learn More", href: "/events" },
    secondaryButton: { text: "Contact Us", href: "/contact" }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    badge: "Workshop",
    title: "Technical Workshop Series",
    description: "Join us for an intensive technical workshop series covering the latest trends in robotics, AI, and automation. Learn from industry experts and get hands-on experience with cutting-edge technologies.",
    description2: "Our workshops are designed for all skill levels, from beginners to advanced practitioners. Register now to secure your spot!",
    primaryButton: { text: "Register Now", href: "/events" },
    secondaryButton: { text: "View Schedule", href: "/events" }
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    badge: "Competition",
    title: "IEEE Robotics Competition 2025",
    description: "Showcase your robotics skills in our annual competition. Compete with teams from across the region and win exciting prizes. Registration is now open!",
    description2: "This year's competition features new challenges and categories. Whether you're a beginner or an expert, there's a category for you.",
    primaryButton: { text: "Register", href: "/events" },
    secondaryButton: { text: "Learn More", href: "/events" }
  }
];

const chapterCards = [
  {
    id: "ras",
    title: "IEEE RAS",
    subtitle: "Robotics & Automation Society",
    description:
      "Autonomous systems, bio-mechanics labs, and rapid prototyping rigs driven by our RAS fellows.",
    accent: "from-cyan-400/80 via-blue-500/80 to-purple-600/80",
    href: "/chapters/ras",
  },
  {
    id: "cs",
    title: "IEEE CS",
    subtitle: "Computer Society",
    description:
      "Flagship hackathons, full-stack build weeks, and low-level labs curated by the Computer Society.",
    accent: "from-violet-500/80 via-fuchsia-500/80 to-pink-500/80",
    href: "/chapters/code-club",
  },
  {
    id: "wie",
    title: "IEEE WIE",
    subtitle: "Women in Engineering",
    description:
      "Leadership cohorts, industry mentorship, and inclusive labs amplifying women technologists.",
    accent: "from-rose-400/80 via-orange-400/80 to-amber-400/80",
    href: "/chapters/women",
  },
  {
    id: "comsic",
    title: "IEEE COMSOC",
    subtitle: "Comms & Signal Society",
    description:
      "Deep dives into SDR, radar labs, and futuristic comms challenges across the COMSOC stack.",
    accent: "from-emerald-400/80 via-teal-400/80 to-sky-400/80",
    href: "/chapters/comsoc",
  },
];

export default function Home() {
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const announcementIntervalRef = useRef(null);
  const chaptersContainerRef = useRef(null);

  const handleAboutClick = () => {
    window.location.href = "/about";
  };

  const handleEventsClick = () => {
    window.location.href = "/events";
  };

  const toggleVideoAudio = () => {
    setIsVideoMuted((prev) => {
      const nextState = !prev;
      if (videoRef.current) {
        videoRef.current.muted = nextState;
        if (!nextState) {
          videoRef.current
            .play()
            .catch(() => {
              /* noop */
            });
        }
      }
      return nextState;
    });
  };

  // Auto-play announcements
  useEffect(() => {
    announcementIntervalRef.current = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000); // Change every 5 seconds

    return () => {
      if (announcementIntervalRef.current) {
        clearInterval(announcementIntervalRef.current);
      }
    };
  }, []);

  const resetAnnouncementTimer = useCallback(() => {
    if (announcementIntervalRef.current) {
      clearInterval(announcementIntervalRef.current);
    }
    announcementIntervalRef.current = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
  }, []);

  const goToNextAnnouncement = () => {
    setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    resetAnnouncementTimer();
  };

  const goToPreviousAnnouncement = () => {
    setCurrentAnnouncement((prev) => (prev - 1 + announcements.length) % announcements.length);
    resetAnnouncementTimer();
  };

  const goToAnnouncement = (index) => {
    setCurrentAnnouncement(index);
    resetAnnouncementTimer();
  };

  // Nested scrolling for chapters section on mobile
  // Chapters container scrolls first, then page scrolls when at top/bottom
  useEffect(() => {
    const container = chaptersContainerRef.current;
    if (!container || typeof window === 'undefined') return;

    // Only apply on mobile
    const checkMobile = () => window.innerWidth < 768;
    if (!checkMobile()) return;

    let touchStartY = 0;
    let touchStartScrollTop = 0;

    const handleWheel = (e) => {
      if (!checkMobile()) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // If scrolling up and at top, allow page scroll
      if (e.deltaY < 0 && isAtTop) {
        return; // Allow default page scroll
      }

      // If scrolling down and at bottom, allow page scroll
      if (e.deltaY > 0 && isAtBottom) {
        return; // Allow default page scroll
      }

      // Otherwise, scroll the container and prevent page scroll
      e.preventDefault();
      e.stopPropagation();
      container.scrollTop += e.deltaY;
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartScrollTop = container.scrollTop;
    };

    const handleTouchMove = (e) => {
      if (!checkMobile()) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // Check if we're at the top or bottom
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // If scrolling up at top, allow page scroll
      if (deltaY < 0 && isAtTop) {
        return; // Allow default page scroll
      }

      // If scrolling down at bottom, allow page scroll
      if (deltaY > 0 && isAtBottom) {
        return; // Allow default page scroll
      }

      // Otherwise, prevent page scroll and scroll container
      e.preventDefault();
      e.stopPropagation();
      container.scrollTop = touchStartScrollTop + deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="w-full min-h-screen text-white relative overflow-x-hidden" style={{ backgroundColor: '#FF0000' }}>
      <div className="relative z-10 w-full" style={{ backgroundColor: '#000000' }}>
        <PillNav items={navItems} />

        <Hero
          headline={{
            line1: "IEEE",
             line2: "Student Branch",
          }}
          subtitle="Rajiv Gandhi Institute Of Petroleum Technology"
          buttons={{
            primary: {
              text: "About Us",
              onClick: handleAboutClick,
            },
            secondary: {
              text: "Explore Events",
              onClick: handleEventsClick,
            },
          }}
        />

        {/* Announcement Section - Slider */}
        <section className="w-full py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Slider Container */}
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentAnnouncement * 100}%)` }}
                >
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="min-w-full grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center"
                    >
                      {/* Image Poster - Left Side */}
                      <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-lg">
                        <img
                          src={announcement.image}
                          alt={announcement.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text Content - Right Side */}
                      <div className="space-y-4 md:space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                          <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                            {announcement.badge}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                          {announcement.title}
                        </h2>
                        <p className="text-base md:text-lg text-white/70 leading-relaxed">
                          {announcement.description}
                        </p>
                        <p className="text-base md:text-lg text-white/70 leading-relaxed">
                          {announcement.description2}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Link
                            href={announcement.primaryButton.href}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
                          >
                            {announcement.primaryButton.text}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href={announcement.secondaryButton.href}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                          >
                            {announcement.secondaryButton.text}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPreviousAnnouncement}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Previous announcement"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </button>
              <button
                onClick={goToNextAnnouncement}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Next announcement"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {announcements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToAnnouncement(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentAnnouncement
                        ? "bg-white w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to announcement ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Immersive IEEE video - Reduced padding */}
        <section className="w-full py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] bg-black flex justify-center items-center">
            <video
              ref={videoRef}
              className="w-full min-h-[40vh] md:min-h-[60vh] object-contain mx-auto"
              src="/videos/ieee_v2.mp4"
              autoPlay
              loop
              playsInline
              muted={isVideoMuted}
            />
            <button
              onClick={toggleVideoAudio}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-sm font-semibold tracking-wide hover:bg-white/25 transition"
            >
              {isVideoMuted ? "🔊 Audio" : "🔇 Mute"}
            </button>
          </div>
        </section>

        {/* IEEE Chapters showcase - Reduced padding and tighter spacing */}
        <section
          id="chapters"
          className="w-full py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12"
        >
          <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/50">
              Chapters
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
              IEEE Societies & Fellowships
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              Scroll to explore the four verticals steering innovation at
              IEEE RGIPT — each tile jumps you into its deep dives, labs,
              and flagship releases.
            </p>
          </div>
          
          {/* Mobile: Vertical scrollable grid with scrollbar */}
          <div className="md:hidden">
            <div 
              ref={chaptersContainerRef}
              className="chapters-vertical-scroll max-h-[70vh] overflow-y-auto overflow-x-hidden"
              style={{
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div className="grid grid-cols-1 gap-4 p-2">
                {chapterCards.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={chapter.href}
                    className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition cursor-pointer"
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-3xl bg-gradient-to-br ${chapter.accent}`}
                    />
                    <div className="relative z-10 space-y-2">
                      <span
                        className={`inline-flex text-xs tracking-[0.4em] uppercase px-3 py-1 rounded-full bg-gradient-to-r ${chapter.accent} text-white/90`}
                      >
                        {chapter.title}
                      </span>
                      <h3 className="text-xl font-semibold">{chapter.subtitle}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>
                    <div className="relative z-10 mt-4 text-sm font-semibold text-white/80 group-hover:text-white transition flex items-center gap-2">
                      Jump In
                      <span className="inline-flex w-7 h-7 rounded-full border border-white/30 items-center justify-center group-hover:translate-x-1 transition text-sm">
                        ↗
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Original ContainerScroll */}
          <div className="hidden md:block">
            <ContainerScroll
              titleComponent={null}
            >
              <div className="grid grid-cols-2 gap-4 md:gap-5 h-full w-full p-4 md:p-6">
                {chapterCards.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={chapter.href}
                    className="group relative p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl h-full flex flex-col justify-between hover:border-white/30 transition cursor-pointer"
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-3xl bg-gradient-to-br ${chapter.accent}`}
                    />
                    <div className="relative z-10 space-y-2">
                      <span
                        className={`inline-flex text-xs tracking-[0.4em] uppercase px-3 md:px-4 py-1 rounded-full bg-gradient-to-r ${chapter.accent} text-white/90`}
                      >
                        {chapter.title}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold">{chapter.subtitle}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>
                    <div className="relative z-10 mt-4 text-sm font-semibold text-white/80 group-hover:text-white transition flex items-center gap-2">
                      Jump In
                      <span className="inline-flex w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/30 items-center justify-center group-hover:translate-x-1 transition text-sm">
                        ↗
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </ContainerScroll>
          </div>
        </section>

        {/* Interactive Lanyard - Reduced padding */}
        <section className="w-full py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <Suspense fallback={
              <div className="h-[50vh] md:h-[60vh] flex items-center justify-center text-white/60 text-base">
                Loading interactive badge…
              </div>
            }>
              <Lanyard />
            </Suspense>
          </div>
        </section>

        {/* Membership CTA - Reduced padding and tighter internal spacing */}
        <section className="w-full py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto rounded-2xl md:rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl p-6 md:p-8 space-y-4 md:space-y-6 text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/60">
              Become A Member
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              Access perks, labs, and the IEEE RGIPT portal
            </h2>
            <p className="text-white/70 text-base max-w-3xl mx-auto">
              Join us to unlock chapter-specific mentorship, lab reservations,
              and the unified payment portal (₹2200 via Razorpay) that keeps
              your membership active across all societies.
            </p> 
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/membership"
                className="px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 font-semibold text-base text-white shadow-lg shadow-purple-500/40 hover:scale-[1.02] transition"
              >
                View Perks & Join
              </Link>
              <Link
                href="/signin"
                className="px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl border border-white/30 text-base text-white/90 hover:text-white hover:border-white/60 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl border border-white/30 text-base text-white/90 hover:text-white hover:border-white/60 transition"
              >
                Sign Up
              </Link>
            </div>
            <p className="text-xs text-white/60 pt-2">
              Secure Razorpay payments, instant receipts, and member dashboard
              access the moment your ₹2200 fee is confirmed.
            </p>
          </div>
        </section>

        {/* Sponsors Section - Infinite scrolling */}
        <SponsorsSection sponsors={sponsorsData} />

        {/* Events sections - Reduced padding */}
        <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <EventsSection />
        </div>

        {/* Gallery section - Added after 
         IEEE events */}
        <section className="w-full py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              Gallery
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              Explore our collection of moments and memories from IEEE events and activities.
            </p>
          </div>
          <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
            <Suspense fallback={
              <div className="h-full flex items-center justify-center text-white/60 text-base">
                Loading gallery…
              </div>
            }>
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-white/60">Loading gallery...</div>}>
                <DomeGallery 
                images={picturesData.images.slice(0, 20)}
                fit={0.8}
                minRadius={600}
                maxRadius={800}
                grayscale={false}
                openedImageWidth="600px"
                openedImageHeight="600px"
                segments={18}
                autoRotateSpeed={0.06}
                />
              </Suspense>
            </Suspense>
          </div>
        </section>

           
        
        <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <PastEventsTimeline />
        </div>

        <Footer />
      </div>
    </div>
  );
}