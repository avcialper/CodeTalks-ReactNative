import React from 'react'
import { Pressable, Text, ActivityIndicator } from 'react-native'

// Components styles
import styles from './Button.styles'

export default ({ loading = false, onPress, title }) => {
    return (
        <Pressable
            style={styles.container}
            disabled={loading}
            onPress={onPress} >
            {   // Play animation if loading, else enable title
                loading ?
                    <ActivityIndicator size={20} color='white' /> :
                    <Text style={styles.title} >{title}</Text>
            }
        </Pressable>
    )
}