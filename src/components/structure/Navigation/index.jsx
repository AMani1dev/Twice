// import { useEffect, useRef, useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import gsap from "gsap";

// import navLinksData from "./navLinksData";
// import styles from "./index.module.css";

// import ClipText from "../../ui/ClipText";
// import pageTransition from "../../../utils/pageTransition";

// // 🔍 Check if user is on PC
// const isPC = () => {
//   return !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
// };

// // ⚡ Preload page module when hovering a link (PC only)
// const preloadPage = (path) => {
//   if (!isPC()) return;

//   switch (path) {
//     case "/about":
//       import("../../../pages/About").then(() =>
//         console.log("[Preload] /about page module loaded")
//       );
//       break;
//     case "/work":
//       import("../../../pages/Work").then(() =>
//         console.log("[Preload] /Work page module loaded")
//       );
//       break;
//     case "/services":
//       import("../../../pages/Services").then(() =>
//         console.log("[Preload] /services page module loaded")
//       );
//       break;
//     case "/contact":
//       import("../../../pages/Contact").then(() =>
//         console.log("[Preload] /contact page module loaded")
//       );
//       break;
//     default:
//       break;
//   }
// };

// const Navigation = () => {
//   const navigationRef = useRef(null);
//   const navSliceRefs = useRef([]);
//   const navigate = useNavigate();

//   const [isSliceShown, setIsSliceShown] = useState(false);

//   useEffect(() => {
//     if (!gsap.effects?.show) {
//       gsap.registerEffect({
//         name: "show",
//         effect: (target, config) =>
//           gsap.to(target, {
//             y: 0,
//             opacity: 1,
//             duration: config.duration,
//             ease: config.ease,
//             stagger: config.stagger,
//             delay: config.delay,
//           }),
//         defaults: {
//           duration: 0.5,
//           ease: "power4.inOut",
//           stagger: 0.125,
//           delay: 0,
//         },
//       });
//     }

//     if (!gsap.effects?.hide) {
//       gsap.registerEffect({
//         name: "hide",
//         effect: (target, config) =>
//           gsap.to(target, {
//             y: "105%",
//             opacity: 0,
//             duration: config.duration,
//             ease: config.ease,
//             stagger: config.stagger,
//           }),
//         defaults: {
//           duration: 0.5,
//           ease: "power4.inOut",
//           stagger: 0.125,
//         },
//       });
//     }

