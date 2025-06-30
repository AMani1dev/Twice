import { useEffect, useState } from "react";
import gsap from "gsap";

const Intro = () => {
    const [isVisible, setIsVisible] = useState(true);

    const textArray = Array.from("twice");
    const text = textArray.map((letter, i) => (
        <span key={i} className="text-black d-inline-block ms-2 intro-wrapper__letter">
            {letter}
        </span>
    ));

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(".intro-wrapper__letter", {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            ease: "power4.inOut",
            duration: 0.5,
            stagger: 0.2143
        })
        .to(".intro-wrapper__letter", {
            y: -100,
            opacity: 0,
            ease: "power4.inOut",
            duration: 0.5,
            stagger: 0.2143
        })
        .to(".intro-col", {
            y: "-103%",
            ease: "power4.inOut",
            duration: 0.5,
            stagger: 0.123,
            onComplete: () => {
                setIsVisible(false); 
            }
        });
    }, []);

    if (!isVisible) return null;

    return (
        <section className={`intro-wrapper uts-z-101 position-fixed overflow-hidden uts-inset-0 row pe-none user-select-none`}>
            <div className="col intro-col bg-white"></div>
            <div className="col intro-col bg-white"></div>
            <div className="col intro-col bg-white"></div>
            <div className="col intro-col bg-white"></div>

            <span className="position-absolute text-center justify-content-centerd-flex uts-step-400 text-uppercase fw-bold uts-middle">
                {text}
            </span>
        </section>
    );
};

export default Intro;
