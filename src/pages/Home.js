import React from 'react'
import { useState,useEffect } from 'react'
import { getDocs,collection,deleteDoc,doc, addDoc ,updateDoc,arrayUnion, arrayRemove} from 'firebase/firestore';
import { db ,auth} from '../config';
import { useNavigate } from 'react-router-dom';


function Home({isAuthAdmin,isAuthUser}) {
 const [centerList, setCenterList] = useState([]);
 const [slots, setslots] = useState([]);
  const [isBooked, setisBooked] = useState(false);
  const [bookId, setBookId] = useState("");
 const [searchQuery, setsearchQuery] = useState("");
 const [filteredList, setfilteredList] = useState([]);

  const centerCollectionRef=collection(db,"centers")  ;
  const bkdSlotsCollectionRef=collection(db,"bookedslots");
  let navigate=useNavigate()

  useEffect(()=>{
  
  const getCentres=async()=>{
    const data=await getDocs(centerCollectionRef)
    //const slot=await getDocs(bkdSlotsCollectionRef)
    setCenterList(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    //setslots(slot.docs.map((doc)=>({...doc.data(),id:doc.id})))
    getValue()
  }
 
  getCentres()
  //window.location.reload(false);
  
  },[localStorage.getItem("isAuthUser")])
  const getValue=()=>{
    const id=centerList.filter((val)=>{
        if((isAuthUser||isAuthAdmin)&&val.booked.includes(auth.currentUser.uid)){
         return  val.booked
        }
      })
      console.log(id);
      if(id.length>0){
       console.log(id[0].id);
       setisBooked(true)
       setBookId(id[0].id)
       localStorage.setItem("isBooked",true)
       localStorage.setItem("bookId",id[0].id)
      }
    }
  const deleteCenter=async(id)=>{
    const postDoc=doc(db,"centers",id)
    await deleteDoc(postDoc) 
  }
  const bookSlot=async(centerId,currentUserId)=>{
    try{
      const docRef=doc(db,"centers",centerId)
      await updateDoc(docRef,
         {
         ["booked"]:arrayUnion(currentUserId),
         }
        )
      const dataRef = doc(db, 'centers', centerId); // Replace 'yourCollectionName' and 'yourDocumentId' with the actual collection name and document ID
      
      await addDoc(bkdSlotsCollectionRef,
        {
          slotId:centerId,
          userId:currentUserId
        }
        )
        .then(()=>{
          setisBooked(true)
          setBookId(centerId)
          localStorage.setItem("isBooked",true)
          localStorage.setItem("bookId",centerId)
          //navigate('/')
        })
    }
     catch(error){
      alert(error.message);
     }
  }
  const cancel=async(uid,cid)=>{
    try{
    const docRef=doc(db,"centers",cid)
    console.log(docRef.data);
    await updateDoc(docRef,{
      ["booked"]:arrayRemove(uid)
    })
    .then(()=>{
      setisBooked(false)
      setBookId("")
      localStorage.setItem("isBooked",false)
      localStorage.setItem("bookId","")
    })
    }
    catch(error){
      alert(error.message)
    }
  }

  
     const filteredCenters = centerList.filter((center) => {
      const nameMatch = center.name.toLowerCase().includes(searchQuery.toLowerCase());
      const hoursMatch = center.starttime.toLowerCase().includes(searchQuery.toLowerCase()) || center.endtime.toLowerCase().includes(searchQuery.toLowerCase());
      const doseMatch=isAuthAdmin?searchQuery.includes((center.dose-center.booked.length).toString()):"";
      
      return nameMatch || hoursMatch||doseMatch;
    });

   
    
    
  

  return (
    <div className="homePage" >
    
      <input type="text" className='search'  placeholder='search' onChange={(e)=>setsearchQuery(e.target.value)}/>
      
      {
        filteredCenters.map((center,index)=>{
          return(
            <div className="center">
             
              <p>{index+1}.Center Name:{center.name}</p>
              <p>Location:{center.location}</p>
              <p> Start Time:{center.starttime}</p>
              <p> End Time:{center.endtime}</p>
              <p> Type:{center.type}</p>
              <p> Dose:{center.dose-Object.keys(centerList[index].booked).length}</p>
              {
                 isAuthUser&&(!isBooked?<button onClick={()=>bookSlot(center.id,auth.currentUser.uid)}>Book</button>:(bookId==center.id?<button onClick={()=>cancel(auth.currentUser.uid,center.id)}>Cancel</button>:<></>))
              }
              {
                isAuthAdmin&&<button onClick={()=>deleteCenter(center.id)}>&#128465;</button>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Home