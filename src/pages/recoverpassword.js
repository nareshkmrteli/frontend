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
import {recoverPassword} from "./../models/users"
import {useHistory} from 'react-router-dom/'

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
}));

export default function RecoverPassword() {
  const classes = useStyles();
  const [data,setData]=useState({mobileno:''})
  const [error, setError] = useState({mobileno:false})
  const [errorMessage, setErrorMessage] = useState({mobileno:''})
  const [submitBtn, setSubmitBtn] = useState(false)
  const [AlertboxShow, setAlertboxShow] = useState(false)
  const [Alertbox,setAlertbox]=useState({severity:'info',title:'title',message:'some message here'})
  const history=useHistory()
  function onSubmit(e){
    e.preventDefault()
    recoverPassword({callback:submitCallack,data:data})
  }

  function submitCallack(res,status){
    if(status==200){
      console.log(res)
      history.push('/'+res.id+'/verificationcode')
    }else if(status==404){
      setError({
        mobileno:true});
      setErrorMessage({
        mobileno:res.error});
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobileno"
            label="Mobile Number"
            name="mobileno"
            autoComplete="phone"
            autoFocus
            onChange={onChange}
            error={error.mobileno}
            helperText={errorMessage.mobileno}
            
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Verification Code
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/signin" variant="body2">
                have account ?Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}