import React, { useRef } from 'react'
import styles from './Alert.module.scss'
import { useUpdateEffect } from '../../hooks/useUpdateEffect';

type Props = {
    stateModal: [React.SetStateAction<any>, React.Dispatch<React.SetStateAction<any>>],
    text: any
}

const timeLong = 500;

export default function Alert({stateModal, text}: Props) {

    const [state, setState] = stateModal;
    const block = useRef<HTMLDivElement>(document.createElement("div"));
    const progress = useRef<HTMLProgressElement>(document.createElement("progress"));
    let stop = useRef<Boolean>(false)

    useUpdateEffect(()=>{
        if(state){
            block.current.style.display = "flex";
            let time = 0;
            let timeEnd = time + timeLong;
            new Promise<void>((res)=>{
                
                block.current.onmouseover = ()=>{stop.current = true};
                block.current.onmouseout = ()=>{stop.current = false};
                const p = setInterval(()=>{
                    if(!stop.current){
                        progress.current.value += 100/timeLong;
                        time += 1;
                    }
                    if(time === timeEnd) {clearInterval(p); res()};
                }, 1)
            })
            .then(()=>{
                setState(false);
                progress.current.value = 0;
            })

        }else{
            block.current.style.display = "none";
        }
    }, [state])

  return (
    <div ref={block} className={styles.Alert}>
        <progress className={styles.Alert__progress} max="100" value={0} ref={progress}></progress>
        <p style={{color: "white"}}>{text}</p>
    </div>
  )
}