import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from 'src/components/Button'
import api from 'src/services/apiUsers'
import useApiCall from 'src/hooks/useApiCall'
import auth from '@react-native-firebase/auth'
import AwesomeAlert from 'react-native-awesome-alerts'
import { useTheme } from 'react-native-elements'

const schema = yup.object().shape({
  measures: yup
    .string()
    .required('El campo no puede quedar vacio')
    .max(11, 'Máximo 11 caracteres')
    .matches(
      /^((\d){2,3}[-](\d){2,3}[-](\d){2,3})*$/,
      'Debe tener el estilo 60-90-60'
    ),
  footwear: yup
    .string()
    .required('El campo no puede quedar vacio')
    .min(2, 'Debe tener 2 caracteres. Ejemplo: 40')
    .max(2, 'Debe tener 2 caracteres. Ejemplo: 40'),
  above: yup
    .string()
    .required('El campo no puede quedar vacio')
    .max(1, 'Máximo 1 caracter. Ejemplo: 1 o S'),
  under: yup
    .string()
    .required('El campo no puede quedar vacio')
    .max(2, 'Máximo 2 caracteres. Ejemplo: 38'),
})

const Measures = ({ navigation }) => {
  const { theme } = useTheme()

  //Alert Guardar Cambios:
  const [
    alertVisibilityChangeMeasures,
    setAlertVisibilityChangeMeasures,
  ] = useState(false)

  const showAlertChangeMeasures = () => {
    setAlertVisibilityChangeMeasures(true)
  }

  const hideAlertChangeMeasures = () => {
    setAlertVisibilityChangeMeasures(false)
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
        measures: user.measures.measures,
        footwear: user.measures.footwear,
        above: user.measures.above,
        under: user.measures.under,
      })
    }
  }, [apiData, reset])

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-around',
      paddingRight: 10,
      paddingLeft: 10,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 25,
      fontFamily: 'Roboto-Bold',
    },
    label: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 6,
      fontSize: 15,
      paddingLeft: 5,
    },
    saveChanges: {
      display: 'flex',
      alignItems: 'flex-end',
      marginRight: 15,
    },
  })

  //Actualizar datos:
  const changeMeasures = data => {
    const formatted = {
      measures: data.measures,
      footwear: data.footwear,
      above: data.above,
      under: data.under,
    }
    api.updateUserMeasures(auth().currentUser.email, formatted).then(res => {
      if (res.ok) {
        showAlertChangeMeasures()
      } else {
        console.log('No se pudo guardar los datos')
      }
    })
  }

  if (loading || apiData === null) return null

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Mis Medidas</Text>
        <Text style={styles.label}>Medidas Corporales:</Text>
        <Input
          style={{
            fontFamily: 'Roboto-Medium',
            textTransform: 'uppercase',
            fontSize: 16,
          }}
          errorStyle={{
            color: 'red',
            fontFamily: 'Roboto-Medium',
            margin: 0,
            padding: 0,
          }}
          control={control}
          errorMessage={errors.measures?.message}
          name='measures'
          containerStyle={{
            marginBottom: 28,
          }}
          icon={{ name: 'child' }}
        />
        <Text style={styles.label}>Calzado:</Text>
        <Input
          style={{
            fontFamily: 'Roboto-Medium',
            textTransform: 'uppercase',
            fontSize: 16,
          }}
          errorStyle={{
            color: 'red',
            fontFamily: 'Roboto-Medium',
            margin: 0,
            padding: 0,
          }}
          control={control}
          errorMessage={errors.footwear?.message}
          name='footwear'
          containerStyle={{
            marginBottom: 28,
          }}
          icon={{ name: 'shoe-prints' }}
        />
        <Text style={styles.label}>Parte de Arriba:</Text>
        <Input
          style={{
            fontFamily: 'Roboto-Medium',
            textTransform: 'uppercase',
            fontSize: 16,
          }}
          errorStyle={{
            color: 'red',
            fontFamily: 'Roboto-Medium',
            margin: 0,
            padding: 0,
          }}
          control={control}
          errorMessage={errors.above?.message}
          name='above'
          containerStyle={{
            marginBottom: 28,
          }}
          icon={{ name: 'tshirt' }}
        />
        <Text style={styles.label}>Parte de Abajo:</Text>
        <Input
          style={{
            fontFamily: 'Roboto-Medium',
            textTransform: 'uppercase',
            fontSize: 16,
          }}
          errorStyle={{
            color: 'red',
            fontFamily: 'Roboto-Medium',
            margin: 0,
            padding: 0,
          }}
          control={control}
          errorMessage={errors.under?.message}
          name='under'
          containerStyle={{
            marginBottom: 28,
          }}
          icon={{ name: 'male' }}
        />

        <View style={styles.saveChanges}>
          <View style={[{ width: '50%', height: 50, marginTop: 5 }]}>
            <Button
              onPress={handleSubmit(changeMeasures)}
              color='green'
              title='Guardar Cambios'
              fontSizeProp
            />
          </View>
        </View>
      </View>
      <AwesomeAlert
        titleStyle={{
          color: theme.colors.green,
          fontSize: 20,
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
        }}
        show={alertVisibilityChangeMeasures}
        showProgress={false}
        title='Datos guardados'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText='Ok'
        confirmButtonColor='#0D6115'
        cancelButtonColor='#C22F00'
        onConfirmPressed={() => {
          hideAlertChangeMeasures()
          navigation.navigate('Profile')
        }}
      />
      <Footer />
    </View>
  )
}

export default Measures
