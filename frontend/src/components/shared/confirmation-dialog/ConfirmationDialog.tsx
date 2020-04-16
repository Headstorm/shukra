import React, { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import "./ConfirmationDialog.scss";
import { closeConfirmationDialog } from "../../../actions/dash";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  content: string;
  data: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  handleAgree: (obj: any) => void; //eslint-disable-line @typescript-eslint/no-explicit-any
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (
  props: ConfirmationDialogProps
) => {
  const [open, setOpen] = useState(props.open);
  const dispatch = useDispatch();

  useEffect(() => setOpen(props.open), [props.open]);

  return (
    <Fragment>
      <Dialog open={open} onClose={(): void => {
        setOpen(false); dispatch(closeConfirmationDialog());
      }}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(): void => {
            setOpen(false);
            dispatch(closeConfirmationDialog());
          }}
            autoFocus>
            No
          </Button>
          <Button onClick={(): void => props.handleAgree(props.data)}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmationDialog;
