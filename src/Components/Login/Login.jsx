import React, { useEffect, useRef, useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context'; 
import Logo from '../../assets/olx-logo.png';
import './Login.css';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom' 
import ReactLoading from 'react-loading'

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(null)
  const [error,setError] = useState(null)
  const inputRef = useRef(null)
  const {db} = useContext(FirebaseContext)
  const auth = getAuth();
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault();
    setLoading(true)
    setError(false)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
    const user = userCredential.user;
    setLoading(false)
    navigate('/')

  })
  .catch((error) => {
    setLoading(false)
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
          setError('Invalid email or Password');
          break;
      case 'auth/wrong-password':
          setError('Invalid password');
          break;
      default:
          setError('Login failed. Please try again.');
          break;
    }
    console.log(error);
  });
  }

  useEffect(()=>{
    inputRef.current.focus()
  },[])
  return (
    <div>
       {
       loading ? <div className='loading-container'><ReactLoading  className='loading-wrapper'
                type="spinningBubbles"
                color="green"
                height={100}
                width={70}
            /></div> :
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            ref={inputRef}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
          {error && <p className="error">{error}</p>}
        <br />
        </form>
        <Link to={'/signup'} style={{textDecoration:'none'}}>Create new account? Signup</Link>
      </div>
      }
    </div>
  );
}

export default Login;