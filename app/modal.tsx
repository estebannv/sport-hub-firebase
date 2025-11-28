import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

export default function BottomHalfModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
        <Text>Este modal aparece desde abajo ocupando la mitad.</Text>
      <Button title="Mostrar Modal" onPress={() => setModalVisible(true)} />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Bottom Half</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // modal: {
  //   justifyContent: "flex-end",
  //   margin: 0, 
  // },
  // modalContent: {
  //   height: "50%",
  //   backgroundColor: "white",
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   padding: 20,
  // },
});
