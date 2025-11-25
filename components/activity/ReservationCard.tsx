import { GlobalStyle } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface Reservation {
  id: string;
  centerName: string;
  location: string;
  date: string;
  time: string;
  price: string;
  status: 'upcoming' | 'past';
  image?: string;
}

export const ReservationCard = ({ item }: { item: Reservation }) => {
    
  const [visible, setVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <View>
      <TouchableOpacity onPress={handleOpen}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>⚽</Text>

          <View>
            <Text style={styles.cardTitle}>{item.centerName}</Text>
            <Text style={styles.cardDetail}>{item.date} • {item.time}</Text>
            <Text style={styles.cardDetail}>{item.location}</Text>
            <Text style={styles.cardDetail}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.hr} />

      <Modal
  isVisible={visible}
>
    <View style={styles.modalStyle}>
      <View style={styles.modalCard}>

        <Text style={styles.centerName}>{item.centerName}</Text>
        <Text style={styles.detailText}>Ubicación: {item.location}</Text>
        <Text style={styles.detailText}>Hora: {item.time}</Text>
        <Text style={styles.priceText}>Precio: {item.price}</Text>

        <ActionButton label="Ver Recibo" onPress={() => {}} />
        <ActionButton label="Calificar Servicio" onPress={() => {}} />
        <ActionButton label="Login" onPress={() => {}} />

      </View>
    </View>
</Modal>

      
    </View>
  );
};

const ActionButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    gap: 25,
  },
  cardIcon: {
    fontSize: 35,
    alignSelf: 'center',
    backgroundColor: '#ececec',
    padding: 15,
    borderRadius: GlobalStyle.BorderRadius,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetail: {
    color: '#333',
    marginBottom: 4,
  },
  hr: {
    height: 1,
    backgroundColor: '#e2e2e2',
    marginVertical: 15,
  },
  modalStyfle:{
    backgroundColor: 'white',
    // margin: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // flex: 1,
    // justifyContent: 'flex-end'
  },
overlay: {
  flex: 1,
  backgroundColor: "rgba(255, 0, 0, 1)",
  justifyContent: "flex-end"
},
  modalContainer: {
    flex: 1,
    // backgroundColor: 'white',
    // paddingHorizontal: GlobalStyle.PaddingHorizontal,
    justifyContent: 'flex-end',
  },
  // modalCard: {
  //   padding: 20,
  //   borderRadius: 10,
  //   backgroundColor: '#fafafa',
  // },
  // centerName: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   marginBottom: 12,
  // },
  // detailText: {
  //   fontSize: 16,
  //   marginBottom: 6,
  // },
  // priceText: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   marginVertical: 12,
  // },
  // actionButton: {
  //   backgroundColor: 'black',
  //   paddingVertical: 12,
  //   borderRadius: 8,
  //   marginTop: 10,
  // },
  // actionButtonText: {
  //   color: 'white',
  //   textAlign: 'center',
  //   fontWeight: '600',
  // },
});
