import { call, put, takeEvery } from "redux-saga/effects";
import { productApi } from "./api";


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

function* createProduct(action){
    try{
       const data= yield call(productApi.create,action.product)
        yield put({type:"CREATE_PRODUCT_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e)
        yield put({type:'CREATE_PRODUCT_FAIL',error:e})
    }
}
function* updateProduct(action){
    try{
       const data= yield call(productApi.update,action.product)
        yield put({type:"UPDATE_PRODUCT_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e)
        yield put({type:'UPDATE_PRODUCT_FAIL',error:e})
    }
}
function* deleteProduct(action){
    try{
        console.log(action)
        const data=yield call(productApi.delete,action.id)
        yield put({type:"DELETE_PRODUCT_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e.request)
        yield put({type:"DELETE_PRODUCT_FAIL",error:e})
    }
}

export function* sagaProduct() {
    yield takeEvery("GET_LIST", fetchProductList);
    yield takeEvery("CREATE_PRODUCT",createProduct)
    yield takeEvery("UPDATE_PRODUCT",updateProduct)
    yield takeEvery("DELETE_PRODUCT",deleteProduct)
  }