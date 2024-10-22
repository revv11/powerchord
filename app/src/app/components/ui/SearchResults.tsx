
import Link from "next/link"

export default function SearchResults({data}){
    return(
        <ul>
            {data.map((data)=>
            <div>
                <Link href={`/${data.username}`}>
                    <li className="bg-white w-[20rem] text-center text-xl">{data.username}</li>
                    <hr />
                </Link>
            </div>
            )}
        </ul>
    )
}