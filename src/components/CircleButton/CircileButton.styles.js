import {StyleSheet} from 'react-native'
import colors from '../../colors/colors'

export default StyleSheet.create({
    container: {
        borderRadius: 30,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mainColor
    },
    icon: {
        fontSize: 30,
        color: 'white'
    }
})