"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PillNav from "@/components/ui/PillNav";
import { 
  Bot, 
  Cpu, 
  Zap, 
  Target, 
  Users, 
  Award, 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  Code, 
  Microchip, 
  Cog, 
  Radio, 
  Wifi, 
  Signal, 
  Activity, 
  Globe, 
  RadioReceiver,
  Antenna
} from "lucide-react";

const navItems = [
  { label: "IEEE", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Chapters", href: "#chapters" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

// --- Custom CSS for Signal/Wave Effects ---
const styleTag = `
  @keyframes wave-drift {
    0% { transform: translateX(0) translateZ(0) scaleY(1); }
    50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
    100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
  }

  @keyframes radar-ping {
    0% { transform: scale(0); opacity: 0.8; }
    100% { transform: scale(2); opacity: 0; }
  }

  @keyframes float-y {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse-height {
    0%, 100% { height: 20%; }
    50% { height: 80%; }
  }

  .animate-wave {
    animation: wave-drift 10s linear infinite;
  }

  .animate-radar {
    animation: radar-ping 3s infinite cubic-bezier(0, 0, 0.2, 1);
  }

  .animate-float {
    animation: float-y 6s ease-in-out infinite;
  }

  .bg-signal-grid {
    background-image: 
      linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;

// --- Components ---

const WaveBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
    {/* Background Gradients adapted for Black */}
    <div className="absolute top-[40%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,transparent_20%,#000000_20%,#000000_80%,transparent_80%,transparent),radial-gradient(circle,transparent_20%,#000000_20%,#000000_80%,transparent_80%,transparent)] bg-[size:50px_50px] [transform:rotateX(60deg)]" />
    
    {/* Animated Sine Waves */}
    <svg className="absolute bottom-0 left-0 w-[200%] h-64 text-cyan-500/10 animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
    </svg>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, idx }) => {
  return (
    <div 
      className="group relative p-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 hover:from-cyan-400/40 hover:to-blue-500/40 transition-all duration-500"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      <div className="absolute inset-0 bg-cyan-500/5 blur-xl group-hover:bg-cyan-400/10 transition-colors" />
      <div className="relative h-full bg-[#050505] p-6 rounded-xl border border-cyan-500/10 group-hover:border-cyan-400/30 overflow-hidden">
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />

        <div className="mb-4 inline-flex p-3 rounded-lg bg-cyan-900/20 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>

        {/* Decorative Circuit Lines */}
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-cyan-400">
            <path d="M10 90 L40 90 L50 80 L90 80" strokeWidth="2" />
            <circle cx="90" cy="80" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const ActivityCard = ({ title, description, idx }) => {
  return (
    <div className="relative flex items-start gap-6 p-6 group">
      {/* Timeline Node */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-cyan-900/50 group-hover:bg-cyan-500/50 transition-colors"></div>
      <div className="absolute left-[-4px] top-8 w-2 h-2 rounded-full bg-cyan-900 border border-cyan-500 group-hover:bg-cyan-400 group-hover:scale-150 transition-all shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>

      <div className="flex-1 bg-white/5 border border-cyan-500/10 rounded-lg p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group-hover:translate-x-2">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{title}</h4>
          <Activity className="w-4 h-4 text-cyan-700 group-hover:text-cyan-400" />
        </div>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

const StatCounter = ({ label, value }) => (
  <div className="text-center p-4 border-r border-cyan-900/30 last:border-r-0">
    <div className="text-3xl font-bold text-white mb-1 animate-pulse">{value}</div>
    <div className="text-xs uppercase tracking-widest text-cyan-500/70 font-semibold">{label}</div>
  </div>
);

export default function COMSOCPage() {
  const features = [
    {
      icon: Microchip,
      title: "Embedded Systems",
      description: "Program microcontrollers and design robust embedded architectures for real-time communication devices."
    },
    {
      icon: Wifi,
      title: "IoT & Wireless",
      description: "Deploy sensor networks using Zigbee, LoRaWAN, and BLE. Build the connected future."
    },
    {
      icon: Signal,
      title: "Signal Processing",
      description: "Master DSP algorithms. Analyze audio, image, and bio-signals using MATLAB and Python."
    },
    {
      icon: Target,
      title: "System Design",
      description: "Compete in circuit design challenges and prototype communication modules."
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Access IEEE ComSoc's vast network of researchers, standards, and industry leaders."
    },
    {
      icon: BookOpen,
      title: "Tech Seminars",
      description: "Deep dives into 5G/6G, Satellite Comms, and Cognitive Radio networks."
    }
  ];

  const activities = [
    {
      title: "Wireless Sensor Networks",
      description: "Design and implement scalable WSNs for environmental monitoring and smart city data collection."
    },
    {
      title: "RFID & NFC Systems",
      description: "Develop secure access control and automation systems using near-field communication protocols."
    },
    {
      title: "Digital Signal Processing",
      description: "Apply filtering and Fourier transforms to clean noisy signals in real-time applications."
    },
    {
      title: "Smart Antenna Design",
      description: "Simulate and build beamforming antennas for optimized signal reception."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      <style>{styleTag}</style>
      <PillNav items={navItems} />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-signal-grid opacity-10 pointer-events-none z-0" />

      <main className="relative z-10 pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
          <WaveBackground />
          
          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md animate-float">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Signal Transmission Active</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight">
              CONNECTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">
                THE WORLD
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Pioneering the future of Communication Systems, Signal Processing, and IoT technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="/events" className="group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore Events <RadioReceiver className="w-4 h-4" />
                </span>
              </a>
              <a href="/contact" className="px-8 py-4 border border-cyan-500/30 text-cyan-400 font-bold rounded-lg hover:bg-cyan-950/30 transition-colors">
                Join the Network
              </a>
            </div>

            {/* Oscilloscope Visual */}
            <div className="mt-16 h-24 w-full max-w-3xl mx-auto border-b border-cyan-900/50 flex items-end justify-between px-4 opacity-50">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 bg-cyan-500/50 rounded-t-sm transition-all duration-500"
                  style={{ 
                    height: `${Math.random() * 100}%`,
                    animation: `pulse-height 1s ease-in-out infinite ${i * 0.1}s`
                  }} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <div className="border-y border-cyan-900/30 bg-black/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCounter label="Active Members" value="150+" />
            <StatCounter label="Projects" value="25+" />
            <StatCounter label="Workshops" value="12/yr" />
            <StatCounter label="Frequencies" value="∞" />
          </div>
        </div>

        {/* Features Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Core <span className="text-cyan-400">Domains</span>
                </h2>
                <p className="text-slate-400 max-w-lg">
                  Explore the fundamental pillars of modern communication engineering.
                </p>
              </div>
              <div className="hidden md:block text-cyan-500/30">
                <Cpu className="w-12 h-12" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <FeatureCard key={idx} {...feature} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Activities & Flow */}
        <section className="py-24 bg-black relative border-t border-cyan-900/30">
          {/* Radar Animation Overlay */}
          <div className="absolute right-0 top-0 w-[600px] h-[600px] opacity-10 pointer-events-none overflow-hidden">
             <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-radar" />
             <div className="absolute inset-[20%] border border-cyan-500/30 rounded-full animate-radar" style={{ animationDelay: '1s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Active <span className="text-teal-400">Projects</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                From designing antennas to decoding signals, our members are constantly engaged in hands-on technical projects that push the boundaries of connectivity.
              </p>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/20 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Globe className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">Global Impact</h3>
                </div>
                <p className="text-slate-400 text-sm">
                  Our projects aim to solve real-world connectivity issues in remote areas using low-power wide-area network technologies.
                </p>
              </div>
            </div>

            <div className="space-y-4 relative pl-8 border-l border-cyan-900/30">
              {activities.map((activity, idx) => (
                <ActivityCard key={idx} {...activity} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-cyan-950/20 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <Signal className="w-16 h-16 text-cyan-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              TUNE INTO THE <span className="text-cyan-400">FUTURE</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Join a community of engineers shaping how the world connects.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-cyan-50 transition-colors shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Become a Member
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}