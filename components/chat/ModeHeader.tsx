import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, ModeType, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface ModeHeaderProps {
  mode: ModeType;
  title: string;
  subtitle: string;
}

const modeIcons: Record<ModeType, keyof typeof Ionicons.glyphMap> = {
  personal: 'person',
  famous: 'people',
  learning: 'school',
  coach: 'fitness',
  emotion: 'heart',
};

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
        <Ionicons name={modeIcons[mode]} size={20} color={Colors.white} />
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
    gap: 12,
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
