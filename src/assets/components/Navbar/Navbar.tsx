import { useContext, useState } from "react";
import MenuSVG from "../MenuSVG/MenuSVG"
import styles from "./Navbar.module.scss"
import { useNavigate } from "react-router-dom";

import context from "../../contexts/ContextsMoney";
import SelectCurrency from "../SelectCurrency/SelectCurrency";

type Props = {
  stateModal: [React.SetStateAction<Boolean>, React.Dispatch<React.SetStateAction<Boolean>>]
}

interface linke {
  name: string;
  link: string;
  class: string;
}

interface linkes {
  const: Array<linke>;
  unlog: Array<linke>;
  admin: Array<linke>;
  user: Array<linke>;
  trader: Array<linke>;
}

const links:linkes = {
  "const": [
    {name: "Адреса", link: "/addresses", class: styles.Navbar__address},
    {name: "Корзина", link: "/basket", class: styles.Navbar__basket},
  ],
  "unlog": [
    {name: "Войти", link: "/login", class: styles.Navbar__login}
  ],
  "admin": [
    {name: "Панель", link: "/adminPanel", class: styles.Navbar__panel},
  ],
  "user": [
    {name: "Профиль", link: "/profile", class: styles.Navbar__profile}
  ],
  "trader": [
    {name: "Товары", link: "/trader", class: styles.Navbar__trader},
  ],
}

export default function Navbar({stateModal}: Props) {
    
  const [effect, setEffect] = stateModal;

  const obj = useContext<any>(context);
  const [address] = [obj.address];
  const whatUser = obj.whatUser;

  const [valueSearch, setValueSearch] = useState<string>("");

  const nav = useNavigate();

  

  return (
    <nav className={styles.Navbar + " Header"}>
        <div className={styles.container + " container"}>
          <div className={styles.Navbar__upline}>

            <SelectCurrency/>

            <div className={styles.Navbar__place + " " + styles.Navbar__uplineElement} onClick={()=>{nav("/address")}}>
              <div className={styles.ImgPlace}></div> <span className={styles.NamePlace}>{address?address:"Адресс не указан"}</span>
            </div>

          </div>
          <div className={styles.Navbar__base}>

            <MenuSVG state={[effect, setEffect]} className={styles.Navbar__burger}/>

            <h2 onClick={()=>{nav("/")}}>WILDBEARS</h2>

            <form onSubmit={(e)=>{e.preventDefault()}} className={styles.Navbar__searchBox}>
              <input value={valueSearch} onChange={(e)=>{setValueSearch(e.target.value)}} id={styles.searchProducts} className={styles.Navbar__search} type="search" placeholder="Я ищу..." onKeyDown={(e)=>{
                if(e.keyCode === 13) {
                  if (valueSearch === "") nav(`/search/${"null"}/${"null"}`)
                  else nav(`/search/${"null"}/${valueSearch}`)
                }
              }}/>
              <label htmlFor={styles.searchProducts}></label>
            </form>

            <div className={styles.Navbar__links}>
            {
              links["const"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
            }
            {
              whatUser.user ?
              links["user"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
              :
              links["unlog"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
            }
            {
              whatUser.user && whatUser.admin ? 
              links["admin"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
              : ""
            }
            {
              whatUser.user && whatUser.trader ?
              links["trader"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
              : ""
            }

            </div>
          </div>
        </div>
    </nav>
  )
}