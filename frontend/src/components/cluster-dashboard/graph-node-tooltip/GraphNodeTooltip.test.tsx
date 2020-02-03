import React from 'react';
import ReactDOM from 'react-dom';
import GraphNodeTooltip from './GraphNodeTooltip';
import { Cluster } from '../Cluster.model';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GraphNodeTooltip clusterData={new Cluster()}
    member={{ node: '', nodeUid: '', roles: [], status: '' }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
