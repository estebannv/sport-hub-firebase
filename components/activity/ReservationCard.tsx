import { Colors, GlobalStyle } from '@/constants/theme';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";

interface Reservation {
  id: string;
  centerName: string;
  location: string;
  date: string;
  time: string;
  price: string;
  status: 'upcoming' | 'past';
  image?: string;
  category?: string;
}

export const ReservationCard = ({ item }: { item: Reservation }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  return (

    <View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>

        <View style={styles.cardHeader}>

          <Text style={styles.cardIcon}>⚽</Text>

          <View>
            <Text style={styles.cardTitle}>{item.centerName}</Text>
            <Text style={styles.cardDetail}>{item.date} • {item.time}</Text>
            <Text style={styles.cardDetail}>{item.price}</Text>
          </View>

        </View>

      </TouchableOpacity>

      <View style={styles.hr} />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>

          <View style={styles.modalTopBar}>
            <TouchableOpacity style={styles.modalTopBarIcon} onPress={() => setModalVisible(false)}>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTopBarTitle}></Text>
          </View>

          <View style={{marginBottom: 15}}>
            <Text style={styles.modalTextTitle}>Detalles de la reservación</Text>
            <Text style={styles.modalTextDetail}>{item.date} • {item.time}</Text>
            <Text style={styles.modalTextDetail}>{item.centerName}</Text>
            <Text style={styles.modalTextDetail}>Categoría: {item.category}</Text>
            <Text style={styles.modalTextDetail}>{item.price}</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton}>
            <FontAwesome5 name="receipt" size={24} color="black" />
            <Text style={styles.primaryButtonText}>Generar recibo</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/modal')}>
            <Text style={styles.primaryButtonText}>Generar factura</Text>
          </TouchableOpacity> */}

        </View>

      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  //General
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  hr: {
    height: 0.5,
    backgroundColor: '#e2e2e2',
    marginVertical: 15,
  },
  //General
  //Card
  cardIcon: {
    fontSize: 35,
    alignSelf: 'center',
    backgroundColor: '#ececec',
    padding: 15,
    borderRadius: GlobalStyle.BorderRadius,
  },
  cardTitle: {
    fontSize: GlobalStyle.LabelFontSize,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDetail: {
    color: '#333',
    marginBottom: 4,
  },
  //Card
  //Modal
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: GlobalStyle.PaddingHorizontal,
  },
  modalTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  modalTopBarTitle: {
    fontSize: GlobalStyle.LabelFontSize,
    fontWeight: 'bold',
  },
  modalTopBarIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  modalTextTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalTextDetail: {
    color: '#333',
    fontSize: GlobalStyle.LabelFontSize,
    marginBottom: 4,
  },
  primaryButton: {
    height: 50,
    backgroundColor: Colors.light.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: GlobalStyle.BorderRadius,
    flexDirection: 'row',
    gap: 10
  },
  primaryButtonText: {
    color: '#333',
    fontSize: GlobalStyle.ButtomTextFontSize,
    fontWeight: 'bold',
  },
  //Modal
});
