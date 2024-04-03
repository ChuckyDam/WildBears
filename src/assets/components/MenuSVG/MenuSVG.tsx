import { useCallback, useRef } from "react";
import styles from "./MenuSVG.module.scss"
import {useUpdateEffect} from "../../hooks/useUpdateEffect"

type Props = {
    className?:string,
    state: [React.SetStateAction<Boolean>, React.Dispatch<React.SetStateAction<Boolean>>],
    onClick?: Function
}
export default function MenuSVG({className, state, onClick = ()=>{}}: Props) {

    const classes:Array<string> = [styles.MenuSVG];
    if (className) classes.push(className);

    const divRef = useRef<HTMLDivElement>(null);

    const [effect, setEffect] = state;

    const close:Function = useCallback(()=>{
      const spans:HTMLCollectionOf<HTMLSpanElement>|undefined = divRef.current?.getElementsByTagName("span");
      if(!spans) return;
      if(!effect) {
        spans[0].classList.add(styles.line_close_actve1);
        spans[1].classList.add(styles.line_close_actve2);
        spans[2].classList.add(styles.line_close_actve3);
      }else{
        spans[0].classList.remove(styles.line_close_actve1);
        spans[1].classList.remove(styles.line_close_actve2);
        spans[2].classList.remove(styles.line_close_actve3);
      }
    },[effect])

    close();

    useUpdateEffect(close, [effect])

  return (
    <div className={classes.join(" ")} onClick={(e)=>{setEffect(!effect);close();onClick(e)}} ref={divRef}>
        <span className={styles.lines}></span>
        <span className={styles.lines}></span>
        <span className={styles.lines}></span>
    </div>
  )
}