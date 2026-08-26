import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

export const AuthHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={require('@/assets/images/qinshihuang.jpg')}
          style={styles.avatar}
          contentFit="cover"
          contentPosition="top center"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.eyebrow}>CONVERSATION WITH</Text>
        <Text style={styles.title}>Qin Shi Huang</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.gray[100],
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
  },
  eyebrow: {
    ...Typography.h4,
    color: Colors.gray[500],
    letterSpacing: 0.5,
  },
  title: {
    ...Typography.h1,
    color: Colors.gray[900],
  },
});
