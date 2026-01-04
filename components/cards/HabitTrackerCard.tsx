import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface HabitDay {
  day: string;
  completed: boolean;
}

interface Habit {
  name: string;
  streak: number;
  days: HabitDay[];
}

interface HabitTrackerCardProps {
  habits: Habit[];
}

export const HabitTrackerCard: React.FC<HabitTrackerCardProps> = ({ habits }) => {
  const modeColors = getModeColors('coach');

  return (
    <LinearGradient
      colors={['#FFF7ED', '#FEF2F2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderColor: modeColors.border }]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: modeColors.primary }]}>
          <Ionicons name="flame" size={16} color={Colors.white} />
        </View>
        <Text style={[styles.title, { color: modeColors.text }]}>This Week's Progress</Text>
      </View>

      <View style={styles.habitsContainer}>
        {habits.map((habit, index) => (
          <View key={index} style={styles.habitItem}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.streakText}>{habit.streak} day streak 🔥</Text>
            </View>
            <View style={styles.daysRow}>
              {habit.days.map((day, dayIndex) => (
                <View key={dayIndex} style={styles.dayItem}>
                  <Text style={styles.dayLabel}>{day.day}</Text>
                  <View style={[styles.dayIcon, day.completed && styles.dayCompleted]}>
                    {day.completed && (
                      <Ionicons name="checkmark" size={12} color={Colors.white} />
                    )}
                  </View>
                </View>
              ))}
            </View>
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
  habitsContainer: {
    gap: 8,
  },
  habitItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 8,
    gap: 6,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitName: {
    ...Typography.bodySmall,
    color: Colors.gray[800],
  },
  streakText: {
    ...Typography.bodySmall,
    color: '#F54900',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    ...Typography.tag,
    color: Colors.gray[500],
  },
  dayIcon: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: Colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCompleted: {
    backgroundColor: '#00C950',
  },
});

