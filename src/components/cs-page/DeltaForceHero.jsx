'use client';
import React, { useEffect, useState } from 'react';

export default function DeltaForceHero() {
  const [matrixText, setMatrixText] = useState('');

  // Generate random ASCII background
  useEffect(() => {
    const chars = '01#@%&?[]{}|+*a b c d e f h i j k l m n o p q r s t u v w x y z ';
    let result = '';
    for (let i = 0; i < 2000; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i % 80 === 0) result += '\\n';
    }
    setMatrixText(result);
  }, []);

  const FINAL_TEXT = "WE HACK OUR WAY THROUGH_";
  const [titleText, setTitleText] = useState(FINAL_TEXT);

  const handleScramble = () => {
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
    const interval = setInterval(() => {
      setTitleText(
        FINAL_TEXT.split("")
          .map((letter, index) => {
            if (index < iteration) return FINAL_TEXT[index];
            if (letter === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= FINAL_TEXT.length) clearInterval(interval);
      iteration += 1 / 4;
    }, 50);
  };

  useEffect(() => {
    handleScramble();
  }, []);

  return (
    <div className="relative w-full h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* Green ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/20 blur-[120px] rounded-full -translate-y-1/2" />

      {/* ASCII Art Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 overflow-hidden">
        <pre className="text-green-500 text-[10px] leading-[10px] whitespace-pre text-center select-none">
          {matrixText}
        </pre>
      </div>

      {/* IEEE CS Logo in extreme left corner */}
      <div className="absolute top-2 left-4 md:top-4 md:left-8 z-30">
        <img 
          src="/ieeecs2.png" 
          alt="IEEE CS Logo" 
          className="w-12 h-12 md:w-20 md:h-20 object-contain"
        />
      </div>

      {/* Main Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        <h1 
          className="text-6xl md:text-8xl lg:text-[140px] font-black text-white tracking-tighter leading-none cursor-default" 
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          COMPUTER SOCIETY
        </h1>
        <div className="bg-transparent/50 px-4 py-1 backdrop-blur-sm">
          <p 
            className="text-green-500 text-xl md:text-2xl font-bold tracking-widest uppercase cursor-default"
            onMouseEnter={handleScramble}
          >
            {titleText}
          </p>
        </div>
      </div>
    </div>
  );
}
