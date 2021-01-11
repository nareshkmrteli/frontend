import React from 'react'
import { createDispatchHook, createSelectorHook, createStoreHook, Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import { proposalReducer } from './reducer'
import { sagaProposal } from "./saga"

export const proposalContext = React.createContext({
    loading:true
})
export const useSelector = createSelectorHook(proposalContext)
export const useDispatch = createDispatchHook(proposalContext)
export const useStore = createStoreHook(proposalContext)

const sagaMiddleware = createSagaMiddleware()
const proposalStore = createStore(proposalReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagaProposal)

export function ProposalContext({children}){
    return(
        <Provider store = {proposalStore} context = {proposalContext}>
            {children}
        </Provider>
    )
}
