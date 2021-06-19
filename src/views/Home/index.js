import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-elements'
import Header from 'src/components/Header'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Home = ({ navigation }) => {
  const { theme } = useTheme()

  //Estilos
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    gift: {
      backgroundColor: theme.colors.secondary,
      height: 60,
      width: '70%',
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row-reverse',
      borderRadius: 5,
    },
    giftText: { color: 'white', fontFamily: 'Roboto-Bold', fontSize: 18 },
    option: {
      backgroundColor: theme.colors.primary,
      height: 100,
      width: '95%',
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      borderRadius: 15,
      paddingLeft: 25,
      paddingRight: 30,
    },
    optionIcon: { width: 70, textAlign: 'center' },
    optionText: { color: 'white', fontFamily: 'Roboto-Bold', fontSize: 20 },
    footer: {
      height: '8%',
      backgroundColor: theme.colors.primary,
    },
  })

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Test')}
          style={styles.gift}>
          <Icon
            style={{ textAlign: 'center' }}
            name='gift'
            size={30}
            color='white'
          />
          <Text style={styles.giftText}>PENSAR REGALO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Calendar')}
          style={styles.option}>
          <Icon
            style={styles.optionIcon}
            name='calendar-alt'
            size={50}
            color='white'
          />
          <Text style={styles.optionText}>CALENDARIO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Friends')}
          style={styles.option}>
          <Icon
            style={styles.optionIcon}
            name='users'
            size={50}
            color='white'
          />
          <Text style={styles.optionText}>LISTA DE AMIGOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Profile')}
          style={styles.option}>
          <Icon
            style={styles.optionIcon}
            name='id-card'
            size={50}
            color='white'
          />
          <Text style={styles.optionText}>PERFIL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer} />
    </View>
  )
}

export default Home
