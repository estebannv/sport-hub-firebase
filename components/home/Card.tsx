
import { GlobalStyle } from '@/constants/theme';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Card = ({ item }: { item: { id: string, name: string, rating: number, reviews: number, deliveryTime: number, image: string } }) => (
  <Link href={`/center/${item.id}`} asChild>
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionName}>{item.name}</Text>
        <Text style={styles.descriptionDetail}>⭐️ {item.rating} • Fútbol, Basketball, Tennis, Pádel • 5.5 km</Text>
      </View>
    </TouchableOpacity>
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
    padding: 12,
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
