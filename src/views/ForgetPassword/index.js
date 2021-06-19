import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Button from 'src/components/Button'
import { useTheme, Text } from 'react-native-elements'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'
import AwesomeAlert from 'react-native-awesome-alerts'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('El email es obligatorio')
    .max(50, 'Máximo 50 caracteres'),
})

const ForgetPassword = ({ navigation }) => {
  const { theme } = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  //Alert Email Enviado:
  const [alertSendEmail, setAlertSendEmail] = useState(false)

  const showAlertSendEmail = () => {
    setAlertSendEmail(true)
  }

  const hideAlertSendEmail = () => {
    setAlertSendEmail(false)
  }

  //Olvido de contraseña
  const forgetPassword = async data => {
    const email = data.email
    auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        showAlertSendEmail()
      })
      .catch(function (e) {
        console.log(e)
      })
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      height: '100%',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 15,
      justifyContent: 'space-evenly',
    },
    title: {
      marginTop: 50,
    },
    action: {
      fontFamily: 'Roboto-Medium',
      margin: 15,
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.secondary,
    },
    backgroundText: {
      width: '100%',
      height: 180,
      marginTop: 30,
      marginBottom: 50,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Roboto-Medium',
      width: 220,
    },
  })

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        h2
        h2Style={{
          textAlign: 'center',
          fontSize: 30,
          marginRight: 10,
          color: theme.colors.white,
        }}>
        ¿OLVIDASTE LA CONTRASEÑA?
      </Text>
      <View style={styles.backgroundText}>
        <Text style={styles.text}>
          ¡No hay drama! Introducí el email de la cuenta y en unos minutos
          recibiras un correo para generar una contraseña nueva.
        </Text>
        <Icon name='key' size={60} color='orange' />
      </View>
      <Input
        placeholder='Email'
        errorMessage={errors.email?.message}
        containerStyle={{ marginBottom: 50 }}
        icon={{ name: 'envelope' }}
        control={control}
        name='email'
        style={{ fontFamily: 'Roboto-Regular', marginLeft: 5 }}
      />
      <View>
        <Button
          color='secondary'
          onPress={handleSubmit(forgetPassword)}
          title='Enviar Email'
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.action}>Volver</Text>
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
        show={alertSendEmail}
        showProgress={false}
        title='Olvido de Contraseña'
        message='Te hemos enviado un correo con un link para restablecer la contraseña'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText='Ok'
        confirmButtonColor='#0D6115'
        onConfirmPressed={() => {
          hideAlertSendEmail()
          //Yendo al Login:
          navigation.navigate('Login')
        }}
      />
    </View>
  )
}

export default ForgetPassword
