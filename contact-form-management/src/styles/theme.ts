'use client';

import { Montserrat } from 'next/font/google';
import {
  CssVarsThemeOptions,
  experimental_extendTheme as extendTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const themeContent: CssVarsThemeOptions = {
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  cssVarPrefix: '',
};

const theme = responsiveFontSizes(extendTheme(themeContent));

export default theme;
