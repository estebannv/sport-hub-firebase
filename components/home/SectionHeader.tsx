
import { GlobalStyle } from '@/constants/theme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      marginHorizontal: GlobalStyle.PaddingHorizontal,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    arrow: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#007AFF',
    }
  });