import React, { Fragment } from "react";

import "./GraphNodeTooltip.scss";
import { ClusterMember, Cluster } from "../Cluster.model";

type GraphNodeTooltipProps = {
  member: ClusterMember;
  clusterData: Cluster;
};

const GraphNodeTooltip: React.FC<GraphNodeTooltipProps> = (
  props: GraphNodeTooltipProps,
) => {

  return (
    <Fragment>
      <div>
        <span className="font-bold disp-inline-blk">node : </span>
        <span
          className={
            `status disp-inline-blk ${props.member.status.toLowerCase()}`
          }
        ></span>
        <span className="disp-inline-blk">{props.member.node}</span>
      </div>
      <div>
        <span className="font-bold">nodeUid : </span>
        <span>{props.member.nodeUid}</span>
      </div>
      <div>
        <span className="font-bold">status : </span>
        <span>{props.member.status.toLowerCase()}</span>
      </div>
      <div>
        <span className="font-bold">roles : </span>
        <span>{props.member.roles.join(", ")}</span>
      </div>
      <div>
        {props.member.node === props.clusterData.oldest && (
          <span className="type oldest disp-inline-blk">Oldest</span>
        )}
        {props.member.node === props.clusterData.leader && (
          <span className="type leader disp-inline-blk">Leader</span>
        )}
      </div>
    </Fragment>
  );
};

export default GraphNodeTooltip;