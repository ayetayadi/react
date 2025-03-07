import { Navigate, Route, Routes } from "react-router-dom"
import Hello from "../hello/Hello"
import Menu from "../menu/Menu"

function StudentRoutes(){

    return( <div>
        <Menu/>
        <Routes>
          <Route path="" element={<Navigate to ="hello"/>}/>
          <Route path="/hello" element={<Hello/>}/>
        </Routes>
    </div>
    )
}

export default StudentRoutes
