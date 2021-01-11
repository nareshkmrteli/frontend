import { Button, Container, makeStyles } from "@material-ui/core";
import qs from "qs";
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { proposalAction } from "../../redux/proposal/action";
import { useDispatch, useSelector } from "../../redux/proposal/proposal";
import { ConditionalDisplay } from '../component/condtionaldisplay';
import Loading from "../component/loading";
import { Pagination } from "../component/pagination";
import ShowList from "./component/showlist";
const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: theme.palette.background.paper,
      },
    customborder:{
        
    },
    Large:{
        height:theme.spacing(12),
        width:theme.spacing(12),
        display:"inline-block"
    },
    StyleNone:{
        textDecoration:"none"
    }
}));

export  function ListProposal(props){
    const classes=useStyles()
    const history=useHistory()
    const location=useLocation()
    const parms=useParams()
    const proposalDispatch = useDispatch()
    const proposal=useSelector((state)=>{
        return {
            list_loading : state.list.list_loading,
            list_load_successful : state.list.list_load_successful,
            list_data : state.list.list_data,
            list_error_code:state.list.list_error_code
        }
    });

    function deleteListItem(ids){
        proposalDispatch({type:'LIST_REMOVE_ELEMENT',id:ids})
        proposalDispatch(proposalAction.deleteProposal(ids))
    }

    function editProposal(proposal){
        history.push(`${location.pathname}/editproposal/`+proposal.id,proposal)
    }
    useEffect(() => {
        const qss=qs.parse(document.location.search.replace('format=json','').replace('&&',''),{ignoreQueryPrefix:true});
        proposalDispatch(proposalAction.getProposalList(qss))   
    }, [location])
    
    return(
    <Container maxWidth='xs' component='main'  style={{position:"relative"}} className={classes.customborder}>
        <br/>
        <Link to='/proposal/addproposal' className={classes.StyleNone}>
            <Button
            variant='outlined'
            size='medium'
            color='primary'
            fullWidth
            >
                Add New Proposal
            </Button>
        </Link>
        <br/>
        <br/>
        <Loading show={proposal.list_loading}/>
        <ConditionalDisplay 
            condition={proposal.list_error_code==406}  
            value={
                <>
                Please &nbsp;
                <Link to='/shopsetting' >
                    Activate the Shop
                </Link>
                , to manage proposal
                </>
            }
        />
        <ConditionalDisplay 
            condition={proposal.list_load_successful && proposal.list_data.results.length==0 }  
            value='You have no proposal'
        />
        <ShowList 
            list_load_successful={proposal.list_load_successful} 
            results={proposal.list_data.results} 
            deleteListItem={deleteListItem} 
            editProposal={editProposal}
        />      
        { 
            proposal.list_load_successful && 
            <Pagination prev={proposal.list_data.previous} next={proposal.list_data.next} />
        }
    </Container>
    );
}
