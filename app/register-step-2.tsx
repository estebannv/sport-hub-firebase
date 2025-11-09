import { Colors, GlobalStyle } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const OTPScreen = () => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const inputs = useRef<Array<TextInput | null>>([]);

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

        if (text.length === 1 && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }: { nativeEvent: { key: string } }, index: number) => {
        if (key === 'Backspace' && otp[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => setTimer(30);

    const handleSubmit = () => {
        const otpCode = otp.join('');
        console.log('OTP Submitted:', otpCode);
        // Add logic to verify OTP
        router.replace('/(tabs)/inicio');
    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Verifica tu correo electrónico</Text>
            <Text style={styles.subtitle}>Hemos enviado un código a navarro.estn@gmail.com </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        value={digit}
                    // ref={(ref) => (inputs.current[index] = ref)}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                <Text style={styles.resendText}>
                    {timer > 0 ? `Reenviar código en ${timer}s` : 'Reenviar código'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                <Text style={styles.registerButtonText}>Verificar</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // padding: 20,
        position: 'relative',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        // color: '#666',
        marginBottom: 20,
    },
    timer: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginBottom: 20,
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
        color: '#007AFF',
    },
    registerButton: {
        width: '85%',
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: GlobalStyle.BorderRadius,
        position: 'absolute',
        bottom: 30
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OTPScreen;
