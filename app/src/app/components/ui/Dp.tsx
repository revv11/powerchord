
import Image from "next/image"


export default function Dp({size, url}:{size:string, url:string}){

    return( 
        <div className={`relative h-${size} w-${size} aspect-w-1 aspect-h-1 `}>
            <Image
              height={Number(size)*4}
              width={Number(size)*4}
              src={url} // Replace with your image path
              alt="Square Image"
              className="rounded-full aspect-square"
             
              // Ensures the image covers the container
              // Optional: prioritize this image
            />
        </div>
    )

}