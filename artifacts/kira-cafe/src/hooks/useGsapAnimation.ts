import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapCleanup() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, []);
}
