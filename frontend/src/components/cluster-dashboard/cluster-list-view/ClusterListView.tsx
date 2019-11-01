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

import './ClusterListView.scss';
import { Cluster } from '../Cluster.model';
import axios from 'axios';
import { akkaClusterProps } from './../../../assets/properties/akkaClusterProps';
import SimpleSnackBar from '../../shared/simple-snack-bar/SimpleSnackBar';
import ConfirmationDialog from '../../shared/confirmation-dialog/ConfirmationDialog';

type ClusterListViewProps = {
  clusterData: Cluster;
  refreshClusterData: () => void;
}

const ClusterListView: React.FC<ClusterListViewProps> = (props: ClusterListViewProps) => {

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [openConfDialog, setOpenConfDialog] = React.useState(false);
  const [confDialogTitle, setConfDialogTitle] = React.useState("");
  const [confDialogContent, setConfDialogContent] = React.useState("");
  const [confDialogData, setConfDialogData] = React.useState({});
  const clusterData: Cluster = props.clusterData;
  const akkaGetClusterMembersUrl = akkaClusterProps["akka.management.url"] + "/cluster/members";

  const handleMemberLeave = (member: string): void => {
    setConfDialogTitle("Remove Node From Cluster?");
    setConfDialogContent("Are you sure you want to remove node " + member + " from the cluster?");
    setConfDialogData({ member: member });
    setOpenConfDialog(true);
  }

  const handleMemberLeaveConfirm = ({ member }: { member: string }): void => {
    setOpenConfDialog(false);
    axios.delete(akkaGetClusterMembersUrl + "/" + member.split('://')[1])
      .then(response => {
        if(response.status === 200) {
          setSnackBarMessage(response.data.message);
          setOpenSnackBar(true);
          props.refreshClusterData();
        }
      })
      .catch(function (error) {
        console.log(error);
        setSnackBarMessage(error.message && error.message.message ? error.message.message : error.message);
        setOpenSnackBar(true);
      })
  }

  return (
    <React.Fragment>
      <Grid item xs={3} className="shukra-left-container pos-rel">
        <div className="member-list-container">
          <div className="member-list-container-title">
            CLUSTER NODES
          </div>
          <TreeView className="member-tree-view" defaultCollapseIcon={<ArrowDropDownIcon />} defaultExpandIcon={<ArrowRightIcon />}>
          {
            clusterData && clusterData.members ? clusterData.members.map((member, index) => {
              return <TreeItem key={index} nodeId={String(index)} label={
                  <div className="member-header">
                    <span className="di-inline-blk">
                      <FiberManualRecordIcon className={"member-status " + member.status.toLowerCase()}/>
                    </span>
                    <Tooltip title={member.node} placement="bottom">
                      <span className="member-name di-inline-blk">{member.node.split('://')[1]}</span>
                    </Tooltip>
                    {
                      member.node === clusterData.leader ? 
                      <Tooltip title="Leader Node" placement="bottom">
                        <span className="member-type di-inline-blk leader">L</span>
                      </Tooltip>
                      : ""
                    }
                    {
                        member.node === clusterData.oldest ?
                        <Tooltip title="Oldest Node" placement="bottom">
                          <span className="member-type di-inline-blk oldest">O</span>
                        </Tooltip>
                        : ""
                    }
                  </div>
                }>
                  <TreeItem nodeId={index + "child"} label={
                    <div className="member-details">
                      <div><span className="fo-we-bo">node : </span><span>{member.node}</span></div>
                      <div><span className="fo-we-bo">nodeUid : </span><span>{member.nodeUid}</span></div>
                      <div><span className="fo-we-bo">status : </span><span>{member.status.toLowerCase()}</span></div>
                      <div><span className="fo-we-bo">roles : </span><span>{member.roles.join(',')}</span></div>
                      <div className="member-actions">
                        <Button variant="contained" size="small" onClick={(): void  => handleMemberLeave(member.node)}>LEAVE</Button>
                        <Button className="themed" variant="contained" size="small">SHUTDOWN</Button>
                      </div>
                    </div>
                  } />
                </TreeItem>
            }) : ""
          }
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
      <SimpleSnackBar message={snackBarMessage} open={openSnackBar} setOpen={setOpenSnackBar}/>
      <ConfirmationDialog title={confDialogTitle} content={confDialogContent} open={openConfDialog} 
        setOpen={setOpenConfDialog} handleAgree={handleMemberLeaveConfirm} data={confDialogData}
      />
    </React.Fragment>
  );
}

export default ClusterListView;