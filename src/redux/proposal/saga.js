import { call, put, takeEvery } from "redux-saga/effects"
import { proposalApi } from "./api"
function* fetchProposalList(action){
    try{
        const data= yield call(proposalApi.list,action.filters)
        yield put({type:"LIST_LOAD_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e)
        yield put({type:'LIST_LOAD_FAIL',error:e.request.status})
    }
}
function* createProposal(action){
    try{
        const data= yield call(proposalApi.create,action.proposal)
        yield put({type:"CREATE_PROPOSAL_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e.request)
        yield put({type:'CREATE_PROPOSAL_FAIL',error:e})
    }
}
function* deleteProposal(action){
    try{
        console.log(action)
        const data=yield call(proposalApi.delete,action.id)
        yield put({type:"DELETE_PROPOSAL_SUCCESSFUL",data:data})
    }
    catch(e){
        console.log(e.request)
        yield put({type:"DELETE_PROPOSAL_FAIL",error:e})
    }
}

export function* sagaProposal() {
    yield takeEvery("GET_LIST", fetchProposalList);
    yield takeEvery("CREATE_PROPOSAL",createProposal)
    yield takeEvery("DELETE_PROPOSAL",deleteProposal)
  }
  