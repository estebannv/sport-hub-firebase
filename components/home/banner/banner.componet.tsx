import { GlobalStyle } from '@/constants/theme';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export interface BannerItem {
  id: string;
  name: string;
}

export const Banner = ({ item }: { item: BannerItem }) => (
  <Link href={`/center/${item.id}`} asChild>
    <Text style={styles.descriptionName}>{item.name}</Text>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: GlobalStyle.BorderRadius,
  },
  descriptionContainer: {
    paddingVertical: 12,
  },
  descriptionName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionDetail: {
    fontSize: 13,
    color: '#666',
  },
});
