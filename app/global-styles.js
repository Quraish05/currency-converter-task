import { createGlobalStyle } from 'styled-components';

import poppinsBold from 'assets/fonts/Poppins-Bold.ttf';
import poppinsMedium from 'assets/fonts/Poppins-Medium.ttf';
import poppinsRegular from 'assets/fonts/Poppins-Regular.ttf';
import poppinsLight from 'assets/fonts/Poppins-Light.ttf';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #F9F9FB;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  @font-face {
    font-family: 'Poppins-Bold';
    src: url(${poppinsBold});
  }

  @font-face {
    font-family: 'Poppins-Medium';
    src: url(${poppinsMedium});
  }

  @font-face {
    font-family: 'Poppins-Regular';
    src: url(${poppinsRegular});
  }

  @font-face {
    font-family: 'Poppins-Light';
    src: url(${poppinsLight});
  }
`;

export default GlobalStyle;
