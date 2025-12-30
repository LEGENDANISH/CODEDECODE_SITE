import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Sections = () => {
  const sectionRef = useRef(null);
  const codeRef = useRef([]);
  const learnRef = useRef([]);
  const taglineRef = useRef([]);

  useGSAP(() => {
    /* TEXT COLOR ANIMATION */
    const words = [...codeRef.current, ...learnRef.current, ...taglineRef.current];

    gsap.fromTo(
      words,
      { color: "#6b7280", y: 20, opacity: 0 },
      {
        color: "#ffffff",
        y: 0,
        opacity: 1,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1.5,
       
        },
      }
    );
  }, []);

  const splitWords = (text, refArray) =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        ref={(el) => (refArray.current[i] = el)}
        className="mr-2 inline-block transition-all hover:text-indigo-400 hover:scale-110 cursor-default"
      >
        {word}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* DOTTED BACKGROUND */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #6b7280 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/60 to-black pointer-events-none" />

      {/* TEXT CONTENT */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <div className="mb-4 text-sm font-mono text-indigo-400 tracking-widest uppercase">
          Welcome to
        </div>
        
        <h1 className="mb-8 text-7xl md:text-8xl font-black text-gray-500 tracking-tight">
          {splitWords("CODE DECODE", codeRef)}
        </h1>

        <p className="mb-6 text-3xl md:text-4xl font-light text-gray-500 tracking-wide">
          {splitWords("learn something new", learnRef)}
        </p>

        <p className="text-xl md:text-2xl font-mono text-gray-500">
          {splitWords("explore innovate create", taglineRef)}
        </p>

        {/* DECORATIVE ELEMENTS */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Sections;