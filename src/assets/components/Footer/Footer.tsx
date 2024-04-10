import styles from "./Footer.module.scss"
// @ts-ignore: error message **** НЕ ВЫЪОДИ НА СВЯЗЬ
import Logo from "../../images/logo.svg?react"
import { Link } from "react-router-dom"

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className={styles.Footer + " Footer"}>
        <div className={styles.container + " container"}>
          <Logo className={styles.Footer__logo}/>
          <div className={styles.Footer__links}>
            <div className={styles.Footer__link}>
              <h3>Покупателям</h3>
              <ul>
                <li><Link to={"/helper/order"}>Как сделать заказ</Link></li>
                <li><Link to={"/helper/order"}>Способы оплаты</Link></li>
                <li><Link to={"/helper/order"}>Доставка</Link></li>
                <li><Link to={"/helper/order"}>Возврат товара</Link></li>
                <li><Link to={"/helper/order"}>Возврат денежных средств</Link></li>
                <li><Link to={"/helper/order"}>Правила продажи</Link></li>
                <li><Link to={"/helper/order"}>Правила пользования торговой площадкой</Link></li>
                <li><Link to={"/helper/order"}>Политика обработки персональных данных</Link></li>
                <li><Link to={"/helper/order"}>Вопросы и ответы</Link></li>
                <li><Link to={"/helper/order"}>Проверка совместимости</Link></li>
              </ul>
            </div>
            <div className={styles.Footer__link}>
              <h3>Продавцы</h3>
              <ul>
                <li><Link to={"/helper/order"}>Как выставить заказ</Link></li>
                <li><Link to={"/helper/order"}>Доставка</Link></li>
                <li><Link to={"/helper/order"}>Правила продажи</Link></li>
                <li><Link to={"/helper/order"}>Запрещённые товары</Link></li>
                <li><Link to={"/helper/order"}>Техническая поддержка</Link></li>
              </ul>
              <h3>Основные правила</h3>
              <ul>
                <li><Link to={"/helper/order"}>Пользовательское соглашение</Link></li>
                <li><Link to={"/helper/order"}>Права покупателя</Link></li>
                <li><Link to={"/helper/order"}>Права продавца</Link></li>
                <li><Link to={"/helper/order"}>Роль администратора в процессе</Link></li>
                <li><Link to={"/helper/order"}>Роль сайта в процессе</Link></li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}