import React,{useContext} from 'react'
import {Provider,createDispatchHook,createSelectorHook,createStoreHook} from "react-redux"
import {createStore,applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import {productReducer} from './reducer'
import {sagaProduct} from "./saga"
import { composeWithDevTools } from "redux-devtools-extension"

export const productContext = React.createContext({
    loading:true
})
export const useSelector = createSelectorHook(productContext)
export const useDispatch = createDispatchHook(productContext)
export const useStore = createStoreHook(productContext)

const sagaMiddleware = createSagaMiddleware()
const productStore = createStore(productReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagaProduct)

export function ProductContext({children}){
    return(
        <Provider store = {productStore} context = {productContext}>
            {children}
        </Provider>
    )
}
