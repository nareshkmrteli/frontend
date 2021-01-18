import { Button, Container, Grid, TextField } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { AddressModel } from 'models/address'
import React, { useState } from "react"
import { useHistory } from 'react-router-dom'

export function CreateAddress(props){
    const [data] = useState({village:'',pincode:'',latitude:0,longitude:0})
    const [error, setError] = useState({village:false,pincode:false,latitude:false,longitude:false})
    const [errorMessage, setErrorMessage] = useState({village:'',pincode:'',latitude:'',longitude:''})
    const [submitButtonActive, setsubmitButtonActive] = useState(false)
    const [AlertboxShow, setAlertboxShow] = useState(false)
    const [Alertbox,setAlertbox]=useState({severity:'info',title:'title',message:'some message here'})
    const history=useHistory()
    function onSubmit(e){
      e.preventDefault()
      setAlertboxShow(true);
      setAlertbox({severity:'info',title:'',message:'Saving the address ..'});
      AddressModel({url:'create',callback:submitCallack,data:data})
    }

    function submitCallack(res,status){
        if(status==200){
        history.push('/frontend/address/listaddress');
    }else if(status==404){
        setAlertbox(false);
        setError({
          mobileno:true});
        setErrorMessage({
          mobileno:res.error});
        setsubmitButtonActive(false);
      
      }else if(status==400){
        setAlertboxShow(false);

          setError({
              village:res.error[0].village?true:false,
              pincode:res.error[0].pincode?true:false
          });
          setErrorMessage({
              village:res.error[0].village?res.error[0].village[0].join():'',
              pincode:res.error[0].pincode?res.error[0].pincode[0].join():''
          });
      }
    }
    function onChange(e){
      data[e.target.name]=e.target.value;
    }
    return(
        <Container xs {...props} >
            {(()=>{
            if (!AlertboxShow)
                return null;
            return(
                <>
                <br/>
                <Alert severity={Alertbox.severity}>
                    <AlertTitle>
                        {Alertbox.title}
                    </AlertTitle>
                    {Alertbox.message}
                </Alert>
                </>)
            })()}
                <br/>
                <form onSubmit={onSubmit}>
                    <br/> 
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            autoFocus
                            fullWidth
                            required
                            variant='outlined'
                            rows={2}
                            name='village'
                            id='village'
                            label="Address"
                            placeholder="Local Address"
                            onChange={onChange}
                            error={error.village}
                            helperText={errorMessage.village}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField    
                            fullWidth
                            required
                            variant='outlined'
                            name='pincode'
                            id='pincode'
                            label='PinCode'
                            placeholder='PinCode'
                            onChange={onChange}
                            error={error.pincode}
                            helperText={errorMessage.village}
                        />            
                        </Grid>
                        <Button
                            fullWidth
                            variant='contained'
                            color="primary"
                            type='submit'
                            disabled={submitButtonActive}
                        >
                            Add Address
                        </Button>       
                    </Grid>
                </form>
            
        </Container>)
}