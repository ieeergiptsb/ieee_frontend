"use client"
import React from 'react';

const WhatWeDo = () => {
  const features = [
    {
      title: 'Technical Competitions',
      description:
        'Participate in coding contests, hackathons, and technical quizzes to showcase your skills.'
    },
    {
      title: 'Speaker Sessions',
      description:
        'Connect with industry professionals through expert talks on emerging technologies.'
    },
    {
      title: 'Workshops & Training',
      description:
        'Learn cutting-edge technologies through hands-on workshops and training sessions.'
    }
  ];

  return (
    <section className="relative w-full bg-black/0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28">
        <h2 className="text-center text-4xl md:text-6xl font-extrabold text-blue-200">
          What We Do
        </h2>
        <p className="text-center text-purple-200/90 mt-6 max-w-3xl mx-auto">
          IEEE RGIPT is dedicated to fostering technical excellence and innovation among students
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 md:p-10 text-white/90 shadow-xl shadow-purple-900/20 hover:shadow-purple-700/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500/80 flex items-center justify-center text-white/90 shadow-lg shadow-indigo-900/40 mb-6">
                <span className="text-xl">{i === 0 ? '🏅' : i === 1 ? '👥' : '📘'}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{f.title}</h3>
              <p className="text-purple-200/90 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#join"
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-900/30"
          >
            Join Our Community <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;


