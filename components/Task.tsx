import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  Dimensions,
  View,
  Text
} from 'react-native';

interface DraggableState {
  pan: Animated.ValueXY;
}

interface PanValue {
  x: number;
  y: number;

}

interface DraggableProps {
  onDrop: (dropZoneId: string) => Promise<void>; // Callback for when the item is dropped
}

export default class Draggable extends Component<DraggableProps, DraggableState> {
  private _val: PanValue;
  private panResponder: PanResponderInstance;

  constructor(props: DraggableProps) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
    this._val = { x: 0, y: 0 };

    // Add a listener for the delta value change
    this.state.pan.addListener((value: PanValue) => (this._val = value));

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e: GestureResponderEvent, gesture: PanResponderGestureState) => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: this.handlePanResponderRelease,
    });
  }

  handlePanResponderRelease = async (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    // First, animate the object back to its original position
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();

    // Handle drop logic asynchronously
    try {
      const dropZoneId = this.checkDropZone(e.nativeEvent.pageX, e.nativeEvent.pageY);
      await this.props.onDrop(dropZoneId);
    } catch (error) {
      console.error("Error during drop:", error);
    }

    // After drop is handled, reset pan value for the next drag action
    this.state.pan.setValue({ x: 0, y: 0 });
  };

  checkDropZone(x: number, y: number): string {
    const screenWidth = Dimensions.get('window').width;
    const columnWidth = screenWidth / 3;
    console.log('columnWidth=' + columnWidth);
    console.log(x);

    if (x < columnWidth) {
      return 'upcoming'; // Left column
    } else if (x < columnWidth * 2) {
      return 'todo'; // Middle column
    } else {
      return 'done'; // Right column
    }
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };

    return (
    <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.kanbanCard]}
      >
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>Task Title</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardDescription}>This is a description of the task.</Text>
    </View>
  </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  kanbanCard: {
    flex: 1,
            // Adjust the height as necessary
    backgroundColor: '#f9f9f9',  // Light background color for a clean look
    borderRadius: 5,       // Slight border radius for modern look
    shadowColor: '#000',   // Shadow for subtle elevation effect
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,    // Light shadow
    shadowRadius: 4,
    elevation: 3,          // Slight elevation for Android
    padding: 10,           // Padding for inner content
    marginVertical: 10,    // Space between cards
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',  // Line to separate header
    paddingBottom: 5,
  },
  cardTitle: {
    fontSize: 18,          // Larger font for the task title
    fontWeight: 'bold',    // Bold to make it stand out
    color: '#333',         // Darker text color
  },
  cardContent: {
    paddingTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',         // Lighter color for description text
  },
});



