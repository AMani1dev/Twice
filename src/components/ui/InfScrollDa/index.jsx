import { useEffect, useRef } from "react";
import styles from  "./index.module.css";

// #region
const LoopingElement = ({ startPosition, contentArray, contentType }) => {
  const elementRef = useRef(null);
  const scrollTopRef = useRef(0);
  const isScrolling = useRef(true);
  const refreshRate = 100;
  let speed = 0.07 ;

  const lerp = useRef({
    current: startPosition,
    target: startPosition,
    factor: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const direction = window.pageYOffset || document.documentElement.scrollTop;
      if (direction > scrollTopRef.current) {
        isScrolling.current = true;
        lerp.current.target += speed * 5;
      } else {
        isScrolling.current = false;
        lerp.current.target -= speed * 5;
      }
      scrollTopRef.current = direction;
    };

    const goForward = () => {
      lerp.current.target += speed;
      if (lerp.current.target > refreshRate) {
        lerp.current.current -= refreshRate * 2;
        lerp.current.target -= refreshRate * 2;
      }
    };

    const goBackward = () => {
      lerp.current.target -= speed;
      if (lerp.current.target < -refreshRate) {
        lerp.current.current += refreshRate * 2;
        lerp.current.target += refreshRate * 2;
      }
    };

    const animate = () => {
      if (isScrolling.current) {
        goForward();
      } else {
        goBackward();
      }
      lerp.current.current =
        lerp.current.current * (1 - lerp.current.factor) + lerp.current.target * lerp.current.factor;

      if (elementRef.current) {
        elementRef.current.style.transform = `translateX(${lerp.current.current}%)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);
 
function InfScrollElements() {
  return contentArray.map((item) => {
    switch (contentType) {
      case "text":
        return (
          <div key={item.id} className={`${styles["text-item "]} overflow-y-hidden`}>
            <span className="scrolling-text">{item.content}</span>
          </div>
        );

      case "image":
        return (
          <div key={item.content} className={`${styles["img-wrapper"]}`}>
            <img src={item.content} className="uts-fluid" alt={item.content} loading="lazy" />
          </div>
        );
      case "logo":
        return (
          <div key={item.id} className={`${styles["logo-wrapper"]} flex-grow-0 flex-shrink-0`}>
            <img src={item.content} className="d-block mx-auto" alt="logo" />
          </div>
        );

      default:
        return null;
    }
  });
}


  return (
    <div ref={elementRef} className={`${styles.part} d-flex position-absolute`}>
        <InfScrollElements />
    </div>
  );
};

const InfScrollDa = ({ firstArray, secondArray, contentType }) => {
  return (
    <div 
    className={`${styles["scroll-axis-aware"]} position-relative overflow-x-hidden`}
    >
      <div className={`parts-wrapper d-flex`} >
        <LoopingElement startPosition={0} contentArray={firstArray}  contentType={contentType} />
        <LoopingElement startPosition={-100} contentArray={secondArray}  contentType={contentType}  />
      </div>
    </div>
  ); 
};
// #endregion
export default InfScrollDa;