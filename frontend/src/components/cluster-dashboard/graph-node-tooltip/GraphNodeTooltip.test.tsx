import React from 'react';
import { mount } from 'enzyme';

import GraphNodeTooltip from './GraphNodeTooltip';
import { Cluster } from '../Cluster.model';

describe("Component GraphNodeTooltip", () => {
  it('renders without crashing', () => {
    const memberDetails = {
      node: 'akka://clustering-cluster@c1:1601',
      nodeUid: '88888888', roles: ["dc-default"], status: 'up'
    };

    const component = mount(<GraphNodeTooltip clusterData={new Cluster()}
      member={memberDetails} />);
    expect(component).toExist();
    expect(component).toHaveProp("clusterData", new Cluster());
    expect(component).toHaveProp("member", memberDetails);
  });
});
