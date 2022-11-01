import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Home from './component/layout/Home/Home.js';


function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
  }, []);

  
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={ <Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
