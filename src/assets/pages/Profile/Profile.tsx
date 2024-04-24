import { useContext, useEffect, useState } from "react";
import Cookie from "../../js/Cookie";
import "./Profile.scss";
import Queries from "../../js/Queries";
import context from "../../contexts/ContextsMoney";
import avatar from "../../images/profile.svg";

type Props = {}

interface Query {
  query_id: number,
  created_at: string,
  deliver_to: string,
  query_price: number,
  name_product: string,
  product_id: number,
  quantity_to: number,
  address_storage: string,
  status_name: string,
  preview_img: string
}

interface User {
  username: string,
  phone: string,
  email: string, 
  full_name: string, 
  img_profile: string
}

export default function Profile({}: Props) {

  const [queries, setQueries] = useState<Array<Query>>([]);
  const [user, setUser] = useState<User|null>(null);
  

  const obj = useContext<any>(context);
  const [money, currencies] = [obj.currency, obj.currencies];

  useEffect(()=>{
    let token = Cookie.getCookie("token");
    if(!token) window.location.href = "/";
    else {
      Queries.getGoToken(token, "http://mycoursework/query/getuser")
      .then((data)=>{
        setQueries(data);
      })
      .catch((e)=>{
        console.log(e);
      })
      Queries.getGoToken(token, "http://mycoursework/profile")
      .then((data)=>{
        setUser(data);
      })
      .catch((e)=>{
        console.log(e);
      })
      
    }
  }, [])

  return (
    <div className="Profile">
      <div className="container">
        <h2>Ваш профиль</h2>
        <div className="Profile__info">
          <img src={user?.img_profile ?"http://mycoursework/project/webroot/images/usersImg/"+user.img_profile : avatar} alt="userAvatar"/>
          <p className="username">{user?.username}</p>
          <p>Email: {user?.email}</p>
          <p>Телефон: {user?.phone}</p>
          <p>Имя: {user?.full_name}</p>
          <a className="Profile__exit" href="/" onClick={()=>{
            Cookie.deleteCookie("token");
          }}>Выйти</a>
        </div>

        {
          queries.length > 0?
          <>
            <h2>Заказы:</h2>
            <div className="Profile__queries">
              {
                queries.map((el)=>{
                  let curr = currencies.current[money];
                  return (
                    <div key={el.query_id} className="Profile__query">
                      <div className="Profile__queryInfo" onClick={()=>{console.log(el.product_id)}}>
                        <img src={"http://mycoursework/project/webroot/images/previewProducts/"+el.preview_img} alt="ris"/>
                        {el.name_product} * {el.quantity_to}
                      </div>
                      <p>Цена: {(+el.query_price * curr.rubls).toLocaleString('ru-RU')} {curr.sign}</p>
                      <div className="Profile__queryAddress">
                        <p>Откуда: {el.address_storage}</p>
                        <p>Куда: {el.deliver_to}</p>
                      </div>
                      <p>Дата заказа: {el.created_at}</p>
                      <p>Статус: {el.status_name}</p>
                    </div>
                  )
                })
              }
            </div>
          </>
          :<h2>Оформленных заказов нет</h2>
        }
      </div>
    </div>
  )
}