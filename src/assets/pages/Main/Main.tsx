import { useNavigate, useParams } from "react-router-dom";
import "./Main.scss";
import { useEffect, useState } from "react";
import axios from "axios";

import test1 from "../../images/test/newTest2.webp"
import test2 from "../../images/test/newTest3.webp"

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

async function getProducts(limit:number, search:string|null, type:string|null){
  if (!search) search = null
  if (!type) type = null
  let query = await axios.get(`http://mycoursework/products/${search}/${type}/${limit}`);
  let query2 = await axios.get(`http://mycoursework/products/${search}/${type}`);
  return [query.data, query2.data['count']];
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
    document.addEventListener("scroll", scrollHandler);
    return ()=>{
      document.removeEventListener("scroll", scrollHandler);
    }
  }, [products])

  useEffect(()=>{
    getProducts(limit*currentPage,filter.search,filter.type).then((data)=>{
      setProducts(data[0]);
      setTotalPage(Math.ceil(data[1]/limit));
    })
  }, [filter, currentPage]);

  useEffect(()=>{
    setCurrentPage(1);
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
  }, [params])

  const scrollHandler = (e:any)=>{
    if (currentPage === totalPage) {return;};
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 800) {
      setCurrentPage(currentPage+1);
    }
  }

  return (
    <>
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

              let price;
              if (el.discount){
                price = (
                  <div className="Main__productPrice">
                    <p>{el.price_product - el.price_product * (el.discount/100)} ₽</p>
                    <p className="Main__productPriceOld">{el.price_product}</p>
                  </div>
                )
              }else{
                price = (
                  <div className="Main__productPrice">
                    <p>{el.price_product} ₽</p>
                  </div>
                )
              }

              console.log(el.full_name.length)

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
                  <button> Купить </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}