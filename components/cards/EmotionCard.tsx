import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface EmotionCardProps {
  currentMood: string;
  moodIcon?: keyof typeof Ionicons.glyphMap;
}

export const EmotionCard: React.FC<EmotionCardProps> = ({
  currentMood = 'Calm & Neutral',
  moodIcon = 'happy',
}) => {
  const modeColors = getModeColors('emotion');

  return (
    <View style={[styles.container, { borderColor: Colors.gray[200] }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: modeColors.primary }]}>
          <Ionicons name="heart" size={16} color={Colors.white} />
        </View>
        <Text style={[styles.title, { color: modeColors.text }]}>Emotional Check-In</Text>
      </View>

      <View style={styles.moodSection}>
        <Text style={styles.moodLabel}>Current Mood:</Text>
        <View style={styles.moodDisplay}>
          <Ionicons name={moodIcon} size={24} color={Colors.gray[500]} />
          <Text style={styles.moodText}>{currentMood}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Ionicons name="information-circle" size={16} color={modeColors.primary} />
          <Text style={styles.infoText}>
            I'm analyzing your emotional patterns to provide better support. Remember, all feelings are valid and temporary.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray[50],
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
  moodSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodLabel: {
    ...Typography.bodySmall,
    color: Colors.gray[700],
  },
  moodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moodText: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.gray[700],
    flex: 1,
  },
});

