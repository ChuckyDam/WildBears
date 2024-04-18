import { useContext, useState } from "react";
import styles from "./SelectCurrency.module.scss"
import context from "../../contexts/ContextsMoney";


type Props = {}

export default function SelectCurrency({}: Props) {

    const obj = useContext<any>(context);
    const [currency, setCurrency] = [obj.currency, obj.setCurrency];

    const [display, setDisplay] = useState<boolean>(false);

    const [curSVG, setCurSVG] = useState<string>(styles.SelectCurrency__currencyRUB);

  return (
    <div className={styles.SelectCurrency}>
        <div className={styles.SelectCurrency__currency + " " + curSVG} onClick={()=>{setDisplay(!display)}}>
            <div className={styles.ImgCurrency}></div> <span className={styles.NameCurrency}>{currency}</span>
        </div>
        <div className={styles.SelectCurrency__variants} style={{display: display? "block": "none"}}>
            <div onClick={()=>{setCurrency("RUB"); setCurSVG(styles.SelectCurrency__currencyRUB)}} className={styles.SelectCurrency__currency + " " + styles.SelectCurrency__currencyRUB}><div className={styles.ImgCurrency}></div> <span className={styles.NameCurrency}>RUB</span></div>
            <div onClick={()=>{setCurrency("CNY"); setCurSVG(styles.SelectCurrency__currencyCNY)}} className={styles.SelectCurrency__currency + " " + styles.SelectCurrency__currencyCNY}><div className={styles.ImgCurrency}></div> <span className={styles.NameCurrency}>CNY</span></div>
        </div>
    </div>
  )
}