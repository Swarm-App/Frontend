import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';
import { modalStyles as styles } from '../styles/ModalStyles';

const AddTaskModal: React.FC<{ visible: boolean; onClose: () => void; onAdd: (title: string, description: string) => void }> = ({ visible, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    onAdd(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>New Task</Text>
          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
          <Button title="Add Task" onPress={handleAdd} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
