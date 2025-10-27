import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, GlobalStyle } from '../constants/theme';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(tabs)/inicio');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
      >
        <Text style={styles.title}>Iniciar sesión</Text>

        <View>
            <TextInput
                style={styles.input}
                placeholder="tu.correo@ejemplo.com"
                placeholderTextColor={Colors.light.icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.light.icon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
        </View>

        <View style={styles.registerSection}>
          <Text style={styles.registerSectionText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.primaryButtonText}>Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
                <Text style={styles.secondaryButtonText}>Continuar con Google</Text>
            </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: Colors.light.background 
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
  registerSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 35,
  },
  registerSectionText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  registerLink: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginVertical: 35,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 25,
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
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: GlobalStyle.BorderRadius,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16.5,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.secondaryButton,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: GlobalStyle.BorderRadius,
  },
  secondaryButtonText: {
    color: Colors.light.text,
    fontSize: 16.5,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
