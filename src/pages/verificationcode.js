// eslint-disable-next-line
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {resendVerifiationCode, confirmverificationcode} from "./../models/users"
import { render } from '@testing-library/react';
import { Router } from '@material-ui/icons';
import {useHistory,useParams} from 'react-router-dom'
import {Link as UiLink} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fullWidth:{
    width:'100%'
  },
}));

export default function VerifiationCode(props) {

  
  const classes = useStyles();
  const [data,setData]=useState({verificationcode:''});
  const [submitBtn,setSubmitBtn]=useState(false);
  const [error,setError]=useState({verificationcode:false})
  const [errorMessage,setErrorMessage]=useState({verificationcode:""})
  const [isMessageResended,setIsMessageResended]=useState(false);
  const parameter=useParams()
  const history=useHistory()


  function resendverificationcode(){
    resendVerifiationCode({
      callback:(res,status)=>{
        setIsMessageResended(true);
      },
      id:parameter.id,
      context:this});
  }

  function onSumbit(e) {
    e.preventDefault();
    setSubmitBtn(true);
    confirmverificationcode({callback:btnactive,id:parameter.id,data:data,context:this});
    }
  function btnactive(res,status){
    console.log(res)
    if(status==200){
      history.push('/')
    }else if(status==409){
        setError({verificationcode:true});
        setErrorMessage({verificationcode:"Invalid verification Code"});
          setSubmitBtn(false);
      
    }else if(status==404){

    }else if(status=400){
      setError({verificationcode:true});
      setErrorMessage({verificationcode:"Verification Code can't be empty"});
        setSubmitBtn(false);
    }
  }
  function onChange(e) {
    data[e.target.name]=e.target.value;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Mobile Number Verifiation
        </Typography>
        {(()=>{
          if(!isMessageResended)
            return null;
          return (
            <Alert severity='info' fullWidth className={classes.fullWidth} onClose={()=>{setIsMessageResended(false)}}>
              <AlertTitle>
                information
              </AlertTitle>
            Verification Code is re-sended
          </Alert>);
          
        })()}
        <form className={classes.form} noValidate onSubmit={onSumbit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="VerificationCode"
                error={error.verificationcode}
                helperText={errorMessage.verificationcode}
                name="verificationcode"
                variant="outlined"
                required
                fullWidth
                id="verificationcode"
                label="Verification Code"
                autoFocus
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            disabled={submitBtn}
            
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{console.log(this)}}
          >
           Verify
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs>
             <UiLink onClick={resendverificationcode}>
             <u>Resend the code</u>
             </UiLink>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}