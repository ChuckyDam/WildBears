import { useRef, useState } from "react";
import styles from "./ModalSideBar.module.scss"
import { useUpdateEffect } from "../../hooks/useUpdateEffect";

type Props = {
    children?: React.ReactElement<any, any>|string,
    className?:string,
    stateModal: [React.SetStateAction<Boolean>, React.Dispatch<React.SetStateAction<Boolean>>],
}

function sleep(millis:number) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

export default function ModalSideBar({children, className, stateModal}: Props) {

    const ModalBoxSrc = useRef<HTMLDivElement>(document.createElement("div"));

    const classes:Array<string> = [styles.ModalSideBar__container];
    if (className) classes.push(className);

    const [effect, setEffect] = stateModal;
    
    const [boxClasses, setBoxClasses] = useState<Array<string>>([styles.ModalSideBar]);

    const setClass = function(item:string){
      let newArr:Array<string> = [...boxClasses]
      newArr.push(item);
      setBoxClasses(newArr);
    }
    
    useUpdateEffect(()=>{
      if(!effect) {
        setClass(styles.active)
        document.querySelector("#root")?.classList.add("body--overflow");
        sleep(100).then(()=>{
          ModalBoxSrc.current.style.opacity = "1";
          ModalBoxSrc.current.getElementsByClassName(styles.ModalSideBar__container)[0].classList.add(styles.container_active)
        })
      }else{
        document.querySelector("#root")?.classList.remove("body--overflow");
        ModalBoxSrc.current.style.opacity = "0";
        ModalBoxSrc.current.getElementsByClassName(styles.ModalSideBar__container)[0].classList.remove(styles.container_active)
        sleep(300).then(()=>{setBoxClasses([styles.ModalSideBar])});
      }
    }, [effect])

  return (
    <div className={boxClasses.join(" ")} ref={ModalBoxSrc} onClick={()=>{setEffect(true)}}>
        <div className={classes.join(" ")} onClick={(e)=>{
          e.stopPropagation();
        }}>
          {children}
        </div>
    </div>
  )
}