import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView ,Dimensions} from 'react-native';
import DraggableTask from '../components/Task';

interface Task {
  id: number;
  title: string;
  description: string;
}
interface Tasks {
  upcoming: Task[];
  todo: Task[];
  done: Task[];
}


const TaskBoard = () => {
  const [tasks, setTasks] = useState<Tasks>({
    upcoming: [
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' },
      // Add other tasks here
    ],
    todo: [
      { id: 3, title: 'Task 3', description: 'Description for Task 3' },
      // Add other tasks here
    ],
    done: [
      { id: 5, title: 'Task 5', description: 'Description for Task 5' },
      // Add other tasks here
    ],
  });
  

  // State to track the horizontal scroll offset
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true); // ***New state to control scroll enabling/disabling***
  const [interactionEnabled, setInteractionEnabled] = useState(true); // ***New state to control all gestures***

  const handleDrop = async (dropZoneId: string, taskId: number) => {
    // Remove task from all lists
    let updatedTasks = {
      upcoming: tasks.upcoming.filter(t => t.id !== taskId),
      todo: tasks.todo.filter(t => t.id !== taskId),
      done: tasks.done.filter(t => t.id !== taskId),
    };

    // Add task to the correct list
    const movedTask = [...tasks.upcoming, ...tasks.todo, ...tasks.done].find(task => task.id === taskId);
    if (movedTask) {
      updatedTasks[dropZoneId as keyof Tasks].push(movedTask);
      setTasks(updatedTasks);
    }
  };

  const renderTask = (task: Task) => (
    <DraggableTask
    key={task.id}
    taskId={task.id}
    title={task.title}
    description={task.description}
    onDrop={(dropZoneId) => handleDrop(dropZoneId, task.id)}
    scrollX={scrollX}
    taskContainerMinWidth={taskContainerMinWidth}
    setScrollEnabled={setScrollEnabled}
    setInteractionEnabled={setInteractionEnabled}
  />
  );

  return (
    <View style={styles.container}
    pointerEvents={interactionEnabled ? 'auto' : 'none'} // ***Control all touch gestures with pointerEvents***
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.boardScrollContainer}
        onScroll={(event) => {
          // Track the horizontal scroll position
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
        scrollEnabled={scrollEnabled} // ***Control scroll based on scrollEnabled state***
        scrollEventThrottle={16} // Throttle the scroll event for better performance
      
      >
        <View style={styles.boardContainer}>
          <View style={styles.dropZone} id="upcoming">
            <View><Text style={styles.taskListTitle}>Upcoming</Text></View>
            <ScrollView style={styles.scrollView}   bounces={false} >
              {tasks.upcoming.map(renderTask)}
            </ScrollView>
          </View>

          <View style={styles.dropZone} id="todo">
            <View><Text style={styles.taskListTitle}>To Do</Text></View>
            <ScrollView style={styles.scrollView}  bounces={false}>
              {tasks.todo.map(renderTask)}
            </ScrollView>
          </View>

          <View style={styles.dropZone} id="done">
            <View><Text style={styles.taskListTitle}>Done</Text></View>
            <ScrollView style={styles.scrollView}  bounces={false}>
              {tasks.done.map(renderTask)}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const taskContainerMinWidth = Math.min(Dimensions.get('window').width-30,500);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  boardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#ffffff',
  },
  boardScrollContainer: {
    flexGrow: 1,
  },
  dropZone: {
    flex: 1,
    minWidth: taskContainerMinWidth,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    userSelect: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default TaskBoard;
