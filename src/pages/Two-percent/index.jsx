import styles from "./two-percent.module.css";

import StickyGallery from "../../components/ui/StickyGallery";

import eImg from "/two-percent/images/sg-img__2.jpg";

const imagesArray = [
  {
    src: "/two-percent/images/sg-img__1.jpg",
    id: 1,
  },
  {
    src: "/two-percent/images/sg-img__2.jpg",
    id: 2,
  },
  {
    src: "/two-percent/images/sg-img__3.jpg",
    id: 3,
  },
];

const TwoPercent = () => {
  return (
    <>
    <section className="vh-100 uts-flex-col-center text-center">
        <span className="text-uppercase uts-mw-15-ch uts-step-500">
            2% for a better world
        </span>
        <p className="uts-mw-25-ch uts-step--100" >
            2% of our profit we earmark to promote social causes and a sustainable world.
        </p>
    </section>

        <StickyGallery imagesArray={imagesArray} bg={eImg} />



            <section className="vh-100 uts-flex-col-center px-2 px-sm-4 text-center">
        <span className="text-uppercase uts-mw-30-ch uts-step-400">
            Crafting Success with a purposul 2%
        </span>
        <p className="uts-mw-50-ch uts-step--100 mt-3" >
            In the fast-paced world of marketing and audiovisual production, where creativity meets strategy, TWICE stands out not just for its exceptional work but also for its commitment to making a positive impact.
        </p>
    </section>

    </>
  );
};

export default TwoPercent;
