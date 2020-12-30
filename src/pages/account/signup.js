import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/';
import { signUp } from "./../../models/users";

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

export default function SignUp() {
  const classes = useStyles();
  const [data,setData]=useState({name:"",mobileno:"",password:""});
  const [submitBtn,setSubmitBtn]=useState(false);
  const [error,setError]=useState({name:false,mobileno:false,password:false})
  const [errorMessage,setErrorMessage]=useState({name:'',mobileno:'',password:''})
  const [isUserAlreadyReg,setIuserAlreadyRegister]=useState(false)
  const history=useHistory()

  function onSumbit(e) {
    e.preventDefault();
    setSubmitBtn(true)
    signUp({callback:btnacrive,data:data,context:this})    
    
    
  }
  function btnacrive(res,status){
    console.log(res)
    if(status==200){
      history.push('/account/'+res.id+'/verificationcode')

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
          Sign up
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
                autoComplete="full name"
                error={error.name}
                helperText={errorMessage.name}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobileno"
                label="Mobile Number"
                name="mobileno"
                autoComplete="mobile-number"
                error={error.mobileno}
                helperText={errorMessage.mobileno}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={error.password}
                helperText={errorMessage.password}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/account/signin' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}