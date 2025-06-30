import { useEffect } from "react";
import styles from "./index.module.css"

import gsap from "gsap"

const PageTransition = () => {

    useEffect(() => {
    gsap.set(".page-transition-wrapper > div:first-child .col", { y: "-110%" });
    gsap.set(".page-transition-wrapper > div:last-child .col", { y: "110%" });

 
  }, []);

    return ( 
        <section className={` ${styles["page-transition"]} page-transition-wrapper position-fixed uts-inset-0 uts-z-100 pe-none user-select-none vstack overflow-hidden`} >

            <div className="flex-grow-1 row ">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>

            <div className="flex-grow-1 row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>

        </section>
     );
}
 
export default PageTransition;