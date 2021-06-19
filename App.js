import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { UserContextProvider } from 'src/contexts/UserContext'
import SwitchAuthScreens from 'src/navigations/SwitchAuthScreens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import theme from 'src/theme'
import { ThemeProvider } from 'react-native-elements'
import RNBootSplash from 'react-native-bootsplash'

const App = () => {
  useEffect(() => {
    RNBootSplash.hide()
  }, [])

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <NavigationContainer>
            <SwitchAuthScreens />
          </NavigationContainer>
        </UserContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({})

export default App
