import React from 'react';
import { StyleSheet, View } from 'react-native';

// Soft decorative blobs used behind the login/signup/reset-password forms,
// matching the reference mockups' subtle background shapes.
export const AuthBackground: React.FC = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.blob, styles.blobTopRight]} />
      <View style={[styles.blob, styles.blobBottomLeft]} />
    </View>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobTopRight: {
    width: 180,
    height: 180,
    top: -60,
    right: -50,
    backgroundColor: 'rgba(43, 127, 255, 0.08)',
  },
  blobBottomLeft: {
    width: 140,
    height: 140,
    top: 140,
    left: -60,
    backgroundColor: 'rgba(0, 201, 80, 0.06)',
  },
});
