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
    personal: {
      primary: '#2B7FFF',
      secondary: '#00B8DB',
      light: '#EFF6FF',
      border: '#BEDBFF',
      text: '#1C398E',
      tag: '#DBEAFE',
      tagText: '#1447E6',
      gradient: ['#2B7FFF', '#00B8DB'],
    },
    famous: {
      primary: '#AD46FF',
      secondary: '#F6339A',
      light: '#FAF5FF',
      border: '#E9D4FF',
      text: '#59168B',
      tag: '#F3E8FF',
      tagText: '#8200DB',
      gradient: ['#AD46FF', '#F6339A'],
    },
    learning: {
      primary: '#00C950',
      secondary: '#00BC7D',
      light: '#F0FDF4',
      border: '#B9F8CF',
      text: '#0D542B',
      tag: '#DCFCE7',
      tagText: '#008236',
      gradient: ['#00C950', '#00BC7D'],
    },
    coach: {
      primary: '#FF6900',
      secondary: '#FB2C36',
      light: '#FFF7ED',
      border: '#FFD6A7',
      text: '#7E2A0C',
      tag: '#FFEDD4',
      tagText: '#0A0A0A',
      gradient: ['#FF6900', '#FB2C36'],
    },
    emotion: {
      primary: '#615FFF',
      secondary: '#AD46FF',
      light: '#FFF1F2',
      border: '#FFA1AD',
      text: '#312C85',
      tag: '#FFE4E6',
      tagText: '#8B0836',
      gradient: ['#615FFF', '#AD46FF'],
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

export type ModeType = 'personal' | 'famous' | 'learning' | 'coach' | 'emotion';

export const getModeColors = (mode: ModeType) => Colors.modes[mode];
