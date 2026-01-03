import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedin,

} from "react-icons/fa6"
gsap.registerPlugin(ScrollTrigger);

const Cards = () => {
  const cardContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  // Refs for the child divs (front and back faces)
  const card1FrontRef = useRef(null);
  const card1BackRef = useRef(null);
  const card2FrontRef = useRef(null);
  const card2BackRef = useRef(null);
  const card3FrontRef = useRef(null);
  const card3BackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          markers: true,
        }
      });

      // Set initial state - everything at rest
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
      });

      gsap.set(cardContainerRef.current, {
        scale: 1,
      });

      gsap.set(headingRef.current, {
        y: 100,
        opacity: 0,
      });

      // Phase 1: Scale down the container in place (0 to 1 second)
      tl.to(cardContainerRef.current, {
        scale: 0.85,
        duration: 1,
        ease: "power2.inOut",
      }, 0);

      // Heading appears at the same time
      tl.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 0);

      // Phase 2: Split animation - cards move apart (1 to 2 seconds)
      tl.to(card1Ref.current, {
        x: -15,
        duration: 1,
        ease: 'power2.inOut',
      }, 1)
      // Animate card 1 border radius on both faces
      .to([card1FrontRef.current, card1BackRef.current], {
        borderTopRightRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        duration: 1,
        ease: 'power2.inOut',
      }, 1)
      
      .to(card2Ref.current, {
        x: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, 1)
      // Animate card 2 border radius on both faces
      .to([card2FrontRef.current, card2BackRef.current], {
        borderRadius: '1.5rem',
        duration: 1,
        ease: 'power2.inOut',
      }, 1)
      
      .to(card3Ref.current, {
        x: 15,
        duration: 1,
        ease: 'power2.inOut',
      }, 1)
      // Animate card 3 border radius on both faces
      .to([card3FrontRef.current, card3BackRef.current], {
        borderTopLeftRadius: '1.5rem',
        borderBottomLeftRadius: '1.5rem',
        duration: 1,
        ease: 'power2.inOut',
      }, 1);

      // Phase 3: Flip animation - all cards rotate 180deg (2 to 3.5 seconds)
    // Phase 3: Flip cards
tl.to(
  [card1Ref.current, card2Ref.current, card3Ref.current],
  {
    rotateY: 180,
    duration: 0.75,
    ease: "power3.inOut",
  },
  2
);

// Phase 4: Side tilt + drop 
tl.to(
  [card1Ref.current, card3Ref.current],
  {
    y: 30,
    rotateZ: (i) => [-15, 15][i],
    zIndex: (i) => [5, 15][i], // 👈 card3 goes above
    duration: 0.75,
    ease: "power3.inOut",
  },
  2.1
)
.to(
  card2Ref.current,
  {
    y: -10,
    scale: 1.05,
    zIndex: 10,
    duration: 0.75,
    ease: "power3.inOut",
  },
  2.1
);



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Sticky Cards Section */}
      <section ref={sectionRef} className="relative h-screen flex items-center justify-center p-8 overflow-hidden">
        <div 
          ref={headingRef}
          className="absolute top-[5%] left-1/2 -translate-x-1/2 z-20"
        >
          <h1 className="text-7xl font-bold text-center tracking-wider">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">LEAD</span>
          </h1>
        </div>

        <div 
          ref={cardContainerRef}
className="relative w-[75%] h-[60vh] flex gap-0 items-center justify-center"
          style={{ 
            perspective: '1500px',
            transformOrigin: 'center center'
          }}
        >
          {/* Card 1 */}
          <div 
            ref={card1Ref}
className="relative flex-1 h-full "
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              ref={card1FrontRef}
              className="absolute w-full h-full rounded-l-3xl overflow-hidden" 
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img
                src="https://framerusercontent.com/images/uolKRDGr75Q8SViaOcim92JiJ0.jpg?lossless=1"
                alt="Project 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              ref={card1BackRef}
              className="noisy card-3d absolute w-full h-full bg-red-600 rounded-l-3xl flex flex-col items-center justify-center p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <span className="absolute top-8 left-8 text-6xl font-bold opacity-40">01</span>
              
              <p className="text-2xl font-semibold">Interactive Web Experience</p>
            <div className="absolute bottom-6 left-6 flex gap-7">
    <FaInstagram size={22} />
    <FaXTwitter size={22} />
    <FaLinkedin size={22} />
  </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            ref={card2Ref}
className="relative flex-1 h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              ref={card2FrontRef}
              className="absolute w-full h-full overflow-hidden" 
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img
                src="https://framerusercontent.com/images/rPK6zOOnWjLpjrI16Rn9woMqeZI.jpg?lossless=1"
                alt="Project 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              ref={card2BackRef}
              className="absolute card-3d w-full h-full bg-green-600 flex flex-col items-center justify-center p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <span className="absolute top-8 left-8 text-6xl font-bold opacity-40">02</span>
              <p className="text-2xl font-semibold">Creative Digital Solutions</p>
<div className="absolute bottom-6 left-6 flex gap-7">
    <FaInstagram size={22} />
    <FaXTwitter size={22} />
    <FaLinkedin size={22} />
  </div>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            ref={card3Ref}
className="relative flex-1 h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              ref={card3FrontRef}
              className="absolute w-full h-full rounded-r-3xl overflow-hidden" 
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img
                src="https://framerusercontent.com/images/XNPCa4lM3oKIpck7SeArudxrBxo.jpg?lossless=1"
                alt="Project 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              ref={card3BackRef}
              className="absolute card-3d w-full h-full bg-blue-600 rounded-r-3xl flex flex-col items-center justify-center p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <span className="absolute top-8 left-8 text-6xl font-bold opacity-40">03</span>
              <p className="text-2xl font-semibold">Modern Design Portfolio</p>
            <div className="absolute bottom-6 left-6 flex gap-7">
    <FaInstagram size={22} />
    <FaXTwitter size={22} />
    <FaLinkedin size={22} />
  </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Cards;