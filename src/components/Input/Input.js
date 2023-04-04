import React from 'react'
import { View, TextInput } from 'react-native'

// Icon package
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Components styles
import styles from './Input.styles'

export default ({ placeholder, value, onChangeText, isSecure = false,
    primaryIcon = null, secondaryIcon = null, changeableIcon = false, isMultiline = false, startFocus = false }) => {

    // States
    const [secure, setSecure] = React.useState(isSecure)
    const [icon, setIcon] = React.useState(primaryIcon)

    // Input reference
    const inputRef = React.useRef()

    // Focus if we want
    if (startFocus) {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    // To change the button icon
    const changeIcon = () => {
        if (changeableIcon)
            if (icon === primaryIcon) {
                setSecure(false)
                setIcon(secondaryIcon)
            } else {
                setSecure(true)
                setIcon(primaryIcon)
            }
    }

    return (
        <View style={styles.container} >
            <TextInput
                ref={inputRef}
                autoCapitalize='none'
                placeholder={placeholder}
                placeholderTextColor='#696969'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                style={styles.input}
                multiline={isMultiline} />
            <Icon
                name={icon}
                style={styles.icon}
                onPress={changeIcon} />
        </View>
    )
}