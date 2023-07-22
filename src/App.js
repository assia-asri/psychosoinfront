import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  let navigate = useNavigate();
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate
      to='/authentification'
    />
  }

  if (role === "admin") {
    return <Navigate
      to='/admin/programmes'
    />
  }



  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
