import React from 'react'
import { useColorScheme } from 'react-native'

// Navigation package
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
// Stack navigation package
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Auth package
import auth from '@react-native-firebase/auth'
// Icon package
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// FlashMessage package
import FlashMessage from 'react-native-flash-message'

// Pages
import Login from './pages/auth/Login'
import Sign from './pages/auth/SignIn'
import Home from './pages/Home'
import Room from './pages/Room'

// App colors
import colors from './colors/colors'

// Create a stack for pages
const Stack = createNativeStackNavigator()

export default () => {

  // State
  const [userSession, setUserSession] = React.useState();

  // Check token. Automatically login if we have token
  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user)
    })
  }, [])

  // Take phone theme
  const phoneTheme = useColorScheme()

  // Custom dark theme
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      card: 'black',
      text: colors.mainColor
    }
  }

  // Custom light theme
  const MyDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      card: '#f1f1f1',
      background: '#f1f1f1',
      text: colors.mainColor
    }
  }

  // Auth pages stack
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginPage' component={Login} />
        <Stack.Screen name='SignPage' component={Sign} />
      </Stack.Navigator>
    )
  }

  // App pages stack
  const MainStack = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
        headerTitleAlign: 'center'
      }} >
        <Stack.Screen name='HomePage' component={Home} options={{
          title: 'CodeTalks',
          headerRight: () => (
            <Icon name='logout' size={30} color={colors.mainColor} onPress={() => auth().signOut()} />
          )
        }} />
        <Stack.Screen name='RoomPage' component={Room} options={({ route }) => ({ title: route.params.roomName })} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer theme={phoneTheme === 'dark' ? MyDarkTheme : MyDefaultTheme} >
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {
          userSession ?
            <Stack.Screen name='MainStack' component={MainStack} /> :
            <Stack.Screen name='AuthStack' component={AuthStack} />
        }
      </Stack.Navigator>
      <FlashMessage position='top' />
    </NavigationContainer>
  )
}