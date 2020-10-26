import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import Footer from "./components/Footer";
import NotFoundScreen from "./screens/NotFoundScreen";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div id="app">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/messages" component={MessagesScreen} />
            <Route path="/profile/:username" component={ProfileScreen} />
            <Route path="/account" component={MyAccountScreen} />
            <Route path="*" component={NotFoundScreen} />
          </Switch>
        </div>

        <Footer fixed="bottom" />
      </BrowserRouter>
    </>
  );
};

export default App;
