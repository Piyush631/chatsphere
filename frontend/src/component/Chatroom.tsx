import { useRecoilState } from "recoil"
import { username, wssocket } from "../atoms/Recoilatoms"
import { useEffect, useRef, useState } from "react"
import BlurImage from '../assets/chat3.webp';
import { m } from "motion/react";
export function ChatRoom(){
    const[name,]=useRecoilState(username)
    const[wss,]:any=useRecoilState(wssocket)
    const [messages, setMessages] = useState<{ message: string; user: string }[]>([

      ]);
       const inputref = useRef<HTMLInputElement>(null);
    function sendMessage(){
     
        const message=inputref.current?.value;
        
                wss.send(JSON.stringify({
                    type:"chat",
                    username:name,
                    message:message
                
                
            }))
        
    
    
    }
    useEffect(() => {
        wss.onmessage = (event: { data: string }) => {
          try {
            const msg = JSON.parse(event.data);
    

            if (msg.message && msg.user) {
              setMessages((prevMessages) => [...prevMessages, msg]);
              console.log(messages)
            }
          } catch (error) {
            console.error("Failed to parse incoming message:", error);
          }
        };
      }, [wss]);
      

    return(
        <div 
        style={{
          backgroundImage: `url(${BlurImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
      }}
        className="h-screen w-full flex items-center justify-center ">
            <div className="h-[520px]  flex flex-col justify-between w-[480px]  rounded-2xl backdrop-filter bg-[#7D7352]/60 backdrop-blur-lg  opacity-95">
            <div className="border-b-[0.5px] border-white/30  flex justify-between px-4 rounded-t-2xl h-24 w-full">
            <div className="flex items-center justify-center  gap-2">
              <div className="h-11 w-11  rounded-full">
                <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg" className="rounded-full h-10 w-10"/>
              </div>
              <div className="text-white">Piyush</div>
            </div>
            <div className="flex items-center">
              <button className="bg-white p-1 px-1.5 text-sm font-medium rounded-2xl ">Leave room</button>
            </div>
            
            
            </div>
                <div className=" overflow-y-auto overflow-x-hidden
  h-7/8 w-full flex flex-col scrollbar-hide ">
           
        {messages.map(m=> <div className="flex flex-col">{m.user===name ? 
            <div className=" h-auto flex p-2 justify-end">
               <div className="bg-[#AEA28D] p-1  min-w-5 h-auto  rounded-l-2xl rounded-t-2xl mt-1 max-w-64 ">
           <div className="break-all line-clamp-none"> 
            
          <span className=" leading-5 line-clamp-none">{m.message}</span>  </div> 
               </div>
              
                
                
                </div> : 
            <div className=" h-auto flex p-2 ">
            <div className="bg-[#5A4B29] p-1 text-white min-w-5 h-auto  rounded-r-2xl rounded-t-2xl mt-1 max-w-64 ">
        <div className="break-all"> 
            <div className="flex items-center gap-1 ">
            <div className="h-4 w-4 bg-gray-700 pb-1 rounded-full text-xs flex items-center justify-center">{m.user.charAt(0)}</div>  
            {m.user}
            </div>
  
         <span className="leading-none line-clamp-none">   {m.message} </span> </div> 
            </div>
           
             
             
             </div>
            
            
            
            
            } </div>)}
            
                </div>
                <div className="    rounded-b-2xl h-20 pt-4 bg-[#AE9B86] flex  items-center px-1 pb-1 gap-2">
                <input  ref={inputref} type="text" className="h-9  text-white  p-1 w-96 placeholder-white/80 text-md rounded-lg  bg-[#866F55]" placeholder="Write sometheing" />
                <button onClick={sendMessage}className="h-9 w-20 font-medium rounded-lg  bg-white">Send</button>
                </div>
            </div>
           
        </div>
    )
}