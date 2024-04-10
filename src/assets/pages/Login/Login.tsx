import "./Login.scss"
import { useRef, useState } from "react";
import axios from "axios";

type Props = {}

const regOn = async function(obj:any){
  return await axios.post("http://mycoursework/register", obj);
}

export default function Login({}: Props) {

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

  return (
    <div className='Login'>
        <div className="container">
          <div className="Login__box">
            {
              box?
              <form className="Login__boxLog">
                <h2>Войти</h2>
                <input  type="text" value={loginInfo.username} onChange={(e)=>{
                  let newloginInfo = {...loginInfo};
                  newloginInfo.username = e.target.value;
                  setLoginInfo(newloginInfo)
                }} placeholder="Логин/Email" />
                <input id="Password" autoComplete="off" value={loginInfo.password} type="password" onChange={(e)=>{
                  let newloginInfo = {...loginInfo};
                  newloginInfo.password = e.target.value;
                  setLoginInfo(newloginInfo)
                }} placeholder="********" />
                <button className="Login__btn">Войти</button>
              </form>
              :
              <form className="Login__boxReg" onSubmit={(e)=>{
                e.preventDefault();
                regOn(registInfo).then((data)=>{console.log(data)})
              }}>
                <h2>Регистрация</h2>
                <input type="text" placeholder="Логин" minLength={5} required onChange={(e)=>{
                  let obj = {...registInfo};
                  obj.username = e.target.value;
                  setRegistInfo(obj);
                }}/>
                <input type="email" placeholder="Ваша почта" required onChange={(e)=>{
                  let obj = {...registInfo};
                  obj.email = e.target.value;
                  setRegistInfo(obj);
                }}/>
                <input type="tel" placeholder="Телефон" value={registInfo.phone} pattern="[7]{1}[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}" maxLength={11} required onChange={(e)=>{
                  let obj = {...registInfo};
                  obj.phone = e.target.value;
                  setRegistInfo(obj);
                }}/>
                <input type="text" placeholder="Имя" required onChange={(e)=>{
                  let obj = {...registInfo};
                  obj.full_name = e.target.value;
                  setRegistInfo(obj);
                }}/>
                <input autoComplete="off" type="password" placeholder="Пароль" required onChange={(e)=>{
                  let obj = {...registInfo};
                  obj.password = e.target.value;
                  setRegistInfo(obj);
                }}/>
                <input autoComplete="off" type="password" placeholder="Повторите пароль" required onChange={(e)=>{
                  let obj = {...registInfo};
                  obj.password_repeat = e.target.value;
                  setRegistInfo(obj);
                }}/>
                <input id="Avatar" type="file" accept="image/png, image/jpeg, image/webp" placeholder="Повторите пароль" onChange={(e:any)=>{
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
              </form>
            }


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