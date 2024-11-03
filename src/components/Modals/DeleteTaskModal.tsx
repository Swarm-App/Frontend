// EditTaskModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';
import { modalStyles as styles } from '../styles/ModalStyles';

interface DeleteTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ visible, onClose, onDelete }) => {

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Task</Text>
          <Text>Do you want to delete task?</Text>

          <View style={styles.buttonContainer}>
            <Button title="Delete" onPress={onDelete}  color="red" />
            <Button title="Cancel" onPress={onClose}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default DeleteTaskModal;
