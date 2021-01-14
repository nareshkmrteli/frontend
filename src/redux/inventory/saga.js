import { call, put, takeEvery } from "redux-saga/effects"
import { inventoryApi } from "./api"
function* fetchInventoryList(action){
    try{
        const data= yield call(inventoryApi.list,action.filters)
        yield put({type:"LIST_LOAD_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e)
        yield put({type:'LIST_LOAD_FAIL',error:e.request.status})
    }
}
function* createInventory(action){
    try{
        const data= yield call(inventoryApi.create,action.inventory)
        yield put({type:"CREATE_INVENTORY_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e.request)
        yield put({type:'CREATE_INVENTORY_FAIL',error:e})
    }
}
function* deleteInventory(action){
    try{
        console.log(action)
        const data=yield call(inventoryApi.delete,action.id)
        yield put({type:"DELETE_INVENTORY_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e.request)
        yield put({type:"DELETE_INVENTORY_FAIL",error:e})
    }
}

export function* sagaInventory() {
    yield takeEvery("GET_LIST", fetchInventoryList);
    yield takeEvery("CREATE_INVENTORY",createInventory)
    yield takeEvery("DELETE_INVENTORY",deleteInventory)
  }
  