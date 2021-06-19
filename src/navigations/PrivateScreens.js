import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from 'src/views/Home'
import Profile from 'src/views/Profile'
import Configuration from 'src/views/Configuration'
import Measures from 'src/views/Measures'
import Likes from 'src/views/Likes'
import Wishes from 'src/views/Wishes'
import ChangePassword from 'src/views/ChangePassword'
import Friends from 'src/views/Friends'
import FriendProfile from 'src/views/FriendProfile'
import FriendLikes from 'src/views/FriendLikes'
import FriendMeasures from 'src/views/FriendMeasures'
import FriendWishes from 'src/views/FriendWishes'
import FriendsResult from 'src/views/FriendsResult'
import Notifications from 'src/views/Notifications'
import Calendar from 'src/views/Calendar'
import Test from 'src/views/Test'
import Question from 'src/views/Question'
import TestResults from 'src/views/TestResults'

const PrivateStack = createStackNavigator()

export default function PrivateScreens() {
  return (
    <PrivateStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PrivateStack.Screen name='Home' component={Home} />
      <PrivateStack.Screen name='Profile' component={Profile} />
      <PrivateStack.Screen name='Configuration' component={Configuration} />
      <PrivateStack.Screen name='Measures' component={Measures} />
      <PrivateStack.Screen name='Likes' component={Likes} />
      <PrivateStack.Screen name='Wishes' component={Wishes} />
      <PrivateStack.Screen name='ChangePassword' component={ChangePassword} />
      <PrivateStack.Screen name='Friends' component={Friends} />
      <PrivateStack.Screen name='FriendProfile' component={FriendProfile} />
      <PrivateStack.Screen name='FriendLikes' component={FriendLikes} />
      <PrivateStack.Screen name='FriendMeasures' component={FriendMeasures} />
      <PrivateStack.Screen name='FriendWishes' component={FriendWishes} />
      <PrivateStack.Screen name='FriendsResult' component={FriendsResult} />
      <PrivateStack.Screen name='Notifications' component={Notifications} />
      <PrivateStack.Screen name='Calendar' component={Calendar} />
      <PrivateStack.Screen name='Test' component={Test} />
      <PrivateStack.Screen name='Question' component={Question} />
      <PrivateStack.Screen name='TestResults' component={TestResults} />
    </PrivateStack.Navigator>
  )
}
