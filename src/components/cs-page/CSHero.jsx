'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CSHero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Content */}
        <div className="flex flex-col space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-xs font-mono uppercase tracking-wider">System Status: Online</span>
          </div>

          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter"
            >
              COMPUTER
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-cyan-400 leading-none tracking-tighter"
            >
              SOCIETY
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono text-gray-400 space-y-2"
          >
            <p>{'>'} Empowering the next generation of developers.</p>
            <p>{'>'} Compiling knowledge into action.</p>
            <p>{'>'} Executing innovation.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono tracking-tight transition-colors">
              INITIALIZE_EVENTS
            </button>
            <button className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-mono transition-colors">
              JOIN_NETWORK
            </button>
          </motion.div>
        </div>

        {/* Right Content - Terminal/Code Block */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-[#111] border border-gray-800 rounded-xl p-6 font-mono text-sm md:text-base shadow-2xl relative overflow-hidden"
        >
          {/* Subtle grid pattern inside terminal */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="flex space-x-2 mb-6 relative z-10">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          <div className="text-gray-300 relative z-10">
            <span className="text-purple-400">const</span> society = {'{'}
            <br />
            <span className="pl-4 text-cyan-300">name:</span> <span className="text-emerald-400">"IEEE Computer Society"</span>,
            <br />
            <span className="pl-4 text-cyan-300">mission:</span> <span className="text-emerald-400">"Empower Innovators"</span>,
            <br />
            <span className="pl-4 text-cyan-300">status:</span> <span className="text-emerald-400">"ONLINE"</span>,
            <br />
            <span className="pl-4 text-cyan-300">members:</span> <span className="text-orange-400">300+</span>,
            <br />
            <span className="pl-4 text-cyan-300">skills:</span> [<span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"AI/ML"</span>, <span className="text-emerald-400">"Cloud"</span>]
            <br />
            {'}'};
            <br />
            <br />
            <span className="text-purple-400">function</span> <span className="text-blue-400">init</span>() {'{'}
            <br />
            <span className="pl-4 text-purple-400">return</span> <span className="text-emerald-400">"Future Loaded"</span>;
            <br />
            {'}'}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
