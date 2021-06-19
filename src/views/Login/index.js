import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import useUserContext from 'src/hooks/useUserContext'
import Button from 'src/components/Button'
import { useTheme, Text } from 'react-native-elements'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth'
import AwesomeAlert from 'react-native-awesome-alerts'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('El email es obligatorio')
    .max(50, 'Máximo 50 caracteres'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .max(50, 'Máximo 50 caracteres'),
})

const Login = ({ navigation }) => {
  //Alert EmailNotValidated:
  const [alertEmailNotValidated, setAlertEmailNotValidated] = useState(false)

  const showAlertEmailNotValidated = () => {
    setAlertEmailNotValidated(true)
  }

  const hideAlertEmailNotValidated = () => {
    setAlertEmailNotValidated(false)
  }

  const [notFoundEmail, setNotFoundEmail] = useState('')
  const [wrongPassword, setWrongPassword] = useState('')
  const [wrongEmail, setWrongEmail] = useState('')

  const { login } = useUserContext()
  const { theme } = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  //Login
  const signIn = async data => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(e => {
        if (auth().currentUser.emailVerified) {
          login()
        } else {
          auth().currentUser.sendEmailVerification()
          showAlertEmailNotValidated()
        }
      })
      .catch(e => {
        const errorCode = e.code
        console.log(errorCode)
        if (errorCode === 'auth/user-not-found') {
          setNotFoundEmail('Usuario no encontrado')
        } else {
          setNotFoundEmail('')
        }
        if (errorCode === 'auth/wrong-password') {
          setWrongPassword('Contraseña incorrecta')
        } else {
          setWrongPassword('')
        }
        if (errorCode === 'auth/invalid-email') {
          setWrongEmail('El email es incorrecto o está mal escrito')
        } else {
          setWrongEmail('')
        }
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
      justifyContent: 'center',
    },
    button: {
      marginBottom: 30,
    },
    title: {
      marginBottom: 40,
      marginTop: 80,
    },
    question: {
      color: 'white',
      fontFamily: 'Roboto-Medium',
      margin: 15,
      fontSize: 14,
    },
    action: {
      fontFamily: 'Roboto-Medium',
      margin: 15,
      fontSize: 14,
      color: theme.colors.secondary,
    },
  })

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        h2
        h2Style={{ fontSize: 35, color: theme.colors.white }}>
        INICIAR SESIÓN
      </Text>
      <Input
        placeholder='Email'
        errorMessage={
          errors.email?.message
            ? errors.email?.message
            : wrongEmail
            ? wrongEmail
            : notFoundEmail
        }
        containerStyle={{ marginBottom: 50 }}
        icon={{ name: 'envelope' }}
        control={control}
        name='email'
      />
      <Input
        placeholder='Contraseña'
        errorMessage={
          errors.password?.message ? errors.password?.message : wrongPassword
        }
        containerStyle={{
          marginBottom: 50,
        }}
        icon={{ name: 'lock', position: 'center' }}
        control={control}
        name='password'
      />
      <Button
        containerStyle={styles.button}
        color='secondary'
        onPress={handleSubmit(signIn)}
        title='Ingresar'
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.question}>
          ¿Olvidó la contraseña?
          <Text style={styles.action}> Ingrese aquí </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.question}>
          ¿No tiene una cuenta?
          <Text style={styles.action}> Registrese aquí</Text>
        </Text>
      </TouchableOpacity>
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
        show={alertEmailNotValidated}
        showProgress={false}
        title='Validación de Email'
        message='Te hemos enviado un correo electrónico para validar la cuenta.'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText='Ok'
        confirmButtonColor='#0D6115'
        cancelButtonColor='#C22F00'
        onConfirmPressed={() => {
          hideAlertEmailNotValidated()
        }}
      />
    </View>
  )
}

export default Login
