import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, ListAlt } from '@material-ui/icons';
import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as Proposalsvg } from '../static/proposal.svg';
import { ReactComponent as ShopOrdersvg } from '../static/shoporder.svg';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function ShopBottomNavigation() {
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
        const links=['myshop/proposalinterface','myshop/inventory','myshop/shoporder','myshop/myshopprofile']
        setValue(newValue);
        history.push('/frontend/'+links[newValue])
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Proposal" name='shop' icon={<Proposalsvg/>} />
      <BottomNavigationAction label="Inventory" name='proposal' icon={<ListAlt/>} />
      <BottomNavigationAction label="Shop Order" name='shoporder' icon={<ShopOrdersvg/>} />
      <BottomNavigationAction label="Account" name='account' icon={<AccountCircle/>} />
    </BottomNavigation>
  );
}