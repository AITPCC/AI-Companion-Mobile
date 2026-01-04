import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, ModeType, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const modes: { id: ModeType; title: string; description: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  {
    id: 'personal',
    title: 'Personal AI Companion',
    description: 'I remember our conversations and learn about you',
    icon: 'person',
  },
  {
    id: 'famous',
    title: 'Famous Figures',
    description: 'Chat with historical personalities and learn from their wisdom',
    icon: 'people',
  },
  {
    id: 'learning',
    title: 'Learning Companion',
    description: 'Guided problem-solving with hints, not answers',
    icon: 'school',
  },
  {
    id: 'coach',
    title: 'Life Coach',
    description: 'Build better habits and optimize your routine',
    icon: 'fitness',
  },
  {
    id: 'emotion',
    title: 'Emotion-Aware',
    description: 'Empathetic support tailored to how you feel',
    icon: 'heart',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#EFF6FF', '#FAF5FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore Modes</Text>
          <Text style={styles.headerSubtitle}>
            Choose an AI companion mode that fits your needs
          </Text>
        </View>

        <View style={styles.modesGrid}>
          {modes.map((mode) => {
            const modeColors = getModeColors(mode.id);
            return (
              <TouchableOpacity key={mode.id} activeOpacity={0.8}>
                <LinearGradient
                  colors={modeColors.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modeCard}
                >
                  <View style={styles.modeIconContainer}>
                    <Ionicons name={mode.icon} size={28} color={Colors.white} />
                  </View>
                  <Text style={styles.modeTitle}>{mode.title}</Text>
                  <Text style={styles.modeDescription}>{mode.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="chatbubbles" size={24} color={Colors.primary.light} />
              <Text style={styles.statValue}>247</Text>
              <Text style={styles.statLabel}>Conversations</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time" size={24} color={Colors.modes.learning.primary} />
              <Text style={styles.statValue}>12h</Text>
              <Text style={styles.statLabel}>Time Spent</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={24} color={Colors.modes.coach.primary} />
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    ...Typography.h1,
    fontSize: 28,
    color: Colors.gray[900],
    marginBottom: 8,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.gray[600],
  },
  modesGrid: {
    gap: 12,
  },
  modeCard: {
    padding: 20,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  modeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  modeTitle: {
    ...Typography.h2,
    color: Colors.white,
  },
  modeDescription: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsSection: {
    marginTop: 32,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.gray[900],
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    ...Typography.numberLarge,
    color: Colors.gray[900],
  },
  statLabel: {
    ...Typography.tag,
    color: Colors.gray[500],
  },
});
