const list_initial={
    cart:{
    },
    shop:{

    },
    product:{

    },
    object:{

    }
}
export function cartReducer(state=list_initial,action){
    var newstate=null
    switch(action.type){
        case "ADD_OR_UPDATE":
            newstate={
                cart:{...state.cart},
                shop:{...state.shop},
                product:{...state.product},
                object:{...state.object}
            }
            if(newstate.cart[action.variant]!=undefined){
                if(action.key=='+') //increase,decrease
                    newstate.cart[action.variant]+=1
                if(action.key=='-')
                    if(newstate.cart[action.variant]==1){
                        delete newstate.cart[action.variant]
                        delete newstate.shop[action.variant]
                        delete newstate.product[action.variant]
                        delete newstate.object[action.variant]
                    }
                        
                    else
                    newstate.cart[action.variant]+=-1
            }else{
                if(action.key=='+'){//set value to one on add
                    newstate.cart[action.variant]=1
                    newstate.product[action.variant]=action.product
                    newstate.shop[action.variant]=action.shop
                    newstate.object[action.variant]=action.object
                }
            }
            break
        default:
            newstate={
                ...list_initial
            }
            
    }
    return newstate
}