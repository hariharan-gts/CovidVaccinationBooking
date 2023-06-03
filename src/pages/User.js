import React, { useState } from 'react';
import { auth } from '../config';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
function User({setIsAuthUser}) {
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate=useNavigate();
  
  const handleRegister = () => {
    setIsRegisterVisible(true);
    setIsLoginVisible(false);
    setEmail("")
    setPassword("")
  };

  const handleLogin = () => {
    setIsRegisterVisible(false);
    setIsLoginVisible(true);
    setEmail("")
    setPassword("")
  };

  const handleRegisterSubmit =async( e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
       email,
       password
      )
      .then(()=>{
        setIsAuthUser(true) 
        localStorage.setItem("isAuthUser",true)
        navigate('/')
      })
    } catch (error) {
      alert(error.message)
      console.log(error.message);
    }
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
       email,
       password
      )
      .then(()=>{
        setIsAuthUser(true) 
        localStorage.setItem("isAuthUser",true)
        navigate('/')
      })
    } catch (error) {
      alert(error.message)
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>User Authentication</h2>
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      {isRegisterVisible && (
        <form onSubmit={handleRegisterSubmit}>
          <h3>Register</h3>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
      {isLoginVisible && (
        <form onSubmit={handleLoginSubmit}>
          <h3>Login</h3>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default User;
