import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native'
import Wish from './Wish'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from 'src/theme'
import api from 'src/services/apiUsers'
import auth from '@react-native-firebase/auth'
import useApiCall from 'src/hooks/useApiCall'

const Wishes = () => {
  const [message, setMessage] = useState(false)
  const [apiData, loading] = useApiCall(
    api.getUserByEmail,
    auth().currentUser.email
  )

  function getItems() {
    if (apiData !== null && apiData[0] !== undefined) {
      const user = apiData[0]
      return user.wishes
    }
  }

  //Guardar deseos:
  const saveWish = wish => {
    api.saveWish(auth().currentUser.email, wish).then(res => {
      if (res.ok) {
        Keyboard.dismiss()
      } else {
        console.log('No se pudo guardar')
      }
    })
  }

  const styles = StyleSheet.create({
    container: {
      height: '82%',
    },
    wishsWrapper: {
      paddingHorizontal: 20,
      height: '70%',
    },
    title: {
      fontSize: 30,
      marginTop: 25,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: 'Roboto-Bold',
    },
    items: {
      flex: 1,
    },
    input: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      width: '70%',
      backgroundColor: 'white',
      borderRadius: 10,
      fontSize: 18,
      fontFamily: 'Roboto-Regular',
    },
    inputWish: {
      height: '15%',
      display: 'flex',
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    addWrapper: {
      width: 45,
      height: 45,
      backgroundColor: theme.colors.secondary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerMessage: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 20,
      backgroundColor: theme.colors.red,
      height: 40,
      borderRadius: 5,
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
    },
    message: {
      textAlign: 'center',
      fontSize: 15,
      color: 'white',
      fontFamily: 'Roboto-Medium',
      paddingLeft: 10,
    },
    icon: {
      color: 'white',
    },
  })

  const [wish, setWish] = useState(null)
  const [wishItems, setWishItems] = useState([])

  const handleAddWish = text => {
    if (text !== null) {
      setMessage(false)
      setWishItems([text, ...wishItems])
      setWish(null)
      saveWish(text)
    } else {
      setMessage(true)
    }
  }
  if (loading || apiData === null) return null

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Deseos</Text>
        <View style={styles.inputWish}>
          <TextInput
            style={styles.input}
            placeholder={'Escribir deseo...'}
            value={wish}
            onChangeText={text => setWish(text)}
          />
          <TouchableOpacity onPress={() => handleAddWish(wish)}>
            <View style={styles.addWrapper}>
              <Icon name='plus' style={styles.icon} size={20} />
            </View>
          </TouchableOpacity>
        </View>
        {message ? (
          <View style={styles.containerMessage}>
            <Icon name='exclamation-circle' style={styles.icon} size={18} />
            <Text style={styles.message}>No se puede guardar vacío.</Text>
          </View>
        ) : null}
        <View style={styles.wishsWrapper}>
          <View style={styles.items}>
            <ScrollView>
              {wishItems.map((item, index) => {
                return (
                  <View key={index}>
                    <Wish text={item} />
                  </View>
                )
              })}
              {getItems().map((item, index) => {
                return (
                  <View key={index}>
                    <Wish text={item} />
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default Wishes
