import React from 'react'
import { useState ,useEffect} from 'react'
import { addDoc,collection } from 'firebase/firestore';
import { db } from '../config';
import { useNavigate } from 'react-router-dom';


function AddCenter({isAuthAdmin}) {
 const [name, setName] = useState();
 const [location, setLocation] = useState();
 const [type, setType] = useState();
 const [startTime, setStartTime] = useState();
 const [endTime, setEndTime] = useState();
 const [dose, setDose] = useState(0);
 const centerCollectionRef=collection(db,"centers")  ;
 let navigate=useNavigate()
 const add=async()=>{
   await addDoc(centerCollectionRef,
    {
        name:name||null,
        location:location||null,
        starttime:startTime||null,
        endtime:endTime||null,
        type:type||null,
        dose:Number(dose)||null,
        booked:new Array()
    })
    .then(()=>{
        navigate('/')
    })
 }
  useEffect(()=>{
   if(!isAuthAdmin)
   navigate('/Admin')
  },[])
  return ( 
    <div>
        <div>
            <label htmlFor="">CenterName</label>
            <input type="text" placeholder='CenterName' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="">Location</label>
            <input type="text" placeholder='Location' onChange={(e)=>setLocation(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="">OpeningTime</label>
            <input type="time" placeholder='OpeningTime'onChange={(e)=>setStartTime(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="">ClosingTime</label>
            <input type="time" placeholder='ClosingTime'onChange={(e)=>setEndTime(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="">Vaccine Type</label>
            <select name="vaccinetype" id="vaccinetype" onChange={(e)=>setType(e.target.value)}>
            <option value="Covishield">Covishield</option>
           <option value="Covaxine">Covaxine</option>
             </select>
        </div>
        <div>
        <label htmlFor="">Dosage</label>
            <input type="number" min="1" max="10" placeholder='Dosage'onChange={(e)=>setDose(e.target.value)}/>
        </div>
        <button onClick={add}>Add</button>
    </div>
  )
}

export default AddCenter