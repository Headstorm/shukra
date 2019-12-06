import React from 'react';
import ReactDOM from 'react-dom';
import ClusterListView from './ClusterListView';
import { Cluster } from '../Cluster.model';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClusterListView clusterData={new Cluster()}
    refreshClusterData={(): void => { }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
