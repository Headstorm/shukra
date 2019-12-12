import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmationDialog from './ConfirmationDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConfirmationDialog data="" open={false}
    title="" content=""
    setOpen={(): void => { }} handleAgree={(): void => { }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
