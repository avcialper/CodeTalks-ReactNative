import React from 'react'
import { View, Text, Pressable } from 'react-native'

// Date parse package
import { formatDistance, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'

// Custom component
import DeleteModal from '../modal/DeleteModal'

// Componets styles
import styles from './MessageCard.styles'

export default ({ username, detail, deleteMessage }) => {

    // States
    const [isOwner, setIsOwner] = React.useState(username === detail.messageOwner ? true : false)
    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)

    // Date formatter
    const formattedDate = formatDistance(parseISO(detail.messageDate), new Date(), {
        addSuffix: true,
        locale: tr
    })

    // Change modal visible
    const changeModalVisible = () => setDeleteModalVisible(!deleteModalVisible)

    // Handle selected message to delete
    const handleSelectedMessage = () => {
        deleteMessage(detail)
        changeModalVisible()
    }

    return (
        <Pressable onLongPress={changeModalVisible} >
            {   //Render card if list isn't empty
                !detail.messages &&
                // Disable message owner if current user is the owner of the message. And aligncthe card
                // to the right. Else enable message owner and align the card to the left
                <>
                    <View style={[styles.container, isOwner && { alignSelf: 'flex-end' }]} >
                        {!isOwner && <Text style={styles.owner}>{detail.messageOwner}</Text>}
                        <Text style={styles.message} >{detail.messageTxt}</Text>
                        <Text style={styles.date} >{formattedDate}</Text>
                    </View>
                    {   // Authorize deletion if the owner of the message
                        isOwner &&
                        <DeleteModal
                            isVisible={deleteModalVisible}
                            title='Mesaj silinsin mi?'
                            changeModalVisible={changeModalVisible}
                            handleDelete={handleSelectedMessage} />
                    }
                </>
            }
        </Pressable>
    )
}