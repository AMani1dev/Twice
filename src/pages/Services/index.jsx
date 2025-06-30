import gsap from 'gsap'

import styles from "./services.module.css";
import centeredVideo from "/services/videos/hero.mp4";

import HzScroll from "../../components/ui/HzScroll"
import { useEffect } from 'react';

let cardsInfo = [
  {
    id : 1 ,
    imgSrc : "/services/images/audiovisual.jpg" ,
    title   : "audiovisual" ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [10, 50, 0, 10] ,
      [15 , -5, -25, 20] ,
    ],
  },
  {
    id : 2 ,
    imgSrc : "/services/images/creativity.webp" ,
    title   : "creativity " ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0, 45, -10, 15] ,
      [15 ,-5 ,-10, 20] ,
    ],
  },
  {
    id : 3 ,
    imgSrc : "/services/images/digital-marketing.jpg" ,
    title   : "digital marketing " ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0,  52 , -10 , 5] ,
      [15 , -5 , -10 , 20] ,
    ],
  },
   {
    id : 4 ,
    imgSrc : "/services/images/graphic-design.jpg" ,
    title   : "graphic design " ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0,  52 , -10 , 5] ,
      [15 , -5 , -10 , 20] ,
    ],
  },
     {
    id : 5 ,
    imgSrc : "/services/images/ux.jpg",
    title   : "user experience" ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0,  52 , -10 , 5] ,
      [15 , -5 , -10 , 20] ,
    ],
  },
]



const Hero = () => {

  useEffect(() => {
    gsap.set(".hero__vid", {
      clipPath : "polygon(0 0 , 100% 0 , 100% 0%, 0 0%",
      opacity : 0 ,
    })
    gsap.set(`.${styles.headingWrapperSectionP}`, {
      opacity : 0 ,
    })

    gsap.to(".hero__vid" , {
      duration : 1,
      ease :"power4.inOut" ,
      opacity : 1 ,
      clipPath : "polygon(0 0 , 100% 0, 100% 100% , 0 100%)"
    })

    gsap.to(`.${styles.headingWrapperSectionP}`,
    {
      duration : 1,
      ease :"power4.inOut" ,
      opacity : 1 ,
      delay : .5,
    }
  )
  }, [])
  return (
    <section className={`uts-vh-100 vstack justify-content-evenly justify-content-sm-around align-items-center`}>
      <div className={` position-relative py-3`}>
        <div
          className={`${styles.bg}  position-absolute top-50 start-50 translate-middle-x`}
        >
          <video
            className="uts-fluid hero__vid object-fit-cover"
            src={centeredVideo}
            autoPlay
            loop
            muted
          />
        </div>

        <span
          className={`uts-mw-20-ch px-3 px-sm-0 lh-1 fw-bold text-center text-uppercase display-3 d-block mx-auto `}
          data-trans-e
        >
          Shine in the digital world
        </span>
      </div>

      <p
        className={`uts-mw-40-ch mx-auto text-center px-3 px-sm-0 `}
        data-trans-e
      >
        A brilliant team offering multidisciplinary services. Scroll to find out
        how we can help you.
      </p>
    </section>
  );
};



const Services = () => {
  return (
    <>
    <Hero/>
    <HzScroll fluidText={"here we are again !"} cardsInfo={cardsInfo} additionalClasses='' />
    </>
  );
};


export default Services;


