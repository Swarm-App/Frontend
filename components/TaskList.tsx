// TaskList.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Define the props for the TaskList component
interface TaskListProps {
  title: string;
  tasks: string[]; // You can extend this to objects like { id: number, content: string }
}

// TaskList component with title and list of tasks
const TaskList: React.FC<TaskListProps> = ({ title, tasks }) => {
  return (
    <View style={styles.taskListContainer}>
      <Text style={styles.taskListTitle}>{title}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Styles for the TaskList component
const styles = StyleSheet.create({
  taskListContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    margin: 8,
    flex:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
  },
});

export default TaskList;
