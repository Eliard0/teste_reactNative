import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  valorX: {
    color: '#000',
    backgroundColor: '#94c9e4',
    padding: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15
  },
  
  valorY: {
    color: '#000',
    backgroundColor: '#d794e4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 15
  },
  
  valorZ: {
    color: '#000',
    backgroundColor: '#e4af94',
    padding: 15,
    borderRadius: 15
  },

  buttonLigadoDesligado: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#964b00',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    marginTop: 15
  },
});
