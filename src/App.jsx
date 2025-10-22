import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Layout from './components/Layout'
import ProductDetails from './components/ProductDetails' 
import CartSummary from './components/CartSummary' 
import Checkout from './components/Checkout'
import Login from './components/Login'
import Regester from './components/Regester'
import {  UserContextProvidre } from './context/UserContext'

let x = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {path:'/',element:<Home/>},
    {path:'product/:id',element:<ProductDetails/>}, 
    {path:'cart',element:<CartSummary/>},
    {path:'checkout',element:<Checkout/>}, 
    {path:'login',element:<Login/>},
    {path:'regester',element:<Regester/>},

      ]}
])
function App() {
  return <UserContextProvidre>
      <RouterProvider router={x}>
  </RouterProvider>
  </UserContextProvidre>
  


}

export default App