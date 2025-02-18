
import Link from "next/link"

export default function SearchResults({data}:any){
    return(
        <ul className=" bg-white shadow-2xl rounded-md">
            {data.map((data:any)=>
            <div key={data.id} className="">
                <Link href={`/${data.username}`}>
                    
                    <li key={data.id} className="bg-white p-1 w-[20rem] px-6 h-10 text-xl">{data.username}</li>
                    <hr />
                </Link>
            </div>
            )}
        </ul>
    )
}