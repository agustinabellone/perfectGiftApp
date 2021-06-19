import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import theme from 'src/theme'
import firestore from '@react-native-firebase/firestore'
import AwesomeAlert from 'react-native-awesome-alerts'
import api from 'src/services/apiNotifications'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const Notification = ({ user }) => {
  const navigation = useNavigation()

  //Usuario que ingresó a la app
  const currentUserEmail = auth().currentUser.email

  //Usuario que me envió la solicitud
  const userSend = user.userSend

  //Datos del usuario que me envió la solicitud
  const [userFullName, setUserFullName] = useState('')
  const [userImage, setUserImage] = useState(userImage)
  const [userBirthday, setUserBirthday] = useState('')
  const [userCalendar, setUserCalendar] = useState('')

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userSend)
      .get()
      .then(doc => {
        if (doc.exists) {
          setUserFullName(doc.data().fullName)
          setUserBirthday(
            moment(doc.data().birthday, 'DD/MM/YYYY').format('DD/MM')
          )
          setUserCalendar(doc.data().calendar)
          setUserImage(doc.data().userImage)
        }
      })
      .catch(e => {
        console.log(e)
      })
  })

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      height: 60,
      width: '95%',
      margin: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      backgroundColor: theme.colors.secondary,
    },
    text: {
      width: '100%',
      color: 'white',
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      paddingLeft: 10,
      paddingRight: 40,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
  })

  //Alert Guardar Cambios:
  const [alertVisibility, setAlertVisibility] = useState(false)

  const showAlert = () => {
    setAlertVisibility(true)
  }
  const hideAlert = () => {
    setAlertVisibility(false)
  }

  //Eliminar solicitud
  const deleteDocument = async (userId, otherId) => {
    await api.deleteDocument(userId, otherId)
  }

  //Rechazar solicitud
  const deleteNotification = async () => {
    const res = await api.getUserByEmail(currentUserEmail)
    const currentUserId = res.data[0].id
    hideAlert()
    deleteDocument(currentUserId, userSend)
    navigation.push('Home')
  }

  //Guardar fecha en calendario
  const saveBirthdayFriend = async res => {
    //Busco el documento del usuario
    const currentUserId = res.data[0].id
    const currentUserFullName = res.data[0].fullName
    const currentUserCalendar = res.data[0].calendar

    //Obtengo el cumpleaños del usuario actual
    const currentUserBirthday = moment(
      res.data[0].birthday,
      'DD/MM/YYYY'
    ).format('DD/MM')

    //Actualizo fechas del calendario de los dos usuarios
    return await firestore()
      .collection('Users')
      .doc(currentUserId)
      .update({
        calendar: [
          ...currentUserCalendar,
          { name: userFullName, birthday: userBirthday },
        ],
      })
      .then(function () {
        firestore()
          .collection('Users')
          .doc(userSend)
          .update({
            calendar: [
              ...userCalendar,
              { name: currentUserFullName, birthday: currentUserBirthday },
            ],
          })
          .then(function () {
            console.log('todo ok')
          })
          .catch(e => {
            console.log(e)
          })
      })
      .catch(e => {
        console.log(e)
      })
  }

  //Agregar amigo
  const addFriend = async () => {
    const res = await api.getUserByEmail(currentUserEmail)
    const currentUserId = res.data[0].id
    firestore()
      .collection('Friends')
      .add({
        user1: currentUserId,
        user2: userSend,
      })
      .then(function () {
        //Cierro el modal:
        hideAlert()
        //Elimino la notificacion:
        deleteDocument(currentUserId, userSend)
        //Agrego las fechas en el calendario de los usuarios:
        saveBirthdayFriend(res)
        //Actualizo página:
        navigation.push('Notifications')
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <View>
      <TouchableOpacity onPress={() => showAlert()} style={styles.container}>
        <Image
          style={styles.profileImage}
          source={{
            uri: userImage,
          }}
        />
        <Text style={styles.text}>
          {userFullName} te ha enviado una solicitud de amistad
        </Text>
      </TouchableOpacity>

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
        show={alertVisibility}
        showProgress={false}
        title='Solicitud de Amistad'
        message='Si la rechazas ya no te aparecerá en la lista de notificaciones.'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        showCancelButton={true}
        confirmText='Aceptarla'
        cancelText='Rechazarla'
        confirmButtonColor='#0D6115'
        cancelButtonColor='#C22F00'
        onConfirmPressed={addFriend}
        onCancelPressed={deleteNotification}
      />
    </View>
  )
}

export default Notification
