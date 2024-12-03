import React from 'react';

import { Provider } from "react-redux";
import store from "../../store";

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MainPage from '../../pages/main-page/MainPage';
import ServicesPage from '../../pages/services-page/ServicesPage';
import ServicePage from '../../pages/service-page/ServicePage';
import LoginPage from '../../pages/login-page/LoginPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';

import NavigationBar from "../navigation-bar/NavigationBar";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <NavigationBar/>
        <Routes>
          <Route path='/' element= { <MainPage/> } />
          <Route path='/services' element = { <ServicesPage/> } />
          <Route path='/services/:id' element = { <ServicePage/> } />
          <Route path='/login' element = { <LoginPage/> } />
          <Route path='/profile' element = { <ProfilePage/> } />
          <Route path='/*' element = { <NotFoundPage/> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
