import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Contact from 'src/components/Contact'
import api from 'src/services/apiFriends'
import auth from '@react-native-firebase/auth'
import useApiCall from 'src/hooks/useApiCall'
import theme from 'src/theme'

const List = () => {
  //Usuario actual:
  const email = auth().currentUser.email
  const [friends, loading] = useApiCall(api.getFriends, email)

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
      fontSize: 30,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 15,
      fontFamily: 'Roboto-Bold',
    },
    containerMessage: {
      backgroundColor: theme.colors.secondary,
      height: 70,
      width: '95%',
      display: 'flex',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 10,
    },
    message: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Roboto-Medium',
      color: 'white',
    },
    friendsContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })

  if (!loading && friends === null) return null
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Amigos</Text>
        <View style={{ paddingBottom: '20%' }}>
          {loading ? (
            <Text style={styles.loading}>Cargando...</Text>
          ) : friends.length === 0 ? (
            <View style={styles.containerMessage}>
              <Text style={styles.message}>
                Aún no tienes amigos agregados.
              </Text>
            </View>
          ) : (
            <ScrollView>
              {friends.map(item => {
                return (
                  <View style={styles.friendsContainer} key={item.id}>
                    <Contact user={item} />
                  </View>
                )
              })}
            </ScrollView>
          )}
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default List
