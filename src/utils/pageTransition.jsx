import gsap from "gsap";

const pageTransition = (path, navigate) => {
  const tl = gsap.timeline();
tl.slideInCols(".page-transition-wrapper > div:first-child .col")
  .slideInCols(".page-transition-wrapper > div:last-child .col", {}, "<")

  .add(() => navigate(path), "+=0.05")

  .slideInCols(
    ".page-transition-wrapper > div:first-child .col",
    { y: "-110%" },
    "+=0.3"
  )
  .slideInCols(
    ".page-transition-wrapper > div:last-child .col",
    { y: "110%" },
    "<"
  );

};

export default pageTransition;
