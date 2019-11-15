import React from 'react';
import ReactDOM from 'react-dom';
import ClusterGraphView from './ClusterGraphView';
import { Cluster } from '../Cluster.model';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClusterGraphView clusterData={new Cluster()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
