import { createContext, useState } from "react";



export let userContext = createContext(null)

export function UserContextProvidre(props) {

   const[userLogin,SetUserLogin]= useState(null)
   return <userContext.Provider value={{userLogin,SetUserLogin}}>
            {props.children}
     </userContext.Provider>
}