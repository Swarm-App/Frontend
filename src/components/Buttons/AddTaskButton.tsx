import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { taskBoardStyles as styles } from '../styles/TaskBoardStyles';

const AddTaskButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <Text style={styles.addButtonText}>+ Add Task</Text>
  </TouchableOpacity>
);

export default AddTaskButton;
