import "./Login.scss"
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import context from "../../contexts/ContextsMoney";
import Queries from "../../js/Queries";
import Cookie from "../../js/Cookie";

type Props = {}

export default function Login({}: Props) {

  const nav = useNavigate();

  const [box, setBox] = useState<Boolean>(true);

  const imgChange = useRef(document.createElement("label"));

  const [registInfo, setRegistInfo] = useState<any>({
    "username": "",
    "email": "",
    "phone": "",
    "full_name": "",
    "password": "",
    "password_repeat": "",
    "image": null
  })
  const [loginInfo, setLoginInfo] = useState<any>({
    "username": "",
    "password": ""
  })

  const obj = useContext<any>(context);
  const [setError, setWhatUser] = [obj.setError, obj.setWhatUser];

  return (
    <div className='Login'>
        <div className="container">
          <div className="Login__box">
            <div className={`Login__boxMargi ${box? "":"Login__box_active"}`} >
              <form className="Login__boxLog" onSubmit={(e)=>{
                e.preventDefault();

                Queries.query("http://mycoursework/login", loginInfo)
                .then((data)=>{
                  Cookie.setCookie("token", data.data.token, data.data.timeLive);
                  setWhatUser({
                    user: true,
                    admin: data.data.admin,
                    trader: data.data.trader,
                  });
                  nav("/");
                })
                .catch((data)=>{
                  setError({
                    "status": true,
                    "textError": data.response.data.message,
                    "isBad": true
                  });
                })
              }}>
                <h2>Войти</h2>
                <div className="Login__collumn">
                  <input type="text" value={loginInfo.username} onChange={(e)=>{
                    let newloginInfo = {...loginInfo};
                    newloginInfo.username = e.target.value;
                    setLoginInfo(newloginInfo)
                  }} placeholder="Логин/Email" />
                  <input autoComplete="off" value={loginInfo.password} type="password" onChange={(e)=>{
                    let newloginInfo = {...loginInfo};
                    newloginInfo.password = e.target.value;
                    setLoginInfo(newloginInfo)
                  }} placeholder="********" />
                </div>
                <button className="Login__btn">Войти</button>
              </form>
              <form className="Login__boxReg" onSubmit={(e)=>{
                e.preventDefault();
                let checkButton:HTMLInputElement | null = document.querySelector("#checkPolit");
                if(registInfo.password !== registInfo.password_repeat){
                  setError({
                    "status": true,
                    "textError": "Пароли не совпадают",
                    "isBad": true
                  });
                  return;
                }
                if(!checkButton?.checked){
                  setError({
                    "status": true,
                    "textError": "Вы не ознокомились с политикой",
                    "isBad": true
                  });
                  return;
                }
                
                Queries.query("http://mycoursework/register", registInfo)
                .then((data)=>{
                  setError({
                    "status": true,
                    "textError": <p>{data.data.message}, <span style={{cursor: "pointer", color: "greenyellow"}} onClick={()=>{setBox(true);}}>Войти</span></p>,
                    "isBad": false
                  });
                  setRegistInfo({
                    "username": "",
                    "email": "",
                    "phone": "",
                    "full_name": "",
                    "password": "",
                    "password_repeat": "",
                    "image": null
                  });
                })
                .catch((data)=>{
                  setError({
                    "status": true,
                    "textError": data.response.data.message,
                    "isBad": true
                  });
                })
              }}>
                <h2>Регистрация</h2>
                <div className="Login__flex">
                  <div className="Login__collumn">
                    <input type="text" placeholder="Логин" value={registInfo.username} minLength={5} required onChange={(e)=>{
                      let obj = {...registInfo};
                      obj.username = e.target.value;
                      setRegistInfo(obj);
                    }}/>
                    <input type="email" placeholder="Ваша почта" value={registInfo.email} minLength={6} required onChange={(e)=>{
                      let obj = {...registInfo};
                      obj.email = e.target.value;
                      setRegistInfo(obj);
                    }}/>
                    <input type="tel" placeholder="Телефон" value={registInfo.phone} pattern="[7]{1}[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}" maxLength={11} required onChange={(e)=>{
                      let obj = {...registInfo};
                      obj.phone = e.target.value;
                      setRegistInfo(obj);
                    }}/>
                  </div>
                  <div className="Login__collumn">
                    <input type="text" placeholder="Имя" value={registInfo.full_name} required onChange={(e)=>{
                      let obj = {...registInfo};
                      obj.full_name = e.target.value;
                      setRegistInfo(obj);
                    }}/>
                    <input autoComplete="off" minLength={7} value={registInfo.password} type="password" placeholder="Пароль" required onChange={(e)=>{
                      let obj = {...registInfo};
                      obj.password = e.target.value;
                      setRegistInfo(obj);
                    }}/>
                    <input autoComplete="off" minLength={7} value={registInfo.password_repeat} type="password" placeholder="Повторите пароль" required onChange={(e)=>{
                      let obj = {...registInfo};
                      obj.password_repeat = e.target.value;
                      setRegistInfo(obj);
                    }}/>
                  </div>
                </div>
                <input id="Avatar" type="file" accept="image/png, image/jpeg, image/webp" onChange={(e:any)=>{
                  let fileReader = new FileReader();
                  fileReader.onload = ()=>{
                    imgChange.current.style.backgroundImage = `url(${fileReader.result})`;
                    let obj = {...registInfo};
                    obj.image = fileReader.result;
                    setRegistInfo(obj);
                  }
                  fileReader.readAsDataURL(e.target.files[0])
                }}/>
                <label ref={imgChange} className="Login__labelAvatar" htmlFor="Avatar"></label>
                <button className="Login__btn">Зарегистрироваться</button>
                <input type="checkbox" id="checkPolit"/>
                <label htmlFor="checkPolit" className="Login__checkPolit">
                  <p>
                    <span>Ознакомился с </span> 
                    <Link to="/politPage">политикой конфидициальности</Link>
                  </p>
                </label>
              </form>
            </div>


          </div>
          <p className="Login__changeBox">
            <span onClick={()=>{
              setBox(true);
            }} className={box? "Login__changeBox_active":""}>Войти </span>
            /
            <span onClick={()=>{
              setBox(false);
            }} className={box? "":"Login__changeBox_active"}> Регистрация</span>
          </p>
        </div>
    </div>
  )
}