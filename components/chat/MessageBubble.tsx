import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Colors, ModeType, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';

export type MessageType = 'user' | 'ai' | 'system';

interface MessageBubbleProps {
  type: MessageType;
  content: string;
  mode?: ModeType;
  aiLabel?: string;
  emotion?: string;
  timestamp?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  content,
  mode = 'famous',
  aiLabel,
  emotion,
}) => {
  const modeColors = getModeColors(mode);

  if (type === 'system') {
    return (
      <View style={styles.systemContainer}>
        <View style={styles.systemBubble}>
          <Text style={styles.systemText}>{content}</Text>
        </View>
      </View>
    );
  }

  if (type === 'user') {
    return (
      <View style={styles.userContainer}>
        <LinearGradient
          colors={Colors.message.user.background as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userBubble}
        >
          {emotion && (
            <View style={styles.emotionTag}>
              <Ionicons name="heart" size={12} color={Colors.white} />
              <Text style={styles.emotionText}>Detected emotion: {emotion}</Text>
            </View>
          )}
          <Text style={styles.userText}>{content}</Text>
        </LinearGradient>
        <View style={[styles.avatar, styles.userAvatar]}>
          <Ionicons name="person" size={14} color={modeColors.primary} />
        </View>
      </View>
    );
  }

  // AI 消息
  return (
    <View style={styles.aiContainer}>
      <View style={[styles.aiAvatarContainer, { borderColor: Colors.white, backgroundColor: modeColors.primary }]}>
        <Image
          source={require('@/assets/images/qinshihuang.jpg')}
          style={styles.aiAvatarImage}
          contentFit="cover"
          contentPosition="top center"
        />
      </View>
      <View style={[styles.aiBubble, { borderColor: modeColors.border }]}>
        {aiLabel && (
          <View style={styles.aiHeader}>
            <Ionicons name="sparkles" size={12} color={modeColors.text} />
            <Text style={[styles.aiLabel, { color: modeColors.text }]}>
              {aiLabel}
            </Text>
          </View>
        )}
        <Text style={styles.aiText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 系统消息
  systemContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  systemBubble: {
    backgroundColor: Colors.message.system.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  systemText: {
    ...Typography.bodySmall,
    color: Colors.message.system.text,
  },

  // 用户消息
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 8,
    marginVertical: 8,
  },
  userBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderTopRightRadius: 6,
  },
  userText: {
    ...Typography.body,
    color: Colors.message.user.text,
  },
  userAvatar: {
    backgroundColor: Colors.modes.famous.tag,
  },
  emotionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    opacity: 0.8,
  },
  emotionText: {
    ...Typography.bodySmall,
    color: Colors.white,
  },

  // AI 消息
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginVertical: 8,
  },
  aiAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 999,
    borderWidth: 2,
    overflow: 'hidden',
  },
  aiAvatarImage: {
    width: '100%',
    height: '100%',
  },
  aiBubble: {
    maxWidth: '75%',
    backgroundColor: Colors.gray[50],
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderTopLeftRadius: 6,
    borderWidth: 1.5,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  aiLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  aiText: {
    ...Typography.body,
    color: Colors.message.ai.text,
  },

  // 通用头像
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
