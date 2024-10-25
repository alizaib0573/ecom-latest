import React, { createContext, useState } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import { Route, Routes } from 'react-router-dom';
import Campian from './Pages/Campian';
import BasicSetting from './Pages/BasicSetting';
import User from './Pages/User';
import Desktop17 from './Pages/Desktop_17';
import Signup from './Pages/Signup';
import "../src/assets/Main.scss";
import InfluencerForm from './Pages/Signup2';
import SignUp3 from './Pages/SignUp3';
import OptionSingup from './Pages/OptionSingup';

// Create the context here in the same file
export const AuthContext = createContext();

const App = () => {
  // Create state for token and email
  const [token, setToken] = useState( localStorage.getItem('token') || '');
  const [email, setEmail] = useState( localStorage.getItem('email') || '');
  const [name, setname] = useState(localStorage.getItem('name')|| '');
  
  return (
    // Provide the token and email states to the rest of the application
    <AuthContext.Provider value={{ token, setToken, email, setEmail,name,setname }}>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/campion' element={<Campian />} />
          <Route path='/add/campian' element={<BasicSetting />} />
          <Route path='/User' element={<User />} />
          <Route path='/view/:id' element={<Desktop17 />} />
          <Route path='/signup2' element={<InfluencerForm />} />
          <Route path='/signup3' element={<SignUp3 />} />
          <Route path='/option' element={<OptionSingup />} />
        </Routes>
        <Footer />
      </>
    </AuthContext.Provider>
  );
};

export default App;
