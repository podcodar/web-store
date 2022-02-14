import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  components: {
    Steps,
    Link: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },

  colors: {
    // roxo
    first: {
      0: '#5D417A', // original
      50: '#f2eef6',
      100: '#e5deed',
      150: '#d8cde4',
      200: '#cbbddb',
      250: '#bfacd2',
      300: '#b29cc9',
      350: '#a58bc1',
      400: '#987ab8',
      450: '#8b6aaf',
      500: '#7e59a6',
      550: '#725095',
      600: '#654785',
      650: '#583e74',
      700: '#4c3663',
      750: '#3f2d53',
      800: '#322442',
      850: '#261b32',
      900: '#191221',
    },

    // rosa
    second: {
      0: '#FF4CFF', // original
      50: '#ffe6ff',
      100: '#ffccff',
      150: '#ffb3ff',
      200: '#ff99ff',
      250: '#ff80ff',
      300: '#ff66ff',
      350: '#ff33ff',
      400: '#ff1aff',
      450: '#ff00ff',
      500: '#e600e6',
      550: '#cc00cc',
      600: '#b300b3',
      650: '#990099',
      700: '#800080',
      750: '#660066',
      800: '#4d004d',
      850: '#330033',
      900: '#1a001a',
    },

    // azul claro
    third: {
      0: '#29DDFF', // original
      50: '#e6fbff',
      100: '#ccf6ff',
      150: '#b3f2ff',
      200: '#99eeff',
      250: '#80eaff',
      300: '#66e6ff',
      350: '#4de1ff',
      400: '#33ddff',
      450: '#1ad9ff',
      500: '#00d5ff',
      550: '#00bfe6',
      600: '#00aacc',
      650: '#0095b3',
      700: '#008099',
      750: '#006a80',
      800: '#005566',
      850: '#00404d',
      900: '#002b33',
    },

    // verde água
    fourth: {
      0: '#17A9BC', // original
      50: '#e8fafc',
      100: '#d2f5f9',
      150: '#bbf0f7',
      200: '#a4eaf4',
      250: '#8ee5f1',
      300: '#77e0ee',
      350: '#60dbeb',
      400: '#49d6e9',
      450: '#33d1e6',
      500: '#1ccce3',
      550: '#19b7cc',
      600: '#16a3b6',
      650: '#148f9f',
      700: '#117a88',
      750: '#0e6671',
      800: '#0b515b',
      850: '#083d44',
      900: '#06292d',
    },

    // laranja
    fifth: {
      0: '#F99223', // original
      50: '#fef3e6',
      100: '#fee6cd',
      150: '#fddab4',
      200: '#fcce9c',
      250: '#fcc183',
      300: '#fbb56a',
      350: '#fba951',
      400: '#fa9c38',
      450: '#f9901f',
      500: '#f98406',
      550: '#e07606',
      600: '#c76905',
      650: '#ae5c04',
      700: '#954f04',
      750: '#7c4203',
      800: '#633503',
      850: '#4b2702',
      900: '#321a01',
    },
  },
});

export default theme;
