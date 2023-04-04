// Convert error code to string
export default function (errorCode) {
    switch (errorCode) {
        case 'auth/email-already-exists':
            return 'Kayıtlı kullanıcı.'
        case 'auth/invalid-email':
            return 'Geçersiz e-posta.'
        case 'auth/invalid-password':
            return 'Geçersiz şifre.'
        case 'auth/user-not-found':
            return 'Kullanıcı bulunmadı.'
        case 'auth/wrong-password':
            return 'Hatalı şifre.'
        default:
            return errorCode
    }
}