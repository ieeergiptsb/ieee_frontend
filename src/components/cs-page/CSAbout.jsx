'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function CSAbout() {
  return (
    <section className="bg-transparent text-white py-32 px-6 overflow-hidden relative">
      <div className="max-w-5xl mx-auto text-center z-10 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mb-12 tracking-tight"
        >
          Who <span className="text-green-500">WE</span> are ?
          <div className="w-32 h-1 bg-green-500/50 mx-auto mt-6" />
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-2xl leading-relaxed font-light text-center space-y-6"
        >
          <p>
            IEEE CS Society at RGIPT operates under the Department of Electrical and Electronics Engineering (EEE), fostering a community of students passionate about technology, innovation, and problem-solving. We create opportunities for students to learn beyond the classroom through hackathons, technical workshops, coding events, project-based initiatives, and collaborative learning.
          </p>
          <p>
            Our goal is to build a culture where students explore ideas, build real-world solutions, and learn by doing. From organizing hackathons and hands-on workshops to encouraging open-source contributions and technical projects, we provide a platform for students to transform their ideas into impactful solutions.
          </p>
          <p className="pt-8 text-2xl md:text-4xl font-semibold tracking-widest text-white">
            We <span className="text-green-500">learn.</span> We <span className="text-green-500">build.</span> We <span className="text-green-500">collaborate.</span> We <span className="text-green-500">innovate.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
