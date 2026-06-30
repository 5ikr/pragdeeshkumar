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
  const [isClosing, setIsClosing] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const navRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsClosing(false);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    if (!isMenuOpen || isClosing) return;
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 1750);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

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
      <button
        ref={navRef}
        onClick={isMenuOpen ? closeMenu : openMenu}
        className="cursor-target group fixed top-3 right-3 flex h-16 w-16 items-center justify-center bg-transparent z-[60]"
      >
        <div className="relative flex items-center justify-center w-8 h-8">
          <motion.span
            className={`absolute h-[2px] rounded-full ${isLight && !isMenuOpen ? "bg-black/70" : "bg-white/70"
              }`}
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 0 : -4,
              width: isMenuOpen ? 32 : 24,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
          />
          <motion.span
            className={`absolute h-[2px] rounded-full ${isLight && !isMenuOpen ? "bg-black/70" : "bg-white/70"
              }`}
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? 0 : 4,
              width: isMenuOpen ? 32 : 32,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
          />
        </div>
      </button>
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="menu-overlay"
            className={`mob-items isOpenAnimation w-full h-full text-[#fff] ${isClosing ? " panels-exiting" : ""}`}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.75, ease: "easeInOut" }}
          >
            <div className="cont-1 absolute bg-[#E1DCC9] z-10"></div>
            <div className="cont-2 absolute bg-[#A8A29A] z-20"></div>
            <div className="cont-3 absolute bg-[#3A3A3A] z-30"></div>
            <div className="cont-4 absolute bg-[#0A0A0A] z-40"></div>
            <ul className="w-full h-full flex items-center px-12 justify-center flex-col absolute z-50">
              {items.map((item, index) => (
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isClosing
                      ? { opacity: 0, y: 20 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: isClosing ? 0 : 1.5 + index * 0.25,
                  }}
                  className="cursor-target nav-items text-8xl mb-10"
                  key={item.id}
                >
                  <a href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
