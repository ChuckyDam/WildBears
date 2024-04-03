import { useState } from 'react'
import './App.scss'
import AppRouter from './assets/components/AppRouter'
import Footer from './assets/components/Footer/Footer'
import ModalSideBar from './assets/components/ModalSideBar/ModalSideBar'
import Navbar from './assets/components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'

function App() {

  const [modal, setModal] = useState<Boolean>(true);

  return (
    <BrowserRouter>
      <Navbar stateModal={[modal, setModal]}/>
        <main className='Main'>
          <div className="Content">
            <AppRouter/>
          </div>
          <Footer/>
          <ModalSideBar stateModal={[modal, setModal]}>
            <div className='Main__container'>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
              <p>Hi</p>
            </div>
          </ModalSideBar>
        </main>
    </BrowserRouter>
  )
}

export default App
