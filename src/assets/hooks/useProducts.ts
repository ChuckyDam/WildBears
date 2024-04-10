import { useMemo } from "react"


export const setProducts = function(allProducts:Array<any>){
    const products = useMemo(()=>{
        return allProducts;
    }, [allProducts])
    return products;
}