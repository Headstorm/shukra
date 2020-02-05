import React from 'react';
import { mount } from 'enzyme';

import ClusterDashboard from './ClusterDashboard';

describe("Component ClusterDashboard", () => {
  it('renders without crashing', () => {
    const component = mount(<ClusterDashboard />);
    expect(component).toExist();
  });
});
