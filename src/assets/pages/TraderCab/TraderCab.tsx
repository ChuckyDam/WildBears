import { useEffect, useState } from "react"
import Queries from "../../js/Queries"
import "./TraderCab.scss"
import Cookie from "../../js/Cookie"
import { useNavigate } from "react-router-dom"

interface Product {
  name_product: string,
  price_product: number,
  name_category: string,
  preview_img: string,
  discount: number,
  product_id: number,
  imgs: Array<string>
}

type Props = {}

export default function TraderCab({}: Props) {

  const nav = useNavigate();

  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(()=>{
    let token = Cookie.getCookie("token");
    if(!token) window.location.href = "/";
    else Queries.getGoToken(token, "http://mycoursework/products/user")
    .then((data)=>{
      setProducts(data);
    })
  }, [])

  return (
    <div className="TraderCab">
      <div className="container">
        <button className="TraderCab__createProduct" onClick={()=>{nav("/createProduct")}}>Создать товар | +</button>
        <h2>Ваши товары:</h2>
        {
          products.length > 0?
          <div className="TraderCab__myProducts">
          {
            products.map((el)=>{

              return (
                <div className="TraderCab__myProduct" key={el.product_id}>
                  <div className="TraderCab__myProductImg">
                    <img src={"http://mycoursework/project/webroot/images/previewProducts/"+el.preview_img} alt="ris"/>
                    <div className="TraderCab__btnRemove TraderCab__btn" onClick={()=>{
                      Queries.query("http://mycoursework/products/removeProduct", {"product_id": el.product_id});

                      let prds = [...products].filter((obj)=>obj.product_id != el.product_id);
                      setProducts(prds);
                    }}>Del</div>
                    <div className="TraderCab__btnEdit TraderCab__btn" onClick={()=>{
                      
                    }}>Edit</div>
                  </div>
                  <p>{el.name_product}</p>
                </div>
              )
            })
          }
          </div>
          :""
        }

      </div>
    </div>
  )
}