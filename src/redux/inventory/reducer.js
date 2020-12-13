const initial={
    list_loading:false,
    list_load_sucessful:false,
    list_data:false
}
export function inventoryReducer(state=initial,action){
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
                list_load_sucessful:true,
                list_data:action.data
            }
            break
        case "LIST_LOAD_FAIL":
            newstate={
                ...state,
                list_loading:false,
                list_load_sucessful:false
            }
            break
        
    }
    return newstate
}