//     if (!gsap.effects?.slideInCols) {
//       gsap.registerEffect({
//         name: "slideInCols",
//         effect: (targets, config) =>
//           gsap.to(targets, {
//             y: config.y,
//             duration: config.duration,
//             stagger: config.stagger,
//             ease: config.ease,
//           }),
//         defaults: {
//           y: 0,
//           duration: 0.5,
//           stagger: 0.123,
//           ease: "power4.inOut",
//         },
//         extendTimeline: true,
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.set(navSliceRefs.current, {
//         y: "105%",
//         opacity: 0,
//       });
//       gsap.set(`.${styles.navigation} a`, {
//         y: "105%",
//         opacity: 0,
//       });
//     }, navigationRef);

//     return () => ctx.revert();
//   }, []);

//   const handleMenuBtnClick = useCallback(() => {
//     setIsSliceShown((prev) => {
//       const newState = !prev;

//       if (newState) {
//         gsap.effects.show(navSliceRefs.current);
//         gsap.effects.show(`.${styles.navigation} a`, { delay: 0.7 });
//         navigationRef.current?.classList.remove("pe-none", "user-select-none");
//       } else {
//         gsap.effects.hide(navSliceRefs.current);
//         gsap.effects.hide(`.${styles.navigation} a`);
//         navigationRef.current?.classList.add("pe-none", "user-select-none");
//       }

//       return newState;
//     });
//   }, []);

//   const handleNavLinksClick = useCallback(
//     (e, path) => {
//       e.preventDefault();

//       gsap.killTweensOf(navSliceRefs.current);
//       gsap.killTweensOf(`.${styles.navigation} a`);

//       gsap.effects.hide(navSliceRefs.current);
//       gsap.effects.hide(`.${styles.navigation} a`);

//       navigationRef.current?.classList.add("pe-none", "user-select-none");
//       setIsSliceShown(false);

//       setTimeout(() => {
//         pageTransition(path, navigate);
//       }, 250);
//     },
//     [navigate]
//   );

//   return (
//     <>
//       <div
//         ref={navigationRef}
//         className={`${styles.navigation} uts-z-50 position-fixed uts-inset-0 pe-none user-select-none`}
//       >
//         <div className={`${styles["nav__content-wrapper"]} h-100`}>
//           <div className="slices-wrapper row z-n1">
//             <Slices navSliceRefs={navSliceRefs} />
//           </div>

//           <div className="text-uppercase fw-bold">
//             <ul className="list-unstyled h-100 uts-flex-center gap-3 gap-sm-4 gap-md-5">
//               <NavigationLinks navLinkClickHandler={handleNavLinksClick} />
//             </ul>
//           </div>
//         </div>
//       </div>

//       <MenuBtn clickHandler={handleMenuBtnClick} />
//     </>
//   );
// };

// const NavigationLinks = ({ navLinkClickHandler }) => {
//   return navLinksData.map((link) => (
//     <li key={link.id}>
//       <Link
//         to={link.to}
//         onClick={(e) => navLinkClickHandler(e, link.to)}
//         onMouseEnter={() => preloadPage(link.to)}
//         className="text-decoration-none d-inline-block"
//       >
//         <ClipText text={link.text} />
//       </Link>
//     </li>
//   ));
// };

// const Slices = ({ navSliceRefs }) => {
//   return (
//     <>
//       {[0, 1, 2, 3].map((_, i) => (
//         <div
//           key={i}
//           ref={(el) => (navSliceRefs.current[i] = el)}
//           className={`col ${styles["nav-slice"]}`}
//         ></div>
//       ))}
//     </>
//   );
// };

// const MenuBtn = ({ clickHandler }) => {
//   return (
//     <div
//       className={`${styles["menu-btn"]} uts-z-51 d-flex position-fixed start-50 translate-middle-x`}
//     >
//       <div className="d-flex justify-content-center align-items-center flex-column">
//         <div className={styles["menu-btn__line"]}></div>
//         <div className={styles["menu-btn__line"]}></div>
//         <div className={styles["menu-btn__line"]}></div>
//       </div>

//       <div
//         className="position-relative text-uppercase flex-grow-1 px-1 py-1"
//         onClick={clickHandler}
//       >
//         <span className="d-inline-block">menu</span>
//       </div>
//     </div>
//   );
// };

// export default Navigation;





























import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

import navLinksData from "./navLinksData";
import styles from "./index.module.css";

import ClipText from "../../ui/ClipText";
import pageTransition from "../../../utils/pageTransition";

const isPC = () => {
  return !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const preloadedPages = new Set();

const preloadPage = (path) => {
  if (!isPC() || preloadedPages.has(path)) return;

  preloadedPages.add(path);

  switch (path) {
    case "/about":
      import("../../../pages/About").then(() =>
        console.log("[Preload] /about page module loaded")
      );
      break;
    case "/work":
      import("../../../pages/Work").then(() =>
        console.log("[Preload] /work page module loaded")
      );
      break;
    case "/services":
      import("../../../pages/Services").then(() =>
        console.log("[Preload] /services page module loaded")
      );
      break;
    case "/contact":
      import("../../../pages/Contact").then(() =>
        console.log("[Preload] /contact page module loaded")
      );
      break;
    default:
      break;
  }
};

const useRegisterGSAPEffects = () => {
  useEffect(() => {
    if (!gsap.effects?.show) {
      gsap.registerEffect({
        name: "show",
        effect: (target, config) =>
          gsap.to(target, {
            y: 0,
            opacity: 1,
            duration: config.duration,
            ease: config.ease,
            stagger: config.stagger,
            delay: config.delay,
          }),
        defaults: {
          duration: 0.5,
          ease: "power4.inOut",
          stagger: 0.125,
          delay: 0,
        },
      });
    }

    if (!gsap.effects?.hide) {
      gsap.registerEffect({
        name: "hide",
        effect: (target, config) =>
          gsap.to(target, {
            y: "105%",
            opacity: 0,
            duration: config.duration,
            ease: config.ease,
            stagger: config.stagger,
          }),
        defaults: {
          duration: 0.5,
          ease: "power4.inOut",
          stagger: 0.125,
        },
      });
    }

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
};

const Navigation = () => {
  const navigationRef = useRef(null);
  const navSliceRefs = useRef([]);
  const navigate = useNavigate();
  const [isSliceShown, setIsSliceShown] = useState(false);

  useRegisterGSAPEffects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navSliceRefs.current, {
        y: "105%",
        opacity: 0,
      });
      gsap.set(`.${styles.navigation} a`, {
        y: "105%",
        opacity: 0,
      });
    }, navigationRef);

    return () => ctx.revert();
  }, []);

  const handleMenuBtnClick = useCallback(() => {
    setIsSliceShown((prev) => {
      const newState = !prev;

      if (newState) {
        gsap.effects.show(navSliceRefs.current);
        gsap.effects.show(`.${styles.navigation} a`, { delay: 0.7 });
        navigationRef.current?.classList.remove("pe-none", "user-select-none");
      } else {
        gsap.effects.hide(navSliceRefs.current);
        gsap.effects.hide(`.${styles.navigation} a`);
        navigationRef.current?.classList.add("pe-none", "user-select-none");
      }

      return newState;
    });
  }, []);

  const handleNavLinksClick = useCallback(
    (e, path) => {
      e.preventDefault();

      gsap.killTweensOf(navSliceRefs.current);
      gsap.killTweensOf(`.${styles.navigation} a`);

      gsap.effects.hide(navSliceRefs.current);
      gsap.effects.hide(`.${styles.navigation} a`);

      navigationRef.current?.classList.add("pe-none", "user-select-none");
      setIsSliceShown(false);

      setTimeout(() => {
        pageTransition(path, navigate);
      }, 250);
    },
    [navigate]
  );

  const handleMouseEnter = useCallback((path) => {
    preloadPage(path);
  }, []);

  const links = useMemo(() => navLinksData, []);

  return (
    <>
      <div
        ref={navigationRef}
        className={`${styles.navigation} uts-z-50 position-fixed uts-inset-0 pe-none user-select-none`}
      >
        <div className={`${styles["nav__content-wrapper"]} h-100`}>
          <div className="slices-wrapper row z-n1">
            <Slices navSliceRefs={navSliceRefs} />
          </div>

          <div className="text-uppercase fw-bold">
            <ul className="list-unstyled h-100 uts-flex-center gap-3 gap-sm-4 gap-md-5">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    onClick={(e) => handleNavLinksClick(e, link.to)}
                    onMouseEnter={() => handleMouseEnter(link.to)}
                    className="text-decoration-none d-inline-block"
                  >
                    <ClipText text={link.text} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <MenuBtn clickHandler={handleMenuBtnClick} />
    </>
  );
};

const Slices = ({ navSliceRefs }) => {
  return (
    <>
      {[0, 1, 2, 3].map((_, i) => (
        <div
          key={i}
          ref={(el) => (navSliceRefs.current[i] = el)}
          className={`col ${styles["nav-slice"]}`}
        ></div>
      ))}
    </>
  );
};

const MenuBtn = ({ clickHandler }) => {
  return (
    <div
      className={`${styles["menu-btn"]} uts-z-51 d-flex position-fixed start-50 translate-middle-x`}
    >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className={styles["menu-btn__line"]}></div>
        <div className={styles["menu-btn__line"]}></div>
        <div className={styles["menu-btn__line"]}></div>
      </div>

      <div
        className="position-relative text-uppercase flex-grow-1 px-1 py-1"
        onClick={clickHandler}
      >
        <span className="d-inline-block">menu</span>
      </div>
    </div>
  );
};

export default Navigation;
