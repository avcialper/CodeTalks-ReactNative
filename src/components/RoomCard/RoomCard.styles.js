import { StyleSheet } from 'react-native'
import colors from '../../colors/colors'

export default StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor: colors.mainColor,
        borderRadius: 10,
        backgroundColor: '#312f35',
        margin: 10,
        padding: 10
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    owner: {
        fontWeight: 'bold',
        color: colors.ownerColor,
        textAlign: 'center'
    }
})