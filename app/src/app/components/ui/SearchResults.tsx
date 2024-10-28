
import Link from "next/link"

export default function SearchResults({data}:any){
    return(
        <ul>
            {data.map((data:any)=>
            <div>
                <Link href={`/${data.username}`}>
                    <li className="bg-white w-[20rem] text-center h-10 text-xl">{data.username}</li>
                    <hr />
                </Link>
            </div>
            )}
        </ul>
    )
}