import AuthService from '@/services/auth.service';
import ValidationService from '@/services/validation.service';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, GlobalStyle } from '../../constants/theme';

const ForgotPasswordStep1 = () => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorOutput, setErrorOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    // Limpiar errores previos
    setEmailError('');
    setErrorOutput('');

    // Validar email
    const emailValidation = ValidationService.validateEmail(email);
    
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    try {
      setLoading(true);
      
      const response = await AuthService.SendOTP({ Email: email });

      if (response.Status == 200) {
        router.push({
          pathname: '/forgot-password/step-2',
          params: { email: email }
        });
      } else {
        setErrorOutput(response.Message || 'No se pudo enviar el código. Inténtelo de nuevo más tarde.');
      }
    } catch (error) {
      console.log(error);
      setErrorOutput('No pudimos procesar tu solicitud, inténtelo de nuevo más tarde.');
    }

    setLoading(false);
  };

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

        <Text style={styles.title}>Recuperar contraseña</Text>

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
            autoCapitalize="none"
          />
          {emailError !== '' && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>

        {errorOutput !== '' && (
          <View style={styles.errorOutputSection}>
            <Text style={styles.errorOutput}>{errorOutput}</Text>
          </View>
        )}

        <View style={styles.footer}>

          <TouchableOpacity 
            style={[styles.primaryButton, loading && styles.disabled]} 
            onPress={handleContinue}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>Continuar</Text>
          </TouchableOpacity>

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
    backgroundColor: Colors.light.background,
    position: 'relative'
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: GlobalStyle.BorderRadius,
    paddingHorizontal: 16,
    fontSize: GlobalStyle.LabelFontSize,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border
  },
  inputError: {
    borderColor: '#ec1c1cff',
  },
  errorText: {
    fontSize: 14,
    color: '#ec1c1cff',
    marginBottom: 12,
    marginLeft: 4,
  },
  errorOutputSection: {
    marginBottom: 16,
  },
  errorOutput: {
    fontSize: 15,
    color: '#ec1c1cff',
  },
  disabled: {
    opacity: 0.7,
  },
  //General
  //Header
  title: {
    fontSize: GlobalStyle.TitleFontSize,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginVertical: 35,
    alignSelf: 'center',
    // fontFamily: Fonts.serif
  },
  //Header
  //Footer
  footer:{
    width: '100%',
    position: 'absolute',
    bottom: 10
  },
  primaryButton: {
    height: 50,
    backgroundColor: Colors.light.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: GlobalStyle.BorderRadius,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: GlobalStyle.ButtomTextFontSize,
    fontWeight: 'bold',
  },
  //Footer
});

export default ForgotPasswordStep1;
