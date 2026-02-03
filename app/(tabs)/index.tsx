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

// 模式配置数据
const modeConfigs: Record<ModeType, {
  title: string;
  subtitle: string;
  bannerTitle: string;
  bannerDescription: string;
  tags: string[];
}> = {
  famous: {
    title: '与秦始皇对话',
    subtitle: '中国第一位皇帝，统一六国的千古一帝',
    bannerTitle: '🎭 Talk to Historical Figures',
    bannerDescription: 'Have deep conversations with W. Somerset Maugham and learn from his wisdom and life experiences.',
    tags: ['Authentic personality', 'Historical insights', 'Literary discussions'],
  },
};

// 示例消息数据
const sampleMessages: Record<ModeType, { type: 'user' | 'ai' | 'system'; content: string; aiLabel?: string; emotion?: string }[]> = {
  famous: [
    { type: 'system', content: '正在与秦始皇对话' },
    { type: 'ai', content: "朕乃始皇帝，统一六国，建立大秦帝国。朕深知治国之道，统一文字、货币、度量衡，修筑万里长城。你有何问题想与朕探讨？", aiLabel: '秦始皇' },
    { type: 'user', content: "陛下，您统一六国的过程中，最大的挑战是什么？" },
    { type: 'ai', content: "统一六国，非一日之功。最大的挑战在于如何将不同文化、不同制度的六国融合为一体。朕采用法家思想，统一法律、文字、货币，使天下归一。但治理天下，比征服天下更难。", aiLabel: '秦始皇' },
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
    // 这里添加发送消息的逻辑
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* 背景渐变 - 秦始皇风格 */}
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
        {/* 顶部导航 */}
        <View style={{ paddingTop: insets.top }}>
          <TopNavBar
            username="Username"
            onMenuPress={() => setMenuVisible(true)}
          />
        </View>

        {/* 聊天内容 */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 模式头部 */}
          <View style={styles.cardsSection}>
            <ModeHeader
              mode={currentMode}
              title={config.title}
              subtitle={config.subtitle}
            />
          </View>

          {/* 消息列表 */}
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

        {/* 输入框 - 紧贴底部 */}
        <ChatInput
          onSend={handleSendMessage}
          mode={currentMode}
          placeholder="Type your message..."
        />
      </KeyboardAvoidingView>

      {/* 侧边菜单 */}
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
