import { ChatInput } from '@/components/chat/ChatInput';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ModeHeader } from '@/components/chat/ModeHeader';
import { SideMenu } from '@/components/navigation/SideMenu';
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { Colors, ModeType } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { formatChatError, sendChatCompletion } from '@/lib/chatApi';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Mode configuration data
const modeConfigs: Record<ModeType, {
  title: string;
  subtitle: string;
  bannerTitle: string;
  bannerDescription: string;
  tags: string[];
}> = {
  famous: {
    title: 'Conversation with Qin Shi Huang',
    subtitle: 'First Emperor of China, who unified the Six Warring States',
    bannerTitle: '🎭 Talk to Historical Figures',
    bannerDescription: 'Have deep conversations with Qin Shi Huang and learn from his wisdom and life experiences.',
    tags: ['Authentic personality', 'Historical insights', 'Literary discussions'],
  },
};

type ChatMessage = {
  type: 'user' | 'ai' | 'system';
  content: string;
  aiLabel?: string;
  emotion?: string;
};

const modeToBackendMode: Record<ModeType, string> = {
  famous: 'history_figure',
};

export default function ChatScreen() {
  const { currentUser } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState<ModeType>('famous');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'system', content: 'Now conversing with Qin Shi Huang' },
  ]);
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const config = modeConfigs[currentMode];

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isSending) return;

    const userMessage: ChatMessage = { type: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    scrollToBottom();

    const historyForBackend = [...messages, userMessage]
      .filter((m) => m.type === 'user' || m.type === 'ai')
      .map((m) => ({ content: m.content }));

    setIsSending(true);
    try {
      const backendMode = modeToBackendMode[currentMode] ?? 'history_figure';
      const response = await sendChatCompletion({
        message,
        history: historyForBackend,
        mode: backendMode,
      });

      if (response.status === 200 && response.content) {
        const aiMessage: ChatMessage = {
          type: 'ai',
          content: response.content,
          aiLabel: 'Qin Shi Huang',
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'system',
            content: formatChatError(response.error),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          content: 'Failed to reach the server. Please check your connection.',
        },
      ]);
    } finally {
      setIsSending(false);
      scrollToBottom();
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background gradient - Qin Shi Huang style */}
      <LinearGradient
        colors={['#FFF8E7', '#FFE4B5', '#FFFACD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Top navigation */}
        <View style={{ paddingTop: insets.top }}>
        <TopNavBar
          username={currentUser?.username ?? 'Guest'}
          onProfilePress={() => router.push(currentUser ? '/profile' : '/')}
        />
        </View>

        {/* Chat content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Mode header */}
          <View style={styles.cardsSection}>
            <ModeHeader
              mode={currentMode}
              title={config.title}
              subtitle={config.subtitle}
            />
          </View>

          {/* Message list */}
          <View style={styles.messagesSection}>
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                type={msg.type}
                content={msg.content}
                mode={currentMode}
                aiLabel={msg.aiLabel}
                emotion={msg.emotion}
              />
            ))}
          </View>
        </ScrollView>

        {/* Input - bottom aligned */}
        <ChatInput
          onSend={handleSendMessage}
          mode={currentMode}
          placeholder="Type your message..."
        />
      </KeyboardAvoidingView>

      {/* Side menu */}
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        currentMode={currentMode}
        onModeSelect={(mode) => {
          setCurrentMode(mode);
          setMessages([{ type: 'system', content: 'Now conversing with Qin Shi Huang' }]);
        }}
        stats={{ conversations: 247, interests: 'Math, Literature' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cardsSection: {
    padding: 12,
    gap: 12,
  },
  messagesSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
  },
});
