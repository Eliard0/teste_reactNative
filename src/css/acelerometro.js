import {StyleSheet} from 'react-native' 

export default StyleSheet.create({
    container: {
        marginTop: 250,
      alignItems: 'center',
      justifyContent:'center'
    },
  
    text: {
      fontSize: 25,
      fontWeight: 'bold',
    },
  
    buttonContainer: {
      margin: 40,
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#ccc',
    },
  });
  