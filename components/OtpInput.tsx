
import { Colors, GlobalStyle } from '@/constants/theme';
import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface OTPInputProps {
    otp: string[];
    timer: number;
    handleChange: (text: string, index: number) => void;
    handleResend: () => void;
}

const OTPInput = (props: OTPInputProps) => {

    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleTextChange = (text: string, index: number) => {
        
        const numericText = text.replace(/[^0-9]/g, '');
        
        props.handleChange(numericText, index);

        if (numericText.length > 0 && index < props.otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        
        if (e.nativeEvent.key === 'Backspace' && props.otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View>
            <View style={styles.otpContainer}>
                {props.otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => { inputRefs.current[index] = ref; }}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(text) => handleTextChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        value={digit}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={props.handleResend} disabled={props.timer > 0}>
                {props.timer > 0 ?
                    <Text style={[styles.resendText, styles.resendTextDisabled]}>{`Reenviar código en ${props.timer}s`}</Text> :
                    <Text style={[styles.resendText, styles.resendTextEnabled]}>{`Reenviar código`}</Text>
                }
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
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
        color: Colors.light.text,
    },
    resendText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 25,
        alignSelf: 'center'
    },
    resendTextEnabled: {
        color: Colors.light.main,
    },
    resendTextDisabled: {
        color: Colors.light.placeholder,
    },
    //OTP Section
});

export default OTPInput;