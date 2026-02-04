import { ChatInput } from '@/components/chat/ChatInput';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ModeHeader } from '@/components/chat/ModeHeader';
import { SideMenu } from '@/components/navigation/SideMenu';
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { Colors, ModeType } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
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

// Sample message data
const sampleMessages: Record<ModeType, { type: 'user' | 'ai' | 'system'; content: string; aiLabel?: string; emotion?: string }[]> = {
  famous: [
    { type: 'system', content: 'Now conversing with Qin Shi Huang' },
    { type: 'ai', content: "I am the First Emperor, who unified the Six States and founded the Qin Empire. I established a unified script, currency, and weights and measures, and built the Great Wall. What would you like to discuss with me?", aiLabel: 'Qin Shi Huang' },
    { type: 'user', content: "Your Majesty, what was the biggest challenge in unifying the Six States?" },
    { type: 'ai', content: "Unifying the Six States was no easy feat. The greatest challenge was merging six kingdoms with different cultures and systems into one. I adopted Legalist philosophy—unifying laws, script, and currency to bring order to the realm. But governing an empire is harder than conquering one.", aiLabel: 'Qin Shi Huang' },
  ],
};

export default function ChatScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState<ModeType>('famous');
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const config = modeConfigs[currentMode];
  const messages = sampleMessages[currentMode];

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // Add send message logic here
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
            username="Username"
            onMenuPress={() => setMenuVisible(true)}
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
        onModeSelect={setCurrentMode}
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
