import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, ModeType, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface ModeInfoBannerProps {
  mode: ModeType;
  title: string;
  description: string;
  tags: string[];
}

export const ModeInfoBanner: React.FC<ModeInfoBannerProps> = ({
  mode,
  title,
  description,
  tags,
}) => {
  const modeColors = getModeColors(mode);

  return (
    <View style={[styles.container, { backgroundColor: modeColors.light, borderColor: modeColors.border }]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="information-circle" size={16} color={modeColors.text} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: modeColors.text }]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: modeColors.tag }]}>
            <Text style={[styles.tagText, { color: modeColors.tagText }]}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    gap: 8,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.gray[600],
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  tagText: {
    ...Typography.tag,
  },
});
