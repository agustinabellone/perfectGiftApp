import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Button from 'src/components/Button'
import { useTheme, Text } from 'react-native-elements'
import Input from 'src/components/Input'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import AwesomeAlert from 'react-native-awesome-alerts'
import { Input as NREInput } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Pressable } from 'react-native'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .max(50, 'Máximo 50 caracteres'),
  surname: yup
    .string()
    .required('El apellido es obligatorio')
    .max(50, 'Máximo 50 caracteres'),
  email: yup
    .string()
    .required('El email es obligatorio')
    .max(50, 'Máximo 50 caracteres'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Debe tener: 8 caracteres, 1 número y 1 mayúscula'
    )
    .max(50, 'Máximo 50 caracteres'),
  birthday: yup
    .date()
    .typeError('Debe ingresar una fecha válida')
    .required('La fecha de nacimiento es obligatoria')
    .min(new Date('1900-01-01T00:00:00'), 'Fecha inválida')
    .max(new Date(), 'Fecha inválida'),
  repeatPassword: yup.string().required('Debe repetir la contraseña'),
})

const Register = ({ navigation }) => {
  const { theme } = useTheme()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  //Validar contraseña

  const [errorPassword, setErrorPassword] = useState('')
  const [errorPasswordEquals, setErrorPasswordEquals] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  //Validar contraseñas iguales

  const validatePasswordsEquals = (password1, password2) => {
    if (password1 === password2) {
      return true
    } else {
      return false
    }
  }

  const handlePressRegister = async data => {
    if (validatePasswordsEquals(data.password, data.repeatPassword)) {
      //Guardo Usuario:
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
          firestore()
            .collection('Users')
            .add({
              name: data.name,
              surname: data.surname,
              fullName:
                data.name.toUpperCase() + ' ' + data.surname.toUpperCase(),
              birthday: moment(data.birthday).format('DD/MM/YYYY'),
              email: data.email,
              likes: {
                animal: '',
                color: '',
                movies: ['', '', ''],
                music: ['', '', ''],
                tvShows: ['', '', ''],
              },
              measures: {
                measures: '',
                footwear: '',
                above: '',
                under: '',
              },
              wishes: [],
              calendar: [],
              userImage:
                'https://firebasestorage.googleapis.com/v0/b/perfectgift-f2f84.appspot.com/o/default.png?alt=media&token=42834055-f0ad-4784-886a-037d68f8be92',
            })
            .then(function () {
              //Reset de Inputs:
              reset()
              //Alert:
              showAlert()

              //Reset de errores:
              setErrorPasswordEquals('')
              setErrorPassword('')
              setErrorEmail('')
            })
            .catch(er => {
              console.log(er)
            })
        })
        .catch(e => {
          if (e.code === 'auth/email-already-in-use') {
            setErrorEmail('El email ya tiene una cuenta')
          }
        })
    } else {
      setErrorPassword('')
      setErrorPasswordEquals('Las contraseñas deben ser iguales')
    }
  }

  //Datos Calendario:
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  //Alert:
  const [alertVisibility, setAlertVisibility] = useState(false)

  const showAlert = () => {
    setAlertVisibility(true)
  }

  const hideAlert = () => {
    setAlertVisibility(false)
  }

  //Estilos:
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
    title: {
      marginBottom: 10,
      marginTop: 15,
    },
    containerInputs: {
      width: '100%',
    },
    action: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.colors.secondary,
    },
  })

  const handleChangeDate = onChange => e => {
    onChange(e)
    hideDatePicker()
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        h2
        h2Style={{ fontSize: 35, color: theme.colors.white }}>
        REGISTRO
      </Text>
      <View style={styles.containerInputs}>
        <Input
          placeholder='Nombre'
          errorMessage={errors.name?.message}
          control={control}
          name='name'
          icon={{ name: 'user-alt' }}
        />
        <Input
          placeholder='Apellido'
          errorMessage={errors.surname?.message}
          control={control}
          name='surname'
          icon={{ name: 'user-alt' }}
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
                    placeholder='Fecha de Nacimiento'
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
                      marginBottom: 28,
                      backgroundColor: theme.colors.white,
                      borderRadius: 8,
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
        <Input
          placeholder='Email'
          errorMessage={
            errors.email?.message ? errors.email?.message : errorEmail
          }
          control={control}
          name='email'
          icon={{ name: 'envelope' }}
        />
        <Input
          placeholder='Contraseña'
          errorMessage={
            errors.password?.message ? errors.password?.message : errorPassword
          }
          control={control}
          name='password'
          icon={{
            name: 'lock',
            position: 'center',
          }}
        />
        <Input
          placeholder='Contraseña'
          errorMessage={
            errors.repeatPassword?.message
              ? errors.repeatPassword?.message
              : errorPasswordEquals
          }
          control={control}
          name='repeatPassword'
          icon={{ name: 'lock', position: 'center' }}
        />
      </View>

      <Button
        color='secondary'
        onPress={handleSubmit(handlePressRegister)}
        title='Crear Cuenta'
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
        show={alertVisibility}
        showProgress={false}
        title='Usuario Creado'
        message='¡Bienvenido/a! Ahora solo queda iniciar sesión para validar la cuenta...'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText='Ok'
        confirmButtonColor='#0D6115'
        onConfirmPressed={() => {
          hideAlert()
          //Yendo al Login:
          navigation.navigate('Login')
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.action}>Volver</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register
