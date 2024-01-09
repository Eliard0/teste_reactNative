import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
    },

    botaoLiga: {
        marginBottom: 60,
        marginTop: 40
    },

    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    },

    help: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 40,
    },
});
