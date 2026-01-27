
import { IParameter } from '@/services/common.service';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CategoryCarousel = ({ item }: { item: IParameter }) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.iconContainer}>
      <Text style={styles.icon}>⚽</Text>
    </View>
    <Text style={styles.label}>{item.Value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 68,
    marginBottom: 20,
    marginLeft: 10
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  icon: {
    fontSize: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
