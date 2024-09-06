import React, { useEffect, useRef, useState,useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import Logo from '../../assets/olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { addDoc, collection} from "firebase/firestore"
import ReactLoading from "react-loading";


export default function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(null) 
    const [loading,setLoading] = useState(false)
    const inputRef = useRef(null)
    const {db} = useContext(FirebaseContext)
    const auth = getAuth()
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
      e.preventDefault()
      setLoading(true)
      if (!name.trim() || !email.trim() || !password.trim() || !number.trim())  {
        setError('All fields are required')
        setLoading(false)
        return;
      }
      if (number.length<10){
        setError('Enter valid number')
        setLoading(false)
        return;
      }

      if (!validateEmail(email)){
        setError('Invalid email address');
        setLoading(false)
        return;
      }
      if (password.length<6){
        setError('Enter valid password ')
        setLoading(false)
        return ;
      }
      setError('')

      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        const user = userCredential.user;
        console.log(user.uid,user.displayName) ;
        return updateProfile(user, {
          displayName: name
        });    

      } ).then(()=>{
        addDoc(collection(db,'users'),{
          id: auth.currentUser.uid,
          username:name,
          number:number
        })

      }).then(()=>{
        setLoading(false)
        navigate('/login')

      }).catch((err)=>{
        if (err.code === 'auth/email-already-in-use'){
          setLoading(false)
          setError('Email already in use')
        }
        else{
          setLoading(false)
          setError("server under maintenance")
        }
        console.log(err);
      })
    } 
    
    function validateEmail(){
      const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    useEffect(()=>{
       inputRef.current.focus();
    },[])
  return (
    <div >
      
      {loading ? <div className='loading-container'><ReactLoading  className='loading-wrapper'
                type="spinningBubbles"
                color="green"
                height={100}
                width={70}
            /></div> : 
      <div className="signupParentDiv"> 
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            ref = {inputRef}
            value={name}
            onChange={(e)=>setName(e.target.value)} 
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            name="phone"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>

          {error && <p className="error">{error}</p>}
          <br />
        </form>
        <Link to={'/login'} style={{textDecoration:'none'}}>Already has an account?  Login</Link>
      </div>
    }
    </div>
  
  );
}