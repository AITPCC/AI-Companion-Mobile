import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getModeColors } from '@/constants/colors';

const famousColors = getModeColors('famous');
import { Typography } from '@/constants/typography';

interface FamousPersonCardProps {
  name: string;
  title: string;
  years: string;
  location: string;
  initials: string;
  famousWorks: string[];
}

export const FamousPersonCard: React.FC<FamousPersonCardProps> = ({
  name,
  title,
  years,
  location,
  initials,
  famousWorks,
}) => {
  return (
    <View style={styles.container}>
      {/* Person Info */}
      <View style={styles.personSection}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View style={styles.personInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={14} color={Colors.gray[500]} />
            <Text style={styles.metaText}>{years}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={Colors.gray[500]} />
            <Text style={styles.metaText}>{location}</Text>
          </View>
        </View>
      </View>

      {/* Famous Works */}
      <View style={styles.worksSection}>
        <View style={styles.worksHeader}>
          <Ionicons name="trophy-outline" size={16} color={famousColors.primary} />
          <Text style={styles.worksLabel}>Famous Works:</Text>
        </View>
        <Text style={styles.worksText}>{famousWorks.join(' • ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: famousColors.tag,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  personSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: famousColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    ...Typography.h1,
    color: Colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  personInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...Typography.h2,
    color: famousColors.primary,
  },
  title: {
    ...Typography.bodySmall,
    color: famousColors.primary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    ...Typography.bodySmall,
    color: Colors.gray[600],
  },
  worksSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  worksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  worksLabel: {
    ...Typography.bodySmall,
    color: Colors.gray[600],
  },
  worksText: {
    ...Typography.body,
    color: famousColors.primary,
    lineHeight: 22,
  },
});

