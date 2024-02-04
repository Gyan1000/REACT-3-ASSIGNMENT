import {Link} from "react-router-dom";
import "../style/HomePage.css"
import { randomColorCode } from "../Pages/HomePage";
function PhotoCard({photoUrl,photoId,title})
{
   // onmouseover ,The backgroundColor of superMain container wil changed
   
		let superE=document.getElementById('superMain');
		superE.addEventListener('mouseover',()=>{superE.style.backgroundColor=randomColorCode()})
   
   return(
      <div id="contain_img">

        <Link to={`/${photoId}`}>
         
        <img src={photoUrl} alt=""/>

        {/*customized photo's title words upto 0 to 30*/}

        <p>{(title.length>30)?title.substring(0,30):title}</p>
         
        </Link>
        
        </div>
     )
}
export  {PhotoCard};
