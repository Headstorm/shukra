import React from 'react';
import { Close as CloseIcon } from '@material-ui/icons';

import './SimpleSnackBar.scss';
import { Snackbar, IconButton } from '@material-ui/core';

type SimpleSnackBarProps = {
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SimpleSnackBar: React.FC<SimpleSnackBarProps> = (props: SimpleSnackBarProps) => {

  return (
    <React.Fragment>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={props.open} autoHideDuration={3000}
        onClose={(): void => props.setOpen(false)}  message={<span>{props.message}</span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={(): void => props.setOpen(false)}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </React.Fragment>
  );
}

export default SimpleSnackBar;