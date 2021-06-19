import React from 'react'
import { Button as RNEButton, useTheme } from 'react-native-elements'

const Button = props => {
  const theme = useTheme()
  const {
    type = 'solid',
    color = 'primary',
    containerStyle,
    buttonStyle,
    titleStyle,
    fullWidth,
    fontSizeProp,
    colorProp,
    ...rest
  } = props

  return (
    <RNEButton
      buttonStyle={{
        ...buttonStyle,
        backgroundColor:
          type === 'solid'
            ? theme.theme.colors[color]
            : type === 'clear'
            ? 'transparent'
            : type === 'outline'
            ? theme.theme.colors.white
            : theme.theme.colors.primary,
        borderRadius: 2,
        borderColor:
          type === 'outline' ? theme.theme.colors[color] : 'transparent',
        borderWidth: type === 'outline' ? 3 : 0,
        paddingHorizontal: 20,
        width: fullWidth ? '100%' : 'auto',
      }}
      titleStyle={{
        ...titleStyle,
        color: colorProp
          ? colorProp
          : type === 'outline'
          ? theme.theme.colors[color]
          : theme.theme.colors.white,
        fontSize: fontSizeProp ? 15 : 20,
        fontFamily: 'Roboto-Medium',
      }}
      containerStyle={{
        ...containerStyle,
        borderRadius: 7,
        width: fullWidth ? '100%' : 'auto',
        marginBottom: 10,
      }}
      {...rest}
    />
  )
}

export default Button
