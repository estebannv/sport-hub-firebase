import AuthService from '@/services/auth.service';
import LocationService from '@/services/location.service';
import { Keys, StorageService } from '@/services/storage.service';
import ValidationService from '@/services/validation.service';
import EncryptionUtil from '@/utils/encryption.util';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, GlobalStyle } from '../constants/theme';

const LoginScreen = () => {

	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [errorOutput, setErrorOutput] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const LoadLocation = async () => {
		await LocationService.AskUserLocationAndSaveInStorage();
	};

	useEffect(() => {
		LoadLocation();
	}, []);

	const handleLogin = async () => {

		try {
			// Limpiar errores previos
			setEmailError('');
			setPasswordError('');
			setErrorOutput('');

			// Validar cada campo individualmente
			const emailValidation = ValidationService.validateEmail(email);
			const passwordValidation = ValidationService.validatePassword(password);

			let hasErrors = false;

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

			setLoading(true);

			var passwordEncrypted = EncryptionUtil.Encrypt(password);
			var response = await AuthService.SignIn({ Email: email, Password: passwordEncrypted.encryptedData });

			if (response.Successful) {
				await StorageService.Set(Keys.Token, response.Data);
				router.push('/(tabs)/home')
			} else {
				setErrorOutput(response.Message || '')
			}

		} catch (error) {
			console.log(error)
			setErrorOutput('No pudimos procesar tu solicitud, inténtelo de nuevo más tarde.')
		}

		setLoading(false);
	};

	return (

		<SafeAreaView style={styles.container}>

			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>

				<ScrollView
					style={styles.scrollView}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.header}>
						<Text style={styles.title}>Iniciar sesión</Text>
						<Text style={styles.subtitle}>Ingresa tus datos para empezar a explorar</Text>
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
							autoCapitalize="none"
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
						<Text style={styles.primaryButtonText}>Iniciar sesión</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
						<FontAwesome name="google" size={24} color="black" />
						<Text style={styles.secondaryButtonText}>Registrarse con Google</Text>
					</TouchableOpacity>
					
				</View>

				</ScrollView>

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
		marginBottom: 12,
		borderWidth: 1,
		borderColor: Colors.light.border
	},
	inputError: {
		borderColor: '#ec1c1cff',
	},
	disabled: {
		opacity: 0.7,
	},
	gif: {
		width: 32,
		height: 32,
	},
	errorText: {
		fontSize: 14,
		color: '#ec1c1cff',
		marginBottom: 12,
		marginLeft: 4,
	},
	errorOutputSection: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
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
		marginTop: 24,
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
		marginTop: '50%',
	},
	scrollView: {
		flex: 1,
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
