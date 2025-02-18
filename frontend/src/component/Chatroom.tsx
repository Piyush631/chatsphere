import { useRecoilState } from "recoil"
import { roomname, username, wssocket } from "../atoms/Recoilatoms"
import { useEffect, useRef, useState } from "react"
import BlurImage from '../assets/chat3.webp';
import { CiImageOn } from "react-icons/ci";
import {  useNavigate } from "react-router-dom";


export function ChatRoom(){
    const[name,setname]=useRecoilState(username)
    const[,setRoomid]=useRecoilState(roomname)
    const[wss,]:any=useRecoilState(wssocket)
  const[color,setColor]=useState(" ")
    const [messages, setMessages] = useState<{
      image?: string; message: string; user: string 
}[]>([

      ]);
      const[newdate,setNewdate]=useState(" ") 
       const inputref = useRef<HTMLInputElement>(null);
    function sendMessage(image:string | null =null){
    
   
     
     const message=inputref.current?.value;
        
wss.send(JSON.stringify({
    type:"chat",
    username:name,
    message:message,
    image:image
    


}))
     
     
if (inputref.current) {
  inputref.current.value = ""; 
}
        
    
    
    }
    
  async function sendImage(e:any){
    const file=e.target.files[0]
    if (!file) return;
    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend=async()=>{
      sendMessage(reader.result as string)
    }
    
  }
    
  const text=document.getElementById("smstext")
  text?.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
      e.preventDefault();
      document.getElementById("enter")?.click();
    }
  })
    useEffect(() => {
        wss.onmessage = (event: { data: string }) => {
          try {
            const msg = JSON.parse(event.data);
    

            if (msg.message || msg.image) {
              setMessages((prevMessages) => [...prevMessages, msg]);
           
            }
          } catch (error) {
            console.error("Failed to parse incoming message:", error);
          }
        };
      }, [wss]);
      
useEffect(()=>{
  let date=new Date();
  setNewdate(date.toDateString())
},[])
useEffect(()=>{
  let letters='0123456789ABCDEF';
  let newcolor='#';
  for(let i=0;i<6;i++)
  {
    newcolor+=letters[(Math.floor(Math.random()*16))];
  }
  setColor(newcolor)

},[])
const navigate=useNavigate();
function leaveroom(){
  wss.close();
  setname(" ")
setRoomid(" ")
  navigate("/");
}
    return(
        <div 
        style={{
          backgroundImage: `url(${BlurImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
      }}
        className="h-screen w-full flex items-center justify-center ">
            <div className="md:h-[520px] h-[440px]  flex flex-col justify-between md:w-[480px]  w-[380px] rounded-2xl backdrop-filter bg-[#7D7352]/60 backdrop-blur-lg  opacity-95">
            <div className="border-b-[0.5px] border-white/30  flex justify-between px-4 rounded-t-2xl h-24 w-full">
            <div className="flex items-center justify-center  gap-2">
              <div className="h-11 w-11  rounded-full">
                <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg" className="rounded-full h-10 w-10"/>
              </div>
              <div className="text-white">{name}</div>
            </div>
            <div className="flex items-center">
              <button  onClick={leaveroom} className="bg-white cursor-pointer p-1 px-1.5 text-sm font-medium rounded-2xl ">Leave room</button>
            </div>
            
            
            </div>
                <div className=" overflow-y-auto overflow-x-hidden
  h-7/8 w-full flex flex-col no-scrollbar ">
           <div className="text-center text-white/80">{newdate}</div>
               
        {messages.map(m=> <div className="flex flex-col">{m.user===name ? 
        
            <div className=" h-auto flex  p-2 justify-end ">
         
        
         <div  className="bg-[#AEA28D] p-1  min-w-5 h-auto  rounded-l-2xl rounded-t-2xl mt-1 max-w-64 ">
           <div className="break-all line-clamp-none"> 
           
          <span className=" leading-5 line-clamp-none">{m.message}
            
            
            </span> 
     
             </div> 
             {m.image && <img src={m.image}  height={70} width={140}/>} 
         </div>
               
              
                
                
                </div> : 
            <div className=" h-auto flex p-2 ">
            <div className="bg-[#5A4B29] p-1 text-white min-w-5 h-auto  rounded-r-2xl rounded-t-2xl mt-1 max-w-64 ">
        <div className="break-all"> 
            <div className="flex items-center gap-1 ">
            <div className={`h-4 w-4   pb-1 rounded-full text-xs flex items-center justify-center`}
              style={{ backgroundColor: color }}
            
            
            >{m.user.charAt(0)}</div>  
            {m.user}
            </div>
  
         <span className="leading-none line-clamp-none">   {m.message} </span> 
       
         </div> 
         {m.image && <img src={m.image}  height={70} width={140}/>} 
            </div>
           
             
             
             </div>
            
            
            
            
            } </div>)}
            
                </div>
                <div className="    rounded-b-2xl h-20 pt-4 bg-[#AE9B86] flex  items-center px-1 pb-1 gap-2">
                  <label htmlFor="file" className="text-3xl"> 
                  <CiImageOn />
                  <input type="file" id="file" style={{display:'none'}} onChange={sendImage} accept="image/jpg,image/png,image/jpeg,image/gif"/>
                  </label>
            
                <input  id="smstext" ref={inputref} type="text" className="h-9  text-white  p-1 w-96 placeholder-white/80 text-md rounded-lg  bg-[#866F55]" placeholder="Write sometheing" />
                <button onClick={() => sendMessage()} id="enter" className="h-9 w-20 font-medium rounded-lg  bg-white">Send</button>
                </div>
            </div>
           
        </div>
    )
}