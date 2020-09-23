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
import {signUp} from "./../models/users"
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
  const [error,setError]=useState({name:false,mobileno:false,password:false})
  const [errorMessage,setErrorMessage]=useState({name:'',mobileno:'',password:''})
  const [isUserAlreadyReg,setIuserAlreadyRegister]=useState(false);
  const parameter=useParams()
  const history=useHistory()
  console.log(parameter);


  function onSumbit(e) {
    e.preventDefault();
    setSubmitBtn(true);
    signUp({callback:btnacrive,data:data,context:this});
    
    
  }
  function btnacrive(res,status){
    console.log(res)
    if(status==200){

    }else if(status==400){
        setError({
          name:res.error[0].name?true:false,
          mobileno:res.error[0].mobileno?true:false,
          password:res.error[0].password?true:false});
        setErrorMessage({
          name:res.error[0].name?res.error[0].name[0].join():'',
          mobileno:res.error[0].mobileno?res.error[0].mobileno[0].join():'',
          password:res.error[0].password?res.error[0].mobileno[0].join():''});
          setSubmitBtn(false);
      
    }else if(status==409){
        setIuserAlreadyRegister(true);
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
          if(!isUserAlreadyReg)
            return null;
          return (
            <Alert severity='info' fullWidth className={classes.fullWidth} onClose={()=>{setIuserAlreadyRegister(false)}}>
              <AlertTitle>
                information
              </AlertTitle>
            Account is already registerd, Please Login
          </Alert>);
          
        })()}
        <form className={classes.form} noValidate onSubmit={onSumbit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="VerificationCode"
                error={error.name}
                helperText={errorMessage.name}
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
             <UiLink >
             Resend the code
             </UiLink>
            </Grid>
            <Grid item>
              <Link to='/signin' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}