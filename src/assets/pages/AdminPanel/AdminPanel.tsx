import { useEffect, useState } from "react"
import "./AdminPanel.scss"
import Queries from "../../js/Queries";
import Cookie from "../../js/Cookie";
import avatar from "../../images/profile.svg";

type Props = {}

interface User {
  email: string
  full_name: string
  img_profile: string
  isAdmin: boolean
  isBanned: boolean
  isTrader: boolean
  phone: string
  user_id: number
  username: string
}

export default function AdminPanel({}: Props) {

  const [users, setUsers] = useState<Array<User>>([]);

  

  useEffect(()=>{
    let token = Cookie.getCookie("token");
    if (!token) {window.location.href = "/"; return;}
    Queries.getGoToken(token,"http://mycoursework/users")
    .then(data=>{
      setUsers(data);
    })
  }, [])

  return (
    <div className="AdminPanel">
      <div className="container">
        <div className="AdminPanel__users">
          {
            users.map((user)=>{

              let roleButton = 
              <div className="btns">
                {
                  user.isAdmin?<div className="Admin">Администратор</div>
                  :<div className="User">Пользователь</div>
                }
                {
                  user.isTrader?
                  <button className="AdminPanel__ban" onClick={()=>{
                    console.log(user.user_id)
                  }}>Удалить продавца</button>
                  :<button className="AdminPanel__setTrader" onClick={()=>{
                    console.log(user.user_id)
                  }}>Установить продавца</button>
                }
                {
                  user.isAdmin? ""
                  :user.isBanned?
                  <button className="AdminPanel__ban" onClick={()=>{
                    console.log(user.user_id)
                  }}>Разблокировать</button>
                  :<button className="AdminPanel__ban" onClick={()=>{
                    console.log(user.user_id)
                  }}>Заблокировать</button>
                }

              </div>

              return (
                <div className="AdminPanel__user" key={user.user_id}>
                  <img src={user?.img_profile ?"http://mycoursework/project/webroot/images/usersImg/"+user.img_profile : avatar} alt="userAvatar"/>
                  <p className="username">{user.username}</p>
                  <p>Email: {user.email}</p>
                  <p>Телефон: {user.phone}</p>
                  <p>Имя: {user.full_name}</p>
                  {roleButton}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}