import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Contact from 'src/components/Contact'
import api from 'src/services/apiUsers'
import useApiCall from 'src/hooks/useApiCall'
import { useTheme } from 'react-native-elements'

const Result = text => {
  const user = text.route.params

  const [users, loading] = useApiCall(api.getUsers, user)

  const { theme } = useTheme()

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      height: '82%',
    },
    loading: {
      fontSize: 25,
      textAlign: 'center',
      fontFamily: 'Roboto-Medium',
      marginTop: 30,
      color: theme.colors.primary,
    },
    title: {
      fontSize: 35,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 20,
      fontFamily: 'Roboto-Bold',
    },
    friendsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  })

  if (!loading && users === null) return null
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Resultados:</Text>
        <View style={styles.friendsContainer}>
          {loading ? (
            <Text style={styles.loading}>Cargando...</Text>
          ) : (
            users.map(item => {
              return (
                <View key={item.id}>
                  <Contact user={item} />
                </View>
              )
            })
          )}
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default Result
