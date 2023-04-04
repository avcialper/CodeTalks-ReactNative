import React from 'react'
import { View, Text } from 'react-native'

// Modal package
import Modal from 'react-native-modal'

// Cunstom component
import Button from '../../Button'

// Components styles
import styles from './DeleteModal.styles'

export default ({ isVisible, changeModalVisible, handleDelete, title }) => {
    return (
        <Modal
            isVisible={isVisible}
            swipeDirection='down'
            onSwipeComplete={changeModalVisible}
            onBackButtonPress={changeModalVisible}
            onBackdropPress={changeModalVisible} >
            <View style={styles.container} >
                <Text style={styles.title} >{title}</Text>
                <Button title='Evet' onPress={handleDelete} />
                <Button title='Hayır' onPress={changeModalVisible} />
            </View>
        </Modal>
    )
}