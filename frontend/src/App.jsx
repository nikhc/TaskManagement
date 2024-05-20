import React,{useReducer,useContext,useEffect} from 'react'
import "./index.css"
import { initialState,reducer } from './reducer/UseReducer';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom'; // Import Navigate
import Home from './pages/Home'
import ImportantTask from './pages/ImportantTask'
import IncompleteTask from './pages/IncompleteTask'
import CompleteTask from './pages/CompleteTask'
import AllTask from './pages/AllTask'

import Signup from './pages/Signup'
import Login from './pages/Login'
export const userContext=React.createContext()
function Problem(){
  const{state,dispatch}=useContext(userContext)
  const navigate=useNavigate();
  
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    dispatch({type:"USER",payload:userInfo})
    
  
    if(userInfo){
      navigate("/")
    }
    else{
      navigate("/login")

    }
  
  },[])
    return (
      <Routes>
      <Route exact path="/" element={<Home />}>
        <Route index element={<AllTask />} />
        <Route path="/incomplete" element={<IncompleteTask />} />
      <Route path="/complete" element={<CompleteTask />} />
      <Route path="/important" element={<ImportantTask />} />
      </Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    
    </Routes>
      
  
    )
  
  }


export default function App() {
  const[ state,dispatch]=useReducer(reducer,initialState)
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
       <userContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <Problem></Problem>
       
      </BrowserRouter>

      </userContext.Provider>
    </div>
  )
}
