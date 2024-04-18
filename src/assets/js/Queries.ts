import axios from "axios";

export async function getProducts(limit:number, search:string|null, type:string|null){
    if (!search) search = null
    if (!type) type = null
    let query = await axios.get(`http://mycoursework/products/${search}/${type}/${limit}`);
    let query2 = await axios.get(`http://mycoursework/products/${search}/${type}`);
    return [query.data, query2.data['count']];
}

export const query = async function(ref: string, obj:any){
  return await axios.post(ref, obj);
}

export async function checkToken(token:string){
  let query = await axios({
    method: 'GET',
    url: 'http://mycoursework/token',
    headers: {
      "Authorization": token
    }
  })
  return query.data;
}

export async function getBasket(products:Array<string>){
  let query = await axios({
    method: 'POST',
    url: 'http://mycoursework/products/basket',
    headers: {
          "Content-type": "application/json; charset=UTF-8"
    },
    data: {
      "products_id": products
    }
  })
  if (query.data.length < 1) throw new Error("Корзинка пуста");
  return query.data;
}

export default {getProducts, query, checkToken, getBasket}