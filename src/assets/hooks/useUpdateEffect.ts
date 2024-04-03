import { useEffect, useRef } from "react";


export const useUpdateEffect: Function = (effect:Function, deps:Array<React.SetStateAction<Boolean>>) => {
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, deps);
}