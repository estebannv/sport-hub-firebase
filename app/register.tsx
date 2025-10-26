import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getProvinces, getCantons, getDistricts } from '../services/location.service';
import { Location } from '../types/location.type';

const RegisterScreen = () => {
  const router = useRouter();
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [cantons, setCantons] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

  const handleRegister = () => {
    // Lógica de registro aquí
    console.log('Registrando usuario...');
    // Por ahora, redirigimos al inicio
    router.replace('/(tabs)/inicio'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Crear tu Cuenta</Text>
                    <Text style={styles.subtitle}>Ingresa tus datos para empezar a explorar.</Text>
                </View>

                <View style={styles.form}>

                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="johndoe@example.com"
                        placeholderTextColor="#A9A9A9"
                    />

                    <Text style={styles.label}>Nombre completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                        placeholderTextColor="#A9A9A9"
                    />

                    <Text style={styles.label}>Fecha de nacimiento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#A9A9A9"
                    />

                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="+506 8888-8888"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Provincia</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: San José"
                        placeholderTextColor="#A9A9A9"
                    />

                    <Text style={styles.label}>Cantón</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Santa Ana"
                        placeholderTextColor="#A9A9A9"
                    />

                    <Text style={styles.label}>Distrito</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Uruca"
                        placeholderTextColor="#A9A9A9"
                    />
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                </TouchableOpacity>

                <View style={styles.loginPrompt}>
                    <Text style={styles.loginPromptText}>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.loginLink}>Inicia Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { 
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
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
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
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
    marginTop: 24,
    marginBottom: 20,
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
});

export default RegisterScreen;
