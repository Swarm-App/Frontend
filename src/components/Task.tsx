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
} from 'react-native';
import EditTaskModal from './Modals/EditTaskModal';
import DeleteTaskModal from './Modals/DeleteTaskModal';
import { taskStyles as styles} from './styles/TaskStyles';


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
  onDelete:(taskId:number)=>void;
}

interface DraggableState {
  pan: Animated.ValueXY;
  isEditModalVisible: boolean;
  isDeleteModalVisible:boolean;
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
      isEditModalVisible: false,
      isDeleteModalVisible: false,
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

  handleSaveEdit = (newTitle: string, newDescription: string) => {
    this.props.onSave(this.props.taskId, newTitle, newDescription);
    this.setState({
      title: newTitle,
      description: newDescription,
      isEditModalVisible: false,
    });
  };

  handleSaveDelete = () => {
    this.props.onDelete(this.props.taskId);
    this.setState({
      isDeleteModalVisible: false,
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

  handleOpenEditModal = () => {
    this.setState({ isEditModalVisible: true });
  };

  handleOpenDeleteModal = () => {
    this.setState({ isDeleteModalVisible: true });
  };

  handleCloseEditModal = () => {
    this.setState({ isEditModalVisible: false });
  };

  handleCloseDeleteModal = () => {
    this.setState({ isDeleteModalVisible: false });
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
                onPress={this.handleOpenEditModal} 
                color="#007BFF" // Optional: Change the button color
              />
              <Button 
                title="Delete" 
                onPress={this.handleOpenDeleteModal} 
                color="#007BFF" // Optional: Change the button color
              />
            </View>
          </Animated.View>

        <EditTaskModal
          visible={this.state.isEditModalVisible}
          title={this.state.title}
          description={this.state.description}
          onClose={this.handleCloseEditModal}
          onSave={this.handleSaveEdit}
        />
        <DeleteTaskModal
          visible={this.state.isDeleteModalVisible}
          onClose={this.handleCloseDeleteModal}
          onDelete={this.handleSaveDelete}
        />
      </>
    );
  }
}
