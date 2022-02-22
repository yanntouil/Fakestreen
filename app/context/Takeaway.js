import { createContext, useState } from "react";

/**
 * Create context
 */
export const TakeawayContext = createContext()

/**
 * Context provider
 */
export default function TakeawayContextProvider({ children }) {
    /** @state dishViewer context */
    const [ viewer, setViewer ] = useState(false)

    /** @state order context */
    const [ order, setOrder ] = useState(true)

    /** @state categoryOpen context */
    const [ categoryOpen, setCategoryOpen ] = useState(-1)
    return (
        <TakeawayContext.Provider value={{ 
            viewer, setViewer, 
            order, setOrder, 
            categoryOpen, setCategoryOpen,
        }}>
            {children}
        </TakeawayContext.Provider>
    )

}
