import React, {useContext} from "react";

import { Context } from "../App";

function Home(){
    const [value,setValue]= useContext(Context);


     return(
        <div>
            <button onClick={() => setValue(value+1)}>{value}</button>
        </div>
        
     )
    }


export default Home;