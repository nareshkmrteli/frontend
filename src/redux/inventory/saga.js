import { Call } from '@material-ui/icons'
import {call,put,takeEvery} from "redux-saga/effects"
import {inventoryApi} from "./api"
function* fetchInventoryList(action){
    try{
        
        const data= yield call(inventoryApi.list, {})
        console.log(data)
        yield put({type:"LIST_LOAD_SUCCESSFUL",data:data})
    }
    catch(e){
        yield put({type:'LIST_LOAD_FAIL',error:e})
    }
}

export function* sagaInventory() {
    yield takeEvery("GET_LIST", fetchInventoryList);
  }