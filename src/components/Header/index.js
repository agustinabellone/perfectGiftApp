import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from 'src/theme'
import { useNavigation } from '@react-navigation/native'
import AwesomeAlert from 'react-native-awesome-alerts'
import useUserContext from 'src/hooks/useUserContext'

const Header = () => {
  const navigation = useNavigation()
  const { logout } = useUserContext()
  const [image, setImage] = useState(image)
  const email = auth().currentUser.email
  const [text, setText] = useState('')

  //Estados de los displays
  const [displayInput, setDisplayInput] = useState('none')
  const [displayIcons, setDisplayIcons] = useState('flex')

  const searchFriend = () => {
    setDisplayIcons('none')
    setDisplayInput('flex')
  }

  const changeDisplays = () => {
    setDisplayIcons('flex')
    setDisplayInput('none')
    Keyboard.dismiss()
  }

  //Obtener imagen del Header
  firestore()
    .collection('Users')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        if (email === documentSnapshot.data().email) {
          setImage(documentSnapshot.data().userImage)
        }
      })
    })

  const styles = StyleSheet.create({
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 60,
    },
    headerContainer: {
      width: '100%',
      height: '10%',
      backgroundColor: theme.colors.primary,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 10,
    },
    containerTextInput: {
      display: displayInput,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      alignItems: 'center',
      width: '85%',
      borderRadius: 5,
      paddingLeft: 10,
      paddingRight: 15,
    },
    icons: {
      display: displayIcons,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: 130,
      paddingBottom: 3,
    },
    containerIcons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 55,
    },
  })

  //Alert Cerrar Sesion:
  const [alertVisibilitySignOut, setAlertVisibilitySignOut] = useState(false)

  const showAlertSignOut = () => {
    setAlertVisibilitySignOut(true)
  }

  const hideAlertSignOut = () => {
    setAlertVisibilitySignOut(false)
  }

  //Cerrar Sesion
  const signOut = async () => {
    try {
      await auth().signOut()
      logout()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.push('Profile')}>
        <Image
          style={styles.profileImage}
          source={{
            uri: image,
          }}
        />
      </TouchableOpacity>
      <View style={styles.containerTextInput}>
        <TextInput
          placeholder='Buscar usuario...'
          value={text}
          onChangeText={v => setText(v)}
        />
        <View style={styles.containerIcons}>
          <TouchableOpacity
            onPress={
              text === ''
                ? null
                : () => navigation.push('FriendsResult', text.toUpperCase())
            }>
            <Icon
              name='search'
              size={20}
              color={theme.colors.red}
              style={{ paddingTop: 2 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeDisplays}>
            <Icon name='times' size={24} color={theme.colors.red} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={searchFriend}>
          <Icon name='search' size={20} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Notifications')}>
          <Icon name='bell' size={22} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showAlertSignOut()}>
          <Icon name='sign-out-alt' size={26} color='white' />
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        titleStyle={{
          color: theme.colors.primary,
          fontSize: 20,
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
        }}
        messageStyle={{
          color: theme.colors.primary,
          textAlign: 'center',
          fontSize: 15,
        }}
        show={alertVisibilitySignOut}
        showProgress={false}
        title='Cerrar Sesion'
        message='Vamos a cerrar la sesión ¿Estas seguro/a?'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        showCancelButton={true}
        confirmText='Si'
        cancelText='No'
        confirmButtonColor='#0D6115'
        cancelButtonColor='#C22F00'
        onConfirmPressed={() => {
          signOut()
        }}
        onCancelPressed={() => {
          hideAlertSignOut()
        }}
      />
    </View>
  )
}

export default Header
