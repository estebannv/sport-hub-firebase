import { GlobalStyle } from '@/constants/theme';
import { CardItem } from '@/types/home.type';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Card = ({ item }: { item: CardItem }) => (
  <Link href={`/center/${item.id}`} asChild>
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: item.MainImage }} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionName}>{item.Name}</Text>
        <Text style={styles.descriptionDetail}>5.5 km • Fútbol, Basketball, Tennis, Pádel</Text>
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
