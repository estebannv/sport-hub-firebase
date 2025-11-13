import PasswordStrength from '@/components/PasswordStrength';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, GlobalStyle } from '../../constants/theme';

const RegisterScreen = () => {

  const router = useRouter();

  // const [provinceArray, setProvinceArray] = useState<{ label: string; value: number }[]>([]);
  // const [cityArray, setCityArray] = useState<{ label: string; value: number }[]>([]);
  // const [districtArray, setDistrictArray] = useState<{ label: string; value: number }[]>([]);

  // const [provinceId, setProvinceId] = useState(0);
  // const [cityId, setCityId] = useState(0);
  // const [districtId, setDistrictId] = useState(0);

  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // useEffect(() => {
  // FillProvinceDropdown();
  // }, []);

  // const FillProvinceDropdown = async () => {
  //   try {
  //     const data = await LocationService.GetProvinces();
  //     const formatted = data.map((p) => ({
  //       label: p.name,
  //       value: p.id,
  //     }));
  //     setProvinceArray(formatted);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const OnChangeProvinceDropdown = async (provinceId: number) => {
  //   try {
  //     const data = await LocationService.GetCities(provinceId);
  //     const formatted = data.map((p) => ({
  //       label: p.name,
  //       value: p.id,
  //     }));
  //     setProvinceId(provinceId)
  //     setCityArray(formatted);
  //     setCityId(0);
  //     setDistrictArray([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const OnChangeCityDropdown = async (cityId: number) => {
  //   try {
  //     const data = await LocationService.GetDistricts(provinceId, cityId);
  //     const formatted = data.map((p) => ({
  //       label: p.name,
  //       value: p.id,
  //     }));
  //     setCityId(cityId);
  //     setDistrictArray(formatted);
  //     setDistrictId(0);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const HandlePreRegister = () => {
    router.push('/registration/step-2');
  };

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

        {/* <ScrollView style={{ flex: 1 }}> */}

      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Ingresa tus datos para empezar a explorar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor={Colors.light.placeholder}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor={Colors.light.placeholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View >

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Colors.light.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.passwordToggle}>
          <Text style={styles.passwordToggleText}>
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

      <View style={styles.bottomSection}>

      <View style={styles.loginPrompt}>
          <Text style={[styles.loginPromptText, {textAlign: 'center'}]}>
            Al registrarse, aceptas nuestros 
            <Text style={{ color: Colors.light.main, fontWeight: 'bold' }} onPress={() => router.push('/login')}> términos y condiciones</Text>
          </Text>
            
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={HandlePreRegister}>
          <Text style={styles.registerButtonText}>Continuar</Text>
        </TouchableOpacity>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* </ScrollView> */}

      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //General
  container: {
    flex: 1,
    paddingHorizontal: GlobalStyle.PaddingHorizontal,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 50,
    borderRadius: GlobalStyle.BorderRadius,
    paddingHorizontal: 16,
    fontSize: GlobalStyle.LabelFontSize,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border
  },
  //General
  //Header
  title: {
    fontSize: GlobalStyle.TitleFontSize,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginVertical: 15,
    alignSelf: 'center',
    // fontFamily: Fonts.serif
  },
  subtitle: {
    fontSize: GlobalStyle.LabelFontSize,
    color: Colors.light.text,
    marginBottom: 20,
    alignSelf: 'center',
  },
  //Header
  //Password toggle
  passwordToggle: {
    position: 'absolute',
    right: 0,
    // backgroundColor: '#2723ecff',
    height: 50,
    justifyContent: 'center',
    paddingRight: 15
  },
  passwordToggleText: {
    color: Colors.light.main,
    fontWeight: '500',
  },
  //Password toggle
  //Footer
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  registerButton: {
    height: 50,
    backgroundColor: Colors.light.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: GlobalStyle.BorderRadius,
    marginBottom: 25,
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
    fontSize: GlobalStyle.LabelFontSize,
    color: Colors.light.text,
  },
  loginLink: {
    fontSize: GlobalStyle.LabelFontSize,
    color: Colors.light.main,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  //Footer
  // dropdown: {
  //   height: 50,
  //   borderColor: 'gray',
  //   borderWidth: 0.5,
  //   borderRadius: 8,
  //   paddingHorizontal: 8,
  // },
});

export default RegisterScreen;
