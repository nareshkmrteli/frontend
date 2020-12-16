import {combineReducers} from "redux"

const list_initial={
    list_loading:false,
    list_load_successful:false,
    list_data:false
}
export function ListCategoryReducer(state=list_initial,action){
    var newstate=null
    switch(action.type){
        case "GET_LIST":
            newstate={
                ...state,
                list_loading:true,
                list_load_successful:false
            }
            break
        case "LIST_LOAD_SUCCESSFUL":
            newstate={
                list_loading:false,
                list_load_successful:true,
                list_data:action.data
            }
            break
        case "LIST_LOAD_FAIL":
            newstate={
                ...state,
                list_loading:false,
                list_load_successful:false
            }
            break
        default:
            newstate={
                ...state
            }
        
    }
    return newstate
}

export const categoryReducer=combineReducers({
    'list':ListCategoryReducer
})