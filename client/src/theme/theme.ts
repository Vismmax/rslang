import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

const options: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1440,
    },
  },
};

const theme = createMuiTheme(options);

export default theme;
