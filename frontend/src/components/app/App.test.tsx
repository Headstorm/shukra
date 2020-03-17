import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import { initialState } from '../cluster-dashboard/ClusterDashboardReducer';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Component App", () => {
  it('renders without crashing', () => {
    const store = mockStore({
      dashboard: {
        ...initialState
      }
    });
    const component = mount(<Provider store={store}><App /></Provider>);
    expect(component).toExist();
    expect(component.find('App')).toExist();
  });
});
