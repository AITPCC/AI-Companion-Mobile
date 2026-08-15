import { AuthBackground } from '@/components/auth/AuthBackground';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { FooterLink, PrimaryButton, SecondaryButton } from '@/components/auth/Buttons';
import { FormField } from '@/components/auth/FormField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { logIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    const result = logIn(email.trim(), password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setError('');
    router.replace('/chat');
  };

  return (
    <View style={styles.container}>
      <AuthBackground />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader />

          <View style={styles.titleBlock}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          </View>

          <View style={styles.form}>
            <FormField
              label="EMAIL"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="user@example.com"
              keyboardType="email-address"
            />
            <FormField
              label="PASSWORD"
              icon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              isPassword
              error={error || undefined}
            />

            <View style={styles.forgotRow}>
              <Text style={styles.forgotLink} onPress={() => router.push('/reset-password')}>
                Forgot password?
              </Text>
            </View>

            <PrimaryButton title="Log in" onPress={handleLogin} />
            <SecondaryButton title="Skip for now" onPress={() => router.push('/chat')} />
          </View>

          <FooterLink
            prompt="New to TPCC?"
            actionLabel="Sign up"
            onPress={() => router.push('/signup')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    gap: 24,
  },
  titleBlock: {
    gap: 6,
  },
  title: {
    ...Typography.h1,
    fontSize: 28,
    lineHeight: 34,
    color: Colors.gray[900],
  },
  subtitle: {
    ...Typography.body,
    color: Colors.gray[500],
  },
  form: {
    gap: 16,
  },
  forgotRow: {
    alignItems: 'flex-end',
  },
  forgotLink: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.primary.dark,
  },
});
