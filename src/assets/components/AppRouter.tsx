import { Navigate, Route, Routes } from "react-router-dom"
import Main from "../pages/Main/Main"
import Profile from "../pages/Profile/Profile"
import Basket from "../pages/Basket/Basket"
import Login from "../pages/Login/Login"
import Address from "../pages/Address/Address"

import context from "../../assets/contexts/ContextsMoney";
import { useContext } from "react"
import AdminPanel from "../pages/AdminPanel/AdminPanel"
import TraderCab from "../pages/TraderCab/TraderCab"
import CreateProduct from "../pages/CreateProduct/CreateProduct"
import Product from "../pages/Product/Product"
import PolitPage from "../pages/PolitPage/PolitPage"
import HelperPage from "../pages/HelperPage/HelperPage"

type Props = {}

export default function AppRouter({}: Props) {

  const obj = useContext<any>(context);
  const [whatUser] = [obj.whatUser];

  const user = function(isUser: boolean){
    if(isUser){
      return (
        <>
          <Route path="/profile" element={<Profile/>}/>
        </>
      )
    }else{
      return (
        <>
          <Route path="/login" element={<Login/>}/>
        </>
      )
    }
  }
  const admin = function(isAdmin: boolean){
    if(isAdmin){
      return (
        <>
          <Route path="/adminPanel" element={<AdminPanel/>}/>
        </>
      )
    }
  }
  const trader = function(isTrader: boolean){
    if(isTrader){
      return (
        <>
          <Route path="/trader" element={<TraderCab/>}/>
          <Route path="/createProduct" element={<CreateProduct/>}/>
        </>
      )
    }
  }

  return (
    <Routes>
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
        <Route path="/search/:type/:search" element={<Main/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/basket" element={<Basket/>}/>
        <Route path="/address" element={<Address/>}/>
        <Route path="/politPage" element={<PolitPage/>}/>
        <Route path="/product/:product_id" element={<Product/>}/>
        <Route path="/helper/order" element={<HelperPage/>}/>

        {user(whatUser.user)}
        {admin(whatUser.admin)}
        {trader(whatUser.trader)}

        

    </Routes>
  )
}