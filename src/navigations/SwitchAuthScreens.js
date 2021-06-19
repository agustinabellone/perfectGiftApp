import React from 'react'
import { LOGGED_IN } from 'src/contexts/UserContext'
import useUserContext from 'src/hooks/useUserContext'
import PrivateScreens from 'src/navigations/PrivateScreens'
import PublicScreens from 'src/navigations/PublicScreens'

function SwitchAuthScreens() {
  const { loggedState } = useUserContext()

  if (loggedState === LOGGED_IN) {
    return <PrivateScreens />
  }

  return <PublicScreens />
}

export default SwitchAuthScreens
