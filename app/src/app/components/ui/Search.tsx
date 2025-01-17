import Searchbar from "./Searchbar"
import SearchResults from "./SearchResults"
import { useState } from "react";


export default function Search(){
    const [data, setData] = useState([]);

    return(
        <div className="flex w-[30%] flex-col items-center">
            <div><Searchbar setData={setData}/></div>
            <div className="absolute top-[8rem]"><SearchResults data={data}/></div>
        </div>
    )
}