'use client';
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'RepoIntel',
    category: 'MCP',
    image: '/project_1.png',
    link: 'https://github.com/jainarjav80-sys/RepoIntel',
  },
  {
    id: 2,
    title: 'SanRaksha',
    category: 'App Development',
    image: '/project2.png',
    link: 'https://github.com/sys6-exe/SanRaksha',
  }
];

export default function CSProjects() {
  const infiniteProjects = [...projects, ...projects];

  return (
    <section className="relative bg-transparent py-16 overflow-hidden">
      <div className="flex flex-col justify-center">

        {/* Header Content */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white text-center">
              What <span className="text-green-500">WE</span> do
              <div className="w-32 h-1 bg-green-500/50 mx-auto mt-6" />
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-5xl mx-auto leading-relaxed font-light text-center">
              At <span className="text-emerald-400 font-semibold">IEEE CS Society, RGIPT</span>, under the EEE Department, we focus on learning by building—developing projects in Web Development, App Development, AI/ML, and Generative AI, while strengthening problem-solving through CP and DSA. We organize hackathons, workshops, and technical events, and encourage students to explore open-source contributions, collaboration, and real-world innovation.
            </p>
            <div className="w-full h-[1px] bg-gray-800 mt-12" />
          </motion.div>
        </div>

        {/* Continuous Sliding Cards */}
        <div className="w-full mt-4">
          <div className="px-6 md:px-12">
            <h3 className="text-white text-3xl font-bold mb-6 tracking-wider">PROJECTS</h3>
          </div>
          <div className="flex overflow-hidden group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-6 w-max px-6 pb-8"
            >
              {infiniteProjects.map((project, idx) => {
                const CardWrapper = project.link ? 'a' : 'div';
                return (
                  <CardWrapper
                    key={`${project.id}-${idx}`}
                    href={project.link}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    className="w-[300px] md:w-[450px] shrink-0 flex flex-col gap-4 cursor-pointer no-underline"
                  >
                    <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden bg-[#0A0A0A] border border-gray-800 transition-colors hover:border-emerald-500/50 rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-bold tracking-wider mb-1 uppercase">
                        {project.category}
                      </p>
                      <h3 className="text-white text-2xl font-semibold hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </CardWrapper>
                );
              })}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
