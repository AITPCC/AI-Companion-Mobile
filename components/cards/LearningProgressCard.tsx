import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface StatItem {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}

interface LearningProgressCardProps {
  stats: StatItem[];
  currentTopic: string;
  masteryPercent: number;
}

export const LearningProgressCard: React.FC<LearningProgressCardProps> = ({
  stats,
  currentTopic,
  masteryPercent,
}) => {
  const modeColors = getModeColors('learning');

  return (
    <LinearGradient
      colors={[modeColors.light, '#ECFDF5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderColor: modeColors.border }]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: modeColors.primary }]}>
          <Ionicons name="trending-up" size={16} color={Colors.white} />
        </View>
        <Text style={[styles.title, { color: modeColors.text }]}>Learning Journey</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Ionicons name={stat.icon} size={20} color={modeColors.primary} />
            <Text style={[styles.statValue, { color: modeColors.text }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.progressSection}>
        <View style={styles.topicRow}>
          <Text style={styles.topicLabel}>Current Topic:</Text>
          <Text style={[styles.topicValue, { color: modeColors.primary }]}>{currentTopic}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${masteryPercent}%`, backgroundColor: modeColors.primary }]} />
        </View>
        <Text style={styles.masteryText}>{masteryPercent}% Mastery</Text>
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    ...Typography.number,
    marginTop: 4,
  },
  statLabel: {
    ...Typography.tag,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  progressSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 8,
    gap: 4,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicLabel: {
    ...Typography.bodySmall,
    color: Colors.gray[700],
  },
  topicValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  masteryText: {
    ...Typography.bodySmall,
    color: Colors.gray[600],
  },
});

