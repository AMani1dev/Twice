import styles from "./index.module.css"

import { useEffect , useRef} from "react";


function RenderImages({imagesArray}) {
  return imagesArray.map((e) => (
    <div
      className={`${styles["img__wrapper"]}`}
      draggable={false}
      key={e.id}
    >
      <img src={e.src} alt={e.alt} className="h-100 w-100 object-fit-cover" />
    </div>
  ));
}

export default function SmoothImageDrag({imagesArray}) {
  const wrapperRef = useRef(null);
  const mouseDownAt = useRef(0);
  const prevPercentage = useRef(0);
  const currentPercentage = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleDown = (e) => {
        e.preventDefault()
      mouseDownAt.current = e.clientX || e.touches?.[0]?.clientX || 0;
    };

    const handleUp = () => {
      mouseDownAt.current = 0;
      prevPercentage.current = currentPercentage.current;
    };

    const handleMove = (e) => {
      if (mouseDownAt.current === 0) return;
    
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      // if (typeof clientX !== "number") return; 
    
      const delta = mouseDownAt.current - clientX;
      const maxDelta = window.innerWidth / 2;
    
      let percentage = (delta / maxDelta) * -100;
    
      let next = prevPercentage.current + percentage;
    
      next = Math.max(Math.min(next, 0), -100); 
      currentPercentage.current = next;
    
      wrapper.animate(
        { translate: `${next}% 0` },
        { duration: 1200, fill: "forwards" }
      );
    
      // Fallback in case `animate` isn't supported
      // if (!wrapper.animate) {wrapper.style.translate = `${next}% 0`;}
    
      for (const img of wrapper.getElementsByTagName("img")) {
        img.animate(
          {
            objectPosition: `${next + 100}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };
    
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mousemove", handleMove);

    window.addEventListener("touchstart", handleDown);
    window.addEventListener("touchend", handleUp);
    window.addEventListener("touchmove", handleMove);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mousemove", handleMove);

      window.removeEventListener("touchstart", handleDown);
      window.removeEventListener("touchend", handleUp);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div className="smooth-image-drag vh-100 position-relative overflow-hidden ">
      <div
        ref={wrapperRef}
        className={
        `${styles["smooth-image-drag__wrapper"]} d-flex p-3 gap-5 position-absolute top-50 start-50 translate-middle-y`}
      >
        <RenderImages imagesArray={imagesArray} />
      </div>
    </div>
  );
}



// https://youtu.be/PkADl0HubMY?si=zseHLzM8v_6--CJ7