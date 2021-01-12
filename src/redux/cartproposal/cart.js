import React from 'react'
import { createDispatchHook, createSelectorHook, createStoreHook, Provider } from "react-redux"
import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { cartReducer } from './reducer'

export const cartproposalContext = React.createContext({})
export const useSelector = createSelectorHook(cartproposalContext)
export const useDispatch = createDispatchHook(cartproposalContext)
export const useStore = createStoreHook(cartproposalContext)

const cartproposalStore = createStore(cartReducer,composeWithDevTools())

export function CartProposalContext({children}){
    return(
        <Provider store = {cartproposalStore} context = {cartproposalContext}>
            {children}
        </Provider>
    )
}
