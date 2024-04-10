import { useEffect, useState } from 'react'
import './App.scss'
import AppRouter from './assets/components/AppRouter'
import Footer from './assets/components/Footer/Footer'
import ModalSideBar from './assets/components/ModalSideBar/ModalSideBar'
import Navbar from './assets/components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Cookie from './assets/js/Cookie';
import Alert from './assets/components/Alert/Alert'

async function checkToken(token:string){
  let query = await axios.post(`http://mycoursework/token`, {"txt" : token});
  return query.data;
}

function App() {

  const [modal, setModal] = useState<Boolean>(true);

  const [error, setError] = useState<any>({
    "status": false,
    "textError": ""
  });

  const [whatUser, setWhatUser] = useState({
    user: false,
    admin: false,
    trader: false,
  });

  useEffect(()=>{
    checkToken("123")
    .then((data)=>{
      Cookie.setCookie("token", data.txt, 4);
      setWhatUser({
        user: false,
        admin: false,
        trader: false,
      });
    })
  }, []);

  return (
    <BrowserRouter>
      <Navbar whatUser={whatUser}  stateModal={[modal, setModal]}/>
      <main className='Main'>
        <div className="Content">
          <AppRouter/>
        </div>
        <Footer/>
      </main>
      <ModalSideBar stateModal={[modal, setModal]}>
          <div className='Main__container'>
            <button onClick={()=>{setError({status: true, textError: "Работаем"})}}>Ok</button>
          </div>
      </ModalSideBar>
      <Alert stateModal={[error.status, (value)=>{
          let newError = {...error};
          newError.status = value;
          setError(newError);
        }]} text={error.textError}/>
    </BrowserRouter>
  )
}

export default App
