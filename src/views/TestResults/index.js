import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme } from 'react-native-elements'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AwesomeAlert from 'react-native-awesome-alerts'
import { useNavigation } from '@react-navigation/native'

const TestResults = results => {
  const result = results.route.params

  const { theme } = useTheme()
  const navigation = useNavigation()

  //Alert Finalización del test:
  const [alertVisibility, setAlertVisibility] = useState(false)

  const showAlert = () => {
    setAlertVisibility(true)
  }

  const hideAlert = () => {
    setAlertVisibility(false)
  }

  //Estilos
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    title: {
      fontSize: 25,
      textAlign: 'center',
      paddingRight: 15,
      paddingLeft: 15,
      fontFamily: 'Roboto-Bold',
    },
    text: {
      textAlign: 'center',
      fontSize: 13,
      paddingLeft: 10,
      paddingRight: 10,
      color: theme.colors.primary,
    },
    resultContainer: {
      width: '40%',
      height: '100%',
      alignItems: 'center',
    },
    images: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 90 / 2,
    },
    textImage: {
      fontFamily: 'Roboto-Medium',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      backgroundColor: theme.colors.secondary,
      height: 50,
      width: '40%',
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
    },
  })

  //Inicio del test
  const firstQuestion = 'nbDylSzhEfP3f5RKqkOt'

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>El regalo perfecto puede ser:</Text>
        <Text style={styles.text}>{result[4].text}</Text>
        <View style={styles.images}>
          <View style={styles.resultContainer}>
            <Image
              style={styles.image}
              source={{
                uri: result[0].image,
              }}
            />
            <Text style={styles.textImage}>{result[0].title}</Text>
          </View>
          <View style={styles.resultContainer}>
            <Image
              style={styles.image}
              source={{
                uri: result[1].image,
              }}
            />
            <Text style={styles.textImage}>{result[1].title}</Text>
          </View>
        </View>
        <View style={styles.images}>
          <View style={styles.resultContainer}>
            <Image
              style={styles.image}
              source={{
                uri: result[2].image,
              }}
            />
            <Text style={styles.textImage}>{result[2].title}</Text>
          </View>
          <View style={styles.resultContainer}>
            <Image
              style={styles.image}
              source={{
                uri: result[3].image,
              }}
            />
            <Text style={styles.textImage}>{result[3].title}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => showAlert()} style={styles.button}>
            <Icon name='heart' size={25} color='white' />
            <Text style={styles.buttonText}>ME GUSTA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('Question', firstQuestion)}
            style={styles.button}>
            <Icon name='undo-alt' size={22} color='white' />
            <Text style={styles.buttonText}>REINICIAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AwesomeAlert
        titleStyle={{
          color: theme.colors.primary,
          fontSize: 19,
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
        }}
        messageStyle={{
          color: theme.colors.primary,
          textAlign: 'center',
          fontSize: 16,
        }}
        show={alertVisibility}
        showProgress={false}
        title='¡Gracias por haber jugado! Esperamos que le guste el regalo elegido.'
        message='¿Querés realizar el test de nuevo?'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        showCancelButton={true}
        confirmText='Si'
        cancelText='No'
        confirmButtonColor='#0D6115'
        cancelButtonColor='#C22F00'
        onConfirmPressed={() => {
          hideAlert()
          navigation.navigate('Test')
        }}
        onCancelPressed={() => {
          hideAlert()
          navigation.navigate('Home')
        }}
      />
      <Footer />
    </View>
  )
}

export default TestResults
