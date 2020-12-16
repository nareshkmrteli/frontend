import {combineReducers} from "redux"

const list_initial={
    list_loading:false,
    list_load_successful:false,
    list_data:false,
    list_error:false
}
export function ListProductReducer(state=list_initial,action){
    var newstate=null
    switch(action.type){
        case "GET_LIST":
            newstate={
                ...state,
                list_loading:true,
                list_load_successful:false,
                list_error:false
            }
            break
        case "LIST_LOAD_SUCCESSFUL":
            newstate={
                ...state,
                list_loading:false,
                list_load_successful:true,
                list_data:action.data,
                list_error:false
            }
            break
        case "LIST_LOAD_FAIL":
            newstate={
                ...state,
                list_loading:false,
                list_load_successful:false,
                list_error:action.error
                
            }
            break
        default:
            newstate={
                ...state
            }
        
    }
    return newstate
}

export const  productReducer=combineReducers({
    'list' : ListProductReducer
})