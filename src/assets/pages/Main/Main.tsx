import { useNavigate, useParams } from "react-router-dom";
import "./Main.scss";
import { useContext, useEffect, useState } from "react";

import test1 from "../../images/test/newTest2.webp"
import test2 from "../../images/test/newTest3.webp"

import context from "../../contexts/ContextsMoney";
import Queries from "../../js/Queries";

type Props = {}

interface Product {
  name_product: string,
  price_product: number,
  name_category: string,
  full_name: string,
  preview_img: string,
  discount: number,
  product_id: number
}

const limit = 15;

export default function Main({}: Props) {

  const params = useParams();

  const nav = useNavigate();

  const [products, setProducts] = useState<Array<Product>>([])
  const [filter, setFilter] = useState({type: "null", search: "null"})

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [slideCount, setSlideCount] = useState<number>(0)

  useEffect(()=>{
    setCurrentPage(1);
  }, [totalPage])

  useEffect(()=>{
    document.addEventListener("scroll", scrollHandler);
    return ()=>{
      document.removeEventListener("scroll", scrollHandler);
    }
  }, [products])

  useEffect(()=>{
    if (params.search && params.type){
      if(filter.type !== "null" || filter.search !== "null"){
        Queries.getProducts(limit*currentPage,filter.search,filter.type).then((data)=>{
          setProducts(data[0]);
          setTotalPage(Math.ceil(data[1]/limit));
        })
      }
    }else{
      Queries.getProducts(limit*currentPage,filter.search,filter.type).then((data)=>{
        setProducts(data[0]);
        setTotalPage(Math.ceil(data[1]/limit));
      })
    }
  }, [filter, currentPage]);

  useEffect(()=>{
    
    if(params.search && params.search !== "null"){
      let fil = {...filter}
      fil.search = params.search
      setFilter(fil)
    }
    if(params.type && params.type !== "null"){
      let fil = {...filter}
      fil.type = params.type
      setFilter(fil)
    }
    if(!(params.search || params.type)){
      setFilter({type: "null", search: "null"});
    }
    if(params.type === "null" && params.search === "null"){
      let fil = {...filter}
      fil.search = ""
      setFilter(fil);
    }
  }, [params])

  const scrollHandler = (e:any)=>{
    if (currentPage === totalPage) {return;};
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 800) {
      setCurrentPage(currentPage+1);
    }
  }

  const obj = useContext<any>(context);
  const [money, currencies] = [obj.currency, obj.currencies];

  return (
      <div className="container">
        <div className="Main__newAlerts">
          <div className="Main__newAlertsBlocks" style={{marginLeft: `${slideCount}vw`, width: `${2 * 90}vw`}}>
            <div className="Main__newAlertsBlock" style={{backgroundImage: `url(${test1})`}} onClick={()=>{
              nav("/search/Аксессуары/null");
            }}></div>
            <div className="Main__newAlertsBlock" style={{backgroundImage: `url(${test2})`}}></div>
          </div>
          <div className="Main__arrow Main__arrowLeft" onClick={()=>{
            setSlideCount(slideCount+90);
          }}></div>
          <div className="Main__arrow Main__arrowRight" onClick={()=>{
            setSlideCount(slideCount-90);
          }}></div>
        </div>
        <div className="Main__allProducts">
          {
            products.length === 0? <div>Ничего не найдено</div>
            :
            products.map((el)=>{
              let curr = currencies.current[money];
              let price;
              if (el.discount){
                price = (
                  <div className="Main__productPrice">
                    <p>{((el.price_product - el.price_product * (el.discount/100)) * curr.rubls).toLocaleString('ru-RU')} {curr.sign}</p>
                    <p className="Main__productPriceOld">{(el.price_product * curr.rubls).toLocaleString('ru-RU')} {curr.sign}</p>
                  </div>
                )
              }else{
                price = (
                  <div className="Main__productPrice">
                    <p>{(el.price_product * curr.rubls).toLocaleString('ru-RU')} {curr.sign}</p>
                  </div>
                )
              }

              let full_name = "/ " + (el.full_name.length > 7? el.full_name.slice(0,7) + "..." : el.full_name);
              let name_product = el.name_product;

              if ((el.name_product + full_name).length > 25){
                full_name = "";
                name_product = el.name_product.length > 20? el.name_product.slice(0,20) + "..." : el.name_product;
              }else{
                name_product = el.name_product.length > 10? el.name_product.slice(0,10) + "..." : el.name_product;
              }

              return (
                <div key={el.product_id} className="Main__product" onClick={()=>{
                  console.log(el.product_id)
                }}>
                  <div className="Main__productInfo">
                    <img src={"http://mycoursework/project/webroot/images/previewProducts/"+el.preview_img} alt="ris"/>
                    {price}
                    <p className="Main__productTrader">{name_product} <span className="Main__productName">{full_name}</span></p>
                    <p className="Main__category">{el.name_category}</p>
                  </div>
                  <button className="Main__productButton" onClick={(e:any)=>{
                    let bask = localStorage.getItem("basket")? localStorage.getItem("basket")?.split(",") : [];
                    // @ts-ignore: error message
                    let baskets = new Set([...bask, el.product_id]);
                    localStorage.setItem("basket", [...baskets].join(","));

                    e.target.classList.add("active");
                    e.target.textContent = "В корзине";
                  }}> Купить </button>
                </div>
              )
            })
          }
        </div>
      </div>
  )
}