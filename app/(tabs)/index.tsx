import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, ModeType } from '@/constants/colors';
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { SideMenu } from '@/components/navigation/SideMenu';
import { ModeHeader } from '@/components/chat/ModeHeader';
import { ModeInfoBanner } from '@/components/chat/ModeInfoBanner';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { MemoryCard } from '@/components/cards/MemoryCard';
import { LearningProgressCard } from '@/components/cards/LearningProgressCard';
import { HabitTrackerCard } from '@/components/cards/HabitTrackerCard';
import { EmotionCard } from '@/components/cards/EmotionCard';
import { FamousPersonCard } from '@/components/cards/FamousPersonCard';

// 模式配置数据
const modeConfigs: Record<ModeType, {
  title: string;
  subtitle: string;
  bannerTitle: string;
  bannerDescription: string;
  tags: string[];
}> = {
  personal: {
    title: 'Personal AI Companion',
    subtitle: 'I remember our conversations and learn about you',
    bannerTitle: '🧠 Personal AI Memory',
    bannerDescription: 'I remember your conversations, preferences, and learning progress to provide personalized support.',
    tags: ['Remembers past topics', 'Tracks your interests', 'Builds on previous conversations'],
  },
  famous: {
    title: 'Conversation with W. Somerset Maugham',
    subtitle: 'British novelist, playwright, and short-story',
    bannerTitle: '🎭 Talk to Historical Figures',
    bannerDescription: 'Have deep conversations with W. Somerset Maugham and learn from his wisdom and life experiences.',
    tags: ['Authentic personality', 'Historical insights', 'Literary discussions'],
  },
  learning: {
    title: 'Learning Companion',
    subtitle: 'Guided problem-solving • Hints not answers',
    bannerTitle: '🎓 Guided Learning Mode',
    bannerDescription: "I provide hints and questions to guide you to the answer, not just give it away - parent-approved learning!",
    tags: ['Step-by-step hints', 'Socratic questions', 'Progress tracking'],
  },
  coach: {
    title: 'Life Coach',
    subtitle: 'Routine optimization • Healthy habits • Time management',
    bannerTitle: '💪 Life & Routine Coach',
    bannerDescription: 'Build better habits, manage your time effectively, and optimize your daily student life.',
    tags: ['Habit tracking', 'Routine building', 'Goal setting'],
  },
  emotion: {
    title: 'Emotion-Aware Companion',
    subtitle: 'Empathetic support • Emotional intelligence',
    bannerTitle: '❤️ Emotion-Aware Support',
    bannerDescription: 'I detect your emotional state and provide empathetic, supportive responses tailored to how you feel.',
    tags: ['Real-time emotion detection', 'Empathetic responses', 'Mental wellness support'],
  },
};

