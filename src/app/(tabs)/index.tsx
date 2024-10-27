import { StyleSheet, ImageBackground ,View} from 'react-native';
import TaskBoard from '../../components/TaskBoard'; // Ensure the path is correct

export default function TabOneScreen() {
  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpg')} // Path to your background image
      style={styles.backgroundImage}
      resizeMode="cover" // Adjusts the resizing mode to cover the entire screen
    >
      <View style={styles.container}>
        <TaskBoard />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 50, // Adds space from the top
  },
  backgroundImage: {
    flex: 1, // Ensures the image covers the entire screen
  },
});
