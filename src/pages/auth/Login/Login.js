import React from 'react'
import { ScrollView, Image } from 'react-native'

// Formik package
import { Formik } from 'formik'
// Auth package
import auth from '@react-native-firebase/auth'

// Custom components
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import ShowFlashMessage from '../../../components/ShowFlashMessage/ShowFlashMessage'

// The convert util
import authErrors from '../../../utils/authErrors'

// Components styles
import styles from './Login.styles'

// Initial input values
const initialFormValues = {
    usermail: '',
    password: ''
}

export default ({ navigation }) => {

    // State
    const [loginLoading, setLoginLoading] = React.useState(false)


    // Handle login request
    const handleLogin = async (formValues) => {
        if (formValues.usermail === '' || formValues.password === '')
            ShowFlashMessage('Alanları doldurunuz.')
        else {
            setLoginLoading(true)
            try {
                await auth().signInWithEmailAndPassword(formValues.usermail, formValues.password)
                setLoginLoading(false)
                navigation.navigate('MainStack')
                ShowFlashMessage('Giriş başarılı.')
            } catch (error) {
                setLoginLoading(false)
                ShowFlashMessage(authErrors(error.code))
            }
        }
    }

    // Handle sign in
    const handleSignIn = () => navigation.navigate('SignPage')

    return (
        <ScrollView>
            <Image source={require('../../../assets/cmd.png')} style={styles.image} />
            <Formik initialValues={initialFormValues} onSubmit={handleLogin} >
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <Input
                            placeholder='E-posta'
                            value={values.usermail}
                            onChangeText={handleChange('usermail')}
                            primaryIcon='account' />
                        <Input
                            placeholder='Şifre'
                            value={values.password}
                            onChangeText={handleChange('password')}
                            primaryIcon='eye-off'
                            secondaryIcon='eye'
                            isSecure={true}
                            changeableIcon={true} />
                        <Button
                            title='Giriş Yap'
                            onPress={handleSubmit}
                            loading={loginLoading} />
                    </>
                )}
            </Formik>
            <Button
                title='Kayıt Ol'
                onPress={handleSignIn} />
        </ScrollView>
    )
}