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

export const appearance = {
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

export const sideMenuAppear = {
  opened: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const sideMenuOverlay = {
  opened: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: { duration: 0 },
      opacity: { duration: 0.1 },
    },
  },
  closed: {
    opacity: 0,
    scale: 0,
    transition: {
      scale: { duration: 0 },
      opacity: { duration: 0.1 },
    },
  },
};
