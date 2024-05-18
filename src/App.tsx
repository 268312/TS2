import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./login-form/LoginForm";
import BooksList from "./books-list/BooksList";

function App() {
  return (
      //Wyświetlenie listy książek
  //    <div className="App">
  //      <BooksList/>
  //    </div>
      //Wyświetlenie widoku logowania
      <div className="App">
            <LoginForm/>
      </div>
  );
}

export default App;