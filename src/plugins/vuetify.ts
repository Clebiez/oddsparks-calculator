/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'

const lightTheme = {
  dark: false,
  colors: {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    'surface-variant': '#E8EDF5',
    primary: '#5C6BC0',
    'primary-darken-1': '#3949AB',
    secondary: '#FF8A65',
    'secondary-darken-1': '#F4511E',
    accent: '#7C4DFF',
    error: '#EF5350',
    info: '#42A5F5',
    success: '#66BB6A',
    warning: '#FFA726',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#121826',
    surface: '#1E2A3A',
    'surface-variant': '#263347',
    primary: '#7C8FE4',
    'primary-darken-1': '#5C6BC0',
    secondary: '#FFAB91',
    'secondary-darken-1': '#FF8A65',
    accent: '#B388FF',
    error: '#EF5350',
    info: '#42A5F5',
    success: '#66BB6A',
    warning: '#FFA726',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    utilities: false,
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
