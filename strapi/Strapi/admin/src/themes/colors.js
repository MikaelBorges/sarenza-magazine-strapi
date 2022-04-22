import sarenzaColors from "./sarenza";

let colors = {
  black: '#333740',
  white: '#ffffff',
  red: '#ff203c',
  orange: '#ff5d00',
  lightOrange: '#f64d0a',
  yellow: '#ffd500',
  green: '#6dbb1a',
  blue: '#0097f7',
  teal: '#5bc0de',
  pink: '#ff5b77',
  purple: '#613d7c',
  gray: '#464a4c',
  border: '#E3E9F3',
  'gray-dark': '#292b2c',
  grayLight: '#636c72',
  'gray-lighter': '#eceeef',
  'gray-lightest': '#f7f7f9',
  brightGrey: '#f0f3f8',
  darkGrey: '#e3e9f3',
  lightGrey: '#fafafa',
  lightestGrey: '#fbfbfb',
  mediumGrey: '#F2F3F4',
  grey: '#9ea7b8',
  greyDark: '#292b2c',
  greyAlpha: 'rgba(227, 233, 243, 0.5)',
  lightBlue: '#E6F0FB',
  mediumBlue: '#007eff',
  darkBlue: '#AED4FB',
  content: {
    background: '#fafafb',
    'background-alpha': 'rgba(14, 22, 34, 0.02)',
  },
  leftMenu: {
    'link-hover': '#1c2431',
    'link-color': '#919bae',
    'title-color': '#5b626f',
  },
  strapi: {
    'gray-light': '#eff3f6',
    gray: '#535f76',
    'blue-darker': '#18202e',
    'blue-dark': '#151c2e',
    blue: '#0097f7',
  },
  link: {
    activeColor: '#FFFFFF'
  },
  logo: {
    bgColor: '#007eff'
  }
};

colors = sarenzaColors.apply(colors);

export default colors;
