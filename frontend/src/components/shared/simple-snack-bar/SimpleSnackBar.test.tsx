import React from "react";
import ReactDOM from "react-dom";
import SimpleSnackBar from "./SimpleSnackBar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SimpleSnackBar message="" open={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
