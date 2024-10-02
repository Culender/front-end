import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer'; 
import Signup from './components/Login/Signup';

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
