import React,{useContext} from 'react'
import {Provider,createDispatchHook,createSelectorHook,createStoreHook} from "react-redux"
import {createStore,applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import {inventoryReducer} from './reducer'
import {sagaInventory} from "./saga"
import { composeWithDevTools } from "redux-devtools-extension"

export const inventoryContext = React.createContext({
    loading:true
})
export const useSelector = createSelectorHook(inventoryContext)
export const useDispatch = createDispatchHook(inventoryContext)
export const useStore = createStoreHook(inventoryContext)

const sagaMiddleware = createSagaMiddleware()
const inventoryStore = createStore(inventoryReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagaInventory)

export function InventoryContext({children}){
    return(
        <Provider store = {inventoryStore} context = {inventoryContext}>
            {children}
        </Provider>
    )
}
