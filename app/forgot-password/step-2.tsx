import OTPInput from '@/components/OtpInput';
import PasswordStrength from '@/components/PasswordStrength';
import AuthService from '@/services/auth.service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, GlobalStyle } from '../../constants/theme';

const ForgotPasswordStep2 = () => {

  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [password, setPassword] = useState('');
  const [errorOutput, setErrorOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {

    if (!passwordIsValid) {
      return;
    }

    try {

    setLoading(true);
    setErrorOutput('');

    const response = await AuthService.ChangePassword({ Email: email, Password: password, OTP: otp?.join('') });
    
    if (response.Status == 200) {
      router.push('/login');
    } else {
      setErrorOutput(response.Message || 'No se pudo cambiar la contraseña. Inténtelo de nuevo más tarde.');
    }
    
    } catch (error) {
      console.log(error);
      setErrorOutput('No pudimos procesar tu solicitud, inténtelo de nuevo más tarde.');
    }

    setLoading(false);
    
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
};

  const handleResend = async () => {
    
    if (!email) {
      return;
    }

    try {

      setLoading(true);
      setErrorOutput('');

      const response = await AuthService.SendPasswordResetOtp({ Email: email });

      if (response.Status == 200) {
        setTimer(30);
      } else {
        setErrorOutput(response.Message || 'No se pudo reenviar el código. Inténtelo de nuevo más tarde.');
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

        <Text style={styles.title}>Cambiar contraseña</Text>
        <Text style={styles.subtitle}>Código de verificación</Text>

        <OTPInput 
                otp={otp}
                timer={timer}
                handleChange={handleChange}
                handleResend={handleResend}
            />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Colors.light.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <PasswordStrength 
          password={password} 
          onValidationChange={setPasswordIsValid}
        />

        {passwordIsValid === false && (
          <View style={styles.errorOutputSection}>
            <Text style={styles.errorOutput}>{errorOutput}</Text>
          </View>
        )}

        <View style={styles.footer}>

          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} disabled={loading}>
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
    marginVertical: 20,
  },
  subtitle: {
    fontSize: GlobalStyle.LabelFontSize,
    color: Colors.light.text,
    marginBottom: 27,
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
  errorOutputSection: {
    marginTop: 20,
  },
  errorOutput: {
    fontSize: 15,
    color: '#ec1c1cff',
    textAlign: 'center',
  },
});

export default ForgotPasswordStep2;
