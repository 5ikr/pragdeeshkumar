"use client";

import { useRef } from "react";
import TargetCursor from "./ui/TargetCursor";

const About = () => {
  //  FIX: Changed from HTMLElement to HTMLDivElement
  const containerRef = useRef<any>(null);

  return (
    <section id="About" data-theme="light" className="w-full h-[200vh]">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#ffffff"
        cursorColorOnTarget="#B497CF"
      />
    </section>
  );
};

export default About;
