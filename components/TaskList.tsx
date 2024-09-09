import React, { useState } from 'react';
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native';
import { PanGestureHandler, LongPressGestureHandler, GestureHandlerStateChangeEvent } from 'react-native-gesture-handler';

// Define the type for the task list props
interface TaskListProps {
  tasks: string[];
  title: string;
}

// Define the type for the pan values array, where each task has an Animated.ValueXY
interface PanValues {
  [index: number]: Animated.ValueXY;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title }) => {
  // Create a state that stores pan values for each task
  const [panValues, setPanValues] = useState<PanValues>(
    tasks.map(() => new Animated.ValueXY())
  );

  // Handler for pan gesture events
  const onGestureEvent = (index: number) => Animated.event(
    [
      {
        nativeEvent: {
          translationX: panValues[index].x,
          translationY: panValues[index].y,
        },
      },
    ],
    { useNativeDriver: true }
  );

  // Handler for resetting position when long press is released
  const onHandlerStateChange = (
    index: number,
    event: GestureHandlerStateChangeEvent
  ) => {
    if (event.nativeEvent.state === 5) { // Gesture state 'END'
      Animated.spring(panValues[index], {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.taskListContainer}>
      <Text style={styles.taskListTitle}>{title}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <LongPressGestureHandler
            onHandlerStateChange={(event) => onHandlerStateChange(index, event)}
            minDurationMs={800}
          >
            <PanGestureHandler
              onGestureEvent={onGestureEvent(index)}
              onHandlerStateChange={(event) => onHandlerStateChange(index, event)}
            >
              <Animated.View
                style={[
                  styles.taskItem,
                  {
                    transform: [
                      { translateX: panValues[index].x },
                      { translateY: panValues[index].y },
                    ],
                  },
                ]}
              >
                <Text style={styles.taskText}>{item}</Text>
              </Animated.View>
            </PanGestureHandler>
          </LongPressGestureHandler>
        )}
        showsVerticalScrollIndicator={true}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskListContainer: {
    flex: 1,
    margin: 10,
  },
  taskListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskList: {
    height: 650, // Fixed height for list container
  },
  taskItem: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  taskText: {
    fontSize: 16,
  },
});

export default TaskList;
