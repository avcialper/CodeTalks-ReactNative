import { StyleSheet } from 'react-native'
import colors from '../../colors/colors'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mainColorDark
    },
    icon: {
        fontSize: 30,
        color: 'white'
    }
})