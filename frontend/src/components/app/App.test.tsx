import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe("Component App", () => {
  it('renders without crashing', () => {
    const component = mount(<App />);
    expect(component).toExist();
  });
});
