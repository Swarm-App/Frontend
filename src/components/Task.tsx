import React, { Component, Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  View,
  Text,
} from 'react-native';

interface DraggableProps {
  taskId: number;
  title: string;
  description: string;
  onDrop: (PageX: number) => Promise<void>;
  scrollX: number;
  taskContainerMinWidth: number;
  setScrollEnabled: Dispatch<SetStateAction<boolean>>;
  setInteractionEnabled: Dispatch<SetStateAction<boolean>>;
}

interface DraggableState {
  pan: Animated.ValueXY;
}

export default class DraggableTask extends Component<DraggableProps, DraggableState> {
  private _val = { x: 0, y: 0 };
  private panResponder: PanResponderInstance;

  constructor(props: DraggableProps) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
    this.state.pan.addListener((value) => (this._val = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        this.props.setScrollEnabled(false);
        this.props.setInteractionEnabled(false);
        return true;
      },
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: this.handlePanResponderRelease,
      onPanResponderEnd: () => {
        this.props.setScrollEnabled(true);
        this.props.setInteractionEnabled(true);
      },
    });
  }

  handlePanResponderRelease = async (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();

    try
    {
      await this.props.onDrop(e.nativeEvent.pageX);
    }
    catch(error) 
    {
      console.error("Error during drop:", error);
    }
    






  };

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };

    return (
      <Animated.View {...this.panResponder.panHandlers} style={[panStyle, styles.kanbanCard]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{this.props.title}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>{this.props.description}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  kanbanCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    marginVertical: 10,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    paddingTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
