// TPCC app color theme
export const Colors = {
  // Base colors
  white: '#FFFFFF',
  black: '#0A0A0A',
  
  // Gray scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DC',
    400: '#99A1AF',
    500: '#6A7282',
    600: '#4A5565',
    700: '#364153',
    800: '#1E2939',
    900: '#101828',
  },
  
  // Primary - blue-purple gradient
  primary: {
    light: '#2B7FFF',
    dark: '#155DFC',
    purple: '#9810FA',
    gradient: ['#2B7FFF', '#9810FA'],
  },
  
  // Mode colors
  modes: {
    famous: {
      // Qin Shi Huang style: gold, crimson, black
      primary: '#D4AF37', // gold
      secondary: '#8B0000', // crimson
      light: '#FFF8E7', // light gold background
      border: '#B8860B', // dark gold border
      text: '#8B4513', // brown text
      tag: '#FFD700', // gold tag
      tagText: '#8B0000', // crimson tag text
      gradient: ['#D4AF37', '#8B0000'], // gold to crimson gradient
    },
  },
  
  // Message bubble colors
  message: {
    user: {
      background: ['#2B7FFF', '#155DFC'],
      text: '#FFFFFF',
    },
    ai: {
      background: '#F9FAFB',
      border: '#D1D5DC',
      text: '#1E2939',
      label: '#101828',
    },
    system: {
      background: '#F3F4F6',
      text: '#4A5565',
    },
  },
  
  // Functional colors
  success: '#00C950',
  warning: '#FF6900',
  error: '#EC003F',
  info: '#2B7FFF',
};

export type ModeType = 'famous';

export const getModeColors = (mode: ModeType) => Colors.modes[mode];
