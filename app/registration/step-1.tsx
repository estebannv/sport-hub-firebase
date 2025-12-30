import PasswordStrength from '@/components/PasswordStrength';
import ValidationService from '@/services/validation.service';
import AntDesign from '@expo/vector-icons/build/AntDesign';
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
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    // Limpiar errores previos
    setFullNameError('');
    setEmailError('');
    setPasswordError('');

    // Validar cada campo individualmente
    const fullNameValidation = ValidationService.validateFullName(fullName);
    const emailValidation = ValidationService.validateEmail(email);
    const passwordValidation = ValidationService.validatePassword(password);

    let hasErrors = false;

    if (!fullNameValidation.isValid) {
      setFullNameError(fullNameValidation.message);
      hasErrors = true;
    }

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      hasErrors = true;
    }

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.message);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    router.push({
      pathname: '/registration/step-2',
      params: { email: email }
    });
  };

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

      <View style={styles.header}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Ingresa tus datos para empezar a explorar</Text>
      </View>

      <View>
        <TextInput
          style={[styles.input, fullNameError !== '' && styles.inputError]}
          placeholder="Nombre completo"
          placeholderTextColor={Colors.light.placeholder}
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (fullNameError !== '') {
              setFullNameError('');
            }
          }}
        />
        {fullNameError !== '' && (
          <Text style={styles.errorText}>{fullNameError}</Text>
        )}
      </View>

      <View>
        <TextInput
          style={[styles.input, emailError !== '' && styles.inputError]}
          placeholder="Correo electrónico"
          placeholderTextColor={Colors.light.placeholder}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError !== '') {
              setEmailError('');
            }
          }}
          keyboardType="email-address"
        />
        {emailError !== '' && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}
      </View>

      <View>

        <TextInput
          style={[styles.input, passwordError !== '' && styles.inputError]}
          placeholder="Contraseña"
          placeholderTextColor={Colors.light.placeholder}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError !== '') {
              setPasswordError('');
            }
          }}
          secureTextEntry={!passwordVisible}
        />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.passwordToggle}>
						<Text style={styles.passwordToggleText}>
							{passwordVisible ? 
								<AntDesign name="eye-invisible" size={24} color="black" /> : 
								<AntDesign name="eye" size={24} color="black" />
							}
						</Text>
					</TouchableOpacity>

        {passwordError !== '' && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border
  },
  inputError: {
    borderColor: '#ec1c1cff',
  },
  //General
  	//Header
	header: {
		marginTop: 10,
		marginBottom: 15,
	},
	title: {
		fontSize: GlobalStyle.TitleFontSize,
		fontWeight: 'bold',
		color: Colors.light.text,
	},
	subtitle: {
		fontSize: GlobalStyle.LabelFontSize,
		color: Colors.light.text,
		marginBottom: 20,
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
  errorText: {
    fontSize: 14,
    color: '#ec1c1cff',
    marginBottom: 12,
    marginLeft: 4,
  },
  // dropdown: {
  //   height: 50,
  //   borderColor: 'gray',
  //   borderWidth: 0.5,
  //   borderRadius: 8,
  //   paddingHorizontal: 8,
  // },
});

export default RegisterScreen;
