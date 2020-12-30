const list_initial={
    cart=[]
}
export function ListCartReducer(state={cart:[]},action){
    var newstate=null
    switch(action.type){
        case "ADD":
            newstate={
            cart:state.cart.push({product:action.product,variant:action.variant,qty:action.qty}) 
            }
            break
        case "REMOVE":
            newstate={
                cart:state.cart.filter((item)=>{
                if(item.product==action.product && item.variant==action.variant)
                    return
                })
            }
            break
        case "CHANGE_QTY":
            newstate={
                cart:state.cart.map((item)=>{
                if(item.product==action.product && item.variant==action.variant)
                    item.qty=action.qty
                })
            }
            break
        case "ADD_OR_UPDATE":
            let update_flag=false
                newstate={
                    cart:state.cart.map((item)=>{
                        if(item.product==action.product && item.variant==action.variant){
                            item.qty=action.qty
                            update_flag=true
                        }
                    })
                }
            if(!update_flag)
                newstate.cart.push({product:action.product,variant:action.variant,qty:action.qty})
            break
        case "RESET":
            return list_initial
            break
        default:
            newstate={
                ...state
            }
            
    }
    return newstate
}