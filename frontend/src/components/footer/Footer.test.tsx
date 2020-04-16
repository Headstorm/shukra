import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Footer from './Footer';
import { initialState } from '../../reducers/dash';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Component Footer", () => {
  it('renders without crashing', () => {
    const store = mockStore({
      dashboard: {
        ...initialState
      }
    });
    const component = mount(<Provider store={store}><Footer /></Provider>);
    expect(component).toExist();
    expect(component.find('Footer')).toExist();
  });
});