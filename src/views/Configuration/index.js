import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from 'src/components/Button'
import moment from 'moment'
import { Input as NREInput } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import useUserContext from 'src/hooks/useUserContext'
import AwesomeAlert from 'react-native-awesome-alerts'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import theme from 'src/theme'
import { Pressable } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Controller } from 'react-hook-form'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import api from 'src/services/apiUsers'
import useApiCall from 'src/hooks/useApiCall'
import storage from '@react-native-firebase/storage'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre no puede quedar vacio')
    .max(30, 'Máximo 30 caracteres'),
  surname: yup
    .string()
    .required('El apellido no puede quedar vacio')
    .max(50, 'Máximo 50 caracteres'),
  birthday: yup
    .date()
    .required('La fecha de nacimiento no puede quedar vacia')
    .typeError('Debe ingresar una fecha válida')
    .min(new Date('1900-01-01T00:00:00'), 'Fecha inválida')
    .max(new Date(), 'Fecha inválida'),
})

const Configuration = ({ navigation }) => {
  const { logout } = useUserContext()

  //Alert Guardar Cambios:
  const [alertVisibilitySaveChanges, setAlertVisibilitySaveChanges] = useState(
    false
  )
  const showAlertSaveChanges = () => {
    setAlertVisibilitySaveChanges(true)
  }
  const hideAlertSaveChanges = () => {
    setAlertVisibilitySaveChanges(false)
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [apiData, loading] = useApiCall(
    api.getUserByEmail,
    auth().currentUser.email
  )

  useEffect(() => {
    if (apiData !== null && apiData[0] !== undefined) {
      const user = apiData[0]
      reset({
        name: user.name,
        surname: user.surname,
        email: user.email,
        birthday: moment(user.birthday, 'DD/MM/YYYY'),
      })
    }
  }, [apiData, reset])

  //Actualizar datos del usuario
  const changeUserData = data => {
    const formatted = {
      name: data.name,
      surname: data.surname,
      birthday: moment(data.birthday).format('DD/MM/YYYY'),
    }
    api
      .updateUserData(auth().currentUser.email, formatted)
      .then(res => {
        if (res.ok) {
          hideAlertSaveChanges()
          navigation.push('Profile')
        }
      })
      .catch(e => console.log(e))
  }

  //Alert Eliminar Cuenta:
  const [
    alertVisibilityDeleteAccount,
    setAlertVisibilityDeleteAccount,
  ] = useState(false)

  const showAlertDeleteAccount = () => {
    setAlertVisibilityDeleteAccount(true)
  }

  const hideAlertDeleteAccount = () => {
    setAlertVisibilityDeleteAccount(false)
  }

  //Datos Calendario:
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }
  const handleChangeDate = onChange => e => {
    onChange(e)
    hideDatePicker()
  }

  //Borrar imagen de perfil del storage
  const deleteImageFromStorage = async () => {
    const url = userImage
    const newUrl = decodeURIComponent(
      url.substring(url.indexOf('/o/') + 3, url.lastIndexOf('?'))
    )
    const ref = storage().ref(newUrl)
    await ref
      .delete()
      .then(console.log('Se ha eliminado la imagen'))
      .catch(e => console.log(e))
  }

  //Buscar Documento en Firestore y eliminarlo
  const deleteDocument = async email => {
    return firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (email === documentSnapshot.data().email) {
            firestore().collection('Users').doc(documentSnapshot.id).delete()
          }
        })
      })
  }

  //Borrar Cuenta
  const deleteAccount = async () => {
    //Elimino primero la imagen
    deleteImageFromStorage()
    const email = auth().currentUser.email
    //Despues el documento y el usuario
    deleteDocument(email)
      .then(function () {
        auth()
          .currentUser.delete()
          .then(e => logout())
          .catch(e => console.log(e))
      })
      .catch(function (e) {
        console.log(e)
      })
  }

  //Estilos
  const styles = StyleSheet.create({
    title: {
      fontSize: 35,
      textAlign: 'center',
      marginTop: 25,
      marginBottom: 25,
      fontFamily: 'Roboto-Bold',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 60,
    },
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    linkChangePassword: {
      fontFamily: 'Roboto-Medium',
      fontSize: 14,
      marginLeft: 20,
      color: theme.colors.red,
    },
  })

  if (loading || apiData === null) return null

  //Obtengo imagen de perfil
  const userImage = apiData[0].userImage

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Configuración</Text>
        <Input
          errorStyle={{ color: 'red' }}
          control={control}
          errorMessage={errors.name?.message}
          name='name'
          containerStyle={{
            marginBottom: 26,
          }}
          icon={{ name: 'user-alt' }}
        />
        <Input
          errorStyle={{ color: 'red' }}
          control={control}
          name='surname'
          containerStyle={{
            marginBottom: 26,
          }}
          errorMessage={errors.surname?.message}
          icon={{ name: 'user-alt' }}
        />
        <Input
          control={control}
          name='email'
          disabled
          containerStyle={{
            marginBottom: 26,
          }}
          icon={{ name: 'envelope' }}
        />
        <Controller
          control={control}
          name='birthday'
          defaultValue=''
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <Pressable onPress={showDatePicker} style={{ width: '100%' }}>
                  <NREInput
                    style={{ fontFamily: 'Roboto-Regular', marginLeft: 5 }}
                    errorStyle={{ color: 'white' }}
                    editable={false}
                    errorMessage={errors.birthday?.message}
                    icon={{ name: 'calendar' }}
                    onBlur={onBlur}
                    value={value ? moment(value).format('DD/MM/YYYY') : ''}
                    leftIcon={
                      <Icon
                        style={{
                          marginLeft: 10,
                        }}
                        name='calendar'
                        size={24}
                        color={theme.colors.grey2}
                      />
                    }
                    containerStyle={{
                      marginBottom: 26,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      height: 47,
                    }}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                    }}
                  />
                </Pressable>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  minimumDate={new Date('1900-01-01T00:00:00')}
                  maximumDate={new Date('2015-12-31T00:00:00')}
                  mode='date'
                  locale='es-ES'
                  onConfirm={handleChangeDate(onChange)}
                  onCancel={hideDatePicker}
                />
              </>
            )
          }}
        />
        <Text
          onPress={() => {
            navigation.push('ChangePassword')
          }}
          style={styles.linkChangePassword}>
          Quiero cambiar mi contraseña
        </Text>
        <View style={styles.buttons}>
          <View style={[{ width: '40%' }]}>
            <Button
              color='green'
              onPress={handleSubmit(showAlertSaveChanges)}
              title='Guardar Cambios'
              fontSizeProp
            />
          </View>
          <View style={[{ width: '40%' }]}>
            <Button
              color='red'
              fontSizeProp
              onPress={showAlertDeleteAccount}
              title='Eliminar Cuenta'
            />
          </View>
        </View>
        <AwesomeAlert
          titleStyle={{
            color: theme.colors.primary,
            fontSize: 20,
            fontFamily: 'Roboto-Medium',
          }}
          messageStyle={{
            color: theme.colors.primary,
            textAlign: 'center',
            fontSize: 15,
          }}
          show={alertVisibilityDeleteAccount}
          showProgress={false}
          title='Eliminar Usuario'
          message='Vamos a eliminar tu cuenta y todos tus datos ¿Estas seguro/a?'
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          showCancelButton={true}
          confirmText='Si'
          cancelText='No'
          confirmButtonColor='#0D6115'
          cancelButtonColor='#C22F00'
          onConfirmPressed={() => {
            hideAlertDeleteAccount()
            deleteAccount()
          }}
          onCancelPressed={() => {
            hideAlertDeleteAccount()
          }}
        />

        <AwesomeAlert
          titleStyle={{
            color: theme.colors.primary,
            fontSize: 20,
            fontFamily: 'Roboto-Medium',
          }}
          messageStyle={{
            color: theme.colors.primary,
            textAlign: 'center',
            fontSize: 15,
          }}
          show={alertVisibilitySaveChanges}
          showProgress={false}
          title='Guardar cambios'
          message='Vamos a actualizar tus datos personales ¿Estas seguro/a?'
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          showCancelButton={true}
          confirmText='Si'
          cancelText='No'
          confirmButtonColor='#0D6115'
          cancelButtonColor='#C22F00'
          onConfirmPressed={handleSubmit(changeUserData)}
          onCancelPressed={() => {
            hideAlertSaveChanges()
          }}
        />
      </View>
      <Footer />
    </View>
  )
}

export default Configuration
