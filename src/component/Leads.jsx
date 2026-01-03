import { useRef } from "react";
import Card from "./Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Leads = () => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    const cards = cardRefs.current;

    const positions = [14, 38, 62, 86];
    const rotations = [-15, -7.5, 7.5, 15];
    const totalScrollHeight = window.innerHeight * 1.2;

    // GSAP owns transform
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
    });

    /* ======================
       PIN + SPREAD
       ====================== */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "25% top",
        end: `+=${totalScrollHeight}`,
        scrub: 0.8,
        pin: true,
        markers: true,
      },
    });

    tl.to(cards, {
      left: (i) => `${positions[i]}%`,
      rotate: (i) => rotations[i],
      stagger: 0.08,
      ease: "none",
    });

    /* ======================
       FLIP (SYNCED)
       ====================== */
    cards.forEach((card, index) => {
      const frontEl = card.querySelector(".flip-card-front");
      const backEl = card.querySelector(".flip-card-back");

      if (!frontEl || !backEl) return;

      const staggerOffset = index * 0.05;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;

      ScrollTrigger.create({
        trigger: container.current,
        start: "20% top",
        end: `+=${totalScrollHeight}`,
        scrub: 1,
        id: `rotate-flip-${index}`,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < startOffset || progress > endOffset) return;

          const animationProgress =
            (progress - startOffset) / (1 / 3);

          gsap.set(frontEl, {
            rotateY: -100 * animationProgress,
          });

          gsap.set(backEl, {
            rotateY: 100 - 100 * animationProgress,
          });

          gsap.set(card, {
            rotate: rotations[index] * (1 - animationProgress),
          });
        },
      });
    });
  }, { scope: container });

  return (
    <div className="w-full h-full">
      <div ref={container} className="w-full h-full">

        <section className="relative w-screen h-screen bg-black">
          <h1 className="absolute top-1/2 left-1/2 
                         -translate-x-1/2 -translate-y-1/2
                         text-white text-center text-[5vw] font-light">
            Keep Scrolling to <br /> reveal the cards
          </h1>
        </section>

        <section className="relative w-screen h-screen">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              id={`card-${index + 1}`}
              frontSrc="./images/card.png"
              frontAlt="Card Images"
                backSrc="./images/back.png"
                backAlt="back image"
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </section>

        <section className="relative w-screen h-screen bg-black">
          <h1 className="absolute top-1/2 left-1/2 
                         -translate-x-1/2 -translate-y-1/2
                         text-white text-center text-[5vw] font-light">
            Footer or upcoming Section
          </h1>
        </section>

      </div>
    </div>
  );
};

export default Leads;
