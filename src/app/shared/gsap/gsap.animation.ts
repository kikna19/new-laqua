import { gsap } from "gsap";
import { SplitText } from "../../../assets/splitText";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
export const tl = gsap.timeline();
const st = new SplitText({ words: 1, chars: 1, spacing: "1rem" });
export const colors = [
  '61,137,30',
  '228, 174, 197',
  '36, 58, 115',
  '221,126,0',
  '0,98,127',
  '178, 80, 104',
  '255, 99, 99',
  '106,72,113',
  '236, 190, 14',
  '105,105,0',
  '255, 159, 41',
  '58, 176, 255',
  '125, 30, 106'
];




export const textSplitAnimate = (word: HTMLElement[], delay: number, duration: number, stagger: number): void => {
  tl.fromTo(st.split(word).chars, {
    opacity: 0,
  }, {
    delay: delay,
    duration: duration,
    opacity: 1,
    rotateX: 360,
    stagger: stagger,
    ease: "power1.out",
    transformOrigin: "0 25% 25%",
  })
}


export const textAnimate = <T>(el: T[]): void => {
  tl.fromTo([el], {
    opacity: 0,
    y: 20,
  }, {
    delay: .1,
    opacity: 1,
    y: 5,
    duration: .8,
    ease: "power4.out",
    stagger: .5,
  }, '>')
}

export const scrollAnimate = (el: HTMLDivElement[]): void => {
  el.forEach((e, i) => {
    const delay = i / (i * 2);
    gsap.timeline({
      scrollTrigger: {
        trigger: e,
        start: "bottom bottom",
      }
    }).fromTo(e, {
      opacity: 0,
      y: 40,
    }, {
      delay: delay,
      duration: 1,
      opacity: 1,
      y: 5,
      ease: "power1",
      stagger: .1,
    })
  })
}