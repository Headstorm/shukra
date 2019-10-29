import React from 'react';
import ReactDOM from 'react-dom';
import ClusterDashboard from './ClusterDashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClusterDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
