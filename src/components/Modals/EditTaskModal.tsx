// EditTaskModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { modalStyles as styles } from '../styles/ModalStyles';

interface EditTaskModalProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onSave: (newTitle: string, newDescription: string) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ visible, title, description, onClose, onSave }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          <TextInput style={styles.input} value={newTitle} onChangeText={setNewTitle} placeholder="Title" />
          <TextInput style={styles.input} value={newDescription} onChangeText={setNewDescription} placeholder="Description" multiline />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={() => onSave(newTitle, newDescription)} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default EditTaskModal;
