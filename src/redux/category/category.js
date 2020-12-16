import React,{useContext} from 'react'
import {Provider,createDispatchHook,createSelectorHook,createStoreHook} from "react-redux"
import {createStore,applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import {categoryReducer} from './reducer'
import {sagaCategory} from "./saga"
import { composeWithDevTools } from "redux-devtools-extension"

export const categoryContext = React.createContext({
    loading:true
})
export const useSelector = createSelectorHook(categoryContext)
export const useDispatch = createDispatchHook(categoryContext)
export const useStore = createStoreHook(categoryContext)

const sagaMiddleware = createSagaMiddleware()
const categoryStore = createStore(categoryReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagaCategory)

export function CategoryContext({children}){
    return(
        <Provider store = {categoryStore} context = {categoryContext}>
            {children}
        </Provider>
    )
}
