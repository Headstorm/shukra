import React from 'react';
import { mount } from 'enzyme';

import ClusterListView from './ClusterListView';
import { Cluster } from '../Cluster.model';

describe("Component ClusterListView", () => {
  it('renders without crashing', () => {
    const component = mount(<ClusterListView clusterData={new Cluster()}
      refreshClusterData={(): void => { }} />);
    expect(component).toExist();
    expect(component).toHaveProp("clusterData", new Cluster());
  });
});
