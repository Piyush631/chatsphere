import BlurImage from '../assets/buble.webp';
import { FaRegUser } from "react-icons/fa";
import { MdVideoLabel } from "react-icons/md";
import { easeInOut, motion } from "motion/react"
import {  useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { roomname, username, wssocket } from "../atoms/Recoilatoms";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { IoIosArrowForward } from "react-icons/io";

export function BlurPage() {
  
  
  const formSchema=z.object({
    roomid:z.string().min(4,'room id is too small'),
    username:z.string().min(5,"username is too small")

  })
  type FormData=z.infer<typeof formSchema>;
  
  
  
  
  
  
  
  
  
   // const roomid = useRef<HTMLInputElement>(null);
   // const usernamevalue = useRef<HTMLInputElement>(null);
const[name,setname]=useRecoilState(username)
const[roomId,setRoomid]=useRecoilState(roomname)
const[dayname,setDayname]=useState(" ")
const[dayno,setDayno]=useState(" ")
const[min,setMin]=useState(" ")

const{register,
    handleSubmit,
    formState:{errors} ,
}=useForm<FormData>(
    {
        resolver:zodResolver(formSchema)
    }
)
 const onSubmit=(data:FormData)=>{
    console.log(data)

   
}




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
    function handleid(e:any){
        setRoomid(e.target.value)  
    }
    function handlename(e:any){
        setname(e.target.value)  
    }
    const navigate=useNavigate();
function joinroom(){
   
   
   if(name.length <4 )
   {
    return;
   }
    
  
    const ws:any=new WebSocket("http://localhost:8080")
    setWss(ws)
    ws.onopen=()=>{
        ws.send(JSON.stringify({
            type:"join",
            roomId:roomId,
            username:name
        
        
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
        

                    <input  {...register('roomid')}  onChange={handleid} className="h-9 px-12  text-lg rounded-2xl w-full p-2 placeholder-black/65 text-black bg-white/40  " type="text" placeholder='roomid'/>  
                    {errors.roomid && <p className="text-red-600">{errors.roomid.message} </p>} <br/>

                    </div> 
                    <div className='relative'>
                  <div className='absolute top-0.5 left-2  h-7.5 w-7.5 items flex items-center justify-center bg-white rounded-full'> 
                  
                  <div className='text-xs'><FaRegUser /></div>
                   </div>  
                    <input {...register('username')} onChange={handlename} className="h-9 px-12  text-lg rounded-2xl w-full p-2 placeholder-black/65 text-black bg-white/40  " type="text" placeholder='username'/>  
                    {errors.username && <p className="text-red-600">{errors.username.message} </p>} <br/>

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
                <div className=' relative h-[456px] w-72   bg-white rounded-2xl '>
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

                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div   onClick={joinroom} className=' cursor-pointer  relative right-8 flex items-center '>
                            <button className=' relative flex items-center px-1.5 py-1 border-2  bg-black text-white p-1 cursor-pointer    rounded-full' 
                            onClick={joinroom}>Join in 
                           
                            </button>
                            <div className='absolute left-14  h-3 w-4 bg-black'>

                            </div>
                            <div className='absolute  left-[61px] text-white  flex items-center justify-center h-8 w-8 rounded-full bg-black'>
                            <IoIosArrowForward />

</div>
                            </div>
                            </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
