import React from 'react'
import { Pressable } from 'react-native'

// Icon package
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Components styles
import styles from './FloatingButton.styles'

export default ({ name, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress} >
            <Icon name={name} style={styles.icon} />
        </Pressable>
    )
}