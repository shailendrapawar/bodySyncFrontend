import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Login from './pages/authPages/Login.jsx'
import Layout from './Layout.jsx'
import Register from './pages/authPages/Register.jsx'
import UserProfile from './pages/userProfile/UserProfile.jsx'
import Nutrition from './pages/nutrition/Nutrition.jsx'
import AddPost from './pages/addPost/AddPost.jsx'
import Home from './pages/home/Home.jsx'
import Workout from './pages/workout/Workout.jsx'



const myRouter=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>

      <Route path='' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>} />

      <Route path='/home' element={<Home/>}/>
      <Route path='/userProfile/:userId' element={<UserProfile/>} />
      <Route path='/nutrition' element={<Nutrition/>} />
      <Route path='/addPost' element={<AddPost/>} />
      <Route path='/workout' element={<Workout/>}></Route>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={myRouter}/>
  </StrictMode>,
)
