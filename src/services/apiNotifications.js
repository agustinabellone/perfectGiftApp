import firestore from '@react-native-firebase/firestore'
import { handleGet } from './utils'

const getUserByEmail = email => {
  return handleGet(
    firestore().collection('Users').where('email', '==', email).get()
  )
}

const deleteDocument = async (currentUserId, userSend) => {
  const firstTask = await handleGet(
    firestore()
      .collection('Notifications')
      .where('userReceive', '==', currentUserId)
      .where('userSend', '==', userSend)
      .get()
  )
  const doc = firstTask.data[0].id

  await firestore()
    .collection('Notifications')
    .doc(doc)
    .delete()
    .then(console.log('Notificacion eliminada'))
    .catch(e => console.log(e))
}

const getNotifications = async email => {
  const res = await getUserByEmail(email)
  const id = res.data[0].id
  const searchNotifications = await handleGet(
    firestore().collection('Notifications').where('userReceive', '==', id).get()
  )
  return searchNotifications
}

const getSendRequests = async (currentUserId, userId) => {
  const searchSendRequests = await handleGet(
    firestore()
      .collection('Notifications')
      .where('userSend', '==', currentUserId)
      .where('userReceive', '==', userId)
      .get()
  )
  return searchSendRequests
}

const api = {
  getUserByEmail,
  getNotifications,
  deleteDocument,
  getSendRequests,
}

export default api
