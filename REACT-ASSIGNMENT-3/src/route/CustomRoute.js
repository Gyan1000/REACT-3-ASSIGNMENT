import {Route,Routes} from "react-router-dom";
import {HomePage} from "../Pages/HomePage.jsx";

import {DisplayPhoto} from "../Pages/DisplayPhoto.jsx";

function CustomRoute()
{
    return(
        
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/:id" element={<DisplayPhoto/>}/>
        </Routes>
    )
}

export  {CustomRoute};