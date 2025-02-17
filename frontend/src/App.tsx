
import { ToastContainer } from "react-toastify"
import { MainPage } from "./page/MainPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ChatRoom } from "./component/Chatroom"
import { RecoilRoot } from "recoil"


 function App() {
 
return (
  <div> 
 

 
 <ToastContainer/>
   <RecoilRoot>


<BrowserRouter>
<Routes>
  <Route path="/" element={<MainPage/>} />
  <Route path="/chatroom" element={<ChatRoom/>} />
</Routes>
</BrowserRouter>
</RecoilRoot>

  </div>
)
}

export default App
