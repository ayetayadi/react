import { createContext, useEffect, useState } from 'react'
import './App.css'
import Menu from './components/menu/Menu'
import StudentRoutes from './components/studentRoutes/StudentRoute'
import TeacherRoutes from './components/teacherRoutes/TeacherRoute'
import Login from './pages/login/Login'
import TaskDetails from './pages/taskDetails/TaskDetails'
import TaskPage from './pages/taskPage/TaskPage'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import  { me } from "./services/tasks3.service"

export const UserContext = createContext()

function App() {

  const token = localStorage.getItem("token")

  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const user = await me()
        setUser(user)
        console.log("user: ", user)
      } catch (e) {}
    }
  if(token)    
    fetchMe()
  }, []);

  if (token && user.role == "admin"){
    return (
      <>
        <div>
          <UserContext.Provider value={user}>
        <h1>Bienvenue sur mon projet React ! 🎉</h1>
        <Router>
          <Routes>
          <Route path="/" element={<Navigate to ="/teachers"/>}/>
            <Route path="/teachers" element={<TeacherRoutes/>}>
            <Route path="" element={<Navigate to ="tasks"/>}/>
            <Route path="tasks" element={<TaskPage/>}/>
            <Route path="tasks/:id" element={<TaskDetails/>}/>
            </Route>  
          </Routes>
        </Router>
        </UserContext.Provider>
        </div> 
      </>
    )
  }

  if (token && user.role == "user"){
    return (
      <>
        <div>
        <h1>Bienvenue sur mon projet React ! 🎉</h1>
        <Router>
          <Menu/>
          <Routes>
            <Route path="/" element={<Navigate to ="/students"/>}/>
            <Route path="/students/*" element={<StudentRoutes/>}/>
          </Routes>
        </Router>
        </div>
        
      </>
    )
  }

  if (!token){
    return (
      <>
        <div>
        <h1>Bienvenue sur mon projet React ! 🎉</h1>
        <Router>
          <Menu/>
          <Routes>
            <Route path="*" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
        </div>  
      </>
    )
  }
  return <div>loading...</div>
}
export default App
