import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, ModeType, getModeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  currentMode: ModeType;
  onModeSelect: (mode: ModeType) => void;
  stats?: {
    conversations: number;
    interests: string;
  };
}

const modes: { id: ModeType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'famous', label: 'Famous', icon: 'people' },
];

export const SideMenu: React.FC<SideMenuProps> = ({
  visible,
  onClose,
  currentMode,
  onModeSelect,
  stats = { conversations: 247, interests: 'Math, Literature' },
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.menuContainer, { paddingTop: insets.top + 12 }]} onPress={(e) => e.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Quick Stats with Close Button */}
            <View style={styles.section}>
              <View style={styles.quickStatsHeader}>
                <Text style={styles.sectionLabel}>Quick Stats</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={20} color={Colors.gray[900]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.statText}>{stats.conversations} conversations</Text>
              <Text style={styles.statText}>Interests: {stats.interests}</Text>
            </View>

            {/* Modes */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>All Modes ({modes.length} total)</Text>
              <View style={styles.modesContainer}>
                {modes.map((mode) => {
                  const isActive = mode.id === currentMode;
                  const modeColors = getModeColors(mode.id);
                  
                  return (
                    <TouchableOpacity
                      key={mode.id}
                      style={[
                        styles.modeButton,
                        isActive && { backgroundColor: modeColors.tag },
                      ]}
                      onPress={() => {
                        onModeSelect(mode.id);
                        onClose();
                      }}
                    >
                      <Ionicons
                        name={mode.icon}
                        size={16}
                        color={isActive ? modeColors.tagText : Colors.gray[700]}
                      />
                      <Text
                        style={[
                          styles.modeLabel,
                          { color: isActive ? modeColors.tagText : Colors.gray[700] },
                        ]}
                      >
                        {mode.label}
                      </Text>
                      {isActive && (
                        <Text style={[styles.checkmark, { color: modeColors.tagText }]}>
                          ✓
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItems}>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Conversation History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: 256,
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  quickStatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  sectionLabel: {
    ...Typography.bodySmall,
    color: Colors.gray[500],
    marginBottom: 8,
  },
  statText: {
    ...Typography.body,
    color: Colors.gray[700],
    marginBottom: 4,
  },
  modesContainer: {
    gap: 4,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 8,
  },
  modeLabel: {
    ...Typography.buttonSmall,
    flex: 1,
  },
  checkmark: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  menuItems: {
    gap: 8,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  menuItemText: {
    ...Typography.h2,
    color: Colors.gray[700],
  },
});

