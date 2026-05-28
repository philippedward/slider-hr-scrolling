import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BIG = 540;
const MID = Math.round(540 * 0.8); // 432px
const SML = Math.round(540 * 0.7); // 378px

const wrappers = gsap.utils.toArray(".horizontal > div");
const N = wrappers.length;

// Tailles initiales
wrappers.forEach((wrapper, i) => {
  const card = wrapper.querySelector(".card");
  const size = i === 0 ? SML : i === 1 ? MID : BIG;

  // Le wrapper ne gère QUE la largeur (pas la hauteur, le flex s'en charge)
  gsap.set(wrapper, { width: size });

  // La card gère largeur ET hauteur
  gsap.set(card, { width: size, height: size });
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".horizontal-mask",
    start: "center center",
    end: `+=${(N - 3) * 700}px`,
    pin: ".horizontal-mask",
    scrub: 0.8,
    invalidateOnRefresh: true,
  },
});

for (let step = 0; step < N - 3; step++) {
  const t = step;

  // Carte qui sort → width 0
  tl.to(wrappers[step], { width: 0, ease: "none" }, t);
  tl.to(
    wrappers[step].querySelector(".card"),
    { width: 0, height: 0, ease: "none" },
    t,
  );

  // step+1 : devient petite
  tl.to(wrappers[step + 1], { width: SML, ease: "none" }, t);
  tl.to(
    wrappers[step + 1].querySelector(".card"),
    { width: SML, height: SML, ease: "none" },
    t,
  );

  // step+2 : devient moyenne
  tl.to(wrappers[step + 2], { width: MID, ease: "none" }, t);
  tl.to(
    wrappers[step + 2].querySelector(".card"),
    { width: MID, height: MID, ease: "none" },
    t,
  );

  // step+3 : entre en grande
  tl.to(wrappers[step + 3], { width: BIG, ease: "none" }, t);
  tl.to(
    wrappers[step + 3].querySelector(".card"),
    { width: BIG, height: BIG, ease: "none" },
    t,
  );
}
