import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import React, { useEffect } from 'react';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export function Snackbars({message,visible=true}) {
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
      setOpen(visible)
    }, [visible])
    
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={()=>{setOpen(false)}}
        message={message}
        TransitionComponent={TransitionDown}
        key={message}
      />
    </div>
  );
}