
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
            if(newstate.cart[action.index]!=undefined){
                if(action.key=='+') //increase,decrease
                    newstate.cart[action.index]+=1
                if(action.key=='-')
                    if(newstate.cart[action.index]==1){
                        delete newstate.cart[action.index]
                        delete newstate.shop[action.index]
                        delete newstate.product[action.index]
                        delete newstate.object[action.index]
                    }
                        
                    else
                    newstate.cart[action.index]+=-1
            }else{
                if(action.key=='+'){//set value to one on add
                    newstate.cart[action.index]=1
                    newstate.product[action.index]=action.product
                    newstate.shop[action.index]=action.shop
                    newstate.object[action.index]=action.object
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