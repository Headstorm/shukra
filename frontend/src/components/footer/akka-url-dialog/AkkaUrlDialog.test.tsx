import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import AkkaUrlDialog from './AkkaUrlDialog';
import { initialState } from '../../cluster-dashboard/ClusterDashboardReducer';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Component AkkaUrlDialog", () => {
  it('renders without crashing', () => {
    const store = mockStore({
      dashboard: {
        ...initialState
      }
    });

    const component = mount(
      <Provider store={store}>
        <AkkaUrlDialog open={false} close={(): void => { }} />
      </Provider>
    );
    expect(component).toExist();
    expect(component.find('AkkaUrlDialog')).toExist();
  });
});
