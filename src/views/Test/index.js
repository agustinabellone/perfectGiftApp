import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-elements'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

const Test = ({ navigation }) => {
  const { theme } = useTheme()

  //Estilos
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-around',
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: 'Roboto-Black',
    },
    explanation: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'Roboto-Medium',
      paddingLeft: 20,
      paddingRight: 20,
      color: theme.colors.primary,
    },
    button: {
      backgroundColor: theme.colors.secondary,
      height: 60,
      width: '50%',
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontFamily: 'Roboto-Bold',
      fontSize: 18,
    },
  })

  //Inicio del test
  const firstQuestion = 'nbDylSzhEfP3f5RKqkOt'

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Pensando en el regalo perfecto...</Text>
        <Text style={styles.explanation}>
          Mediante un test de preguntas podrás hacerle un regalo a esa persona
          especial que aún no esta con nosotros en la app. Solo necesitamos que
          nos brindes información sobre sus gustos asi podemos ofrecerte
          diferentes opciones como resultado.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Question', firstQuestion)}
          style={styles.button}>
          <Text style={styles.buttonText}>Empecemos</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  )
}

export default Test
