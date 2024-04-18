import { useContext, useEffect, useState } from "react"
import "./Basket.scss"
import Queries from "../../js/Queries";
import context from "../../contexts/ContextsMoney";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import Cookie from "../../js/Cookie";

type Props = {}

interface Product {
  name_product: string,
  price_product: number,
  name_category: string,
  trader_name: string,
  preview_img: string,
  discount: number,
  product_id: number,
  quantity: number,
  quantity_now: number
}

export default function Basket({}: Props) {

  const [products, setProducts] = useState<Array<Product>>([]);
  const [summ, setSumm] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const obj = useContext<any>(context);
  const [money, currencies, address, setAddress] = [obj.currency, obj.currencies, obj.address, obj.setAddress];

  useEffect(()=>{
    const poducts = localStorage.getItem("basket")? localStorage.getItem("basket")?.split(",") : [];
    if(!poducts) return;
    Queries.getBasket(poducts)
    .then(data =>{
      data = data.map((pr: Product) => {pr.quantity_now = 1; return pr;});
      setProducts(data);
    })
    .catch(error=>{
      console.log(error);
    })
  }, [])

  useUpdateEffect(()=>{
    let summ = products.reduce((num: number, el: Product)=>{
      let price = +el.price_product;
      let discount = +el.discount;
      if(el.discount) num += +el.quantity_now * (price - price * discount/100);
      else num += +el.quantity_now * price;
      return num;
    }, 0);
    setSumm(summ);
    let count = products.reduce((num: number, el: Product)=>{
      num += el.quantity_now;
      return num;
    }, 0)
    setCount(+count);
  }, [products])

  const plusQuantity = (id: string|number)=>{
    let prods = [...products];
    prods = prods.map((pr)=>{
      if (pr.product_id == id && pr.quantity_now < pr.quantity) pr.quantity_now++;
      return pr;
    })
    setProducts(prods);
  }
  const minusQuantity = (id: string|number)=>{
    let prods = [...products];
    prods = prods.map((pr)=>{
      if (pr.product_id == id && pr.quantity_now > 1) pr.quantity_now--;
      return pr;
    })
    setProducts(prods);
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>, maxValue: number, id: string|number)=>{
    const value:number = +e.target.value;
    let prods = [...products];
    prods = prods.map((pr)=>{
      if (pr.product_id == id){
        if (value > maxValue) {pr.quantity_now = maxValue;}
        else if (value < 1) {pr.quantity_now = 1;}
        else {pr.quantity_now = value;}
      }
      return pr;
    })
    setProducts(prods);
  }
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>, id: string|number)=>{
    const value:number = +e.target.value;
    let prods = [...products];
    prods = prods.map((pr)=>{
      if (pr.product_id == id) {pr.quantity_now = value;}
      return pr;
    })
    setProducts(prods);
  }

  return (
    <div className="Basket">
        <div className="container">
          {
            products.length > 0?
            (
              <div className="Basket__productsBox">
              <div className="Basket__products">
                <div className="Basket__productsInfo">
                  <h2>Корзина</h2>
                  <p>{count} товаров</p>
                </div>
                
                {
            products.map((el)=>{
              let curr = currencies.current[money];
              return (
                <div key={el.product_id} className="Basket__product">
                  <div className="Basket__productMain">
                    <img src={"http://mycoursework/project/webroot/images/previewProducts/"+el.preview_img} alt="ris"/>
                    <div className="Basket__productInfo">
                      <h3>{el.name_product}</h3>
                      <p>{el.trader_name}</p>
                    </div>
                  </div>
                  <div className="Basket__productCount">
                    <div className="Basket__sign" onClick={()=>{minusQuantity(el.product_id)}}>
                      -
                    </div>
                    <input type="number" value={el.quantity_now} onChange={(e)=>{handlerChange(e, el.product_id)}} onBlur={(e)=>{changeInput(e, el.quantity, el.product_id)}}/>
                    <div className="Basket__sign" onClick={()=>{plusQuantity(el.product_id)}}>
                      +
                    </div>
                  </div>
                  <div onClick={()=>{
                    const idSet = +el.product_id;
                    // @ts-ignore: error message
                    let bask = localStorage.getItem("basket")? localStorage.getItem("basket").split(",").map(id => +id) : [];
                    let newBask = bask.filter((id)=>id !== idSet);
                    localStorage.setItem("basket", [...newBask].join(","));

                    let basket = products.filter((pr)=>+pr.product_id !== idSet);
                    setProducts(basket);
                  }} className="Basket__del">
                    X
                  </div>
                  <div className="Basket__price">
                    {(el.discount? (el.price_product - el.discount/100 * el.price_product) * curr.rubls * el.quantity_now: el.quantity_now * curr.rubls * el.price_product).toLocaleString('ru-RU')} {curr.sign}
                  </div>
                </div>
              )
            })
                }
              </div>

                <div className="Basket__confirm">
                  <p>{address?address:"Адресс не указан"}</p>
                  <h3>Итого: {(summ * currencies.current[money].rubls).toLocaleString('ru-RU')} {currencies.current[money].sign}</h3>
                  <button className="Basket__confirmBtn" onClick={()=>{
                    let token = Cookie.getCookie("token");
                    if (token){
                      let objs = products.map((el)=>{
                        let price = el.quantity? el.price_product - el.discount/100 * el.price_product: el.price_product;
                        return {
                          "token": Cookie.getCookie("token"),
                          "product_id": el.product_id,
                          "price": price,
                          "quantity": el.quantity_now,
                        }
                      });
                      console.log(objs)
                    }else{
                      console.log("Вы не авторизованы")
                    }
                  }}>Оформить заказ</button>
                </div>

              </div>
            ):
            (
              <div className="Basket__empty">
                <h2>В корзине пока пусто</h2>
                <p>Добавьте товары из каталога</p>
              </div>
            )
          }
        </div>
    </div>
  )
}