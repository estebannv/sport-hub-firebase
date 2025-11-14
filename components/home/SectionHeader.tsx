
import { GlobalStyle } from '@/constants/theme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.sectionArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      marginHorizontal: GlobalStyle.PaddingHorizontal,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    sectionArrow: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#007AFF',
    }
  });