
import { motion } from "motion/react"
import {  useRef } from "react";
import { Bounce, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { roomname, username, wssocket } from "../atoms/Recoilatoms";
import { useNavigate } from "react-router-dom";


export function Signin(){
    const inputref = useRef<HTMLInputElement>(null);
    const roomid = useRef<HTMLInputElement>(null);
    const usernamevalue = useRef<HTMLInputElement>(null);
const[,setname]=useRecoilState(username)
const[,setRoomid]=useRecoilState(roomname)
const[,setWss]=useRecoilState(wssocket)
    function generateid(){
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetters =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));
        const randomNumber = Math.floor(Math.random() * 900) + 100; 
    
        const id = `${randomLetters}${randomNumber}`;
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
            const message:any=inputref.current?.value;
            setname(message)
            setRoomid(id)
            const ws:any=new WebSocket("http://localhost:8080")
            setWss(ws)
            ws.onopen=()=>{
                ws.send(JSON.stringify({
                    type:"join",
                    roomId:id,
                    username:message
                
                
            }))
            }
      
          
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
        <motion.div initial={{opacity:0,scale:0}} 
        
        animate={{opacity:1,scale:1}}
        transition={{duration:1,ease:"easeInOut"}}
        className="relative  h-screen  w-screen text-white flex flex-col  pt-14  gap-24 items-center ">
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className=" text-4xl md:text-6xl font-semibold">Join a room</div>
              
                    <input ref={roomid} type="text" className="h-9 rounded-lg px-2 w-56  md:w-64 hover:border-gray-400  border-white border-1" placeholder="Enter Room ID" />
          
                    <input ref={usernamevalue} type="text" className="h-9 rounded-lg px-2 w-56  md:w-64 hover:border-gray-400  border-white border-1" placeholder="Username" />
                    <button onClick={joinroom} className="h-9 rounded-lg px-1 w-32 hover:border-gray-400  border-white border-1" > Join room </button>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="md:text-5xl text-3xl font-semibold">
                    Generate a Room
                </div>
                <input  ref={inputref} type="text" className="h-9 rounded-lg px-2 w-56  md:w-64 hover:border-gray-400  border-white border-1" placeholder="Enter Username" />

                <button className="h-9 rounded-lg px-1 w-32 hover:border-gray-400  border-white border-1" onClick={generateid} >Create Room
                </button>

            </div>
        </motion.div>
    )
}