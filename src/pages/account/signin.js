// eslint-disable-next-line 
import { Grow } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { GetUserContext } from './../../context/usercontext';
import { signIn } from "./../../models/users";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fullWidth:{
    width:'100%'
  },
  height:{
    padding:"2px",
  }
}));

export default function SignIn() {
  const {path,url}=useRouteMatch();
  const classes = useStyles();
  const [data,setData]=useState({mobileno:'',password:''})
  const [error, setError] = useState({mobileno:false,password:false})
  const [errorMessage, setErrorMessage] = useState({mobileno:'',password:''})
  const [submitBtn, setSubmitBtn] = useState(false)
  const [AlertboxShow, setAlertboxShow] = useState(false)
  const [Alertbox,setAlertbox]=useState({severity:'info',title:'title',message:'some message here'})
  const history=useHistory();
  const usercontext=GetUserContext()

  function onSubmit(e){
    e.preventDefault();
    signIn({callback:submitCallack,data:data});
  }

  function submitCallack(res,status){
    if(status==200){
      usercontext.setIsUserLogined(true)
      window.localStorage.setItem('name',res.name)
      window.localStorage.setItem('mobileno',res.mobileno)
      history.push('/account')
      
    }else if(status==400){
      setError({
        mobileno:res.error[0].mobileno?true:false,
        password:res.error[0].password?true:false});
      setErrorMessage({
        mobileno:res.error[0].mobileno?res.error[0].mobileno[0].join():'',
        password:res.error[0].password?res.error[0].mobileno[0].join():''});
        setSubmitBtn(false);
    }else if(status==409){
        setAlertboxShow(true);
        setAlertbox({severity:"info",title:"Information",message:"Mobile Number or Password is Wrong"})
    }
  }
  function onChange(e){
    data[e.target.name]=e.target.value;
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {(()=>{
        if(!AlertboxShow)
          return null;
        return(
          <Grow in={true}>  
          <Alert severity={Alertbox.severity} className={classes.fullWidth} onClose={()=>{setAlertboxShow(false)}}>
            <AlertTitle>
              {Alertbox.title}
            </AlertTitle>
            {Alertbox.message}
          </Alert>
          </Grow>)})()}
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobileno"
            label="Mobile Number"
            name="mobileno"
            autoComplete="mobile-number"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitBtn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/account/recoverpassword' variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
                <Route>
                   <Link to={`/account/signup`}  variant="body2">
                     <Typography variant='body2'>
                       {"Don't have an account? Sign Up"}
                     </Typography>
                    </Link>
                </Route>
              
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}