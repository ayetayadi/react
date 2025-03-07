import { NavLink } from "react-router-dom"

function Menu() {
    return (
    <div>
        <ul>
            <li>
                <NavLink to="/students/hello" style={(params) => params.isActive ? { color: "red" } : undefined}>Hello</NavLink>
            </li>
            <li>
                <NavLink to="/teachers/tasks">My Tasks</NavLink>
            </li>
        </ul>
    </div>)
}

export default Menu