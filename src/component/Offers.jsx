import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Offers = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const offers = [
    "AI / ML",
    "WEB3",
    "Cybersecurity",
    "Frontend",
    "Backend",
    "MERN STACK",
    "DevOps",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - set all items to invisible
      gsap.set(itemsRef.current, {
        opacity: 0,
        y: 30,
      });

      // Set first item visible initially
      gsap.set(itemsRef.current[0], {
        opacity: 1,
        y: 0,
      });


      gsap.set(sectionRef.current,{
        scale:0.85,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${offers.length * 100}%`,
          scrub: 1,
          pin: true,
          markers:true,
        },
      });

      tl.to(sectionRef.current,{
        scale:1,
        ease:"power1.inOut"
      })
      offers.forEach((_, i) => {
        if (i < offers.length - 1) {
          // Fade out current item and fade in next item
          tl.to(itemsRef.current[i], {
            opacity: 0,
            y: -30,
            duration: 1,
          })
          .to(itemsRef.current[i + 1], {
            opacity: 1,
            y: 0,
            duration: 1,
          }, "<");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-white text-black flex items-center justify-center rounded-xl"
    >
      <div className="flex items-center gap-6">
        <div className=" ">
          {/* Left text */}
          <h1 className="text-3xl font-semibold">
            We are offering <br /> to learn
          </h1>

          {/* Arrow */}
        </div>
        <img
          src="./images/arrow.png"
          alt="arrow"
          className="ml-[14%] absolute h-15 w-auto mb-15"
        />

        {/* Scroll-based text */}
        <div className="relative h-[40px] w-[200px] mt-2 overflow-hidden">
          {offers.map((item, i) => (
            <span
              key={item}
              ref={(el) => (itemsRef.current[i] = el)}
              className="absolute left-0 top-0 text-3xl font-bold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;