// 示例消息数据
const sampleMessages: Record<ModeType, { type: 'user' | 'ai' | 'system'; content: string; aiLabel?: string; emotion?: string }[]> = {
  personal: [
    { type: 'system', content: 'Personal AI mode activated - I remember your preferences and history' },
    { type: 'ai', content: "Good morning, Username! I remember you mentioned wanting to improve your study schedule. How did yesterday's study session go with the quadratic equations we discussed?", aiLabel: 'AI Companion' },
    { type: 'user', content: 'It went well! I practiced the problems you suggested.' },
    { type: 'ai', content: "Excellent! I'm glad to hear that. Since you're also interested in literature (I remember you love classical novels), would you like to discuss any of the books you're reading, or shall we continue with math?", aiLabel: 'AI Companion' },
    { type: 'user', content: 'Actually, I finished reading Pride and Prejudice last night!' },
    { type: 'ai', content: "Wonderful! That's the third Jane Austen novel you've completed this year. I remember you started with Emma in March and read Sense and Sensibility in July. What did you think of Elizabeth Bennet compared to the other heroines?", aiLabel: 'AI Companion' },
  ],
  famous: [
    { type: 'system', content: 'Now conversing with W. Somerset Maugham' },
    { type: 'ai', content: "Good day, my dear friend. I am W. Somerset Maugham, at your service. I've wandered through many countries and observed the peculiarities of human nature in its various forms. What would you like to discuss?", aiLabel: 'W. Somerset Maugham' },
    { type: 'user', content: "I've been reading 'Of Human Bondage.' What inspired you to write about Philip's struggles?" },
    { type: 'ai', content: "Ah, Philip Carey. In truth, much of his journey mirrors my own. The club foot, the struggle for independence, the search for meaning - these were all familiar to me. I learned that our bondage is often self-imposed, and freedom comes not from changing our circumstances, but from changing how we perceive them. What particular aspect of his struggle resonates with you?", aiLabel: 'W. Somerset Maugham' },
  ],
  learning: [
    { type: 'system', content: 'Learning Companion mode - Guided problem-solving activated' },
    { type: 'user', content: 'What is the answer to: Solve for x: 2x + 5 = 15?' },
    { type: 'ai', content: "Great question! Let's work through this together. This is a linear equation problem. The key concept is to isolate the variable x by performing inverse operations on both sides.", aiLabel: 'Hint' },
    { type: 'ai', content: 'Based on this, what do you think we should do first to start isolating x?', aiLabel: 'Think About This' },
    { type: 'user', content: 'Should I multiply both sides by 2?' },
    { type: 'ai', content: 'Good thinking about doing the same operation on both sides! However, check whether multiplication is the right operation here. Hint: Look at the +5 term. What operation would cancel out addition?', aiLabel: 'Guidance' },
    { type: 'user', content: 'Oh! I should subtract 5 from both sides first!' },
    { type: 'ai', content: 'Excellent! You identified the right principle! Subtraction is the inverse of addition. Key Learning: When solving equations, use inverse operations to isolate the variable. Addition ↔ Subtraction, Multiplication ↔ Division.', aiLabel: 'Great Job!' },
  ],
  coach: [
    { type: 'system', content: 'Life Coach mode - Helping you build better routines and habits' },
    { type: 'ai', content: "Hi Username! I'm here to help you manage your school life better. Based on our previous conversations, I know you want to improve your morning routine and study habits. What specific area would you like to work on today?", aiLabel: 'AI Companion' },
    { type: 'user', content: "I'm struggling to wake up early and feel energized for morning classes." },
    { type: 'ai', content: "I understand that challenge. Let's create a sustainable morning routine for you. Based on your schedule (classes start at 8 AM), here's a personalized plan:\n\n⏰ Wake-up routine (6:30 AM):\n• Set your alarm across the room\n• 5-minute stretching\n• Natural light exposure\n\n🥗 Breakfast optimization:\n• Protein-rich breakfast (eggs, yogurt)\n• Avoid heavy carbs\n• Stay hydrated (500ml water)\n\n📚 Morning prep (7:15 AM):\n• Review today's classes (10 min)\n• Pack materials the night before\n\nShall we start with implementing just the wake-up routine for one week?", aiLabel: 'AI Companion' },
  ],
  emotion: [
    { type: 'system', content: 'Emotion-Aware mode - Empathetic support activated' },
    { type: 'user', content: "I'm feeling really stressed about my upcoming exams.", emotion: 'anxious' },
    { type: 'ai', content: "I can sense you're feeling anxious, Username. It's completely normal to feel stressed before exams - it shows you care about doing well. Let's take a moment to breathe together. Remember, you've prepared for this, and stress is just energy that we can channel productively.", aiLabel: 'Empathetic Response' },
    { type: 'ai', content: "What specific aspect is worrying you most? Sometimes naming our worries helps us address them more effectively. I'm here to support you through this.", aiLabel: 'Empathetic Response' },
    { type: 'user', content: "I'm worried I won't finish all the material in time.", emotion: 'anxious' },
    { type: 'ai', content: "That's a valid concern, and I'm glad you shared it with me. Let's break this down into manageable pieces. How many days do you have until the exam? We can create a realistic study plan together that will help you feel more in control. You don't have to do everything - you just need to prioritize the most important topics.", aiLabel: 'Empathetic Response' },
  ],
};

export default function ChatScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState<ModeType>('personal');
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const config = modeConfigs[currentMode];
  const messages = sampleMessages[currentMode];

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // 这里添加发送消息的逻辑
  };

  const renderModeSpecificCard = () => {
    switch (currentMode) {
      case 'personal':
        return (
          <MemoryCard
            mode="personal"
            title="What I Remember About You"
            memories={[
              { icon: 'time', text: 'Last discussed quadratic equations 2 days ago' },
              { icon: 'heart', text: 'Favorite subjects: Math, Classical Literature' },
              { icon: 'flag', text: 'Goals: Improve study schedule, prepare for finals' },
            ]}
          />
        );
      case 'famous':
        return (
          <FamousPersonCard
            name="W. Somerset Maugham"
            title="British Novelist & Playwright"
            years="1874 - 1965"
            location="Paris, France"
            initials="WSM"
            famousWorks={['Of Human Bondage', 'The Moon and Sixpence', 'The Razor\'s Edge']}
          />
        );
      case 'learning':
        return (
          <LearningProgressCard
            stats={[
              { icon: 'checkmark-circle', value: '12', label: 'Problems Solved' },
              { icon: 'bulb', value: '8', label: 'Concepts Learned' },
              { icon: 'flame', value: '5', label: 'Day Streak' },
            ]}
            currentTopic="Linear Equations"
            masteryPercent={65}
          />
        );
      case 'coach':
        return (
          <HabitTrackerCard
            habits={[
              {
                name: 'Wake up at 6:30 AM',
                streak: 4,
                days: [
                  { day: 'Mon', completed: true },
                  { day: 'Tue', completed: true },
                  { day: 'Wed', completed: true },
                  { day: 'Thu', completed: true },
                  { day: 'Fri', completed: false },
                ],
              },
              {
                name: 'Morning exercise',
                streak: 3,
                days: [
                  { day: 'Mon', completed: true },
                  { day: 'Tue', completed: true },
                  { day: 'Wed', completed: true },
                  { day: 'Thu', completed: false },
                  { day: 'Fri', completed: false },
                ],
              },
            ]}
          />
        );
      case 'emotion':
        return <EmotionCard currentMood="Calm & Neutral" moodIcon="happy" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* 背景渐变 */}
      <LinearGradient
        colors={['#F8FAFC', '#EFF6FF', '#FAF5FF']}
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

            <ModeInfoBanner
              mode={currentMode}
              title={config.bannerTitle}
              description={config.bannerDescription}
              tags={config.tags}
            />

            {renderModeSpecificCard()}
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
          showEmotionDetector={currentMode === 'emotion'}
          detectedEmotion="Neutral"
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
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
