import Image from "next/image";

  
  export default function Logo() {
    return (
  <Image
          src="/hit-fit-2.png"
          alt="HIIT Fit"
          width={30}
          height={30}
          className="object-contain"
        />
    )
  }