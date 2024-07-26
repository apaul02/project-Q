"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FeatureCard from "../components/FeatureCard";
import Navbar from "../components/Navbar";
import styles from "../styles/Herobanner.module.css";

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Adjust this value as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto px-4 relative">
      <header
        className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
          isScrolled ? "bg-transparent" : ""
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <div
            className={`flex items-center transition-opacity duration-300 ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src="/images/brand-icon.png"
              alt="Brand icon"
              width={52}
              height={52}
              className="mr-2"
            />
            <div className="font-solway text-[#292828] text-4xl tracking-wide leading-tight whitespace-nowrap">
              ezPrep AI
            </div>
          </div>
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "absolute left-1/2 transform -translate-x-1/2" : ""
            }`}
          >
            <Navbar />
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row justify-between items-center mb-16 mt-16">
        <div className="md:w-5/12 mb-8 md:mb-0 pr-8">
          {" "}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Master New Skills With ProjectQ
          </h1>
          <p className="text-lg md:text-xl mb-8 font-coolvetica">
            Are you tired of pulling one nighter and still failing your exams?
            <br />
            Well don't worry we got you covered!!
          </p>
          <Link href="/generate" className="btn-primary text-lg">
            Get Started
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="md:w-7/12 md:-mr-32">
          <div className={styles.floatingImage}>
            <Image
              src="/images/herobanner.png"
              alt="Astronaut"
              width={1000}
              height={1140}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </main>

      <section className="flex flex-col md:flex-row justify-between">
        <FeatureCard
          icon="/icons/user-friendly.png"
          title="User Friendly"
          description="AI-powered learning platforms offer intuitive, personalized experiences for effortless skill acquisition and enjoyable knowledge growth."
        />
        <FeatureCard
          icon="/icons/learning.png"
          title="Flashcard Learning"
          description="AI-powered flashcards offer personalized, adaptive learning to efficiently master new concepts and retain information."
        />
        <FeatureCard
          icon="/icons/grow.png"
          title="Grow Your Way"
          description="Embrace AI-powered learning to unlock your full potential. Personalized, adaptive experiences help you acquire skills and knowledge at your pace, staying ahead."
        />
      </section>
    </div>
  );
};

export default Home;
