import React from 'react'
import { Pressable } from 'react-native'

// Icon package
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Components styles
import styles from './CircileButton.styles'

export default ({ iconName, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress} >
            <Icon name={iconName} style={styles.icon} />
        </Pressable>
    )
}