import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface AppModalProps {
  visible: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  message?: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Shared confirm/alert dialog, used for the logout confirmation and the
// "email already in use" alert on signup.
export const AppModal: React.FC<AppModalProps> = ({
  visible,
  icon,
  iconColor,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          {icon && (
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: destructive ? '#FEE2E2' : Colors.gray[100] },
              ]}
            >
              <Ionicons name={icon} size={22} color={iconColor ?? Colors.gray[700]} />
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.actions}>
            {!!cancelLabel && (
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
                <Text style={styles.cancelText}>{cancelLabel}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.confirmButton, destructive && styles.confirmButtonDestructive]}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.confirmText, destructive && styles.confirmTextDestructive]}
              >
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    ...Typography.h1,
    color: Colors.gray[900],
  },
  message: {
    ...Typography.body,
    color: Colors.gray[600],
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.gray[100],
  },
  cancelText: {
    ...Typography.buttonSmall,
    color: Colors.gray[700],
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.primary.dark,
  },
  confirmButtonDestructive: {
    backgroundColor: Colors.error,
  },
  confirmText: {
    ...Typography.buttonSmall,
    color: Colors.white,
  },
  confirmTextDestructive: {
    color: Colors.white,
  },
});
