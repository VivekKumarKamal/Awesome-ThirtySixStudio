import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [isGrowingSpanActive, setIsGrowingSpanActive] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
    });

    const handleMouseMove = (e) => {
      gsap.to(growingSpan.current, {
        duration: 0.7,
        top: e.clientY - 10,
        left: e.clientX - 10,
        ease: "power1.out"
      });
    };

    const handleClick = (e) => {
      
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#7da84b",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    if (headingElement) {
      headingElement.addEventListener("click", handleClick);
    } else {
      console.error("Heading ref is not assigned correctly");
    }
    window.addEventListener("mousemove", handleMouseMove); // Track mouse movement

    // Clean up event listeners on unmount
    return () => {
      if (headingElement) {
        headingElement.removeEventListener("click", handleClick);
      }
      // window.removeEventListener("mousemove", handleMouseMove); // Clean up mousemove listener
    };
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen">
        {showCanvas && data[0].map((canvas_details, index) => (
          <Canvas key={`canvas-0-${index}`} details={canvas_details} />
        ))}
        <div className="w-full h-screen relative">
          <nav className="p-2 flex justify-between">
            <div className="brand text-2xl font-regular">Awesome</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a 
                  href={`#${link.toLowerCase()}`}
                  key={index}
                  className="text-md hover:text-grey-300"
                >
                  {link}  
                </a>
              ))}
            </div>
          </nav>
          <div className="textContainer w-full px-[25%]">
            <div className="text w-[50%]">
              <h3 className="text-3xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for <br/> brands with a <br />purpose.
              </h3>
              <p className="text-md w-[95%] mt-10 font-light leading-[1.1]">
                We’re a boutique production studio focused on design, motion, 
                and creative technology, constantly reimagining what digital craft can do for present-time ads 
                and campaigns.
              </p>
              <p className="text-md mt-7" style={{ marginBottom: '180px' }}>Scroll</p>
            </div>
          </div>
          
          <div className="w-full absolute left-10">
            <h1 ref={headingref} className="relative z-10 text-[12rem] mb-10 font-light tracking-light leading-none pl-5">
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-screen pt-40 pl-10">
        {showCanvas &&
          data[1].map((canvas_details, index) => (
            <Canvas key={`canvas-1-${index}`} details={canvas_details} />
          ))}
      
        <h3 className="text-6xl mt-16">about the Brand</h3>
        <p className="text-md w-[55%] mt-5 font-regular">
          We’re a boutique production studio focused on design, motion, 
          and creative technology, constantly reimagining what digital craft can do for present-time ads 
          and campaigns.
          We’re a boutique production studio focused on design, motion, 
          and creative technology, constantly reimagining what digital craft can do for present-time ads 
          and campaigns.
        </p>
      </div>
    </>
  );
}

export default App;