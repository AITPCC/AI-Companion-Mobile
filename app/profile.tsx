import { AppModal } from '@/components/auth/AppModal';
import { FormField } from '@/components/auth/FormField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { currentUser, logOut, deleteAccount, updateProfile } = useAuth();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [editVisible, setEditVisible] = useState(false);
  const [usernameDraft, setUsernameDraft] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const displayName = currentUser?.username ?? 'Guest';
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await logOut();
    setConfirmVisible(false);
    router.replace('/');
  };

  const openDeleteModal = () => {
    setDeleteError('');
    setDeleteVisible(true);
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();
    if (!result.success) {
      setDeleteError(result.error);
      return;
    }
    setDeleteVisible(false);
    router.replace('/');
  };

  const openEditModal = () => {
    setUsernameDraft(currentUser?.username ?? '');
    setUsernameError('');
    setEditVisible(true);
  };

  const handleSaveUsername = async () => {
    if (!usernameDraft.trim()) {
      setUsernameError('Username is required.');
      return;
    }
    const result = await updateProfile(usernameDraft.trim());
    if (!result.success) {
      setUsernameError(result.error);
      return;
    }
    setEditVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={[styles.chatButton, { top: insets.top + 12 }]}
          onPress={() => router.push('/chat')}
          hitSlop={8}
        >
          <Ionicons name="chatbubbles-outline" size={20} color={Colors.primary.dark} />
        </TouchableOpacity>

        <LinearGradient
          colors={['#2B7FFF', '#00C2A8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </LinearGradient>
        <Text style={styles.username}>{displayName}</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.editRow} onPress={openEditModal} activeOpacity={0.7}>
          <View style={styles.editIconWrapper}>
            <Ionicons name="create-outline" size={18} color={Colors.primary.dark} />
          </View>
          <Text style={styles.editText}>Edit profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutRow}
          onPress={() => setConfirmVisible(true)}
          activeOpacity={0.7}
        >
          <View style={styles.logoutIconWrapper}>
            <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          </View>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        {currentUser && (
          <TouchableOpacity style={styles.logoutRow} onPress={openDeleteModal} activeOpacity={0.7}>
            <View style={styles.logoutIconWrapper}>
              <Ionicons name="trash-outline" size={18} color={Colors.error} />
            </View>
            <Text style={styles.logoutText}>Delete account</Text>
          </TouchableOpacity>
        )}
      </View>

      <AppModal
        visible={editVisible}
        icon="create-outline"
        title="Edit username"
        confirmLabel="Save"
        cancelLabel="Cancel"
        onConfirm={handleSaveUsername}
        onCancel={() => setEditVisible(false)}
      >
        <FormField
          label="USERNAME"
          icon="person-outline"
          value={usernameDraft}
          onChangeText={setUsernameDraft}
          placeholder="Your username"
          error={usernameError || undefined}
        />
      </AppModal>

      <AppModal
        visible={confirmVisible}
        title="Log out of TPCC?"
        message="You'll need to log in again to access your account."
        confirmLabel="Log out"
        cancelLabel="Cancel"
        destructive
        onConfirm={handleLogout}
        onCancel={() => setConfirmVisible(false)}
      />

      <AppModal
        visible={deleteVisible}
        icon="trash-outline"
        iconColor={Colors.error}
        title="Delete your account?"
        message="This permanently deletes your account and data. This can't be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onConfirm={handleDeleteAccount}
        onCancel={() => setDeleteVisible(false)}
      >
        {!!deleteError && <Text style={styles.deleteError}>{deleteError}</Text>}
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    gap: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  chatButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...Typography.h1,
    fontSize: 26,
    color: Colors.white,
  },
  username: {
    ...Typography.h1,
    color: Colors.gray[900],
  },
  body: {
    padding: 16,
    gap: 8,
    backgroundColor: Colors.gray[50],
    flex: 1,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  editIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    ...Typography.button,
    color: Colors.gray[900],
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    ...Typography.button,
    color: Colors.error,
  },
  deleteError: {
    ...Typography.body,
    color: Colors.error,
  },
});
