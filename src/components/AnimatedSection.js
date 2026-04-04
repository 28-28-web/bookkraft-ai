'use client';

import { useEffect, useRef } from 'react';

/**
 * AnimatedSection — wraps children in an IntersectionObserver.
 * Adds 'is-visible' class to any direct child with 'animate-on-scroll'.
 * Supports stagger-1 through stagger-6 for sequential reveals.
 */
export default function AnimatedSection({ children, className = '', threshold = 0.12 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll('.animate-on-scroll');
    if (!targets.length) {
      // Also animate the wrapper itself if it has the class
      if (el.classList.contains('animate-on-scroll')) {
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); } },
          { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
      }
      return;
    }

    const observers = [];
    targets.forEach((target) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            target.classList.add('is-visible');
            obs.disconnect();
          }
        },
        { threshold }
      );
      obs.observe(target);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
