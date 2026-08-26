import { AppModal } from '@/components/auth/AppModal';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { PrimaryButton } from '@/components/auth/Buttons';
import { FormField } from '@/components/auth/FormField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const insets = useSafeAreaInsets();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successVisible, setSuccessVisible] = useState(false);

  const handleReset = async () => {
    const nextErrors: { [key: string]: string } = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    if (!newPassword) nextErrors.newPassword = 'New password is required.';
    if (newPassword !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = await resetPassword(email.trim(), newPassword);
    if (!result.success) {
      setErrors({ email: result.error });
      return;
    }
    setSuccessVisible(true);
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
          <TouchableOpacity style={styles.backRow} onPress={() => router.push('/')} hitSlop={8}>
            <Ionicons name="arrow-back" size={18} color={Colors.primary.dark} />
            <Text style={styles.backText}>Back to login</Text>
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <Ionicons name="lock-closed-outline" size={24} color={Colors.primary.dark} />
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>Enter your email and choose a new password.</Text>
          </View>

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
              label="NEW PASSWORD"
              icon="lock-closed-outline"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Create new password"
              isPassword
              error={errors.newPassword}
            />
            <FormField
              label="CONFIRM NEW PASSWORD"
              icon="lock-closed-outline"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repeat new password"
              isPassword
              error={errors.confirmPassword}
            />

            <PrimaryButton title="Reset password" onPress={handleReset} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <AppModal
        visible={successVisible}
        icon="checkmark-circle-outline"
        iconColor={Colors.success}
        title="Password reset"
        message="Your password has been updated. You can now log in with your new password."
        confirmLabel="Back to login"
        onConfirm={() => {
          setSuccessVisible(false);
          router.push('/');
        }}
        onCancel={() => setSuccessVisible(false)}
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
    gap: 20,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.primary.dark,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBlock: {
    gap: 6,
  },
  title: {
    ...Typography.h1,
    fontSize: 26,
    lineHeight: 32,
    color: Colors.gray[900],
  },
  subtitle: {
    ...Typography.body,
    color: Colors.gray[500],
  },
  form: {
    gap: 16,
  },
});
