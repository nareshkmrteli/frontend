import {combineReducers} from "redux"

const list_initial={
    list_loading:false,
    list_load_successful:false,
    list_data:false
}
export function ListInventoryReducer(state=list_initial,action){
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
                ...state,
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

const create_initial={
    create_loading:false,
    create_load_successful:false,
    create_data:false,
    create_data_dispatch:false
}
// inventory create reducer
export function CreateInventoryReducer(state=create_initial,action){
    var newstate=null
    switch(action.type){
        case "CREATE_INVENTORY":
            newstate={
                ...state,
                create_loading:true,
                create_load_successful:false,
                create_data:false,
                create_data_dispatch:action.data
            }
            break
        case "CREATE_INVENTORY_SUCCESSFUL":
            newstate={
                ...state,
                create_loading:false,
                create_load_successful:true,
                create_data:action.data
            }
            break
        case "CREATE_INVENTORY_FAIL":
            newstate={
                ...state,
                create_loading:false,
                create_load_successful:false
            }
            break
        default:
            newstate={
                ...state
            }
        
    }
    return newstate
}
//combine reducer
export const  inventoryReducer=combineReducers({
    'list' : ListInventoryReducer,
    'create' : CreateInventoryReducer
})