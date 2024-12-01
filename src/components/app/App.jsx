import React from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/MainPage';
import ServicesPage from '../../pages/services-page/ServicesPage';
import ServicePage from '../../pages/service-page/ServicePage';
import LoginPage from '../../pages/login-page/LoginPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= { <MainPage/> } />
        <Route path='/services' element = { <ServicesPage/> } />
        <Route path='/services/:id' element = { <ServicePage/> } />
        <Route path='/login' element = { <LoginPage/> } />
        <Route path='/profile' element = { <ProfilePage/> } />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
