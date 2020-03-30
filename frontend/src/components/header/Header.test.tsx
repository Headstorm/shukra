import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import { initialState } from '../cluster-dashboard/ClusterDashboardReducer';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Component Header", () => {
  it('renders without crashing', () => {
    const store = mockStore({
      dashboard: {
        ...initialState
      }
    });
    const component = mount(<Provider store={store}><Router><Header /></Router></Provider>);
    expect(component).toExist();
    expect(component.find('Header')).toExist();
  });
});