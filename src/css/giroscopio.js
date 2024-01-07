import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 80,
    },

    botaoLiga: {
        marginBottom: 60,
        marginTop: 64
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
