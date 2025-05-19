import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, About, Service, Contact, AdminPanel, Login } from './pages/index.pages.js';
import { Header, Footer } from './components/index.components.js';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === "true");

  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("sessionStorage: ", sessionStorage.getItem('isAuthenticated'));
  return (
    <>
    <Toaster position="top-right"/>
    <Header isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/service" element={<Service/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/admin-panel" element={isAuthenticated? <AdminPanel/>:<Navigate to="/admin/login"/>} />
      {/* <Route path="/" element={<Login setAuthenticated={setAuthenticated}/>}/> */}
      <Route path="/admin/login" element={!isAuthenticated?<Login setAuthenticated={setAuthenticated}/>:<Navigate to="/admin-panel"/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
