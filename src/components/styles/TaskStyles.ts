import { StyleSheet, Dimensions } from 'react-native';



export const taskStyles=StyleSheet.create({
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
