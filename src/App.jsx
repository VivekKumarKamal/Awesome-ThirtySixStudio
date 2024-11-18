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
  const headingref = useRef(null);
  const growingSpan = useRef(null);



  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
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
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);
 

  return (
    <>
    <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen">
        {showCanvas && data[0].map((canvas_details, index) =>(
          <Canvas details={canvas_details} />
        ))}
        <div className="w-full h-screen relative">
          <nav className="top-0 left-0 w-full p-8 flex justify-between z-50">
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
                <p className="text-md mt-8">Scroll</p>
              </div>
          </div>
          
          <div className="w-full absolute bottom-0 left-10">
            <h1 ref={headingref} className="text-[12rem] font-normal tracking-light leading-none pl-5">
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-screen pt-40 pl-10">
      {showCanvas &&
          data[1].map((canvas_details, index) => <Canvas details={canvas_details} />)}
      
        <h3 className="text-6xl ">about the Brand</h3>
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
  )
}

export default App;