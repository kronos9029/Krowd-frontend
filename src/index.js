import React from 'react';
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './component/navbar/Navbar';
import StartupPage from './pages/startup/StartupPage';
import RealEstate from './pages/realEstate/RealEstate';
import ViewsIndex from './views/Index';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import CreateFundraiserPage from './pages/startFunderaise/CreateFundraiserPage';
import FundraiserGoalPage from './pages/startFunderaise/FundraiserGoalPage';
import RegisterPageMedia from './pages/startFunderaise/RegisterPageMedia';
import InvestDetails from '../src/cointainer/pages/details/InvestDetails';
ReactDOM.render(
  
  <BrowserRouter >

    <Switch >
      {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
      {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
      <Route path="/create/fundraiser/sign-up/media" render={(props) => <RegisterPageMedia {...props} />} />
      <Route path="/create/fundraiser/goal" render={(props) => <FundraiserGoalPage {...props} />} />
      <Route path="/create/fundraiser/details" render={(props) => <CreateFundraiserPage {...props} />} />
      <Route path="/details" render={(props) => <InvestDetails {...props} />} />
      <Route path="/register" render={(props) => <RegisterPage {...props} />} />
      <Route path="/login" render={(props) => <LoginPage {...props} />} />
      <Route path="/real-estate" render={(props) => <RealEstate {...props} />} />
      <Route path="/companies" render={(props) => <StartupPage {...props} />} />
      <Route path="/" render={(props) => <ViewsIndex {...props} />} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
