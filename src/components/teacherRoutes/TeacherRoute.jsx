import { Outlet } from "react-router-dom";
import Menu from "../menu/Menu"

function TeacherRoutes(){
    return (
        <div>
            <Menu/>
            <Outlet/>
        </div>
    )
}

export default TeacherRoutes