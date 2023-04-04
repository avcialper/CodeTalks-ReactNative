import React from 'react'
import { View, FlatList } from 'react-native'

// Auth package
import auth from '@react-native-firebase/auth'
// Firestore package
import firestore from '@react-native-firebase/firestore'

// Custom components
import FloatingButton from '../../components/FloatingButton'
import CreateRoomModal from '../../components/modal/CreateRoomModal'
import RoomCard from '../../components/RoomCard'
import ShowFlashMessage from '../../components/ShowFlashMessage/ShowFlashMessage'

// To sort the list
import { newToOld } from '../../utils/sort'

// Components styles
import styles from './Home.styles'

export default ({ navigation }) => {

    // States
    const [createModalVisible, setCreateModalVisible] = React.useState(false)
    const [roomList, setRoomList] = React.useState([])
    const username = auth().currentUser.email.split('@')[0]

    // Fetch rooms
    React.useEffect(() => {
        const subscriber = firestore().collection('rooms').onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(documnentSnapshot => {
                const data = documnentSnapshot.data()
                list.push({
                    id: documnentSnapshot.id,
                    ...data
                })
            })
            setRoomList(newToOld(list))
        })
        return () => subscriber()
    }, [])

    // Create a new room
    const createRoom = (roomName) => {
        const roomObj = {
            roomName: roomName,
            owner: username,
            date: new Date().toISOString(),
            messages: []
        }
        firestore().collection('rooms').add(roomObj)
        setCreateModalVisible(!createModalVisible)
        ShowFlashMessage(`"${roomName}" oluşturuldu.`)
    }

    // Delete a selected room
    const deleteRoom = (detail) => {
        firestore().collection('rooms').doc(detail.id).delete()
        ShowFlashMessage(`"${detail.roomName}" silindi.`)
    }

    // Change modal visible
    const changeModalVisible = () => setCreateModalVisible(!createModalVisible)

    // Handle wanted room
    const handleRoom = (item) => navigation.navigate('RoomPage', { id: item.id, username, roomName: item.roomName })

    // Render room cards
    const renderRoom = ({ item }) => <RoomCard
        detail={item}
        username={username}
        deleteRoom={deleteRoom}
        handlePress={() => handleRoom(item)} />

    return (
        <View style={styles.container} >
            <FlatList data={roomList} renderItem={renderRoom} />
            <FloatingButton name='plus' onPress={changeModalVisible} />
            <CreateRoomModal isVisible={createModalVisible} onClose={changeModalVisible} createRoom={createRoom} />
        </View>
    )
}