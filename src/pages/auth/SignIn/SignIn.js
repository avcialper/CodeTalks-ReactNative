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
import styles from './SignIn.styles'

// Initial sign in values
const initialFormikValues = {
    usermail: '',
    password: '',
    repassword: ''
}

export default () => {

    // State
    const [signLoading, setSignLoading] = React.useState(false)

    // Handle sign in request
    const handleSignIn = async (formValues) => {
        if (formValues.usermail === '' || formValues.password === '' || formValues.repassword == '')
            ShowFlashMessage('Alanları doldurunuz.')
        else if (formValues.password !== formValues.repassword)
            ShowFlashMessage('Şifreler uyuşmamaktadır.')
        else {
            setSignLoading(true)
            try {
                await auth().createUserWithEmailAndPassword(formValues.usermail, formValues.password)
                ShowFlashMessage('Kullanıcı oluşturuldu.')
                setSignLoading(false)
            } catch (error) {
                ShowFlashMessage(authErrors(error.code))
                setSignLoading(false)
            }
        }
    }

    return (
        <ScrollView>
            <Image source={require('../../../assets/cmd.png')} style={styles.image} />
            <Formik initialValues={initialFormikValues} onSubmit={handleSignIn} >
                {({ values, handleSubmit, handleChange }) => (
                    <>
                        <Input
                            placeholder='E-posta'
                            primaryIcon='account'
                            onChangeText={handleChange('usermail')}
                            value={values.usermail} />
                        <Input
                            placeholder='Şifre'
                            primaryIcon='eye-off'
                            secondaryIcon='eye'
                            onChangeText={handleChange('password')}
                            value={values.password}
                            isSecure={true}
                            changeableIcon={true} />
                        <Input
                            placeholder='Şifre tekrarı'
                            primaryIcon='eye-off'
                            secondaryIcon='eye'
                            onChangeText={handleChange('repassword')}
                            value={values.repassword}
                            isSecure={true}
                            changeableIcon={true} />
                        <Button
                            onPress={handleSubmit}
                            title='Onayla'
                            loading={signLoading} />
                    </>
                )}
            </Formik>
        </ScrollView>
    )
}