import { GlobalStyle } from '@/constants/theme';
import { StorageService } from '@/services/storage.service';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OptionItem = ({ icon, label, onPress }: { icon: string, label: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <FontAwesome6 style={styles.optionIcon} name={icon} size={24} color="black" />
    <Text style={styles.optionLabel}>{label}</Text>
    <Entypo name="chevron-thin-right" size={15} color="black" />
  </TouchableOpacity>
);

const AccountScreen = () => {

  const router = useRouter();

  const user = {
    name: 'Esteban Navarro',
    phone: '+506 8734-5453',
    email: 'navarro.estn@gmail.com',
  };

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView>

        <Text style={styles.header}>¡Hola, {user.name}!</Text>
        
        <View style={styles.optionsGroup}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <OptionItem icon="user-large" label="Información personal" onPress={() => {}} />
          <OptionItem icon="location-dot" label="Ubicaciones guardadas" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Actividad</Text>
        <View style={styles.optionsGroup}>
          <OptionItem icon="wallet" label="Billetera" onPress={() => router.push('/billetera')} />
        </View>

        <Text style={styles.sectionTitle}>Configuración</Text>
        <View style={styles.optionsGroup}>
          <OptionItem icon="palette" label="Apariencia" onPress={() => router.push('/billetera')} />
          <OptionItem icon="building-circle-arrow-right" label="Registrar mi centro deportivo" onPress={() => router.push('/billetera')} />
        </View>

        <TouchableOpacity onPress={async () => await StorageService.ClearStorage()}>
          <Text>Limpiar storage</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //General
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: GlobalStyle.PaddingHorizontal,
    paddingTop: 10,
  },
  //General
  //Header section
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 15,
  },
  //Header section
  //Options section
  optionsGroup: {
    marginBottom: 17,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 14,
  },
  optionIcon: {
    width: 43,
    fontSize: 22,
  },
  optionLabel: {
    flex: 1,
    fontSize: GlobalStyle.LabelFontSize,
  },
  //Options section
  //Logout section
  logoutButtonText: {
    marginTop: 15,
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  //Logout section
});

export default AccountScreen;
