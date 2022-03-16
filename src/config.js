export const version = '1.0.0';
export const navbarBreakPoint = 'xl'; // Vertical navbar breakpoint
export const topNavbarBreakpoint = 'lg';

export const settings = {
  isFluid: false,
  isRTL: false,
  isDark: false,
  navbarPosition: 'vertical',
  showBurgerMenu: false, // controls showing vertical nav on mobile
  currency: '$',
  isNavbarVerticalCollapsed: false, // toggle vertical navbar collapse
  navbarStyle: 'transparent',
  locale: localStorage.getItem('i18nextLng')
};

const config = { version, navbarBreakPoint, topNavbarBreakpoint, settings };
export default config;
