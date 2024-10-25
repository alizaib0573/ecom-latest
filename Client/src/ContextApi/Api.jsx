import { createContext, useState } from "react";


export const AppProvider = createContext(null)


const Api = ({children})=>{
    const [item, setItem] = useState([]);
    return (
        <>
        <AppProvider.Provider value={{
            item,
            setItem,
        }}>
        {children}
        </AppProvider.Provider>
        </>
    )
}

export default Api