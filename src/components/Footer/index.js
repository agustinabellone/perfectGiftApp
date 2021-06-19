import React from 'react'
import { useTheme } from 'react-native-elements'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

const Footer = () => {
  const navigation = useNavigation()

  const { theme } = useTheme()

  const styles = StyleSheet.create({
    footer: {
      height: '8%',
      backgroundColor: theme.colors.primary,
      textAlign: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 25,
      paddingRight: 25,
    },
  })

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.push('Home')}>
        <Icon name='home' size={30} color='white' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='backward' size={25} color='white' />
      </TouchableOpacity>
    </View>
  )
}

export default Footer
