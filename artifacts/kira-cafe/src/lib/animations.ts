import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    gsapScrollTo: (y: number) => void;
  }
}

export function animateHero(): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.fromTo(
    ".gsap-hero-title",
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
  )
    .fromTo(
      ".gsap-hero-subtitle",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      ".gsap-hero-cta",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      },
      "-=0.5"
    )
    .fromTo(
      ".gsap-scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3"
    );
  return tl;
}

export function animateMenu(): void {
  gsap.fromTo(
    ".gsap-section-heading",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: { trigger: "#menu", start: "top 80%" },
    }
  );
  gsap.fromTo(
    ".gsap-menu-card",
    { opacity: 0, y: 80, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: { trigger: "#menu", start: "top 75%" },
    }
  );
}

export function animateSuasana(): void {
  gsap.fromTo(
    ".gsap-gallery-img",
    { scale: 1.1, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: "#suasana", start: "top 75%" },
    }
  );
}

export function animateInfoCards(): void {
  gsap.fromTo(
    ".gsap-info-card",
    { x: -60, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: "#suasana", start: "top 70%" },
    }
  );
}

export function animateLokasi(): void {
  gsap.fromTo(
    ".gsap-lokasi-item",
    { x: -40, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: "#lokasi", start: "top 80%" },
    }
  );
  gsap.fromTo(
    ".gsap-lokasi-map",
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      scrollTrigger: { trigger: "#lokasi", start: "top 75%" },
    }
  );
}

export function animateKisah(): void {
  gsap.fromTo(
    ".gsap-kisah-img",
    { x: -80, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: "#kisah", start: "top 75%" },
    }
  );
  gsap.fromTo(
    ".gsap-kisah-text",
    { x: 80, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: "#kisah", start: "top 75%" },
    }
  );
  gsap.fromTo(
    ".gsap-kisah-stat",
    { scale: 0.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: "#kisah", start: "top 70%" },
    }
  );
}

export function animateCta(): void {
  gsap.fromTo(
    ".gsap-cta-content",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: "#reservasi", start: "top 80%" },
    }
  );
}

export function animateModalOpen(el: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.fromTo(
    el.querySelector(".gsap-modal-overlay"),
    { opacity: 0 },
    { opacity: 1, duration: 0.3 }
  )
    .fromTo(
      el.querySelector(".gsap-modal-box"),
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
    )
    .fromTo(
      el.querySelectorAll(".gsap-modal-field"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 },
      "-=0.1"
    );
  return tl;
}

export function animateModalClose(el: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.fromTo(
    el.querySelector(".gsap-modal-box"),
    { scale: 1, opacity: 1 },
    { scale: 0.9, opacity: 0, duration: 0.2 }
  ).fromTo(
    el.querySelector(".gsap-modal-overlay"),
    { opacity: 1 },
    { opacity: 0, duration: 0.2 }
  );
  return tl;
}

export function animateParallaxHero(): void {
  gsap.to(".gsap-hero-bg", {
    y: "20%",
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function initSmoothScroll(): void {
  window.gsapScrollTo = (y: number) => {
    gsap.to(window, { scrollTo: y, duration: 0.8, ease: "power3.inOut" });
  };
}

export function animateNavbar(): void {
  gsap.fromTo(
    ".gsap-navbar",
    { backgroundColor: "rgba(28,27,27,0.90)", boxShadow: "none" },
    {
      backgroundColor: "rgba(28,27,27,0.97)",
      boxShadow: "0 2px 20px rgba(0,0,0,0.15)",
      scrollTrigger: {
        trigger: ".gsap-navbar",
        start: "top top",
        end: "+=100",
        scrub: true,
      },
    }
  );
}
