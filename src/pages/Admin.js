import React from 'react'
import { auth,db } from '../config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { collection, query, where, getDocs} from 'firebase/firestore';
function Admin({setIsAuthAdmin}) {
  const [adminMail, setAdminMail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
let navigate=useNavigate()
  const login=async ()=>{
    try{ 
      const collectionRef = collection(db, 'admin'); 
      const q1= query(collectionRef,where("mail",'==',adminMail))
      const q2=query(collectionRef,where("password",'==',adminPassword))

      const qs1=await getDocs(q1)
      const d1=qs1.docs

      const qs2=await getDocs(q2)
      const d2=qs2.docs


      if(d1.length>0&&d2.length>0){
        setIsAuthAdmin(true) 
        localStorage.setItem("isAuthAdmin",true)
        navigate('/AddCenter')
      }
      else{
        alert("Enter valid admin mail and password")
      }
    }
    catch(error){
        console.log(error.message);
    }
  }
  return (
    <div>
      <h3>Admin Login</h3>
      <div>
      <label htmlFor="">Email</label>
      <input type="email" onChange={(e)=>setAdminMail(e.target.value)} placeholder="mail"/>
      </div>
      <div>
        <label htmlFor="">Passowrd</label>
        <input type="password" name="" id="" placeholder='password' onChange={(e)=>{setAdminPassword(e.target.value)}}/>
      </div>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Admin