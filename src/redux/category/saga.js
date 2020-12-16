import { Call } from '@material-ui/icons'
import {call,put,takeEvery, takeLatest} from "redux-saga/effects"
import {categoryApi} from "./api"
function* fetchCategoryList(action){
    try{
        const data= yield call(categoryApi.list,action.filters)
        yield put({type:"LIST_LOAD_SUCCESSFUL",data:data})
    }
    catch(e){
        yield put({type:'LIST_LOAD_FAIL',error:e})
    }
}

export function* sagaCategory() {
    yield takeLatest("GET_LIST", fetchCategoryList);
  }