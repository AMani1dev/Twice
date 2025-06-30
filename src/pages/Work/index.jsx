import { useLoaderData , Link, useNavigate} from "react-router-dom";

import styles from "./work.module.css" 

import gsap from "gsap"
import { useEffect } from "react";

import pageTransition from "../../utils/pageTransition"

const Work = () => {
  let workData = useLoaderData()
    return ( 
        <>
             <span className={`${styles["title"]} text-center h1 d-block text-uppercase mx-auto fw-bold`}>
                <span className="text-danger">sport</span> <br />
                driven production
            </span>

            <span className="text-center d-block mb-3">
                challenges ({workData.length})
            </span>

            <section className={`${styles["work-wrapper"]}
            row row-cols-1  row-cols-sm-2 row-cols-md-3
            justify-content-center justify-content-sm-evenly my-5`} >
              <Cards data ={workData} /> 
            </section>   
        </>
     );
}
 

function Cards({data}){

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
  }, [])


  let navigate = useNavigate() ;

  function handleClick(e, path) {
    e.preventDefault()
    pageTransition(path , navigate)
  }
      

   return data.map(({card, id}) => (
        <Link
        className={`${styles["box__project"]} col page-link `}
        onClick={ (e) => handleClick(e, id)}
        to={id} key={id}
        >
            <div className={`${styles["bg-wrapper"]} position-relative mb-2`} >
                
                <div className={`${styles["video-wrapper"]}  position-absolute uts-inset-0 `} >
                    <video src={card.videoBg} className="uts-fluid object-fit-cover" autoPlay loop muted></video>
                </div>

                <div className={`${styles["img-wrapper"]} z-n1 position-absolute uts-inset-0`} >
                    <img src= {card.bgImg} className="uts-fluid" alt={card.title} />
                </div>

            </div>

            <div className="text-uppercase fw-bold">
                <span className="text-secondary">{card.title}</span>
                <span className="text-white d-block">{card.mark}</span>
            </div>

        </Link>
    ))
}


export default Work;
