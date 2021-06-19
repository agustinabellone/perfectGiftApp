import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTheme } from 'react-native-elements'

const FriendWishes = userProps => {
  const wishes = userProps.route.params.wishes
  const { theme } = useTheme()

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 10,
      paddingLeft: 10,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
      marginTop: 20,
    },
    containerData: { height: '80%' },
    data: {
      backgroundColor: theme.colors.secondary,
      width: '98%',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      height: 60,
      marginBottom: 20,
    },
    dataText: {
      color: 'white',
      fontFamily: 'Roboto-Bold',
      fontSize: 15,
      textTransform: 'uppercase',
    },
  })

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Su Lista de Deseos</Text>
        <View style={styles.containerData}>
          <ScrollView>
            {wishes.map((item, index) => {
              return (
                <View key={index} style={styles.data}>
                  <Text style={styles.dataText}>{item}</Text>
                  <Icon name='gift' size={23} color='white' />
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default FriendWishes
