import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from 'src/views/Login'
import Register from 'src/views/Register'
import ForgetPassword from 'src/views/ForgetPassword'

const PublicStack = createStackNavigator()

export default function PublicScreens() {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PublicStack.Screen name='Login' component={Login} />
      <PublicStack.Screen name='Register' component={Register} />
      <PublicStack.Screen name='ForgetPassword' component={ForgetPassword} />
    </PublicStack.Navigator>
  )
}
