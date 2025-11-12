import PasswordStrength from '@/components/PasswordStrength';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, GlobalStyle } from '../constants/theme';

const ForgotPasswordStep2 = () => {

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/login');
  };

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

        <Text style={styles.title}>Restablecer contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Código OTP"
          placeholderTextColor={Colors.light.placeholder}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Colors.light.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor={Colors.light.placeholder}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <PasswordStrength password={password} />

        <View style={styles.footer}>

          <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
            <Text style={styles.primaryButtonText}>Cambiar contraseña</Text>
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

export default ForgotPasswordStep2;
