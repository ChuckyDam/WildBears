import Cookie from "../../js/Cookie";
import "./Profile.scss";

type Props = {}

export default function Profile({}: Props) {
  return (
    <div>
        <a href="/" onClick={()=>{
          Cookie.deleteCookie("token");
        }}>Выйти</a>
    </div>
  )
}