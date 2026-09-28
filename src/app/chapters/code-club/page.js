"use client";

import React from "react";
import PillNav from "@/components/ui/PillNav";
import DeltaForceHero from "@/components/cs-page/DeltaForceHero";
import CSAbout from "@/components/cs-page/CSAbout";
import CSProjects from "@/components/cs-page/CSProjects";
import CSTeam from "@/components/cs-page/CSTeam";
import TopoField from "@/components/ui/topo-field";

const navItems = [
  { label: "IEEE", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Chapters", href: "#chapters" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function CSSocietyPage() {
  return (
    <div className="relative min-h-screen bg-black w-full">
      {/* 
        TopoField renders as a fixed background via its internal iframe sandbox.
        We position it absolutely/fixed to sit behind all content.
      */}
      <TopoField className="fixed inset-0 z-0 opacity-100 pointer-events-none" />
      
      <div className="relative z-10 bg-transparent text-white font-sans overflow-x-hidden">
        <PillNav items={navItems} />

        <main>
          {/* 1. Landing in place of delta force */}
          <DeltaForceHero />

          {/* 2. Who we are */}
          <CSAbout />

          {/* 3. Projects with sliding animation */}
          <CSProjects />

          {/* 4. Meet Team */}
          <CSTeam />
        </main>
      </div>
    </div>
  );
}