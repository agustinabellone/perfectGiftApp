import firestore from '@react-native-firebase/firestore'
import { handleGet } from './utils'

const getQuestion = async id => {
  const searchQuestion = await handleGet(
    firestore().collection('Questions').where('id', '==', id).get()
  )
  return searchQuestion
}

const api = { getQuestion }

export default api
