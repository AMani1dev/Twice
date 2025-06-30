import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./index.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HzScroll = ({ fluidText, cardsInfo , additionalClasses ="" }) => {
  const stickyRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRefs = useRef([]);

  useGSAP(
    () => {
      const stickyEl = stickyRef.current;
      const headingEl = headingRef.current;

      if (!stickyEl || !headingEl || !Array.isArray(cardsInfo)) return;

      ScrollTrigger.create({
        id: "hz-scroll",
        trigger: stickyEl,
        start: "top top",
        end: `+=${window.innerHeight * 6}`,
        pin: true,
        scrub: true,
        anticipatePin: 1, 
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          let translateX = 0;
          if (progress > 0) {
            const maxTranslate = headingEl.offsetWidth - window.innerWidth;
            translateX = -maxTranslate * progress;
          }

          gsap.set(headingEl, { x: translateX });

          cardsRefs.current.forEach((card, i) => {
            if (!card || !cardsInfo[i]) return;

            const { transforms } = cardsInfo[i];
            const [yValues = [], rotationValues = []] = transforms;

            const delay = 0.13 * i;
            const cardProgress = Math.max(0, Math.min((progress - delay) * 2, 1));

            if (cardProgress > 0) {
              const x = gsap.utils.interpolate(25, -850, cardProgress);
              const yProg = cardProgress * 3;
              const yIndex = Math.min(Math.floor(yProg), yValues.length - 2);
              const yLerp = yProg - yIndex;

              const y = gsap.utils.interpolate(yValues[yIndex], yValues[yIndex + 1], yLerp);
              const r = gsap.utils.interpolate(rotationValues[yIndex], rotationValues[yIndex + 1], yLerp);

              gsap.set(card, {
                xPercent: x,
                yPercent: y,
                rotation: r,
                opacity: 1,
              });
            } else {
              gsap.set(card, { opacity: 0 });
            }
          });
        },
      });
    },
    { scope: stickyRef } // ✅ limits all GSAP effects to this component tree
  );

  return (
    <section
      ref={stickyRef}
      className={`${styles["sticky"]} overflow-hidden pe-none user-select-none`}
    >
      <div className={`${styles["wrapper"]} position-relative`}>
        <span ref={headingRef}>{fluidText}</span>
        <Cards cardsData={cardsInfo} cardsRefs={cardsRefs} additionalClasses={additionalClasses} />
      </div>
    </section>
  );
};

function Cards({ cardsData, cardsRefs, additionalClasses }) {
  return (
    <>
      {cardsData.map((card, i) => (
        <div
          ref={(el) => (cardsRefs.current[i] = el)}
          key={card.id || i}
          className={`${styles["wrapper__card"]} 
          ${additionalClasses}
          vstack position-absolute z-1 p-2 rounded-2 text-capitalize`}
        >
          <img
            src={card.imgSrc}
            className="w-100 object-fit-cover rounded-2 mb-2"
            alt={card.title || "card image"}
            loading="lazy"
          />
          <span>{card.title}</span>
          <p className="mt-auto">{card.description}</p>
        </div>
      ))}
    </>
  );
}

export default HzScroll;
