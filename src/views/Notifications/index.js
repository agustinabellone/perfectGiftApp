import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { useTheme } from 'react-native-elements'
import Notification from 'src/components/Notification/Notification'
import useApiCall from 'src/hooks/useApiCall'
import api from 'src/services/apiNotifications'
import auth from '@react-native-firebase/auth'

const Notifications = () => {
  const { theme } = useTheme()

  const email = auth().currentUser.email

  const [notifications, loading] = useApiCall(api.getNotifications, email)

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
    title: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 20,
      fontFamily: 'Roboto-Bold',
    },
    friendsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  })

  if (!loading && notifications === null) return null

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Notificaciones:</Text>
        {loading ? (
          <Text style={styles.loading}>Cargando...</Text>
        ) : notifications.length === 0 ? (
          <View style={styles.containerMessage}>
            <Text style={styles.message}>No hay notificaciones.</Text>
          </View>
        ) : (
          <ScrollView>
            {notifications.map(item => {
              return (
                <View key={item.id}>
                  <Notification user={item} />
                </View>
              )
            })}
          </ScrollView>
        )}
      </View>
      <Footer />
    </View>
  )
}

export default Notifications
