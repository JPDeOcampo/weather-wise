import { useMediaQuery } from "react-responsive";

const BREAKPOINTS = {
  XSM_2: 517,
  XSM: 576,
  SM: 768,
  SM_UP: 937,
  MD: 992,
  LG: 1024,
  LG_UP: 1170,
  LG_UP_1: 1107,
};

const DEVICE_WIDTH = {
  LG_UP: BREAKPOINTS.LG_UP,
  LG: BREAKPOINTS.LG,
  MD: BREAKPOINTS.MD,
  SM: BREAKPOINTS.SM,
  XSM_2: BREAKPOINTS.XSM_2,
};

export const IsXLG_Tablet = () => {
  return useMediaQuery({
    query: `(max-width: ${DEVICE_WIDTH.LG_UP}px)`,
  });
};

export const IsTablet = () => {
  return useMediaQuery({
    query: `(max-width: ${DEVICE_WIDTH.LG}px)`,
  });
};

export const IsMD_Tablet = () => {
  return useMediaQuery({
    query: `(max-width: ${DEVICE_WIDTH.MD}px)`,
  });
};

export const IsMobile = () => {
  return useMediaQuery({
    query: `(max-width: ${DEVICE_WIDTH.SM}px)`,
  });
};

export const Is2xMobile = () => {
  return useMediaQuery({
    query: `(max-width: ${DEVICE_WIDTH.XSM_2}px)`,
  });
};
