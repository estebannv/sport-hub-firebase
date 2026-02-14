import { Colors, GlobalStyle } from '@/constants/theme';
import { usePlaceholderPulse } from '@/hooks/usePlaceholderPulse';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

export const CardPlaceholder = () => (
  <View style={styles.featuredCenters}>
    {Array.from({ length: 3 }).map((_, index) => (
      <CardPlaceholderFlatList key={index} />
    ))}
  </View>
);

const CardPlaceholderFlatList = () => {
  return (
    <FlatList
      data={Array.from({ length: 2 })}
      renderItem={({ index }) => <CardPlaceholderItem index={index} />}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.featuredCenters}
    />
  );
};

const CardPlaceholderItem = ({ index }: { index: number }) => {

  const animatedStyle = usePlaceholderPulse();

  return (

    <View style={styles.container}>
      <Animated.View
        style={[styles.sectionTitlePlaceholder, animatedStyle] as React.ComponentProps<typeof Animated.View>['style']}
      />
      <View style={styles.container}>
        <Animated.View
          style={[styles.imagePlaceholder, animatedStyle] as React.ComponentProps<typeof Animated.View>['style']}
        />
        <View style={styles.descriptionContainer}>
          <Animated.View
            style={[styles.namePlaceholder, animatedStyle] as React.ComponentProps<typeof Animated.View>['style']}
          />
          <Animated.View
            style={[styles.detailPlaceholder, animatedStyle] as React.ComponentProps<typeof Animated.View>['style']}
          />
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    width: 250,
    marginRight: 16,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 140,
    borderRadius: GlobalStyle.BorderRadius,
    backgroundColor: Colors.light.secondary,
  },
  descriptionContainer: {
    paddingVertical: 12,
  },
  namePlaceholder: {
    width: '70%',
    height: 16,
    borderRadius: 4,
    backgroundColor: Colors.light.secondary,
    marginBottom: 8,
  },
  detailPlaceholder: {
    width: '100%',
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.light.secondary,
  },
  featuredCenters: {
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    paddingHorizontal: GlobalStyle.PaddingHorizontal,
    paddingBottom: 12,
    backgroundColor: 'white'
  },
  sectionTitlePlaceholder: {
    width: '50%',
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.light.secondary,
    marginBottom: 12,
  },
});
