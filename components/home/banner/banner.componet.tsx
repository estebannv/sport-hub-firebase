import { GlobalStyle } from '@/constants/theme';
import { BannerItem } from '@/types/home.type';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export interface BannerProps {
  title?: string;
  items: BannerItem[];
}

export const Banner = ({ title, items }: BannerProps) => (
  <View style={styles.container}>
    {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsContainer}>
      {items.map((item, index) => (
        <Link key={item.id ?? `banner-${index}`} href={`/center/${item.id}`} asChild>
          <View style={styles.item}>
            <Text style={styles.descriptionName}>{item.name}</Text>
          </View>
        </Link>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    paddingHorizontal: GlobalStyle.PaddingHorizontal,
    paddingBottom: 12,
  },
  itemsContainer: {
    paddingHorizontal: GlobalStyle.PaddingHorizontal,
  },
  item: {
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
