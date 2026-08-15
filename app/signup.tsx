import { AppModal } from '@/components/auth/AppModal';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { FooterLink, PrimaryButton } from '@/components/auth/Buttons';
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

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [emailTakenVisible, setEmailTakenVisible] = useState(false);

  const handleCreateAccount = () => {
    const nextErrors: { [key: string]: string } = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    if (!username.trim()) nextErrors.username = 'Username is required.';
    if (!password) nextErrors.password = 'Password is required.';
    if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = signUp(email.trim(), username.trim(), password);
    if (!result.success) {
      setEmailTakenVisible(true);
      return;
    }
    router.replace('/');
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

          <Text style={styles.title}>Create account</Text>

          <View style={styles.form}>
            <FormField
              label="EMAIL"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="user@example.com"
              keyboardType="email-address"
              error={errors.email}
            />
            <FormField
              label="USERNAME"
              icon="person-outline"
              value={username}
              onChangeText={setUsername}
              placeholder="Choose a username"
              error={errors.username}
            />
            <FormField
              label="PASSWORD"
              icon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              isPassword
              error={errors.password}
            />
            <FormField
              label="CONFIRM PASSWORD"
              icon="lock-closed-outline"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repeat your password"
              isPassword
              error={errors.confirmPassword}
            />

            <PrimaryButton title="Create account" onPress={handleCreateAccount} />
          </View>

          <FooterLink
            prompt="Already have an account?"
            actionLabel="Log in"
            onPress={() => router.push('/')}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <AppModal
        visible={emailTakenVisible}
        icon="alert-circle-outline"
        iconColor={Colors.error}
        title="Email already in use"
        message="An account with this email already exists. Try logging in instead."
        confirmLabel="Log in"
        cancelLabel="OK"
        onConfirm={() => {
          setEmailTakenVisible(false);
          router.push('/');
        }}
        onCancel={() => setEmailTakenVisible(false)}
      />
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
  title: {
    ...Typography.h1,
    fontSize: 26,
    lineHeight: 32,
    color: Colors.gray[900],
  },
  form: {
    gap: 16,
  },
});
