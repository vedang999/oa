import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home/Home.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Login from "./Components/Login/Login.jsx";
import Error from "./Components/Error.jsx";
import ProblemsPage from './Components/ProblemsPage/Problemspage';
import Allproblems from "./Components/Allproblems/Allproblems";
import About from "./Components/About/About";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
       <Route path ="/signup" element ={<Signup/>}></Route>
      <Route path ="/problems" element ={<Allproblems/>}></Route>
      <Route path="/problems/:pid/" element={<ProblemsPage />} />
      <Route path="*" element={<Error />}></Route>
      <Route path="/about" element={<About />}></Route>
      </Routes>
    </Router>
  );
}


export default App;
