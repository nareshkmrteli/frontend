export const proposalAction={

    getProposalList:(filters={})=>{
        return {
            type:"GET_LIST",
            filters:filters 
            //filter must an object this will append to url as query parameters
        }
    },
    createProposal:(proposal)=>{
        return {
            type:"CREATE_PROPOSAL",
            proposal:proposal
            
            //filter must an object this will append to url as query parameters
        }
    },
    deleteProposal:(id)=>{
        return {
            type: 'DELETE_PROPOSAL',
            id:id
        }
    }
}