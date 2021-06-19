import React, { useEffect, useState } from 'react'
import { useTheme, Text } from 'react-native-elements'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'
import ImagePicker from 'react-native-image-crop-picker'
import moment from 'moment'
import Footer from 'src/components/Footer'
import useUserContext from 'src/hooks/useUserContext'
import AwesomeAlert from 'react-native-awesome-alerts'
import api from 'src/services/apiUsers'
import useApiCall from 'src/hooks/useApiCall'
import storage from '@react-native-firebase/storage'
import { ActivityIndicator } from 'react-native'

const Profile = ({ navigation }) => {
  const { logout } = useUserContext()

  //Obtener Datos del Usuario:
  const email = auth().currentUser.email

  const [data, loading] = useApiCall(
    api.getUserByEmail,
    auth().currentUser.email
  )

  //Para obtener la imagen de perfil:
  const [image, setImage] = useState(null)

  const [uploadingImage, isUploadingImage] = useState(false)

  useEffect(() => {
    if (loading || data === null) return
    setImage(data[0].userImage)
  }, [loading, data])

  //Elegir foto de perfil
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      // eslint-disable-next-line no-shadow
      .then(image => {
        // setImage(image.path)
        saveImage(image.path)
      })
      .catch(e => console.log(e))
  }

  //Guardar foto de perfil
  const saveImage = path => {
    isUploadingImage(true)
    const extension = path.substring(path.lastIndexOf('.') + 1)
    const ref = storage().ref(`Profiles/${email}.${extension}`)
    ref
      .putFile(path)
      .then(() =>
        ref.getDownloadURL().then(url => {
          api.updateProfileImage(email, url).then(() => {
            isUploadingImage(false)
            setImage(url)
          })
        })
      )
      .catch(err => {
        console.log(err)
        isUploadingImage(false)
      })
  }

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

  //Estilos

  const { theme } = useTheme()
  const styles = StyleSheet.create({
    container: {
      height: '92%',
    },
    profile: {
      backgroundColor: theme.colors.primary,
      height: '55%',
      width: '100%',
      textAlign: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerImage: {
      width: '50%',
    },
    containerData: {
      width: '50%',
    },
    image: {
      height: '100%',
    },
    containerCameraIcon: {
      position: 'absolute',
      zIndex: 1,
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '80%',
      alignItems: 'center',
    },
    backgroundCameraIcon: {
      backgroundColor: '#424642',
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    iconOptions: {
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'flex-end',
      width: 120,
      justifyContent: 'space-evenly',
      marginBottom: 20,
    },
    userName: {
      textAlign: 'center',
      fontSize: 24,
      fontFamily: 'Roboto-Bold',
      textTransform: 'uppercase',
      color: 'white',
    },

    containerTextIcon: {
      width: '80%',
      marginTop: 15,
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
      height: '45%',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 5,
      paddingBottom: 5,
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
    containerOption: {
      height: '25%',
      width: '100%',
      backgroundColor: theme.colors.secondary,
    },
    textOption: {
      color: 'white',
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
    },
  })

  const loadingStyles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 3,
      backgroundColor: 'black',
      opacity: 0.7,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  if (loading || data === null) return null
  const user = data[0]
  return (
    <SafeAreaView>
      {uploadingImage && (
        <View style={loadingStyles.container}>
          <ActivityIndicator size='large' color={theme.colors.secondary} />
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.containerCameraIcon}>
            <TouchableOpacity
              onPress={choosePhotoFromLibrary}
              style={styles.backgroundCameraIcon}>
              <Icon name='camera' size={20} color='white' />
            </TouchableOpacity>
          </View>
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
          </View>
          <View style={styles.containerData}>
            <View style={styles.iconOptions}>
              <TouchableOpacity
                onPress={() => navigation.push('Configuration')}>
                <Icon name='cog' size={28} color='white' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showAlertSignOut()}>
                <Icon name='sign-out-alt' size={28} color='white' />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userName}>{user.surname}</Text>
            </View>
            <View style={styles.containerTextIcon}>
              <Icon
                name='birthday-cake'
                size={15}
                color={theme.colors.secondary}
              />
              <Text style={styles.userText}>{user.birthday}</Text>
            </View>
            <View style={styles.containerTextIcon}>
              <Icon name='id-card' size={15} color={theme.colors.secondary} />
              <Text style={styles.userText}>
                {moment().diff(moment(user.birthday, 'DD/MM/YYYY'), 'years')}{' '}
                años
              </Text>
            </View>
            <View style={styles.containerTextIcon}>
              <Icon name='envelope' size={15} color={theme.colors.secondary} />
              <Text style={styles.userText}>{user.email} </Text>
            </View>
            <View style={styles.containerTextIcon}>
              <Icon name='heart' size={15} color={theme.colors.secondary} />
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
            onPress={() => navigation.push('Wishes')}
            style={styles.containerOption}>
            <View style={styles.option}>
              <Icon name='list' size={40} color='white' />
              <Text style={styles.textOption}>LISTA DE DESEOS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('Likes')}
            style={styles.containerOption}>
            <View style={styles.option}>
              <Icon name='heart' size={40} color='white' />
              <Text style={styles.textOption}>GUSTOS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('Measures')}
            style={styles.containerOption}>
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
      <Footer />
    </SafeAreaView>
  )
}

export default Profile
