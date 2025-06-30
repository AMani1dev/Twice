import styles from "./index.module.css"
import clsx from "clsx"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveHvid() {
  useEffect(() => {
    const isDesktop = window.innerWidth > 900 && !/Mobi|Android/i.test(navigator.userAgent)

    if (isDesktop) {
      let videoContainer = document.querySelector(`.${styles["video-container-desktop"]}`)

      gsap.ticker.lagSmoothing(0)

      const breakpoints = [
        { mw: 1000, trY: -135, movMultiplier: 450 },
        { mw: 1100, trY: -130, movMultiplier: 500 },
        { mw: 1200, trY: -125, movMultiplier: 550 },
        { mw: 1300, trY: -120, movMultiplier: 600 },
      ]

      const getInitVals = () => {
        const w = window.innerWidth
        for (const bp of breakpoints) {
          if (w < bp.mw) {
            return {
              trY: bp.trY,
              movMultiplier: bp.movMultiplier,
            }
          }
        }
        return {
          trY: -100,
          movMultiplier: 650,
        }
      }

      const initVals = getInitVals()


      const animationState = {
        scrollProgress: 0,
        initialTrY: initVals.trY,
        currentTrY: initVals.trY,
        movementMultiplier: initVals.movMultiplier,
        scale: 0.25,
        gap: 2,
        targetMouseX: 0,
        currentMouseX: 0,
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: ".intro",
          start: "top bottom",
          end: "top 10%",
          scrub: true,
          onUpdate: (self) => {
            animationState.scrollProgress = self.progress;

            animationState.currentTrY = gsap.utils.interpolate(
              animationState.initialTrY, 0, animationState.scrollProgress
            )

            animationState.scale = gsap.utils.interpolate(0.25, 1, animationState.scrollProgress)
            animationState.gap = gsap.utils.interpolate(2, 1, animationState.scrollProgress)

            if (animationState.scrollProgress < 0.4) {
              let firstPartProgress = animationState.scrollProgress / 0.4
              animationState.fs = gsap.utils.interpolate(80, 40, firstPartProgress)
            } else {
              let secondPartProgress = (animationState.scrollProgress - 0.4) / 0.6
              animationState.fs = gsap.utils.interpolate(40, 20, secondPartProgress)
            }
          },
        },
      })

      const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

      document.addEventListener("mousemove", (e) => {
        let raw = (e.clientX / window.innerWidth - 0.5) * 2
        animationState.targetMouseX = clamp(raw, -1, 1)
      })

      const animate = () => {
        const {
          scale,
          targetMouseX,
          currentMouseX,
          gap,
          movementMultiplier,
          currentTrY,
        } = animationState

        const scaleMovementMultiplier = (1 - scale) * movementMultiplier
        const maxHorizontalMovement = scale < 0.95 ? targetMouseX * scaleMovementMultiplier : 0

        animationState.currentMouseX = gsap.utils.interpolate(
          currentMouseX,
          maxHorizontalMovement,
          0.05
        )

        videoContainer.style.transform = `translateY(${currentTrY}%) translateX(${animationState.currentMouseX}px) scale(${scale})`
        videoContainer.style.gap = `${gap}em`
      }

      gsap.ticker.add(animate)
    }
  }, [])

  return (
    <>


      <div className={clsx("hero", "vstack", "justify-content-between", "pt-5", styles.hero)}>
        <h1 className="text-uppercase text-center position-relative">twice </h1>
      </div>

      <section className={clsx("intro", "h-100", "my-5", "rounded-4", "py-5","px-2", styles.section)}>
        <div className={clsx("position-relative", styles["video-container-desktop"])}>
          <div className={clsx("video-preview", "position-relative", "w-100", "overflow-hidden", styles["video-preview"])}>
            <div className={clsx("video-wrapper", "position-absolute", "top-0", "start-0", "w-100", "h-100", "overflow-hidden", styles["video-wrapper"])}>
              <iframe
          src="https://player.vimeo.com/video/1064359439?api=1&background=1"
                allow="autoplay; fullscreen"
                referrerPolicy="no-referrer"
                title="codegrid video"
                className="position-absolute top-0 start-0 w-100 h-100 pe-none"
                  fetchPriority="high"
              ></iframe>
            </div>
          </div>

          <div className={clsx("mt-2", "fs-1", styles["video-title"])}>
            <p>PRO showreel</p>
            <p>2024 - 2025</p>
          </div>
        </div>

        <div className={clsx("mx-auto", styles["video-container-mobile"])}>
          <div className={clsx("video-preview", "position-relative", "w-100", "overflow-hidden", styles["video-preview"])}>
            <div className={clsx("video-wrapper", styles["video-wrapper"])}>
              <iframe
                src="https://player.vimeo.com/video/1027126039?background=1&autoplay=1&loop=1&muted=1&dnt=1&app_id=codegrid"
                allow="autoplay; fullscreen"
                referrerPolicy="no-referrer"
                loading="lazy"
                title="codegrid video"
                className="position-absolute top-0 start-0 w-100 h-100 pe-none"
              ></iframe>
            </div>
          </div>
          <div className={styles["video-title"]}>
            <p>PRO showreel</p>
            <p>2024 - 2025</p>
          </div>
        </div>
      </section>
    </>
  )
}
