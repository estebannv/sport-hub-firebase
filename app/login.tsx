import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    router.replace('/(tabs)/inicio'); // Usamos replace para no poder volver al login
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Crea una aquí</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Bienvenido de Vuelta</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar.</Text>

        <View style={styles.form}>
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

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.primaryButtonText}>Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Continuar con SSO</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerText: {
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
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 32,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24, 
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.secondaryButton,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
