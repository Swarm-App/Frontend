import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import TaskList from '../../components/TaskList';


const taskItems = ['Task 1', 'Task 2', 'Task 3', 'Task 4','Task 1', 'Task 2', 'Task 3', 'Task 4','Task 1', 'Task 2', 'Task 3', 'Task 4','Task 1', 'Task 2', 'Task 3', 'Task 4','Task 1', 'Task 2', 'Task 3', 'Task 4'];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.boardContainer}>
          <TaskList title="Upcoming" tasks={taskItems} />
          <TaskList title="InProgress" tasks={taskItems} />
          <TaskList title="Done" tasks={taskItems} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 50, // To give some space from the top
    overflow:'scroll',
  },
  boardContainer: {
    flexDirection: 'row', // Aligns the TaskList components in a row
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    flexWrap: 'nowrap', 
    
  },
});
