import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Route,Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import {Grow} from "@material-ui/core"
import {setNewPassword} from "./../../models/users"
import {useHistory} from 'react-router-dom/'

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fullWidth:{
    width:"100%"
  }
}));

export default function SetNewPassword() {
  const classes = useStyles();
  const [data,setData]=useState({password:''})
  const [error, setError] = useState({password:false})
  const [errorMessage, setErrorMessage] = useState({password:''})
  const [submitBtn, setSubmitBtn] = useState(false)
  const [AlertboxShow, setAlertboxShow] = useState(false)
  const [Alertbox,setAlertbox]=useState({severity:'info',title:'title',message:'some message here'})
  const [showPassword, setShowPassword] = useState(false)
  const history=useHistory()
  
  function onSubmit(e){
    e.preventDefault()
    setNewPassword({callback:submitCallack,data:data})
  }
function handleClickShowPassword (){
    setShowPassword(!showPassword);
  };
  function submitCallack(res,status){
    if(status==200){
      console.log(res)
      setAlertboxShow(true)
      setAlertbox({severity:'success',title:"Sucess",message:'Password Change Successfuly '})
      //history.push('/account')
    }else if(status==404){
      setError({
        password:true});
      setErrorMessage({
        password:res.error});
      setSubmitBtn(false);
    
    }
  }
  function onChange(e){
    data[e.target.name]=e.target.value;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recover Password
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
          <FormControl fullWidth required className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
          <OutlinedInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            name='password'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={120}
          />
        </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Set  Password
          </Button>
        </form>
      </div>
    </Container>
  );
}