import OTPInput from '@/components/OtpInput';
import { Colors, GlobalStyle } from '@/constants/theme';
import AuthService from '@/services/auth.service';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTPScreen = () => {

    const { email, fullName, password } = useLocalSearchParams<{ email: string, fullName: string, password: string }>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [errorOutput, setErrorOutput] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
    };

    const handleResend = async () => {

        try {

            setLoading(true);
            setErrorOutput('');

            const response = await AuthService.SendRegistrationOtp({ Email: email });

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

    const handleSubmit = async () => {

        try {

            const otpCode = otp.join('');

            if (otpCode.length < 6)
                setErrorOutput('Código de verificación inválido');

            setLoading(true);
            setErrorOutput('');

            var response = await AuthService.Register({
                FullName: fullName,
                Email: email,
                Password: password,
                Otp: otpCode
            });

            if (response.Status == 200) {
                router.push('/(tabs)/home');
            } else {
                setErrorOutput(response.Message || 'No se pudo cambiar la contraseña. Inténtelo de nuevo más tarde.');
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

                <Text style={styles.title}>Verifica tu correo electrónico</Text>
                <Text style={styles.subtitle}>Hemos enviado un código a {email || 'tu correo electrónico'} </Text>

                <OTPInput
                    otp={otp}
                    timer={timer}
                    handleChange={handleChange}
                    handleResend={handleResend}
                />

                {errorOutput != '' && (
                    <View style={styles.errorOutputSection}>
                        <Text style={styles.errorOutput}>{errorOutput}</Text>
                    </View>
                )}

                <View style={styles.bottomSection}>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.buttonText}>Verificar</Text>
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
        backgroundColor: '#FFFFFF',
    },
    errorOutputSection: {
        marginTop: 20,
    },
    errorOutput: {
        fontSize: 15,
        color: '#ec1c1cff',
        textAlign: 'center',
    },
    //General
    //Header
    title: {
        fontSize: GlobalStyle.TitleFontSize,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginVertical: 15,
        // alignSelf: 'center',
    },
    subtitle: {
        fontSize: GlobalStyle.LabelFontSize,
        color: Colors.light.text,
        marginBottom: 20,
        alignSelf: 'center',
    },
    //Header
    //OTP Section
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
        alignSelf: 'center',
    },
    otpInput: {
        width: 45,
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: GlobalStyle.BorderRadius,
        textAlign: 'center',
        fontSize: 20,
    },
    resendText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20,
        alignSelf: 'center'
    },
    resendTextEnabled: {
        color: Colors.light.main,
    },
    resendTextDisabled: {
        color: Colors.light.placeholder,
    },
    //OTP Section
    //Footer
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    button: {
        height: 50,
        backgroundColor: Colors.light.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: GlobalStyle.BorderRadius,
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    //Footer
});

export default OTPScreen;
