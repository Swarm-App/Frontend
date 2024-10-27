import { StyleSheet, Dimensions } from 'react-native';

export const taskContainerMinWidth = Math.min(Dimensions.get('window').width - 30, 500);

export const taskBoardStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      boardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      taskListTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#ffffff',
      },
      boardScrollContainer: {
        flexGrow: 1,
      },
      dropZone: {
        flex: 1,
        minWidth: taskContainerMinWidth,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        userSelect: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      scrollView: {
        flexGrow: 1,
      },
      addButton: { 
        backgroundColor: '#007AFF', 
        padding: 15, 
        borderRadius: 50, 
        alignItems: 'center', 
        position: 'absolute', 
        bottom: 30, 
        right: 30 },
      addButtonText: {
         color: '#fff', 
         fontSize: 16, 
         fontWeight: 'bold' },
});
