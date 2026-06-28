"use client";

import "../components/ui/TargetCursor.css";

import { useEffect, useState, useRef } from "react"; // Added useEffect
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const items = [
    { id: 1, label: ".Home", href: "#home" },
    { id: 2, label: ".About", href: "#about" },
    { id: 3, label: ".Skills", href: "#sponsors" },
    { id: 4, label: ".Pricing", href: "#pricing" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const navRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const lightSections = document.querySelectorAll("[data-theme='light']");
      const navBottom = navRef.current?.getBoundingClientRect().bottom ?? 0;

      let overLight = false;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navBottom && rect.bottom >= 0) {
          overLight = true;
        }
      });
      setIsLight(overLight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount too
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed w-full h-full z-50 ">
      {isMenuOpen ? (
        isLight ? (
          <button
            ref={navRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-target closeBtn group fixed top-3 right-3 flex h-16 w-16 items-center justify-center bg-transparent"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rotate-45">
              <span className="absolute h-1 w-8 bg-black/70 transition"></span>
              <span className="absolute h-8 w-1 bg-black/70 transition"></span>
            </div>
          </button>
        ) : (
          <button
            ref={navRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-target closeBtn group fixed top-3 right-3 flex h-16 w-16 items-center justify-center bg-transparent"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rotate-45">
              <span className="absolute h-1 w-8 bg-white/70 transition"></span>
              <span className="absolute h-8 w-1 bg-white/70 transition"></span>
            </div>
          </button>
        )
      ) : (
        <button
          ref={navRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-target group fixed top-3 right-3 flex h-16 w-16 items-center justify-center bg-transparent"
        >
          <div className="relative z-10 flex flex-col gap-1.5 items-center ">
            <span
              className={`block h-[2px] w-6 transition group-hover:w-5 ${isLight ? "bg-black/70" : "bg-white/70"}`}
            ></span>
            <span
              className={`block h-[2px] w-8 transition-w-9 group-hover:w-9 ${isLight ? "bg-black/70" : "bg-white/70"}`}
            ></span>
          </div>
        </button>
      )}
      {isMenuOpen ? (
        <div
          className={`mob-items isOpenAnimation w-full h-full text-[#E1DCC9] bg-[#444] grid grid-cols-2`}
        >
          <ul className="w-full pl-60 h-full flex items-center px-12 justify-center flex-col">
            {items.map((item) => (
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="nav-items text-6xl mb-10"
                key={item.id}
              >
                <a href={item.href} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <ul className="right-bar pr-60 w-full h-full flex flex-col items-center justify-center gap-40">
            <div className="flex items-start justify-between flex-col px-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a href="#" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  Projects
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a href="#" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  Team
                </a>
              </motion.li>
            </div>
            <div className="px-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a href="#" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  Contact
                </a>
              </motion.li>
            </div>
          </ul>
        </div>
      ) : (
        <div
          className={`mob-items isCloseAnimation w-full h-full text-[#E1DCC9] bg-[#444] grid grid-cols-2`}
        >
          <ul className="w-full h-full pl-60 flex items-center px-12 justify-center flex-col">
            {items.map((item) => (
              <li className="nav-items text-6xl mb-10" key={item.id}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <ul className="right-bar pr-60 w-full h-full flex flex-col items-center justify-center gap-40">
            <div className="flex items-start justify-between flex-col px-4">
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
            </div>
            <div className="px-4">
              <li>
                <a href="#">Contact</a>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
