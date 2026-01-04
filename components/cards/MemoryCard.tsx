import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, ModeType, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface MemoryItem {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

interface MemoryCardProps {
  mode: ModeType;
  title: string;
  memories: MemoryItem[];
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ mode, title, memories }) => {
  const modeColors = getModeColors(mode);

  return (
    <LinearGradient
      colors={[modeColors.light, '#ECFEFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderColor: modeColors.border }]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: modeColors.primary }]}>
          <Ionicons name="document-text" size={16} color={Colors.white} />
        </View>
        <Text style={[styles.title, { color: modeColors.text }]}>{title}</Text>
      </View>
      <View style={styles.memoriesContainer}>
        {memories.map((memory, index) => (
          <View key={index} style={styles.memoryItem}>
            <Ionicons name={memory.icon} size={16} color={modeColors.primary} />
            <Text style={styles.memoryText}>{memory.text}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.body,
    fontWeight: '600',
  },
  memoriesContainer: {
    gap: 8,
  },
  memoryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  memoryText: {
    ...Typography.bodySmall,
    color: Colors.gray[700],
    flex: 1,
  },
});

