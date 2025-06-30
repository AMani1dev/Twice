import { useLoaderData, useParams } from "react-router-dom";
import styles from "./details.module.css";

import {useEffect, useRef } from 'react';


import ImgReveal from "../../components/ui/imgReveal"
import SmoothImageDrag from "../../components/ui/SmoothImageDrag"

import SlicedImage from "../../components/ui/SlicedImage"


import gsap from "gsap"
import FluidLetters from "../../components/ui/FluidLetters";

const Details = () => {
  let { id } = useParams();
  let element = useLoaderData();

  return (
    <>
    <FluidLetters text={element.name}/>
     
       <Title title={element.title} />
       <FluidVideo src={element.fullPage.fluidVideo} />
       
       <section className="px-3 px-sm-4  mt-5">

        <Offerings offerings={element.fullPage.offerings} text={element.fullPage.desc} textSp={element.fullPage.descSp}  />
       
       </section>

       {
         element.fullPage.imgReveal && <ImgReveal imgRows={element.fullPage.imgReveal.imgRows} />
       }


  

       <GridSection
       wrapperTitle={element.fullPage.gridSection.wrapperTitle}
       wrapperDescription={element.fullPage.gridSection.wrapperDescription}
       videoSrc={element.fullPage.gridSection.videoSrc}
       imgSrc={element.fullPage.gridSection.imgSrc}
       title={element.fullPage.gridSection.title}
       text={element.fullPage.gridSection.text}
       />



      {
        element.fullPage.imgDrag &&  
        <SmoothImageDrag imagesArray={element.fullPage.imgDrag.imagesArray} />
      }

     {
        element.fullPage.slicedImage &&
        
       <SlicedImage
       width="min(90vw , 220px)"
       aspectRatio={"9 / 16"}
       src={element.fullPage.slicedImage.src}
       />
       }

 
     <div style={{height : "30vh"}}></div>
    </>
  );
};


const FluidVideo = ({src}) => {
    return (
        <div className={`${styles["fluid-video"]}  `} >

            <iframe 
            src={src}
            width="640" height="360"
            frameBorder="0" allowFullScreen="" allow="autoplay; encrypted-media" data-ready="true"
            className="uts-fluid rounded-2"
            loading="eager"
            >

            </iframe>
        </div>
    )
}

const Title = ({title}) => {
    return (
        <span className="text-uppercase display-1 d-block text-center my-5">
            {title}
        </span>

    )
}




const Offerings = ({ offerings, text, textSp }) => {
  const containerRef = useRef();


    gsap.registerEffect({
      name: "TextReveal",
      effect: (target, config) => {
        return gsap.to(target, {
          opacity: 1,
          duration: config.duration,
          ease: config.ease,
          stagger : config.stagger, 
          delay : config.delay , 
        });
      },

      defaults: {
        duration: .5,
        ease: "power4.inOut",
        opacity: 1,
        delay : 0 ,
        stagger : .2,  
      },
    })

   useEffect(() => {
    const w = gsap.utils.selector(containerRef); 

    gsap.set([w("li"), w("p")], { opacity: 0 });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        gsap.effects.TextReveal(w("li"))
        gsap.effects.TextReveal(w("p") ,{delay : 1})

        observer.unobserve(entry.target); 
      });
    }, {threshold : .8});

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect(); 
  }, []);

  return (
    <div
      ref={containerRef}
      className="row offerings flex-column-reverse flex-md-row justify-content-md-between"
    >
      <div className="col col-md-4 mt-5 mt-md-0 text-uppercase fw-bold">
        <small className="text-warning">we provide</small>
        <ul className="list-unstyled">
          {offerings.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className="col col-md-5">
        <p>{text}</p>
        <p className="mt-3">{textSp}</p>
      </div>
    </div>
  );
};



const GridSection = (props) => {
  return (

    <>
    <div className="text-center mt-5 px-3 px-sm-5">
      <span className="text-uppercase fs-1 mb-3 d-inline-block uts-mw-20-ch">
        {props.wrapperTitle}
      </span>
      <p className="text-capitalize uts-mw-50-ch  mx-auto">
        {props.wrapperDescription}
      </p>

    </div>

    <section className={`${styles["grid__wrapper"]}  mt-5 px-3 px-sm-5`} >

      <div className={`${styles["video"]} `} >
        <video
        className="uts-fluid object-fit-cover"
        src={props.videoSrc}
        autoPlay loop muted
        />
      </div>


      <div className={` ${styles["description"]}  mt-sm-5`} >
        <span className="text-uppercase fw-bold fs-1"> {props.title} </span>
        <p className="mt-3"> {props.text} </p>
      </div>

      <div className={`${styles["img"]} uts-fluid`} >
        <img className="uts-fluid" src={props.imgSrc} alt="img" loading="lazy" />
      </div>
    
    </section>

    </>
  )
}


export default Details;