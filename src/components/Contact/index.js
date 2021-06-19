import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import theme from 'src/theme'
import { useNavigation } from '@react-navigation/native'

const Contact = ({ user }) => {
  const navigation = useNavigation()

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      height: 220,
      width: 190,
      margin: 3,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondary,
    },
    containerName: {
      height: '20%',
      display: 'flex',
      justifyContent: 'center',
    },
    name: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Roboto-Medium',
    },
    image: {
      height: '80%',
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  })

  return (
    <TouchableOpacity
      onPress={() => navigation.push('FriendProfile', user)}
      style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: user.userImage,
        }}
      />
      <View style={styles.containerName}>
        <Text style={styles.name}>
          {user.name} {user.surname}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Contact
