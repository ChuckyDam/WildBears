import React, { useRef } from 'react'
import styles from './Alert.module.scss'
import { useUpdateEffect } from '../../hooks/useUpdateEffect';

type Props = {
    stateModal: [React.SetStateAction<any>, React.Dispatch<React.SetStateAction<any>>],
    text: any
}

function sleep(millis: number) {
    return new Promise(resolve => setTimeout(resolve, millis));
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
            sleep(300)
            .then(async()=>{
            block.current.classList.add(styles.Alert_active);
            await sleep(500)
            let time = 0;
            let timeEnd = time + timeLong;
            new Promise<void>(async(res)=>{
                
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
                block.current.classList.remove(styles.Alert_active);
                block.current.classList.add(styles.Alert_close);
                sleep(700)
                .then(()=>{
                    block.current.classList.remove(styles.Alert_close);
                    setState(false);
                    progress.current.value = 0;
                })
            })

            })



        }else{
            block.current.style.display = "none";
        }
    }, [state])

  return (
    <div ref={block} className={styles.Alert}>
        <progress className={styles.Alert__progress} max="100" value={0} ref={progress}></progress>
        <div className={styles.Alert__container}>{text}</div>
    </div>
  )
}