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
import Footer from "../footer/Footer";

import MainLayout from "../../MainLayout";

import AuthRoute from "../AuthRoute";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <NavigationBar/>
        <Routes>
          <Route path='/' element= { <MainLayout/> }>
            <Route index element= { <MainPage/> } />
            <Route path='/services' element = { <AuthRoute> <ServicesPage/> </AuthRoute> } />
            <Route path='/login' element = { <LoginPage/> } />
            <Route path='/services/:id' element = { <AuthRoute> <ServicePage/> </AuthRoute> } />
            <Route path='/profile' element = { <AuthRoute> <ProfilePage/> </AuthRoute>  } />
            <Route path='/*' element = { <NotFoundPage/> } />
          </Route>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
