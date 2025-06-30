import { useEffect, useRef } from "react";
import gsap from "gsap";

const SlicedImage = ({width, aspectRatio, src}) => {
  const wrapperRef = useRef(null);
  const wrapperImage = gsap.utils.selector(wrapperRef);

   let wrapperStyles = {width , aspectRatio }

  useEffect(() => {

    gsap.set(wrapperImage(".img-slice"), { opacity: 0 });


    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => {
           if(!entry.isIntersecting) return ;

            gsap.to(wrapperImage(".img-slice"), {
              opacity: 1,
              duration: 1,
              stagger: 0.04,
              ease: "power4.out",
            });

            observer.unobserve(entry.target); 

        });
      },
      {
        threshold: 0.9, 
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect(); 
  }, [wrapperImage]);

 

  return (
    <div ref={wrapperRef} style={wrapperStyles} className="mx-auto mt-5 row row-cols-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <Slice src={src} key={i} />
      ))}
    </div>
  );
};

const Slice = ({ src }) => {
  const imageStyles = {
    background: `url("${src}") center center/cover no-repeat fixed`,
  };

  return (
    <div
      style={imageStyles}
      className={`img-slice col`}
    />
  );
};

export default SlicedImage;
