//eslint-disable-next-line

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor;
    // grey: PaletteColor;
  }

  interface TypeBackground {
    light: string;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
