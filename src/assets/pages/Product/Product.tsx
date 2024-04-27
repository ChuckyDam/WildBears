import { useParams } from "react-router-dom";
import "./Product.scss"
import { useContext, useEffect, useState } from "react";
import context from "../../contexts/ContextsMoney";
import Queries from "../../js/Queries";
import avatar from "../../images/profile.svg";

type Props = {}

type Photo = {
  img_src: string
}

interface Product {
  product_id: number,
  trader_name: string,
  name_product: string,
  about_product: string,
  price_product: number,
  quantity: number,
  address_storage: string,
  preview_img: string,
  name_category: string,
  discount: number,
  photos: Array<Photo>,
  img_profile: string
}

export default function Product({}: Props) {

    const params = useParams();

    const [product, setProduct] = useState<Product|null>(null);
    
    const obj = useContext<any>(context);
    const [money, currencies] = [obj.currency, obj.currencies];
    // const [address, setError] = [obj.address, obj.setError];
    let curr = currencies.current[money];

    useEffect(()=>{
      Queries.getQuery(`http://mycoursework/product/${params.product_id}`)
      .then(data=>{
        setProduct(data.data);
      })
    }, [])

  return (
    <div className="Product">
        <div className="container">
          <h1>{product?.name_product}</h1>
          <div className="Product__flex">
            <div className="Product__images">
              <img src={`http://mycoursework/project/webroot/images/previewProducts/${product?.preview_img}`} alt="" />
              <div className="Product__photos">
                {
                  product?.photos.map((photo, id)=>{
                    return (
                      <img key={id} src={`http://mycoursework/project/webroot/images/imagesProducts/${photo["img_src"]}`} alt="photo" />
                    )
                  })
                }
              </div>
            </div>
            
            <div className="Product__info">
              <h3>О товаре:</h3>
              <p>{product?.about_product}</p>
              <p>Цена: {product?.discount ? <>{((product.price_product - (product.price_product * product.discount/100)) * curr.rubls).toLocaleString('ru-RU')} {curr.sign} <span className="Product__discount">(-{product.discount}%!)</span></>  :(product? (product.price_product * curr.rubls).toLocaleString('ru-RU') : "") + " " + curr.sign}</p>
              <p>Количество: {product?.quantity}</p>
              <div className="Product__trader">
                <h3>Продавец:</h3>
                {
                  product?.img_profile?
                  <img src={"http://mycoursework/project/webroot/images/usersImg/"+product.img_profile} alt="img_profile" />
                  :<img src={avatar} alt="img_profile" />
                }
                {product?.trader_name}
              </div>
              <button className="Main__productButton" onClick={(e:any)=>{
                    let bask = localStorage.getItem("basket")? localStorage.getItem("basket")?.split(",") : [];
                    // @ts-ignore: error message
                    let baskets = new Set([...bask, product.product_id]);
                    localStorage.setItem("basket", [...baskets].join(","));

                    e.target.classList.add("active");
                    e.target.textContent = "В корзине";
                  }}> Купить </button>
            </div>
          </div>
          
        </div>
    </div>
  )
}