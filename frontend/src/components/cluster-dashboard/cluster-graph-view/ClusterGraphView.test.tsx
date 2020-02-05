import React from 'react';
import { mount } from 'enzyme';

import ClusterGraphView from './ClusterGraphView';
import { Cluster } from '../Cluster.model';

describe("Component ClusterGraphView", () => {
  it('renders without crashing', () => {
    const component = mount(<ClusterGraphView clusterData={new Cluster()} />);
    expect(component).toExist();
    expect(component).toHaveProp("clusterData", new Cluster());
  });
});
