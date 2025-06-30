import "./index.css";

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default function ImgReveal({imgRows}) {
  const rowsRef = useRef([]);


  function gsapInit(){
    gsap.utils.toArray(".img-wrapper.right img").forEach((img) => {
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
            end: "bottom 70%",
            scrub: true,
          },
        });
      });
  
      gsap.utils.toArray(".img-wrapper.left img").forEach((img) => {
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
            end: "bottom 30%",
            scrub: true,
          },
        });
      });
  }
  useEffect(() => {
    
    function isInViewport(el) {
      let rect = el.getBoundingClientRect();
      return (
        rect.top > 0 &&
        rect.left > 0 &&
        rect.bottom < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right < (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    gsapInit()

    rowsRef.current.forEach((row) => {
      const img = row.querySelector("img");
      if (isInViewport(row)) {
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        });
      }
    });

  
  }, []);

 
  return (
    <div className="container img-reveal mx-auto my-5 px-4 px-sm-0 px-md-5 ">
      {imgRows.map((row, index) => (
        <Row row={row} key={index} index={index} rowsRef={rowsRef} />
      ))}
    </div>
  );
  
}

function Row({ row, index, rowsRef }) {
  return (
    <div ref={(x) => rowsRef.current[index] = x}
      className="row justify-content-lg-center gap-lg-3"
    >
      {row.position === "left" ? left(row) : right(row)}
    </div>
  );
}

function left(row) {
  return (
    <>
      <div className="col col-lg-5">
        <div className="img-wrapper left text-end">
          <img src={row.src} className="w-100" alt={row.alt} loading="lazy" />
        </div>
      </div>
      <div className="col col-lg-5"></div>
    </>
  );
}

function right(row) {
  return (
    <>
      <div className="col col-lg-5"></div>
      <div className="col col-lg-5">
        <div className="img-wrapper right">
          <img src={row.src} className="w-100" alt={row.alt} loading="lazy" />
        </div>
      </div>
    </>
  );
}
