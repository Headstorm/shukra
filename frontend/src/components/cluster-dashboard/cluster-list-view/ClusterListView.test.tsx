import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import ClusterListView from './ClusterListView';
import { initialState } from '../../../reducers/dash';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Component ClusterListView", () => {
  it('renders without crashing', () => {
    const store = mockStore({
      dashboard: {
        ...initialState
      }
    });

    const component = mount(<Provider store={store}><ClusterListView /></Provider>);
    expect(component).toExist();
    expect(component.find('ClusterListView')).toExist();
  });
});
