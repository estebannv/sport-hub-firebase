
import { GlobalStyle } from '@/constants/theme';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Card = ({ item }: { item: { id: string, name: string, rating: number, reviews: number, deliveryTime: number, image: string } }) => (
  <Link href={`/center/${item.id}`} asChild>
    <TouchableOpacity style={styles.centerCard}>
      <Image source={{ uri: item.image }} style={styles.centerImage} />
      <View style={styles.centerInfo}>
        <Text style={styles.centerName}>{item.name}</Text>
        <Text style={styles.centerDetails}>⭐️ {item.rating} • Fútbol, Basketball, Tennis, Pádel • 5.5 km</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  centerCard: {
    width: 250,
    marginRight: 16,
  },
  centerImage: {
    width: '100%',
    height: 140,
    borderRadius: GlobalStyle.BorderRadius,
  },
  centerInfo: {
    padding: 12,
  },
  centerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  centerDetails: {
    fontSize: 13,
    color: '#666',
  },
});
