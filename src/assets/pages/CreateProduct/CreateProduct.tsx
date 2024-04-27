import { ChangeEvent, useContext, useRef, useState } from 'react'
import "./CreateProduct.scss"
import context from "../../contexts/ContextsMoney";
import Queries from '../../js/Queries';
import Cookie from '../../js/Cookie';

type Props = {}

export default function CreateProduct({}: Props) {

  const [data, setData] = useState({
    "name_product": "",
    "about_product": "",
    "price_product": "",
    "quantity": "",
    "category": "",
    "address_storage": "",
    "preview_img": "",
  });
  const [photos, setPhotos] = useState<Array<string>>([]);

  const preview = useRef(document.createElement("img"));
  const photosDiv = useRef(document.createElement("div"));

  const obj = useContext(context);
  const [types, setError] = [obj.types, obj.setError];

  return (
    <div className='CreateProduct'>
        <div className="container">
          <form className='CreateProduct__form' onSubmit={(e)=>{
            e.preventDefault();
            let obj = {...data, "images": photos};
            let token = Cookie.getCookie("token");
            if(!token) {window.location.href = "/"; return;}
            Queries.formSet("http://mycoursework/createProduct",obj,token)
            .then(()=>{
              setData({
                "name_product": "",
                "about_product": "",
                "price_product": "",
                "quantity": "",
                "category": "",
                "address_storage": "",
                "preview_img": "",
              });
              setPhotos([]);
              preview.current.style.display = "none";
              setError({
                "status": true,
                "textError": "Товар добавлен",
                "isBad": false
              })
            })
            .catch(e=>{
              setError({
                "status": true,
                "textError": e.response.data.message,
                "isBad": true
              })
            })
          }}>
            <input type="text" autoComplete="off" name='name_product' placeholder='Название' required value={data.name_product} onChange={(e)=>{
              let obj = {...data};
              obj.name_product = e.target.value;
              setData(obj);
            }}/>

            <label htmlFor="load_preview">Загрузить превью</label>
            <input required type="file" name='load_preview' id='load_preview' accept="image/png, image/jpeg, image/webp" style={{display: "none"}} onChange={(e:any)=>{
                    let fileReader = new FileReader();
                    fileReader.onload = ()=>{
                      preview.current.src = `${fileReader.result}`;
                      preview.current.style.display = "block";
                      
                      let obj = {...data};
                      obj.preview_img = `${fileReader.result}`;
                      setData(obj);
                    }
                    fileReader.readAsDataURL(e.target.files[0])
                  }}/>
            <img src="" alt="preview" ref={preview} style={{display: "none"}}/>

            <label htmlFor="load_photos">Загрузить фотки</label>
            <input type="file" name='load_photos' id='load_photos' accept="image/png, image/jpeg, image/webp" style={{display: "none"}} onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
                          if (readerEvent?.target?.result) {
                            setPhotos([...photos, readerEvent.target.result.toString()]);
                          }
                        };
                      }
                  }}/>
            <div className='CreateProduct__photos' ref={photosDiv}>{photos.map((url, id)=>{
              return <div className='CreateProduct__photo' key={id}>
                <img src={url} alt="photo" />
                <p onClick={()=>{
                  let arr = photos.filter((_, ind)=>ind !== id)
                  setPhotos(arr);
                }}>X</p>
              </div>
            })}</div>

            <textarea name="about_product" id="about_product" placeholder='Описание' value={data.about_product} onChange={(e)=>{
              let obj = {...data};
              obj.about_product = e.target.value;
              setData(obj);
            }}></textarea>

            <div className="CreateProduct__flexInput">
              <input required min={1} type="number" name='price_product' placeholder='Цена' value={data.price_product} onChange={(e)=>{
                let obj = {...data};
                obj.price_product = e.target.value;
                setData(obj);
              }}/>
              <input required min={1} type="number" name='count_product' placeholder='Количество' value={data.quantity} onChange={(e)=>{
                let obj = {...data};
                obj.quantity = e.target.value;
                setData(obj);
              }}/>
            </div>
            <div className="CreateProduct__flexInput">
              <select required name="type_product" id="type_product" value={data.category} onChange={(e)=>{
                let obj = {...data};
                obj.category = e.target.value;
                setData(obj);
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
              <input required autoComplete="off" type="text" name='address_product' placeholder='Адресс товара' value={data.address_storage} onChange={(e)=>{
                let obj = {...data};
                obj.address_storage = e.target.value;
                setData(obj);
              }}/>
            </div>
            <button className='CreateProduct__btnSubmit'>Создать</button>
          </form>
        </div>
    </div>
  )
}