import { Call } from '@material-ui/icons'
import {call,put,takeEvery} from "redux-saga/effects"
import {productApi} from "./api"
function* fetchProductList(action){
    try{
        const data= yield call(productApi.list,action.filters)
        yield put({type:"LIST_LOAD_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e.request.status)
        yield put({type:'LIST_LOAD_FAIL',error:e.request.status})
    }
}

export function* sagaProduct() {
    yield takeEvery("GET_LIST", fetchProductList);
  }