import { Provider } from "react-redux"
import { FC, useRef, ReactNode } from "react"

import { AppStore, createStore } from "src/app/createStore"

type StoreProviderProps = {
    children: ReactNode
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        storeRef.current = createStore()
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}