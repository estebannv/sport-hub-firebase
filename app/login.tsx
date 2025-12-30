import AuthService from '@/services/auth.service';
import EncryptionUtil from '@/utils/encryption.util';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, GlobalStyle } from '../constants/theme';

const LoginScreen = () => {

	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorOutput, setErrorOutput] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {

		try {

			if (!isValidEmail(email)) {
				setErrorOutput('El correo electrónico ingresado no es válido.');
				return;
			}

			if (password == '') {
				setErrorOutput('La contraseña ingresada no es válida.');
				return;
			}
			
			setLoading(true);
			
			var passwordEncrypted = EncryptionUtil.Encrypt(password);
			var response = await AuthService.SignIn({ Email: email, Password: passwordEncrypted.encryptedData });

			if (response.Status == 200)
				router.push('/(tabs)/home')
			else
				setErrorOutput(response.Message || '')

		} catch (error) {
			console.log(error)
			setErrorOutput('No pudimos procesar tu solicitud, inténtelo de nuevo más tarde.')
		}

		setLoading(false);
	};

	const isValidEmail = (email: string): boolean => {

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (email == '' || !emailRegex.test(email))
			return false;

		return true;
	};

	return (

		<SafeAreaView style={styles.container}>

			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

				<View style={styles.header}>
					<Text style={styles.title}>Iniciar sesión</Text>
					<Text style={styles.subtitle}>Ingresa tus datos para empezar a explorar</Text>
				</View>

				<TextInput
					style={styles.input}
					placeholder="Correo electrónico"
					placeholderTextColor={Colors.light.placeholder}
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<View>

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
							{passwordVisible ? 
								<AntDesign name="eye-invisible" size={24} color="black" /> : 
								<AntDesign name="eye" size={24} color="black" />
							}
						</Text>
					</TouchableOpacity>

				</View>

				{errorOutput != '' ?
					<View style={styles.errorOutputSection}>
						<Ionicons style={styles.errorOutputIcon} name="alert-circle-outline" />
						<Text style={styles.errorOutput}>{errorOutput}</Text>
					</View>

					: null}

				<TouchableOpacity style={styles.forgotPassword} onPress={() => router.push('/forgot-password/step-1')}>
					<Text style={styles.forgotPasswordText}>¿Olvidó su contraseña?</Text>
				</TouchableOpacity>

				<View style={styles.footer}>

					<View style={styles.registerSection}>

						<Text style={styles.registerSectionText}>¿No tienes una cuenta?</Text>

						<TouchableOpacity onPress={() => router.push('/registration/step-1')}>
							<Text style={styles.registerLink}>Registrarse</Text>
						</TouchableOpacity>

					</View>

					<TouchableOpacity style={[styles.primaryButton, loading && styles.disabled]} onPress={handleLogin} disabled={loading} >
						{/* {loading ? 
							<Image source={require("../assets/loading.gif")} style={styles.gif} /> : 
							<Text style={styles.primaryButtonText}>Iniciar sesión</Text>
						} */}
						<Text style={styles.primaryButtonText}>Iniciar sesión</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
						<FontAwesome name="google" size={24} color="black" />
						<Text style={styles.secondaryButtonText}>Registrarse con Google</Text>
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
	disabled: {
		opacity: 0.7,
	},
	gif: {
		width: 32,
		height: 32,
	},
	errorOutputSection: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	errorOutput: {
		fontSize: 15,
		color: '#ec1c1cff'
	},
	errorOutputIcon: {
		fontSize: 19,
		color: '#ec1c1cff',
		marginRight: 5,
	},
	//General
	//Header
	header: {
		marginTop: '30%',
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
		height: 50,
		justifyContent: 'center',
		paddingRight: 15
	},
	passwordToggleText: {
		color: Colors.light.main,
		fontWeight: '500',
	},
	//Forgot Password
	forgotPassword: {
		marginTop: 20
	},
	forgotPasswordText: {
		fontSize: GlobalStyle.LabelFontSize,
		color: Colors.light.main,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	//Register
	registerSection: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginBottom: 23
	},
	registerSectionText: {
		fontSize: GlobalStyle.LabelFontSize,
		color: Colors.light.text,
		fontFamily: Fonts.sans
	},
	registerLink: {
		fontSize: GlobalStyle.LabelFontSize,
		color: Colors.light.main,
		fontWeight: 'bold',
		marginLeft: 6,
	},
	//Register
	//Footer
	footer: {
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
	secondaryButton: {
		flexDirection: 'row',
		gap: 10,
		height: 50,
		backgroundColor: Colors.light.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: GlobalStyle.BorderRadius,
	},
	secondaryButtonText: {
		color: Colors.light.text,
		fontSize: GlobalStyle.ButtomTextFontSize,
		fontWeight: 'bold',
	},
	//Footer
});

export default LoginScreen;
