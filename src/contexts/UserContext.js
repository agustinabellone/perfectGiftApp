import React, { useReducer, useCallback, createContext, useMemo } from 'react'

const UserContext = createContext()

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SET_STATE = 'SET_STATE'

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const LOADING = 'LOADING'

function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return LOGGED_IN
    case LOGOUT:
      return LOGGED_OUT
    case SET_STATE:
      return action.payload
    default:
      return state
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, LOGGED_OUT)

  const login = useCallback(() => {
    dispatch({ type: LOGIN })
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT })
  }, [dispatch])

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      loggedState: state,
    }),
    [login, logout, state]
  )

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export default UserContext
