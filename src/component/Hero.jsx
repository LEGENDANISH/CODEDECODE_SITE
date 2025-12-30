import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Sections from "./Sections";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const section2Ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      heroRef.current,
      { scale: 1 , z: 0,},
      {
        scale: 0.82,
        z:-300,
        ease: "none",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 98%",   
          end: "top top",
        //   pin:true,
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div
        ref={heroRef}
        className="flex h-screen w-full items-center justify-center bg-black"
      >
        <div className="h-[95vh] w-[95%] rounded-3xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src="/1.png"
            alt="Hero"
          />
        </div>
      </div>

      {/* SECOND SECTION */}
   <div ref={section2Ref}>
  <Sections />
</div>

    </>
  );
};

export default Hero;
