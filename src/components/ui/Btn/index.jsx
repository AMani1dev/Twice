import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./btn.module.css";
import gsap from "gsap";

import pageTransition from "../../../utils/pageTransition";

const AnimatedBtn = ({ text = "init text", to = "", initIcon, ocs = "" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!gsap.effects?.slideInCols) {
      gsap.registerEffect({
        name: "slideInCols",
        effect: (targets, config) =>
          gsap.to(targets, {
            y: config.y,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
          }),
        defaults: {
          y: 0,
          duration: 0.5,
          stagger: 0.123,
          ease: "power4.inOut",
        },
        extendTimeline: true,
      });
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    gsap.globalTimeline.clear();
    
    if(text === "info@twicemediahouse.com") return;
    pageTransition(to, navigate);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`${styles["animated-btn"]} page-transition-link d-flex py-2 text-decoration-none ${ocs}`}
    >
      <div className="border border-white p-1 uts-flex-center">{initIcon}</div>
      <div
        data-text={text}
        className="overflow-hidden border border-start-0 border-white p-2 position-relative uts-flex-center"
      >
        <span className="d-block">{text}</span>
      </div>
    </Link>
  );
};

export default AnimatedBtn;
