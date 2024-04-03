import { useState } from "react";
import MenuSVG from "../MenuSVG/MenuSVG"
import styles from "./Navbar.module.scss"
import { useNavigate } from "react-router-dom";

type Props = {
  stateModal: [React.SetStateAction<Boolean>, React.Dispatch<React.SetStateAction<Boolean>>],
}

const сurrencies = ["RUB", "USD", "KZT", "BYN", "CNY"] as const

type Currency = typeof сurrencies[number];

interface linke {
  name: string;
  src: string;
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
    {name: "Адреса", src: "/src/assets/images/navbar/placeWhite.svg", link: "/addresses", class: styles.Navbar__address},
    {name: "Корзина", src: "/src/assets/images/navbar/shop.svg", link: "/basket", class: styles.Navbar__basket},
  ],
  "unlog": [
    {name: "Войти", src: "/src/assets/images/navbar/human.svg", link: "", class: styles.Navbar__login}
  ],
  "admin": [
    {name: "Панель", src: "null", link: "/adminPanel", class: styles.Navbar__panel},
  ],
  "user": [
    {name: "Профиль", src: "/src/assets/images/navbar/human.svg", link: "/profile", class: styles.Navbar__profile}
  ],
  "trader": [
    {name: "Товары", src: "/src/assets/images/navbar/human.svg", link: "/trader", class: styles.Navbar__trader},
  ],
}

export default function Navbar({stateModal}: Props) {
    
  const [effect, setEffect] = stateModal;

  const [currency, setCurrency] = useState<Currency>("RUB");

  const [valueSearch, setValueSearch] = useState<string>("");

  const nav = useNavigate();

  

  return (
    <nav className={styles.Navbar + " Header"}>
        <div className={styles.container + " container"}>
          <div className={styles.Navbar__upline}>

            <div className={styles.Navbar__currency + " " + styles.Navbar__uplineElement}>
              <div className={styles.ImgCurrency}></div> <span className={styles.NameCurrency}>{currency}</span>
            </div>

            <div className={styles.Navbar__place + " " + styles.Navbar__uplineElement}>
              <div className={styles.ImgPlace}></div> <span className={styles.NamePlace}>Адресс не указан</span>
            </div>

          </div>
          <div className={styles.Navbar__base}>

            <MenuSVG state={[effect, setEffect]} className={styles.Navbar__burger}/>

            <h2 onClick={()=>{nav("/")}}>WILDBEARS</h2>

            <form onSubmit={(e)=>{e.preventDefault()}} className={styles.Navbar__searchBox}>
              <input value={valueSearch} onChange={(e)=>{setValueSearch(e.target.value)}} id={styles.searchProducts} className={styles.Navbar__search} type="search" placeholder="Я ищу..." onKeyDown={(e)=>{
                if(e.keyCode === 13) nav(`/${"null"}/${valueSearch}`)
              }}/>
              <label htmlFor={styles.searchProducts}></label>
            </form>

            <div className={styles.Navbar__links}>
            {
              links["const"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img} style={{backgroundImage: `url(${el.src})`}}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
            }
            {
              links["user"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img} style={{backgroundImage: `url(${el.src})`}}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
            }
            {
              links["admin"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img} style={{backgroundImage: `url(${el.src})`}}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
            }
            {
              links["trader"].map((el, id)=>{
                return (
                  <div key={id} className={styles.Navbar__link + " " + el.class} onClick={()=>{nav(el.link)}}>
                    <div className={styles.img} style={{backgroundImage: `url(${el.src})`}}></div>
                    <h4>{el.name}</h4>
                  </div>
                )
              })
            }

            </div>
            {/* <div className={styles.Navbar__links}>
              <div className={styles.Navbar__link + " " + styles.Navbar__address}>
                <div className={styles.img}></div>
                <h4>Адреса</h4>
              </div>
              <div className={styles.Navbar__link + " " + styles.Navbar__basket} onClick={()=>{nav("/basket")}}>
                <div className={styles.img}></div>
                <h4>Корзина</h4>
              </div>
              <div className={styles.Navbar__link + " " + styles.Navbar__profile} onClick={()=>{nav("/profile")}}>
                <div className={styles.img}></div>
                <h4>Профиль</h4>
              </div>
            </div> */}
          </div>
        </div>
    </nav>
  )
}