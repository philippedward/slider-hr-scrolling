import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let horizontalSection = document.querySelector(".horizontal");

console.log(horizontalSection.scrollWidth);

gsap.to(".horizontal", {
  x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: ".horizontal",
    start: "center center",
    end: "+=2000px",
    pin: ".horizontal-mask",
    scrub: true,
    invalidateOnRefresh: true,
  },
});
