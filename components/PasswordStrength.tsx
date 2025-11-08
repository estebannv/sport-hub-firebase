
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type PasswordStrengthProps = {
  password?: string;
};

const PasswordStrength = ({ password = '' }: PasswordStrengthProps) => {
  const requirements = [
    {
      text: 'Al menos 8 caracteres',
      met: password.length >= 8,
    },
    {
      text: 'Una letra mayúscula y una minúscula',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      text: 'Al menos 4 números',
      met: (password.match(/\d/g) || []).length >= 4,
    },
    {
      text: 'Al menos 1 carácter especial',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <View style={styles.container}>
      {requirements.map((req, index) => (
        <PasswordRequirement key={index} met={req.met} text={req.text} password={password} />
      ))}
    </View>
  );
};

const PasswordRequirement = ({ met, text, password }: { met: boolean; text: string; password: string }) => (
  <View style={styles.requirementContainer}>
    <Text style={[styles.requirementText, { color: password == ''? 'gray' : met ? 'green' : 'red' }]}>
      {password == ''? '-' : met ? '✓' : 'X'} {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  requirementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  requirementText: {
    fontSize: 14,
  },
});

export default PasswordStrength;
