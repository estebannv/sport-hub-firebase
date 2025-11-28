
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- DATOS DE EJEMPLO ---
const MOCK_PAYMENT_METHODS = [
  {
    id: 'pm_1',
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    isDefault: true,
  },
];

// --- Componente para mostrar un método de pago ---
const PaymentMethodCard = ({ method }) => {
  return (
    <View style={styles.card}>
      <FontAwesome5 name="credit-card" size={24} color="#333" />
      <View style={styles.cardDetails}>
        <Text style={styles.cardBrand}>{method.brand} terminada en {method.last4}</Text>
        {method.isDefault && <Text style={styles.defaultText}>Predeterminado</Text>}
      </View>
      <TouchableOpacity>
        <Text style={styles.menuText}>•••</Text>
      </TouchableOpacity>
    </View>
  );
};

const BilleteraScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* El título se manejará desde la navegación de Stack */}
      <Stack.Screen options={{ title: 'Billetera' }} />
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Métodos de pago</Text>

        {MOCK_PAYMENT_METHODS.map(method => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-card')}>
          <Text style={styles.addButtonText}>+ Agregar nuevo método de pago</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 16,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: '500',
  },
  defaultText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menuText: {
      fontSize: 24,
      color: '#999',
      fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BilleteraScreen;
