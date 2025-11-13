
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CategoryItem = ({ item }: { item: { name: string, icon: string } }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.categoryIconContainer}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
    </View>
    <Text style={styles.categoryName}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginRight: 0,
    width: 70,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
