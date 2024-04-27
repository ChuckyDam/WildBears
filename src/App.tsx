import { useEffect, useRef, useState } from 'react'
import './App.scss'
import AppRouter from './assets/components/AppRouter'
import Footer from './assets/components/Footer/Footer'
import ModalSideBar from './assets/components/ModalSideBar/ModalSideBar'
import Navbar from './assets/components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'
import Cookie from './assets/js/Cookie';
import Alert from './assets/components/Alert/Alert'

import {MoneyProvider} from "./assets/contexts/ContextsMoney.tsx";
import Queries from "./assets/js/Queries";


const сurrencies = ["RUB", "USD", "KZT", "BYN", "CNY"] as const

type CurrencyKey = typeof сurrencies[number];


type Currency = {
  "name": string,
  "rubls": number,
  "sign": string
}

type Currencies = {
  "RUB": Currency,
  "USD": Currency,
  "KZT": Currency,
  "BYN": Currency,
  "CNY": Currency,
}

function App() {

  const currencies = useRef<Currencies>({
    "RUB": {"name": "RUB","rubls": 1,"sign":"₽"},
    "USD": {"name": "USD","rubls": 0.011,"sign":"$"},
    "KZT": {"name": "KZT","rubls": 4.76,"sign":"₸"},
    "BYN": {"name": "BYN","rubls": 0.035,"sign":"Br"},
    "CNY": {"name": "CNY","rubls": 0.077,"sign":"¥"},
  });

  const [modal, setModal] = useState<Boolean>(true);

  const [error, setError] = useState<any>({
    "status": false,
    "textError": "",
    "isBad": true
  });

  const [whatUser, setWhatUser] = useState({
    user: false,
    admin: false,
    trader: false,
  });

  const [currency, setCurrency] = useState<CurrencyKey>("RUB");

  const [address, setAddress] = useState<string>("");

  const [types, setTypes] = useState<Array<string>>([]);

  useEffect(()=>{
    Queries.getGoToken("null", "http://mycoursework/category")
    .then(data =>{
      let categories = data.map((el:any)=>el.name_category)
      setTypes(categories);
    })
  }, []);

  useEffect(()=>{
    let token = Cookie.getCookie("token");
    if (!token) return;
    Queries.checkToken(token)
    .then((data)=>{
      Cookie.setCookie("token", data.token, data.timeLive);
      setWhatUser({
        user: true,
        admin: data.admin,
        trader: data.trader,
      });
    })
    .catch(()=>{
      console.log("This message doesn't exist");
    })

  }, []);

  return (
    <MoneyProvider value={{currency, setCurrency, currencies, error, setError, whatUser, setWhatUser, address, setAddress, types}}>
      <BrowserRouter>
        <Navbar stateModal={[modal, setModal]}/>
        <main className='Main'>
          <div className="Content">
            <AppRouter/>
          </div>
          <Footer/>
        </main>
        <ModalSideBar stateModal={[modal, setModal]} types={types}>
          {/* <button onClick={()=>{setError({status: true, textError: "Работаем", isBad: true})}}>Ok</button> */}
        </ModalSideBar>
        <Alert stateModal={[error.status, (value)=>{
            let newError = {...error};
            newError.status = value;
            setError(newError);
        }]} text={error.textError}/>
      </BrowserRouter>
    </MoneyProvider>
  )
}

export default App
