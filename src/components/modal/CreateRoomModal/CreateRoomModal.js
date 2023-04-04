import React from 'react'
import { View, Keyboard } from 'react-native'

// Modal package
import Modal from 'react-native-modal'

// Custom components
import Input from '../../Input'
import Button from '../../Button'
import ShowFlashMessage from '../../ShowFlashMessage/ShowFlashMessage'

// Components styles
import styles from './CreateRoomModal.styles'

export default ({ isVisible, onClose, createRoom }) => {

    // State
    const [roomName, setRoomName] = React.useState('')

    // Handle rooom creation
    const handleCreateRoom = () => {
        if (!roomName) ShowFlashMessage('Odanıza isim veriniz.')
        createRoom(roomName)
        setRoomName('')
    }

    return (
        <Modal
            isVisible={isVisible}
            swipeDirection='down'
            onSwipeComplete={onClose}
            onBackButtonPress={onClose}
            onBackdropPress={onClose} >
            <View style={styles.container} >
                <Input onChangeText={setRoomName} placeholder='Oda adı' value={roomName} startFocus={true} />
                <Button title='Oluştur' onPress={handleCreateRoom} />
            </View>
        </Modal>
    )
}