import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'react-native-elements'

const FriendMeasures = userProps => {
  const user = userProps.route.params
  const { theme } = useTheme()

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-evenly',
      paddingRight: 10,
      paddingLeft: 10,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
    },
    label: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      paddingLeft: 5,
      marginBottom: 5,
    },
    containerData: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
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
      height: 50,
    },
    dataText: {
      color: 'white',
      fontFamily: 'Roboto-Medium',
      fontSize: 18,
    },
    containerIcon: {
      width: 30,
      display: 'flex',
      alignItems: 'center',
    },
  })

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Sus Medidas</Text>
        <View>
          <Text style={styles.label}>Medidas Corporales:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Text style={styles.dataText}>{user.measures.measures}</Text>
              <View style={styles.containerIcon}>
                <Icon name='child' size={23} color='white' />
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Calzado:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Text style={styles.dataText}>{user.measures.footwear}</Text>
              <View style={styles.containerIcon}>
                <Icon name='shoe-prints' size={23} color='white' />
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Parte de Arriba:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Text style={styles.dataText}>{user.measures.above}</Text>
              <View style={styles.containerIcon}>
                <Icon name='tshirt' size={23} color='white' />
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Parte de Abajo:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Text style={styles.dataText}>{user.measures.under}</Text>
              <View style={styles.containerIcon}>
                <Icon name='male' size={23} color='white' />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default FriendMeasures
