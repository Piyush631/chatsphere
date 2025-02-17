import {WebSocket, WebSocketServer } from 'ws';

const wss=new WebSocketServer({port:8080})
interface users{
    socket:WebSocket,
    roomId:string,
    username:string
}
const allsocket:users[]=[]
wss.on("connection",function(socket){
    socket.on("message",(message)=>{
        //@ts-ignore
        const parsedMessage=JSON.parse(message)
        console.log(parsedMessage)
        if(parsedMessage.type==="join")
            {
                allsocket.push({
                    socket,
                    roomId:parsedMessage.roomId,
                    username:parsedMessage.username
                })
                
            }

            if(parsedMessage.type==="chat")
            {
                let current=null;
                let user=null
                for(let i=0;i<allsocket.length;i++)
                {
                    if(allsocket[i].socket===socket)

                    {
                        current=allsocket[i].roomId;
                        user=allsocket[i].username;
                        
                    }
                }
                console.log(current);
                for(let i=0;i<allsocket.length;i++)
                {
                    const data=JSON.stringify({
                        message:parsedMessage.message,
                        user:user
                    })
                    if(allsocket[i].roomId===current)
                    {
                        
                        allsocket[i].socket.send(data)
                     //@ts-ignore
                        //allsocket[i].socket.send(user)
                    }
                }
            }
        
    })
})