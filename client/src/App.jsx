import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, About, Service, Contact, AdminPanel, Login } from './pages/index.pages.js';
import { Header, Footer } from './components/index.components.js';
import { Toaster } from 'react-hot-toast';



function App() {
  const [sampleData, setSampleData] = useState([
    { _id:1, name: 'John Doe', email: 'john@example.com', age: 30, phone: '1234567890', date: '2025-05-17' },
    { _id:2, name: 'Jane Smith', email: 'jane@example.com', age: 25, phone: '9876543210', date: '2025-05-15' },
    { _id:3, name: 'Alice Brown', email: 'alice@example.com', age: 28, phone: '1231231234', date: '2025-05-16' },
    { _id:4, name: 'Venkat', email: 'venkat@example.com', age: 18, phone: '1231231230', date: '2025-01-16' },
    { _id:5, name: 'Taniska', email: 'Taniska@example.com', age: 8, phone: '1231236230', date: '2025-01-26' },
    { _id:6, name: 'Abishek', email: 'Abishek@example.com', age: 22, phone: '1241236230', date: '2025-06-26' },
    { _id:7, name: 'Taniska', email: 'Taniska@example.com', age: 8, phone: '1231236230', date: '2025-06-26' },
    { _id:8, name: 'Rajesh', email: 'Rajesh@example.com', age: 40, phone: '1231237230', date: '2025-06-26' },
  ]);
  const [isAuthenticated, setAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === "true");

  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("sessionStorage: ", sessionStorage.getItem('isAuthenticated'));
  return (
    <>
    <Toaster position="top-right"/>
    <Header isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated}/>
    <Routes>
      <Route path="/" element={ <Home sampleData={sampleData} />} />
      <Route path="/about" element={ <About />} />
      <Route path="/service" element={ <Service />} />
      <Route path="/contact" element={ <Contact setSampleData={setSampleData} />} />
      <Route path="/admin-panel" element={isAuthenticated? <AdminPanel/>:<Navigate to="/admin/login"/>} />
      {/* <Route path="/" element={<Login setAuthenticated={setAuthenticated}/>}/> */}
      <Route path="/admin/login" element={!isAuthenticated?<Login setAuthenticated={setAuthenticated}/>:<Navigate to="/admin-panel"/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
