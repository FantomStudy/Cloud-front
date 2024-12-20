import { delay } from "motion";

export const drawLogo = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (count) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        repeat: count,
        type: "spring",
        duration: 2.5,
        bounce: 0,
      },
      opacity: { duration: 0.01 },
    },
  }),
};

export const openSide = {
  opened: {
    x: 0,
    transition: { duration: 0.2, type: "spring", bounce: 0 },
  },
  closed: {
    x: "-100%",
    transition: { duration: 0.2, type: "spring", bounce: 0 },
  },
};

export const buttonAnimate = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: (custom) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
  tapped: {
    scale: 0.95,
  },
};

export const fileAppear = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: {
      scale: { duration: 0.5, type: "spring", delay: custom * 0.2 },
      delay: custom * 0.2,
    },
  }),
};

export const appearnce = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      scale: { duration: 0.5, type: "spring", delay: custom * 0.2 },
      delay: custom * 0.2,
    },
  }),
};
