'use client';

import { useLayoutEffect } from 'react';

const sectionSelector = [
  'main > section:not(.hero)',
  'main > footer',
].join(', ');

const itemSelector = [
  '.benefit-rail article',
  '.category-card',
  '.product-card',
  '.process-grid article',
  '.about-value-grid article',
  '.contact-info article',
].join(', ');

export default function RevealOnScroll() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));
    const items = Array.from(document.querySelectorAll<HTMLElement>(itemSelector));
    const targets = [...sections, ...items];

    if (!targets.length) return undefined;

    document.documentElement.dataset.motion = 'ready';
    sections.forEach((element) => element.dataset.reveal = 'section');
    items.forEach((element, index) => {
      element.dataset.reveal = 'item';
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    });

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
