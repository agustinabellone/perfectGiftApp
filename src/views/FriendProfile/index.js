import React, { useEffect, useState, useRef } from 'react'
import { useTheme, Text } from 'react-native-elements'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import Footer from 'src/components/Footer'
import { useNavigation } from '@react-navigation/native'
import Header from 'src/components/Header'
import auth from '@react-native-firebase/auth'
import api from 'src/services/apiFriends'
import apiNotifications from 'src/services/apiNotifications'
import Menu, { MenuItem } from 'react-native-material-menu'
import useApiCall from 'src/hooks/useApiCall'
import AwesomeAlert from 'react-native-awesome-alerts'
import firestore from '@react-native-firebase/firestore'

const ProfileFriend = userProps => {
  const navigation = useNavigation()

  //Perfil actual
  const user = userProps.route.params
  const userFullName = user.fullName

  //Usuario que ingreso a la app
  const currentUserEmail = auth().currentUser.email

  const [repeatRequest, setRepeatRequest] = useState(false)

  //Enviar solicitud de amistad
  const sendFriendRequest = async () => {
    const res = await api.getUserByEmail(currentUserEmail)
    const currentUserId = res.data[0].id

    //Verificar si ya se mando una solicitud
    const resSend = await apiNotifications.getSendRequests(
      currentUserId,
      user.id
    )

    const total = resSend.data

    if (total.length < 1) {
      firestore()
        .collection('Notifications')
        .add({
          userSend: currentUserId,
          userReceive: user.id,
        })
        .then(() => {
          showAlertRequestSent()
          hideAlertSendFriendRequest()
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      setRepeatRequest(true)
      showAlertRequestSent()
    }
    hideAlertSendFriendRequest()
  }

  //Eliminar fecha del calendario al eliminar amigo (en ambos perfiles)
  const deleteDate = async (currentUserId, userId, currentUserFullName) => {
    //Calendario del usuario actual
    const currentUserData = await firestore()
      .collection('Users')
      .doc(currentUserId)
      .get()
    const currentUserCalendar = currentUserData.data().calendar

    //Calendario del usuario del perfil
    const userData = await firestore()
      .collection('Users')
      .doc(currentUserId)
      .get()
    const userCalendar = userData.data().calendar

    currentUserCalendar.map(item => {
      if (item.name === userFullName) {
        firestore()
          .collection('Users')
          .doc(currentUserId)
          .update('calendar', firestore.FieldValue.arrayRemove(item))
      }
    })

    userCalendar.map(item => {
      if (item.name === currentUserFullName) {
        firestore()
          .collection('Users')
          .doc(userId)
          .update('calendar', firestore.FieldValue.arrayRemove(item))
      }
    })
  }

  //Eliminar amigo
  const deleteFriend = async () => {
    const res = await api.getUserByEmail(currentUserEmail)
    const currentUserId = res.data[0].id
    const currentUserFullName = res.data[0].fullName

    await api
      .deleteDocument(currentUserId, user.id)
      .then(() => {
        hideAlertDeleteFriend()
        deleteDate(currentUserId, user.id, currentUserFullName)
      })
      .catch(e => console.log(e))
    navigation.push('Friends')
  }

  //Alert Eliminar Amigo:
  const [
    alertVisibilityDeleteFriend,
    setAlertVisibilityDeleteFriend,
  ] = useState(false)

  const showAlertDeleteFriend = () => {
    setAlertVisibilityDeleteFriend(true)
    hideMenu()
  }

  const hideAlertDeleteFriend = () => {
    setAlertVisibilityDeleteFriend(false)
  }

  //Alert Enviar Solicitud:
  const [
    alertVisibilitySendFriendRequest,
    setAlertVisibilitySendFriendRequest,
  ] = useState(false)

  const showAlertSendFriendRequest = () => {
    setAlertVisibilitySendFriendRequest(true)
    hideMenu()
  }

  const hideAlertSendFriendRequest = () => {
    setAlertVisibilitySendFriendRequest(false)
  }

  //Alert Solicitud Enviada:
  const [alertVisibilityRequestSent, setAlertVisibilityRequestSent] = useState(
    false
  )

  const showAlertRequestSent = () => {
    setAlertVisibilityRequestSent(true)
    hideMenu()
  }

  const hideAlertRequestSent = () => {
    setAlertVisibilityRequestSent(false)
  }

  //Estado que maneja si es amigo o no
  const [isFriend, setIsFriend] = useState(true)

  const [response, loading] = useApiCall(api.areTheyFriends, {
    email: currentUserEmail,
    friendId: user.id,
  })

  useEffect(() => {
    if (loading || response === null) return
    setIsFriend(response)
  }, [loading, response])

  //Menu
  const menu = useRef()

  const hideMenu = () => menu.current.hide()

  const showMenu = () => menu.current.show()

  //Sacar signo del zodiaco:
  const getZodiacSign = (sDay, sMonth) => {
    const day = Number(sDay)
    const month = Number(sMonth)
    if ((month === 1 && day <= 20) || (month === 12 && day >= 22)) {
      return 'Capricornio'
    } else if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
      return 'Acuario'
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return 'Piscis'
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
      return 'Aries'
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
      return 'Tauro'
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return 'Geminis'
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return 'Cancer'
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) {
      return 'Leo'
    } else if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) {
      return 'Virgo'
    } else if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) {
      return 'Libra'
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
      return 'Escorpio'
    } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
      return 'Sagitario'
    }
  }

  //Estilos
  const { theme } = useTheme()
  const styles = StyleSheet.create({
    container: {
      height: '82%',
    },
    loading: {
      fontSize: 25,
      textAlign: 'center',
      fontFamily: 'Roboto-Medium',
      marginTop: 30,
      color: theme.colors.primary,
    },
    profile: {
      backgroundColor: theme.colors.primary,
      height: '50%',
      width: '100%',
      textAlign: 'center',
      flexDirection: 'row',
    },
    containerImage: {
      width: '50%',
    },
    containerData: { width: '50%' },
    image: {
      height: '100%',
    },
    userName: {
      textAlign: 'center',
      fontSize: 24,
      fontFamily: 'Roboto-Medium',
      textTransform: 'uppercase',
      color: 'white',
    },
    containerTextIcon: {
      width: '80%',
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userText: {
      color: 'white',
      fontSize: 11,
      fontFamily: 'Roboto-Medium',
      paddingLeft: 10,
    },
    options: {
      height: '50%',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    option: {
      display: 'flex',
      height: '100%',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      paddingLeft: 35,
      paddingRight: 25,
      alignItems: 'center',
    },
    optionsIcon: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      marginTop: 10,
    },
    containerOption: {
      height: '25%',
      width: '100%',
      backgroundColor: theme.colors.secondary,
    },
    containerOptionNoFriend: {
      height: '25%',
      width: '100%',
      backgroundColor: theme.colors.inactive,
    },
    textOption: {
      color: 'white',
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
    },
  })

  return (
    <SafeAreaView>
      <Header />
      {loading ? (
        <View style={styles.container}>
          <Text style={styles.loading}>Cargando...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: user.userImage,
                }}
              />
            </View>
            <View style={styles.containerData}>
              <View style={styles.optionsIcon}>
                <Menu
                  ref={menu}
                  button={
                    <TouchableOpacity
                      onPress={showMenu}
                      style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name='ellipsis-v' size={30} color='white' />
                    </TouchableOpacity>
                  }>
                  <MenuItem
                    style={{ width: 150 }}
                    onPress={
                      isFriend
                        ? () => showAlertDeleteFriend()
                        : () => showAlertSendFriendRequest()
                    }>
                    {isFriend ? 'Eliminar Amigo' : 'Agregar Amigo'}
                  </MenuItem>
                </Menu>
              </View>
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userName}>{user.surname}</Text>
              </View>
              <View style={styles.containerTextIcon}>
                <Icon
                  name='birthday-cake'
                  size={15}
                  style={{ paddingTop: 2 }}
                  color={theme.colors.secondary}
                />
                <Text style={styles.userText}>{user.birthday}</Text>
              </View>
              <View style={styles.containerTextIcon}>
                <Icon
                  name='id-card'
                  size={15}
                  style={{ paddingTop: 2 }}
                  color={theme.colors.secondary}
                />
                <Text style={styles.userText}>
                  {moment().diff(moment(user.birthday, 'DD/MM/YYYY'), 'years')}{' '}
                  años
                </Text>
              </View>
              <View style={styles.containerTextIcon}>
                <Icon
                  name='envelope'
                  size={15}
                  color={theme.colors.secondary}
                />
                <Text style={styles.userText}>{user.email}</Text>
              </View>
              <View style={styles.containerTextIcon}>
                <Icon
                  name='id-badge'
                  size={15}
                  style={{ paddingTop: 2 }}
                  color={theme.colors.secondary}
                />
                <Text style={styles.userText}>
                  {getZodiacSign(
                    moment(user.birthday, 'DD/MM/YYYY').format('D'),
                    moment(user.birthday, 'DD/MM/YYYY').format('M')
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              onPress={() =>
                isFriend ? navigation.push('FriendWishes', user) : null
              }
              style={
                isFriend
                  ? styles.containerOption
                  : styles.containerOptionNoFriend
              }>
              <View style={styles.option}>
                <Icon name='list' size={40} color='white' />
                <Text style={styles.textOption}>LISTA DE DESEOS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                isFriend ? navigation.push('FriendLikes', user) : null
              }
              style={
                isFriend
                  ? styles.containerOption
                  : styles.containerOptionNoFriend
              }>
              <View style={styles.option}>
                <Icon name='heart' size={40} color='white' />
                <Text style={styles.textOption}>GUSTOS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                isFriend ? navigation.push('FriendMeasures', user) : null
              }
              style={
                isFriend
                  ? styles.containerOption
                  : styles.containerOptionNoFriend
              }>
              <View style={styles.option}>
                <Icon
                  name='child'
                  size={40}
                  color='white'
                  style={{ paddingRight: 4 }}
                />
                <Text style={styles.textOption}>MEDIDAS</Text>
              </View>
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
            show={alertVisibilityDeleteFriend}
            showProgress={false}
            title='Eliminar Amigo'
            message='Vamos a eliminarlo/a de tu lista de amigos ¿Estas seguro/a?'
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            showCancelButton={true}
            confirmText='Si'
            cancelText='No'
            confirmButtonColor='#0D6115'
            cancelButtonColor='#C22F00'
            onConfirmPressed={deleteFriend}
            onCancelPressed={() => {
              hideAlertDeleteFriend()
            }}
          />
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
            show={alertVisibilitySendFriendRequest}
            showProgress={false}
            title='Agregar Amigo'
            message='Vamos a enviarle una solicitud de amistad ¿Estas seguro/a?'
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            showCancelButton={true}
            confirmText='Si'
            cancelText='No'
            confirmButtonColor='#0D6115'
            cancelButtonColor='#C22F00'
            onConfirmPressed={sendFriendRequest}
            onCancelPressed={() => {
              hideAlertSendFriendRequest()
            }}
          />
          <AwesomeAlert
            titleStyle={
              repeatRequest
                ? {
                    color: theme.colors.red,
                    fontFamily: 'Roboto-Medium',
                    textAlign: 'center',
                    fontSize: 20,
                  }
                : {
                    color: theme.colors.green,
                    fontFamily: 'Roboto-Medium',
                    textAlign: 'center',
                    fontSize: 20,
                  }
            }
            show={alertVisibilityRequestSent}
            showProgress={false}
            title={
              repeatRequest
                ? 'Ya has enviado una solicitud de amistad.'
                : 'Solicitud Enviada'
            }
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText='Ok'
            confirmButtonColor='#0D6115'
            onConfirmPressed={() => hideAlertRequestSent()}
          />
        </View>
      )}
      <Footer />
    </SafeAreaView>
  )
}

export default ProfileFriend
