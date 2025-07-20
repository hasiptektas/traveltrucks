import React from 'react';
import CTAButton from './CTAButton';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center bg-black overflow-hidden">
      <img
        src="/hero.jpg"
        alt="Camper Van Sunset"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ filter: 'brightness(0.7)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="relative z-20 flex flex-col justify-center items-start h-full max-w-2xl ml-16 md:ml-8 sm:ml-4 px-4 text-left">
        <h1 className="text-white text-5xl md:text-4xl sm:text-3xl font-extrabold mb-4 drop-shadow-lg">
          Campers of your dreams
        </h1>
        <p className="text-white text-lg md:text-base mb-8 drop-shadow">
          You can find everything you want in our catalog
        </p>
        <CTAButton>View Now</CTAButton>
      </div>
    </section>
  );
} 