import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import EditTaskModal from './Modals/EditTaskModal';
import { TaskRepository } from '../data/repositories/TaskRepository';

interface DraggableProps {
  taskId: number;
  title: string;
  description: string;
  onDrop: (PageX: number) => Promise<void>;
  scrollX: number;
  taskContainerMinWidth: number;
  setScrollEnabled: (enabled: boolean) => void;
  setInteractionEnabled: (enabled: boolean) => void;
  onSave: (taskId: number, newTitle: string, newDescription: string) => void; 
}

interface DraggableState {
  pan: Animated.ValueXY;
  isModalVisible: boolean;
  title: string;
  description: string;
}



export default class DraggableTask extends Component<DraggableProps, DraggableState> {
  private _val = { x: 0, y: 0 };
  private panResponder: PanResponderInstance;

  constructor(props: DraggableProps) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      isModalVisible: false,
      title: props.title,
      description: props.description,
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

  handleSave = (newTitle: string, newDescription: string) => {
    this.props.onSave(this.props.taskId, newTitle, newDescription);
    this.setState({
      title: newTitle,
      description: newDescription,
      isModalVisible: false,
    });
  };

  handlePanResponderRelease = async (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();

    try {
      await this.props.onDrop(e.nativeEvent.pageX);
    } catch (error) {
      console.error("Error during drop:", error);
    }
  };

  handleOpenModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalVisible: false });
  };


  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };

    return (
      <>
          <Animated.View {...this.panResponder.panHandlers} style={[panStyle, styles.kanbanCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{this.state.title}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardDescription}>{this.state.description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button 
                title="Edit" 
                onPress={this.handleOpenModal} 
                color="#007BFF" // Optional: Change the button color
              />
            </View>
          </Animated.View>

        <EditTaskModal
          visible={this.state.isModalVisible}
          title={this.state.title}
          description={this.state.description}
          onClose={this.handleCloseModal}
          onSave={this.handleSave}
        />
      </>
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
  buttonContainer: {
    position: 'absolute',
    bottom: 1, // Adjust the distance from the bottom as needed
    right: 1, // Adjust the distance from the right as needed
  },
});
