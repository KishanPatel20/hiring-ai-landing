
// This utility adds animation classes to elements as they scroll into view

export function initScrollAnimation() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1
  });

  animateElements.forEach(element => {
    observer.observe(element);
  });

  return () => {
    animateElements.forEach(element => {
      observer.unobserve(element);
    });
  };
}
