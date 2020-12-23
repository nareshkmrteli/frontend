import { combineReducers } from "redux"

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
        case "LIST_REMOVE_ELEMENT":
            newstate={...state }
            newstate.list_data.results=newstate.list_data.results.filter(ele=>ele.id!=action.id)
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
// productcreate reducer
export function CreateProductReducer(state=create_initial,action){
    var newstate=null
    switch(action.type){
        case "CREATE_PRODUCT":
            newstate={
                ...state,
                create_loading:true,
                create_load_successful:false,
                create_data:false,
                create_data_dispatch:action.data
            }
            break
        case "CREATE_PRODUCT_SUCCESSFUL":
            newstate={
                ...state,
                create_loading:false,
                create_load_successful:true,
                create_data:action.data
            }
            break
        case "CREATE_PRODUCT_FAIL":
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
const delete_initial={
    delete_loading:false,
    delete_load_successful:false,
    delete_data:false,
    delete_data_dispatch:false
}
export function DeleteProductReducer(state=delete_initial,action){
    var newstate=null
    switch(action.type){
        case "DELETE_PRODUCT":
            newstate={
                ...state,
                delete_loading:true,
                delete_load_successful:false,
                delete_data:false,
                delete_data_dispatch:action.data
            }
            break
        case "DELETE_PRODUCT_SUCCESSFUL":
            newstate={
                ...state,
                delete_loading:false,
                delete_load_successful:true,
                delete_data:action.data
            }
            break
        case "DELETE_PRODUCT_FAIL":
            newstate={
                ...state,
                delete_loading:false,
                delete_load_successful:false
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
    'list' : ListProductReducer,
    'create':CreateProductReducer,
    'delete':DeleteProductReducer
})