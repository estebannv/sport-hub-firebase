import { Colors } from '@/constants/theme';
import { usePlaceholderPulse } from '@/hooks/usePlaceholderPulse';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const PLACEHOLDER_COUNT = 6;

export const CategoryCarouselPlaceholder = () => (
  <View style={styles.row}>
    {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
      <CategoryPlaceholderItem key={index} />
    ))}
  </View>
);

const CategoryPlaceholderItem = () => {
  const animatedStyle = usePlaceholderPulse();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconPlaceholder, animatedStyle] as React.ComponentProps<typeof Animated.View>['style']} />
      <Animated.View style={[styles.labelPlaceholder, animatedStyle] as React.ComponentProps<typeof Animated.View>['style']} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 15,
  },
  container: {
    width: 68,
    marginBottom: 20,
    marginLeft: 10,
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    marginBottom: 15,
  },
  labelPlaceholder: {
    width: 50,
    height: 12,
    borderRadius: 4,
    backgroundColor: Colors.light.secondary,
  },
});
