
import { Colors, GlobalStyle } from '@/constants/theme';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface OTPInputProps {
    otp: string[];
    timer: number;
    handleChange: (text: string, index: number) => void;
    handleResend: () => void;
}

const OTPInput = (props: OTPInputProps) => {
    return (
        <View>
            <View style={styles.otpContainer}>
                {props.otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(text) => props.handleChange(text, index)}
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
});

export default OTPInput;