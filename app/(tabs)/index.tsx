import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import TaskList from '../../components/TaskBoard';
import TaskBoard from '../../components/TaskBoard';



export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TaskBoard/>
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
