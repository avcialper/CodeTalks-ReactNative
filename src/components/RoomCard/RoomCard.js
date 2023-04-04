import React from 'react'
import { Pressable, Text } from 'react-native'

// Custom component
import DeleteModal from '../modal/DeleteModal'

// Components styles
import styles from './RoomCard.styles'

export default ({ detail, username, handlePress, deleteRoom }) => {

    // States
    const [isOwner, setIsOwner] = React.useState(detail.owner === username ? true : false)
    const [deleteModalVisible, setDeleteModalVisble] = React.useState(false)

    // Change modal visible
    const changeModalVisible = () => setDeleteModalVisble(!deleteModalVisible)

    // Handle selected room to delete
    const handleSelectedRoom = () => {
        deleteRoom(detail)
        changeModalVisible()
    }

    return (
        <Pressable style={styles.container} onPress={handlePress} onLongPress={changeModalVisible} >
            <Text style={styles.owner} >{detail.owner}</Text>
            <Text style={styles.title} >{detail.roomName}</Text>
            {   // Authorize deletion if the owner of the room
                isOwner &&
                <DeleteModal
                    changeModalVisible={changeModalVisible}
                    isVisible={deleteModalVisible}
                    handleDelete={handleSelectedRoom}
                    title={`"${detail.roomName}" odası silinsin mi?`} />
            }
        </Pressable>
    )
}