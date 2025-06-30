
import styles from "./index.module.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";




export default function FluidLetters({ text }) {
  const lettersArray = Array.from(text);
  const letterRefs = useRef([]);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const distance = 70;

  const generateOrderPairs = (length) => {
    const center = Math.floor(length / 2);
    const pairs = [];

    for (let i = 0; i <= center; i++) {
      const left = center - i;
      const right = center + i;

      const currentPair = [];

      if (left === right) {
        currentPair.push(center);
      } else {
        if (left >= 0) currentPair.push(left);
        if (right < length) currentPair.push(right);
      }

      pairs.push(currentPair);
    }

    return pairs;
  };

  const orderPairs = generateOrderPairs(lettersArray.length);

  const letters = lettersArray.map((e, i) => (
    <span
      key={i}
      ref={(el) => (letterRefs.current[i] = el)}
      className="letter d-block text-center"
    >
      {e}
    </span>
  ));

  useEffect(() => {
    const lettersWrapper = wrapperRef.current;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (navRef.current) {
        scrollY < 500
          ? navRef.current.classList.add("opacity-0", "pe-none", "user-select-none")
          : navRef.current.classList.remove("opacity-0", "pe-none", "user-select-none");
      }

      orderPairs.forEach((pair, orderIndex) => {
        const startScroll = distance * orderIndex ;
        const moveFactor = Math.min(1, Math.max(0, (scrollY - startScroll) / distance));
        const translateY = -moveFactor * lettersWrapper.offsetHeight;
        const z = 1 - moveFactor;

        pair.forEach((idx) => {
          const letter = letterRefs.current[idx];
          if (letter) {
            gsap.to(letter, {
              y: translateY,
              zIndex: z,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [orderPairs, distance]);

  return (
    <>
 
      <div ref={wrapperRef} className={`${styles["letters__wrapper"]} text-uppercase`}>
        {letters}
      </div>

    </>
  );
}
