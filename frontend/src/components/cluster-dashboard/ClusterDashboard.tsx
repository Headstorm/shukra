import React from 'react';
import { Grid, Button, Tooltip, TextField, Fab } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { 
  FiberManualRecord as FiberManualRecordIcon, 
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowRight as ArrowRightIcon
} from '@material-ui/icons';
import axios from 'axios';

import './ClusterDashboard.scss';

const ClusterDashboard: React.FC = () => {

  return (
    <React.Fragment>
      <Grid container md item direction="row" className="shukra-body">
        <Grid item xs={3} className="shukra-left-container pos-rel">
          <div className="member-list-container">
            <div className="member-list-container-title">
              CLUSTER NODES
            </div>
            <TreeView className="member-tree-view" defaultCollapseIcon={<ArrowDropDownIcon />} defaultExpandIcon={<ArrowRightIcon />}>
              <TreeItem nodeId="1" label={
                <div className="member-header">
                  <div className="member-header-left di-inline-blk">
                    <span className="di-inline-blk"><FiberManualRecordIcon className="member-status up"/></span>
                    <span className="member-name di-inline-blk">test@10.10.10.10:111</span>
                  </div>
                  <div className="member-header-right di-inline-blk">
                    <Tooltip title="Leader Node" placement="bottom">
                      <span className="member-type di-inline-blk leader">L</span>
                    </Tooltip>
                    <Tooltip title="Oldest Node" placement="bottom">
                      <span className="member-type di-inline-blk oldest">O</span>
                    </Tooltip>
                  </div>
                </div>
              }>
                <TreeItem nodeId="2" label={
                  <div className="member-details">
                    <div><span className="fo-we-bo">node : </span><span>akka.tcp://test@10.10.10.10:1111</span></div>
                    <div><span className="fo-we-bo">nodeUid : </span><span>1116964444</span></div>
                    <div><span className="fo-we-bo">status : </span><span>Up</span></div>
                    <div><span className="fo-we-bo">roles : </span><span>-</span></div>
                    <div className="member-actions">
                      <Button variant="contained" size="small">LEAVE</Button>
                      <Button className="themed" variant="contained" size="small">SHUTDOWN</Button>
                    </div>
                  </div>
                } />
              </TreeItem>
              <TreeItem nodeId="3" label={
                <div className="member-header">
                  <div className="member-header-left di-inline-blk">
                    <span className="di-inline-blk"><FiberManualRecordIcon className="member-status down"/></span>
                    <span className="member-name di-inline-blk">test@10.10.10.10:111</span>
                  </div>
                  <div className="member-header-right di-inline-blk">
                    <span className="member-type di-inline-blk oldest">O</span>
                  </div>
                </div>
              }>
                <TreeItem nodeId="4" label={
                  <div className="member-details">
                    <div><span className="fo-we-bo">node : </span><span>akka.tcp://test@10.10.10.10:2222</span></div>
                    <div><span className="fo-we-bo">nodeUid : </span><span>1116964334</span></div>
                    <div><span className="fo-we-bo">status : </span><span>Down</span></div>
                    <div><span className="fo-we-bo">roles : </span><span>-</span></div>
                    <div className="member-actions">
                      <Button variant="contained" size="small">LEAVE</Button>
                      <Button className="themed" variant="contained" size="small">SHUTDOWN</Button>
                    </div>
                  </div>
                } />
              </TreeItem>
            </TreeView>
          </div>
          <div className="add-member-container">
            <TextField label="Node Address" placeholder="Enter Node Address" margin="dense" variant="outlined" fullWidth={true}/>
            <Tooltip title="Add Node" placement="bottom">
              <Fab variant="extended" size="small" aria-label="add node address">
                <AddIcon/>
              </Fab>
            </Tooltip>
          </div>
        </Grid>
        <Grid item xs={9} className="shukra-right-container">
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ClusterDashboard;