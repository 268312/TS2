import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./login-form/LoginForm";
import BooksList from "./books-list/BooksList";
import HomePage from "./home-page/HomePage";
import LoansList from "./loans-list/LoansList";
import {Navigate, Route, Routes} from "react-router-dom";

function App() {
  return (
      <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/books" element={<BooksList/>}/>
          <Route path="/loans" element={<LoansList/>}/>
          <Route path="/" element={<Navigate to={"/login"}/>}/>
          <Route path="*" element={<h1>404</h1>} />
      </Routes>
  );
}

export default App;