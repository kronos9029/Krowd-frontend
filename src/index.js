import React from 'react';
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './component/navbar/Navbar';
import StartupPage from './pages/startup/StartupPage';
import RealEstate from './pages/realEstate/RealEstate';
import ViewsIndex from './views/Index';

ReactDOM.render(
  
  <BrowserRouter>
  <Navbar/>
    <Switch>
      {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
      {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
      <Route path="/real-estate" render={(props) => <RealEstate {...props} />} />
      <Route path="/companies" render={(props) => <StartupPage {...props} />} />
      <Route path="/" render={(props) => <ViewsIndex {...props} />} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
