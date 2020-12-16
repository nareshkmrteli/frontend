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

export function Snackbars({message}) {
    const [open, setOpen] = React.useState(true);
    const [transition, setTransition] = React.useState(undefined);
    const handleClick = (Transition) => () => {
      setTransition(() => Transition);
      setOpen(true);
    };
    useEffect(() => {
        setTimeout(()=>setOpen(false),3000)
        setTimeout(()=>handleClick(TransitionDown),500)
    }, [message])


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ''}
      />
    </div>
  );
}