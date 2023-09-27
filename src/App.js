 import './App.css';
import { BookShelf } from './components/BookShelf/BookShelf';
import {Navigate,  Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MyLoginComponent from './components/login/MyLoginComponent';
 

function App() {

  return (
    <div className='App'>
    <Router>
    <Routes>
      <Route path="/connect" element={<MyLoginComponent />} />
      <Route path="/shelf" element={<BookShelf />} />
      <Route path="/" element={<Navigate to="/connect" />} />
 
    </Routes>
  </Router></div>
  );
}

export default App;
