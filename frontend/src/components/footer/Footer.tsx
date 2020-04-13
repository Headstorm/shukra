import React, { Fragment, useState } from "react";
import { Grid, AppBar, Toolbar, Chip, Tooltip } from "@material-ui/core";
import LanguageIcon from '@material-ui/icons/Language';
import { useSelector } from "react-redux";

import './Footer.scss';
import { ClusterDashboardState } from "../../reducers/dash";
import AkkaUrlDialog from "./akka-url-dialog/AkkaUrlDialog";

const Footer: React.FC = () => {
  const akkaManagementUrl = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.akkaProps.managementUrl);
  const [openEditUrlDialog, setOpenEditUrlDialog] = useState(false);

  return (
    <Fragment>
      <Grid item md
        className="app-footer">
        <AppBar position="fixed">
          <Toolbar>
            <Tooltip title="Click to change the Akka Management URL" placement="top">
              <Chip
                className="akka-url"
                variant="outlined"
                size="small"
                icon={<LanguageIcon />}
                label={
                  <Fragment>
                    <span className="font-bold">Akka URL:</span>
                    <span className="url-text">{akkaManagementUrl}</span>
                  </Fragment>
                }
                onClick={(): void => setOpenEditUrlDialog(true)}
              />
            </Tooltip>
            <div className="brand">
              Powered By
              <a href="https://www.headstorm.com">
                <strong>
                  HEADSTORM, LLC.
                </strong>
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <AkkaUrlDialog open={openEditUrlDialog} close={(): void => setOpenEditUrlDialog(false)} />
      </Grid>
    </Fragment >
  );
}

export default Footer;