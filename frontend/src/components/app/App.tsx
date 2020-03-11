import React, { Fragment } from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from "react-router-dom";

import './App.scss';
import AppRouting from './AppRouting';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const App: React.FC = () => {

  return (
    <Fragment>
      <CssBaseline />
      <div className="app-container">
        <Router>
          <Grid container direction="column"
            justify="flex-start" alignItems="stretch">
            <Header />
            <AppRouting />
            <Footer />
          </Grid>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
