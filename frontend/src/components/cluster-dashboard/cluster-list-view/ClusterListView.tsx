import React, { Fragment } from "react";
import { Grid, Button, Tooltip, TextField, Fab } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import {
  FiberManualRecord as FiberManualRecordIcon,
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowRight as ArrowRightIcon
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

import "./ClusterListView.scss";
import ConfirmationDialog from "../../shared/confirmation-dialog/ConfirmationDialog";
import {
  addClusterNode,
  openConfirmationDialog,
  leaveDownClusterNode
} from "../ClusterDashboardActions";
import { ClusterDashboardState } from "../ClusterDashboardReducer";

const ClusterListView: React.FC = () => {
  const cluster = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.cluster);
  const openConfDialog = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.openConfDialog);
  const confDialogTitle = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.confDialogTitle);
  const confDialogContent = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.confDialogContent);
  const confDialogData = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.confDialogData);
  const dispatch = useDispatch();
  const [addNodeAddress, setAddNodeAddress] = React.useState("");

  const handleMember = (member: string, mode: string): void => {
    const title = mode.toLowerCase() === "leave"
      ? "Remove Node From Cluster?"
      : "Shutdown Node in Cluster?";
    const content = mode.toLowerCase() === "leave"
      ? `Are you sure you want to remove node ${member} from the cluster?`
      : `Are you sure you want to shutdown node ${member} in the cluster?`;
    const data = { member: member, mode: mode };
    dispatch(openConfirmationDialog(title, content, data));
  };

  const addMember = (): void => {
    if (!addNodeAddress || addNodeAddress.trim() === "") {
      return;
    }
    dispatch(addClusterNode(addNodeAddress));
  };

  const handleMemberConfirm = ({ member, mode }: { member: string; mode: string }): void => {
    dispatch(leaveDownClusterNode(member, mode));
  };

  return (
    <Fragment>
      <Grid item xs={3}
        className="home-left-container pos-rel">
        <div className="member-list-container">
          <div className="member-list-container-title">CLUSTER NODES</div>
          <TreeView
            className="member-tree-view"
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
          >
            {cluster &&
              cluster.members &&
              cluster.members.map((member, index) => {
                return (
                  <TreeItem
                    key={member.nodeUid}
                    nodeId={String(index)}
                    label={
                      <div className="member-header">
                        <span className="disp-inline-blk">
                          <FiberManualRecordIcon
                            className={`member-status ${member.status.toLowerCase()}`}
                          />
                        </span>
                        <Tooltip title={member.node} placement="bottom">
                          <span className="member-name disp-inline-blk">
                            {member.node.split("://")[1]}
                          </span>
                        </Tooltip>
                        {member.node === cluster.leader && (
                          <Tooltip title="Leader Node" placement="bottom">
                            <span className="member-type disp-inline-blk leader">
                              L
                            </span>
                          </Tooltip>
                        )}
                        {member.node === cluster.oldest && (
                          <Tooltip title="Oldest Node" placement="bottom">
                            <span className="member-type disp-inline-blk oldest">
                              O
                            </span>
                          </Tooltip>
                        )}
                      </div>
                    }
                  >
                    <TreeItem
                      nodeId={`${index}child`}
                      label={
                        <div className="member-details">
                          <div>
                            <span className="font-bold">node : </span>
                            <span>{member.node}</span>
                          </div>
                          <div>
                            <span className="font-bold">nodeUid : </span>
                            <span>{member.nodeUid}</span>
                          </div>
                          <div>
                            <span className="font-bold">status : </span>
                            <span>{member.status.toLowerCase()}</span>
                          </div>
                          <div>
                            <span className="font-bold">roles : </span>
                            <span>{member.roles.join(",")}</span>
                          </div>
                          <div className="member-actions">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={(): void =>
                                handleMember(member.node, "Leave")
                              }
                            >
                              LEAVE
                            </Button>
                            <Button
                              className="themed"
                              variant="contained"
                              size="small"
                              onClick={(): void =>
                                handleMember(member.node, "Down")
                              }
                            >
                              SHUTDOWN
                            </Button>
                          </div>
                        </div>
                      }
                    />
                  </TreeItem>
                );
              })}
          </TreeView>
        </div>
        <div className="add-member-container">
          <TextField
            value={addNodeAddress}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setAddNodeAddress(event.currentTarget.value);
            }}
            label="Node Address"
            placeholder="Enter Node Address"
            margin="dense"
            variant="outlined"
            fullWidth={true}
          />
          <Tooltip title="Add Node" placement="bottom">
            <Fab
              variant="extended"
              size="small"
              aria-label="add node address"
              onClick={(): void => addMember()}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      </Grid>
      <ConfirmationDialog
        title={confDialogTitle}
        content={confDialogContent}
        open={openConfDialog}
        handleAgree={handleMemberConfirm}
        data={confDialogData}
      />
    </Fragment>
  );
};

export default ClusterListView;
