import React from "react";
import { mount } from 'enzyme';

import SimpleSnackBar from "./SimpleSnackBar";

describe("Component SimpleSnackBar", () => {
  it("renders without crashing", () => {
    const component = mount(<SimpleSnackBar message="Hello world" open={true} />);
    expect(component).toExist();
  });
});

