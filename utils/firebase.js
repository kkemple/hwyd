/* @flow */
import firebase from 'firebase';

export const googleLogin = () => (
    // $FlowFixMe
    Expo.Google.logInAsync({
        androidClientId: '758299686169-44qfu6fgi3krcbpm64rn6fr7hbaaa5oh.apps.googleusercontent.com',
        iosClientId: '758299686169-4d20c1h6lqb0qlc0goc23pc041jp8k8v.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
    })
)

export const loginCreditial = (credential: string) => (
    firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
    })
)

export const facebookLogin = () => (
    // $FlowFixMe
    Expo.Facebook.logInWithReadPermissionsAsync(
        '663497617374761',
        { permissions: ['public_profile'] }
    )
)
