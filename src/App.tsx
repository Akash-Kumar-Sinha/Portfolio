import { Routes, Route } from "react-router-dom"
import Home from "./Components/Home"
import NoRoute from "./utils/NoRoute/NoRoute"

function App() {

  return (
    <Routes>
      {/* 
      <Header/>
      <DesktopSidebar/>
      <SideBar/>
      <MobileSidebar/>
    */}
    <Route path="/" element={<Home />}/>
    <Route path="*" element={<NoRoute/>}/>
    </Routes>
  )
}

export default App
