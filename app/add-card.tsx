
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { GlobalStyle, Colors } from '../constants/theme';

const AddCardScreen = () => {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSave = () => {
    // Basic validation
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }
    // Here you would typically integrate with a payment gateway to tokenize the card
    console.log('Guardando tarjeta:', { cardNumber, cardHolder, expiryDate, cvv });
    Alert.alert('Éxito', 'Tarjeta guardada correctamente.');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Agregar Tarjeta' }} />
      <View style={styles.form}>
        <Text style={styles.title}>Agregar nueva tarjeta</Text>
        <Text style={styles.subtitle}>Ingrese los detalles de su tarjeta de crédito o débito.</Text>

        <TextInput
          style={styles.input}
          placeholder="Número de la tarjeta"
          placeholderTextColor={Colors.light.placeholder}
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del titular"
          placeholderTextColor={Colors.light.placeholder}
          value={cardHolder}
          onChangeText={setCardHolder}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.expiryInput]}
            placeholder="MM/AA"
            placeholderTextColor={Colors.light.placeholder}
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.cvvInput]}
            placeholder="CVV"
            placeholderTextColor={Colors.light.placeholder}
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Tarjeta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    flex: 1,
    marginRight: 8,
  },
  cvvInput: {
    flex: 1,
    marginLeft: 8,
  },
  saveButton: {
    height: 50,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCardScreen;
