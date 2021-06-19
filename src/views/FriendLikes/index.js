import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTheme } from 'react-native-elements'
import { Picker } from '@react-native-community/picker'

const FriendLikes = userProps => {
  const user = userProps.route.params
  const { theme } = useTheme()

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-evenly',
      paddingLeft: 10,
      paddingRight: 10,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
    },
    containerData: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    label: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 6,
      fontSize: 16,
      paddingLeft: 5,
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
    dataIcon: {
      width: 30,
      textAlign: 'center',
    },
    picker: {
      height: 40,
      width: '90%',
      color: 'white',
      fontFamily: 'Roboto-Medium',
      fontSize: 18,
    },
  })

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Sus Gustos</Text>
        <View>
          <Text style={styles.label}>Animal Favorito:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Text style={styles.dataText}>{user.likes.animal}</Text>
              <Icon
                style={styles.dataIcon}
                name='paw'
                size={23}
                color='white'
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Color Favorito:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Text style={styles.dataText}>{user.likes.color}</Text>
              <Icon
                style={styles.dataIcon}
                name='tint'
                size={25}
                color='white'
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Top 3 Series:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Picker style={styles.picker}>
                {user.likes.tvShows.map((item, index) => {
                  return <Picker.Item key={index} label={item} />
                })}
              </Picker>
              <Icon style={styles.dataIcon} name='tv' size={20} color='white' />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Top 3 Peliculas:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Picker style={styles.picker}>
                {user.likes.movies.map((item, index) => {
                  return <Picker.Item key={index} label={item} />
                })}
              </Picker>
              <Icon
                style={styles.dataIcon}
                name='film'
                size={20}
                color='white'
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Top 3 Musica:</Text>
          <View style={styles.containerData}>
            <View style={styles.data}>
              <Picker style={styles.picker}>
                {user.likes.music.map((item, index) => {
                  return <Picker.Item key={index} label={item} />
                })}
              </Picker>
              <Icon
                style={styles.dataIcon}
                name='music'
                size={22}
                color='white'
              />
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default FriendLikes
