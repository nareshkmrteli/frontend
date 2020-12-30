import React from 'react'
import { createDispatchHook, createSelectorHook, createStoreHook, Provider } from "react-redux"
import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { cartReducer } from './reducer'

export const cartContext = React.createContext({})
export const useSelector = createSelectorHook(cartContext)
export const useDispatch = createDispatchHook(cartContext)
export const useStore = createStoreHook(cartContext)

const cartStore = createStore(cartReducer,composeWithDevTools())

export function CartContext({children}){
    return(
        <Provider store = {cartStore} context = {cartContext}>
            {children}
        </Provider>
    )
}
