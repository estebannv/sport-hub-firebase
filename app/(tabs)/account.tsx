import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router'; // 1. Importar el router
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- COMPONENTE PARA UN ITEM DE LA LISTA DE OPCIONES ---
const OptionItem = ({ icon, label, onPress }: { icon: string, label: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <FontAwesome6 style={styles.optionIcon} name={icon} size={24} color="black" />
    <Text style={styles.optionLabel}>{label}</Text>
    <Text style={styles.optionArrow}>›</Text>
  </TouchableOpacity>
);

// --- PANTALLA PRINCIPAL DE CUENTA ---
const AccountScreen = () => {
  const router = useRouter(); // 2. Inicializar el router

  // Datos de ejemplo para el perfil del usuario
  const user = {
    name: 'Esteban Navarro Martínez',
    phone: '+506 8734-5453',
    email: 'navarro.estn@gmail.com',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* 1. Tarjeta de Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            {/* <Text style={styles.profileDetails}>{user.phone}</Text> */}
            <Text style={styles.profileDetails}>{user.email}</Text>
          </View>
        </View>

        {/* 2. Lista de Opciones */}
        <View style={styles.optionsGroup}>
          {/* 3. Añadir el evento onPress para navegar */}
          
          <OptionItem icon="wallet" label="Métodos de pago" onPress={() => router.push('/billetera')} />
            <OptionItem icon="location-dot" label="Ubicaciones guardadas" onPress={() => router.push('/billetera')} />
              <OptionItem icon="palette" label="Apariencia" onPress={() => router.push('/billetera')} />
        </View>

        {/* 3. Botón de Cerrar Sesión */}
        <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Un color de fondo ligeramente gris
  },
  container: {
    flex: 1,
  },
  // Estilos de la tarjeta de perfil
  profileCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF', // Un azul vibrante
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileDetails: {
    fontSize: 14,
    color: '#666',
  },
  // Estilos del grupo de opciones
  optionsGroup: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden', // Para que el borde redondeado se aplique a los hijos
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Separador muy sutil
  },
  optionIcon: {
    fontSize: 22,
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  optionArrow: {
    fontSize: 20,
    color: '#c7c7cc', // Color de flecha estándar en iOS
  },
  // Estilos de la sección de cerrar sesión
  logoutSection: {
      margin: 16,
      marginTop: 32, // Más espacio arriba
  },
  logoutButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FF3B30', // Un color rojo para indicar una acción destructiva
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
