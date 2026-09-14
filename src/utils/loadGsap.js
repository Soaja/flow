let pending;

export function loadGsap() {
  return pending ||= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return gsap;
  }).catch(error => { pending = undefined; throw error; });
}
