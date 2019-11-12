import React, { useState, useEffect } from "react";
import { Close as CloseIcon } from "@material-ui/icons";

import "./SimpleSnackBar.scss";
import { Snackbar, IconButton } from "@material-ui/core";

type SimpleSnackBarProps = {
  message: string;
  open: boolean;
};

const SimpleSnackBar: React.FC<SimpleSnackBarProps> = (
  props: SimpleSnackBarProps
) => {
  const [open, setOpen] = useState(props.open);

  useEffect(() => setOpen(props.open), [props.open]);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={(): void => setOpen(false)}
        message={<span>{props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={(): void => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </React.Fragment>
  );
};

export default SimpleSnackBar;
