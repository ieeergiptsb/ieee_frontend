'use client';
import React from 'react';
import { motion } from 'framer-motion';

import { CometCard } from "@/components/ui/comet-card";

const teamMembers = [
  {
    name: 'Arindol Sarkar',
    role: 'CS Secretary',
    image: '/Arindol.jpeg',
  },
  {
    name: 'Keshav Kashyap',
    role: 'CS Vice-Secretary',
    image: '/keshav.jpeg',
  },
  {
    name: 'Prashant Singh',
    role: 'CS Vice-Secretary',
    image: '/prashant.jpeg',
  },
  {
    name: 'Akash Rai',
    role: 'Webmaster',
    image: '/akash_rai.jpeg',
  },
];

const executives = [
  {
    name: 'Arjav Jain',
    role: 'Executive',
    image: '/Arjav.jpeg',
  },
  {
    name: 'Trisha Khattri',
    role: 'Executive',
    image: '/trisha_khattri.jpeg',
  },
  {
    name: 'Sagnik Roy',
    role: 'Executive',
    image: '/sagnik_roy.jpeg',
  },
  {
    name: 'Bhargav Venkat',
    role: 'Executive',
    image: '/Bhargav.jpeg',
  },
  {
    name: 'Saksham Shreyas',
    role: 'Executive',
    image: '/Saksham.jpeg',
  },
];

export default function CSTeam() {
  return (
    <section className="bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet The <span className="text-green-500">Team</span>
          </h2>
          <p className="text-gray-400">The minds behind the machines.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="w-64 sm:w-64 md:w-64 xl:w-[17.5rem] shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CometCard>
                <button
                  type="button"
                  className="group flex w-full cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:p-4 transition-all duration-500"
                  aria-label={`View ${member.name}`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "none",
                    opacity: 1,
                  }}
                >
                  <div className="mx-2 flex-1">
                    <div className="relative mt-2 aspect-[3/4] w-full">
                      <img
                        loading="lazy"
                        className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover transition-all duration-500"
                        alt={member.name}
                        src={member.image}
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                          opacity: 1,
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex flex-shrink-0 items-center justify-between p-3 md:p-4 font-mono text-white gap-2">
                    <div className="text-xs md:text-sm font-semibold truncate">{member.name}</div>
                    <div className="text-[10px] md:text-xs text-emerald-400 opacity-80 uppercase tracking-wider shrink-0">{member.role}</div>
                  </div>
                </button>
              </CometCard>
            </motion.div>
          ))}
        </div>

        {/* Executives Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-24 mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Executives
          </h3>
          <div className="w-16 h-1 bg-green-500/50 mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {executives.map((member, index) => (
            <motion.div
              key={`exec-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-48 md:w-56 lg:w-[13.5rem] xl:w-56 shrink-0"
            >
              <CometCard>
                <button
                  type="button"
                  className="group flex w-full cursor-pointer flex-col items-stretch rounded-[12px] border-0 bg-[#1F2121] p-2 md:p-3 transition-all duration-500"
                  aria-label={`View ${member.name}`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "none",
                    opacity: 1,
                  }}
                >
                  <div className="mx-2 flex-1">
                    <div className="relative mt-2 aspect-[3/4] w-full">
                      <img
                        loading="lazy"
                        className="absolute inset-0 h-full w-full rounded-[12px] bg-[#000000] object-cover transition-all duration-500"
                        alt={member.name}
                        src={member.image}
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                          opacity: 1,
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col items-center justify-center p-3 font-mono text-white text-center">
                    <div className="text-xs md:text-sm font-semibold">{member.name}</div>
                    <div className="text-[10px] md:text-xs text-emerald-400 opacity-80 uppercase tracking-wider mt-1">{member.role}</div>
                  </div>
                </button>
              </CometCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
