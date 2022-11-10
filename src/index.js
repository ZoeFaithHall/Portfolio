import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import '../src/style.scss';
import Navigation from './components/navigation'
import Layout from './components/layout'
import Projects from './components/projects'
import Contact from './components/contact'
 
ReactDOM.render( 
  <React.StrictMode>
  <Router>
    <Navigation/>

    <Routes>
      <Route path="/" element= { <App/> } />
      <Route path="/layout" element= { <Layout/>} />
      <Route path="/projects" element= { <Projects/> } />
      <Route path="/contact" element= { <Contact/> } />
    </Routes>

  </Router>
  </React.StrictMode>,
    document.getElementById("root")
);