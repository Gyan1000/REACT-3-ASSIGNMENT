import React,{useEffect,useState} from "react";
import "../style/DisplayPhoto.css";
import axios from "axios";
import {useParams,Link} from "react-router-dom";

  function DisplayPhoto(){
    
    const {id} =useParams();

   console.log("...id ",id)

    const[info, setInfo]=useState({
       data:{},
       isLoding:true,
       SAMPLE_DATA_PHOTOS_ID:`https://api.slingacademy.com/v1/sample-data/photos/${id}`
    })
    async function getData()
    {  
        try{
        const res=await axios.get(info.SAMPLE_DATA_PHOTOS_ID)
        const {photo}=await res.data;

        setInfo(()=>({
              ...info,
              data:photo,
              isLoding:false
            }))
          console.log('photo',photo)
       }
       catch(error)
       {
        console.log(error.message)
       }
    }
    useEffect(()=>{
        getData();
    },[]);
    
    return (
       <> 
       <div id="home">

         <Link to={'/'}>Home</Link> 

         </div>{

         (info.isLoding)?<div id="wait">PLEASE WAIT FOR DATA LODING........</div>:

        <div id="displayPhoto">
          
            
            <img src={info.data.url} alt=""/>

            <div id="info">
                <h1>{info.data.title}</h1>

                <p>
                 id: <span>{info.data.id}</span>
                  
                </p>
                <p>
                user: <span>  {info.data.user}</span>
                  
                </p>
                
                <p>
                description:<span><br/>{info.data.description}</span>
                  
                </p>
              
               </div>
           
        </div>
      }
        </>
    )
}

export  {DisplayPhoto}

