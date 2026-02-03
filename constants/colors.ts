// TPCC 应用颜色主题
export const Colors = {
  // 基础颜色
  white: '#FFFFFF',
  black: '#0A0A0A',
  
  // 灰色系
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
  
  // 主色 - 蓝紫渐变
  primary: {
    light: '#2B7FFF',
    dark: '#155DFC',
    purple: '#9810FA',
    gradient: ['#2B7FFF', '#9810FA'],
  },
  
  // 模式颜色
  modes: {
    famous: {
      // 秦始皇风格：金色、深红、黑色
      primary: '#D4AF37', // 金色
      secondary: '#8B0000', // 深红色
      light: '#FFF8E7', // 淡金色背景
      border: '#B8860B', // 深金色边框
      text: '#8B4513', // 棕色文字
      tag: '#FFD700', // 金色标签
      tagText: '#8B0000', // 深红色标签文字
      gradient: ['#D4AF37', '#8B0000'], // 金色到深红渐变
    },
  },
  
  // 消息气泡颜色
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
  
  // 功能色
  success: '#00C950',
  warning: '#FF6900',
  error: '#EC003F',
  info: '#2B7FFF',
};

export type ModeType = 'famous';

export const getModeColors = (mode: ModeType) => Colors.modes[mode];
