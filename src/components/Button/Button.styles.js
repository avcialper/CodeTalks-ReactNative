import { StyleSheet } from 'react-native'
import colors from '../../colors/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        margin: 10,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})