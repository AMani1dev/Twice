import styles from "./about.module.css";

import InfScrollDa from "../../components/ui/InfScrollDa";

import rightImg from "/about/images/heading-bg.jpg";
import vid from "/about/videos/video.mp4";


import { FaStarOfLife } from "react-icons/fa6";
import AnimatedBtn from "../../components/ui/Btn"

import { firstArray, secondArray } from "./teamData";


function Title() {
  return (
    <>
      <div className={`${styles["heading-wrapper"]} py-5 position-relative`}>
        <div className={`${styles["bg-img"]}  position-absolute z-n1`}>
          <img
            className="uts-fluid"
            src={rightImg}
            alt="Background"
            data-trans-e
            loading="lazy"
          />
        </div>

        <span
          className={`${styles["heading-text"]} text  d-block mx-auto text-uppercase fw-bold text-center title`}
          data-trans-e
        >
          Being competitive while having fun
        </span>
      </div>
    </>
  );
}

function Grid() {
  return (
    <div className={`${styles["intro-wrapper"]} py-5 px-3`}>
      <div data-trans-e>
        <video
          src={vid}
          className="uts-fluid object-fit-cover"
          loop
          autoPlay
          muted
          // preload="none"
        ></video>
      </div>

      <div className="text-center">
        <p className="mx-auto mb-5" data-trans-e>
          TWICE was founded in Madrid in 2022 by Alberto Benito, Mauricio
          Garrido, and Joaco Gasset. Three guys whose extensive professional
          experience and entrepreneurial spirit united them in a common goal: to
          be competitive while having fun.
        </p>
        <p className="mx-auto my-5" data-trans-e>
          The three main foundations of TWICE's identity are commitment,
          creativity, and care.
        </p>
        <p className="mx-auto mt-5" data-trans-e>
          Through our philosophy, we commit ourselves to our goals by working
          with professionalism and teamwork.
        </p>
      </div>

      <div data-trans-e>
        <img
          src={rightImg}
          className="uts-fluid object-fit-cover"
          alt="TWICE Team"
          // loading="lazy"
        />
      </div>
    </div>
  );
}

function Vision() {
  return (
    <div
      className={`${styles["our-vision"]} d-flex justify-content-sm-end px-3 px-sm-0
    `}
    >
      <div className="ps-sm-5">
        <span className="d-block text-uppercase fw-bold uts-step-100" data-trans-e>
          Our vision
        </span>

        <p className="lh-sm pe-2 mt-2 text-secondary" data-trans-e>
          The purpose is to create stories that inspire by putting creativity at
          the service of emotion, using the best technical and digital media.
        </p>
      </div>
    </div>
  );
}

const Team = () => {
  return ( 
    <>
    <div className="text-uppercase ps-3 fs-3 mt-5">
      <span>
        the squad
      </span>
    </div>
    
      <InfScrollDa
        firstArray={firstArray}
        secondArray={secondArray}
        contentType={"image"}
      />

    </>
   );
}
const TwoPercent = () => {
  return (
    <section className={` ${styles["two-percent-wrapper"]} wrapper px-4 py-5 py-md-2 row`}>
    
      <div className="col col-12 col-sm-6  p-1 gap-2">
        <div className="row p-2">
          <span className={`${styles["two"]} col col-sm-12`} >2%</span>
          <div className="col col-sm-12">
           <p>of our profit is donated to the projects we believe in</p>
          </div>
        </div>
      </div>

      <div className="col col-12 col-sm-5 ms-sm-auto p-1">
        <div className="row">

        <video autoPlay loop muted
        className="col col-12 object-fit-cover"
        // src="/about/videos/two-percent.mp4"
        src={`${import.meta.env.BASE_URL}about/videos/two-percent.mp4`}
        />

        <p className="col col-12 mt-3">
          In the fast-paced world of marketing and audiovisual production, where creativity meets strategy, TWICE stands out not just for its exceptional work, but also for its commitment to making a positive impact.
        </p>

              <AnimatedBtn
      to="/two-percent"
      text="more about 2%"
      ocs="mt-2"
      initIcon={<FaStarOfLife />}
      />
        
        </div>

      </div>

    </section>
  )
}

const About = () => {
  return (
    <>
      <Title />
      <Grid />
      <Vision />

      <Team/>
      <TwoPercent/>
    </>
  );
};

export default About;
