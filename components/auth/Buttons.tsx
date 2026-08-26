import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
}) => {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} disabled={isDisabled}>
      <LinearGradient
        colors={Colors.primary.gradient as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, isDisabled && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

interface FooterLinkProps {
  prompt: string;
  actionLabel: string;
  onPress: () => void;
}

export const FooterLink: React.FC<FooterLinkProps> = ({ prompt, actionLabel, onPress }) => {
  return (
    <View style={styles.footerRow}>
      <Text style={styles.footerPrompt}>{prompt} </Text>
      <TouchableOpacity onPress={onPress} hitSlop={8}>
        <Text style={styles.footerAction}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
  },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  secondaryButtonText: {
    ...Typography.button,
    color: Colors.gray[700],
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerPrompt: {
    ...Typography.body,
    color: Colors.gray[500],
  },
  footerAction: {
    ...Typography.body,
    color: Colors.primary.dark,
    fontWeight: '600',
  },
});
