import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import DraggableTask from './Task';
import { handleDrop, checkDropZone } from '../domain/useCases/handleDrop';
import { Task, Tasks,TaskStatus } from '../domain/models/Task';
import { TaskRepository } from '../data/repositories/TaskRepository';
import { taskBoardStyles as styles, taskContainerMinWidth} from './styles/TaskBoardStyles';
import AddTaskButton from './Buttons/AddTaskButton';
import AddTaskModal from './AddTaskModal';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks>({
    upcoming: [],
    todo: [],
    done: [],
  });
  
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [interactionEnabled, setInteractionEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);


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

  const addNewTask = (title: string, description: string) => {
    const newTask: Task = { id: Date.now(), title, description ,status:TaskStatus.UPCOMING};
    setTasks((prevTasks) => ({ ...prevTasks, upcoming: [...prevTasks.upcoming, newTask] }));
    setModalVisible(false);
  };

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
      <AddTaskButton onPress={() => setModalVisible(true)} />
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addNewTask}
      />
    </View>
    
  );
};

export default TaskBoard;
