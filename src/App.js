import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer'; 
import Signup from './components/Login/Signup';
import Calender from './components/Calender/Calender';
import Record from "./components/Recode/Record"
import Interest from './components/InterestList/Interest';
import Feed from './components/Feed/Feed'
import FeedDetail from './components/Feed/FeedDetail';
import Mypage from './components/Mypage/Mypage'
import Commu from './components/Community/Commu'
import CommuLike from './components/Mypage/CommuLike'
import CommuAdd from './components/Community/CommuAdd'
import CommuDetail from './components/Community/CommuDetail'

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

          <Route path="/Feed" element={<Feed />} />
          <Route path="/Detail" element={<FeedDetail />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/Commu" element={<Commu />} />
          <Route path="/CommuDetail" element={<CommuDetail />} />
          <Route path="/CommuAdd" element={<CommuAdd />} />
          <Route path="/CommuLike" element={<CommuLike />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
