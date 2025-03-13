import { Variants } from 'framer-motion';

// Base fade-in animation variant
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Fade-in-up animation (elements move upward while fading in)
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20, // Start 20px below the final position
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Fade-in-down animation (elements move downward while fading in)
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20, // Start 20px above the final position
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Fade-in-left animation (elements move from the left while fading in)
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20, // Start 20px to the left
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Fade-in-right animation (elements move from the right while fading in)
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20, // Start 20px to the right
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Fade-in with stagger for child elements (e.g., for a list of items like in MovieCarousel)
export const fadeInStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

// Child variant for use with stagger (apply to each child element)
export const fadeInStaggerChild: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};