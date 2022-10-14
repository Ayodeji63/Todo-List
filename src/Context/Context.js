import React, {createContext, useContext} from 'react'

const userContext = createContext();

const contextProvider = ({children}) => {
  return (
    <userContext.Provider value={'boy'}>
        {children}
    </userContext.Provider>
  )
}

export const useConxt = () => {
    return useContext(userContext)
}

export {userContext, contextProvider}