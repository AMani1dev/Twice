import InteractiveHvid from "../../components/ui/InteractiveHvid"
import AnimatedBtn from "../../components/ui/Btn"

import styles from "./index.module.css"

import { useEffect, useRef} from "react"

import { FaStarOfLife } from "react-icons/fa6";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)




const StickSection = () => {
  const stickyData = [
    { id: 1, title: "liga f", src: "/home/sticky-1.jpg" },
    { id: 2, title: "seve collection", src: "/home/sticky-2.jpg" },
    { id: 3, title: "starvie", src: "/home/sticky-3.jpg" },
  ]

  const sectionRefs = useRef([])
  const previewRefs = useRef([])
  const previewWrapperRef = useRef(null)

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, stickyData.length)
    previewRefs.current = previewRefs.current.slice(0, stickyData.length)

    addImageScaleAnimation(sectionRefs.current, previewRefs.current)
    addClipPathAnimation(sectionRefs.current, previewRefs.current)
    addHidePreviewOnScroll(sectionRefs.current, previewWrapperRef)
  }, [])

  const titles = stickyData.map((e, index) => (
    <section
      ref={el => (sectionRefs.current[index] = el)}
      className=" p-3 text-center text-capitalize display-1"
      key={e.id}
    >
      <span>{e.title}</span>
    </section>
  ))
  
  const previews = stickyData.map((e, index) => (
  <div
      ref={el => (previewRefs.current[index] = el)}
      className={`${styles.img} overflow-hidden bg-secondary uts-fluid position-absolute`}
      key={e.id}
    >
      <img src={e.src} className="uts-fluid" alt="img preview" loading="lazy" />
    </div>
  ))

  return (
    <div className="wrapper pe-none user-select-none">
      <div className={styles.titles}>
        {titles}
      </div>
      <div
        ref={previewWrapperRef}
        className={`${styles.previews} position-fixed uts-middle `}
      >
        {previews}
      </div>
    </div>
  )
}

function addImageScaleAnimation(sections, previews) {
  sections.forEach((section, index) => {
    const image = previews[index]?.querySelector("img")
    const startCondition = index === 0 ? "top top" : "bottom bottom"

    if (image && section) {
      gsap.to(image, {
        scrollTrigger: {
          trigger: section,
          start: startCondition,
          end: () => {
            const viewportHeight = window.innerHeight
            const sectionBottom = section.offsetTop + section.offsetHeight
            const additionalDistance = viewportHeight * 0.5
            const endValue = sectionBottom - viewportHeight + additionalDistance
            return `+=${endValue}`
          },
          scrub: 1,
        },
        scale: 1.5,
        ease: "none",
      })
    }
  })
}

function addClipPathAnimation(sections, previews) {
  const totalSections = sections.length ;

  function animateClipPath(
    section,
    preview,
    startClipPath,
    endClipPath,
    start = "top center",
    end = "bottom top")
    {
    if (!section || !preview) return

    ScrollTrigger.create({
      trigger: section,
      start,
      end,
      onEnter: () => {
        gsap.to(preview, {
          scrollTrigger: {
            trigger: section,
            start,
            end,
            scrub: 0.125,
          },
          clipPath: endClipPath,
          ease: "none",
        })
      },
    })
  }

  animateClipPath(
    sections[0],
    previews[0],
    "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  )

  for (let i = 1; i < totalSections; i++) {
    const currentSection = sections[i]
    const prevPreview = previews[i - 1]
    const currentPreview = previews[i]

    animateClipPath(
      currentSection,
      prevPreview,
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "top bottom",
      "center center"
    )

    if (i < totalSections) {
      animateClipPath(
        currentSection,
        currentPreview,
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "center center",
        "bottom top"
      )
    }
  }
}

function addHidePreviewOnScroll(sections, previewWrapperRef) {
  const lastSection = sections[sections.length - 1];
  const previewWrapper = previewWrapperRef.current;

  if (!lastSection || !previewWrapper) return;

  ScrollTrigger.create({
    trigger: lastSection,
    start: "bottom top-=400", // when bottom of section passes 100px above the top of viewport
    end: "bottom top",        // short range to ensure it fires just after scroll completes
    onEnter: () => previewWrapper.classList.add("opacity-0", "pe-none", "user-select-none"),
    onLeaveBack: () => previewWrapper.classList.remove("opacity-0", "pe-none", "user-select-none"),
  });
}


const FlexCalc = () => {
  const containerRef = useRef(null);

  const flexCalcArray = [
    { title: "The best driven production company", brand: "Bewatt" },
    { title: "Twice sets brand trends", brand: "Chacarra" },
    { title: "Victorious since 1881", brand: "Slazenger" },
    { title: "A Sound Mind in a Sound Body", brand: "Asics" },
    { title: "Inspiring an active and healthy lifestyle", brand: "Born" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".feature", { opacity: 0, y: 100 });

      ScrollTrigger.batch(".feature", {
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          });
        },
        once: true,
        start: "top 85%",
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section ref={containerRef} className={`${styles["features-container"]} mb-5`}>
      <blockquote className={`${styles.quote} mx-auto text-center fw-bold py-3 text-uppercase`}>
        Just believe our clients' words
      </blockquote>

      <div
        className={`${styles.features} text-uppercase fw-bold mt-5 px-1 d-flex flex-wrap justify-content-center`}
      >
        {flexCalcArray.map(item => (
          <div className="text-center feature" key={item.title}>
            <span className="d-block lh-sm">{item.title}</span>
            <span className="text-secondary">{item.brand}</span>
          </div>
        ))}
      </div>
    </section>
  );
};






const Home = () => {
  return (
    <>
    <InteractiveHvid />

    <div className="row flex-column flex-md-row align-items-center justify-content-md-center gap-4 px-4 mb-5">

      <div className="col col-sm-7 col-md-4 p-3">
        <img className="uts-fluid rounded-2" src="/home/x.webp" alt="img" loading="lazy" />
      </div>

      <div className="col col-sm-7 col-md-5 p-1">
        <span className="d-block text-center uts-mw-30-ch mx-auto">
          Our talented team is capable of tackling challenges of all kinds
        </span>

        <AnimatedBtn
      to="/services"
      text="our services"
      ocs="justify-content-center"
      initIcon={<FaStarOfLife />}
      />
        

        
  
      </div>

    </div>
      <StickSection />
      <FlexCalc/>
      


      <div style={{height : "20vh"}} ></div>
    </>
  )
}
export default Home
