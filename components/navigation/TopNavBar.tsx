import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TopNavBarProps {
  username?: string;
  onMenuPress?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  username = 'Username',
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <LinearGradient
          colors={Colors.primary.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logo}
        >
          <Ionicons name="chatbubbles" size={16} color={Colors.white} />
        </LinearGradient>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>TPCC</Text>
          {/* <Text style={styles.username}>{username}</Text> */}
        </View>
      </View>
      {onMenuPress && (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={20} color={Colors.gray[900]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    gap: 0,
  },
  title: {
    ...Typography.h2,
    color: Colors.gray[900],
  },
  username: {
    ...Typography.bodySmall,
    color: Colors.gray[500],
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
