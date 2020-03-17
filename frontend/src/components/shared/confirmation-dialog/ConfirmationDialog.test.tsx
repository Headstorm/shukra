import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import ConfirmationDialog from './ConfirmationDialog';
import initialState from './../../cluster-dashboard/ClusterDashboardReducer';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Component ConfirmationDialog", () => {
  it('renders without crashing', () => {
    const store = mockStore({
      dashboard: {
        ...initialState
      }
    });

    const component = mount(<Provider store={store}>
      <ConfirmationDialog data="" open={false}
        title="Hello" content="World"
        handleAgree={(): void => { }} />
    </Provider>);

    expect(component).toExist();
    expect(component.find('ConfirmationDialog')).toExist();
    expect(component.find('ConfirmationDialog')).toHaveProp("title", "Hello");
    expect(component.find('ConfirmationDialog')).toHaveProp("content", "World");
  });
});
