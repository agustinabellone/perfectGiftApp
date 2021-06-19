import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { Input as NREInput, useTheme } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Input = props => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { theme } = useTheme()
  const { icon, containerStyle, control, name, ...rest } = props
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  })

  return (
    <NREInput
      style={{
        fontFamily: 'Roboto-Regular',
        marginLeft: 5,
      }}
      secureTextEntry={
        icon.name === 'lock' ? !passwordVisible : passwordVisible
      }
      errorStyle={{ color: 'white', margin: 0 }}
      containerStyle={{
        marginBottom: 30,
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        display: 'flex',
        justifyItems: 'center',
        height: 45,
        ...containerStyle,
      }}
      inputContainerStyle={{
        borderBottomWidth: 0,
      }}
      rightIcon={
        icon && icon.position === 'center' ? (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              style={{ marginLeft: 12 }}
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={24}
              color={theme.colors.grey2}
            />
          </TouchableOpacity>
        ) : null
      }
      leftIcon={
        icon ? (
          <Icon
            style={{
              marginLeft: 5,
              width: 30,
              textAlign: 'center',
            }}
            name={icon.name}
            size={24}
            color={theme.colors.grey2}
          />
        ) : null
      }
      value={field.value}
      onChangeText={field.onChange}
      {...rest}
    />
  )
}

export default Input
