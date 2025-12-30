import OTPInput from '@/components/OtpInput';
import { Colors, GlobalStyle } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTPScreen = () => {

    const { email } = useLocalSearchParams<{ email: string }>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);

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

    const handleResend = () => setTimer(30);

    const handleSubmit = () => {
        
        const otpCode = otp.join('');
        console.log('OTP Submitted:', otpCode);
        
        router.replace('/(tabs)/home');
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

            <View style={styles.bottomSection}>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Continuar</Text>
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
