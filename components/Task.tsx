import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  Dimensions
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
        style={[panStyle, styles.circle]}
      />
    );
  }
}

const CIRCLE_RADIUS = 30;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',

    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

