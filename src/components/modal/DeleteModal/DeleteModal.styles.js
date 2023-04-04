import { StyleSheet } from 'react-native'
import colors from '../../../colors/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.modalBackground,
        borderRadius: 10,
        paddingVertical: 10
    },
    title: {
        marginHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})