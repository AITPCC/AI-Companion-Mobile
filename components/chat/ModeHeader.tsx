import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Colors, ModeType, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface ModeHeaderProps {
  mode: ModeType;
  title: string;
  subtitle: string;
}

export const ModeHeader: React.FC<ModeHeaderProps> = ({ mode, title, subtitle }) => {
  const modeColors = getModeColors(mode);

  return (
    <LinearGradient
      colors={modeColors.gradient as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Image
          source={require('@/assets/images/qinshihuang.jpg')}
          style={styles.avatarImage}
          contentFit="cover"
          contentPosition="top center"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    minHeight: 120,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
    fontSize: 18,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
});
