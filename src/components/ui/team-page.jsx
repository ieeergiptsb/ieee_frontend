"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Users, Code, Cpu, Bot, Sparkles, Radio, Wrench } from 'lucide-react';
import { teamData, generateSlug } from '@/data/team-data';
import ChromaGrid from '@/components/ui/ChromaGrid';

const highlightPalette = [
  { border: '#4F46E5', gradient: 'linear-gradient(145deg,#4F46E5,#000)' },
  { border: '#10B981', gradient: 'linear-gradient(210deg,#10B981,#000)' },
  { border: '#F59E0B', gradient: 'linear-gradient(165deg,#F59E0B,#000)' },
  { border: '#EF4444', gradient: 'linear-gradient(195deg,#EF4444,#000)' },
  { border: '#8B5CF6', gradient: 'linear-gradient(225deg,#8B5CF6,#000)' },
  { border: '#06B6D4', gradient: 'linear-gradient(135deg,#06B6D4,#000)' },
  { border: '#F472B6', gradient: 'linear-gradient(160deg,#F472B6,#000)' },
  { border: '#34D399', gradient: 'linear-gradient(205deg,#34D399,#000)' }
];

const getHandleFromUrl = (url) => {
  if (!url) return null;
  try {
    const host = url
      .replace(/^https?:\/\//, '')
      .replace('www.', '')
      .split('/')[0];
    return `@${host.split('.')[0]}`;
  } catch (error) {
    return null;
  }
};

const buildChromaItems = (
  members = [],
  offset = 0,
  fallbackLocation = 'IEEE RGIPT',
  options = {}
) => {
  return members
    .filter(Boolean)
    .map((member, idx) => {
      const palette = highlightPalette[(offset + idx) % highlightPalette.length];
      const fallbackImg = `https://ui-avatars.com/api/?background=111827&color=fff&name=${encodeURIComponent(
        member.name || ''
      )}`;

      const slug =
        options.slugResolver?.(member) ||
        (member?.name ? generateSlug(member.name) : null);

      return {
        image: member.image || fallbackImg,
        title: member.name,
        subtitle: member.position,
        handle: getHandleFromUrl(member.linkedin),
        location: member.chapter || member.society || member.section || fallbackLocation,
        borderColor: palette.border,
        gradient: palette.gradient,
        url: slug ? `/team/${slug}` : member.linkedin || null
      };
    });
};

const defaultSlugResolver = (member) => (member?.name ? generateSlug(member.name) : null);

const webTeamSlugResolver = (member) => {
  if (!member?.name) return null;
  const base = generateSlug(member.name);
  if (member.name === 'Aditya Bhattacharya' && member.position === 'Web Master') {
    return `${base}-webmaster`;
  }
  return base;
};

const csSlugResolver = (member) => {
  if (!member?.name) return null;
  return `${generateSlug(member.name)}-cs`;
};

const SectionGrid = ({ title, description, icon: Icon, items, columns = 3, radius = 320 }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!items || items.length === 0) return null;

  const rows = Math.max(1, Math.ceil(items.length / columns));

  return (
    <section ref={sectionRef} className="mb-20 md:mb-28">
      <div
        className={`mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          {Icon && (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Icon className="w-6 h-6 text-purple-300" />
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        </div>
        {description && (
          <p className="text-white/65 text-base md:text-lg max-w-3xl">
            {description}
          </p>
        )}
      </div>

      <ChromaGrid
        items={items}
        columns={columns}
        rows={rows}
        radius={radius}
        className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6"
      />
    </section>
  );
};

const TeamPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  let paletteOffset = 0;

  const executiveMembers = [
    teamData.executive?.chair,
    teamData.executive?.viceChair,
    ...(teamData.executive?.secretaries || []),
    teamData.executive?.treasurer
  ].filter(Boolean);
  const executiveItems = buildChromaItems(executiveMembers, paletteOffset, 'Executive Committee');
  paletteOffset += executiveItems.length;

  const webDesignMembers = [...(teamData.webDesignTeam?.webmasters || [])].filter(Boolean);
  const webDesignItems = buildChromaItems(
    webDesignMembers,
    paletteOffset,
    'Web & Design Team',
    { slugResolver: webTeamSlugResolver }
  );
  paletteOffset += webDesignItems.length;

  const technicalSections = [
    {
      title: 'Computer Society',
      description: 'Driving CS initiatives, workshops, and coding culture.',
      icon: Cpu,
      members: [
        teamData.technicalTeam?.csSecretary,
        ...(teamData.technicalTeam?.csViceSecretaries || [])
      ].filter(Boolean),
      slugResolver: csSlugResolver
    },
    {
      title: 'Robotics & Automation Society',
      description: 'Building innovative robotics and automation experiences.',
      icon: Bot,
      members: [
        teamData.technicalTeam?.rasSecretary,
        ...(teamData.technicalTeam?.rasViceSecretaries || [])
      ].filter(Boolean)
    },
    {
      title: 'Women in Engineering',
      description: 'Championing inclusion, mentorship, and leadership.',
      icon: Sparkles,
      members: [
        teamData.technicalTeam?.wieSecretary,
        ...(teamData.technicalTeam?.wieViceSecretaries || [])
      ].filter(Boolean)
    },
    {
      title: 'Communications Society',
      description: 'Exploring communication systems and networks.',
      icon: Radio,
      members: [
        teamData.technicalTeam?.comsocSecretary,
        ...(teamData.technicalTeam?.comsocViceSecretaries || [])
      ].filter(Boolean)
    }
  ].map((section) => {
    const items = buildChromaItems(
      section.members,
      paletteOffset,
      section.title,
      { slugResolver: section.slugResolver }
    );
    paletteOffset += items.length;
    return { ...section, items };
  });

  const generalItems = buildChromaItems(teamData.generalMembers || [], paletteOffset, 'IEEE RGIPT');

  return (
    <div className="relative min-h-screen py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Users className="w-5 h-5 text-purple-300" />
            <span className="text-purple-300 text-sm font-semibold">Our Team</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Meet Our Team
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            The passionate individuals driving innovation and excellence at IEEE Student Branch, RGIPT
          </p>
        </div>

        {/* Executive Committee */}
        {executiveItems.length > 0 && (
          <SectionGrid
            title="Executive Committee"
            icon={Users}
            description="Guiding the branch with strategic leadership and operational excellence."
            items={executiveItems}
          />
        )}

        {/* Web & Design */}
        {webDesignItems.length > 0 && (
          <SectionGrid
            title="Web & Design Team"
            icon={Code}
            description="Designing, developing, and maintaining our digital footprint."
            items={webDesignItems}
            columns={3}
          />
        )}

        {/* Technical Societies */}
        {technicalSections.map((section) =>
          section.items.length > 0 ? (
            <SectionGrid
              key={section.title}
              title={section.title}
              icon={section.icon}
              description={section.description}
              items={section.items}
              columns={section.items.length >= 4 ? 4 : 3}
            />
          ) : null
        )}

        {/* General Members */}
        {generalItems.length > 0 && (
          <SectionGrid
            title="General Members"
            icon={Wrench}
            description="Volunteers and contributors powering IEEE Student Branch initiatives."
            items={generalItems}
            columns={4}
          />
        )}
      </div>
    </div>
  );
};

export default TeamPage;
