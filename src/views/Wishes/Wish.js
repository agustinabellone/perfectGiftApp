import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from 'src/theme'
import api from 'src/services/apiUsers'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const Wish = props => {
  const navigation = useNavigation()

  const deleteWish = wish => {
    api.deleteWish(auth().currentUser.email, wish).then(res => {
      if (res.ok) {
        navigation.push('Wishes')
      } else {
        console.log('No se pudo eliminar')
      }
    })
  }

  return (
    <View style={styles.item}>
      <TextInput style={styles.itemText} editable={false} value={props.text} />
      <TouchableOpacity onPress={() => deleteWish(props.text)}>
        <Icon
          style={{ paddingRight: 20 }}
          name='trash-alt'
          color={theme.colors.secondary}
          size={18}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#dfe0df',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemText: {
    maxWidth: '90%',
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto-Medium',
    paddingLeft: 20,
  },
})

export default Wish
