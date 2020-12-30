import React from 'react'
import { createDispatchHook, createSelectorHook, createStoreHook, Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import { categoryReducer } from './reducer'
import { sagaCategory } from "./saga"

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
