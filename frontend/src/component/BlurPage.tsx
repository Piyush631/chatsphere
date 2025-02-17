import BlurImage from '../assets/buble.webp';
import { FaRegUser } from "react-icons/fa";
import { MdVideoLabel } from "react-icons/md";
import { easeInOut, motion } from "motion/react"
import {  useEffect, useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { roomname, username, wssocket } from "../atoms/Recoilatoms";
import { useNavigate } from "react-router-dom";

export function BlurPage() {
  
    const roomid = useRef<HTMLInputElement>(null);
    const usernamevalue = useRef<HTMLInputElement>(null);
const[,setname]=useRecoilState(username)
const[,setRoomid]=useRecoilState(roomname)
const[dayname,setDayname]=useState(" ")
const[dayno,setDayno]=useState(" ")
const[min,setMin]=useState(" ")
useEffect(()=>{
const interval=setInterval(() => {
    const myDate=new Date();

const day=myDate.toLocaleDateString('en-US',{weekday:'short'})
setDayname(day)
const daynumber=myDate.getDate();

setDayno(daynumber.toString())
const hours= myDate.getHours();

if(hours > 12)
{
    const finalhours=hours+" Pm".toString() ;
    
    setMin(finalhours)
}
else{
    
    const finalhours=hours+" Am".toString() ;
    setMin(finalhours)
}

}, 1000);
return ()=>{
    clearInterval(interval)
}
},[])

const[,setWss]=useRecoilState(wssocket)
const[id,setId]=useState(" ")
const[isroom,setIsroom]=useState(false)
    function generateid(){
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetters =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));
        const randomNumber = Math.floor(Math.random() * 900) + 100; 
    
        const id = `${randomLetters}${randomNumber}`;
        setId(id)
      
         setIsroom(true)
          
        toast(`Your Room Id is ${id}`, {
                  position: "top-center",
                  autoClose: false,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                  });
          
    }
    const navigate=useNavigate();
function joinroom(){
    const uname:any=usernamevalue.current?.value;
    const room:any=roomid.current?.value;
    setname(uname)
    setRoomid(room)
    const ws:any=new WebSocket("http://localhost:8080")
    setWss(ws)
    ws.onopen=()=>{
        ws.send(JSON.stringify({
            type:"join",
            roomId:room,
            username:uname
        
        
    }))
    }
    navigate("/chatroom")


}
    return (
        <div
            className="min-h-screen  max-h-auto  w-full flex  flex-col  lg:flex-row gap-3 items-center justify-center"
            style={{
                backgroundImage: `url(${BlurImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                < motion.div 
                initial={{opacity:0,scale:0}} 
        
                animate={{opacity:1,scale:1}}
                transition={{duration:1,ease:"easeInOut"}} 
                
                className='flex  flex-col  lg:flex-row gap-3 items-center justify-center' >

              
                <div   
        className='flex flex-col gap-4'>
                <div className=" p-3 h-80 w-72  backdrop-filter  flex flex-col  bg-white/25 backdrop-blur-lg rounded-2xl">
                <div  className='text-left pl-2 text-sm text-gray-600'>
                ChatSphere
                </div>
                <div className='mt-4 p-2 flex flex-col justify-center  gap-3'>
                    
                     <div className='text-lg font-medium'>Join Room</div>
                    
                     <div className='relative'>
                  <div className='absolute top-0.5 left-2  h-7.5 w-7.5 items flex items-center justify-center bg-white rounded-full'> 
                  
                  <div className='text-xs'><MdVideoLabel />
                  </div>
                   </div>  
                    <input   ref={roomid} className="h-9 px-12  text-lg rounded-2xl w-full p-2 placeholder-black/65 text-black bg-white/40  " type="text" placeholder='roomid'/>  

                    </div> 
                    <div className='relative'>
                  <div className='absolute top-0.5 left-2  h-7.5 w-7.5 items flex items-center justify-center bg-white rounded-full'> 
                  
                  <div className='text-xs'><FaRegUser /></div>
                   </div>  
                    <input  ref={usernamevalue} className="h-9 px-12  text-lg rounded-2xl w-full p-2 placeholder-black/65 text-black bg-white/40  " type="text" placeholder='username'/>  

                    </div>
                    
                    <div className='text-xs w-[215px] py-4  text-gray-800 leading-3.5'>It is a long established fact that a reader will be distracted by the readable </div>
                </div>
                </div>
                <div className='h-34 w-72 flex flex-col justify-between  bg-black rounded-2xl'>
                    <div className='text-white pl-3 pt-3'>
                       <div className='text-xl  '>Generate Room</div> 
                        <div className='text-white text-sm'>
                            {isroom && <motion.div
                            style={{overflow:"hidden", whiteSpace:"nowrap"}}
                            initial={{width:0}}
                            animate={{width:"100%"}}
                            transition={{ease:easeInOut, duration:2,delay:0}}
                            >your room id is {id}
                                
                                </motion.div> }</div>
                    </div>
                   
                <div className='flex justify-end p-3 ' >
                    <button className='text-gray-600 h-7  px-1.5  hover:bg-gray-300 font-semibold rounded-full bg-white cursor-pointer' onClick={generateid}>Generate Room</button>
                </div>
                </div>

                </div>
                <div className=' relative h-[456px] w-64    bg-white rounded-2xl '>
                    <div className=' absolute h-44 w-44 top-30 left-10 bg-[#FF9742] rounded-full'>

                    </div>
                    <div className='absolute m-1 h-[442px] border-1  border-gray-200 w-32 backdrop-filter backdrop-blur-xl rounded-2xl flex flex-col justify-between py-3 items-center '>
                    <div>
                        <span className='text-4xl'>{dayname}</span>
                        <br />
                        <span className='text-4xl text-gray-300'>{dayno}th</span>
                    </div>
                    <div className='flex flex-col text-xl text-gray-900 justify-center '>
                        <div>{min}</div>
                      
                        <div>India</div>
                    </div>
                    <div className='text-lg text-gray-800'>ChatSphere</div>
                    </div>
                    <div className='  p-4 h-full flex flex-col justify-end items-end'>


                        <div className=' border-2 p-1 cursor-pointer  rounded-full text-white bg-black flex flex-col '>
                            <span className='px-1.5 py-1' 
                            onClick={joinroom}>Join room</span></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
