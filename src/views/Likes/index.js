import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Modal } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from 'src/components/Button'
import { TouchableOpacity } from 'react-native'
import api from 'src/services/apiUsers'
import useApiCall from 'src/hooks/useApiCall'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts'

const schema = yup.object().shape({
  animal: yup
    .string()
    .required('El campo no puede quedar vacio')
    .max(20, 'Máximo 20 caracteres'),
  color: yup
    .string()
    .required('El campo no puede quedar vacio')
    .max(20, 'Máximo 20 caracteres'),
})

const Likes = ({ navigation }) => {
  //Alert Guardar Cambios:
  const [alertVisibilityChangeLikes, setAlertVisibilityChangeLikes] = useState(
    false
  )

  const showAlertChangeLikes = () => {
    setAlertVisibilityChangeLikes(true)
  }

  const hideAlertChangeLikes = () => {
    setAlertVisibilityChangeLikes(false)
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { theme } = useTheme()

  const [apiData, loading] = useApiCall(
    api.getUserByEmail,
    auth().currentUser.email
  )

  useEffect(() => {
    if (apiData !== null && apiData[0] !== undefined) {
      const user = apiData[0]

      setTvShows([
        user.likes.tvShows[0],
        user.likes.tvShows[1],
        user.likes.tvShows[2],
      ])
      setMovies([
        user.likes.movies[0],
        user.likes.movies[1],
        user.likes.movies[2],
      ])
      setMusic([user.likes.music[0], user.likes.music[1], user.likes.music[2]])

      reset({
        animal: user.likes.animal,
        color: user.likes.color,
        tvShow1: user.likes.tvShows[0],
        tvShow2: user.likes.tvShows[1],
        tvShow3: user.likes.tvShows[2],
        movie1: user.likes.movies[0],
        movie2: user.likes.movies[1],
        movie3: user.likes.movies[2],
        music1: user.likes.music[0],
        music2: user.likes.music[1],
        music3: user.likes.music[2],
      })
    }
  }, [apiData, reset])

  //listas:
  const [tvShows, setTvShows] = useState('')
  const [movies, setMovies] = useState('')
  const [music, setMusic] = useState('')

  //Ver los datos de las listas:
  const changeTvShows = data => {
    setTvShows([data.tvShow1, data.tvShow2, data.tvShow3])
    setTvShowModal(false)
  }

  const changeMusic = data => {
    setMusic([data.music1, data.music2, data.music3])
    setMusicModal(false)
  }
  const changeMovies = data => {
    setMovies([data.movie1, data.movie2, data.movie3])
    setMoviesModal(false)
  }

  //Modales:
  const [tvShowModal, setTvShowModal] = useState(false)
  const [musicModal, setMusicModal] = useState(false)
  const [MoviesModal, setMoviesModal] = useState(false)

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-around',
      paddingLeft: 10,
      paddingRight: 10,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 10,
      fontFamily: 'Roboto-Bold',
    },
    label: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 6,
      fontSize: 15,
      paddingLeft: 5,
    },
    modalLabel: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 6,
      fontSize: 15,
      color: 'white',
    },
    modalView: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      padding: 35,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    saveChanges: {
      display: 'flex',
      alignItems: 'flex-end',
      marginRight: 15,
      marginTop: 5,
    },
    lists: {
      height: 40,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,
      paddingLeft: 16,
    },
    textLists: {
      fontSize: 16,
      fontFamily: 'Roboto-Medium',
      paddingLeft: 12,
    },
  })

  //Actualizar datos:
  const changeLikes = data => {
    const formatted = {
      animal: data.animal,
      color: data.color,
      tvShows: [data.tvShow1, data.tvShow2, data.tvShow3],
      movies: [data.movie1, data.movie2, data.movie3],
      music: [data.music1, data.music2, data.music3],
    }
    api.updateUserLikes(auth().currentUser.email, formatted).then(res => {
      if (res.ok) {
        showAlertChangeLikes()
      } else {
        console.log('No se pudo guardar los datos')
      }
    })
  }

  if (loading || apiData === null) return null

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Mis Gustos</Text>
        <Text style={styles.label}>Animal Favorito:</Text>
        <Input
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
          }}
          errorStyle={{
            color: 'red',
            fontFamily: 'Roboto-Medium',
            margin: 0,
            padding: 0,
          }}
          control={control}
          errorMessage={errors.animal?.message}
          name='animal'
          containerStyle={{
            marginBottom: 28,
          }}
          icon={{ name: 'paw' }}
        />
        <Text style={styles.label}>Color Favorito:</Text>
        <Input
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
          }}
          errorStyle={{
            color: 'red',
            fontFamily: 'Roboto-Medium',
            margin: 0,
            padding: 0,
          }}
          control={control}
          errorMessage={errors.color?.message}
          name='color'
          containerStyle={{
            marginBottom: 28,
          }}
          icon={{ name: 'tint' }}
        />
        <Text style={styles.label}>Top 3 Series:</Text>
        <TouchableOpacity
          style={styles.lists}
          onPress={() => setTvShowModal(true)}>
          <Icon
            style={{ width: 25, textAlign: 'center' }}
            name='tv'
            size={20}
            color={theme.colors.grey2}
          />
          <Text style={styles.textLists}>
            {tvShows[0] === '' ? '' : tvShows[0]}
            {tvShows[1] === ''
              ? ''
              : tvShows[1] && tvShows[0]
              ? ', ' + tvShows[1]
              : tvShows[1]}
            {tvShows[2] === ''
              ? ''
              : (tvShows[2] && tvShows[1]) || (tvShows[2] && tvShows[0])
              ? ', ' + tvShows[2]
              : tvShows[2]}
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>Top 3 Películas:</Text>
        <TouchableOpacity
          style={styles.lists}
          onPress={() => setMoviesModal(true)}>
          <Icon
            style={{ width: 25, textAlign: 'center' }}
            name='film'
            size={20}
            color={theme.colors.grey2}
          />
          <Text style={styles.textLists}>
            {movies[0] === '' ? '' : movies[0]}
            {movies[1] === ''
              ? ''
              : movies[1] && movies[0]
              ? ', ' + movies[1]
              : movies[1]}
            {movies[2] === ''
              ? ''
              : (movies[2] && movies[1]) || (movies[2] && movies[0])
              ? ', ' + movies[2]
              : movies[2]}
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>Top 3 Música:</Text>
        <TouchableOpacity
          style={styles.lists}
          onPress={() => setMusicModal(true)}>
          <Icon
            style={{ width: 25, textAlign: 'center' }}
            name='music'
            size={20}
            color={theme.colors.grey2}
          />
          <Text style={styles.textLists}>
            {music[0] === '' ? '' : music[0]}
            {music[1] === ''
              ? ''
              : music[1] && music[0]
              ? ', ' + music[1]
              : music[1]}
            {music[2] === ''
              ? ''
              : (music[2] && music[1]) || (music[2] && music[0])
              ? ', ' + music[2]
              : music[2]}
          </Text>
        </TouchableOpacity>
        <View style={styles.saveChanges}>
          <View style={[{ width: '50%', height: 50, marginTop: 5 }]}>
            <Button
              onPress={handleSubmit(changeLikes)}
              color='green'
              title='Guardar Cambios'
              fontSizeProp
            />
          </View>
        </View>
      </View>
      <Modal animationType='fade' transparent={true} visible={tvShowModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalLabel}>Serie 1:</Text>
          <Input
            control={control}
            name='tvShow1'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'tv' }}
          />
          <Text style={styles.modalLabel}>Serie 2:</Text>
          <Input
            control={control}
            name='tvShow2'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'tv' }}
          />
          <Text style={styles.modalLabel}>Serie 3:</Text>
          <Input
            control={control}
            name='tvShow3'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'tv' }}
          />
          <View style={styles.buttons}>
            <Button
              onPress={handleSubmit(changeTvShows)}
              color='green'
              title='Guardar'
              fontSizeProp
            />
            <Button
              color='red'
              onPress={() => setTvShowModal(false)}
              title='Cerrar'
              fontSizeProp
            />
          </View>
        </View>
      </Modal>
      <Modal animationType='fade' transparent={true} visible={MoviesModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalLabel}>Pelicula 1:</Text>
          <Input
            control={control}
            name='movie1'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'film' }}
          />
          <Text style={styles.modalLabel}>Pelicula 2:</Text>
          <Input
            control={control}
            name='movie2'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'film' }}
          />
          <Text style={styles.modalLabel}>Pelicula 3:</Text>
          <Input
            control={control}
            name='movie3'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'film' }}
          />
          <View style={styles.buttons}>
            <Button
              onPress={handleSubmit(changeMovies)}
              color='green'
              title='Guardar'
              fontSizeProp
            />
            <Button
              color='red'
              onPress={() => setMoviesModal(false)}
              title='Cerrar'
              fontSizeProp
            />
          </View>
        </View>
      </Modal>
      <Modal animationType='fade' transparent={true} visible={musicModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalLabel}>Musica 1:</Text>
          <Input
            control={control}
            name='music1'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'music' }}
          />
          <Text style={styles.modalLabel}>Musica 2:</Text>
          <Input
            control={control}
            name='music2'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'music' }}
          />
          <Text style={styles.modalLabel}>Musica 3:</Text>
          <Input
            control={control}
            name='music3'
            containerStyle={{
              marginBottom: 15,
            }}
            icon={{ name: 'music' }}
          />
          <View style={styles.buttons}>
            <Button
              onPress={handleSubmit(changeMusic)}
              color='green'
              title='Guardar'
              fontSizeProp
            />
            <Button
              color='red'
              onPress={() => setMusicModal(false)}
              title='Cerrar'
              fontSizeProp
            />
          </View>
        </View>
      </Modal>
      <AwesomeAlert
        titleStyle={{
          color: theme.colors.green,
          fontSize: 20,
          fontFamily: 'Roboto-Medium',
        }}
        show={alertVisibilityChangeLikes}
        showProgress={false}
        title='Datos guardados'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText='Ok'
        confirmButtonColor='#0D6115'
        cancelButtonColor='#C22F00'
        onConfirmPressed={() => {
          hideAlertChangeLikes()
          navigation.navigate('Profile')
        }}
      />
      <Footer />
    </View>
  )
}

export default Likes
