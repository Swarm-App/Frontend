import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView ,Dimensions} from 'react-native';
import DraggableTask from '../components/Task';

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    upcoming: [1, 2, 6],
    todo: [3, 4],
    done: [5],
  });

  // State to track the horizontal scroll offset
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true); // ***New state to control scroll enabling/disabling***
  const [interactionEnabled, setInteractionEnabled] = useState(true); // ***New state to control all gestures***

  const handleDrop = async (dropZoneId: string, taskId: number) => {
    // Remove task from all lists
    let updatedTasks = {
      upcoming: tasks.upcoming.filter(id => id !== taskId),
      todo: tasks.todo.filter(id => id !== taskId),
      done: tasks.done.filter(id => id !== taskId),
    };

    // Add task to the correct list
    updatedTasks[dropZoneId as keyof typeof updatedTasks].push(taskId);
    setTasks(updatedTasks);
  };

  const renderTask = (taskId: number) => (
    <DraggableTask
      key={taskId}
      onDrop={(dropZoneId) => handleDrop(dropZoneId, taskId)}
      scrollX={scrollX} // Pass the current scroll offset to the draggable component
      taskContainerMinWidth={taskContainerMinWidth}
      setScrollEnabled={setScrollEnabled} // ***Passing setScrollEnabled to Draggable***
      setInteractionEnabled={setInteractionEnabled} // ***Passing interaction control***
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
