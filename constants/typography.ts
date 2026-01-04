// TPCC 应用字体样式
import { StyleSheet } from 'react-native';

export const Typography = StyleSheet.create({
  // 标题
  h1: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  h2: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  h3: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  h4: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  
  // 正文
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  
  // 标签
  tag: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 15,
  },
  
  // 按钮
  button: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  
  // 数字展示
  number: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
  },
  numberLarge: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
});
