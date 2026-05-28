import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BIG = 540;
const MID = Math.round(BIG * 0.8);
const SML = Math.round(BIG * 0.7);

const wrappers = gsap.utils.toArray(".horizontal > div");
const cards = wrappers.map((wrapper) => wrapper.querySelector(".card"));

const setSize = (index, width) => {
  gsap.set(wrappers[index], { width });
  gsap.set(cards[index], { width, height: width });
};

setSize(0, SML);
setSize(1, MID);
for (let i = 2; i < wrappers.length; i++) {
  setSize(i, BIG);
}

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".horizontal-mask",
    start: "center center",
    end: `+=${(wrappers.length - 3) * 700}px`,
    pin: ".horizontal-mask",
    scrub: 0.8,
    invalidateOnRefresh: true,
  },
});

const addResize = (index, width, position) => {
  tl.to(wrappers[index], { width, ease: "none" }, position);
  tl.to(cards[index], { width, height: width, ease: "none" }, position);
};

for (let step = 0; step < wrappers.length - 3; step++) {
  addResize(step, 0, step);
  addResize(step + 1, SML, step);
  addResize(step + 2, MID, step);
  addResize(step + 3, BIG, step);
}
