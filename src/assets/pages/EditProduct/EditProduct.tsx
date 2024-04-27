import {  useContext, useEffect, useRef, useState } from 'react'
import "./EditProduct.scss"
import context from "../../contexts/ContextsMoney";
import Queries from '../../js/Queries';
import Cookie from '../../js/Cookie';
import { useParams } from 'react-router-dom';

type Props = {}

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
  img_profile: string
}


// type Photo = {
//   img_src: string
// }

export default function EditProduct({}: Props) {

  const params = useParams();

  const [product, setProduct] = useState<Product>({
    product_id: 0,
    trader_name: "",
    name_product: "",
    about_product: "",
    price_product: 0,
    quantity: 0,
    address_storage: "",
    preview_img: "",
    name_category: "",
    discount: 0,
    img_profile: ""
  });
  // const [photos, setPhotos] = useState<Array<Photo>>([]);

  const preview = useRef(document.createElement("img"));
  // const photosDiv = useRef(document.createElement("div"));

  const obj = useContext(context);
  const [types, setError] = [obj.types, obj.setError];

  useEffect(()=>{
    Queries.getQuery(`http://mycoursework/product/${params.product_id}`)
    .then(data=>{
      let obj = data.data;
      setProduct(obj);
    })
  }, [])

  return (
    <div className='EditProduct'>
        <div className="container">
          <form className='EditProduct__form' onSubmit={(e)=>{
            e.preventDefault();
            let token = Cookie.getCookie("token");
            if(!token) {window.location.href = "/"; return;}
            Queries.formSet("http://mycoursework/product/updateProduct",product,token)
            .catch((data)=>{
              setError({
                "status": true,
                "textError": data.response.data.message,
                "isBad": true
              })
            })
          }}>
            <input type="text" autoComplete="off" name='name_product' placeholder='Название' required value={product?.name_product} onChange={(e)=>{
              if (!product) return;
              let obj = {...product};
              obj.name_product = e.target.value;
              setProduct(obj);
            }}/>

            {/* <label htmlFor="load_preview">Загрузить превью</label>
            <input required type="file" name='load_preview' id='load_preview' accept="image/png, image/jpeg, image/webp" style={{display: "none"}} onChange={(e:any)=>{
                    let fileReader = new FileReader();
                    fileReader.onload = ()=>{
                      preview.current.src = `${fileReader.result}`;
                      preview.current.style.display = "block";
                      
                      if (!product) return;
                      let obj = {...product};
                      obj.preview_img = `${fileReader.result}`;
                      setProduct(obj);
                    }
                    fileReader.readAsDataURL(e.target.files[0])
                  }}/> */}
            <img src={"http://mycoursework/project/webroot/images/previewProducts/"+product?.preview_img} alt="preview" ref={preview}/>

            {/* <label htmlFor="load_photos">Загрузить фотки</label>
            <input type="file" name='load_photos' id='load_photos' accept="image/png, image/jpeg, image/webp" style={{display: "none"}} onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
                          if (readerEvent?.target?.result) {
                            setPhotos([...photos, {"img_src": readerEvent.target.result.toString()}]);
                          }
                        };
                      }
                  }}/>
            <div className='EditProduct__photos' ref={photosDiv}>{photos.map((url, id)=>{
              return <div className='CreateProduct__photo' key={id}>
                <img src={url.img_src} alt="photo" />
                <p onClick={()=>{
                  let arr = photos.filter((_, ind)=>ind !== id)
                  setPhotos(arr);
                }}>X</p>
              </div>
            })}</div> */}

            <textarea name="about_product" id="about_product" placeholder='Описание' value={product?.about_product} onChange={(e)=>{
              if (!product) return;
              let obj = {...product};
              obj.about_product = e.target.value;
              setProduct(obj);
            }}></textarea>

            <div className="EditProduct__flexInput">
              <input required min={1} type="number" name='price_product' placeholder='Цена' value={product?.price_product} onChange={(e)=>{
                if (!product) return;
                let obj = {...product};
                obj.price_product = +e.target.value;
                setProduct(obj);
              }}/>
              <input required min={1} type="number" name='count_product' placeholder='Количество' value={product?.quantity} onChange={(e)=>{
                if (product){
                  let obj:Product = {...product};
                  obj.quantity = +e.target.value;
                  setProduct(obj);
                }
              }}/>
            </div>
            <div className="EditProduct__flexInput">
              <select required name="type_product" id="type_product" value={product?.name_category} onChange={(e)=>{
              if (!product) return;
                let obj = {...product};
                obj.name_category = e.target.value;
                setProduct(obj);
              }}>
                <option value={""} defaultChecked style={{display: "none"}}>Категория</option>
                {
                  types.map((el:string, id:number)=>{
                    return (
                      <option key={id} value={el}>{el}</option>
                    )
                  })
                }
              </select>
              <input required autoComplete="off" type="text" name='address_product' placeholder='Адресс товара' value={product?.address_storage} onChange={(e)=>{
                if (product){
                  let obj:Product = {...product};
                  obj.address_storage = e.target.value;
                  setProduct(obj);
                }
              }}/>
            </div>
            Скидка в процентах от полной стоимости:
            <input type="number" autoComplete="off" name='discount' placeholder='Скидка' min={0} max={100} required value={product.discount? product.discount: 0} onChange={(e)=>{
              if (!product) return;
              let obj = {...product};
              obj.discount = +e.target.value;
              setProduct(obj);
            }}/>
            <button className='EditProduct__btnSubmit'>Редактировать</button>
          </form>
        </div>
    </div>
  )
}