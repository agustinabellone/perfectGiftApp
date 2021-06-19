import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Input from 'src/components/Input'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import auth from '@react-native-firebase/auth'
import useUserContext from 'src/hooks/useUserContext'
import AwesomeAlert from 'react-native-awesome-alerts'
import Button from 'src/components/Button'
import { useTheme } from 'react-native-elements'

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Debe tener: 8 caracteres, 1 número y 1 mayúscula'
    )
    .max(50, 'Máximo 50 caracteres'),
  oldPassword: yup.string().required('Debe ingresar la contraseña actual'),
})
const ChangePassword = () => {
  const { logout } = useUserContext()
  const { theme } = useTheme()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const styles = StyleSheet.create({
    container: {
      height: '82%',
      width: '95%',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
    },
    containerInfo: {
      backgroundColor: theme.colors.secondary,
      height: 120,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      color: 'white',
      fontSize: 15,
      fontFamily: 'Roboto-Medium',
      textAlign: 'center',
      paddingLeft: 5,
      paddingRight: 5,
    },
    containerButtom: {
      display: 'flex',
      width: '60%',
      alignSelf: 'center',
    },
  })

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

  //Validar contraseña vieja
  const [errorOldPassword, setErrorOldPassword] = useState('')

  //Validar contraseña nueva
  const [errorPassword, setErrorPassword] = useState('')

  //Actualizar contraseña:
  const handlePressChangePassword = async data => {
    const email = auth().currentUser.email
    const user = auth().currentUser
    const newPassword = data.password
    const oldPassword = data.oldPassword

    const credential = auth.EmailAuthProvider.credential(email, oldPassword)

    user
      .reauthenticateWithCredential(credential)
      .then(e => {
        setErrorOldPassword('')
        user
          .updatePassword(newPassword)
          .then(function () {
            setErrorPassword('')
            reset()
            logout()
          })
          .catch(function (er) {
            console.log(er)
          })
      })
      .catch(e => {
        setErrorOldPassword(
          e.code === 'auth/wrong-password'
            ? 'Las contraseña actual es incorrecta'
            : 'Ha ocurrido un error'
        )
      })
  }

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Cambiar Contraseña</Text>
        <View style={styles.containerInfo}>
          <Text style={styles.info}>
            ¿No estas cómodo con la contraseña actual? Vas a poder cambiarla por
            una mas segura. Después de guardar los cambios tendras que iniciar
            sesión de vuelta.
          </Text>
        </View>
        <View>
          <Input
            errorStyle={{ color: 'red' }}
            containerStyle={{
              marginBottom: 35,
            }}
            placeholder='Contraseña actual'
            errorMessage={
              errors.oldPassword?.message
                ? errors.oldPassword?.message
                : errorOldPassword
            }
            control={control}
            name='oldPassword'
            icon={{ name: 'lock', position: 'center' }}
            style={{ fontFamily: 'Roboto-Regular', marginLeft: 5 }}
          />
          <Input
            errorStyle={{ color: 'red' }}
            placeholder='Contraseña nueva'
            errorMessage={
              errors.password?.message
                ? errors.password?.message
                : errorPassword
            }
            control={control}
            containerStyle={{
              marginBottom: 35,
            }}
            name='password'
            icon={{ name: 'lock', position: 'center' }}
            style={{ fontFamily: 'Roboto-Regular', marginLeft: 5 }}
          />
        </View>
        <View style={styles.containerButtom}>
          <Button
            color='green'
            onPress={handleSubmit(showAlertSaveChanges)}
            title='Guardar Cambios'
            fontSizeProp
          />
        </View>
      </View>
      <Footer />
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
        show={alertVisibilitySaveChanges}
        showProgress={false}
        title='Guardar cambios'
        message='Vamos a actualizar tu contraseña ¿Estas seguro/a?'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        showCancelButton={true}
        confirmText='Si'
        cancelText='No'
        confirmButtonColor='#0D6115'
        cancelButtonColor='#C22F00'
        onConfirmPressed={handleSubmit(handlePressChangePassword)}
        onCancelPressed={() => {
          hideAlertSaveChanges()
        }}
      />
    </View>
  )
}

export default ChangePassword
