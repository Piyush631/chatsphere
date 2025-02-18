"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allsocket = [];
wss.on("connection", function (socket) {
    socket.on("message", (message) => {
        try {
            //@ts-ignore
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === "join") {
                allsocket.push({
                    socket,
                    roomId: parsedMessage.roomId,
                    username: parsedMessage.username
                });
                return;
            }
            if (parsedMessage.type === "chat") {
                let current = null;
                let user = null;
                for (let i = 0; i < allsocket.length; i++) {
                    if (allsocket[i].socket === socket) {
                        current = allsocket[i].roomId;
                        user = allsocket[i].username;
                        break;
                    }
                }
                if (!current || !user)
                    return;
                const data = JSON.stringify({
                    message: parsedMessage.message,
                    user: user,
                    image: parsedMessage.image || null
                });
                for (let i = 0; i < allsocket.length; i++) {
                    if (allsocket[i].roomId === current) {
                        allsocket[i].socket.send(data);
                        //@ts-ignore
                        //allsocket[i].socket.send(user)
                    }
                }
            }
        }
        catch (err) {
            console.log("error in the statement");
        }
    });
    socket.on("close", () => {
        const index = allsocket.findIndex(user => user.socket === socket);
        if (index !== -1) {
            allsocket.splice(index, 1);
        }
        console.log(allsocket);
    });
});
