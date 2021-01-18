import { Button, Container } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import setting from "../../setting"
import { Snackbars } from '../component/snackbar'
import { SelectedProduct } from "../product/component/selectedproduct"
import { VaraintForm } from "./component/varaintform"
export function  EditProposal(props){
    const location=useLocation()
    const proposal=location.state
    const setsubmit=React.useRef()
    const [variants, setVariants] = useState(proposal)
    const [makeSubmitAsPageRefresh, setMakeSubmitAsPageRefresh] = useState(0)
    const [snackbarProps, setSnackbarProps] = useState({visible:false,message:'message snackbar'})
    const [disabled, setDisabled] = useState(false)
    
    useEffect(() => {
        makeSubmitAsPageRefresh && makeSubmit() && setMakeSubmitAsPageRefresh(0)
    }, [makeSubmitAsPageRefresh])

    //trigger sumbit button of child component so that will set  variants if from is valid
    async function submit(e){
        await setsubmit.current.click()
        setMakeSubmitAsPageRefresh(1)
    }
    //update the proposal
    async function makeSubmit(){
        setDisabled(true)   
        try{
            if(variants && variants.variant && variants.variant.attributes.length==0)
                delete variants.variant
            if(variants && variants.variant==null)
                delete variants.variant
            await Axios.patch(
            setting.root+`/proposal/proposal/${proposal.id}/?format=json`,
            JSON.stringify({rate:variants.rate,qty:variants.qty,variant:variants.variant}),
            {
                headers:{
                    'content-type': 'application/json'
                }
            })
            setSnackbarProps({visible:true,message:'Proposal Updated Sucessfully'})
        }catch(e){
            console.log(e.request)
            alert('fail')
            setSnackbarProps({visible:true,message:'Failed To Update The Proposal :('})
        }
        setDisabled(false)
    }
    return(
        <>
        <br/>
        <SelectedProduct selectedProduct={proposal}/>
        <Container>
            <br/>
            <VaraintForm variants={variants} setsubmit={setsubmit} setvariants={setVariants} />
            <br/>
            <Button fullWidth color='primary' variant='outlined' onClick={submit} disabled={disabled} >
                Update Proposal
            </Button>
        </Container>
        <Snackbars {...snackbarProps}/>       
        </>
    )
}