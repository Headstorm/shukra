import React from 'react';
import { mount } from 'enzyme';

import ConfirmationDialog from './ConfirmationDialog';

describe("Component ConfirmationDialog", () => {
  it('renders without crashing', () => {
    const component = mount(<ConfirmationDialog data="" open={false}
      title="Hello" content="World"
      handleAgree={(): void => { }} />);
    expect(component).toExist();
    expect(component).toHaveProp("title", "Hello");
    expect(component).toHaveProp("content", "World");
  });
});
