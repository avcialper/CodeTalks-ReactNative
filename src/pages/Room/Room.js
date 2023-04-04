import React from 'react'
import { View, FlatList } from 'react-native'

// Firestore package
import firestore from '@react-native-firebase/firestore'
// Auth package
import { firebase } from '@react-native-firebase/auth'

// Custom components
import MessageCard from '../../components/MessageCard'
import CircleButton from '../../components/CircleButton'
import Input from '../../components/Input'
import ShowFlashMessage from '../../components/ShowFlashMessage/ShowFlashMessage'

// To sort the list
import { oldToNew } from '../../utils/sort'

// Components styles
import styles from './Rooms.styles'

export default ({ route }) => {

    // Params
    const { id, username } = route.params

    // States
    const [messageList, setMessageList] = React.useState()
    const [message, setMessage] = React.useState('')

    // Flatlist reference
    const flatListRef = React.useRef(null)

    // Go to end of the list
    const goToEnd = () => flatListRef.current.scrollToEnd()

    // Fetch messages
    React.useEffect(() => {
        const subscriber = firestore().collection('rooms').doc(id).onSnapshot(snapshot => {
            const list = snapshot.data().messages
            setMessageList(oldToNew(list))
            goToEnd()
        })
        return () => subscriber()
    }, [])

    // Add a new message
    const handleMessage = () => {
        if (message.trim() !== '') {
            firestore().collection('rooms').doc(id).update({
                messages: firestore.FieldValue.arrayUnion({
                    messageTxt: message,
                    messageOwner: username,
                    messageDate: new Date().toISOString()
                })
            })
            setMessage('')
        }
    }

    // Delete a selected messages
    const deleteMessage = (item) => {
        firestore().collection('rooms').doc(id).update({
            messages: firebase.firestore.FieldValue.arrayRemove(item)
        })
        ShowFlashMessage('Mesaj silindi.')
    }

    // Render message cards
    const renderMessageCards = ({ item }) => <MessageCard username={username} detail={item} deleteMessage={deleteMessage} />

    return (
        <View style={styles.container} >
            <FlatList
                data={messageList}
                renderItem={renderMessageCards}
                style={styles.list}
                ref={flatListRef} />
            <View style={styles.sendArea} >
                <View style={styles.input} >
                    <Input
                        onChangeText={setMessage}
                        placeholder='Mesaj'
                        value={message}
                        isMultiline={true} />
                </View>
                <CircleButton iconName='send' onPress={handleMessage} />
            </View>
        </View>
    )
}