import firestore from '@react-native-firebase/firestore'
import { handleGet } from './utils'

const getUserByEmail = email => {
  return handleGet(
    firestore().collection('Users').where('email', '==', email).get()
  )
}

const deleteDocument = async (userId, profileId) => {
  const firstTask = await handleGet(
    firestore()
      .collection('Friends')
      .where('user1', '==', userId)
      .where('user2', '==', profileId)
      .get()
  )
  const secondTask = await handleGet(
    firestore()
      .collection('Friends')
      .where('user2', '==', userId)
      .where('user1', '==', profileId)
      .get()
  )

  if (firstTask.data.length !== 0) {
    var result = firstTask.data
  } else {
    var result = secondTask.data
  }

  const doc = result[0].id

  await firestore()
    .collection('Friends')
    .doc(doc)
    .delete()
    .then(console.log('Relación de amistad eliminada'))
    .catch(e => console.log(e))
}

const areTheyFriends = async ({ email, friendId }) => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  const firstTask = await handleGet(
    firestore().collection('Friends').where('user1', '==', id).get()
  )
  const secondTask = await handleGet(
    firestore().collection('Friends').where('user2', '==', id).get()
  )

  const friendsId = firstTask.data
    .concat(secondTask.data)
    .map(i => (i.user1 === id ? i.user2 : i.user1))

  const result = {
    data: friendsId.some(i => i === friendId),
  }
  return result
}

const getFriends = async email => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  const firstTask = await handleGet(
    firestore().collection('Friends').where('user1', '==', id).get()
  )
  const secondTask = await handleGet(
    firestore().collection('Friends').where('user2', '==', id).get()
  )

  const friendsId = firstTask.data
    .concat(secondTask.data)
    .map(i => (i.user1 === id ? i.user2 : i.user1))

  const filled = friendsId.map(async i => {
    const doc = await firestore().collection('Users').doc(i).get()
    return {
      id: doc.id,
      ...doc.data(),
    }
  })

  return Promise.all(filled).then(data => ({
    data,
    ok: true,
    error: null,
  }))
}

const api = {
  getUserByEmail,
  getFriends,
  areTheyFriends,
  deleteDocument,
}

export default api
