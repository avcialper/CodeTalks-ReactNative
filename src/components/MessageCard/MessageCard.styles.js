import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../colors/colors'

export default StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 70,
        backgroundColor: colors.mainColor,
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    owner: {
        color: colors.ownerColor,
        fontWeight: 'bold',
    },
    message: {
        color: 'white',
        fontSize: 17
    },
    date: {
        textAlign: 'right',
        fontStyle: 'italic',
        color: 'white'
    }
})