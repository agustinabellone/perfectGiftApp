import firestore from '@react-native-firebase/firestore'
import { handleGet } from './utils'

const getUserByEmail = email => {
  return handleGet(
    firestore().collection('Users').where('email', '==', email).get()
  )
}

const getUsers = text => {
  const name = text
  return handleGet(
    firestore()
      .collection('Users')
      .orderBy('fullName')
      .startAt(name)
      .endAt(name + '~')
      .get()
  )
}

const updateUserData = async (email, data) => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id

  return firestore()
    .collection('Users')
    .doc(id)
    .update({
      name: data.name,
      surname: data.surname,
      fullName: data.name.toUpperCase() + ' ' + data.surname.toUpperCase(),
      birthday: data.birthday,
    })
    .then(() => ({
      data,
      error: null,
      ok: true,
    }))
    .catch(err => ({
      error: err,
      ok: false,
      data: null,
    }))
}
const updateUserLikes = async (email, data) => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  return firestore()
    .collection('Users')
    .doc(id)
    .update({
      likes: {
        animal: data.animal,
        color: data.color,
        tvShows: data.tvShows,
        movies: data.movies,
        music: data.music,
      },
    })
    .then(() => ({
      data,
      error: null,
      ok: true,
    }))
    .catch(err => ({
      error: err,
      ok: false,
      data: null,
    }))
}

const updateUserMeasures = async (email, data) => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  return firestore()
    .collection('Users')
    .doc(id)
    .update({
      measures: {
        measures: data.measures,
        footwear: data.footwear,
        above: data.above,
        under: data.under,
      },
    })
    .then(() => ({
      data,
      error: null,
      ok: true,
    }))
    .catch(err => ({
      error: err,
      ok: false,
      data: null,
    }))
}

const saveWish = async (email, data) => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  return firestore()
    .collection('Users')
    .doc(id)
    .update('wishes', firestore.FieldValue.arrayUnion(data))
    .then(() => ({
      data,
      error: null,
      ok: true,
    }))
    .catch(err => ({
      error: err,
      ok: false,
      data: null,
    }))
}

const deleteWish = async (email, wish) => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  return firestore()
    .collection('Users')
    .doc(id)
    .update('wishes', firestore.FieldValue.arrayRemove(wish))
    .then(() => ({
      wish,
      error: null,
      ok: true,
    }))
    .catch(err => ({
      error: err,
      ok: false,
      data: null,
    }))
}

const updateProfileImage = async (email, url) => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  return firestore()
    .collection('Users')
    .doc(id)
    .update('userImage', url)
    .then(() => ({
      data: url,
      error: null,
      ok: true,
    }))
    .catch(err => ({
      error: err,
      ok: false,
      data: null,
    }))
}

const api = {
  getUserByEmail,
  updateUserData,
  updateUserLikes,
  updateUserMeasures,
  saveWish,
  deleteWish,
  updateProfileImage,
  getUsers,
}

export default api
