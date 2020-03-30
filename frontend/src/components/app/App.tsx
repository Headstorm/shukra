import React, { Fragment, useEffect } from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { HashRouter as Router } from "react-router-dom";
import { useDispatch } from 'react-redux';

import './App.scss';
import AppRouting from './AppRouting';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { fetchAkkaProps } from '../cluster-dashboard/ClusterDashboardActions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAkkaProps());
  }, [dispatch]);

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
