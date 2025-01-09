"use client";

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-500 text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-3xl font-bold tracking-wider">POKEDEX</h1>
      </div>
    </nav>
  );
};

export default Navbar;
