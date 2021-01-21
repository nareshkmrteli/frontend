import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, NotificationsActive, Storefront } from '@material-ui/icons';
import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function AppBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history=useHistory()
  const location=useLocation()
  

  return (
    <BottomNavigation style={{
        width: window.innerWidth+'px',
        position: 'fixed',
        bottom: 0,
        textAlign:"center",
        maxWidth:'443px',
        backgroundColor:"rgb(232 232 232)",
      }}
      value={value}
      onChange={(event, newValue) => {
        const links=['shop','notification','account']
        setValue(newValue);
        history.push('/frontend/'+links[newValue])
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="StroreFront" name='shop' icon={<Storefront />} />
      <BottomNavigationAction label='notification' name='notification' icon={<NotificationsActive/>} />
      <BottomNavigationAction label="Account" name='account' icon={<AccountCircle/>} />
    </BottomNavigation>
  );
}