
import styles from "./index.module.css";
import { useEffect, useRef, useLayoutEffect } from "react";

import clsx from "clsx";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import x from "/two-percent/images/sg-img__1.jpg"; 

gsap.registerPlugin(ScrollTrigger);

export default function StickyGallery({ imagesArray, bg }) {
  const bgRef = useRef(null);
  const imagesRef = useRef(null);
  const gallRef = useRef(null);
  const imageXRef = useRef(null); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const gallery = gallRef.current;

      if (!gallery) return;

      const galleryOffsetTop = gallery.offsetTop;
      const galleryHeight = gallery.offsetHeight;

      if (
        scrollY >= galleryOffsetTop &&
        scrollY <= galleryOffsetTop + galleryHeight
      ) {
        const progress = (scrollY - galleryOffsetTop) / window.innerHeight;
        const moveY = 100 - progress * 100 * 1.2;

        if (imagesRef.current) {
          imagesRef.current.style.translate = `0 ${moveY}%`;
        }

        if (bgRef.current) {
          const pathCalc = progress * 100;
          bgRef.current.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${pathCalc}%, 0% ${pathCalc}%)`;
        }
      } else if (scrollY < galleryOffsetTop) {
        if (imagesRef.current) {
          imagesRef.current.style.translate = `0 100%`;
        }

        if (bgRef.current) {
          bgRef.current.style.clipPath = `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const img = imageXRef.current;

      gsap.set(img, {
        scale: 0.2,
        transformOrigin: "center center",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: gallRef.current, 
          start: "top bottom",
          end: "+=100%",
          scrub: true,
        },
      }).to(img, {
        scale: 1,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={clsx(styles.gallery)} ref={gallRef}>
      <GalleryWrapper>
        <div
          className={clsx(
            styles.gallery__element,
            "position-relative",
            "overflow-hidden"
          )}
        >
          <img ref={imageXRef} src={x} className="w-100 h-100" loading="lazy" alt="" />
        </div>

        <GalleryElement>
          <ElementBg bgRef={bgRef} bg={bg} />
          <ImagesWrapper imagesRef={imagesRef} imagesArray={imagesArray} />
        </GalleryElement>
      </GalleryWrapper>
    </div>
  );
}

function GalleryWrapper({ children }) {
  return (
    <div
      className={clsx(
        styles.gallery__wrapper,
        "vh-100",
        "position-sticky",
        "top-0"
      )}
    >
      {children}
    </div>
  );
}

function GalleryElement({ children }) {
  return (
    <div
      className={clsx(
        styles.gallery__element,
        "position-relative",
        "overflow-hidden"
      )}
    >
      {children}
    </div>
  );
}

function ElementBg({ bgRef, bg }) {
  return (
    <div
      ref={bgRef}
      className={clsx(
        styles.bg,
        "position-absolute",
        "start-0",
        "top-0",
        "end-0",
        "bottom-0" ,
      )}
    >
      <img src={bg} className="w-100 h-100" alt="bg image" />
    </div>
  );
}

function ImagesWrapper({ imagesRef, imagesArray }) {
  return (
    <div
      ref={imagesRef}
      className={clsx(styles.images, "position-absolute", "vstack", "gap-5")}
    >
      {imagesArray.map(({ src, id }) => (
        <img src={src} key={id} className="w-100" alt={`image ${id}`} loading="lazy" />
      ))}
    </div>
  );
}
