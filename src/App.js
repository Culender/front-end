import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer'; 
import Signup from './components/Login/Signup';
import Calender from './components/Calender/Calender';
import Record from "./components/Recode/Record"
import Interest from './components/InterestList/Interest';

const Layout = ({ children }) => {
  const location = useLocation(); 

  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <div>{children}</div>
      {!hideFooter && <Footer />} 
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/Calendar" element={<Calender />} />
          <Route path="/Record" element={<Record />} />

          <Route path="/Interest" element={<Interest />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
