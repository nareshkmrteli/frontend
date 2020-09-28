import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {AccountCircle} from '@material-ui/icons';
import {Link,useHistory,useLocation} from "react-router-dom"

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
        backgroundColor:"#c4c4c470",
      }}
      value={value}
      onChange={(event, newValue) => {
        const links=['recents','favorites','account']
        setValue(newValue);
        history.push('/'+links[newValue])
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction  label="Recents" name='recents' icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" name='favorites' icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Account" name='account' icon={<AccountCircle/>} />
    </BottomNavigation>
  );
}