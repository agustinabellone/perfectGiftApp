import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme } from 'react-native-elements'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import useApiCall from 'src/hooks/useApiCall'
import api from 'src/services/apiQuestions'
import { useNavigation } from '@react-navigation/native'

const Question = props => {
  const id = props.route.params
  const { theme } = useTheme()
  const navigation = useNavigation()

  const [question, loading] = useApiCall(api.getQuestion, id)

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
      fontFamily: 'Roboto-Bold',
    },
    images: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    image: {
      width: 160,
      height: 160,
      borderRadius: 160 / 2,
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

  if (loading || question === null) return null

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>{question[0].question}</Text>
        {question[0].image ? (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              style={styles.image}
              source={{
                uri: question[0].image,
              }}
            />
          </View>
        ) : (
          <View style={styles.images}>
            <Image
              style={styles.image}
              source={{
                uri: question[0].image1,
              }}
            />
            <Image
              style={styles.image}
              source={{
                uri: question[0].image2,
              }}
            />
          </View>
        )}

        {question[0].results1 ? (
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('TestResults', question[0].results1)
              }
              style={styles.button}>
              <Text style={styles.buttonText}>{question[0].option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.push('TestResults', question[0].results2)
              }
              style={styles.button}>
              <Text style={styles.buttonText}>{question[0].option2}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('Question', question[0].nextQuestion1)
              }
              style={styles.button}>
              <Text style={styles.buttonText}>{question[0].option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.push('Question', question[0].nextQuestion2)
              }
              style={styles.button}>
              <Text style={styles.buttonText}>{question[0].option2}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Footer />
    </View>
  )
}

export default Question
