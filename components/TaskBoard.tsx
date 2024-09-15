import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Draggable from '../components/Task'; // Update the path if necessary

const TaskBoard = () => {
  // Initialize tasks with dummy data
  const [tasks, setTasks] = useState({
    upcoming: [1, 2],
    todo: [3, 4],
    done: [5]
  });

  const handleDrop = async (dropZoneId: string, taskId: number) => {
    // Remove task from all lists
    let updatedTasks = {
      upcoming: tasks.upcoming.filter(id => id !== taskId),
      todo: tasks.todo.filter(id => id !== taskId),
      done: tasks.done.filter(id => id !== taskId)
    };

    // Add task to the correct list
    updatedTasks[dropZoneId as keyof typeof updatedTasks].push(taskId);

    setTasks(updatedTasks);
  };

  const renderTask = (taskId: number) => (
    <Draggable key={taskId} onDrop={(dropZoneId) => handleDrop(dropZoneId, taskId)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <View style={styles.dropZone} id='upcoming'>
          {/* <Text style={styles.taskListTitle}>Upcoming Tasks</Text> */}
          {tasks.upcoming.map(renderTask)}
        </View>

        <View style={styles.dropZone} id='todo'>
          {/* <Text style={styles.taskListTitle}>ToDo Tasks</Text> */}
          {tasks.todo.map(renderTask)}
        </View>

        <View style={styles.dropZone} id='done'>
          {/* <Text style={styles.taskListTitle}>Done Tasks</Text> */}
          {tasks.done.map(renderTask)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  boardContainer: {
    flex: 1,
    flexDirection: 'row',  // Set direction to row to create columns
    justifyContent: 'space-between', // Add space between the columns
  },
  taskListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropZone: {
    flex: 1,
    marginHorizontal: 5, // Add some horizontal spacing between lists
    padding: 10,
    borderRadius: 10, // Optional: Add rounded corners for better UI
    borderWidth: 1, // Add border to visually distinguish drop zones
    borderColor: 'gray',
    userSelect: 'none',
  },
});

export default TaskBoard;
