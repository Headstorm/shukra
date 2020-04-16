import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import "./AkkaUrlDialog.scss";
import { changeAkkaUrl, fetchClusterData } from "../../../actions/dash";

type AkkaUrlDialogProps = {
  open: boolean;
  close: () => void;
}

const AkkaUrlDialog: React.FC<AkkaUrlDialogProps> = (
  props: AkkaUrlDialogProps
) => {
  const dispatch = useDispatch();
  const [newAkkaUrl, setNewAkkaUrl] = useState("");

  const handleAkkaUrlChange = (): void => {
    if (!newAkkaUrl || newAkkaUrl.trim() === "") return;

    dispatch(changeAkkaUrl(newAkkaUrl));
    dispatch(fetchClusterData());
    props.close();
  }

  return (
    <Fragment>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>Edit Akka Management URL</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new Akka Management URL below. Note that
            this only temporarily overrides the Akka Management URL set in
            the properties file.
          </DialogContentText>
          <TextField
            value={newAkkaUrl}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setNewAkkaUrl(event.currentTarget.value);
            }}
            margin="dense"
            id="url"
            label="Enter Akka URL"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}
            autoFocus>
            Cancel
          </Button>
          <Button onClick={(): void => handleAkkaUrlChange()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AkkaUrlDialog;
