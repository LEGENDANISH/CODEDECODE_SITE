import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cards = () => {
  const cardContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        }
      });

      // Initial state - cards start together
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        y: 0,
        scale: 1,
      });

      gsap.set(headingRef.current, {
        y: 100,
        opacity: 0,
      });
      gsap.set(cardContainerRef,{
        y:0,
        scale:1
      })
      // Phase 1: Image comes up and scales down + Heading comes from bottom
      tl.to([card1Ref.current, card2Ref.current, card3Ref.current], {
        y: -50,
        
        duration: 1,
        ease: 'power2.inOut',
      }, 0)
      .to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 0)
      .to([cardContainerRef],{
        y:0,
        scale:0.55,
      })
      // Phase 2: Split animation - cards move apart
      .to(card1Ref.current, {
        x: -0.1,
        duration: 1,
      }, 1)
      .to(card2Ref.current, {
        x: 0,
        duration: 1,
      }, 1)
      .to(card3Ref.current, {
        x: 0.1,
        duration: 1,
      }, 1)
      
      // Add gap between cards
      .to(cardContainerRef.current, {
        gap: '1px',
        duration: 1,
      }, 1)

      // Phase 3: Flip animation - all cards rotate 180deg
      .to([card1Ref.current, card2Ref.current, card3Ref.current], {
        rotateY: 180,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 2)

      // Phase 4: Arc formation - cards overlap in an arc structure
      .to(card1Ref.current, {
        x: -100,
        y: 0,
        rotateZ: -15,
        scale: 0.8,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 3.5)
      .to(card2Ref.current, {
        x: 0,
        y: -70,
        rotateZ: 0,
        scale: 0.85,
        zIndex: 10,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 3.5)
      .to(card3Ref.current, {
        x: 100,
        y: 0,
        rotateZ: 15,
        scale: 0.8,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 3.5)
      
      // Remove gap for overlap
      .to(cardContainerRef.current, {
        gap: '0rem',
        duration: 1.5,
      }, 3.5);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Sticky Cards Section */}
      <section ref={sectionRef} className="relative h-screen flex items-center justify-center p-8">
        <div 
          ref={headingRef}
          className="absolute top-[1%] left-1/2 -translate-x-1/2 z-20"
        >
          <h1 className="text-7xl font-bold text-center tracking-wider">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">LEAD</span>
          </h1>
        </div>
  <div 
          ref={cardContainerRef}
          className="relative w-auto h-50 flex gap-0"
          style={{ perspective: '1000px' }}
        >
          {/* Card 1 */}
          <div 
            ref={card1Ref}
            className="relative flex-1 aspect-[5/3]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute w-full h-full rounded-l-3xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
              <img
                src="https://framerusercontent.com/images/uolKRDGr75Q8SViaOcim92JiJ0.jpg?lossless=1"
                alt="Project 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="absolute w-full h-full bg-red-600 rounded-l-3xl flex flex-col items-center justify-center p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <span className="absolute top-8 left-8 text-6xl font-bold opacity-40">01</span>
              <p className="text-2xl font-semibold">Interactive Web Experience</p>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            ref={card2Ref}
            className="relative flex-1 aspect-[5/3]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute w-full h-full overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
              <img
                src="https://framerusercontent.com/images/rPK6zOOnWjLpjrI16Rn9woMqeZI.jpg?lossless=1"
                alt="Project 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="absolute w-full h-full bg-green-600 flex flex-col items-center justify-center p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <span className="absolute top-8 left-8 text-6xl font-bold opacity-40">02</span>
              <p className="text-2xl font-semibold">Creative Digital Solutions</p>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            ref={card3Ref}
            className="relative flex-1 aspect-[5/3]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute w-full h-full rounded-r-3xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
              <img
                src="https://framerusercontent.com/images/XNPCa4lM3oKIpck7SeArudxrBxo.jpg?lossless=1"
                alt="Project 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="absolute w-full h-full bg-blue-600 rounded-r-3xl flex flex-col items-center justify-center p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <span className="absolute top-8 left-8 text-6xl font-bold opacity-40">03</span>
              <p className="text-2xl font-semibold">Modern Design Portfolio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outro Section */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Beautiful, right?</h1>
          <p className="text-xl opacity-70">Keep scrolling for more</p>
        </div>
      </section>

      {/* Outro Section */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Beautiful Arc Formation</h1>
          <p className="text-xl opacity-70">Cards overlapping in perfect harmony</p>
        </div>
      </section>
    </div>
  );
};

export default Cards;