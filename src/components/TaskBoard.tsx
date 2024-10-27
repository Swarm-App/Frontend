import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import DraggableTask from './Task';
import { handleDrop, checkDropZone } from '../domain/useCases/handleDrop';
import { Task, Tasks } from '../domain/models/Task';
import { TaskRepository } from '../data/repositories/TaskRepository';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks>({
    upcoming: [],
    todo: [],
    done: [],
  });
  
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [interactionEnabled, setInteractionEnabled] = useState(true);

  useEffect(() => {
    const taskRepository = new TaskRepository();
    const initialTasks = taskRepository.getTasks();
    setTasks(initialTasks);
  }, []);

  const onDropTask = async (pageX: number, taskId: number) => {
    const dropZoneId = checkDropZone(pageX + scrollX, taskContainerMinWidth);
    const updatedTasks = handleDrop(tasks, dropZoneId, taskId);
    setTasks(updatedTasks);
  };

  const renderTask = (task: Task) => (
    <DraggableTask
      key={task.id}
      taskId={task.id}
      title={task.title}
      description={task.description}
      onDrop={(pageX) => onDropTask(pageX, task.id)}
      scrollX={scrollX}
      taskContainerMinWidth={taskContainerMinWidth}
      setScrollEnabled={setScrollEnabled}
      setInteractionEnabled={setInteractionEnabled}
    />
  );

  return (
<View style={styles.container} pointerEvents={interactionEnabled ? 'auto' : 'none'}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.boardScrollContainer}
        onScroll={(event) => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
        scrollEnabled={scrollEnabled}
        scrollEventThrottle={16}
      >
        <View style={styles.boardContainer}>
          {/* Upcoming Task Column */}
          <View style={styles.dropZone}>
            <View>
              <Text style={styles.taskListTitle}>Upcoming</Text>
            </View>
            <ScrollView style={styles.scrollView} bounces={false}>
              {tasks.upcoming.map(renderTask)}
            </ScrollView>
          </View>

          {/* To Do Task Column */}
          <View style={styles.dropZone}>
            <View>
              <Text style={styles.taskListTitle}>To Do</Text>
            </View>
            <ScrollView style={styles.scrollView} bounces={false}>
              {tasks.todo.map(renderTask)}
            </ScrollView>
          </View>

          {/* Done Task Column */}
          <View style={styles.dropZone}>
            <View>
              <Text style={styles.taskListTitle}>Done</Text>
            </View>
            <ScrollView style={styles.scrollView} bounces={false}>
              {tasks.done.map(renderTask)}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskBoard;


const taskContainerMinWidth = Math.min(Dimensions.get('window').width - 30, 500);

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

