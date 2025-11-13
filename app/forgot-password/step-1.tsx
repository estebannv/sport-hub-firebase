import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, GlobalStyle } from '../../constants/theme';

const ForgotPasswordStep1 = () => {

  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/forgot-password/step-2');
  };

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

        <Text style={styles.title}>Recuperar contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={Colors.light.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.footer}>

          <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
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
