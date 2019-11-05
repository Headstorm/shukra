import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

import './ConfirmationDialog.scss';

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  content: string;
  data: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  setOpen: (open: boolean) => void;
  handleAgree: (obj: any) => void; //eslint-disable-line @typescript-eslint/no-explicit-any
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props: ConfirmationDialogProps) => {

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={(): void => props.setOpen(false)}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(): void => props.setOpen(false)} autoFocus>No</Button>
          <Button onClick={(): void => props.handleAgree(props.data)}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ConfirmationDialog;