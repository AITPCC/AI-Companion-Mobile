import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, ModeType } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface ChatInputProps {
  onSend: (message: string) => void;
  mode?: ModeType;
  placeholder?: string;
  showEmotionDetector?: boolean;
  detectedEmotion?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  mode = 'famous',
  placeholder = 'Type your message...',
  showEmotionDetector = false,
  detectedEmotion = 'Neutral',
}) => {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {showEmotionDetector && (
        <View style={styles.emotionDetector}>
          <Ionicons name="heart-outline" size={14} color={Colors.gray[700]} />
          <Text style={styles.emotionLabel}>Detected emotion:</Text>
          <Text style={styles.emotionValue}>{detectedEmotion}</Text>
          <Ionicons name="happy-outline" size={14} color={Colors.gray[700]} />
        </View>
      )}
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder={placeholder}
            placeholderTextColor={Colors.gray[500]}
            multiline
            maxLength={1000}
          />
        </View>
        <TouchableOpacity onPress={handleSend} activeOpacity={0.8}>
          <LinearGradient
            colors={Colors.primary.gradient as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={16} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray[50],
    paddingHorizontal: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    gap: 8,
  },
  emotionDetector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.gray[50],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  emotionLabel: {
    ...Typography.bodySmall,
    color: Colors.gray[700],
  },
  emotionValue: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.gray[700],
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 42,
    justifyContent: 'center',
  },
  input: {
    ...Typography.body,
    color: Colors.gray[900],
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
