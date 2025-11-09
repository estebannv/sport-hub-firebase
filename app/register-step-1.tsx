import PasswordStrength from '@/components/PasswordStrength';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, GlobalStyle } from '../constants/theme';
import LocationService from '../services/location.service';

const RegisterScreen = () => {

  const router = useRouter();

  const [provinceArray, setProvinceArray] = useState<{ label: string; value: number }[]>([]);
  const [cityArray, setCityArray] = useState<{ label: string; value: number }[]>([]);
  const [districtArray, setDistrictArray] = useState<{ label: string; value: number }[]>([]);

  const [provinceId, setProvinceId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [districtId, setDistrictId] = useState(0);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');


  useEffect(() => {
    // FillProvinceDropdown();
  }, []);

  const FillProvinceDropdown = async () => {
    try {
      const data = await LocationService.GetProvinces();
      const formatted = data.map((p) => ({
        label: p.name,
        value: p.id,
      }));
      setProvinceArray(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const OnChangeProvinceDropdown = async (provinceId: number) => {
    try {
      const data = await LocationService.GetCities(provinceId);
      const formatted = data.map((p) => ({
        label: p.name,
        value: p.id,
      }));
      setProvinceId(provinceId)
      setCityArray(formatted);
      setCityId(0);
      setDistrictArray([]);
    } catch (error) {
      console.error(error);
    }
  };

  const OnChangeCityDropdown = async (cityId: number) => {
    try {
      const data = await LocationService.GetDistricts(provinceId, cityId);
      const formatted = data.map((p) => ({
        label: p.name,
        value: p.id,
      }));
      setCityId(cityId);
      setDistrictArray(formatted);
      setDistrictId(0);
    } catch (error) {
      console.error(error);
    }
  };

  const HandlePreRegister = () => {
    router.push('/register-step-2');
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.header}>
          <Text style={styles.title}>Crear tu Cuenta</Text>
          <Text style={styles.subtitle}>Ingresa tus datos para empezar a explorar.</Text>
        </View>

        <View style={styles.form}>

          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor={Colors.light.icon}
            // value={email}
            // onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor={Colors.light.icon}
            // value={email}
            // onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View >
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={Colors.light.icon}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />

            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.toggle}>
              <Text style={styles.toggleText}>
                {passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              </Text>
            </TouchableOpacity>
          </View>

          <PasswordStrength password={password} />

          {/* <Dropdown
                    style={styles.input}
                    data={provinceArray}
                    labelField="label"
                    valueField="value"
                    placeholder="Provincia"
                    value={provinceId}
                    onChange={(item) => OnChangeProvinceDropdown(item.value)}
                    placeholderStyle={{ color: Colors.light.icon }}
                  />

                  <Dropdown
                    style={styles.input}
                    data={cityArray}
                    labelField="label"
                    valueField="value"
                    placeholder="Cantón"
                    value={cityId}
                    onChange={(item) => OnChangeCityDropdown(item.value)}
                    placeholderStyle={{ color: Colors.light.icon }}
                  />

                  <Dropdown
                    style={styles.input}
                    data={districtArray}
                    labelField="label"
                    valueField="value"
                    placeholder="Distrito"
                    value={districtId}
                    onChange={(item) => setDistrictId(item.value)}
                    placeholderStyle={{ color: Colors.light.icon }}
                  /> */}

        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.registerButton} onPress={HandlePreRegister}>
            <Text style={styles.registerButtonText}>Continuar</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}>Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    position: 'relative'
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: GlobalStyle.BorderRadius,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border
  },
  registerButton: {
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  loginPromptText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  toggle: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  toggleText: {
    color: '#007bff',
    fontWeight: '500',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '90%'
  },
});

export default RegisterScreen;
